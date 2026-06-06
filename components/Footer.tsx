"use client";

import { motion } from "framer-motion";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#2C1A1D] text-white pt-20 pb-8 border-t border-white/5">
      <div className="max-container px-6 md:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-white/5">
          
          {/* Column 1 — Brand info */}
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-3 w-fit group">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-500 group-hover:scale-105"
              >
                {/* Inverse styling for dark background: stroke is light cream */}
                <circle cx="21" cy="21" r="20" stroke="#FBF7F4" strokeWidth="1.2" fill="none" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fill="#FBF7F4"
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="20"
                  fontWeight="400"
                >
                  R
                </text>
                <path
                  d="M30 12 C28 14, 26 13, 27 11 C28 9, 30 10, 30 12Z"
                  fill="#C9896A"
                  opacity="0.8"
                />
                <path
                  d="M32 14 C30 16, 29 14, 30 12.5 C31 11, 32 12, 32 14Z"
                  fill="#C9896A"
                  opacity="0.5"
                />
              </svg>
              <div className="flex flex-col">
                <span
                  className="text-xl tracking-wide text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  R Beauty
                </span>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase text-[#E8C9BE]/60 -mt-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Family Salon
                </span>
              </div>
            </a>
            <p
              className="text-sm text-[#E8C9BE]/70 leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              &ldquo;Where Beauty Meets Elegance&rdquo;
              <br />
              Your glow, our craft — every single day.
            </p>
            <p className="text-xs text-[#E8C9BE]/50 mt-2">
              &copy; {new Date().getFullYear()} R Beauty Family Salon. All rights reserved.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[#C9896A] text-sm uppercase tracking-[0.15em] font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#E8C9BE]/75 hover:text-[#C9896A] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Hours */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[#C9896A] text-sm uppercase tracking-[0.15em] font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Opening Hours
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[#E8C9BE]/75" style={{ fontFamily: "var(--font-body)" }}>
              <p className="flex justify-between">
                <span>Monday – Sunday:</span>
                <span className="text-white font-normal">8:30 AM – 8:30 PM</span>
              </p>
              <p className="text-xs text-[#E8C9BE]/50 mt-1">
                Open on all holidays and weekends.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-[#E8C9BE]/40" style={{ fontFamily: "var(--font-body)" }}>
          <p>Address: North Paravur, Ernakulam, Kerala</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Crafted with <span className="text-[#C9896A]">&hearts;</span> for R Beauty Family Salon
          </p>
        </div>
      </div>
    </footer>
  );
}
