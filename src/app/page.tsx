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
  const [growthComplete, setGrowthComplete] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Plant growth phase: 0 to windowHeight
      if (scrollY < windowHeight) {
        setGrowthComplete(false)
        
        // Keep hero fixed and content below viewport during growth
        if (heroRef.current) {
          heroRef.current.style.position = 'fixed'
        }
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${windowHeight}px)`
        }
      } else {
        // Growth complete - enable normal scrolling
        if (!growthComplete) {
          setGrowthComplete(true)
        }
        
        // Transition hero to absolute positioning so it scrolls away
        if (heroRef.current) {
          heroRef.current.style.position = 'absolute'
        }
        
        // Bring content into normal flow
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${windowHeight}px)`
        }
      }
    }

    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [growthComplete])

  return (
    <main className="relative">
      <Navigation />
      <div ref={heroRef} className="fixed top-0 left-0 w-full h-screen z-10">
        <HeroSection />
      </div>
      <div ref={contentRef} className="relative z-0 bg-[#FDF8F3] transition-transform duration-300" style={{ transform: 'translateY(100vh)' }}>
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </div>
      {/* Spacer to allow scrolling for plant growth + content height */}
      <div style={{ height: '100vh' }} />
    </main>
  )
}