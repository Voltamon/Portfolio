"use client"

import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      {/* Hero section wrapper - takes up 200vh for plant growth scroll */}
      <div className="relative min-h-[200vh] bg-[#64748B]">
        {/* Sticky hero content that stays in place while scrolling */}
        <div className="sticky top-0 h-screen w-full">
          <HeroSection />
        </div>
      </div>
      {/* Content sections - starts after hero scroll area */}
      <div className="relative z-0 bg-[#FDF8F3]">
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </div>
    </main>
  )
}