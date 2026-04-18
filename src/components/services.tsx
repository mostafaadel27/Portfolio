"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layout, Monitor, Smartphone } from "lucide-react";
import SectionHeader from "./ui/section-header";

const services = [
  {
    title: "Modern Landing Pages",
    description: "High-conversion, stunning landing pages designed to capture attention and drive action with fluid animations and perfect typography.",
    icon: Layout,
  },
  {
    title: "Dashboards & Web Apps",
    description: "Complex, data-rich interfaces turned into intuitive, blazing-fast web applications using React and Next.js.",
    icon: Monitor,
  },
  {
    title: "Responsive Websites",
    description: "Pixel-perfect layouts that adapt flawlessly to any screen size, ensuring a premium experience on desktop, tablet, and mobile.",
    icon: Smartphone,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-background">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          label="Services"
          title="Core Services"
          description="Specialized in building digital products that look beautiful and perform brilliantly."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-card p-8 md:p-10 rounded-3xl border border-border hover:border-brand-primary/30 transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="w-14 h-14 bg-foreground/5 text-foreground/80 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all duration-300">
                <service.icon size={28} />
              </div>

              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-brand-primary transition-colors">{service.title}</h3>
              <p className="text-foreground/70 leading-relaxed font-light text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
