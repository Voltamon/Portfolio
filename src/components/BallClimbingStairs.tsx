"use client"

import { motion } from "framer-motion"

export default function BallClimbingStairs() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Bouncing ball with squash and stretch effect */}
        <motion.ellipse
          cx="50"
          rx="3"
          fill="#ff6000"
          animate={{
            cy: [85, 20, 85],
            ry: [2.1, 3, 2.1], // Squash when landing, stretch when jumping
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
        
        {/* Shadow under the ball */}
        <motion.ellipse
          cx="50"
          cy="88"
          rx="4"
          ry="1"
          fill="#0A1931"
          opacity="0.3"
          animate={{
            rx: [4, 2, 4],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      </svg>
    </div>
  )
}