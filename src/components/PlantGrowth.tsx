"use client"

import { useRef, useEffect } from "react"
import styles from "./PlantGrowth.module.css"

export default function PlantGrowth() {
  const stemRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate growth progress (0 to 1) based on first screen of scrolling
      const growthProgress = Math.min(scrollY / windowHeight, 1)
      
      if (stemRef.current) {
        // Animate stem height from -40% to 20%
        const stemBottom = -40 + (60 * growthProgress) // -40% to 20%
        const stemWidth = 1 + (1 * growthProgress) // 1% to 2%
        
        stemRef.current.style.bottom = `${stemBottom}%`
        stemRef.current.style.width = `${stemWidth}%`
        
        // Animate leaves
        const leaves = stemRef.current.querySelectorAll(`.${styles.leaf}`)
        leaves.forEach((leaf) => {
          const leafElement = leaf as HTMLElement
          leafElement.style.width = `${700 * growthProgress}%`
          leafElement.style.height = `${10 * growthProgress}%`
        })
        
        // Special animation for top leaves
        const leaf05 = stemRef.current.querySelector(`.${styles.leaf05}`) as HTMLElement
        const leaf06 = stemRef.current.querySelector(`.${styles.leaf06}`) as HTMLElement
        
        if (leaf05) {
          const top05 = 5 + (-22 * growthProgress) // 5% to -17%
          const left05 = 10 + (-130 * growthProgress) // 10% to -120%
          leaf05.style.top = `${top05}%`
          leaf05.style.left = `${left05}%`
        }
        
        if (leaf06) {
          const top06 = 0 + (-9 * growthProgress) // 0% to -9%
          leaf06.style.top = `${top06}%`
        }
      }
      
      // Update container opacity
      if (containerRef.current) {
        containerRef.current.style.opacity = growthProgress > 0 ? '1' : '0'
      }
    }

    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.plantGrowthContainer} style={{ opacity: 0, transition: 'opacity 0.3s' }}>
      <div className={styles.box}>
        <div 
          className={styles.stem} 
          ref={stemRef}
          style={{
            bottom: '-40%',
            width: '1%',
            transition: 'none'
          }}
        >
          <div className={`${styles.leaf} ${styles.leaf01}`} style={{ width: '0%', height: '0%' }}>
            <div className={styles.line}></div>
          </div>
          <div className={`${styles.leaf} ${styles.leaf02}`} style={{ width: '0%', height: '0%' }}>
            <div className={styles.line}></div>
          </div>
          <div className={`${styles.leaf} ${styles.leaf03}`} style={{ width: '0%', height: '0%' }}>
            <div className={styles.line}></div>
          </div>
          <div className={`${styles.leaf} ${styles.leaf04}`} style={{ width: '0%', height: '0%' }}>
            <div className={styles.line}></div>
          </div>
          <div className={`${styles.leaf} ${styles.leaf05}`} style={{ width: '0%', height: '0%', top: '5%', left: '10%' }}>
            <div className={styles.line}></div>
          </div>
          <div className={`${styles.leaf} ${styles.leaf06}`} style={{ width: '0%', height: '0%', top: '0%' }}>
            <div className={styles.line}></div>
          </div>
        </div>
        <div className={styles.pot}></div>
        <div className={styles.potTop}></div>
      </div>
    </div>
  )
}