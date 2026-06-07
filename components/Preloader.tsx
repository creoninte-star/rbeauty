"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeSmooth = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: easeSmooth },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8"
          style={{ background: "#1E1215" }}
        >
          {/* ── Animated SVG emblem ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <svg
              width="110"
              height="110"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Thin background circle (static) */}
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                fill="none"
              />

              {/* Animated tracing circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                stroke="#E8C9BE"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{
                  rotate: -90,
                  transformOrigin: "50px 50px",
                }}
              />

              {/* 'R' letter — centred at (50,50) */}
              <motion.text
                x="50"
                y="50"
                dominantBaseline="central"
                textAnchor="middle"
                fill="#FBF7F4"
                fontFamily="Georgia, serif"
                fontSize="32"
                fontWeight="300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              >
                R
              </motion.text>

              {/* Decorative petal — top-right inside circle */}
              <motion.ellipse
                cx="68"
                cy="30"
                rx="5"
                ry="3"
                fill="#C9896A"
                opacity="0"
                transform="rotate(-35 68 30)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.45, ease: "easeOut" }}
                style={{ transformOrigin: "68px 30px" }}
              />
              {/* Second smaller petal */}
              <motion.ellipse
                cx="74"
                cy="38"
                rx="3.5"
                ry="2"
                fill="#C9896A"
                opacity="0"
                transform="rotate(-50 74 38)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.55, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.45, ease: "easeOut" }}
                style={{ transformOrigin: "74px 38px" }}
              />
            </svg>
          </motion.div>

          {/* ── Brand text ── */}
          <div className="flex flex-col items-center gap-2 overflow-hidden">
            <motion.span
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.75, ease: "easeOut" }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "18px",
                letterSpacing: "0.22em",
                fontWeight: 300,
                color: "#FBF7F4",
                textTransform: "uppercase",
              }}
            >
              R Beauty
            </motion.span>
            <motion.span
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 0.55 }}
              transition={{ delay: 0.85, duration: 0.75, ease: "easeOut" }}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "10px",
                letterSpacing: "0.28em",
                fontWeight: 300,
                color: "#E8C9BE",
                textTransform: "uppercase",
              }}
            >
              Where Beauty Meets Elegance
            </motion.span>
          </div>

          {/* ── Thin gold progress line ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            style={{
              width: "80px",
              height: "1px",
              background: "rgba(232,201,190,0.2)",
              position: "relative",
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.2,
                delay: 1.0,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, #C9896A, transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
