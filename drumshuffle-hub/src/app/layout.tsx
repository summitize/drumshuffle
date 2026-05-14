import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DrumShuffle Hub — Premium Drumming Platform",
    template: "%s | DrumShuffle Hub",
  },
  description:
    "The ultimate online drumming platform. Practice with a pro-grade simulator, explore sample packs, follow lessons, and connect with a global drumming community.",
  keywords: ["drumming", "drum simulator", "sample packs", "drum lessons", "beat maker", "DrumShuffle"],
  authors: [{ name: "DrumShuffle Team" }],
  creator: "DrumShuffle Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drumshuffle.com",
    siteName: "DrumShuffle Hub",
    title: "DrumShuffle Hub — Premium Drumming Platform",
    description: "The ultimate online drumming platform for drummers of all levels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrumShuffle Hub",
    description: "The ultimate online drumming platform.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body className="bg-night-950 text-night-50 font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
