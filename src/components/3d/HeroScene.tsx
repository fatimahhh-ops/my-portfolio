'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const mouse = { x: 0, y: 0 }

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.7, 2]} />
        <MeshDistortMaterial
          color="#5a5cf0"
          distort={0.35}
          speed={2.5}
          roughness={0.1}
          metalness={0.85}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  )
}

function WireframeRing() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = -state.clock.elapsedTime * 0.08
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ec4899'),
    ]
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 2.5
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (mouse.x * 0.25 - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (-mouse.y * 0.18 - groupRef.current.rotation.x) * 0.04
  })

  return (
    <group ref={groupRef}>
      <DistortedSphere />
      <WireframeRing />
      <Particles />
    </group>
  )
}

export default function HeroScene() {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[8, 8, 8]} color="#6366f1" intensity={3} />
      <pointLight position={[-8, -6, -4]} color="#a855f7" intensity={2} />
      <pointLight position={[0, 0, -8]} color="#ec4899" intensity={1.2} />
      <pointLight position={[0, 6, 0]} color="#ffffff" intensity={0.8} />
      <SceneGroup />
    </Canvas>
  )
}
