import type { Metadata } from "next";
import { Oxanium, Space_Grotesk } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const displayFont = Oxanium({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MathShield",
    template: "%s | MathShield",
  },
  description: "A student learning hub with math practice, logic games, educational tools, and safe browser challenges.",
  applicationName: "MathShield",
  keywords: ["math games", "educational games", "student learning", "logic games", "study hub", "mathshield"],
  openGraph: {
    title: "MathShield",
    description: "A student learning hub with math practice, logic games, educational tools, and safe browser challenges.",
    siteName: "MathShield",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MathShield",
    description: "A student learning hub with math practice, logic games, educational tools, and safe browser challenges.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
