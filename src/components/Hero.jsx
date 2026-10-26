import React, { useEffect, useState, useRef } from 'react'
import { ArrowDown, Sparkles, Terminal, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import Hero3D from './Hero3D'
import { personalData } from '../data/portfolioData'

const ROLES = [
  "AI & Neural Student",
  "Full-Stack Developer",
  "HITU AI Student",
  "Automation & Big Data Specialist",
  "Data Analysis & AI Solutions",
  "Robotics Enthusiast"
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()

  // Rotating subtitle with glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.35,
          onComplete: () => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length)
            gsap.to(subtitleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out"
            })
          }
        })
      }
    }, 3200)

    return () => clearInterval(interval)
  }, [])

  // GSAP initial cinematic reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-pill',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
        "-=0.4"
      )
      .fromTo(
        '.hero-fade',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 },
        "-=0.6"
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-dark-950 px-4 sm:px-6 lg:px-12 pt-20"
    >
      {/* 3D Canvas in background */}
      <Hero3D />

      {/* Cyber Grid & Gradient Overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40 z-0" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.06) 0%, rgba(5, 5, 7, 0.95) 75%)'
        }}
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Status Pill Badge */}
        <div className="hero-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyber-cyan/30 text-xs sm:text-sm font-mono text-gray-300 mb-8 backdrop-blur-md shadow-glow-cyan/20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan"></span>
          </span>
          <span className="text-cyber-cyan font-semibold">STATUS:</span>
          <span>{personalData.status}</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-gray-400 hidden sm:inline">{personalData.location}</span>
        </div>

        {/* Cinematic Name Header */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight mb-4 uppercase select-none flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6"
        >
          <span className="text-white hover:text-cyber-cyan transition-colors duration-300">
            MUSTAFA
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-emerald hover:brightness-125 transition-all duration-300">
            GABER
          </span>
        </h1>

        {/* Dynamic Rotating Sub-Headline */}
        <div className="hero-fade flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl font-mono text-gray-300 mb-8 h-12">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyber-cyan animate-pulse" />
          <span className="text-gray-500 font-light">&gt;</span>
          <div className="overflow-hidden inline-flex">
            <span
              ref={subtitleRef}
              className="text-white font-semibold tracking-wide border-b-2 border-cyber-cyan pb-0.5"
            >
              {ROLES[roleIndex]}
            </span>
          </div>
          <span className="animate-ping inline-block w-2 h-5 bg-cyber-cyan ml-1"></span>
        </div>

        {/* Bio Teaser */}
        <p className="hero-fade max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg font-sans font-light leading-relaxed mb-10 px-4">
          Architecting intelligence at the intersection of <strong className="text-white font-medium">Artificial Neural Networks</strong>,{' '}
          <strong className="text-cyber-cyan font-medium">Creative Web Experiences</strong>, and{' '}
          <strong className="text-cyber-emerald font-medium">Smart Robotics</strong> at Helwan International Tech University.
        </p>

        {/* Primary Action Buttons */}
        <div className="hero-fade flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
          <button
            onClick={() => scrollToSection('memo-feature')}
            className="group relative px-8 py-3.5 rounded-xl font-mono text-sm uppercase tracking-wider font-bold bg-cyber-cyan text-black overflow-hidden transition-all duration-300 hover:shadow-glow-cyan hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Explore MEMO AI & Projects</span>
            </span>
            <div className="absolute inset-0 bg-white/40 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="group px-7 py-3.5 rounded-xl font-mono text-sm uppercase tracking-wider font-semibold glass-panel border border-white/15 text-white transition-all duration-300 hover:border-cyber-cyan hover:bg-dark-800/80 hover:scale-[1.03]"
          >
            <span className="flex items-center gap-2">
              <span>Initiate Contact</span>
              <ExternalLink className="w-4 h-4 text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Quick Social Links */}
        <div className="hero-fade flex items-center justify-center gap-5 text-gray-400">
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-lg glass-panel hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:shadow-glow-cyan transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-lg glass-panel hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:shadow-glow-cyan transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            aria-label="Send Email"
            className="p-2.5 rounded-lg glass-panel hover:text-cyber-emerald hover:border-cyber-emerald/50 hover:shadow-glow-emerald transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-gray-500 hover:text-cyber-cyan transition-colors z-10"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
