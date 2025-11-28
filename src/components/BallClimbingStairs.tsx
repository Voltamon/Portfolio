"use client"

import { motion } from "framer-motion"

export default function BallClimbingStairs() {
  // Define stair positions (increasing height from bottom to top)
  const stairs = [
    { x: 10, y: 85, width: 15, height: 15 },
    { x: 25, y: 72, width: 15, height: 28 },
    { x: 40, y: 59, width: 15, height: 41 },
    { x: 55, y: 46, width: 15, height: 54 },
    { x: 70, y: 33, width: 15, height: 67 },
    { x: 85, y: 20, width: 15, height: 80 },
  ]

  // Ball stays relatively centered while stairs move down
  const ballY = 50 // Fixed Y position in middle of viewport

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Animated stairs - shift down creating infinite effect */}
        {stairs.map((stair, index) => (
          <motion.rect
            key={index}
            x={stair.x}
            width={stair.width}
            height={stair.height}
            fill="#0A1931"
            opacity="0.8"
            animate={{
              y: [stair.y, stair.y + 100],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3,
            }}
          />
        ))}
        
        {/* Second set of stairs for seamless loop */}
        {stairs.map((stair, index) => (
          <motion.rect
            key={`second-${index}`}
            x={stair.x}
            width={stair.width}
            height={stair.height}
            fill="#0A1931"
            opacity="0.8"
            animate={{
              y: [stair.y - 100, stair.y],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3,
            }}
          />
        ))}

        {/* Single ball climbing - moving horizontally as stairs descend */}
        <motion.circle
          r="2.5"
          fill="#0A1931"
          cy={ballY}
          animate={{
            cx: [17.5, 32.5, 47.5, 62.5, 77.5, 92.5, 17.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
          }}
        />
      </svg>
    </div>
  )
}