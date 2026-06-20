'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import SectionReveal from './ui/SectionReveal'

const AboutScene = dynamic(() => import('./3d/AboutScene'), { ssr: false })

const skills = [
  { name: 'Android Development (Kotlin / XML)', level: 90 },
  { name: 'Flutter & Dart', level: 72 },
  { name: 'Java / C++ / JavaScript', level: 82 },
  { name: 'IoT & Embedded Systems (ESP32, Arduino)', level: 80 },
  { name: 'AI / ML (Edge Impulse, Transfer Learning)', level: 75 },
  { name: 'Cloud Computing (AWS / GCP)', level: 70 },
  { name: 'Networking & Linux Administration', level: 73 },
  { name: 'Database Design (SQL / Oracle 21c)', level: 76 },
  { name: 'DevOps & Docker', level: 68 },
]

const techStack = [
  'Kotlin', 'Android SDK', 'Flutter', 'Dart', 'Java', 'C++', 'JavaScript', 'PHP',
  'Arduino', 'ESP32-CAM', 'Edge Impulse', 'Docker',
  'AWS', 'GCP', 'Linux', 'Oracle SQL', 'Git',
  'Cisco Packet Tracer', 'Windows Server',
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-body text-muted/80">{name}</span>
        <span className="text-xs font-body text-muted">{level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(30,30,46,0.8)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 60%, #ec4899 100%)' }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-6">

        <SectionReveal className="mb-16">
          <div className="flex items-start gap-6">
            <span
              className="font-display font-bold text-[80px] md:text-[120px] leading-none select-none"
              style={{ color: 'rgba(99,102,241,0.12)', WebkitTextStroke: '1px rgba(99,102,241,0.28)' }}
            >
              01
            </span>
            <div className="pt-3">
              <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: '#6366f1' }}>
                Get to know me
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text">About Me</h2>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: 3D Scene + Bio */}
          <div className="space-y-8">
            <SectionReveal delay={0.1}>
              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(99,102,241,0.12)', background: '#0d0d14' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)' }}
                />
                <motion.div style={{ y: sceneY }} className="w-full h-full">
                  <AboutScene />
                </motion.div>
                <div className="absolute bottom-4 left-4 text-xs text-muted font-body opacity-50">
                  Interactive · Move mouse to rotate
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="space-y-4 font-body leading-relaxed text-muted">
                <p>
                  I'm a BS Information Technology student at the University of Sargodha (CGPA: 3.856 / 4.0),
                  graduating in 2026. My passion lies at the intersection of mobile development, IoT,
                  and AI — building systems that bridge the physical and digital world.
                </p>
                <p>
                  From training ML models on embedded devices with Edge Impulse, to building 7+ polished
                  Android applications and containerized microservices, I focus on delivering complete,
                  production-quality solutions. I'm actively seeking a full-time role where I can grow
                  as a software or systems engineer.
                </p>
              </div>
            </SectionReveal>

            {/* Soft skills chips */}
            <SectionReveal delay={0.25}>
              <div className="flex flex-wrap gap-2">
                {['Problem-Solving', 'Team Collaboration', 'Resilience', 'Self-directed', 'Attention to Detail'].map((s) => (
                  <span key={s}
                    className="px-3 py-1 text-xs font-medium rounded-full text-muted"
                    style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right: Skills */}
          <div className="space-y-10">
            <SectionReveal delay={0.1}>
              <h3 className="text-xl font-display font-semibold text-text mb-6">Proficiency</h3>
              <div className="space-y-5">
                {skills.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 0.07 + 0.35} />
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <h3 className="text-xl font-display font-semibold text-text mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.08, borderColor: 'rgba(99,102,241,0.6)', color: '#6366f1' }}
                    className="px-3 py-1 text-xs font-medium rounded-full text-muted transition-colors"
                    style={{ border: '1px solid rgba(30,30,46,0.9)', background: 'rgba(13,13,20,0.5)' }}
                    data-cursor-hover
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
