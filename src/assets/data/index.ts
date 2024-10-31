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
