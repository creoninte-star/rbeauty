"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 4.9, label: "Top Rated in North Paravur", suffix: "★", isDecimal: true },
  { value: 228, label: "Happy Clients", suffix: "+", isDecimal: false },
  { value: 6, label: "Expert Services", suffix: "+", isDecimal: false },
  { value: 2019, label: "Serving Since", suffix: "", isDecimal: false },
];

function AnimatedNumber({
  value,
  suffix,
  isDecimal,
  inView,
}: {
  value: number;
  suffix: string;
  isDecimal: boolean;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = Date.now();
    const startValue = isDecimal ? 0 : value > 100 ? value - 50 : 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;

      setDisplay(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [inView, value, isDecimal]);

  return (
    <span>
      {isDecimal ? display.toFixed(1) : display}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="bg-[#2C1A1D] py-16 md:py-20">
      <div ref={ref} className="max-container px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: easeSmooth,
                delay: i * 0.1,
              }}
              className="text-center"
            >
              <div
                className="text-5xl md:text-6xl lg:text-7xl text-white mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  inView={inView}
                />
              </div>
              <p
                className="text-sm tracking-[0.08em] uppercase text-[#C9896A]"
                style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
