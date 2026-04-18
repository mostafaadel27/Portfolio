"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mouse, ArrowDown } from "lucide-react";
import Image from "next/image";
import CodeEditor from "./code-editor";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
    }
  })
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-bg-light dark:bg-bg-dark">

      {/* Subtle background gradients */}
      <div className="absolute top-0 right-0 w-[70vw] lg:w-[50vw] h-full bg-gradient-to-bl from-emerald-50/40 via-brand-primary/5 to-transparent dark:from-emerald-950/20 dark:via-brand-primary/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[70vw] lg:w-[50vw] h-[80vh] bg-gradient-to-tr from-slate-100/60 via-slate-100/10 to-transparent dark:from-slate-900/40 dark:via-slate-900/10 pointer-events-none rounded-tr-full blur-3xl opacity-60" />

      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-brand-primary/20 via-brand-secondary/15 to-indigo-500/10 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Content (7 columns) */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center pt-10 lg:pt-0">

          <motion.div
            custom={0} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="flex items-center gap-3 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-slate-600 dark:text-slate-400 uppercase">
              Available for freelance
            </span>
          </motion.div>

          <motion.h1
            custom={1} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white mb-6"
          >
            I build modern,{" "}
            <span className="text-slate-400 dark:text-slate-500 font-serif italic font-normal">
              interactive
            </span>{" "}
            web applications.
          </motion.h1>

          <motion.p
            custom={2} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-slate-600 dark:text-slate-400 mb-10 max-w-xl"
          >
            Hello, I&apos;m <strong className="text-slate-900 dark:text-slate-200 font-semibold">Mostafa</strong>.
            A front-end developer focused on crafting polished, high-performance digital experiences that convert and delight.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-brand-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary"
            >
              View Work
              <ArrowUpRight size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-[#0B0F19]"
            >
              Hire Me
            </a>
          </motion.div>

          <div className="w-full flex items-center justify-start mt-16">
            {/* Social Links */}
            <motion.div
              custom={4} initial="hidden" animate="visible" variants={fadeUpVariants}
              className="flex items-center gap-6 text-slate-400 dark:text-slate-500"
            >
              <a href="https://www.linkedin.com/in/mostafa-adel-8948732a2/" target="_blank" rel="noopener noreferrer" className="p-2.5 -m-2.5 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 rounded-lg dark:focus-visible:ring-offset-[#0B0F19]" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://github.com/mostafaadel27" target="_blank" rel="noopener noreferrer" className="p-2.5 -m-2.5 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 rounded-lg dark:focus-visible:ring-offset-[#0B0F19]" aria-label="Github">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Content (5 columns) — Interactive Code Editor */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">

          {/* Floating tech icons */}
          {/* Floating tech icons */}
          <motion.div
            custom={6} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="absolute top-0 -left-6 lg:-left-10 z-20"
          >
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 5, 0], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center pointer-events-none drop-shadow-xl"
              aria-hidden="true"
            >
              <Image 
                src="/react-logo.png" 
                alt="React.js Logo" 
                width={64} 
                height={64} 
                priority
                className="w-full h-full object-contain" 
              />
            </motion.div>
          </motion.div>

          <motion.div
            custom={8} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="absolute bottom-4 -right-4 lg:-right-8 z-20"
          >
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -8, 0], rotate: [0, 4, -2, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center pointer-events-none drop-shadow-xl"
              aria-hidden="true"
            >
              <Image 
                src="/nextjs-logo.png" 
                alt="Next.js Framework Logo" 
                width={64} 
                height={64} 
                priority
                className="w-full h-full object-contain dark:invert" 
              />
            </motion.div>
          </motion.div>

          <motion.div
            custom={7} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="absolute -top-4 right-8 lg:right-4 z-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, -4, 0], rotate: [0, -4, 2, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center pointer-events-none drop-shadow-xl"
              aria-hidden="true"
            >
              <Image 
                src="/typescript.svg" 
                alt="TypeScript Logo" 
                width={48} 
                height={48} 
                priority
                className="w-full h-full object-contain rounded-md" 
              />
            </motion.div>
          </motion.div>

          <motion.div
            custom={9} initial="hidden" animate="visible" variants={fadeUpVariants}
            className="absolute -bottom-4 left-6 lg:-bottom-6 lg:left-16 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, 5, 0], rotate: [0, -2, 4, 0] }}
              transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center pointer-events-none drop-shadow-xl"
              aria-hidden="true"
            >
              <Image 
                src="/tailwind.svg" 
                alt="Tailwind CSS" 
                width={56} 
                height={56} 
                priority
                className="w-full h-full object-contain" 
              />
            </motion.div>
          </motion.div>

          <CodeEditor />
        </div>

      </div>

      {/* Scroll Indicator Box */}
      <motion.a
        href="#workflow-section"
        custom={5} initial="hidden" animate="visible" variants={fadeUpVariants}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex group cursor-pointer outline-none z-30"
        aria-label="Scroll to workflow"
      >
        {/* Subtle Pulse Glow */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-emerald-400/40 dark:bg-emerald-400/20 blur-xl group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Button Body */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card/80 backdrop-blur-md group-hover:border-brand-primary/50 group-hover:bg-brand-primary/5 group-hover:-translate-y-1 group-hover:shadow-[0_8px_25px_rgba(52,211,153,0.25)] transition-all duration-300">
          <motion.div
            animate={{ y: [-2, 4, -2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Creative Animated Arrow */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-slate-400 dark:text-slate-400 group-hover:text-emerald-500 transition-colors duration-300">
              <path d="M12 4V4.01M12 20L18 14M12 20L6 14M12 20V9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.a>

    </section>
  );
}
