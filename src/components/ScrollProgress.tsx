'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
      setVisible(scrollTop > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const radius = 22
  const circumference = 2 * Math.PI * radius
  const strokeDash = (progress / 100) * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor-hover
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-[9990] w-14 h-14 flex items-center justify-center"
          style={{
            background: 'rgba(13,13,20,0.85)',
            borderRadius: '50%',
            border: '1px solid rgba(99,102,241,0.2)',
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="2.5" />
            <circle
              cx="28" cy="28" r={radius} fill="none"
              stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              style={{ transition: 'stroke-dasharray 0.1s linear' }}
            />
          </svg>
          <svg className="relative z-10 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
