"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn(
        "mb-20",
        align === "center" ? "text-left md:text-center flex flex-col items-start md:items-center" : "text-left",
        className
      )}
    >
      <div className={cn("flex items-center gap-3 mb-6", align === "center" && "md:justify-center")}>
        <span className={cn("h-px w-8 bg-brand-primary/50", align === "center" ? "hidden md:block" : "block")} />
        <span className="text-brand-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">
          {label}
        </span>
        {align === "center" && (
          <span className="h-px w-8 bg-brand-primary/50 hidden md:block" />
        )}
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          "text-foreground/60 text-lg font-light text-balance",
          align === "center" ? "max-w-2xl md:mx-auto" : "max-w-2xl"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
