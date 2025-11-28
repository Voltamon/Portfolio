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

  // Ball path coordinates (moves to the top-right corner of each stair)
  const ballPath = [
    { x: 17.5, y: 82 }, // Start at first stair
    { x: 32.5, y: 69 },
    { x: 47.5, y: 56 },
    { x: 62.5, y: 43 },
    { x: 77.5, y: 30 },
    { x: 92.5, y: 17 },
    { x: 17.5, y: 82 }, // Loop back to start
  ]

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Draw stairs */}
        {stairs.map((stair, index) => (
          <rect
            key={index}
            x={stair.x}
            y={stair.y}
            width={stair.width}
            height={stair.height}
            fill="#0A1931"
            opacity="0.3"
          />
        ))}

        {/* Animated ball */}
        <motion.circle
          r="2"
          fill="#0A1931"
          animate={{
            cx: ballPath.map(p => p.x),
            cy: ballPath.map(p => p.y),
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
          }}
        />
      </svg>

      {/* Multiple balls with delays for continuous effect */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.circle
          r="2"
          fill="#0A1931"
          animate={{
            cx: ballPath.map(p => p.x),
            cy: ballPath.map(p => p.y),
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
            delay: 2,
          }}
        />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.circle
          r="2"
          fill="#0A1931"
          animate={{
            cx: ballPath.map(p => p.x),
            cy: ballPath.map(p => p.y),
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
            delay: 4,
          }}
        />
      </svg>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.circle
          r="2"
          fill="#0A1931"
          animate={{
            cx: ballPath.map(p => p.x),
            cy: ballPath.map(p => p.y),
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
            delay: 6,
          }}
        />
      </svg>
    </div>
  )
}
