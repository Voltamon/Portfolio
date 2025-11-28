"use client"

import { useRef, useEffect } from "react"

export default function PaperPlaneFlight() {
  const planeRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate flight progress (0 to 1) based on first screen of scrolling
      const flightProgress = Math.min(scrollY / windowHeight, 1)
      
      if (planeRef.current && containerRef.current) {
        // Animate paper plane flying from left to right with an arc
        // Start: left side, middle height
        // End: right side, slightly higher
        
        const startX = -10 // Start off-screen left
        const endX = 110 // End off-screen right
        const x = startX + (endX - startX) * flightProgress
        
        // Create arc motion (parabolic curve)
        const startY = 50 // Middle of screen
        const peakY = 30 // Higher point at middle
        const endY = 40 // End position
        
        // Use sine wave for smooth arc
        const arcFactor = Math.sin(flightProgress * Math.PI)
        const y = startY + (peakY - startY) * arcFactor + (endY - startY) * flightProgress
        
        // Rotation: tilt upward at start, level at middle, slight down at end
        const rotation = -15 + (20 * Math.sin(flightProgress * Math.PI))
        
        planeRef.current.style.transform = `translate(${x}vw, ${y}vh) rotate(${rotation}deg)`
        planeRef.current.style.opacity = flightProgress > 0 ? '1' : '0'
        
        // Scale grows slightly as it flies
        const scale = 0.8 + (0.4 * flightProgress)
        planeRef.current.style.transform = `translate(${x}vw, ${y}vh) rotate(${rotation}deg) scale(${scale})`
      }
    }

    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity: 1 }}
    >
      <svg
        ref={planeRef}
        className="absolute transition-none"
        style={{
          opacity: 0,
          transform: 'translate(-10vw, 50vh) rotate(-15deg) scale(0.8)',
          width: '120px',
          height: '120px'
        }}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Paper plane SVG */}
        <g>
          {/* Main body */}
          <path
            d="M10 50 L90 50 L50 20 Z"
            fill="#FDF8F3"
            stroke="#0A1931"
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
          {/* Wing fold */}
          <path
            d="M50 20 L50 50 L90 50"
            fill="none"
            stroke="#0A1931"
            strokeWidth="1.5"
          />
          {/* Bottom wing */}
          <path
            d="M10 50 L50 70 L90 50"
            fill="#E5E7EB"
            stroke="#0A1931"
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
          {/* Center fold */}
          <path
            d="M50 20 L50 70"
            stroke="#0A1931"
            strokeWidth="1.5"
          />
          {/* Detail lines */}
          <path
            d="M30 50 L50 35"
            stroke="#0A1931"
            strokeWidth="1"
            opacity="0.5"
          />
          <path
            d="M70 50 L50 35"
            stroke="#0A1931"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
        
        {/* Motion trail effect */}
        <g opacity="0.3">
          <line
            x1="10"
            y1="50"
            x2="5"
            y2="50"
            stroke="#FDF8F3"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="15"
            y1="48"
            x2="8"
            y2="48"
            stroke="#FDF8F3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="15"
            y1="52"
            x2="8"
            y2="52"
            stroke="#FDF8F3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}
