"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: "Priya Nair",
    location: "Paravur",
    text: "Absolutely the best salon in North Paravur! My bridal makeup was stunning and everyone at the wedding kept complimenting me.",
    rating: 5,
  },
  {
    name: "Sneha Krishnan",
    location: "Ernakulam",
    text: "The facial here is next level. My skin has never felt so fresh and clean. Friendly staff and very affordable too!",
    rating: 5,
  },
  {
    name: "Asha Mathew",
    location: "Paravur",
    text: "Got my nails done for my sister's wedding — the nail art was perfect! The team is so talented and warm. Love this place!",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#C9896A"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section className="section-padding bg-[#F9F0EB]">
      <div className="max-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `${-current * 100}%` }}
              transition={{ duration: 0.6, ease: easeSmooth }}
            >
              {testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#FBF7F4] rounded-2xl p-8 md:p-12 card-shadow text-center">
                    {/* Large Quote Mark */}
                    <span
                      className="block text-7xl md:text-8xl text-[#E8C9BE] leading-none mb-4 -mt-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      &ldquo;
                    </span>

                    {/* Testimonial Text */}
                    <p
                      className="text-lg md:text-xl leading-relaxed mb-8 text-[#2C1A1D]"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                    >
                      {testimonial.text}
                    </p>

                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      <StarRating count={testimonial.rating} />
                    </div>

                    {/* Name & Location */}
                    <p
                      className="text-base text-[#2C1A1D] mb-1"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-xs tracking-[0.1em] uppercase text-[#7A6260]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-400 ${
                  i === current
                    ? "bg-[#C9896A] w-8"
                    : "bg-[#E8C9BE] hover:bg-[#C9896A]/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
