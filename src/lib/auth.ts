import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/database/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

const ADMIN_EMAIL = "masoodacheampong@gmail.com";
const configuredOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_BASE_URL,
  "https://www.greesoftwarecompany.com",
  "https://greesoftwarecompany.com",
  ...(process.env.NODE_ENV === "production"
    ? []
    : ["http://localhost:3000", "http://127.0.0.1:3000"]),
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [...new Set(configuredOrigins)],
  rateLimit: {
    enabled: true,
    storage: "memory",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 15 * 60, max: 5 },
      "/sign-up/email": { window: 60 * 60, max: 3 },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    password: { hash: hashPassword, verify: verifyPassword },
  },
  user: {
    additionalFields: {
      phone: { type: "string", required: true },
      fullName: { type: "string", required: false },
      location: { type: "string", required: false },
      role: {
        type: "string",
        required: true,
        defaultValue: "USER",
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            role: user.email.toLowerCase() === ADMIN_EMAIL ? "ADMIN" : "USER",
          },
        }),
      },
    },
  },
});

export type AuthSession = typeof auth.$Infer.Session;
