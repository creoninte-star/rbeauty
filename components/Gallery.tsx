"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const galleryImages = [
  { src: "/images/service_nails.png", title: "Nail Art & Design" },
  { src: "/images/service_facial.png", title: "Luxury Facial" },
  { src: "/images/service_hair_styling.png", title: "Hair Styling" },
  { src: "/images/service_bridal.png", title: "Bridal Makeup" },
  { src: "/images/service_haircut.png", title: "Precision Haircut" },
  { src: "/images/service_makeup.png", title: "Glamour Makeup" },
  { src: "/images/about_interior.png", title: "Our Salon" },
  { src: "/images/hero_placeholder.png", title: "Elegant Styling" },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: easeSmooth,
    },
  }),
};

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section id="gallery" className="section-padding bg-[#F9F0EB]">
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
              The R Beauty Experience
            </h2>
            <p
              className="max-w-lg mx-auto text-base"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "var(--color-text-muted)",
              }}
            >
              A glimpse into our world of beauty, elegance, and transformation.
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="masonry-item group cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <div
                  className={`relative overflow-hidden rounded-xl card-shadow ${
                    i % 3 === 0
                      ? "aspect-[3/4]"
                      : i % 3 === 1
                      ? "aspect-square"
                      : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#2C1A1D]/0 group-hover:bg-[#2C1A1D]/50 transition-all duration-500 flex items-end justify-center pb-8">
                    <span
                      className="text-white text-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                    >
                      {img.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay cursor-pointer"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeSmooth }}
              className="relative max-w-4xl max-h-[85vh] w-[90vw] aspect-[3/4] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                fill
                className="object-cover"
                sizes="90vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C1A1D]/60 to-transparent p-6">
                <span
                  className="text-white text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {galleryImages[lightboxIndex].title}
                </span>
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Navigation arrows */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 transition-colors"
                aria-label="Previous image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            {lightboxIndex < galleryImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 transition-colors"
                aria-label="Next image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
