import type { Metadata } from "next";
import "./globals.css";
import { urbanistFontItalic, urbanistFontRegular } from "./fonts/fonts";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/navbar/footer";

export const metadata: Metadata = {
  title: "Gree Software Company",
  description:
    "Discover our web development services designed to elevate your online presence, streamline operations, and boost engagement. Whether you need a comprehensive management system, an engaging advertisement website, a showcase portfolio, a robust e-commerce platform, or something completely custom, we build tailored solutions to meet your unique needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </head>
      <body
        className={`${urbanistFontRegular.variable} ${urbanistFontItalic.variable} antialiased`}
      >
        {/* Navbar */}
        <Navbar />
        <main>{children}</main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
