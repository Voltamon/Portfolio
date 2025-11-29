"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#services" },
  { name: "Contact", href: "#contact" }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-1/2 z-50 flex gap-1.5 backdrop-blur-sm rounded-full hover:bg-[#0A1931] transition-colors !opacity-100 !bg-transparent !border-0"
        style={{ padding: '1rem', transform: 'translateX(-50%)' }}
        aria-label="Toggle menu">

        <motion.span
          animate={{ scale: isOpen ? 0 : 1 }}
          className="w-1.5 h-1.5 rounded-full bg-[#FDF8F3]" />

        <motion.span
          animate={{ scale: isOpen ? 0 : 1 }}
          className="w-1.5 h-1.5 rounded-full bg-[#FDF8F3]" />

        <motion.span
          animate={{ scale: isOpen ? 0 : 1 }}
          className="w-1.5 h-1.5 rounded-full bg-[#FDF8F3]" />

      </button>

      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#a47864]/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setIsOpen(false)}>

            <motion.nav
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}>

              {menuItems.map((menuItem) =>
                <motion.a
                  key={menuItem.name}
                  variants={item}
                  href={menuItem.href}
                  onClick={() => setIsOpen(false)}
                  className="editorial-title text-5xl md:text-7xl text-[#FDF8F3] hover:text-[#FEF3C7] transition-colors">

                  {menuItem.name}
                </motion.a>
              )}
            </motion.nav>
          </motion.div>
        }
      </AnimatePresence>
    </>);
}