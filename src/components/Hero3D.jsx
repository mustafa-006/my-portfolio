import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Synaptic Particle Field representing Neural Weights and Data Connections
function NeuralField({ mousePos }) {
  const pointsRef = useRef()
  const linesRef = useRef()

  // Generate 250 neural node points
  const count = 220
  const [positions, connections] = useMemo(() => {
    const coords = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 2.2 + Math.random() * 2.8

      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      coords[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.75
      coords[i * 3 + 2] = radius * Math.cos(phi)
    }

    // Connect close neighbors
    const lineIndices = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = coords[i * 3] - coords[j * 3]
        const dy = coords[i * 3 + 1] - coords[j * 3 + 1]
        const dz = coords[i * 3 + 2] - coords[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 1.15) {
          lineIndices.push(i, j)
        }
      }
    }

    const linePositions = new Float32Array(lineIndices.length * 3)
    for (let k = 0; k < lineIndices.length; k++) {
      const idx = lineIndices[k]
      linePositions[k * 3] = coords[idx * 3]
      linePositions[k * 3 + 1] = coords[idx * 3 + 1]
      linePositions[k * 3 + 2] = coords[idx * 3 + 2]
    }

    return [coords, linePositions]
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    // Gentle rotation
    pointsRef.current.rotation.y += delta * 0.08
    pointsRef.current.rotation.x += delta * 0.03

    if (linesRef.current) {
      linesRef.current.rotation.y = pointsRef.current.rotation.y
      linesRef.current.rotation.x = pointsRef.current.rotation.x
    }

    // Mouse parallax reaction
    const targetX = mousePos.current.x * 0.5
    const targetY = mousePos.current.y * 0.3
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05
    pointsRef.current.position.y += (-targetY - pointsRef.current.position.y) * 0.05
    if (linesRef.current) {
      linesRef.current.position.x = pointsRef.current.position.x
      linesRef.current.position.y = pointsRef.current.position.y
    }
  })

  return (
    <group>
      {/* Neural Node Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#00F0FF"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Synaptic Interconnections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

// Glowing Core Dynamic AI Core Mesh
function DynamicAICore({ mousePos }) {
  const meshRef = useRef()
  const wireframeRef = useRef()

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.25

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.15
      wireframeRef.current.rotation.z = time * 0.2
    }

    // Breathing pulse
    const scale = 1 + Math.sin(time * 1.5) * 0.05
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        {/* Inner glowing faceted polyhedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#080c18"
            emissive="#00F0FF"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Outer wireframe lattice */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.45, 2]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#10B981"
            emissiveIntensity={0.5}
            wireframe={true}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function Hero3D() {
  const containerRef = useRef()
  const [isVisible, setIsVisible] = useState(true)
  const mousePos = useRef({ x: 0, y: 0 })

  // Pause R3F when scrolled out of view to keep 60 FPS
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F0FF" />
        <pointLight position={[-10, -5, -5]} intensity={1.2} color="#8B5CF6" />
        <pointLight position={[0, 5, 2]} intensity={1.0} color="#10B981" />

        <NeuralField mousePos={mousePos} />
        <DynamicAICore mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
