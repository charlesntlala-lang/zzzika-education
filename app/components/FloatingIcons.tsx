'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FloatingIcons() {
  // ✅ correct typing for array refs
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      gsap.to(el, {
        y: 20,
        duration: 2 + i,
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  return (
    <>
      {["📘", "✏️", "🎓", "📚", "🧠"].map((icon, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }} // ✅ FIXED (no return value)
          className="absolute text-3xl opacity-70"
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          {icon}
        </div>
      ))}
    </>
  );
}