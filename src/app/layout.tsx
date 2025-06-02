import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans, Urbanist } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { generateSEO } from "@/lib/seo";
import { organizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = generateSEO({
  title: "Gree Software Company - Professional Software Development Services",
  description:
    "Transform your business with custom web development, mobile apps, desktop applications, and reliable hosting services. Professional software solutions for modern businesses.",
  keywords: [
    "web development",
    "mobile app development",
    "desktop applications",
    "web hosting",
    "software development",
    "business solutions",
    "Ghana software company",
  ],
});

const urbanFont = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: "400",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${urbanFont.variable} ${openSans.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
