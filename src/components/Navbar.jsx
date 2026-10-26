import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Menu, X, Github } from 'lucide-react'
import { personalData } from '../data/portfolioData'

export default function Navbar({ isAudioActive, toggleAudio }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: "01 // BIO", href: "#about" },
    { label: "02 // MEMO AI", href: "#memo-feature" },
    { label: "03 // PROJECTS", href: "#projects" },
    { label: "04 // SKILLS", href: "#skills" },
    { label: "05 // TIMELINE", href: "#timeline" },
    { label: "06 // CONTACT", href: "#contact" }
  ]

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12 ${
        scrolled ? 'py-3 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#hero')
          }}
          className="group flex items-center gap-2.5 text-white font-display font-extrabold text-xl tracking-tight"
        >
          <div className="w-9 h-9 rounded-xl bg-dark-850 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shadow-glow-cyan/20 group-hover:scale-105 group-hover:border-cyber-cyan transition-all">
            <span className="font-mono text-sm font-bold">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider uppercase group-hover:text-cyber-cyan transition-colors">
              MUSTAFA GABER
            </span>
            <span className="text-[10px] font-mono text-gray-400">HITU • AI TECH ENG</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="px-3 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right HUD Actions */}
        <div className="flex items-center gap-3">
          
          {/* Subtle Audio Synth Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl text-xs font-mono transition-all border ${
              isAudioActive
                ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-glow-cyan/30'
                : 'glass-panel border-white/10 text-gray-400 hover:text-white'
            }`}
            title={isAudioActive ? 'Mute Interface Sounds' : 'Enable Cyber Synthesizer Sound FX'}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Direct GitHub Link */}
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/5 border border-white/15 text-white hover:border-cyber-cyan hover:text-cyber-cyan transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>@mustafa-006</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-panel border border-white/15 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] p-6 glass-panel border-b border-white/15 bg-dark-950/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-left py-2.5 px-3 rounded-lg text-sm font-mono text-gray-300 hover:text-cyber-cyan hover:bg-white/5 transition-all"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyber-cyan flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub: @mustafa-006</span>
            </a>
            <span className="text-xs font-mono text-gray-500">HITU AI</span>
          </div>
        </div>
      )}
    </header>
  )
}
