"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    name: "Software Development",
    description:
      "Building robust systems. Full-stack architecture, clean code, scalable infrastructure."
  },
  {
    name: "Business Management",
    description:
      "Running the engine. Finance, operations, sustainability, growth."
  },
  {
    name: "Project Organization",
    description:
      "From vision to velocity. Task orchestration, timeline precision, scope clarity."
  },
  {
    name: "Marketing Operations",
    description:
      "Voices & velocity. Narrative craft, audience insight, revenue motion."
  },
  {
    name: "Continuous Learning",
    description:
      "Evolution in motion. Resilience, learning velocity, strategic pivoting."
  }];


export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeService, setActiveService] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        snap: {
          snapTo: 1 / (services.length - 1),
          duration: { min: 0.2, max: 0.8 },
          delay: 0,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          const index = Math.min(
            Math.floor(progress * services.length),
            services.length - 1
          );
          setActiveService(index);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text into words
    const text = titleRef.current.textContent || ""
    titleRef.current.innerHTML = text
      .split(" ")
      .map((word) => `<span class="inline-block mr-4">${word}</span>`)
      .join("")

    const words = titleRef.current.querySelectorAll("span")

    // Animate title when it enters viewport
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 50,
        rotationY: -45,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  // Generate stretched swirling thread path with organic curves
  const generateThreadPath = () => {
    const startX = 100;
    const startY = 300;
    const endX = 700;
    const endY = 300;
    const numSwirls = 4;
    const amplitude = 80;
    const points = 300;

    let path = `M ${startX} ${startY}`;

    for (let i = 1; i <= points; i++) {
      const t = i / points;
      const x = startX + (endX - startX) * t;
      const swirlFrequency = numSwirls * Math.PI * 2;
      const amplitudeVar = amplitude * Math.sin(t * Math.PI);
      const y = startY + amplitudeVar * Math.sin(t * swirlFrequency + t * Math.PI);
      const secondaryWave = 15 * Math.sin(t * 8 * Math.PI);
      path += ` L ${x} ${y + secondaryWave}`;
    }

    return path;
  };

  // Calculate positions for service markers along the thread
  const getServicePositions = () => {
    const startX = 100;
    const startY = 300;
    const endX = 700;
    const endY = 300;
    const numSwirls = 4;
    const amplitude = 80;

    return services.map((_, index) => {
      const t = index / (services.length - 1);
      const x = startX + (endX - startX) * t;
      const amplitudeVar = amplitude * Math.sin(t * Math.PI);
      const y = startY + amplitudeVar * Math.sin(t * numSwirls * Math.PI * 2 + t * Math.PI);
      const secondaryWave = 15 * Math.sin(t * 8 * Math.PI);
      return { x, y: y + secondaryWave };
    });
  };

  const servicePositions = getServicePositions();
  const pathLength = 2000;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-[#FDF8F3]"
      style={{ willChange: 'transform' }}>

      <div className="sticky top-0 h-screen flex items-center justify-center px-8" style={{ willChange: 'transform' }}>
        <div className="max-w-7xl w-full">
          <h2
            ref={titleRef}
            className="editorial-title text-4xl md:text-6xl lg:text-7xl text-[#0A1931] mb-16 text-center !w-full !h-5"
            style={{ perspective: "1000px" }}
          >
            My Skills
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div className="relative w-full max-w-4xl h-[250px]">
              <svg
                ref={svgRef}
                viewBox="0 150 800 300"
                className="!w-full !h-full"
                preserveAspectRatio="xMidYMid meet">

                <path
                  d={generateThreadPath()}
                  stroke="#0A1931"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.2" />

                <path
                  ref={pathRef}
                  d={generateThreadPath()}
                  stroke="url(#threadGradient)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength * (1 - scrollProgress)}
                  className="transition-all duration-100 ease-linear"
                  filter="url(#glow)" />

                <circle
                  cx={servicePositions[activeService]?.x || 100}
                  cy={servicePositions[activeService]?.y || 300}
                  r="20"
                  fill="#0A1931"
                  opacity="0.3"
                  className="transition-all duration-500 ease-out"
                  filter="url(#softGlow)">
                  <animate
                    attributeName="r"
                    values="20;25;20"
                    dur="2s"
                    repeatCount="indefinite" />
                </circle>

                {services.map((_, index) => {
                  const pos = servicePositions[index];
                  const isActive = index === activeService;
                  const isPassed = index < activeService;

                  return (
                    <g key={index}>
                      {isActive &&
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="18"
                          fill="none"
                          stroke="#0A1931"
                          strokeWidth="2"
                          opacity="0.8"
                          className="transition-all duration-500">
                          <animate
                            attributeName="r"
                            values="18;24;18"
                            dur="1.5s"
                            repeatCount="indefinite" />
                          <animate
                            attributeName="opacity"
                            values="0.8;0.4;0.8"
                            dur="1.5s"
                            repeatCount="indefinite" />
                        </circle>
                      }

                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isActive ? 12 : isPassed ? 8 : 6}
                        fill={isActive ? "#0A1931" : isPassed ? "#0A1931" : "#0A1931"}
                        stroke="#0A1931"
                        strokeWidth={isActive ? 3 : 2}
                        className="transition-all duration-500"
                        opacity={isPassed || isActive ? 1 : 0.4} />

                      {(isActive || isPassed) &&
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isActive ? 5 : 3}
                          fill="#FDF8F3"
                          className="transition-all duration-500" />
                      }
                    </g>);
                })}

                <defs>
                  <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0A1931" stopOpacity="0.6" />
                    <stop offset={`${scrollProgress * 100}%`} stopColor="#0A1931" stopOpacity="1" />
                    <stop offset={`${scrollProgress * 100 + 10}%`} stopColor="#0A1931" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0A1931" stopOpacity="0.3" />
                  </linearGradient>

                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="w-full max-w-3xl min-h-[180px] flex items-center justify-center">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center space-y-4">

                <h3 className="editorial-title text-3xl md:text-4xl text-[#0A1931] !w-full !h-[77px]">
                  {services[activeService].name}
                </h3>
                <p className="editorial-body text-lg md:text-xl lg:text-2xl text-[#0A1931] leading-relaxed mx-auto !w-full !h-[89px] !max-w-full">
                  {services[activeService].description}
                </p>

                <div className="flex gap-3 justify-center mt-6 !opacity-0">
                  {services.map((_, index) =>
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-500 ${index === activeService ?
                        "bg-[#0A1931] w-16 shadow-lg shadow-[#0A1931]/50" :
                        index < activeService ?
                          "bg-[#0A1931] w-12" :
                          "bg-[#0A1931]/30 w-10"}`
                      } />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}