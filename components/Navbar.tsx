"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeSmooth }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FBF7F4]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(44,26,29,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-500 group-hover:scale-105"
            >
              <circle cx="21" cy="21" r="20" stroke={scrolled ? "#2C1A1D" : "rgba(255,255,255,0.9)"} strokeWidth="1.2" fill="none" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fill={scrolled ? "#2C1A1D" : "rgba(255,255,255,0.95)"}
                fontFamily="'Cormorant Garamond', serif"
                fontSize="20"
                fontWeight="400"
              >
                R
              </text>
              {/* Leaf petal motif */}
              <path
                d="M30 12 C28 14, 26 13, 27 11 C28 9, 30 10, 30 12Z"
                fill="#C9896A"
                opacity="0.9"
              />
              <path
                d="M32 14 C30 16, 29 14, 30 12.5 C31 11, 32 12, 32 14Z"
                fill="#C9896A"
                opacity="0.6"
              />
            </svg>
            <div className="flex flex-col">
              <span
                className="text-xl tracking-wide transition-colors duration-500"
                style={{
                  fontFamily: "var(--font-display)",
                  color: scrolled ? "#2C1A1D" : "rgba(255,255,255,0.95)",
                  textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.4)",
                }}
              >
                R Beauty
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase -mt-0.5 transition-colors duration-500"
                style={{
                  fontFamily: "var(--font-body)",
                  color: scrolled ? "#7A6260" : "rgba(255,255,255,0.65)",
                }}
              >
                Family Salon
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm tracking-[0.06em] uppercase text-[#7A6260] hover:text-[#C9896A] transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                {link.name}
              </a>
            ))}
            <a href="#booking" className="btn-primary text-xs py-3 px-6">
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-[60]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] transition-colors duration-500"
              style={{ background: (scrolled || mobileOpen) ? "#2C1A1D" : "rgba(255,255,255,0.95)" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[1.5px] transition-colors duration-500"
              style={{ background: (scrolled || mobileOpen) ? "#2C1A1D" : "rgba(255,255,255,0.95)" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] transition-colors duration-500"
              style={{ background: (scrolled || mobileOpen) ? "#2C1A1D" : "rgba(255,255,255,0.95)" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="fixed inset-0 z-[55] bg-[#FBF7F4] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: easeSmooth }}
                className="text-3xl text-[#2C1A1D] hover:text-[#C9896A] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: easeSmooth }}
              className="btn-primary mt-4"
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
