import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/navbar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Mostafa | Frontend Developer",
  description: "I build modern, interactive web applications",
  alternates: {
    canonical: 'https://portfolio-gaqn.vercel.app',
  },
  openGraph: {
    type: 'website',
    url: 'https://portfolio-gaqn.vercel.app',
    title: 'Mostafa | Frontend Developer',
    description: 'I craft fast, interactive web apps with a focus on clean UI & performance.',
    siteName: 'Mostafa Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mostafa | Frontend Developer',
    description: 'I craft fast, interactive web apps with a focus on clean UI & performance.',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
