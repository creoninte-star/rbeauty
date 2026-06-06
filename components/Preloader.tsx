"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeSmooth = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: easeSmooth }
          }}
          className="fixed inset-0 bg-[#2C1A1D] z-[99999] flex flex-col items-center justify-center gap-6"
        >
          {/* Animated SVG Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tracing Outer Circle */}
              <motion.circle
                cx="21"
                cy="21"
                r="20"
                stroke="#FBF7F4"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1, rotate: 270 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                style={{ transformOrigin: "21px 21px" }}
              />
              
              {/* Fading in 'R' Text */}
              <motion.text
                x="21"
                y="22"
                dominantBaseline="central"
                textAnchor="middle"
                fill="#FBF7F4"
                fontFamily="var(--font-display)"
                fontSize="18"
                fontWeight="300"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 22 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                R
              </motion.text>

              {/* Fading in Leaves */}
              <motion.path
                d="M30 12 C28 14, 26 13, 27 11 C28 9, 30 10, 30 12Z"
                fill="#C9896A"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "27px 11px" }}
              />
              <motion.path
                d="M32 14 C30 16, 29 14, 30 12.5 C31 11, 32 12, 32 14Z"
                fill="#C9896A"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "30px 12.5px" }}
              />
            </svg>
          </motion.div>

          {/* Subtitle / Brand slogan */}
          <div className="overflow-hidden flex flex-col items-center gap-2">
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="text-white text-lg tracking-[0.15em] uppercase font-light font-body"
              style={{ fontFamily: "var(--font-body)" }}
            >
              R Beauty
            </motion.span>
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="text-[#E8C9BE] text-[10px] tracking-[0.25em] uppercase font-light font-body"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Where Beauty Meets Elegance
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
