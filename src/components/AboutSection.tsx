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

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Text animation from right
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

      // SVG line drawing animation
      const paths = svgRef.current?.querySelectorAll("path")
      paths?.forEach((path, index) => {
        const length = path.getTotalLength()
        
        // Set up the starting positions
        path.style.strokeDasharray = length.toString()
        path.style.strokeDashoffset = length.toString()
        
        // Animate the line drawing
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1.5,
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
    <section
      id="about"
      ref={sectionRef}
      className="relative h-screen bg-[#0A1931] py-16 px-8 md:px-16 lg:px-24 flex items-center"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Spiral Line Drawing - Left Side */}
        <div className="flex items-center justify-center h-full">
          <svg
            ref={svgRef}
            viewBox="0 0 400 500"
            className="w-full max-w-md h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Indeterminate Spiral Line - starts from top, spirals down to bottom */}
            <path
              d="M200 50 
                 C220 60, 230 80, 235 100
                 C240 120, 235 140, 220 155
                 C205 170, 180 175, 160 170
                 C140 165, 125 150, 120 130
                 C115 110, 120 85, 135 70
                 C150 55, 175 50, 195 55
                 C215 60, 235 75, 245 95
                 C255 115, 255 140, 245 165
                 C235 190, 215 210, 185 220
                 C155 230, 120 230, 95 215
                 C70 200, 55 170, 55 135
                 C55 100, 70 65, 100 45
                 C130 25, 170 20, 205 30
                 C240 40, 270 65, 285 95
                 C300 125, 305 160, 295 195
                 C285 230, 260 260, 225 280
                 C190 300, 145 310, 105 305
                 C65 300, 30 275, 15 240
                 C0 205, 0 160, 20 120
                 C40 80, 75 50, 120 35
                 C165 20, 215 20, 260 35
                 C305 50, 340 80, 360 120
                 C380 160, 385 205, 370 250
                 C355 295, 320 335, 270 360
                 C220 385, 160 395, 105 385
                 C50 375, 5 345, -10 300
                 C-25 255, -20 200, 5 150
                 C30 100, 70 60, 125 40
                 C180 20, 240 20, 290 45
                 C340 70, 380 110, 400 160
                 C420 210, 420 265, 395 315
                 C370 365, 325 405, 265 425
                 C205 445, 140 445, 85 420
                 C30 395, -10 350, -20 295"
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
  )
}