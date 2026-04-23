'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function VideoSection() {
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastTime = 0;
    let cycle = 0;

    const update = () => {
      if (!video.duration) return;

      const progress = video.currentTime / video.duration;

      // detect loop
      if (video.currentTime < lastTime) {
        cycle++;
      }

      lastTime = video.currentTime;

      // 🎯 ORBIT rotation synced to video
      const rotation = progress * 360 + cycle * 36;

      const scale = 1 + cycle * 0.15;
      const orbitX = cycle * 40;

      gsap.set(orbitRef.current, {
        rotate: rotation,
        scale: scale,
        x: orbitX,
      });

      // 🛰️ keep items upright
      gsap.set(".orbit-item", {
        rotate: -rotation,
      });

      // 📱 PHONE SHIFT (NEW)
      const direction = cycle % 2 === 0 ? 1 : -1; // alternate direction
      const phoneShift = cycle * 20 * direction; // 20% per cycle

      gsap.to(phoneRef.current, {
        xPercent: phoneShift,
        duration: 1.2,
        ease: "power2.out",
      });

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, []);

  return (
    <section className="relative z-10 px-6 py-32 text-center">
      <h2 className="text-3xl font-bold text-[#ff6d00] mb-20">
        Learn Anywhere, Anytime
      </h2>

      <div className="relative flex justify-center items-center [perspective:1000px]">

        {/* ORBIT */}
        <div
          ref={orbitRef}
          className="absolute w-[500px] h-[500px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <OrbitItem top="0%" left="50%" translate="-50%, -50%">
            <img src="/nextvideo/communication.png" />
          </OrbitItem>

          <OrbitItem top="50%" left="100%" translate="-50%, -50%">
            <img src="/nextvideo/social-media.png" />
          </OrbitItem>

          <OrbitItem top="100%" left="50%" translate="-50%, -50%">
            <video autoPlay muted loop>
              <source src="/nextvideo/book.mp4" type="video/mp4" />
            </video>
          </OrbitItem>

          <OrbitItem top="50%" left="0%" translate="-50%, -50%">
            <img src="/nextvideo/whatsapp.png" />
          </OrbitItem>

          <OrbitItem top="15%" left="85%" translate="-50%, -50%">
            <video autoPlay muted loop>
              <source src="/nextvideo/grades.mp4" type="video/mp4" />
            </video>
          </OrbitItem>

          <OrbitItem top="85%" left="15%" translate="-50%, -50%">
            <img src="/nextvideo/exam.png" />
          </OrbitItem>
        </div>

        {/* PHONE */}
        <div
          ref={phoneRef}
          className="relative z-10 w-[260px] h-[520px] bg-black rounded-[40px] p-3 shadow-[0_0_40px_rgba(157,78,221,0.5)]"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10" />

          <div className="w-full h-full rounded-[30px] overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
            >
              <source src="/video/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitItem({
  children,
  top,
  left,
  translate,
}: {
  children: React.ReactNode;
  top: string;
  left: string;
  translate: string;
}) {
  return (
    <div
      className="orbit-item absolute w-20 h-20 bg-[#240046] rounded-xl p-2 shadow-lg flex items-center justify-center"
      style={{
        top,
        left,
        transform: `translate(${translate})`,
      }}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}