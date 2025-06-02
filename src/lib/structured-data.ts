export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gree Software Company",
  description:
    "Professional software development company specializing in web development, mobile applications, desktop software, and hosting services.",
  url: "https://greesoftware.com",
  logo: "https://greesoftware.com/gree-logo-white.jpg",
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
  founders: [
    {
      "@type": "Person",
      name: "Dickson Osei Yeboah",
    },
    {
      "@type": "Person",
      name: "Masood Acheampong",
    },
  ],
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
