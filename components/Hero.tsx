"use client";

/**
 * Scroll-driven image sequence Hero
 * ──────────────────────────────────
 * 300 JPEG frames (frame_0000.jpg … frame_0299.jpg) are pre-loaded into
 * HTMLImageElement objects. A <canvas> element pinned to the viewport draws
 * the frame that corresponds to the current scroll position within this
 * section. The text overlay fades + translates upward during the first ~30%
 * of the scroll range so the sequence eventually plays over a clean canvas.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/* ── Constants ─────────────────────────────────────────────────────────── */
const TOTAL_FRAMES = 300;
const FRAME_PATH = (i: number) =>
  `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`;

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

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  /* Framer-motion scroll tracking */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Derived motion values for the text overlay */
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);

  /* ── Canvas draw helper ─────────────────────────────────────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete) return;

    /* Match canvas resolution to its CSS size (retina-aware) */
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    /* On mobile (<768px) zoom out slightly so more of the frame is visible.
       We do this by expanding the source rect by a zoom factor before
       clamping to the image bounds — this mimics a camera pull-back. */
    const isMobile = w < 768;
    const zoomFactor = isMobile ? 1.25 : 1.0; // 1.25 = show 25% more of source

    /* Cover-fit the image (same logic as CSS object-fit: cover) */
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;
    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    /* Apply zoom-out: expand source rect, re-centre, clamp */
    if (zoomFactor !== 1.0) {
      const newSw = Math.min(sw * zoomFactor, img.naturalWidth);
      const newSh = Math.min(sh * zoomFactor, img.naturalHeight);
      sx = Math.max(0, sx - (newSw - sw) / 2);
      sy = Math.max(0, sy - (newSh - sh) / 2);
      sw = newSw;
      sh = newSh;
    }

    /* Enhance rendering quality to mask compression artifacts */
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }, []);

  /* ── Update frame on scroll via rAF ─────────────────────────────────── */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const nextIndex = Math.min(
      Math.floor(v * TOTAL_FRAMES),
      TOTAL_FRAMES - 1
    );
    if (nextIndex !== frameIndexRef.current) {
      frameIndexRef.current = nextIndex;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(nextIndex));
    }
  });

  /* ── Pre-load all frames ────────────────────────────────────────────── */
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onLoad = () => {
      loaded++;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      if (loaded === TOTAL_FRAMES) {
        imagesRef.current = images;
        setImagesReady(true);
        drawFrame(0);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = onLoad;
      img.onerror = onLoad; // count errors too so we don't stall
      images[i] = img;
    }

    return () => {
      // cleanup – allow GC (images may still be referenced by canvas)
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  /* ── Handle resize so canvas stays sharp ────────────────────────────── */
  useEffect(() => {
    const onResize = () => drawFrame(frameIndexRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative"
      /* 400vh gives ~3 screens of scrolling room for the sequence */
      style={{ height: "400vh" }}
    >
      {/* ── Sticky viewport-pinned container ──────────────────────────── */}
      <div
        className="sticky top-0 left-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Canvas (full bleed) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: imagesReady ? 1 : 0,
            transition: "opacity 0.8s ease",
            filter: "contrast(1.05) saturate(1.1) brightness(0.95)",
          }}
        />

        {/* Cinematic overlay — stronger on mobile for readability & premium feel */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44,26,29,0.35) 0%, rgba(44,26,29,0.08) 40%, rgba(44,26,29,0.0) 55%, rgba(44,26,29,0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none block md:hidden"
          style={{
            background:
              "linear-gradient(160deg, rgba(30,18,21,0.72) 0%, rgba(30,18,21,0.45) 45%, rgba(30,18,21,0.15) 70%, rgba(30,18,21,0.6) 100%)",
          }}
        />

        {/* Loading indicator (shown while frames load) */}
        {!imagesReady && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ background: "var(--color-cream, #FAF5F0)" }}
          >
            <div className="relative w-48 h-[3px] rounded-full overflow-hidden bg-[#E8C9BE]/40">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #C9896A, #E8C9BE)",
                  width: `${loadProgress}%`,
                }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <p
              className="mt-4 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-body)",
                color: "#7A6260",
              }}
            >
              Loading experience · {loadProgress}%
            </p>
          </div>
        )}

        {/* ── Text overlay ────────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex items-end md:items-center z-10"
        >
          <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 pb-16 md:pb-0">
            <div className="max-w-xl flex flex-col gap-4 md:gap-5">
              {/* Establishment Label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: easeSmooth,
                  delay: 0.1,
                }}
                className="text-xs tracking-[0.25em] uppercase"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Est. 2019 · North Paravur, Kerala
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                className="leading-[0.95] text-[11vw] md:text-[clamp(3rem,6vw,5.5rem)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                }}
              >
                <motion.span
                  custom={0}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-white"
                  style={{
                    textShadow: "0 2px 40px rgba(20,10,12,0.7)",
                  }}
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
                  <span
                    className="text-white"
                    style={{
                      textShadow: "0 2px 40px rgba(20,10,12,0.7)",
                    }}
                  >
                    Meets{" "}
                  </span>
                  <span
                    className="italic"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#F4D5C4",
                      textShadow: "0 2px 40px rgba(20,10,12,0.7)",
                    }}
                  >
                    Elegance
                  </span>
                </motion.span>
              </motion.h1>

              {/* Sub-text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: easeSmooth,
                  delay: 0.6,
                }}
                className="text-sm md:text-lg max-w-md leading-relaxed"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 1px 16px rgba(20,10,12,0.65)",
                }}
              >
                Premium facials, hair styling, nail art &amp; bridal makeup.
                <br />
                Trusted by 228+ happy clients in Ernakulam.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: easeSmooth,
                  delay: 0.8,
                }}
                className="flex flex-row gap-3 mt-2"
              >
                <a
                  href="#booking"
                  className="btn-primary text-center text-xs md:text-sm px-4 py-3 md:px-6 md:py-3.5"
                  style={{
                    background: "#C9896A",
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 6px 28px rgba(201,137,106,0.5)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Book Appointment
                </a>
                <a
                  href="#services"
                  className="btn-ghost text-center text-xs md:text-sm px-4 py-3 md:px-6 md:py-3.5"
                  style={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background: "rgba(255,255,255,0.08)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Explore Services
                </a>
              </motion.div>

              {/* Rating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: easeSmooth,
                  delay: 1.0,
                }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mt-2 w-fit"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span className="text-lg">⭐</span>
                <span
                  className="text-sm font-medium text-white"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  4.9 / 5
                </span>
                <span
                  className="w-px h-4"
                  style={{ background: "rgba(255,255,255,0.3)" }}
                />
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  228 Reviews
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll-down indicator ───────────────────────────────────── */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
