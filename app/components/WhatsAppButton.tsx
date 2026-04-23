import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/26600000000"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg animate-bounce hover:scale-110 transition"
    >
      <MessageCircle />
    </a>
  );
}