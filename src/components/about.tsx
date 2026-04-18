"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Cpu, Wrench, Sparkles } from "lucide-react";
import SectionHeader from "./ui/section-header";
import { cn } from "@/lib/utils";

const primarySkills = ["React", "Next.js", "TypeScript", "Tailwind CSS"];
const additionalSkills = ["Node.js", "GraphQL", "REST APIs"];

const learning = [
  { title: "Advanced Next.js App Router", icon: Code2 },
  { title: "WebGL & Framer Motion", icon: Cpu },
  { title: "Web Vitals Optimization", icon: Wrench },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const slideInVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  return (
    <section id="about" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* About & Learning */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInVariants}
          className="flex flex-col"
        >
          <div className="mb-14">
            <SectionHeader
              label="About"
              title="About Me"
              className="mb-8"
            />
            <p className="text-lg text-foreground/70 leading-relaxed mb-6 font-light">
              I am a Frontend Developer focused on building interactive and user-friendly web applications.
              I specialize in complex dashboards, real-time features, and modern UI design that feels intuitive and premium.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed font-light">
              My approach blends technical precision with an eye for design, ensuring that every digital product
              not only functions flawlessly but also provides a delightful user experience.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-brand-primary" />
              Currently Exploring
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {learning.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border/50 hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 text-foreground/70 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
                    <item.icon size={18} />
                  </div>
                  <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground transition-colors">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Essential Skills */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInRightVariants}
        >
          <SectionHeader
            label="Skills"
            title="Core Stack"
            className="mb-8"
          />

          <div className={cn(
            "bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden"
          )}>
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-10">
              <div>
                <p className="text-foreground/50 mb-5 font-mono text-[10px] uppercase tracking-[0.2em]">Primary Stack</p>
                <div className="flex flex-wrap gap-3">
                  {primarySkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      className="px-5 py-2.5 bg-background border border-border/80 rounded-full text-foreground/90 font-medium text-sm hover:border-brand-primary/50 hover:bg-brand-primary/5 hover:text-brand-primary transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-foreground/50 mb-5 font-mono text-[10px] uppercase tracking-[0.2em]">Additional Technologies</p>
                <div className="flex flex-wrap gap-3">
                  {additionalSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-5 py-2.5 bg-background border border-border/80 rounded-full text-foreground/90 font-medium text-sm hover:border-brand-primary/50 hover:bg-brand-primary/5 hover:text-brand-primary transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience bars */}
            <div className="mt-10 pt-8 border-t border-border space-y-4">
              {[
                { label: "Frontend Engineering", level: 95, status: "95%" },
                { label: "UI Implementation", level: 90, status: "90%" },
                { label: "Performance & Optimization", level: 92, status: "92%" },
              ].map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground/80">{exp.label}</span>
                    <span className="text-xs font-mono text-foreground/50 uppercase tracking-wider">{exp.status}</span>
                  </div>
                  <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${exp.level}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 1, ease: "easeOut", delay: idx * 0.15 }}
                      className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
