"use client"

import { useEffect, useRef } from "react"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Push content down based on scroll
      if (contentRef.current) {
        // Content starts appearing after one full screen scroll
        const contentOffset = Math.max(0, scrollY - windowHeight)
        contentRef.current.style.transform = `translateY(${windowHeight + contentOffset}px)`
      }
    }

    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <div ref={contentRef} className="relative z-0 bg-[#FDF8F3]" style={{ transform: 'translateY(100vh)' }}>
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </div>
      {/* Spacer to allow scrolling for plant growth */}
      <div style={{ height: '100vh' }} />
    </main>
  )
}