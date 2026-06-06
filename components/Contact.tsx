"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Map } from "lucide-react";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  // Google Maps sharing coordinates/details
  const googleMapsUrl = "https://www.google.com/maps/place/R+Beauty+family+saloon/@10.1414808,76.2343139,749m/data=!3m1!1e3!4m6!3m5!1s0x3b0811a33b2a0579:0xa1cfe830b5fb84ec!8m2!3d10.1414808!4d76.2343139!16s%2Fg%2F11p_6ddrgs?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D";
  
  // Standard embed URL (doesn't require private API keys)
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.8379201509376!2d76.23212521124674!3d10.141480800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0811a33b2a0579%3A0xa1cfe830b5fb84ec!2sR+Beauty+family+saloon!5e0!3m2!1sen!2sin!4v1717718000000!5m2!1sen!2sin";

  return (
    <section id="contact" className="section-padding bg-[#FBF7F4]">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Contact Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div>
              <span
                className="text-xs tracking-[0.2em] uppercase text-[#C9896A] mb-3 block"
                style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
              >
                Find Us
              </span>
              <h2
                className="text-[#2C1A1D]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                Visit the Salon
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#F5EEE8] rounded-lg text-[#2C1A1D] mt-0.5">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[#2C1A1D] text-sm tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    Our Address
                  </span>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    1/7, Kesari Road, North Paravur,
                    <br />
                    Ernakulam, Kerala – 683513
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#F5EEE8] rounded-lg text-[#2C1A1D] mt-0.5">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[#2C1A1D] text-sm tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    Opening Hours
                  </span>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    Monday – Sunday: 8:30 AM – 8:30 PM
                    <br />
                    <span className="text-[#C9896A]">Open every single day</span>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#F5EEE8] rounded-lg text-[#2C1A1D] mt-0.5">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[#2C1A1D] text-sm tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    Phone Number
                  </span>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {/* Add phone number placeholder */}
                    +91 XXXXXXXXXX
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Link button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-fit mt-2"
            >
              Get Directions
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

          {/* Right Column — Map Embed (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.15 }}
            className="lg:col-span-7 w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden card-shadow relative bg-[#F5EEE8] border border-[#2C1A1D]/8"
          >
            {/* Direct Google Maps Iframe */}
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="R Beauty Family Salon Location Map"
              className="absolute inset-0"
            />
            
            {/* Fallback overlay label */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg pointer-events-none shadow-sm flex items-center gap-2 border border-[#2C1A1D]/10">
              <Map size={14} className="text-[#C9896A]" />
              <span className="text-xs font-medium text-[#2C1A1D]" style={{ fontFamily: "var(--font-body)" }}>
                Kesari Road, North Paravur
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
