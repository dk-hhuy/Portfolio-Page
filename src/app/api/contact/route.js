import nodemailer from 'nodemailer';

import { profile } from '../../../data/cvData';
import { validateContactForm } from '../../../lib/contactValidation';

function getMailConfig() {
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const contactTo = process.env.CONTACT_EMAIL_TO?.trim() || profile.email;

  if (!smtpUser || !smtpPass) {
    const missing = !smtpUser && !smtpPass
      ? 'SMTP_USER and SMTP_PASS'
      : !smtpPass
        ? 'SMTP_PASS (Gmail App Password)'
        : 'SMTP_USER';
    return {
      error: `Email is not configured. Add ${missing} to your .env file, then restart the dev server.`,
    };
  }

  return {
    contactTo,
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    }),
    fromAddress: process.env.SMTP_FROM?.trim() || `"Portfolio Contact" <${smtpUser}>`,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const mailConfig = getMailConfig();
    if (mailConfig.error) {
      return Response.json({ error: mailConfig.error }, { status: 503 });
    }

    const { name, email, message } = validation.data;
    const { contactTo, transporter, fromAddress } = mailConfig;

    await transporter.sendMail({
      from: fromAddress,
      to: contactTo,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('[contact] Failed to send email:', error);
    return Response.json(
      { error: 'Unable to send your message right now. Please try again or email directly.' },
      { status: 500 },
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
