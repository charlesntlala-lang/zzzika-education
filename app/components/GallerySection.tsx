'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/gallery/Creativity%20is%20my%20heart%20and%20soul.jfif",
  "/gallery/Every%20SONSON%C2%AE%20bow%20tie%20tells%20a%20story_%20Stories%20of%E2%80%A6.jfif",
  "/gallery/sorridente%20africano%20americano%20aluna%20com%20livros%20e%E2%80%A6.jfif",
  "/gallery/The%20Future%20of%20Online%20Education_%20Trends%20to%20Watch%20in%202025.jfif",
];

export default function GallerySection() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // scroll animations
    gsap.from(galleryRef.current, {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 85%",
      },
      opacity: 0,
      y: 80,
      duration: 1,
    });

    gsap.from(contactRef.current, {
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      duration: 1,
      delay: 0.2,
    });
  }, []);

  // slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 px-6 py-24">

      {/* 🖼️ GALLERY SLIDESHOW */}
      <div ref={galleryRef}>
        <h2 className="text-3xl text-center text-[#ff6d00] mb-10">
          Student Gallery
        </h2>

        <div className="relative w-full max-w-5xl mx-auto h-[420px] overflow-hidden rounded-2xl">

          {images.map((img, i) => {
            const isActive = i === index;
            const isEven = i % 2 === 0;

            return (
              <img
                key={i}
                src={img}
                alt={`gallery-${i}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000
                  ${isActive ? "opacity-100 scale-105 blur-0 z-20" : "opacity-0 scale-95 blur-md z-10"}
                `}
                style={{
                  transformOrigin: isEven ? "left center" : "right center",
                }}
              />
            );
          })}

          {/* overlay diffuse effect */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* 📞 CONTACT SECTION */}
      <div ref={contactRef} className="mt-24 text-center">

        <h2 className="text-3xl text-[#ff6d00] mb-6">
          Contact Us
        </h2>

        <div className="space-y-3 text-gray-300">
          <p>📞 WhatsApp: +266 5910 7549</p>
          <p>📧 Email: zzzika.classes@gmail.com</p>
          <p>📍 Location: Maseru, Lesotho (Online Classes Available)</p>
        </div>

        <div className="mt-6 flex justify-center gap-4">

          <a
            href="https://wa.me/26659107549"
            target="_blank"
            className="bg-[#25D366] px-4 py-2 rounded text-black font-bold hover:scale-105 transition"
          >
            WhatsApp
          </a>

          <a
            href="mailto:zzzika.classes@gmail.com"
            className="bg-[#9d4edd] px-4 py-2 rounded text-white hover:scale-105 transition"
          >
            Email
          </a>

        </div>
      </div>

    </section>
  );
}