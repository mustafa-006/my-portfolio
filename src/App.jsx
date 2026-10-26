import React, { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MemoFeature from './components/MemoFeature'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import { playCyberClick, playCyberHover } from './utils/soundFx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isAudioActive, setIsAudioActive] = useState(false)
  const lenisRef = useRef(null)

  // Initialize Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    // Trigger ScrollTrigger refresh after initial DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timer)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  // Audio interactions for cyber atmosphere
  useEffect(() => {
    if (!isAudioActive) return

    const handleHover = (e) => {
      const target = e.target.closest('button, a, input, [role="button"]')
      if (target) {
        playCyberHover()
      }
    }

    const handleClick = () => {
      playCyberClick()
    }

    document.addEventListener('mouseover', handleHover)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mouseover', handleHover)
      document.removeEventListener('click', handleClick)
    }
  }, [isAudioActive])

  const toggleAudio = () => {
    if (!isAudioActive) {
      playCyberClick()
    }
    setIsAudioActive(!isAudioActive)
  }

  return (
    <div className="relative min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-cyber-cyan selection:text-black">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating HUD Navbar */}
      <Navbar isAudioActive={isAudioActive} toggleAudio={toggleAudio} />

      {/* Main Single Page Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <MemoFeature />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      {/* Ambient Corner Telemetry Overlay (Bottom Right) */}
      <div className="fixed bottom-3 right-4 z-40 hidden md:flex items-center gap-2 glass-panel border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-gray-400 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
        <span>SYS // OPERATIONAL</span>
        <span className="text-gray-600">|</span>
        <span>HITU • AI</span>
      </div>
    </div>
  )
}
