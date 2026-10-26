import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Cpu, Mic, Radio, Users, CheckCircle2, Github, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { flagshipProject } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function MemoFeature() {
  const containerRef = useRef()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.memo-card-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section
      id="memo-feature"
      ref={containerRef}
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 bg-dark-950 overflow-hidden"
    >
      {/* Background Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyber-cyan/40 text-xs font-mono text-cyber-cyan mb-4 shadow-glow-cyan/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyber-cyan" />
            <span>FLAGSHIP INNOVATION // HITU AI PROGRAM</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
            MEMO: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-purple">Voice AI Assistant</span>
          </h2>

          <p className="text-lg text-gray-400 font-sans">
            Engineered by team <strong className="text-white font-semibold">Hybrid Minds</strong> at Helwan International Tech University (Faculty of Technology - Artificial Intelligence Program).
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Cyber Video Player */}
          <div className="memo-card-reveal lg:col-span-7">
            <div className="relative group rounded-2xl overflow-hidden glass-panel border border-white/20 p-2 shadow-2xl bg-dark-900/90 hover:border-cyber-cyan/50 transition-all duration-500">
              
              {/* Tech Bracket Corners */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyber-cyan z-30 pointer-events-none" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyber-cyan z-30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyber-cyan z-30 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyber-cyan z-30 pointer-events-none" />

              {/* Video Container */}
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={flagshipProject.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Subdued HUD Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

                {/* Live Audio Visualizer Simulation Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 glass-panel border border-white/10 px-3 py-1.5 rounded-lg z-20">
                  <Mic className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
                  <span className="text-[11px] font-mono text-gray-300">LIVE AUDIO STREAM</span>
                  <div className="flex items-center gap-0.5 ml-2">
                    <span className="w-0.5 h-3 bg-cyber-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-4 bg-cyber-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-2 bg-cyber-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="w-0.5 h-5 bg-cyber-cyan animate-bounce" style={{ animationDelay: '75ms' }} />
                    <span className="w-0.5 h-3 bg-cyber-cyan animate-bounce" style={{ animationDelay: '200ms' }} />
                  </div>
                </div>

                {/* Player Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 px-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-cyber-cyan hover:text-black transition-all"
                      aria-label={isPlaying ? 'Pause Demo' : 'Play Demo'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-cyber-cyan hover:text-black transition-all"
                      aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <span className="text-xs font-mono text-gray-300 glass-panel px-2.5 py-1 rounded">
                    MEMO // V1.0 MODEL
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Project Dossier & Team Recognition */}
          <div className="memo-card-reveal lg:col-span-5 flex flex-col gap-5">
            
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-emerald mb-2">
                <Users className="w-4 h-4" />
                <span>TEAM HYBRID MINDS • FACULTY OF TECH</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Conversational AI Interface
              </h3>
              <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
                {flagshipProject.summary}
              </p>

              {/* Core Feature Highlights */}
              <div className="space-y-3 mb-6">
                {flagshipProject.features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-cyber-cyan mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {flagshipProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-dark-850 text-gray-300 border border-white/10 hover:border-cyber-cyan/50 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Credential Badge */}
            <div className="glass-panel rounded-xl p-4 border border-cyber-cyan/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-gray-400">RESEARCH & DEV TEAM</div>
                <div className="text-base font-display font-bold text-white">Hybrid Minds — AI Program</div>
                <div className="text-xs text-cyber-cyan">Helwan International Tech University</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                <Cpu className="w-5 h-5" />
              </div>
            </div>

            {/* Direct GitHub Repository Link */}
            <a
              href={flagshipProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-5 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-dark-850 hover:bg-cyber-cyan text-white hover:text-black border border-white/10 hover:border-cyber-cyan hover:shadow-glow-cyan transition-all duration-300"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4 text-cyber-cyan group-hover:text-black transition-colors" />
                <span>Explore MEMO on GitHub</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}
