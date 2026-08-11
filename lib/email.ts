import nodemailer from "nodemailer";

type LeadEmailPayload = {
  name: string;
  phone: string;
  preferredDate: string;
};

function isConfigured(): boolean {
  return !!(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL);
}

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

/**
 * Emails the lead's details to EMAIL. Silently no-ops when EMAIL_USER /
 * EMAIL_PASS / EMAIL aren't set — callers should treat this as best-effort
 * and never let it block the lead being saved.
 */
export async function sendLeadNotification(lead: LeadEmailPayload): Promise<void> {
  if (!isConfigured()) {
    console.warn("[email] EMAIL_USER/EMAIL_PASS/EMAIL not configured — skipping lead notification email.");
    return;
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await getTransporter().sendMail({
    from: `"Amaya Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL,
    subject: `New Book a Visit request — ${lead.name}`,
    text: [
      "A new Book a Visit request was submitted on amayaseniorliving.com",
      "",
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Preferred Visit Date: ${formatDate(lead.preferredDate)}`,
      `Submitted On: ${submittedAt}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1d2f3f;">
        <h2 style="font-weight: 400; margin-bottom: 4px;">New Book a Visit request</h2>
        <p style="color: #6b5f57; margin-top: 0;">Submitted on amayaseniorliving.com</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6; color: #6b5f57;">Name</td>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6; color: #6b5f57;">Phone</td>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6;">${lead.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6; color: #6b5f57;">Preferred Visit Date</td>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6;">${formatDate(lead.preferredDate)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6; border-bottom: 1px solid #e7d8c6; color: #6b5f57;">Submitted On</td>
            <td style="padding: 8px 0; border-top: 1px solid #e7d8c6; border-bottom: 1px solid #e7d8c6;">${submittedAt}</td>
          </tr>
        </table>
      </div>
    `,
  });
}
