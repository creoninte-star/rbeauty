"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#FBF7F4]">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] card-shadow">
              <Image
                src="/images/about_interior.png"
                alt="R Beauty Family Salon — elegant salon interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#E8C9BE]/40 -z-10" />
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <h2
              className="text-[#2C1A1D]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              A Salon Built on Passion
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "var(--color-text-muted)",
              }}
            >
              Since 2019, R Beauty Family Salon has been Paravur&apos;s most trusted
              beauty destination. We combine skilled craftsmanship with premium
              products to deliver results that make you feel truly beautiful —
              every visit, every time.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "var(--color-text-muted)",
              }}
            >
              Open 7 days a week, 8:30 AM to 8:30 PM, we are always here when
              you need us.
            </p>

            {/* Rating tagline */}
            <p
              className="text-sm tracking-wide"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#C9896A",
              }}
            >
              Rated 4.9/5 by 228 clients on Google & Justdial.
            </p>

            {/* CTA Link */}
            <a
              href="https://www.google.com/maps/place/R+Beauty+family+saloon/@10.1414808,76.2343139,749m/data=!3m1!1e3!4m6!3m5!1s0x3b0811a33b2a0579:0xa1cfe830b5fb84ec!8m2!3d10.1414808!4d76.2343139!16s%2Fg%2F11p_6ddrgs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2C1A1D] hover:text-[#C9896A] transition-colors duration-300 group w-fit"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              <span className="text-sm tracking-wide">Find Us on Google Maps</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
