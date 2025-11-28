"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !svgRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Text animation from right - triggers immediately when section is in view
      gsap.from(textRef.current?.querySelectorAll("h2, p"), {
        x: 150,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      })

      // SVG line drawing animation - starts AFTER section is fully reached
      const paths = svgRef.current?.querySelectorAll("path")
      paths?.forEach((path, index) => {
        const length = path.getTotalLength()
        
        // Set up the starting positions
        path.style.strokeDasharray = length.toString()
        path.style.strokeDashoffset = length.toString()
        
        // Animate the line drawing - starts after section is completely on screen
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            pin: sectionRef.current,
            pinSpacing: false,
          },
        })
      })

      // Fade in SVG container
      gsap.from(svgRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <section
        id="about"
        ref={sectionRef}
        className="sticky top-0 h-screen bg-[#0A1931] py-16 px-8 md:px-16 lg:px-24 flex items-center"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Spiral Line Drawing - Left Side */}
          <div className="flex items-center justify-center h-full">
            <svg
              ref={svgRef}
              viewBox="0 0 400 600"
              className="w-full max-w-md h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Spiral line: starts curvy from top, does one spiral, then goes straight down */}
              <path
                d="M200 50 
                   C220 70, 230 90, 235 115
                   C240 140, 235 165, 220 185
                   C205 205, 180 215, 160 210
                   C140 205, 125 185, 120 160
                   C115 135, 120 105, 140 85
                   C160 65, 190 60, 215 70
                   C240 80, 260 105, 265 135
                   C270 165, 260 195, 240 220
                   C220 245, 190 260, 155 260
                   C120 260, 90 240, 75 210
                   C60 180, 60 145, 75 115
                   C90 85, 120 65, 155 60
                   C190 55, 230 65, 260 90
                   C290 115, 310 150, 315 190
                   C320 230, 310 270, 285 305
                   L285 550"
                stroke="#FEF3C7"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Content - Right Side */}
          <div ref={textRef} className="space-y-4">
            <h2 className="editorial-title text-4xl md:text-6xl text-[#FDF8F3] mb-6">
              About Us
            </h2>
            <div className="editorial-body text-base md:text-lg text-[#FDF8F3]/80 space-y-4">
              <p>
                Beschi SSC Ltd emerged from a simple belief: great ideas deserve great partnerships. We're a venture studio that doesn't just invest—we build alongside founders.
              </p>
              <p className="text-[#FEF3C7] font-semibold">
                We've helped launch over 40 ventures, turning concepts into market leaders. We bring capital, expertise, and commitment to see your vision through—from idea to impact.
              </p>
            </div>
          </div>
        </div>
        
        {/* Curvaceous border at bottom transitioning to Services section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg 
            className="relative block w-full h-[80px] md:h-[120px]" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,30 C200,80 400,10 600,40 C800,70 1000,20 1200,50 L1200,120 L0,120 Z" 
              fill="#FDF8F3"
            />
          </svg>
        </div>
      </section>
    </div>
  )
}