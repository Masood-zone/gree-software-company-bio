import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../../next.config";

test("applies the required security headers to every route", async () => {
  assert.equal(typeof nextConfig.headers, "function");
  const rules = await nextConfig.headers!();
  const globalRule = rules.find((rule) => rule.source === "/(.*)");
  assert.ok(globalRule);

  const headers = new Map(
    globalRule.headers.map((header) => [header.key, header.value])
  );
  const csp = headers.get("Content-Security-Policy") || "";

  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /object-src 'none'/);
  assert.equal(headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(headers.get("X-Frame-Options"), "DENY");
  assert.equal(
    headers.get("Referrer-Policy"),
    "strict-origin-when-cross-origin"
  );
  assert.match(
    headers.get("Strict-Transport-Security") || "",
    /includeSubDomains/
  );
});
