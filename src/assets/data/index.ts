import BetterDelivery from "@/assets/images/application-delivery.jpg";
import BugFixes from "@/assets/images/updates.jpg";
import SystemManagement from "@/assets/images/system-management.jpg";
import GreeSoftwareCompany from "@/assets/images/gree-logo.jpg";
import WebVisionImage from "@/assets/images/web-vision.jpg";
import MobileAppsImage from "@/assets/images/mobile-development.jpg";
import SoftwareDevelopmentIcon from "@/assets/images/software-development.svg";
import CloudSolutionsIcon from "@/assets/images/cloud-solutions.png";
import UserExp from "@/assets/images/ux.png";
import ResponsiveDev from "@/assets/images/responsive.png";
import SEO from "@/assets/images/seo.png";
import AppDevIcon from "@/assets/images/app-dev.svg";
import IntegrationIcon from "@/assets/images/integration.png";
import TechnologiesIcon from "@/assets/images/tech-stack.png";

import {
  DeliveryIcon,
  UpdateIcon,
  ManagementIcon,
} from "@/components/icons/icons";

export const services = [
  {
    id: 100,
    title: "Better Application Delivery",
    overview:
      "Delivering applications with speed and precision to maximize user satisfaction.",
    content: `<p>Our team prioritizes quick and efficient delivery, using agile methodologies to ensure that your application reaches users in the shortest amount of time without compromising quality. From initial development to launch, we streamline the process to provide rapid results and minimize delays.</p>`,
    icon: DeliveryIcon,
    image: BetterDelivery,
  },
  {
    id: 2,
    title: "Continuous Updates and Bug Fixes",
    overview:
      "Ensuring seamless operation with regular updates and proactive bug management.",
    content: `<p>Stay ahead with continuous updates and immediate bug fixes to keep your application running smoothly. Our commitment to maintenance ensures that your app remains responsive, secure, and in line with the latest technological standards, delivering a polished experience for end-users.</p>`,
    icon: UpdateIcon,
    image: BugFixes,
  },
  {
    id: 3,
    title: "Optional System Management",
    overview:
      "Flexible system management options tailored to your business needs.",
    content: `<p>Our optional system management services allow you to choose the level of involvement that best suits your organization. From full management support to limited oversight, we provide a scalable approach to system maintenance, ensuring optimal performance and reducing your in-house workload.</p>`,
    icon: ManagementIcon,
    image: SystemManagement,
  },
];

export const about_slides = [
  {
    id: 1,
    heading: "Gree Software Company - Empowering Digital Innovation",
    image: GreeSoftwareCompany,
    description:
      "At Gree Software Company, we’re dedicated to creating cutting-edge digital solutions that transform ideas into impactful products. With a team of experienced developers and a passion for innovation, we focus on delivering high-quality software tailored to meet the unique needs of each client.",
    points: [
      {
        id: 1,
        title: "Custom Software Development",
        description:
          "Tailored solutions designed to address specific business needs and maximize operational efficiency.",
        icon: SoftwareDevelopmentIcon,
      },
      {
        id: 2,
        title: "Scalable Cloud Solutions",
        description:
          "Cloud infrastructure designed to support businesses as they grow and expand.",
        icon: CloudSolutionsIcon,
      },
    ],
  },
  {
    id: 2,
    heading: "Achieve Your Web Vision with Gree Software Company",
    image: WebVisionImage,
    description:
      "From concept to deployment, we bring your web projects to life with meticulous attention to design, functionality, and user experience. Our web development process ensures a smooth transition from ideas to a fully functional online presence, keeping users and performance at the forefront.",
    points: [
      {
        id: 1,
        title: "Design & User Experience",
        description: "Crafting visually appealing and intuitive interfaces.",
        icon: UserExp,
      },
      {
        id: 2,
        title: "Responsive Development",
        description: "Ensuring compatibility across devices and platforms.",
        icon: ResponsiveDev,
      },
      {
        id: 3,
        title: "SEO Optimization",
        description:
          "Building websites with visibility and searchability in mind.",
        icon: SEO,
      },
    ],
  },
  {
    id: 3,
    heading: "Transform Your Business with Powerful Mobile Apps",
    image: MobileAppsImage,
    description:
      "Elevate your business operations and customer engagement with innovative mobile applications built by Gree Software Company. We leverage the latest technologies to create apps that offer seamless functionality and compelling user experiences across various platforms.",
    points: [
      {
        id: 1,
        title: "App Development",
        description: "iOS, Android, and Cross-Platform Solutions",
        icon: AppDevIcon,
      },
      {
        id: 2,
        title: "Technologies",
        description:
          "React Native, Flutter, Swift, Kotlin for fast, responsive apps",
        icon: TechnologiesIcon,
      },
      {
        id: 3,
        title: "Integration",
        description:
          "API integrations, cloud support, and third-party services tailored to your business needs",
        icon: IntegrationIcon,
      },
    ],
  },
];

export const pricing_structure = [
  {
    category: "Management Systems",
    description:
      "Comprehensive solutions for schools, enterprises, and organizations.",
    features: [
      {
        name: "Landing Page",
        details: [
          "Home page with overview & branding",
          "User registration/login sections",
          "Dashboard preview",
        ],
      },
      {
        name: "User Management",
        details: ["Admin and user access control", "Role-based dashboards"],
      },
      {
        name: "Data Management",
        details: [
          "Database integration (student/employee records)",
          "Secure data storage and backup solutions",
        ],
      },
      {
        name: "Analytics and Reporting",
        details: [
          "Customizable reporting tools",
          "Real-time analytics dashboard",
        ],
      },
      {
        name: "SEO & Performance Optimization",
        details: [
          "SEO-ready structure for visibility",
          "Performance optimizations for scalability",
        ],
      },
      {
        name: "Support & Maintenance",
        details: [
          "Continuous updates & support",
          "Data backups and recovery options",
        ],
      },
    ],
  },
  {
    category: "Advertisement Websites",
    description:
      "For businesses promoting products, services, or announcements.",
    features: [
      {
        name: "Landing Page",
        details: [
          "Engaging layout with high-quality visuals",
          "Call-to-action (CTA) for conversions",
          "Client testimonials and reviews",
        ],
      },
      {
        name: "Product/Service Listings",
        details: [
          "Product/service showcase with descriptions",
          "Interactive galleries and media sections",
        ],
      },
      {
        name: "Lead Capture & Conversion Tools",
        details: [
          "Contact forms and pop-ups",
          "Analytics for tracking ad performance",
        ],
      },
      {
        name: "SEO & Ad Optimization",
        details: [
          "SEO for enhanced reach",
          "Integrations for Google Ads, Facebook Pixel",
        ],
      },
      {
        name: "Performance Optimization",
        details: [
          "Lightweight code and faster load times",
          "Mobile and desktop responsiveness",
        ],
      },
      {
        name: "Support & Maintenance",
        details: [
          "Ongoing performance improvements",
          "Regular SEO and keyword updates",
        ],
      },
    ],
  },
  {
    category: "Portfolio Websites",
    description: "Showcase sites for individuals or companies.",
    features: [
      {
        name: "Landing Page",
        details: [
          "Unique, branded design to stand out",
          "Overview of services and contact information",
        ],
      },
      {
        name: "Project/Portfolio Gallery",
        details: [
          "Showcase work samples, media galleries",
          "Project descriptions and client reviews",
        ],
      },
      {
        name: "About & Contact Pages",
        details: [
          "Personal or company bio",
          "Social media integrations and contact forms",
        ],
      },
      {
        name: "SEO Optimization",
        details: [
          "Keyword-focused structure for better visibility",
          "Meta descriptions and alt tags for images",
        ],
      },
      {
        name: "Performance & Aesthetic Optimization",
        details: [
          "High-quality media without compromising speed",
          "Mobile-optimized layouts",
        ],
      },
      {
        name: "Support & Maintenance",
        details: [
          "Regular updates and optimizations",
          "Support for new project additions",
        ],
      },
    ],
  },
  {
    category: "E-commerce Websites",
    description: "Designed for online product or service sales.",
    features: [
      {
        name: "Landing Page",
        details: [
          "Visually appealing, brand-focused home page",
          "Featured products and promotional banners",
        ],
      },
      {
        name: "Product Catalog & Categories",
        details: [
          "Dynamic product listings with search and filter options",
          "Detailed product pages with descriptions, images, and reviews",
        ],
      },
      {
        name: "Shopping Cart & Checkout",
        details: [
          "Secure and streamlined cart and checkout experience",
          "Support for multiple payment gateways (e.g., PayPal, Stripe)",
        ],
      },
      {
        name: "Order Management & Customer Accounts",
        details: [
          "Admin dashboard for tracking orders and managing inventory",
          "Customer accounts with order history, tracking, and wish lists",
        ],
      },
      {
        name: "SEO & Conversion Optimization",
        details: [
          "SEO for individual products and categories",
          "Conversion-focused layout and CTA placements",
        ],
      },
      {
        name: "Performance Optimization",
        details: [
          "Fast loading times and responsive design for mobile devices",
          "Scalable for high traffic and product volumes",
        ],
      },
      {
        name: "Support & Maintenance",
        details: [
          "Regular updates for security and performance",
          "Support for adding new products and features",
        ],
      },
    ],
  },
  {
    category: "Custom Websites",
    description: "Custom solutions tailored to specific requirements.",
    features: [
      {
        name: "Landing Page",
        details: [
          "Fully custom layout to suit specifications",
          "Adaptable sections for specified goals",
        ],
      },
      {
        name: "Customizable Content Sections",
        details: [
          "Any specific sections as per client's requirements",
          "Custom integrations (e.g., APIs, plugins)",
        ],
      },
      {
        name: "SEO & Analytics",
        details: [
          "Tailored SEO approach for niche markets",
          "Integration with Google Analytics, custom analytics",
        ],
      },
      {
        name: "Performance Optimization",
        details: [
          "Optimization for custom functionalities",
          "Device and browser compatibility checks",
        ],
      },
      {
        name: "Ongoing Support & Maintenance",
        details: ["Tailored maintenance plans", "Feature updates as requested"],
      },
    ],
  },
];
