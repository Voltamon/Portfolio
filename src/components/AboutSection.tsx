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
          {/* Flowing Line Drawing - Left Side */}
          <div className="flex items-center justify-center h-full">
            <svg
              ref={svgRef}
              viewBox="0 0 300 700"
              className="w-full max-w-sm h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Organic flowing line following the reference image pattern */}
              <path
                d="M 80 30
                   C 90 50, 100 80, 105 110
                   C 110 140, 108 170, 95 195
                   C 82 220, 60 235, 40 235
                   C 20 235, 5 220, 0 195
                   C -5 170, 0 140, 15 120
                   C 30 100, 55 90, 80 95
                   C 105 100, 125 115, 135 140
                   C 145 165, 145 195, 135 220
                   
                   C 125 245, 108 265, 85 275
                   C 62 285, 38 285, 20 275
                   
                   C 10 270, 5 260, 8 245
                   C 11 230, 20 215, 35 205
                   C 50 195, 70 192, 90 200
                   C 110 208, 128 225, 138 248
                   C 148 271, 150 298, 145 325
                   
                   C 140 352, 128 378, 108 395
                   C 88 412, 62 418, 38 415
                   C 14 412, -5 400, -15 380
                   C -25 360, -25 335, -15 310
                   C -5 285, 12 265, 35 255
                   C 58 245, 85 245, 110 255
                   C 135 265, 158 285, 172 312
                   C 186 339, 192 372, 188 405
                   
                   C 184 438, 170 468, 148 490
                   C 126 512, 98 525, 68 530
                   C 50 533, 35 535, 25 540
                   C 20 543, 18 548, 20 555
                   C 22 562, 28 568, 38 575
                   C 48 582, 62 588, 78 595
                   C 94 602, 110 608, 125 615
                   C 140 622, 152 630, 160 640
                   C 165 647, 168 655, 168 665
                   L 168 695"
                stroke="#FEF3C7"
                strokeWidth="3"
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