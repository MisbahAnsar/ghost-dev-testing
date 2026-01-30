// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ffffff",
        accent: "#1a1a1a",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

// src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  overflow-x: hidden;
}

* {
  border-radius: 0 !important;
  border-color: #1a1a1a;
}

.dither {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQImWP8//8/AwXg5cuX/zGADEZGRmSBaAGIBf///wcA968SC9U899oAAAAASUVORK5CYII=");
  background-repeat: repeat;
}

.dither-overlay {
  position: fixed;
  inset: 0;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQImWP8//8/AwXg5cuX/zGADEZGRmSBaAGIBf///wcA968SC9U899oAAAAASUVORK5CYII=");
  opacity: 0.1;
  pointer-events: none;
  z-index: 9999;
}

// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
}

export const Button = ({ children, variant = 'primary', className = '' }: ButtonProps) => {
  const baseStyles = "px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-100";
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-300",
    outline: "border border-zinc-800 text-white hover:bg-white hover:text-black",
    ghost: "text-zinc-500 hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// src/components/ui/Navbar.tsx
import { Button } from './Button';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-white dither"></div>
        <span className="font-bold tracking-tighter text-sm">PHANTOM.AI</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest text-zinc-500">
        <a href="#" className="hover:text-white transition-colors">Neural_Net</a>
        <a href="#" className="hover:text-white transition-colors">Encryption</a>
        <a href="#" className="hover:text-white transition-colors">Nodes</a>
        <a href="#" className="hover:text-white transition-colors">Terminal</a>
      </div>
      <Button variant="outline">Initialize</Button>
    </nav>
  );
};

// src/components/ui/DitherCoding.tsx
"use client";
import React, { useEffect, useRef } from 'react';

export const DitherCoding = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const chars = "0123456789ABCDEF";
    
    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || 400;
      canvas.height = 300;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '9px monospace';
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#1a1a1a';
        const text = Array.from({length: 20}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const x = 20;
        const y = 30 + (i * 12);
        
        const opacity = Math.sin(frame * 0.05 + i) * 0.5 + 0.5;
        ctx.globalAlpha = opacity;
        ctx.fillText(`0x${text}_v${i}`, x, y);
      }

      // Dither block animation
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#fff';
      const blockX = (frame * 2) % (canvas.width + 100) - 50;
      ctx.fillRect(blockX, 150, 40, 40);
      
      frame++;
      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="relative border border-zinc-900 overflow-hidden bg-zinc-950/50">
      <canvas ref={canvasRef} className="w-full grayscale brightness-50" />
      <div className="absolute inset-0 dither pointer-events-none opacity-20"></div>
      <div className="absolute bottom-2 right-2 text-[8px] text-zinc-700">AESTHETIC_V.01</div>
    </div>
  );
};

// src/components/ui/BentoGrid.tsx
import React from 'react';

export const BentoCard = ({ title, desc, size = "small", children }: { title: string, desc: string, size?: "small" | "large" | "tall", children?: React.ReactNode }) => {
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    large: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2"
  };

  return (
    <div className={`border border-zinc-900 p-5 relative overflow-hidden group hover:bg-zinc-950 transition-colors ${sizeClasses[size]}`}>
      <div className="relative z-10">
        <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2">{title}</h3>
        <p className="text-zinc-500 leading-tight text-[10px] max-w-[180px]">{desc}</p>
      </div>
      <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
        {children}
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 dither opacity-5 group-hover:opacity-10"></div>
    </div>
  );
};

export const BentoGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-0 border-t border-l border-zinc-900 mx-6 mb-24">
      <BentoCard 
        title="Neural Firewall" 
        desc="Sub-millisecond latency AI traffic filtering using dithered logic gates."
        size="large"
      >
        <div className="w-32 h-32 bg-white dither" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
      </BentoCard>
      <BentoCard 
        title="Zero Trust" 
        desc="Implicitly deny everything. Validate everywhere."
      >
        <div className="w-20 h-20 border-4 border-white dither rotate-45"></div>
      </BentoCard>
      <BentoCard 
        title="Ghost Protocol" 
        desc="Masking infrastructure footprint across the global mesh."
        size="tall"
      >
        <div className="w-full h-full bg-zinc-800 dither"></div>
      </BentoCard>
      <BentoCard 
        title="Threat Intel" 
        desc="Live feed from 2M+ nodes updated every heartbeat."
      >
         <div className="flex gap-1 mt-10">
            {[1,2,3,4].map(i => <div key={i} className="w-2 h-10 bg-white dither"></div>)}
         </div>
      </BentoCard>
      <BentoCard 
        title="Kernel Shield" 
        desc="Hardware-level protection against advanced persistent threats."
        size="large"
      >
        <div className="w-64 h-24 border border-white/20 dither transform skew-x-12"></div>
      </BentoCard>
    </section>
  );
};

// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white selection:text-black">
        <div className="dither-overlay"></div>
        {children}
      </body>
    </html>
  );
}

// src/app/page.tsx
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { DitherCoding } from "@/components/ui/DitherCoding";
import { BentoGrid } from "@/components/ui/BentoGrid";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 border-b border-zinc-900">
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-2 py-1 border border-zinc-800 w-fit mb-6">
            <span className="w-1.5 h-1.5 bg-white animate-pulse"></span>
            <span className="text-[9px] uppercase tracking-tighter text-zinc-400">System Status: Operational</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] mb-8 uppercase">
            Neural <br /> Defensive <br /> Logic.
          </h1>
          <p className="text-zinc-500 text-[11px] max-w-sm mb-10 leading-relaxed uppercase tracking-tight">
            Next-generation autonomous cybersecurity for high-risk infrastructure. 
            Utilizing dither-encrypted neural weights to predict and neutralize threats 
            before they reach the application layer.
          </p>
          <div className="flex gap-4">
            <Button>Deploy Node</Button>
            <Button variant="ghost">View Documentation</Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <DitherCoding />
          </div>
        </div>
      </section>

      {/* Stats Line */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-900">
        {[
          ["Uptime", "99.999%"],
          ["Nodes", "4,102"],
          ["Threats", "12.4M/Day"],
          ["Latency", "< 0.4ms"]
        ].map(([label, val]) => (
          <div key={label} className="p-6 border-r border-zinc-900 last:border-r-0">
            <p className="text-[9px] text-zinc-600 uppercase mb-1 tracking-widest">{label}</p>
            <p className="text-sm font-bold font-mono">{val}</p>
          </div>
        ))}
      </div>

      {/* Bento Section */}
      <section className="py-24">
        <div className="px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Capabilities</h2>
            <p className="text-zinc-600 text-[10px] uppercase">Hardware-software integrated security</p>
          </div>
          <div className="text-[9px] text-zinc-800 text-right">PH_SENTINEL_CORE_V.2.0.4</div>
        </div>
        <BentoGrid />
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-zinc-800 dither"></div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">© 2024 Phantom Sentinel AI</span>
        </div>
        <div className="flex gap-8 text-zinc-700 text-[9px] uppercase tracking-widest">
          <a href="#" className="hover:text-white">Github</a>
          <a href="#" className="hover:text-white">X.com</a>
          <a href="#" className="hover:text-white">Whitepaper</a>
          <a href="#" className="hover:text-white">Legal</a>
        </div>
        <div className="text-zinc-800 text-[9px]">
          ENCRYPTED_BY_DITHER_V1
        </div>
      </footer>
    </main>
  );
}