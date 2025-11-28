"use client"

import ParticlesJSBackground from "./ParticlesJSBackground"
import TypewriterEffect from "./TypewriterEffect"
import PlantGrowth from "./PlantGrowth"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#64748B]"
    >
      <ParticlesJSBackground />
      <div className="relative z-10 text-center px-8">
        <h1 className="editorial-title text-5xl md:text-7xl lg:text-8xl text-[#FDF8F3] mb-6">
          Beschi SSC Ltd
        </h1>
        <TypewriterEffect />
      </div>
      <PlantGrowth />
    </section>
  )
}