"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BulbSvg from './BulbSvg';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Colors = {
  light: '#ebd1a4',
  lightOn: '#fff',
  lightOff: '#222222',
};

interface LightAnimationProps {
  bulbOn: boolean;
}

export default function LightAnimation({ bulbOn }: LightAnimationProps) {
  const bulbContainerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<SVGSVGElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bulbContainerRef.current || !glowRef.current) return;

    const ctx = gsap.context(() => {
      // Heavy continuous swinging animation with more frames and easing
      gsap.to(bulbContainerRef.current, {
        rotation: 6,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "top center",
      });

      // Add subtle y-axis movement for more realistic swing
      gsap.to(bulbContainerRef.current, {
        y: 15,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Heavier glow animation with delayed response
      gsap.to(glowRef.current, {
        x: 55,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Add scale animation to glow for breathing effect
      gsap.to(glowRef.current, {
        scale: 1.15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animate cord opacity based on bulb state with delay
      gsap.to(cordRef.current, {
        opacity: bulbOn ? 0.5 : 0.3,
        duration: 1.2,
        ease: "power2.out",
      });

      // Add subtle scale animation to bulb when on
      if (bulbOn) {
        gsap.to(bulbRef.current, {
          scale: 1.05,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        });
        
        // Pulsing animation when light is on
        gsap.to(bulbRef.current, {
          opacity: 0.95,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else {
        gsap.to(bulbRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [bulbOn]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Bulb container with swinging animation - moved to right side */}
      <div
        ref={bulbContainerRef}
        style={{
          position: 'absolute',
          right: '15%',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
          transformOrigin: 'top center',
        }}
      >
        {/* Hanging line/cord - adjusted for 60% section coverage */}
        <div
          ref={cordRef}
          style={{
            width: 2,
            height: '45vh',
            backgroundColor: bulbOn ? Colors.lightOn : Colors.lightOff,
            opacity: 0.3,
            transition: 'background-color 0.8s ease',
          }}
        />
        <div
          ref={bulbRef}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <BulbSvg on={bulbOn} />
        </div>
      </div>

      {/* Animated light glow with heavier GSAP */}
      <svg
        ref={glowRef}
        height="100vh"
        width="200vw"
        style={{
          position: 'absolute',
          top: 0,
          right: 30,
        }}
      >
        <defs>
          <radialGradient id="grad2">
            <stop
              offset="100%"
              stopColor={Colors.light}
              stopOpacity={bulbOn ? 0.03 : 0}
              style={{ transition: 'stop-opacity 1s ease' }}
            />
            <stop
              offset="80%"
              stopColor={Colors.light}
              stopOpacity={bulbOn ? 0.15 : 0}
              style={{ transition: 'stop-opacity 1s ease 0.1s' }}
            />
            <stop
              offset="60%"
              stopColor={Colors.light}
              stopOpacity={bulbOn ? 0.29 : 0}
              style={{ transition: 'stop-opacity 1s ease 0.2s' }}
            />
            <stop
              offset="40%"
              stopColor={Colors.light}
              stopOpacity={bulbOn ? 0.45 : 0}
              style={{ transition: 'stop-opacity 1s ease 0.3s' }}
            />
            <stop
              offset="10%"
              stopColor={Colors.light}
              stopOpacity={bulbOn ? 0.72 : 0}
              style={{ transition: 'stop-opacity 1s ease 0.4s' }}
            />
          </radialGradient>
        </defs>
        <circle cx="475" cy="235" r="307" fill="url(#grad2)" />
      </svg>
    </div>
  );
}