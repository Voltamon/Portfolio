"use client"

import TypewriterEffect from "./TypewriterEffect"
import PlantGrowth from "./PlantGrowth"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-start overflow-hidden bg-[#64748B]"
    >
      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
        <h1 className="editorial-title text-5xl md:text-7xl lg:text-8xl text-[#FDF8F3] mb-6">
          Beschi SSC Ltd
        </h1>
        <TypewriterEffect />
      </div>
      <PlantGrowth />
      
      {/* Curvaceous border at bottom transitioning to About section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg 
          className="relative block w-full h-[80px] md:h-[120px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,50 C300,100 600,0 900,50 C1050,75 1150,90 1200,80 L1200,120 L0,120 Z" 
            fill="#0A1931"
          />
        </svg>
      </div>
    </section>
  )
}