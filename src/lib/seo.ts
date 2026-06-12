import type { Metadata } from "next";

export const siteUrl = "https://greesoftware.com";
export const siteName = "Gree Software Company";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, siteUrl).toString();
}

export function generateSEO({
  title = siteName,
  description = "Professional web development, mobile apps, desktop applications, and hosting services. Transform your business with custom software solutions.",
  keywords = [
    "Gree Software Company",
    "Gree Software",
    "web development",
    "mobile apps",
    "desktop applications",
    "web hosting",
    "software development",
    "business solutions",
  ],
  canonical,
  ogImage = "/gree-logo-white.jpg",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle =
    title === siteName
      ? title
      : `${title} | ${siteName}`;
  const pageUrl = canonical ? absoluteUrl(canonical) : siteUrl;
  const imageUrl = absoluteUrl(ogImage);

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "Software Development",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
