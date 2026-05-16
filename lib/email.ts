import nodemailer from "nodemailer";
import { APP_NAME } from "@/data/templates";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
});

export async function sendPaymentConfirmation(email: string) {
  await transporter.sendMail({
    from: "வந்தனம் Team <noreply@vanthanam.in>",
    to: email,
    subject: "திருமண அழைப்பிதழ் - Payment Confirmed",
    html: `<div style="font-family: Catamaran, sans-serif; line-height:1.8"><h2>${APP_NAME}</h2><p>நன்றி! உங்கள் கட்டணம் வெற்றிகரமாக பெறப்பட்டது.</p><p>இப்போது உங்கள் அழைப்பிதழை உருவாக்கலாம்.</p></div>`,
  });
}
