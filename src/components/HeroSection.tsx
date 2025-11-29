"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypewriterEffect from "./TypewriterEffect";
import ComputerAnimation from "./ComputerAnimation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const titleText = useMemo(() => "Voltamon@48", []);

  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll("span[data-char]");

    gsap.fromTo(
      chars,
      { opacity: 0, y: 60, rotationX: -60 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: { amount: 0.6, from: "start" },
      }
    );
  }, []);

  // Pin the sticky hero while the computer animation runs
  useEffect(() => {
    if (!sectionRef.current) return;

    const stickyEl = sectionRef.current.querySelector('.sticky') as HTMLElement | null;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyEl || sectionRef.current,
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-[#0A1931] overflow-x-hidden">

      {/* Sticky full-screen hero area */}
      <div className="sticky top-0 left-0 w-full h-screen bg-[#64748B] py-16 px-8 md:px-16 lg:px-24 flex items-center box-border overflow-x-hidden">

        <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full">
            <h1
              ref={titleRef}
              className="editorial-title text-4xl md:text-6xl lg:text-7xl text-[#FDF8F3] mb-6 w-full"
              style={{ perspective: "1000px" }}>
              {Array.from(titleText).map((ch, i) => (
                <span key={i} data-char className="inline-block">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>

            <TypewriterEffect />
          </div>

          <div className="w-full flex justify-center md:justify-end">
            {/* intentionally empty; ComputerAnimation positioned absolutely below center */}
          </div>
        </div>

        {/* Computer Animation - constrained to the same centered width */}
        <div className="absolute bottom-5 left-0 w-full z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-center md:justify-end md:pr-24 overflow-hidden">
            <ComputerAnimation sectionRef={sectionRef} />
          </div>
        </div>

        {/* Bottom curve separating sections */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 C300,100 600,0 900,50 C1050,75 1150,90 1200,80 L1200,120 L0,120 Z" fill="#0A1931" />
          </svg>
        </div>
      </div>
    </section>
  );
}