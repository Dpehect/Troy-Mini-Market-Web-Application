"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollProgress } from "@/components/shared/scroll-progress";
export function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 0.85, smoothWheel: true, syncTouch: false });
    let rafId = 0;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
  return <><ScrollProgress />{children}</>;
}
