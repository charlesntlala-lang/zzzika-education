'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Background() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(parallaxRef.current, {
        x,
        y,
        duration: 1,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#240046] via-[#1b0033] to-[#9d4edd]" />
      <div
        ref={parallaxRef}
        className="absolute inset-0 -z-20 opacity-30 bg-[radial-gradient(circle_at_center,#9d4edd,transparent)]"
      />
    </>
  );
}