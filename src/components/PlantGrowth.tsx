"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import styles from "./PlantGrowth.module.css"

export default function PlantGrowth() {
  const stemRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

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

  // Trigger when scrolling to top
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        if (window.scrollY === 0) {
          triggerGrowth()
        }
      }, 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [triggerGrowth])

  return (
    <div className={styles.plantGrowthContainer}>
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