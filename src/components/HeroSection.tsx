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
    </section>
  )
}