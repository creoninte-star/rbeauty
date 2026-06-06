"use client";

// Premium scroll-driven hero video scrubbing implementation
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.8,
      ease: easeSmooth,
    },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    // Immediately resolve loading state if video metadata/data is already loaded (common in fast local servers)
    if (video.readyState >= 1) {
      setIsVideoReady(true);
    }

    const handleLoaded = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (video.readyState < 1) return; // HAVE_METADATA
      if (!video.duration || isNaN(video.duration)) return;
      
      const loops = 1.5;
      const targetTime = (progress * loops * video.duration) % video.duration;
      
      try {
        video.currentTime = targetTime;
      } catch (err) {
        console.error("Error setting video current time:", err);
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-12 lg:py-0">
        {/* Left Side — Text Content */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 lg:max-w-[55%] flex flex-col gap-6 z-10"
        >
          {/* Establishment Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeSmooth, delay: 0.1 }}
            className="text-xs tracking-[0.25em] uppercase text-[#7A6260]"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Est. 2019 · North Paravur, Kerala
          </motion.p>

          {/* Main Heading */}
          <div>
            <motion.h1
              className="leading-[0.95]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              <motion.span
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="block text-[#2C1A1D]"
              >
                Where Beauty
              </motion.span>
              <motion.span
                custom={1}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                <span className="text-[#2C1A1D]">Meets </span>
                <span
                  className="italic text-[#C9896A]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Elegance
                </span>
              </motion.span>
            </motion.h1>
          </div>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeSmooth, delay: 0.6 }}
            className="text-base md:text-lg max-w-md leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "var(--color-text-muted)",
            }}
          >
            Premium facials, hair styling, nail art & bridal makeup.
            <br />
            Trusted by 228+ happy clients in Ernakulam.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeSmooth, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <a href="#booking" className="btn-primary">
              Book Appointment
            </a>
            <a href="#services" className="btn-ghost">
              Explore Services
            </a>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeSmooth, delay: 1.0 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2.5 mt-2 w-fit card-shadow"
          >
            <span className="text-lg">⭐</span>
            <span
              className="text-sm font-medium text-[#2C1A1D]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              4.9 / 5
            </span>
            <span className="w-px h-4 bg-[#E8C9BE]" />
            <span
              className="text-xs text-[#7A6260]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              228 Reviews
            </span>
          </motion.div>
        </motion.div>

        {/* Right Side — Video/Image Container */}
        <motion.div
          style={{ y: imageY }}
          className="flex-1 lg:max-w-[45%] w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easeSmooth, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[3/4] card-shadow bg-[#F5EEE8]"
          >
            {/* Placeholder Image (fade out when video is ready) */}
            <div
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: isVideoReady ? 0 : 1, pointerEvents: isVideoReady ? "none" : "auto" }}
            >
              <Image
                src="/images/hero_placeholder.png"
                alt="R Beauty Family Salon — elegant hair styling"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>

            {/* Video element */}
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: isVideoReady ? 1 : 0 }}
              onLoadedData={() => setIsVideoReady(true)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A1D]/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8C9BE] rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9896A] rounded-full blur-[100px] opacity-15 pointer-events-none" />
    </section>
  );
}
