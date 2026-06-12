import { generateSEO } from "@/lib/seo";
import CheckoutClient from "./checkout-client";

export const metadata = generateSEO({
  title: "Payment Checkout",
  description: "Secure payment verification for Gree Software Academy.",
  canonical: "/gree-software-academy/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
