import { NextRequest, NextResponse } from "next/server";
import { processYookassaEvent, verifyYookassaSignature, YookassaEvent } from "@/features/yookassa";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") ?? "";

  console.log("[Webhook] provider:", provider);

  switch (provider) {
    case "yookassa":
      return handleYookassa(rawBody, signature);
    case "max":
      return handleMax(rawBody, signature);
    default:
      return NextResponse.json(
        { error: "Unknown provider: " + provider },
        { status: 400 }
      );
  }
}

function handleYookassa(rawBody: string, signature: string) {
  const secret = process.env.YOOKASSA_WEBHOOK_SECRET ?? "";

  // Verify signature if secret is set
  if (secret) {
    const isValid = verifyYookassaSignature(rawBody, signature, secret);
    if (!isValid) {
      console.log("[Webhook] YooKassa invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  try {
    const body = JSON.parse(rawBody) as YookassaEvent;
    const result = processYookassaEvent(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

function handleMax(rawBody: string, _signature: string) {
  console.log("[Webhook] MAX event received:", rawBody);
  return NextResponse.json({ ok: true, provider: "max" });
}
