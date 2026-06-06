"use client";

import { motion } from "framer-motion";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

export default function BookingCTA() {
  return (
    <section id="booking" className="relative bg-[#2C1A1D] py-24 md:py-32 overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9896A] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E8C9BE] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="max-container px-6 md:px-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeSmooth }}
          className="max-w-2xl mx-auto flex flex-col items-center gap-6"
        >
          {/* Section Header */}
          <h2
            className="text-white text-5xl md:text-6xl lg:text-7xl font-light leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Glow?
          </h2>
          
          <p
            className="text-[#E8C9BE]/80 text-base md:text-lg tracking-wide font-light max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Book your appointment today. Walk-ins are always welcome.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto justify-center">
            {/* Call Button */}
            <a
              href="tel:+910000000000" // Placeholder phone number
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9896A] text-white rounded-full text-sm uppercase tracking-[0.08em] hover:bg-[#b07355] transition-all duration-400 transform hover:-translate-y-0.5 shadow-lg shadow-[#C9896A]/20"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call to Book
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/910000000000" // Placeholder WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:border-white text-white rounded-full text-sm uppercase tracking-[0.08em] hover:bg-white/5 transition-all duration-400 transform hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.015 14.072 1 11.993 1 6.558 1 2.133 5.37 2.13 10.8c-.002 1.745.471 3.45 1.368 4.965l-1.011 3.693 3.791-1.002zM17.18 14.28c-.284-.142-1.68-.829-1.94-.924-.26-.096-.45-.142-.64.142-.19.285-.736.925-.9 1.114-.165.189-.329.213-.613.072-2.716-1.353-4.474-3.079-5.337-4.561-.228-.392-.024-.604.175-.802.18-.178.4-.474.6-.711.197-.236.263-.402.394-.672.13-.27.065-.506-.033-.695-.098-.19-.854-2.06-1.17-2.822-.308-.744-.622-.643-.854-.655-.221-.012-.474-.015-.726-.015-.253 0-.665.095-.98.44-.317.345-1.206 1.18-1.206 2.879 0 1.698 1.236 3.336 1.41 3.572.173.237 2.433 3.715 5.894 5.207 2.89 1.247 3.48 1 4.735.882 1.255-.118 2.709-.766 3.097-1.479.388-.712.388-1.325.271-1.442-.116-.118-.387-.189-.672-.332z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Opening Hours Text */}
          <span
            className="text-[#E8C9BE]/60 text-xs tracking-[0.15em] uppercase mt-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Open Every Day · 8:30 AM – 8:30 PM
          </span>
        </motion.div>
      </div>
    </section>
  );
}
