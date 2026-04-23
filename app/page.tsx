'use client';

import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FloatingIcons from "./components/FloatingIcons";
import Features from "./components/Features";
import VideoSection from "./components/VideoSection";
import BookingForm from "./components/BookingForm";
import WhatsAppButton from "./components/WhatsAppButton";
import Scene from "./components/Scene";
import Particles from "./components/Particles";
import GallerySection from "./components/GallerySection"; // Ensure this file exists at app/components/GallerySection.tsx

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <Background />
      <FloatingIcons />
      <Particles />
      <Scene />
      <WhatsAppButton />

      <Navbar />
      <Hero />
      <VideoSection />
      <Features />
      <BookingForm />
      <GallerySection />

      <footer className="text-center py-6 text-gray-400">
        © {new Date().getFullYear()} ZZZIKA
      </footer>
    </main>
  );
}