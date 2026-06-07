"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

function GalleryItem({ img, i, setLightboxIndex }: { img: any, i: number, setLightboxIndex: any }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  // Parallax + Fade-in & Scale
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Determine shape based on index for non-boxy, premium editorial look
  const getShapeClasses = (index: number) => {
    switch (index % 4) {
      case 0: return "rounded-[3rem] rounded-tr-none aspect-[3/4]";
      case 1: return "rounded-full aspect-[2/3]"; // Pill shape
      case 2: return "rounded-[2rem] aspect-square";
      case 3: return "rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl aspect-[4/5]";
      default: return "rounded-[2rem] aspect-square";
    }
  };

  return (
    <motion.div
      ref={itemRef}
      style={{ y, opacity, scale }}
      className="masonry-item group cursor-pointer mb-10 md:mb-16 relative"
      onClick={() => setLightboxIndex(i)}
    >
      <div className={`relative overflow-hidden card-shadow-hover bg-[#E8C9BE]/10 ${getShapeClasses(i)}`}>
        {/* Shimmer Placeholder Background */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#E8C9BE]/20 to-[#C9896A]/10" />
        
        <Image
          src={img.src}
          alt={img.title}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 z-10"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Elegant Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F10]/80 via-[#1A0F10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 z-20">
          <span
            className="text-[#FBF7F4] text-xl translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, letterSpacing: "0.05em" }}
          >
            {img.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section id="gallery" className="section-padding bg-gradient-to-b from-[#FBF7F4] to-[#F9F0EB] overflow-hidden">
        <div className="max-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="text-center mb-20 md:mb-28"
          >
            <span
              className="text-[#C9896A] text-xs uppercase tracking-[0.2em] mb-4 block"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              Portfolio
            </span>
            <h2
              className="mb-6 text-[#1A0F10]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              The R Beauty Experience
            </h2>
            <div className="w-16 h-[1px] bg-[#C9896A] mx-auto mb-6 opacity-50" />
            <p
              className="max-w-md mx-auto text-base"
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
          <div className="masonry-grid gap-x-6 md:gap-x-12">
            {galleryImages.map((img, i) => (
              <GalleryItem key={img.src} img={img} i={i} setLightboxIndex={setLightboxIndex} />
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
              layoutId={`gallery-img-${galleryImages[lightboxIndex].src}`}
              transition={{ duration: 0.5, ease: easeSmooth }}
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
