import React, { useEffect, useRef, useState } from 'react'
import { Cpu, Terminal, Globe } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillsData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef()
  const gridRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeTab])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 bg-dark-950 overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyber-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 // COMPETENCY MATRIX</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-purple">Arsenal</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base mt-4">
            Multi-disciplinary synthesis across Artificial Intelligence, Low-level Systems, and Modern Reactive Web architectures.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillsData.categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-xl font-mono text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-bold shadow-glow-cyan scale-105'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              {idx === 0 && <Cpu className="w-4 h-4" />}
              {idx === 1 && <Globe className="w-4 h-4" />}
              {idx === 2 && <Terminal className="w-4 h-4" />}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Header */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between glass-panel p-4 rounded-xl border border-white/10">
          <div>
            <h3 className="text-xl font-display font-bold text-white">
              {skillsData.categories[activeTab].title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-mono">
              {skillsData.categories[activeTab].subtitle}
            </p>
          </div>
          <div className="mt-3 sm:mt-0 px-3 py-1 rounded-full text-xs font-mono bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
            {skillsData.categories[activeTab].skills.length} Certified Proficiencies
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.categories[activeTab].skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card-item group relative rounded-2xl glass-card p-6 border border-white/10 hover:border-cyber-cyan/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-cyan/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    {skill.name}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-white/5 border border-white/10 text-cyber-emerald">
                    {skill.level}
                  </span>
                </div>
                <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar Indicator */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-500 mb-1.5">
                  <span>Proficiency</span>
                  <span className="text-cyber-cyan">
                    {skill.level === 'Mastery' ? '98%' : skill.level === 'Advanced' ? '92%' : '85%'}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-purple transition-all duration-1000"
                    style={{
                      width: skill.level === 'Mastery' ? '98%' : skill.level === 'Advanced' ? '92%' : '85%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Technology Stack Cloud */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
            Unified Ecosystem & Supported Frameworks
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              "Python", "JavaScript ES6+", "React", "Three.js", "Tailwind CSS", "NumPy", "Pandas",
              "Scikit-Learn", "C++", "Java", "PHP", "Laravel", "Node.js", "MySQL", "Prolog",
              "Git & GitHub", "Embedded Systems", "REST APIs", "GSAP Physics"
            ].map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-mono glass-panel border border-white/10 text-gray-300 hover:text-white hover:border-cyber-cyan transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
