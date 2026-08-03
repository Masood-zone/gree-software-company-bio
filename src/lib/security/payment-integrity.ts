import { z } from "zod";

const PAYMENT_CALLBACK_PATH = "/gree-software-academy/checkout";
const REFERENCE_PATTERN = /^[A-Za-z0-9._-]{6,100}$/;
const CURRENCY_PATTERN = /^[A-Z]{3}$/;

export const paymentReferenceSchema = z
  .string()
  .trim()
  .regex(REFERENCE_PATTERN, "Invalid payment reference");

export function majorToMinor(amountMajor: number): number {
  if (!Number.isFinite(amountMajor) || amountMajor <= 0) {
    throw new Error("Payment amount must be a positive number");
  }

  const unrounded = amountMajor * 100;
  const amountMinor = Math.round(unrounded);

  if (
    !Number.isSafeInteger(amountMinor) ||
    Math.abs(unrounded - amountMinor) > 0.000001
  ) {
    throw new Error("Payment amount must have at most two decimal places");
  }

  return amountMinor;
}

export function normalizeCurrency(currency: string | null | undefined): string {
  const normalized = (currency || "GHS").trim().toUpperCase();
  if (!CURRENCY_PATTERN.test(normalized)) {
    throw new Error("Invalid payment currency");
  }
  return normalized;
}

function addConfiguredOrigin(origins: Set<string>, value?: string) {
  if (!value) return;

  try {
    const candidate = value.includes("://") ? value : `https://${value}`;
    origins.add(new URL(candidate).origin);
  } catch {
    // Invalid deployment configuration must not expand the callback allowlist.
  }
}

export function resolvePaymentCallbackUrl(
  requestUrl: string,
  suppliedCallbackUrl?: string
): string {
  const requestOrigin = new URL(requestUrl).origin;
  const allowedOrigins = new Set<string>([
    requestOrigin,
    "https://www.greesoftwarecompany.com",
    "https://greesoftwarecompany.com",
  ]);

  addConfiguredOrigin(allowedOrigins, process.env.BETTER_AUTH_URL);
  addConfiguredOrigin(allowedOrigins, process.env.NEXT_PUBLIC_SITE_URL);
  addConfiguredOrigin(
    allowedOrigins,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  );

  const callback = new URL(
    suppliedCallbackUrl || PAYMENT_CALLBACK_PATH,
    requestOrigin
  );

  if (
    !allowedOrigins.has(callback.origin) ||
    callback.pathname !== PAYMENT_CALLBACK_PATH ||
    callback.username ||
    callback.password ||
    callback.hash
  ) {
    throw new Error("Callback URL is not allowed");
  }

  for (const key of callback.searchParams.keys()) {
    if (key !== "next") throw new Error("Callback URL is not allowed");
  }

  const next = callback.searchParams.get("next");
  if (next && (!next.startsWith("/") || next.startsWith("//"))) {
    throw new Error("Callback URL is not allowed");
  }

  return callback.toString();
}

export function providerPaymentMatchesExpected(input: {
  providerReference: string;
  providerAmountMinor: number;
  providerCurrency: string;
  expectedReference: string;
  expectedAmountMinor: number;
  expectedCurrency: string;
}): boolean {
  return (
    input.providerReference === input.expectedReference &&
    Number.isSafeInteger(input.providerAmountMinor) &&
    input.providerAmountMinor === input.expectedAmountMinor &&
    normalizeCurrency(input.providerCurrency) ===
      normalizeCurrency(input.expectedCurrency)
  );
}

