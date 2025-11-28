"use client"

import BallClimbingStairs from "./BallClimbingStairs"
import TypewriterEffect from "./TypewriterEffect"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#64748B]"
    >
      <BallClimbingStairs />
      <div className="relative z-10 text-center px-8">
        <h1 className="editorial-title text-5xl md:text-7xl lg:text-8xl text-[#0A1931] mb-6">
          Beschi SSC Ltd
        </h1>
        <TypewriterEffect />
      </div>
    </section>
  )
}