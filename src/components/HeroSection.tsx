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
      className="relative w-full h-[200vh] bg-[#0A1931]">

        <div className="sticky top-0 left-0 w-full h-screen bg-[#64748B] py-16 px-8 md:px-16 lg:px-24 flex items-center overflow-x-hidden">
          <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full">
            <h1
              ref={titleRef}
              className="editorial-title text-4xl md:text-6xl lg:text-7xl text-[#FDF8F3] mb-6 w-full"
              style={{ perspective: "1000px" }}>

              Voltamon@48
            </h1>
            <TypewriterEffect />
          </div>

          <div className="w-full flex justify-center md:justify-end">
            {/* Computer Animation moved to absolute position below */}
          </div>
        </div>

        {/* Computer Animation - Positioned 5 units above bottom */}
        <div className="absolute bottom-5 left-0 w-full z-10 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-center md:justify-end md:pr-24">
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