"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, MapPin, Mail, MessageCircle, Briefcase, Code, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import SectionHeader from "./ui/section-header";
import { cn } from "@/lib/utils";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    // ... existing logic ...
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // If no key configured, simulate success for demo
    if (!ACCESS_KEY) {
      console.warn("Web3Forms key not set. Get one free at https://web3forms.com");
      await new Promise((r) => setTimeout(r, 1500));
      setIsSent(true);
      setIsLoading(false);
      setTimeout(() => {
        setFormState({ name: "", email: "", message: "" });
        setIsSent(false);
      }, 5000);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSent(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send. Please try again or email me directly.");
      }
    } catch {
      setError("Network error. Please try again or email me directly.");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setIsSent(false);
    }, 5000);
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  return (
    <section id="contact" className="py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          description="Got an interesting project in mind? I'm always open to discussing new opportunities, whether it's a freelance gig, a partnership, or an open-source collaboration."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInVariants}
          >
            <h3 className="text-2xl font-bold mb-8">Reach Out Direct</h3>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center text-foreground/80 border border-border group-hover:bg-brand-primary/10 group-hover:text-brand-primary group-hover:border-brand-primary/30 group-hover:-translate-y-1 transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 font-mono uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:mostafaadel42000@gmail.com" className="font-semibold hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm">mostafaadel42000@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center text-foreground/80 border border-border group-hover:bg-brand-primary/10 group-hover:text-brand-primary group-hover:border-brand-primary/30 group-hover:-translate-y-1 transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 font-mono uppercase tracking-wider mb-0.5">Location</p>
                  <p className="font-semibold">Remote / Worldwide</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-6">Find me online</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/mostafaadel27"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-foreground/70 hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/30 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mostafa-adel-8948732a2/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-foreground/70 hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/30 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRightVariants}
          >
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card p-8 md:p-10 rounded-3xl border border-brand-primary/30 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={40} className="text-brand-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-foreground/60 font-light">
                    Thanks for reaching out. I&apos;ll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm"
                >
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        disabled={isLoading}
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        disabled={isLoading}
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        disabled={isLoading}
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3.5 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell me about your project..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-brand-primary text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-all duration-300 group hover:shadow-lg hover:shadow-brand-primary/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
