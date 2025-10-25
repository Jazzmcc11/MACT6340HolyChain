// utils/utils.js
import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g. smtp.mail.me.com
      port: Number(process.env.MAIL_PORT) || 587,
      secure: process.env.MAIL_SECURE === "true", // use true only if you're on port 465
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // helps iCloud STARTTLS handshake
      },
      requireTLS: process.env.MAIL_TLS === "true",
    });

    const message = {
      from: process.env.MESSAGE_FROM || process.env.MAIL_USERNAME,
      to: process.env.MESSAGE_TO || process.env.MAIL_USERNAME,
      subject: sub,
      text: txt,
      html: `<pre style="font-family:inherit; white-space:pre-wrap;">${txt}</pre>`,
    };

console.log("💌 DEBUG — FROM:", message.from);
console.log("💌 DEBUG — TO:", message.to);
console.log("💌 DEBUG — SMTP USER:", transporter.options.auth.user);

const info = await transporter.sendMail(message);

    console.log("✅ Message sent successfully!");
    console.log("📨 Message ID:", info.messageId);
    if (info.response) console.log("Response:", info.response);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw err;
  }
}
