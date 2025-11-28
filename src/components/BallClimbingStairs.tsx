"use client"

import { motion } from "framer-motion"

export default function BallClimbingStairs() {
  // Define pillars - descending as they move to the right
  const pillars = [
    { x: 10, y: 20, width: 8, height: 80 },  // Tallest pillar on left
    { x: 25, y: 30, width: 8, height: 70 },
    { x: 40, y: 40, width: 8, height: 60 },
    { x: 55, y: 50, width: 8, height: 50 },
    { x: 70, y: 60, width: 8, height: 40 },
    { x: 85, y: 70, width: 8, height: 30 },  // Shortest pillar on right
  ]

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated pillars - shift right and down creating infinite effect */}
        {pillars.map((pillar, index) => (
          <motion.rect
            key={index}
            width={pillar.width}
            height={pillar.height}
            fill="#0A1931"
            opacity="0.8"
            animate={{
              x: [pillar.x, pillar.x + 100],
              y: [pillar.y, pillar.y + 10],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.4,
            }}
          />
        ))}
        
        {/* Second set of pillars for seamless loop */}
        {pillars.map((pillar, index) => (
          <motion.rect
            key={`second-${index}`}
            width={pillar.width}
            height={pillar.height}
            fill="#0A1931"
            opacity="0.8"
            animate={{
              x: [pillar.x - 100, pillar.x],
              y: [pillar.y - 10, pillar.y],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.4,
            }}
          />
        ))}

        {/* Ball jumping upward trying to reach higher pillars */}
        <motion.circle
          r="3"
          fill="#0A1931"
          animate={{
            cx: [14, 29, 44, 59, 74, 89, 14],
            cy: [18, 28, 38, 48, 58, 68, 18], // Jumping up to reach each pillar top
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
          }}
        />
      </svg>
    </div>
  )
}