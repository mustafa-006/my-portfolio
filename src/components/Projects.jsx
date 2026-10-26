import React, { useState, useEffect, useRef } from 'react'
import { Github, ExternalLink, Code2, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ["All Systems", "AI & Machine Learning", "Full Stack & Social", "Creative Frontend", "Backend Architecture"]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Systems")
  const sectionRef = useRef()
  const cardsRef = useRef()

  const filteredProjects = activeCategory === "All Systems"
    ? projects
    : projects.filter(p => p.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card-elem',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 bg-dark-900 overflow-hidden"
    >
      {/* Ambient background lights */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyber-emerald/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading & Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4">
              <Code2 className="w-3.5 h-3.5" />
              <span>02 // PRODUCTION REPOSITORIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
              Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-emerald">Codebases</span>
            </h2>
          </div>

          <div className="text-gray-400 font-mono text-xs sm:text-sm max-w-sm">
            <span>Direct GitHub deployments by Mustafa Gaber. Filter by domain or inspect source code.</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-cyber-cyan text-black font-bold shadow-glow-cyan'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with Cinematic Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-elem group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-cyber-cyan/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-cyber-card flex flex-col justify-between"
            >
              {/* Image Preview with Hover Zoom & Subtle Scanline */}
              <div className="relative h-56 sm:h-60 overflow-hidden bg-dark-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover ${project.imagePosition || 'object-[center_30%]'} transition-transform duration-700 group-hover:scale-108 filter contrast-105`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                
                {/* Metric pill */}
                <div className="absolute top-3 left-3 glass-panel border border-cyber-cyan/40 px-3 py-1 rounded-full text-[11px] font-mono text-cyber-cyan backdrop-blur-md">
                  {project.metrics}
                </div>

                {/* Category tag */}
                <div className="absolute top-3 right-3 glass-panel border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono text-gray-300">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors mb-2.5 flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-dark-800 text-gray-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions / GitHub Link */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-gray-300 hover:text-cyber-cyan transition-colors"
                    >
                      <Github className="w-4 h-4 text-cyber-cyan" />
                      <span>github.com/mustafa-006</span>
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-black hover:bg-cyber-cyan transition-all"
                      aria-label="View Source on GitHub"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* GitHub Full Archive Banner */}
        <div className="mt-16 glass-panel rounded-2xl p-8 border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-xl font-display font-bold text-white mb-1">
              Want to inspect more codebases and experimental models?
            </h4>
            <p className="text-gray-400 text-sm">
              Discover repositories across Machine Learning, Laravel, Node.js, and Robotics on my GitHub.
            </p>
          </div>
          <a
            href="https://github.com/mustafa-006"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-dark-800 text-white border border-white/20 hover:border-cyber-cyan hover:shadow-glow-cyan hover:text-cyber-cyan transition-all flex items-center gap-2 shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Visit @mustafa-006 GitHub</span>
          </a>
        </div>

      </div>
    </section>
  )
}
