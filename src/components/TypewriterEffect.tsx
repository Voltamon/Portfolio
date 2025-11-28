"use client"

import { useState, useEffect } from "react"

const quotes = [
  "Innovation is the bridge between dreams and reality.",
  "Great ventures begin with bold vision.",
  "We turn ambition into achievement.",
  "Where ideas meet execution, magic happens.",
  "Building the future, one venture at a time.",
]

export default function TypewriterEffect() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentQuote = quotes[currentQuoteIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentQuote.length) {
            setCurrentText(currentQuote.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentQuoteIndex((currentQuoteIndex + 1) % quotes.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentQuoteIndex])

  return (
    <div className="editorial-body text-xl md:text-2xl text-[#FDF8F3] min-h-[60px] max-w-3xl mx-auto">
      {currentText}
      <span className="animate-pulse">|</span>
    </div>
  )
}