'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionReveal from './ui/SectionReveal'

const timelineItems = [
  {
    type: 'work',
    role: 'Android Developer',
    company: 'WebsCare',
    location: 'Pakistan',
    period: '2026 — Present',
    description:
      'Working as an Android Developer, building and maintaining production-grade Android applications using Kotlin and Flutter. Contributing to the full mobile development lifecycle from design to deployment.',
    tags: ['Kotlin', 'Flutter', 'Android SDK', 'Dart', 'Mobile'],
    color: '#6366f1',
  },
  {
    type: 'education',
    role: 'BS Information Technology',
    company: 'University of Sargodha — Main Campus',
    location: 'Sargodha, Pakistan',
    period: '2022 — 2026',
    description:
      'Graduating with a CGPA of 3.856 / 4.0. Relevant coursework spans Artificial Intelligence, Internet of Everything, Cloud Computing, Networking & System Administration, and Cybersecurity. Final year focusing on edge AI and mobile systems.',
    tags: ['AI', 'IoT', 'Cloud Computing', 'Networking', 'Cybersecurity'],
    color: '#6366f1',
  },
  {
    type: 'achievement',
    role: 'Android Development Excellence Award',
    company: 'Code Olympiad — University of Lahore',
    location: 'Lahore, Pakistan',
    period: '2026',
    description:
      'Recognised for outstanding performance in Android development at Code Olympiad. Built and demonstrated a suite of production-quality Android applications judged on UI/UX, architecture, and functionality.',
    tags: ['Kotlin', 'Android SDK', 'Material Design', 'Competition'],
    color: '#a855f7',
  },
  {
    type: 'certification',
    role: 'Google Cybersecurity Professional',
    company: 'Google — Coursera',
    location: 'Online',
    period: '2024',
    description:
      'Completed Foundations of Cybersecurity and Play It Safe: Manage Security Risks. Gained practical knowledge in threat identification, risk management frameworks, and security incident response.',
    tags: ['Cybersecurity', 'Risk Management', 'Google', 'Coursera'],
    color: '#4f46e5',
  },
  {
    type: 'certification',
    role: 'Embedded ML & Mobile Dev Certifications',
    company: 'Edge Impulse / IBM / Coursera',
    location: 'Online',
    period: '2024',
    description:
      'Completed Introduction to Embedded Machine Learning (Edge Impulse / Coursera) and Introduction to Mobile Application Development (IBM). Applied learnings directly to the Plant Disease Detection System and Android App Suite projects.',
    tags: ['Edge Impulse', 'ML', 'IBM', 'Android'],
    color: '#ec4899',
  },
  {
    type: 'education',
    role: 'FSC Pre-Engineering',
    company: 'Punjab Group of Colleges',
    location: 'Sargodha, Pakistan',
    period: '2020 — 2022',
    description:
      'Scored 1053 / 1100 (95.7%). Strong foundation in Mathematics and Physics that underpins algorithmic thinking and engineering problem-solving throughout university projects.',
    tags: ['Mathematics', 'Physics', '95.7%'],
    color: '#6366f1',
  },
]

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof timelineItems)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const typeLabel: Record<string, string> = {
    work: 'Work Experience',
    education: 'Education',
    achievement: 'Achievement',
    certification: 'Certification',
  }

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 z-10"
          style={{
            borderColor: item.color,
            backgroundColor: '#050508',
            boxShadow: `0 0 14px ${item.color}55`,
          }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.08 + 0.3 }}
            className="w-px flex-1 my-2"
            style={{
              background: `linear-gradient(to bottom, ${item.color}60, rgba(30,30,46,0.3))`,
              transformOrigin: 'top',
            }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.1 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="pb-12"
      >
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{
              background: `${item.color}12`,
              color: item.color,
              border: `1px solid ${item.color}30`,
            }}
          >
            {typeLabel[item.type] ?? item.type}
          </span>
          <span className="text-xs text-muted font-body">{item.period}</span>
        </div>

        <h3 className="text-lg md:text-xl font-display font-semibold text-text mt-2">
          {item.role}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: item.color }}>
          {item.company} · {item.location}
        </p>
        <p className="text-sm font-body text-muted leading-relaxed mb-4">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full font-body text-muted/70"
              style={{ border: '1px solid rgba(30,30,46,0.9)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#070710' }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.12) 20%, rgba(99,102,241,0.06) 80%, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal className="mb-16">
          <div className="flex items-start gap-6">
            <span
              className="font-display font-bold text-[80px] md:text-[120px] leading-none select-none"
              style={{ color: 'rgba(99,102,241,0.12)', WebkitTextStroke: '1px rgba(99,102,241,0.28)' }}
            >
              03
            </span>
            <div className="pt-3">
              <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: '#a855f7' }}>
                Education & achievements
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text">Journey</h2>
            </div>
          </div>
        </SectionReveal>

        <div className="max-w-2xl">
          {timelineItems.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} isLast={i === timelineItems.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
