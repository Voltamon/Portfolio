"use client"

import { motion } from "framer-motion"

export default function BallClimbingStairs() {
  // Step positions (x, y, width)
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
        {/* Bar steps */}
        {steps.map((step, index) => (
          <rect
            key={index}
            x={step.x}
            y={step.y}
            width={step.width}
            height="3"
            fill="#f2f2f2"
            rx="1"
          />
        ))}

        {/* Bouncing ball with squash and stretch effect */}
        <motion.ellipse
          rx="3"
          fill="#ff6000"
          animate={{
            cx: [17.5, 37.5, 57.5, 77.5, 17.5],
            cy: [75, 60, 45, 30, 75],
            ry: [2.1, 3, 2.1, 3, 2.1], // Squash when landing, stretch when jumping
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
        
        {/* Shadow under the ball */}
        <motion.ellipse
          cy="88"
          rx="4"
          ry="1"
          fill="#0A1931"
          opacity="0.2"
          animate={{
            cx: [17.5, 37.5, 57.5, 77.5, 17.5],
            rx: [4, 2, 4, 2, 4],
            opacity: [0.3, 0.1, 0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      </svg>
    </div>
  )
}