import BetterDelivery from "@/assets/images/application-delivery.jpg";
import BugFixes from "@/assets/images/updates.jpg";
import SystemManagement from "@/assets/images/system-management.jpg";
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
