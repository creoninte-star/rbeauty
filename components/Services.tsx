"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const easeSmooth = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    title: "Facial & Skin Care",
    desc: "Radiant skin starts here. Deep cleansing, nourishing facials.",
    price: "From ₹499",
    image: "/images/service_facial.png",
    featured: true,
  },
  {
    title: "Hair Styling",
    desc: "Professional blow-dry, curls, and styling for any occasion.",
    price: "From ₹399",
    image: "/images/service_hair_styling.png",
    featured: false,
  },
  {
    title: "Haircut & Dressing",
    desc: "Precision cuts tailored to your face shape and personality.",
    price: "From ₹249",
    image: "/images/service_haircut.png",
    featured: false,
  },
  {
    title: "Makeup",
    desc: "From natural everyday looks to full glam bridal transformations.",
    price: "From ₹999",
    image: "/images/service_makeup.png",
    featured: false,
  },
  {
    title: "Nail Art & Spa",
    desc: "Intricate nail designs and spa treatments for hands and feet.",
    price: "From ₹349",
    image: "/images/service_nails.png",
    featured: false,
  },
  {
    title: "Bridal Packages",
    desc: "Complete bridal beauty packages — look unforgettable on your day.",
    price: "Custom",
    image: "/images/service_bridal.png",
    featured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSmooth },
  },
};

function ServiceCard({
  service,
  className = "",
}: {
  service: (typeof services)[0];
  className?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.006 }}
      transition={{ duration: 0.4, ease: easeSmooth }}
      className={`group relative bg-[#F5EEE8] rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-500 ${className}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A1D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl mb-2 text-[#2C1A1D]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm mb-3 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            color: "var(--color-text-muted)",
          }}
        >
          {service.desc}
        </p>
        <span
          className="text-xs tracking-[0.1em] uppercase text-[#C9896A]"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          {service.price}
        </span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-[#FBF7F4]">
      <div className="max-container">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeSmooth }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Our Signature Services
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth, delay: 0.15 }}
            className="max-w-lg mx-auto text-base"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              color: "var(--color-text-muted)",
            }}
          >
            Each treatment crafted with care, precision, and the finest products.
          </motion.p>
        </div>

        {/* Asymmetric Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-5"
        >
          {/* Row 1: Featured (60%) + Tall (40%) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <ServiceCard
              service={services[0]}
              className="md:col-span-3"
            />
            <ServiceCard
              service={services[1]}
              className="md:col-span-2"
            />
          </div>

          {/* Row 2: Three equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.slice(2).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
