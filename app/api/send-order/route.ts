// app/api/send-order/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const order = await req.json();

  if (!order || !order.productName) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  try {
    let transporter;
    let previewUrl: string | null = null;

    if (!process.env.SMTP_HOST) {
      // fallback: ethereal test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    }

    const specsText = Object.entries(order.specs || {})
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    const html = `
      <h2>🆕 New Order</h2>
      <h3>👤 Customer</h3>
      <p><strong>Name:</strong> ${order.customer?.name || "N/A"}</p>
      <p><strong>Phone:</strong> ${order.customer?.phone || "N/A"}</p>

      <h3>🛒 Product</h3>
      <p><strong>Product:</strong> ${order.productName}</p>
      <p><strong>ID:</strong> ${order.productId || "N/A"}</p>
      <p><strong>Qty:</strong> ${order.quantity}</p>
      <p><strong>Unit Price:</strong> ₦${order.unitPrice}</p>
      <p><strong>Total:</strong> ₦${order.totalPrice}</p>
      <p><strong>Tax:</strong> ₦${order.tax || 0}</p>
      <p><strong>Specs:</strong> ${specsText || "None"}</p>
    `;

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || `"Orders" <depalashltd@gmail.com>`,
      to: process.env.TO_EMAIL || "depalashltd@gmail.com",
      subject: `New order: ${order.productName} x${order.quantity}`,
      text: `
New Order!

Customer:
- Name: ${order.customer?.name || "N/A"}
- Phone: ${order.customer?.phone || "N/A"}

Product:
- ${order.productName} (x${order.quantity})
- Total: ₦${order.totalPrice}
- Specs: ${specsText || "None"}
      `,
      html,
    });

    if (nodemailer.getTestMessageUrl) {
      previewUrl = nodemailer.getTestMessageUrl(info) || null;
    }

    return NextResponse.json({ success: true, messageId: info.messageId, previewUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
