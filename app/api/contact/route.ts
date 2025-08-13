// app/api/contact/route.ts
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Create transporter (use your SMTP credentials)
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or 'smtp.mailtrap.io', 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send mail
    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL, // your email
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
