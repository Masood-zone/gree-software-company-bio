import "server-only";

import { createHash } from "crypto";

type Entry = { count: number; resetAt: number };
const attempts = new Map<string, Entry>();
const MAX_TRACKED_ATTEMPTS = 10_000;

function pruneAttempts(now: number) {
  if (attempts.size < MAX_TRACKED_ATTEMPTS) return;

  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key);
  }

  while (attempts.size >= MAX_TRACKED_ATTEMPTS) {
    const oldestKey = attempts.keys().next().value;
    if (typeof oldestKey !== "string") break;
    attempts.delete(oldestKey);
  }
}

function clientKey(request: Request, scope: string, identifier?: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  const digest = createHash("sha256")
    .update(`${ip}:${identifier?.trim().toLowerCase() || ""}`)
    .digest("hex");
  return `${scope}:${digest}`;
}

export function checkAuthRateLimit(input: {
  request: Request;
  scope: "login" | "register";
  identifier?: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  pruneAttempts(now);
  const key = clientKey(input.request, input.scope, input.identifier);
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + input.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= input.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function withNoStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  return response;
}
