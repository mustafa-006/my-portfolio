import React, { useEffect, useRef } from 'react'
import { Award, Cpu, GraduationCap, ShieldCheck, Sparkles, Terminal, Code2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef()
  const imageContainerRef = useRef()
  const textContainerRef = useRef()
  const imageRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on profile image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      // Staggered text card reveal
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 bg-dark-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // BIOGRAPHICAL TELEMETRY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-emerald">The Future</span>
          </h2>
        </div>

        {/* Two-Column Grid: Photo with Parallax & Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with GSAP Parallax & Cyber Framing */}
          <div ref={imageContainerRef} className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              
              {/* Outer Glowing Border Aura */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyber-cyan via-cyber-violet to-cyber-emerald opacity-30 group-hover:opacity-75 blur-xl transition-opacity duration-700" />
              
              {/* Cyber Frame Container */}
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/20 p-2 shadow-2xl bg-dark-950">
                
                {/* Tech Bracket Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan z-20" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan z-20" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan z-20" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan z-20" />

                {/* Parallax Image Wrapper */}
                <div className="relative h-[480px] sm:h-[520px] overflow-hidden rounded-xl bg-dark-850">
                  <img
                    ref={imageRef}
                    src={personalData.profileImage}
                    alt={personalData.name}
                    className="w-full h-[120%] object-cover object-top filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 scale-105"
                  />
                  
                  {/* Subtle Scanline Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Telemetry Tag */}
                  <div className="absolute bottom-4 left-4 right-4 glass-panel border border-cyber-cyan/30 rounded-xl p-3 z-10 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyber-cyan font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        MUSTAFA M. GABER
                      </span>
                      <span className="text-gray-400">HITU // AI TECH ENG</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Background Dots Grid */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 cyber-dots opacity-40 pointer-events-none -z-10" />
            </div>
          </div>

          {/* Right Column: Bio Details, Academics & Passions */}
          <div ref={textContainerRef} className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="about-reveal glass-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyber-cyan/40 transition-colors">
              <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-cyber-cyan" />
                Academic & Engineering Foundation
              </h3>
              <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed mb-4">
                {personalData.bio}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                  WE Applied Tech Honor: 92%
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald">
                  Pearson UK Certified
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-mono bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple">
                  HITU Artificial Intelligence
                </span>
              </div>
            </div>

            {/* Core Pillars / Passion Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="about-reveal glass-panel rounded-xl p-5 border border-white/5 hover:border-cyber-cyan/30 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-bold text-lg mb-1">AI & Neural Networks</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Specialized in mathematical logic, predictive pipelines, and multi-turn conversational agents with team Hybrid Minds.
                </p>
              </div>

              <div className="about-reveal glass-panel rounded-xl p-5 border border-white/5 hover:border-cyber-emerald/30 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyber-emerald/10 flex items-center justify-center text-cyber-emerald mb-3">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-bold text-lg mb-1">Creative Frontend & 3D</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Crafting reactive, award-winning web interfaces with React, GSAP physics, Three.js shaders, and high-performance WebGL.
                </p>
              </div>

              <div className="about-reveal glass-panel rounded-xl p-5 border border-white/5 hover:border-cyber-purple/30 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 flex items-center justify-center text-cyber-purple mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-bold text-lg mb-1">Robotics & Systems</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Passionate about autonomous microcontrollers, sensor fusion, network security protocols, and smart robotics.
                </p>
              </div>

              <div className="about-reveal glass-panel rounded-xl p-5 border border-white/5 hover:border-cyber-cyan/30 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center text-cyber-cyan mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-bold text-lg mb-1">Competitions & Hackathons</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Proven finalist in NASA Space Apps Cairo, ATC 10, ISEF 2023, and Alabakera Season 14.
                </p>
              </div>

            </div>

            {/* Quick Stats Grid */}
            <div className="about-reveal grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {personalData.stats.map((stat, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 text-center border border-white/5 hover:border-white/20 transition-all">
                  <div className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-cyan">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono font-semibold text-gray-300 mt-1">{stat.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{stat.subtext}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
