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
        {/* SVG Line Drawing - Left Side */}
        <div className="flex items-center justify-center h-full">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="w-full max-w-md h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Light bulb outline - representing ideas */}
            <path
              d="M200 80 C160 80 130 110 130 150 C130 175 145 195 160 210 L160 250 L240 250 L240 210 C255 195 270 175 270 150 C270 110 240 80 200 80 Z"
              stroke="#FEF3C7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bulb base */}
            <path
              d="M170 250 L170 270 C170 280 180 290 200 290 C220 290 230 280 230 270 L230 250"
              stroke="#FEF3C7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bulb bottom tip */}
            <path
              d="M190 290 L190 305 C190 310 195 315 200 315 C205 315 210 310 210 305 L210 290"
              stroke="#FEF3C7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Light rays */}
            <path
              d="M200 50 L200 70"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M280 90 L265 105"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M310 150 L290 150"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M120 90 L135 105"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M90 150 L110 150"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Connecting lines - representing network/partnership */}
            <circle cx="80" cy="320" r="15" stroke="#FDF8F3" strokeWidth="2" />
            <circle cx="200" cy="350" r="15" stroke="#FDF8F3" strokeWidth="2" />
            <circle cx="320" cy="320" r="15" stroke="#FDF8F3" strokeWidth="2" />
            <path
              d="M200 315 L200 335"
              stroke="#FDF8F3"
              strokeWidth="2"
            />
            <path
              d="M95 325 L185 345"
              stroke="#FDF8F3"
              strokeWidth="2"
            />
            <path
              d="M215 345 L305 325"
              stroke="#FDF8F3"
              strokeWidth="2"
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