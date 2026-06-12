import { siteName, siteUrl } from "@/lib/seo";
import { teamMembers } from "@/lib/team-members";

const absoluteUrl = (pathOrUrl: string) =>
  new URL(pathOrUrl, siteUrl).toString();

export const teamMemberSchemas = teamMembers.map((member) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/about#${member.name.toLowerCase().replace(/\s+/g, "-")}`,
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  image: absoluteUrl(member.image),
  telephone: member.phone,
  worksFor: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
  },
  url: `${siteUrl}/about`,
  sameAs: Object.entries(member.social)
    .filter(([key]) => key !== "tel")
    .map(([, value]) => value),
}));

const withoutContext = ({
  "@context": context,
  ...schema
}: (typeof teamMemberSchemas)[number]) => {
  void context;
  return schema;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  description:
    "Professional software development company specializing in web development, mobile applications, desktop software, and hosting services.",
  url: siteUrl,
  logo: `${siteUrl}/gree-logo-white.jpg`,
  image: `${siteUrl}/gree-logo-white.jpg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+233530929975",
    contactType: "customer service",
    email: "greesoftwarecompany@gmail.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kumasi",
    addressRegion: "Ashanti",
    addressCountry: "Ghana",
    streetAddress: "AAMUSTED, Tanoso",
  },
  sameAs: [
    "https://github.com/Gree-Software-Company",
    "https://www.youtube.com/@greesoftwareacademy",
    "https://t.me/greesoftwareacademy",
  ],
  foundingDate: "2021",
  founders: teamMemberSchemas.map(withoutContext),
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: {
    "@type": "Organization",
    name: "Gree Software Company",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description: "Custom website and web application development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description: "iOS and Android mobile application development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desktop Applications",
          description: "Cross-platform desktop software development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Hosting",
          description: "Reliable web hosting and server management services",
        },
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteUrl}/about#webpage`,
  name: `About ${siteName}`,
  url: `${siteUrl}/about`,
  description:
    "Learn about Gree Software Company's mission, vision, and leadership team.",
  mainEntity: {
    "@id": `${siteUrl}/#organization`,
  },
  about: teamMemberSchemas.map(withoutContext),
};
