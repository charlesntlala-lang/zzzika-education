'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const title = useRef(null);
  const subtitle = useRef(null);
  const buttons = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(title.current, { y: 60, opacity: 0, duration: 1 })
      .from(subtitle.current, { y: 30, opacity: 0 }, "-=0.5")
      .from(buttons.current, { scale: 0.8, opacity: 0 }, "-=0.3");
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center text-center px-6 min-h-[80vh] justify-center">
      <h2 ref={title} className="text-5xl md:text-6xl font-extrabold">
        Learn English & Sesotho <br />
        <span className="text-[#ff6d00]">Like a Pro</span>
      </h2>

      <p ref={subtitle} className="mt-6 max-w-xl text-gray-300">
        Join ZZZIKA extra classes online via Zoom & Teams.
      </p>

      <div ref={buttons} className="mt-8 flex gap-4">
        <button className="bg-[#ff6d00] px-6 py-3 rounded-xl hover:scale-105">
          Get Started
        </button>
        <button className="border border-[#9d4edd] px-6 py-3 rounded-xl hover:bg-[#9d4edd]">
          Learn More
        </button>
      </div>
    </section>
  );
}