"use client"

import { useState, useRef } from "react"
import styles from "./PlantGrowth.module.css"

export default function PlantGrowth() {
  const stemRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleDropClick = () => {
    if (stemRef.current && !isAnimating) {
      setIsAnimating(true)
      stemRef.current.classList.add(styles.rain)
      
      setTimeout(() => {
        stemRef.current?.classList.remove(styles.rain)
        setIsAnimating(false)
      }, 2200)
    }
  }

  return (
    <div className={styles.plantGrowthContainer}>
      <div className={styles.instructions}>
        💧 Click the water drop to make the plant grow!
      </div>
      <button 
        className={styles.drop} 
        onClick={handleDropClick}
        title="Water drop - Click to grow plant"
        aria-label="Water drop button"
      />
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