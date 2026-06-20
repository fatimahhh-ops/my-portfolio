'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import MagneticButton from './ui/MagneticButton'

const ProfileOrbit = dynamic(() => import('./3d/ProfileOrbit'), {
  ssr: false,
  loading: () => (
    <div
      className="w-[440px] h-[440px] md:w-[520px] md:h-[520px] mx-auto"
      aria-hidden
    />
  ),
})

const roles = [
  'Android Developer',
  'IoT & Embedded Engineer',
  'AI / ML Enthusiast',
  'BS-IT Graduate · CGPA 3.856',
]

function TypewriterText() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[index]
    let timeout: NodeJS.Timeout
    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
    } else if (deleting) {
      timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 42)
    } else {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        72
      )
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span>
      <span className="gradient-text font-display">{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-accent ml-0.5"
      >
        |
      </motion.span>
    </span>
  )
}

function SplitHeading({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      >
        {text}
      </motion.div>
    </div>
  )
}

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const bgX = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), { stiffness: 50, damping: 20 })
  const bgY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 50, damping: 20 })
  const bgX2 = useTransform(bgX, (v) => -v * 0.6)
  const bgY2 = useTransform(bgY, (v) => -v * 0.6)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set(-(e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 bg-grid opacity-50" />

      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute top-1/3 left-[15%] w-[600px] h-[600px] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      </motion.div>
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }} />
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
        style={{ originX: 0 }}
        className="absolute top-[35%] left-0 right-0 h-px pointer-events-none"
      >
        <div className="w-full h-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.2) 30%, rgba(99,102,241,0.08) 70%, transparent 100%)' }} />
      </motion.div>

      <motion.div
        style={{ y: parallaxY }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[82vh]">

          {/* Left: Text */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col">

            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ border: '1px solid rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.06)', color: '#6366f1' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            <h1 className="text-[clamp(3rem,7.5vw,7rem)] font-display font-bold leading-[1.02] tracking-tight mb-1">
              <SplitHeading text="Hi, I'm" delay={0.55} />
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.68 }}
                  className="gradient-text"
                >
                  Fatima Ahmed.
                </motion.div>
              </div>
            </h1>

            <motion.div
              variants={fadeUp}
              className="text-[clamp(1.1rem,2.4vw,1.5rem)] font-body text-muted mt-4 mb-7 min-h-[2em]"
            >
              <TypewriterText />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-[1.05rem] font-body text-muted leading-relaxed mb-10 max-w-[480px]"
            >
              Results-driven BS-IT graduate from University of Sargodha with hands-on experience
              in Android development, IoT, AI/ML, and cloud computing. Building technology that
              solves real problems.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
                }}
              >
                View My Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>

              <MagneticButton
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm text-text transition-all duration-200"
                style={{ border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)' }}
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-10 mt-14 pt-8"
              style={{ borderTop: '1px solid rgba(99,102,241,0.15)' }}
            >
              {[
                { value: '3.856', label: 'CGPA / 4.0' },
                { value: '7+', label: 'Android Apps' },
                { value: '6+', label: 'Projects' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-display font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted mt-0.5 font-body">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Profile orbit */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
            className="flex justify-center items-center -mt-16 lg:-mt-24"
          >
            <div className="relative">
              <div
                className="absolute inset-[-40px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
              />
              <ProfileOrbit />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] text-muted font-body tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
