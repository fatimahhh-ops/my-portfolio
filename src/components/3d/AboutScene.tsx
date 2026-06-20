'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const mouse = { x: 0, y: 0 }

function TorusKnot() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12
      meshRef.current.rotation.y = t * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.12
      wireRef.current.rotation.y = t * 0.2
    }
    // Manual float — no drei dependency
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.18
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.32, 180, 18, 2, 3]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.85}
          roughness={0.15}
          emissive="#2e1d8f"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.12, 0.34, 80, 10, 2, 3]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 7
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.06
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#6366f1" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (mouse.x * 0.2 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.04
  })

  return (
    <group ref={groupRef}>
      <TorusKnot />
      <Particles />
    </group>
  )
}

export default function AboutScene() {
  const [canvasKey, setCanvasKey] = useState(0)

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      setTimeout(() => setCanvasKey((k) => k + 1), 500)
    }, false)
  }, [])

  return (
    <Canvas
      key={canvasKey}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      onCreated={onCreated}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={6} />
      <pointLight position={[-5, -3, -4]} color="#a855f7" intensity={3} />
      <pointLight position={[0, 0, -4]} color="#4f46e5" intensity={2} />
      <SceneGroup />
    </Canvas>
  )
}
