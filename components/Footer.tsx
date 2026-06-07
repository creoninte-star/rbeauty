"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#1A0F10] text-white pt-24 pb-12 overflow-hidden">
      {/* Premium glow effects in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#C9896A]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9896A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-container px-6 md:px-10 relative z-10">
        {/* Top Section - Large Logo / CTA */}
        <div className="flex flex-col items-center text-center mb-20">
          <a href="#home" className="group inline-flex flex-col items-center gap-6">
            <div className="relative">
              <svg
                width="64"
                height="64"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[360deg]"
              >
                <circle cx="21" cy="21" r="20" stroke="#C9896A" strokeWidth="1" fill="none" opacity="0.6" />
                <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#FBF7F4" fontFamily="'Cormorant Garamond', serif" fontSize="22" fontWeight="300">R</text>
                <path d="M30 12 C28 14, 26 13, 27 11 C28 9, 30 10, 30 12Z" fill="#C9896A" opacity="0.8" />
                <path d="M32 14 C30 16, 29 14, 30 12.5 C31 11, 32 12, 32 14Z" fill="#C9896A" opacity="0.5" />
              </svg>
              {/* Outer glow ring on hover */}
              <div className="absolute inset-0 rounded-full border border-[#C9896A]/0 group-hover:border-[#C9896A]/50 group-hover:scale-125 transition-all duration-700 pointer-events-none" />
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl tracking-widest text-[#FBF7F4]" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                R Beauty
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#C9896A] mt-2" style={{ fontFamily: "var(--font-body)" }}>
                Family Salon
              </span>
            </div>
          </a>
          <p className="mt-8 max-w-sm text-sm text-[#E8C9BE]/60 leading-relaxed font-light" style={{ fontFamily: "var(--font-body)" }}>
            Where beauty meets elegance. Your glow, our craft — every single day.
          </p>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-12 border-t border-white/10">
          
          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-5">
            <h4 className="text-white text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>Explore</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#E8C9BE]/60 hover:text-[#C9896A] transition-colors duration-300" style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-5 lg:col-span-2">
            <h4 className="text-white text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>Opening Hours</h4>
            <div className="w-full max-w-xs flex flex-col gap-3 text-sm text-[#E8C9BE]/60" style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Monday – Sunday</span>
                <span className="text-[#FBF7F4]">8:30 AM – 8:30 PM</span>
              </div>
              <p className="text-xs text-[#C9896A]/80 italic mt-2">
                * Open on all holidays and weekends.
              </p>
            </div>
          </div>

          {/* Social / Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-5">
            <h4 className="text-white text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-[#E8C9BE]/60" style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>
              <a href="tel:+919876543210" className="hover:text-[#C9896A] transition-colors">+91 98765 43210</a>
              <a href="mailto:hello@rbeauty.com" className="hover:text-[#C9896A] transition-colors">hello@rbeauty.com</a>
              <div className="flex items-center gap-4 mt-2">
                {/* Social Icons Placeholder */}
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C9896A] hover:border-[#C9896A] transition-all duration-300 text-white">
                  <span className="sr-only">Instagram</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C9896A] hover:border-[#C9896A] transition-all duration-300 text-white">
                  <span className="sr-only">Facebook</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E8C9BE]/40" style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}>
          <p>&copy; {new Date().getFullYear()} R Beauty Family Salon. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <span className="text-[#C9896A] animate-pulse">❤</span> in Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}
