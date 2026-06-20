'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(false)

  const dotX = useSpring(cursorX, { stiffness: 300, damping: 22, mass: 0.5 })
  const dotY = useSpring(cursorY, { stiffness: 300, damping: 22, mass: 0.5 })
  const ringX = useSpring(cursorX, { stiffness: 110, damping: 18, mass: 0.8 })
  const ringY = useSpring(cursorY, { stiffness: 110, damping: 18, mass: 0.8 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const addHover = () => setHovered(true)
    const removeHover = () => setHovered(false)
    const interactives = document.querySelectorAll(
      'a, button, [data-cursor-hover], input, textarea'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: clicked ? 0.4 : hovered ? 1.8 : 1, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 2.4 : clicked ? 0.75 : 1,
          opacity: hidden ? 0 : hovered ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.22 }}
      >
        <div
          className="w-9 h-9 rounded-full border"
          style={{
            borderColor: '#6366f1',
            boxShadow: hovered ? '0 0 14px rgba(99,102,241,0.5)' : 'none',
          }}
        />
      </motion.div>
    </>
  )
}
