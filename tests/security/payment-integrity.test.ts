import assert from "node:assert/strict";
import test from "node:test";

import {
  majorToMinor,
  paymentReferenceSchema,
  providerPaymentMatchesExpected,
  resolvePaymentCallbackUrl,
} from "../../src/lib/security/payment-integrity";

test("converts valid major-unit amounts without rounding ambiguity", () => {
  assert.equal(majorToMinor(600), 60_000);
  assert.equal(majorToMinor(12.34), 1_234);
  assert.throws(() => majorToMinor(12.345));
  assert.throws(() => majorToMinor(Number.POSITIVE_INFINITY));
});

test("allows only the canonical local checkout callback", () => {
  assert.equal(
    resolvePaymentCallbackUrl(
      "https://www.greesoftwarecompany.com/api/payment/initialize"
    ),
    "https://www.greesoftwarecompany.com/gree-software-academy/checkout"
  );
  assert.equal(
    resolvePaymentCallbackUrl(
      "https://www.greesoftwarecompany.com/api/payment/initialize",
      "/gree-software-academy/checkout?next=%2F"
    ),
    "https://www.greesoftwarecompany.com/gree-software-academy/checkout?next=%2F"
  );
  assert.throws(() =>
    resolvePaymentCallbackUrl(
      "https://www.greesoftwarecompany.com/api/payment/initialize",
      "https://attacker.example/gree-software-academy/checkout"
    )
  );
  assert.throws(() =>
    resolvePaymentCallbackUrl(
      "https://www.greesoftwarecompany.com/api/payment/initialize",
      "/contact"
    )
  );
});

test("requires an exact provider reference, amount, and currency match", () => {
  const expected = {
    providerReference: "GSA_secure-reference",
    providerAmountMinor: 60_000,
    providerCurrency: "ghs",
    expectedReference: "GSA_secure-reference",
    expectedAmountMinor: 60_000,
    expectedCurrency: "GHS",
  };

  assert.equal(providerPaymentMatchesExpected(expected), true);
  assert.equal(
    providerPaymentMatchesExpected({
      ...expected,
      providerAmountMinor: 6_000,
    }),
    false
  );
  assert.equal(
    providerPaymentMatchesExpected({
      ...expected,
      providerReference: "GSA_other-reference",
    }),
    false
  );
});

test("rejects malformed payment references", () => {
  assert.equal(paymentReferenceSchema.parse("GSA_valid-123"), "GSA_valid-123");
  assert.equal(paymentReferenceSchema.safeParse("bad reference").success, false);
  assert.equal(paymentReferenceSchema.safeParse("x").success, false);
});
