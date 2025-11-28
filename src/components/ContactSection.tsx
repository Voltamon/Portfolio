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
      {/* Swinging Lightbulb Animation - turns on when scrolled to end */}
      <div className="absolute inset-0 pointer-events-auto">
        <LightAnimation bulbOn={bulbOn} />
      </div>

      {/* Single column layout with better spacing */}
      <div className="relative z-10 max-w-6xl w-full">
        
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
              href="mailto:hello@beschi-ssc.com"
              className="inline-block px-8 md:px-12 py-4 md:py-6 bg-[#FDF8F3] text-[#0A1931] editorial-body text-lg md:text-xl font-semibold rounded-full hover:bg-[#FEF3C7] transition-colors">
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={bulbOn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 md:pt-12 space-y-2 md:space-y-3 text-[#FDF8F3]/60">
            <p className="editorial-body text-sm md:text-base">hello@beschi-ssc.com</p>
            <p className="editorial-body text-sm md:text-base">+1 (555) 123-4567</p>
            <p className="editorial-body text-sm md:text-base">123 Innovation Drive, Tech City, TC 12345</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}