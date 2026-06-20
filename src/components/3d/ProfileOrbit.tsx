'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Image from 'next/image'
import * as THREE from 'three'
import profilePhoto from '../../../public/profile.png'

// Outer globe wireframe — always looks perfectly circular from any angle
function GlobeShell({ radius, segments, color, opacity, speedX, speedY }: {
  radius: number; segments: number; color: string; opacity: number
  speedX: number; speedY: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * speedX
    ref.current.rotation.y = state.clock.elapsedTime * speedY
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, segments, Math.floor(segments * 0.65)]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

// Glowing ring right at photo edge — always faces camera
function PhotoRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.2
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.52, 0.024, 20, 200]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={3.5}
        metalness={1}
        roughness={0}
      />
    </mesh>
  )
}

// Thin accent ring slightly larger, different rotation speed
function AccentRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = -state.clock.elapsedTime * 0.12
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.65, 0.008, 10, 180]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.55} />
    </mesh>
  )
}

// Particles scattered on a sphere surface — same radius as globe
function ParticleSphere({ count = 180, radius }: { count?: number; radius: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r     = radius + (Math.random() - 0.5) * 0.25
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.09
    ref.current.rotation.x = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a855f7" size={0.025} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// Orbiting diamond gems
function Gem({ speed, phase, color, size = 0.075 }: {
  speed: number; phase: number; color: string; size?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + phase
    ref.current.position.x = Math.cos(t) * 1.52
    ref.current.position.y = Math.sin(t) * 1.52 * 0.3
    ref.current.position.z = Math.sin(t) * 1.52 * 0.95
    ref.current.rotation.x += 0.05
    ref.current.rotation.y += 0.04
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={5} metalness={1} roughness={0}
      />
    </mesh>
  )
}

// Soft pulsing glow
function GlowCore() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.05)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.48, 32, 32]} />
      <meshBasicMaterial color="#3730a3" transparent opacity={0.09} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.06} />
      <pointLight position={[0, 0, 5]}   color="#6366f1" intensity={14} />
      <pointLight position={[-4, 4, -2]} color="#a855f7" intensity={6} />
      <pointLight position={[4, -4,  2]} color="#4f46e5" intensity={4} />

      <GlowCore />
      <PhotoRing />
      <AccentRing />

      {/* Outer globe — 16 lon segments, rotates slowly */}
      <GlobeShell radius={2.25} segments={16} color="#6366f1" opacity={0.28} speedX={0.05} speedY={0.09} />
      {/* Inner globe — fewer segments, counter-rotates */}
      <GlobeShell radius={1.88} segments={12} color="#a855f7" opacity={0.15} speedX={-0.07} speedY={-0.11} />

      <ParticleSphere count={160} radius={2.25} />

      {[0, 1, 2, 3].map((i) => (
        <Gem
          key={i}
          speed={0.46}
          phase={(i / 4) * Math.PI * 2}
          color={['#818cf8', '#c084fc', '#f472b6', '#818cf8'][i]}
        />
      ))}
    </>
  )
}

export default function ProfileOrbit() {
  const [canvasKey, setCanvasKey] = useState(0)

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      setTimeout(() => setCanvasKey((k) => k + 1), 500)
    }, false)
  }, [])

  return (
    <div className="grid w-[440px] h-[440px] md:w-[520px] md:h-[520px] mx-auto place-items-center">
      <Canvas
        key={canvasKey}
        className="col-start-1 row-start-1 w-full h-full"
        camera={{ position: [0, 0, 6], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        onCreated={onCreated}
      >
        <Scene />
      </Canvas>

      <div
        className="col-start-1 row-start-1 pointer-events-none z-10 shrink-0 w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden"
        style={{
          border: '3px solid rgba(99,102,241,0.65)',
          boxShadow: '0 0 0 8px rgba(99,102,241,0.07), 0 0 70px rgba(99,102,241,0.5), 0 0 140px rgba(168,85,247,0.2)',
        }}
      >
        <Image
          src={profilePhoto}
          alt="Fatima Ahmed"
          width={300}
          height={300}
          sizes="(max-width: 768px) 260px, 300px"
          className="w-full h-full object-cover object-center"
          priority
        />
      </div>
    </div>
  )
}
