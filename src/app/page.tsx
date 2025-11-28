"use client"

import { useEffect, useRef, useState } from "react"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress (0 to 1 for the growth phase)
      const progress = Math.min(scrollY / windowHeight, 1)
      setScrollProgress(progress)
    }

    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="relative">
      <Navigation />
      {/* Hero section - scrolls away naturally after 100vh */}
      <div ref={heroRef} className="relative w-full h-screen z-10">
        <HeroSection />
      </div>
      {/* Content sections - starts immediately after hero */}
      <div ref={contentRef} className="relative z-0 bg-[#FDF8F3]">
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </main>
  )
}