'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 3.856, suffix: '', label: 'CGPA / 4.0', decimals: 3 },
  { value: 7,     suffix: '+',  label: 'Android Apps', decimals: 0 },
  { value: 6,     suffix: '+',  label: 'Projects Built', decimals: 0 },
  { value: 4,     suffix: '',   label: 'Certifications', decimals: 0 },
  { value: 2,     suffix: '+',  label: 'Years Experience', decimals: 0 },
]

function CountUp({ to, decimals, suffix, active }: { to: number; decimals: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!active) return
    const duration = 1600
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * to
      setDisplay(current.toFixed(decimals))
      if (step >= steps) {
        clearInterval(timer)
        setDisplay(to.toFixed(decimals))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [active, to, decimals])

  return <>{display}{suffix}</>
}

export default function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative py-16 overflow-hidden">
      {/* Top / bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.35) 30%, rgba(168,85,247,0.3) 70%, transparent 100%)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.35) 30%, rgba(168,85,247,0.3) 70%, transparent 100%)' }} />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Divider between items */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25), transparent)' }} />
              )}

              <span
                className="text-4xl md:text-5xl font-display font-bold tabular-nums"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 60%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} active={inView} />
              </span>

              <span className="mt-2 text-xs font-medium tracking-widest uppercase text-muted font-body">
                {s.label}
              </span>

              {/* Subtle dot below */}
              <div className="mt-3 w-1 h-1 rounded-full"
                style={{ background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#a855f7' : '#ec4899' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
