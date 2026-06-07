"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Tiny animated gold line divider ── */
function GoldLine() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease, delay: 0.2 }}
      className="h-px w-20 mx-auto origin-left"
      style={{
        background: "linear-gradient(90deg, transparent, #C9896A, #E8C9BE, #C9896A, transparent)",
      }}
    />
  );
}

export default function BookingCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="booking"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(170deg, #1E1215 0%, #2C1A1D 60%, #3A2024 100%)" }}
    >
      {/* ── Atmospheric gold orbs (decorative) ── */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,137,106,0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,201,190,0.08) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* ── Animated gold particle lines ── */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px"
              style={{
                width: `${80 + i * 40}px`,
                top: `${25 + i * 25}%`,
                left: `${5 + i * 10}%`,
                background: "linear-gradient(90deg, transparent, rgba(201,137,106,0.4), transparent)",
              }}
              animate={{ x: ["0%", "300%"], opacity: [0, 1, 0] }}
              transition={{
                duration: 3 + i * 1.5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-container px-6 md:px-10 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto flex flex-col items-center gap-8 text-center"
        >
          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{
              border: "1px solid rgba(201,137,106,0.3)",
              background: "rgba(201,137,106,0.08)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#C9896A" }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-body)", color: "#C9896A" }}
            >
              Book Your Session
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
            className="text-white font-light leading-[1.05]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to{" "}
            <span
              className="italic"
              style={{
                color: "#E8C9BE",
                textShadow: "0 0 40px rgba(201,137,106,0.35)",
              }}
            >
              Glow?
            </span>
          </motion.h2>

          <GoldLine />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "rgba(232,201,190,0.75)",
              fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
              maxWidth: "32ch",
            }}
          >
            Book your appointment today.
            <br />
            Walk-ins are always welcome.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Call to Book — primary gold */}
            <a
              href="tel:+919895000000"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full"
              style={{
                padding: "1rem 2.25rem",
                background: "linear-gradient(135deg, #C9896A 0%, #D4996E 50%, #C9896A 100%)",
                backgroundSize: "200% 100%",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: "0 8px 32px rgba(201,137,106,0.4), 0 2px 8px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmerBtn 1.4s ease infinite",
                }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call to Book
            </a>

            {/* WhatsApp — glass ghost */}
            <a
              href="https://wa.me/919895000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full transition-all duration-500"
              style={{
                padding: "1rem 2.25rem",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(232,201,190,0.9)",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(232,201,190,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.015 14.072 1 11.993 1 6.558 1 2.133 5.37 2.13 10.8c-.002 1.745.471 3.45 1.368 4.965l-1.011 3.693 3.791-1.002zM17.18 14.28c-.284-.142-1.68-.829-1.94-.924-.26-.096-.45-.142-.64.142-.19.285-.736.925-.9 1.114-.165.189-.329.213-.613.072-2.716-1.353-4.474-3.079-5.337-4.561-.228-.392-.024-.604.175-.802.18-.178.4-.474.6-.711.197-.236.263-.402.394-.672.13-.27.065-.506-.033-.695-.098-.19-.854-2.06-1.17-2.822-.308-.744-.622-.643-.854-.655-.221-.012-.474-.015-.726-.015-.253 0-.665.095-.98.44-.317.345-1.206 1.18-1.206 2.879 0 1.698 1.236 3.336 1.41 3.572.173.237 2.433 3.715 5.894 5.207 2.89 1.247 3.48 1 4.735.882 1.255-.118 2.709-.766 3.097-1.479.388-.712.388-1.325.271-1.442-.116-.118-.387-.189-.672-.332z" />
              </svg>
              WhatsApp Us
            </a>
          </motion.div>

          {/* Hours badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-px" style={{ background: "rgba(201,137,106,0.4)" }} />
            <span
              className="text-[11px] tracking-[0.18em] uppercase"
              style={{ fontFamily: "var(--font-body)", color: "rgba(232,201,190,0.45)" }}
            >
              Open Every Day · 8:30 AM – 8:30 PM
            </span>
            <div className="w-8 h-px" style={{ background: "rgba(201,137,106,0.4)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
