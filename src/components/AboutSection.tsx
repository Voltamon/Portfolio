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
      gsap.from(textRef.current!.querySelectorAll("h2, p"), {
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

      // Paper plane animation - flies in and rotates
      gsap.fromTo(svgRef.current,
        {
          x: -200,
          y: 200,
          rotation: -45,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            pin: sectionRef.current,
            pinSpacing: false,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-[200vh] -mt-1">
      <section
        id="about"
        ref={sectionRef}
        className="sticky top-0 h-screen bg-[#0A1931] py-16 px-8 md:px-16 lg:px-24 flex items-center"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          {/* Paper Plane SVG - Left Side */}
          <div className="flex items-center justify-center h-full order-2 md:order-1 mt-8 md:mt-0">
            <svg
              ref={svgRef}
              viewBox="0 0 200 200"
              className="w-full max-w-[250px] md:max-w-sm h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Paper plane design */}
              <path
                d="M20 100 L180 20 L100 180 L80 100 L20 100 Z"
                fill="#FEF3C7"
                stroke="#FEF3C7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M180 20 L80 100"
                stroke="#0A1931"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M100 180 L80 100"
                stroke="#0A1931"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Text Content - Right Side */}
          <div ref={textRef} className="space-y-4 order-1 md:order-2 text-center md:text-left">
            <h2 className="editorial-title text-4xl md:text-6xl lg:text-7xl text-[#FDF8F3] mb-4 md:mb-6">
              About Me
            </h2>
            <div className="editorial-body text-lg md:text-xl lg:text-2xl text-[#FDF8F3]/80 space-y-4">
              <p>
                As a Devpreneur, I am committed to building products to solve genuine problems from real life, blending technical excellence with intuitive design to deliver real value to users and markets.
              </p>
              <p className="text-[#FEF3C7] font-semibold">
                I thrive on the challenge of wearing multiple hats—developer, entrepreneur and manager. I focus on shipping lean, efficient solutions that actually make an impact.
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