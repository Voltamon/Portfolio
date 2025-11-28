"use client"

import { motion } from "framer-motion"

export default function BallClimbingStairs() {
  // Step positions (x, y, width) - final positions
  const steps = [
    { x: 10, y: 85, width: 15 },
    { x: 30, y: 70, width: 15 },
    { x: 50, y: 55, width: 15 },
    { x: 70, y: 40, width: 15 },
  ]

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated bar steps - they slide up into position */}
        {steps.map((step, index) => (
          <motion.rect
            key={index}
            x={step.x}
            width={step.width}
            height="3"
            fill="#f2f2f2"
            rx="1"
            animate={{
              y: [95, 95, 95, 95, step.y, step.y, step.y, step.y],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2 + index * 0.15, 0.3 + index * 0.15, 0.7, 0.85, 0.95, 1, 1],
              delay: index * 0.1,
            }}
          />
        ))}

        {/* Bouncing ball - stays mostly in center, bounces vertically */}
        <motion.ellipse
          cx="37.5"
          rx="3"
          fill="#ff6000"
          animate={{
            cy: [75, 55, 75, 55, 75],
            ry: [2.1, 3, 2.1, 3, 2.1], // Squash when landing, stretch when jumping
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
        
        {/* Shadow under the ball */}
        <motion.ellipse
          cx="37.5"
          cy="78"
          rx="4"
          ry="1"
          fill="#0A1931"
          opacity="0.2"
          animate={{
            rx: [4, 2, 4, 2, 4],
            opacity: [0.3, 0.15, 0.3, 0.15, 0.3],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      </svg>
    </div>
  )
}