import { NextResponse } from "next/server";
import { Resend } from "resend";

const STORE_EMAIL = "amimeraz1098@gmail.com";
const BKASH_NUMBER = "01309432441";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type CheckoutBody = {
  name: string;
  phone: string;
  address: string;
  transactionId: string;
  items: OrderItem[];
  subtotal: number;
};

function isValidBody(body: unknown): body is CheckoutBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.address === "string" &&
    b.address.trim().length > 0 &&
    typeof b.transactionId === "string" &&
    b.transactionId.trim().length > 0 &&
    Array.isArray(b.items) &&
    b.items.length > 0 &&
    typeof b.subtotal === "number"
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!isValidBody(body)) {
    return NextResponse.json(
      { error: "Missing or invalid order details." },
      { status: 400 },
    );
  }

  const { name, phone, address, transactionId, items, subtotal } = body;

  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">$${item.price.toFixed(2)}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;max-width:600px;margin:0 auto;">
      <h2 style="margin-bottom:4px;">New Order Received</h2>
      <p style="color:#525252;margin-top:0;">A customer has submitted an order and payment via bKash.</p>

      <h3 style="margin-bottom:8px;">Customer Details</h3>
      <p style="margin:2px 0;"><strong>Name:</strong> ${name}</p>
      <p style="margin:2px 0;"><strong>Phone:</strong> ${phone}</p>
      <p style="margin:2px 0;"><strong>Delivery Address:</strong> ${address}</p>
      <p style="margin:2px 0;"><strong>bKash Transaction ID:</strong> ${transactionId}</p>

      <h3 style="margin-top:24px;margin-bottom:8px;">Order Summary</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:6px 12px;text-align:left;">Item</th>
            <th style="padding:6px 12px;text-align:center;">Qty</th>
            <th style="padding:6px 12px;text-align:right;">Price</th>
            <th style="padding:6px 12px;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <p style="text-align:right;font-size:16px;margin-top:12px;">
        <strong>Order Total: $${subtotal.toFixed(2)}</strong>
      </p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set. Order was not emailed:",
      JSON.stringify(body, null, 2),
    );
    return NextResponse.json(
      {
        error:
          "Email service is not configured yet. The order was not sent to the store owner.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  // Resend's shared test sender (onboarding@resend.dev) can only deliver to the
  // Resend account's own signup address until a sending domain is verified at
  // resend.com/domains. Set RESEND_TEST_TO in .env.local to override the
  // recipient during testing; remove it once a domain is verified so orders
  // go to STORE_EMAIL for real.
  const recipient = process.env.RESEND_TEST_TO || STORE_EMAIL;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Meraz Orders <onboarding@resend.dev>",
    to: recipient,
    replyTo: undefined,
    subject: `New Order from ${name} — $${subtotal.toFixed(2)}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send order email." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, bkashNumber: BKASH_NUMBER });
}
