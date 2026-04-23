'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Laptop, BookOpen, DollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  // ✅ Proper typing for array of refs
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!cards.current.length) return;

    gsap.from(cards.current, {
      scrollTrigger: {
        trigger: cards.current[0],
        start: "top 85%",
      },
      y: 60,
      opacity: 0,
      stagger: 0.25,
    });
  }, []);

  const items = [
    { title: "Live Classes", desc: "Zoom & Teams", icon: <Laptop /> },
    { title: "Flexible", desc: "Anytime learning", icon: <BookOpen /> },
    { title: "Affordable", desc: "Low cost", icon: <DollarSign /> },
  ];

  return (
    <section className="relative z-10 grid md:grid-cols-3 gap-6 px-10 py-20 bg-[#1b0033]/80">
      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            cards.current[i] = el;
          }} // ✅ FIXED (no return value)
          className="p-6 bg-[#240046] rounded-xl hover:scale-105 hover:shadow-[0_0_25px_#9d4edd]"
        >
          <div className="text-[#9d4edd] mb-3">{item.icon}</div>
          <h3 className="text-[#ff6d00] text-xl font-bold">{item.title}</h3>
          <p className="text-gray-300">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}