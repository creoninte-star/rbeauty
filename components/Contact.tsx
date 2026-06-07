"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const contactDetails = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Our Address",
    value: "1/7, Kesari Road, North Paravur\nErnakulam, Kerala – 683513",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Opening Hours",
    value: "Monday – Sunday\n8:30 AM – 8:30 PM",
    accent: "Open every single day",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 98950 00000",
    href: "tel:+919895000000",
  },
];

const googleMapsUrl =
  "https://www.google.com/maps/place/R+Beauty+family+saloon/@10.1414808,76.2343139,749m/data=!3m1!1e3!4m6!3m5!1s0x3b0811a33b2a0579:0xa1cfe830b5fb84ec!8m2!3d10.1414808!4d76.2343139!16s%2Fg%2F11p_6ddrgs?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D";

const embedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.8379201509376!2d76.23212521124674!3d10.141480800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0811a33b2a0579%3A0xa1cfe830b5fb84ec!2sR+Beauty+family+saloon!5e0!3m2!1sen!2sin!4v1717718000000!5m2!1sen!2sin";

export default function Contact() {
  return (
    <section id="contact" className="section-padding" style={{ background: "#FBF7F4" }}>
      <div className="max-container px-6 md:px-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 md:mb-16"
        >
          <span
            className="block text-[11px] tracking-[0.22em] uppercase mb-3"
            style={{ fontFamily: "var(--font-body)", color: "#C9896A" }}
          >
            Find Us
          </span>
          <h2
            className="text-[#2C1A1D] leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
            }}
          >
            Visit the Salon
          </h2>
          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="mt-5 h-px w-16 origin-left"
            style={{
              background: "linear-gradient(90deg, #C9896A, #E8C9BE, transparent)",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Left: contact cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              >
                <a
                  href={item.href}
                  className="group flex gap-4 items-start p-5 rounded-2xl transition-all duration-400"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(44,26,29,0.06)",
                    boxShadow: "0 2px 16px rgba(44,26,29,0.04)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    cursor: item.href ? "pointer" : "default",
                    textDecoration: "none",
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, #F5EEE8, #EDE3DB)",
                      color: "#C9896A",
                      boxShadow: "0 2px 8px rgba(201,137,106,0.15)",
                    }}
                  >
                    {item.icon}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <span
                      className="text-[10px] uppercase tracking-[0.18em]"
                      style={{ fontFamily: "var(--font-body)", color: "#C9896A", fontWeight: 500 }}
                    >
                      {item.label}
                    </span>
                    <p
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: "var(--font-body)", color: "#2C1A1D", fontWeight: 300 }}
                    >
                      {item.value}
                    </p>
                    {item.accent && (
                      <span
                        className="text-xs mt-0.5"
                        style={{ fontFamily: "var(--font-body)", color: "#C9896A" }}
                      >
                        {item.accent}
                      </span>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}

            {/* Directions CTA */}
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-3 self-start rounded-full mt-2 transition-all duration-400"
              style={{
                padding: "0.9rem 2rem",
                background: "#2C1A1D",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                boxShadow: "0 6px 24px rgba(44,26,29,0.25)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Get Directions
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          {/* ── Right: map ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden"
            style={{
              height: "clamp(280px, 55vw, 480px)",
              boxShadow: "0 20px 60px rgba(44,26,29,0.12), 0 4px 16px rgba(44,26,29,0.08)",
              border: "1px solid rgba(44,26,29,0.07)",
            }}
          >
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="R Beauty Family Salon Location"
              className="absolute inset-0 w-full h-full"
            />
            {/* Overlay label */}
            <div
              className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-2 rounded-xl pointer-events-none"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 2px 12px rgba(44,26,29,0.1)",
                border: "1px solid rgba(44,26,29,0.06)",
              }}
            >
              <span style={{ color: "#C9896A", fontSize: "14px" }}>📍</span>
              <span
                className="text-xs font-medium"
                style={{ fontFamily: "var(--font-body)", color: "#2C1A1D" }}
              >
                Kesari Road, North Paravur
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
