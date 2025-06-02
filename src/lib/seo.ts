import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export function generateSEO({
  title = "Gree Software Company",
  description = "Professional web development, mobile apps, desktop applications, and hosting services. Transform your business with custom software solutions.",
  keywords = [
    "web development",
    "mobile apps",
    "desktop applications",
    "web hosting",
    "software development",
    "business solutions",
  ],
  canonical,
  ogImage = "/gree-logo-white.jpg",
}: SEOProps = {}): Metadata {
  const baseUrl = "https://greesoftware.com";
  const fullTitle =
    title === "Gree Software Company"
      ? title
      : `${title} | Gree Software Company`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Gree Software Company" }],
    creator: "Gree Software Company",
    publisher: "Gree Software Company",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      title: fullTitle,
      description,
      siteName: "Gree Software Company",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Gree Software Company",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
  };
}
