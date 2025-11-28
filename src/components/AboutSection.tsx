"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current || !imageContainerRef.current) return

    const ctx = gsap.context(() => {
      // Heavier text animation with stagger and multiple properties
      gsap.from(textRef.current?.querySelectorAll("h2, p"), {
        x: -150,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      })

      // Heavier image entrance animation
      gsap.from(imageRef.current, {
        x: 150,
        opacity: 0,
        scale: 0.8,
        rotation: 10,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1.5,
        },
      })

      // Smooth morphing animation: circle -> square -> circle
      // Using ScrollTrigger for continuous morphing based on scroll position
      gsap.to(imageContainerRef.current, {
        borderRadius: "50%",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 3, // Higher scrub value = smoother, more delayed response
          onUpdate: (self) => {
            // Create wave-like morphing effect
            const progress = self.progress
            let radius
            
            if (progress < 0.33) {
              // First third: square to circle
              radius = gsap.utils.interpolate(8, 50, progress * 3)
            } else if (progress < 0.66) {
              // Middle third: circle to rounded square
              radius = gsap.utils.interpolate(50, 15, (progress - 0.33) * 3)
            } else {
              // Last third: rounded square back to circle
              radius = gsap.utils.interpolate(15, 50, (progress - 0.66) * 3)
            }
            
            gsap.to(imageContainerRef.current, {
              borderRadius: `${radius}%`,
              duration: 0.3,
              ease: "power2.out"
            })
          }
        },
      })

      // Add parallax effect to image
      gsap.to(imageRef.current?.querySelector("img"), {
        y: 50,
        scale: 1.1,
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      })

      // Animate the gradient overlay
      gsap.from(imageContainerRef.current?.querySelector(".gradient-overlay"), {
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A1931] py-24 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="space-y-6">
          <h2 className="editorial-title text-5xl md:text-7xl text-[#FDF8F3] mb-8">
            About Us
          </h2>
          <div className="editorial-body text-lg md:text-xl text-[#FDF8F3]/80 space-y-6">
            <p>
              Founded in the heart of innovation, Beschi SSC Ltd emerged from a simple belief: that great ideas deserve great partnerships. Our journey began when three entrepreneurs, each with failed startups behind them, realized that what they lacked wasn't vision—it was the right ecosystem. They created what they wished they had: a venture studio that doesn't just invest, but builds alongside founders.
            </p>
            <p className="text-[#FEF3C7] font-semibold">
              Today, we've helped launch over 40 ventures, turning midnight sketches into market leaders. We bring capital, expertise, and an unwavering commitment to see your vision through—from concept to category leader. Because every world-changing company started as someone's crazy idea.
            </p>
          </div>
        </div>

        <div 
          ref={imageContainerRef} 
          className="relative h-[600px] rounded-lg overflow-hidden"
        >
          <div ref={imageRef} className="w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
          <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-[#0A1931] to-transparent" />
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