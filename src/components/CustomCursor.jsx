import React, { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [follower, setFollower] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      // Check if hovering over clickable element
      const target = e.target
      const isClickable = target.closest('a, button, input, textarea, [role="button"]')
      setIsHovered(!!isClickable)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Smooth lerp follower loop
    let animId
    const updateFollower = () => {
      setFollower((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18
      }))
      animId = requestAnimationFrame(updateFollower)
    }
    animId = requestAnimationFrame(updateFollower)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animId)
    }
  }, [position, isVisible])

  if (!isVisible) return null

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '8px' : '5px',
          height: isHovered ? '8px' : '5px',
          backgroundColor: isHovered ? '#00FF88' : '#00F0FF',
          boxShadow: '0 0 10px #00F0FF'
        }}
      />

      {/* Lagging Ring Follower */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-all duration-150 ease-out"
        style={{
          left: `${follower.x}px`,
          top: `${follower.y}px`,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderColor: isHovered ? 'rgba(0, 255, 136, 0.6)' : 'rgba(0, 240, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(0, 240, 255, 0.25)' : 'none'
        }}
      />
    </div>
  )
}
