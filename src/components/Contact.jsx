import React, { useState } from 'react'
import { Mail, Phone, Github, Linkedin, Copy, Check, ArrowUpRight, Send, Terminal } from 'lucide-react'
import { personalData } from '../data/portfolioData'

export default function Contact() {
  const [copiedType, setCopiedType] = useState(null)
  const [formSent, setFormSent] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Open default mail client with prefilled body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`
    setFormSent(true)
    setTimeout(() => setFormSent(false), 5000)
  }

  return (
    <footer
      id="contact"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-12 bg-dark-950 overflow-hidden flex flex-col justify-between"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-cyber-cyan/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Contact Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>05 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-purple">Build</span> Together
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Available for high-stakes AI engineering, robotics initiatives, creative web architectures, and strategic collaborations.
          </p>
        </div>

        {/* Large Clickable Transmission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Email Giant Box */}
          <div className="group glass-card rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-cyber-cyan transition-all duration-300 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-6">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyber-cyan" />
                  PRIMARY EMAIL
                </span>
                <span className="text-cyber-cyan">FAST RESPONSE</span>
              </div>
              <a
                href={`mailto:${personalData.email}`}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-white hover:text-cyber-cyan transition-colors block mb-4 truncate"
                title={personalData.email}
              >
                {personalData.email}
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => copyToClipboard(personalData.email, 'email')}
                className="inline-flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-cyber-cyan transition-colors"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check className="w-4 h-4 text-cyber-emerald" />
                    <span className="text-cyber-emerald">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${personalData.email}`}
                className="p-3 rounded-xl bg-white/5 group-hover:bg-cyber-cyan group-hover:text-black transition-all"
                aria-label="Send direct email"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Phone Giant Box */}
          <div className="group glass-card rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-cyber-emerald transition-all duration-300 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-6">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyber-emerald" />
                  DIRECT LINE / WHATSAPP
                </span>
                <span className="text-cyber-emerald">CAIRO (UTC+2)</span>
              </div>
              <a
                href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white hover:text-cyber-emerald transition-colors block mb-4"
              >
                {personalData.phone}
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => copyToClipboard(personalData.phone, 'phone')}
                className="inline-flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-cyber-emerald transition-colors"
              >
                {copiedType === 'phone' ? (
                  <>
                    <Check className="w-4 h-4 text-cyber-emerald" />
                    <span className="text-cyber-emerald">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY PHONE NUMBER</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/201201707796`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 group-hover:bg-cyber-emerald group-hover:text-black transition-all"
                aria-label="Contact via WhatsApp"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Quick Message Transmission Form & Social Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Quick Message Form */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-8 border border-white/10">
            <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
              <Send className="w-5 h-5 text-cyber-cyan" />
              Direct Message Interface
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-mono mb-6">
              Send an immediate dispatch directly to Mustafa's primary inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">NAME // ENTITY</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Omar / Tech Lead"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1.5">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors text-sm font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">TRANSMISSION CONTENT</label>
                <textarea
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline project scope, AI research, or collaboration opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan transition-colors text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-cyber-cyan text-black hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          </div>

          {/* Magnetic Social Links Box */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                External Coordinates
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono mb-6">
                Connect on developer networks and professional platforms.
              </p>

              <div className="space-y-3">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl glass-card border border-white/5 hover:border-cyber-cyan hover:shadow-glow-cyan/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-cyber-cyan" />
                    <div>
                      <div className="text-sm font-bold text-white">GitHub</div>
                      <div className="text-xs text-gray-400">@mustafa-006</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl glass-card border border-white/5 hover:border-cyber-cyan hover:shadow-glow-cyan/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-cyber-cyan" />
                    <div>
                      <div className="text-sm font-bold text-white">LinkedIn</div>
                      <div className="text-xs text-gray-400">Mustafa Muhammed</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
                <span>Base of Operations: Cairo, Egypt</span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Tech Footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} MUSTAFA MUHAMMED GABER • ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <span>REACT 18</span>
            <span>•</span>
            <span>THREE.JS (R3F)</span>
            <span>•</span>
            <span>GSAP</span>
            <span>•</span>
            <span>TAILWIND CSS</span>
            <span>•</span>
            <span>LENIS</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
