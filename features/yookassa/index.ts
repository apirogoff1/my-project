import crypto from "crypto";

// YooKassa webhook event types
export type YookassaEvent = {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    amount: {
      value: string;
      currency: string;
    };
    metadata?: Record<string, string>;
    paid: boolean;
    created_at: string;
  };
};

// Verify webhook signature from YooKassa
export function verifyYookassaSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  if (!secret || !signature) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(body);
  const expected = hmac.digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(signature, "hex")
  );
}

// Handle payment.succeeded event
export function handlePaymentSucceeded(event: YookassaEvent) {
  const payment = event.object;
  console.log("[YooKassa] Payment succeeded:", payment.id);
  console.log("[YooKassa] Amount:", payment.amount.value, payment.amount.currency);
  console.log("[YooKassa] Metadata:", payment.metadata);
  // TODO: update database, activate subscription, send email
  return { ok: true, paymentId: payment.id };
}

// Handle payment.canceled event
export function handlePaymentCanceled(event: YookassaEvent) {
  const payment = event.object;
  console.log("[YooKassa] Payment canceled:", payment.id);
  // TODO: update database, notify user
  return { ok: true, paymentId: payment.id };
}

// Handle refund.succeeded event
export function handleRefundSucceeded(event: YookassaEvent) {
  const payment = event.object;
  console.log("[YooKassa] Refund succeeded:", payment.id);
  // TODO: update database, deactivate subscription
  return { ok: true, paymentId: payment.id };
}

// Main event router
export function processYookassaEvent(event: YookassaEvent) {
  switch (event.event) {
    case "payment.succeeded":
      return handlePaymentSucceeded(event);
    case "payment.canceled":
      return handlePaymentCanceled(event);
    case "refund.succeeded":
      return handleRefundSucceeded(event);
    default:
      console.log("[YooKassa] Unknown event:", event.event);
      return { ok: true, event: event.event };
  }
}
