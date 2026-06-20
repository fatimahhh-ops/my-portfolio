'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from './ui/SectionReveal'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/fatimahhh-ops',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/fatima-ahmed-31787133b',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:fatimamehar500@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

type FormState = 'idle' | 'sending' | 'sent'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:fatimamehar500@gmail.com?subject=${subject}&body=${body}`, '_self')
    setStatus('sent')
  }

  const inputClass =
    'w-full rounded-xl px-5 py-3.5 text-text text-sm font-body placeholder:text-muted/40 focus:outline-none transition-all duration-200'

  return (
    <section id="contact" className="relative py-28 md:py-40 bg-bg overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal className="mb-16">
          <div className="flex items-start gap-6">
            <span
              className="font-display font-bold text-[80px] md:text-[120px] leading-none select-none"
              style={{ color: 'rgba(99,102,241,0.12)', WebkitTextStroke: '1px rgba(99,102,241,0.28)' }}
            >
              04
            </span>
            <div className="pt-3">
              <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: '#6366f1' }}>
                Get in touch
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text">Contact</h2>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-8">
            <SectionReveal delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-text leading-tight">
                {"Let's build something"}
                <br />
                <span className="gradient-text">great together.</span>
              </h3>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="text-base font-body text-muted leading-relaxed">
                I'm actively looking for full-time opportunities in software engineering, mobile development,
                or IoT/AI roles. Whether you have a project, a job opening, or just want to connect —
                I'd love to hear from you.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.25}>
              <div className="space-y-3">
                <a
                  href="mailto:fatimamehar500@gmail.com"
                  className="group inline-flex items-center gap-3 font-medium transition-colors duration-200 text-text"
                  data-cursor-hover
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ border: '1px solid rgba(30,30,46,0.9)' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  fatimamehar500@gmail.com
                </a>
                <a
                  href="tel:+923039320948"
                  className="group inline-flex items-center gap-3 font-medium transition-colors duration-200 text-text"
                  data-cursor-hover
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ border: '1px solid rgba(30,30,46,0.9)' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  +92 303 9320948
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-cursor-hover
                    whileHover={{ scale: 1.1, borderColor: 'rgba(99,102,241,0.5)', color: '#6366f1' }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-muted transition-all duration-200"
                    style={{ border: '1px solid rgba(30,30,46,0.9)' }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </SectionReveal>

            {/* Location badge */}
            <SectionReveal delay={0.35}>
              <div className="inline-flex items-center gap-2 text-xs text-muted font-body">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Sargodha, Pakistan · Open to remote & relocation
              </div>
            </SectionReveal>
          </div>

          {/* Right: form */}
          <SectionReveal delay={0.2}>
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.12)' }}
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-display font-semibold text-text">Message sent!</h4>
                <p className="text-sm text-muted font-body">{"I'll get back to you as soon as possible. Thanks!"}</p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-2 text-sm underline underline-offset-4 font-body"
                  style={{ color: '#6366f1' }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted font-body mb-1.5">Name</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" required
                      className={inputClass}
                      style={{ background: '#0d0d14', border: '1px solid rgba(30,30,46,0.9)' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(30,30,46,0.9)')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted font-body mb-1.5">Email</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" required
                      className={inputClass}
                      style={{ background: '#0d0d14', border: '1px solid rgba(30,30,46,0.9)' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(30,30,46,0.9)')}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted font-body mb-1.5">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={6} placeholder="Tell me about your project or opportunity..." required
                    className={`${inputClass} resize-none`}
                    style={{ background: '#0d0d14', border: '1px solid rgba(30,30,46,0.9)' }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(30,30,46,0.9)')}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-hover
                  className="w-full py-4 rounded-xl text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.25)',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
