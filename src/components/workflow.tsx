"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { Search, PenTool, Code, Zap } from "lucide-react";
import SectionHeader from "./ui/section-header";

const steps = [
  {
    num: "1",
    title: "Understand",
    desc: "Analyze user needs & business goals",
    icon: Search,
  },
  {
    num: "2",
    title: "Design",
    desc: "Craft intuitive and modern UI",
    icon: PenTool,
  },
  {
    num: "3",
    title: "Develop",
    desc: "Build scalable and high-performance apps",
    icon: Code,
  },
  {
    num: "4",
    title: "Optimize",
    desc: "Improve speed, SEO & usability",
    icon: Zap,
  },
];

function StepCard({ step, index, totalSteps }: { step: typeof steps[0], index: number, totalSteps: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: "some" });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center w-full my-8 md:my-16 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
      
      {/* Desktop/Tablet Middle Line Connectors */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 -translate-x-1/2 hidden md:block">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-brand-primary"
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Center Node (Mobile Left, Desktop Center) */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: isInView ? 1.2 : 0.8, 
            backgroundColor: isInView ? "#10b981" : "transparent",
            borderColor: isInView ? "#10b981" : "rgba(255, 255, 255, 0.1)"
          }}
          transition={{ duration: 0.4 }}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center shadow-lg bg-background border-foreground/20"
        >
          <step.icon size={20} className={`transition-colors duration-400 ${isInView ? "text-white" : "text-foreground/40"}`} />
        </motion.div>
      </div>

      {/* Mobile connecting line */}
      {index !== totalSteps - 1 && (
        <div className="absolute left-6 top-10 bottom-[-3rem] w-px bg-foreground/10 md:hidden -translate-x-1/2 z-0" />
      )}

      {/* Content Side */}
      <div className={`w-full ml-16 md:ml-0 md:w-1/2 flex ${isEven ? 'md:pr-16 md:justify-end text-left md:text-right' : 'md:pl-16 md:justify-start text-left'}`}>
        <motion.div 
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : (isEven ? 50 : -50), y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          animate={{ 
            opacity: isInView ? 1 : 0.4, 
            scale: isInView ? 1.03 : 0.98,
          }}
          className={`w-full max-w-sm p-8 rounded-2xl border transition-colors duration-500 ${
            isInView ? 'bg-card border-brand-primary/30 shadow-[0_10px_40px_-15px_rgba(16,185,129,0.15)] dark:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.05)]' : 'bg-transparent border-transparent shadow-none'
          }`}
        >
          <div className={`font-mono text-5xl font-black mb-4 transition-colors duration-500 tracking-tighter ${isInView ? 'text-brand-primary/20' : 'text-foreground/5'}`}>
            0{step.num}
          </div>
          <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${isInView ? 'text-foreground' : 'text-foreground/60'}`}>
            {step.title}
          </h3>
          <p className={`text-base font-light leading-relaxed transition-colors duration-500 ${isInView ? 'text-foreground/80' : 'text-foreground/40'}`}>
            {step.desc}
          </p>
        </motion.div>
      </div>
      
      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block md:w-1/2" />

    </div>
  );
}

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="workflow-section" className="py-32 relative bg-background/50 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <SectionHeader 
          label="Workflow"
          title="How I Build Digital Experiences"
          align="center"
        />

        {/* Timeline Container */}
        <div className="relative flex flex-col items-center w-full max-w-5xl mx-auto">
          {/* Global Progress Line (Optional cool effect) */}
          <motion.div 
            style={{ scaleY: progressBarHeight }}
            className="absolute left-6 md:left-1/2 top-0 h-full w-[2px] bg-brand-primary/20 -translate-x-1/2 origin-top hidden md:block" 
          />

          {steps.map((step, index) => (
            <StepCard key={step.num} step={step} index={index} totalSteps={steps.length} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
