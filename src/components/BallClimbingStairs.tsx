"use client"

import { motion } from "framer-motion"

export default function BallClimbingStairs() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated bar steps using individual rects with shadows */}
        <defs>
          <filter id="step-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Step 1 */}
        <motion.rect
          x="72"
          width="15"
          height="2.5"
          fill="#f2f2f2"
          rx="1.25"
          filter="url(#step-shadow)"
          animate={{
            y: [95, 95, 35, 35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.1, 0.3, 1],
          }}
        />

        {/* Step 2 */}
        <motion.rect
          x="47"
          width="15"
          height="2.5"
          fill="#f2f2f2"
          rx="1.25"
          filter="url(#step-shadow)"
          animate={{
            y: [95, 95, 55, 55],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 1],
            delay: 0.1,
          }}
        />

        {/* Step 3 */}
        <motion.rect
          x="22"
          width="15"
          height="2.5"
          fill="#f2f2f2"
          rx="1.25"
          filter="url(#step-shadow)"
          animate={{
            y: [95, 95, 75, 75],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 1],
            delay: 0.2,
          }}
        />

        {/* Bouncing ball - red color */}
        <motion.ellipse
          cx="50"
          rx="3"
          fill="#ff0000"
          animate={{
            cy: [82, 50, 82],
            ry: [2.1, 3, 2.1], // Squash when landing, stretch when jumping
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Shadow under the ball */}
        <motion.ellipse
          cx="50"
          cy="85"
          rx="3.5"
          ry="0.8"
          fill="#000000"
          animate={{
            rx: [3.5, 2, 3.5],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}