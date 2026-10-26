import React, { useEffect, useRef } from 'react'
import { Award, GraduationCap, Trophy, Rocket, Sparkles, Calendar } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timelineEvents } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const containerRef = useRef()
  const progressLineRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical progress line drawing itself as user scrolls
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: 0.5
          }
        }
      )

      // Animate timeline nodes and cards
      const items = gsap.utils.toArray('.timeline-item')
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const getIcon = (category) => {
    if (category.includes('Competition') || category.includes('National')) {
      return <Trophy className="w-5 h-5 text-cyber-cyan" />
    }
    if (category.includes('Education') || category.includes('Undergraduate')) {
      return <GraduationCap className="w-5 h-5 text-cyber-emerald" />
    }
    if (category.includes('Scientific')) {
      return <Rocket className="w-5 h-5 text-cyber-purple" />
    }
    return <Award className="w-5 h-5 text-cyber-cyan" />
  }

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 bg-dark-900 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>04 // CHRONICLES & MILESTONES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-emerald">Competitions</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base mt-4">
            A track record of high-stakes hackathons, academic excellence, and international credentialing.
          </p>
        </div>

        {/* Timeline Container with Center Drawing Line */}
        <div className="relative">
          
          {/* Base Inactive Gray Line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-white/10" />

          {/* Active Glowing GSAP Animated Beam */}
          <div
            ref={progressLineRef}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-cyber-cyan via-cyber-emerald to-cyber-purple shadow-glow-cyan origin-top"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`timeline-item relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Left or Right on desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                    <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyber-cyan/40 transition-all duration-300 hover:-translate-y-1 group">
                      
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                          <Calendar className="w-3 h-3" />
                          {event.year}
                        </span>
                        <span className="text-xs font-mono text-gray-400 glass-panel px-2.5 py-0.5 rounded">
                          {event.badge}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors mb-1">
                        {event.title}
                      </h3>
                      <div className="text-xs sm:text-sm font-mono text-cyber-emerald mb-3">
                        {event.organization}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Highlight pill */}
                      <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-400">
                        <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
                        <span>Key Highlight: <strong className="text-white font-medium">{event.highlight}</strong></span>
                      </div>

                    </div>
                  </div>

                  {/* Center Node Icon Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 flex items-center justify-center w-9 h-9 rounded-full bg-dark-950 border-2 border-cyber-cyan shadow-glow-cyan z-20">
                    {getIcon(event.category)}
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
