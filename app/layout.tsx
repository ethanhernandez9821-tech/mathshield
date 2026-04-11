import type { Metadata } from "next";
import { Oxanium, Space_Grotesk } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "MathShield",
    template: "%s | MathShield",
  },
  description: "Math games, arcade challenges, player XP, and a clean student-friendly hub.",
  applicationName: "MathShield",
  keywords: ["math games", "arcade games", "browser games", "study hub", "mathshield"],
  openGraph: {
    title: "MathShield",
    description: "Math games, arcade challenges, player XP, and a clean student-friendly hub.",
    siteName: "MathShield",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MathShield",
    description: "Math games, arcade challenges, player XP, and a clean student-friendly hub.",
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
