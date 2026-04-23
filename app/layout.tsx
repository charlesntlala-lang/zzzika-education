import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * SITE METADATA
 * This controls:
 * - Browser tab title
 * - SEO description
 * - Favicon (icon in browser tab / URL bar)
 */
export const metadata: Metadata = {
  title: "ZZZIKA Education Platform",
  description:
    "Modern online learning platform offering English and Sesotho extra classes via Zoom and Teams.",
  
  // ✅ This makes your PNG the browser tab icon (favicon)
  icons: {
    icon: "/education.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}