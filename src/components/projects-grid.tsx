"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Code } from "lucide-react";
import SectionHeader from "./ui/section-header";

const projects = [
  {
    title: "TaskFlow",
    description: "The ultimate SaaS platform for team accountability. Track every move, assign with precision, and scale your momentum.",
    image: "/taskflow_hero.png",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript", "SQL"],
    liveUrl: "https://task-flow-coral-xi.vercel.app/",
    githubUrl: "https://github.com/mostafaadel27/Task-Flow"
  },
  {
    title: "Tilawa",
    description: "An elegant Holy Quran platform featuring high-quality audio recitations, interactive reading experience, and accurate prayer times.",
    image: "/tilawa.png",
    tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "API"],
    liveUrl: "https://tilawa-iota.vercel.app/",
    githubUrl: "https://github.com/mostafaadel27/Tilawa"
  },
  {
    title: "SkillRise",
    description: "An innovative platform for creators to build sustainable online businesses, featuring skill assessment tools and comprehensive resources.",
    image: "/skillrise.png",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://skill-rise-two.vercel.app/",
    githubUrl: "https://github.com/mostafaadel27/SkillRise"
  },
  {
    title: "HomeScape",
    description: "A luxury real estate platform where visionary design and natural landscapes converge, featuring premium global sanctuaries.",
    image: "/homescape_real.jpg",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://home-scape-gamma.vercel.app/",
    githubUrl: "https://github.com/mostafaadel27/HomeScape"
  },
  {
    title: "Iron Core",
    description: "An elite fitness and biological engineering landing page. Features high-end GSAP animations, a premium dark aesthetic, and flawless responsiveness.",
    image: "/iron-core1.png",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    liveUrl: "https://iron-core-three.vercel.app/",
    githubUrl: "https://github.com/mostafaadel27/IRON-CORE"
  },
  {
    title: "ScoreUp",
    description: "A comprehensive sports platform for live football scores, real-time updates, and the latest sports news from 800+ leagues.",
    image: "/scoreup.png",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript", "API"],
    liveUrl: "https://score-up-theta.vercel.app/",
    githubUrl: "https://github.com/mostafaadel27/ScoreUP"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ProjectsGrid() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section id="projects" className="py-32 relative bg-card/20">
      {/* Subtle background decoration ... */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          label="Portfolio"
          title="Selected Work"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-foreground/5"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-foreground/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label={`Visit ${project.title} live demo`}
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm border border-white/10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75"
                    aria-label={`View ${project.title} source code`}
                  >
                    <Code size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col flex-grow relative z-20 p-6">
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3 transition-colors">
                  {project.title}
                </h3>

                <p className="text-foreground/60 mb-6 text-[15px] leading-relaxed line-clamp-2 pr-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-foreground/5 border border-border text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
