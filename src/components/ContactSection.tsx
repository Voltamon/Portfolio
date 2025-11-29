"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LightAnimation from "./LightAnimation";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bulbOn, setBulbOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate if user has scrolled to the very end (within 100px of bottom)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      
      const isAtBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setBulbOn(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-teal-800 flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-20"
    >
      {/* Curvaceous border at top transitioning from Services section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none rotate-180">
        <svg 
          className="relative block w-full h-[80px] md:h-[120px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C250,20 500,90 750,50 C900,30 1050,70 1200,40 L1200,120 L0,120 Z" 
            fill="#0d9488"
          />
        </svg>
      </div>

      {/* Swinging Lightbulb Animation - turns on when scrolled to end */}
      <div className="absolute inset-0 pointer-events-auto">
        <LightAnimation bulbOn={bulbOn} />
      </div>

      {/* Single column layout with better spacing */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        
        {/* Text content - centered and compact */}
        <div className="space-y-8 md:space-y-12 text-left max-w-3xl">
          <div className="space-y-4 md:space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={bulbOn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="editorial-title text-4xl md:text-6xl lg:text-7xl text-[#FDF8F3]">
              Let's Build Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={bulbOn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="editorial-body text-lg md:text-xl lg:text-2xl text-[#FDF8F3]/80">
              Have an idea that could change the world?
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={bulbOn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <a
              href="mailto:deswarnavo@gmail.com"
              className="inline-block px-8 md:px-12 py-4 md:py-6 bg-[#FDF8F3] text-[#0A1931] editorial-body text-lg md:text-xl font-semibold rounded-full hover:bg-[#FEF3C7] transition-colors">
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={bulbOn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 md:pt-12 space-y-6">
            {/* Social Icons */}
            <div className="flex gap-6">
              <a
                href="https://github.com/Voltamon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FDF8F3] hover:text-[#FEF3C7] transition-colors"
                aria-label="GitHub">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://discord.com/users/849297204580843520"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FDF8F3] hover:text-[#FEF3C7] transition-colors"
                aria-label="Discord">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.718-.838-8.812-3.549-12.54a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.974-2.419 2.157-2.419 1.184 0 2.158 1.086 2.157 2.42 0 1.333-.974 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.974-2.419 2.157-2.419 1.184 0 2.158 1.086 2.157 2.42 0 1.333-.973 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/swarnavo-de-b5519a285/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FDF8F3] hover:text-[#FEF3C7] transition-colors"
                aria-label="LinkedIn">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 md:space-y-3 text-[#FDF8F3]/60">
              <p className="editorial-body text-sm md:text-base">deswarnavo@gmail.com</p>
              <p className="editorial-body text-sm md:text-base">+91 (877)-725-0831</p>
              <p className="editorial-body text-sm md:text-base">Kolkata, West Bengal, India 700078</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}