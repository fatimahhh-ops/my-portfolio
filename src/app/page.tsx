import CustomCursor from '@/components/CustomCursor'
import GrainOverlay from '@/components/ui/GrainOverlay'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeText from '@/components/ui/MarqueeText'
import About from '@/components/About'
import StatsBanner from '@/components/StatsBanner'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

export default function Page() {
  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <MarqueeText text="Android Developer · IoT Engineer · AI / ML · Edge Computing · Cloud · Cybersecurity · Open to Work" reverse />
        <About />
        <StatsBanner />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
