'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import SectionReveal from './ui/SectionReveal'

const projects = [
  {
    id: 1,
    title: 'Plant Disease Detection System',
    category: 'AI / Edge Computing',
    description:
      'Trained and deployed a custom ML model on Edge Impulse for real-time on-device inference. Integrated transfer learning for crop disease detection running directly on ESP32-CAM and smartphones — no cloud required.',
    tags: ['Edge Impulse', 'ESP32-CAM', 'Transfer Learning', 'IoT'],
    accent: '#6366f1',
    size: 'large',
    year: '2025',
  },
  {
    id: 2,
    title: 'Android Application Suite',
    category: 'Mobile Development',
    description:
      'Built 7+ Android applications including FAT2FIT (fitness tracker), BMI calculator, GlowGuide (skincare), and a PDF Viewer. Applied Material Design principles, permission handling, and full Activity lifecycle management.',
    tags: ['Kotlin', 'Android SDK', 'XML', 'Material Design'],
    accent: '#a855f7',
    size: 'large',
    year: '2026',
  },
  {
    id: 3,
    title: 'Smart Home Simulation',
    category: 'IoT / Networking',
    description:
      'Designed a complete IoT smart home environment in Cisco Packet Tracer with temperature, humidity, soil moisture, light, and microphone sensors. Configured actuators and full network topology.',
    tags: ['Cisco Packet Tracer', 'IoT', 'Sensors', 'Networking'],
    accent: '#4f46e5',
    size: 'small',
    year: '2023',
  },
  {
    id: 4,
    title: 'Docker Microservices Game',
    category: 'DevOps',
    description:
      'Containerized multi-service application demonstrating microservices architecture with Docker. Each service runs in isolation with inter-container communication and shared networking.',
    tags: ['Docker', 'Microservices', 'DevOps'],
    accent: '#ec4899',
    size: 'small',
    year: '2024',
  },
  {
    id: 5,
    title: 'Hostel Management System',
    category: 'Software Engineering',
    description:
      'Object-oriented hostel management system in C++ leveraging inheritance, encapsulation, and polymorphism. Covers room allocation, student records, and fee management.',
    tags: ['C++', 'OOP', 'Inheritance', 'Encapsulation'],
    accent: '#6366f1',
    size: 'small',
    year: '2023',
  },
  {
    id: 6,
    title: 'File Server & Network Admin Labs',
    category: 'Systems Administration',
    description:
      'Hands-on lab series covering Windows Server role-based access control, Linux CentOS PAM configuration, and system hardening techniques for enterprise environments.',
    tags: ['Windows Server', 'Linux CentOS', 'PAM', 'Security'],
    accent: '#a855f7',
    size: 'small',
    year: '2024',
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  const isLarge = project.size === 'large'

  return (
    <SectionReveal delay={index * 0.1} className={isLarge ? 'md:col-span-2' : ''}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        data-cursor-hover
        className="group relative h-full min-h-[240px] rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl" style={{ background: '#0d0d14', border: '1px solid rgba(30,30,46,0.9)' }} />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle 160px at ${glowX} ${glowY}, ${project.accent}18, transparent 70%)` }}
        />

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${project.accent}35` }}
        />

        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ border: `1px solid ${project.accent}35`, color: project.accent, background: `${project.accent}0d` }}
              >
                {project.category}
              </span>
              <span className="text-xs text-muted font-body">{project.year}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-semibold text-text mb-3">
              {project.title}
            </h3>
            <p className="text-sm font-body text-muted leading-relaxed">{project.description}</p>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded font-body"
                  style={{ background: 'rgba(30,30,46,0.8)', color: 'rgba(156,163,175,0.8)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="hidden group-hover:flex items-center gap-1 text-xs font-medium"
              style={{ color: project.accent }}
            >
              View
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.span>
          </div>
        </div>

        <div
          className="absolute -bottom-3 -right-3 text-[90px] font-display font-bold leading-none select-none opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500"
          style={{ color: project.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </SectionReveal>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headingX = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 md:py-40 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal className="mb-16">
          <div className="flex items-start gap-6">
            <span
              className="font-display font-bold text-[80px] md:text-[120px] leading-none select-none"
              style={{ color: 'rgba(99,102,241,0.12)', WebkitTextStroke: '1px rgba(99,102,241,0.28)' }}
            >
              02
            </span>
            <motion.div style={{ x: headingX }} className="pt-3">
              <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: '#a855f7' }}>
                Selected work
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text">Projects</h2>
            </motion.div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <SectionReveal delay={0.3} className="mt-12 text-center">
          <a
            href="https://github.com/fatimahhh-ops"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
            View all on GitHub
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </SectionReveal>
      </div>
    </section>
  )
}
