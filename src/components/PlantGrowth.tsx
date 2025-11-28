"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import styles from "./PlantGrowth.module.css"

export default function PlantGrowth() {
  const stemRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const lastScrollY = useRef(0)

  const triggerGrowth = useCallback(() => {
    if (stemRef.current && !isAnimating) {
      setIsAnimating(true)
      stemRef.current.classList.add(styles.rain)
      
      setTimeout(() => {
        stemRef.current?.classList.remove(styles.rain)
        setIsAnimating(false)
      }, 2200)
    }
  }, [isAnimating])

  // Trigger on page load
  useEffect(() => {
    triggerGrowth()
  }, [triggerGrowth])

  // Trigger when scrolling up to hero section
  useEffect(() => {
    const heroSection = document.querySelector('main')
    if (!heroSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if we're scrolling up
          const currentScrollY = window.scrollY
          const isScrollingUp = currentScrollY < lastScrollY.current
          lastScrollY.current = currentScrollY

          // Trigger animation when hero is visible AND scrolling up
          if (entry.isIntersecting && isScrollingUp) {
            triggerGrowth()
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of hero is visible
        rootMargin: '0px'
      }
    )

    observer.observe(heroSection)

    return () => {
      observer.disconnect()
    }
  }, [triggerGrowth])

  return (
    <div className={styles.plantGrowthContainer} onClick={triggerGrowth} style={{ cursor: 'pointer' }}>
      <div className={styles.box}>
        <div className={styles.stem} ref={stemRef}>
          <div className={`${styles.leaf} ${styles.leaf01}`}><div className={styles.line}></div></div>
          <div className={`${styles.leaf} ${styles.leaf02}`}><div className={styles.line}></div></div>
          <div className={`${styles.leaf} ${styles.leaf03}`}><div className={styles.line}></div></div>
          <div className={`${styles.leaf} ${styles.leaf04}`}><div className={styles.line}></div></div>
          <div className={`${styles.leaf} ${styles.leaf05}`}><div className={styles.line}></div></div>
          <div className={`${styles.leaf} ${styles.leaf06}`}><div className={styles.line}></div></div>
        </div>
        <div className={styles.pot}></div>
        <div className={styles.potTop}></div>
      </div>
    </div>
  )
}