"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypewriterEffect from "./TypewriterEffect";
import ComputerAnimation from "./ComputerAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text into characters
    const text = titleRef.current.textContent || "";
    titleRef.current.innerHTML = text.
      split("").
      map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`).
      join("");

    const chars = titleRef.current.querySelectorAll("span");

    // Animate characters in with stagger
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          amount: 0.8,
          from: "start"
        }
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-[#64748B]">

      <div className="sticky top-0 h-screen flex items-center justify-start overflow-hidden">
        <div className="relative px-8 md:px-16 lg:px-24 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full pl-12 md:pl-16">
            <h1
              ref={titleRef}
              className="editorial-title text-4xl md:text-6xl lg:text-7xl text-[#FDF8F3] mb-6 w-full"
              style={{ perspective: "1000px" }}>

              Voltamon@48
            </h1>
            <TypewriterEffect />
          </div>

          <div className="w-full flex justify-center md:justify-end">
            <ComputerAnimation sectionRef={sectionRef} />
          </div>
        </div>

        {/* Curvaceous border at bottom transitioning to About section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[80px] md:h-[120px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none">

            <path
              d="M0,50 C300,100 600,0 900,50 C1050,75 1150,90 1200,80 L1200,120 L0,120 Z"
              fill="#0A1931" />

          </svg>
        </div>
      </div>
    </section>);
}