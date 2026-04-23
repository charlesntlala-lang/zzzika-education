'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookingForm() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    grade: "",
    subject: "English",
    message: "",
  });

  useEffect(() => {
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    setLoading(true);

    const phone = "26659107549";

    const message = `
New Student Registration 🚀

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Country: ${data.country}
Grade: ${data.grade}
Subject: ${data.subject}
Interest: ${data.grade === "Curious / Beginner" ? data.message : "N/A"}
    `;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // 🔔 SOUND EFFECT
      if (successAudioRef.current) {
        successAudioRef.current.currentTime = 0;
        successAudioRef.current.play().catch(() => {});
      }

      // reset form
      setData({
        name: "",
        phone: "",
        email: "",
        country: "",
        grade: "",
        subject: "English",
        message: "",
      });

      setStep(1);

      setTimeout(() => setSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section ref={formRef} className="relative z-10 px-6 py-24">
      <h2 className="text-3xl text-center text-[#ff6d00] mb-10">
        Book a Free Trial
      </h2>

      {/* 🎉 SUCCESS MESSAGE */}
      {success && (
        <div className="mb-4 p-3 bg-green-500 text-black font-bold rounded text-center animate-pulse">
          🎉 Successfully sent! We’ll contact you on WhatsApp soon.
        </div>
      )}

      <div className="max-w-xl mx-auto bg-[#240046] p-8 rounded-xl space-y-4 shadow-[0_0_30px_rgba(157,78,221,0.3)]">

        <div className="text-center text-sm text-gray-300">
          Step {step} of 3
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 bg-[#1b0033] text-white rounded"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-3 bg-[#1b0033] text-white rounded"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 bg-[#1b0033] text-white rounded"
            />
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <select
              name="country"
              onChange={handleChange}
              className="w-full p-3 bg-[#1b0033] text-white rounded"
            >
              <option value="">Select Country</option>
              <option>Lesotho</option>
              <option>South Africa</option>
              <option>Botswana</option>
              <option>Namibia</option>
            </select>

            <select
              name="grade"
              onChange={handleChange}
              className="w-full p-3 bg-[#1b0033] text-white rounded"
            >
              <option value="">Select Grade</option>
              <option>Grade 7</option>
              <option>Form 1</option>
              <option>Form 2</option>
              <option>Form 3</option>
              <option>Form 4</option>
              <option>Form 5</option>
              <option>Curious / Beginner</option>
            </select>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <select
              name="subject"
              onChange={handleChange}
              className="w-full p-3 bg-[#1b0033] text-white rounded"
            >
              <option>English</option>
              <option>Sesotho</option>
              <option>Both English & Sesotho</option>
            </select>

            {data.grade === "Curious / Beginner" && (
              <textarea
                name="message"
                placeholder="What do you want to learn?"
                onChange={handleChange}
                className="w-full p-3 bg-[#1b0033] text-white rounded h-24"
              />
            )}
          </>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">

          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-full bg-gray-700 py-2 rounded text-white"
            >
              Back
            </button>
          )}

          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full bg-[#9d4edd] py-2 rounded text-white"
            >
              Next
            </button>
          )}

          {step === 3 && (
            <button
              onClick={sendToWhatsApp}
              disabled={loading}
              className="w-full bg-[#ff6d00] py-2 rounded text-black font-bold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send to WhatsApp"}
            </button>
          )}

        </div>
      </div>

      {/* 🔔 SUCCESS SOUND */}
      <audio
        ref={successAudioRef}
        src="/sounds/success.mp3"
        preload="auto"
      />
    </section>
  );
}