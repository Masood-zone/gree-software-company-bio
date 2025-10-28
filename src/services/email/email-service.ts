import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AccountCreatedEmail } from "@/services/email/account-created-email";
import { PaymentSuccessfulSummaryEmail } from "@/services/email/payment-success-summary-email";
interface EmailConfig {
  service?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

interface AccountCreatedEmailData {
  userEmail: string;
  userName?: string;
  signinUrl: string;
}

interface PaymentSuccessfulSummaryEmailData {
  adminEmail: string; // recipient
  purchaserName?: string | null;
  purchaserEmail?: string | null;
  purchaserPhone?: string | null;
  courseName: string;
  currency: string; // e.g., GHS
  paidMajor: number; // this transaction amount in major units
  totalPaidMajor: number; // cumulative after this txn
  agreedMajor: number; // total agreed fee
  remainingMajor: number; // remaining after this txn
  method: string; // e.g., MOBILE_MONEY
  reference: string;
  paidAt?: string; // ISO
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const config: EmailConfig = {
      service: process.env.SMTP_HOST || "gmail",
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    };

    this.transporter = nodemailer.createTransport(config);
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || "",
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments,
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email");
    }
  }

  async sendAccountCreatedEmail(data: AccountCreatedEmailData): Promise<void> {
    const emailHtml = await render(AccountCreatedEmail(data));
    await this.sendEmail({
      to: data.userEmail,
      subject: "Welcome to Gree Software Academy! Your Account is Ready",
      html: emailHtml,
      text: `Welcome to Gree Software Academy, ${data.userName || data.userEmail}! Sign in: ${data.signinUrl}`,
    });
  }

  async sendPaymentSuccessfulSummaryEmail(
    data: PaymentSuccessfulSummaryEmailData
  ): Promise<void> {
    const emailHtml = await render(PaymentSuccessfulSummaryEmail(data));

    // Build a compact CSV attachment for admins
    const csvSafe = (v: unknown) =>
      typeof v === "string" ? `"${v.replace(/"/g, '""')}"` : String(v ?? "");
    const header = [
      "reference",
      "paidAt",
      "method",
      "currency",
      "paidMajor",
      "totalPaidMajor",
      "agreedMajor",
      "remainingMajor",
      "courseName",
      "purchaserName",
      "purchaserEmail",
      "purchaserPhone",
    ];
    const row = [
      data.reference,
      data.paidAt ?? new Date().toISOString(),
      data.method,
      data.currency,
      data.paidMajor,
      data.totalPaidMajor,
      data.agreedMajor,
      data.remainingMajor,
      data.courseName,
      data.purchaserName ?? "",
      data.purchaserEmail ?? "",
      data.purchaserPhone ?? "",
    ];
    const csv = `${header.join(",")}\n${row.map(csvSafe).join(",")}`;

    await this.sendEmail({
      to: data.adminEmail,
      subject: `GSA Payment Verified — ${data.courseName} (${data.currency} ${data.paidMajor.toLocaleString()})`,
      html: emailHtml,
      text: `Payment verified for ${data.courseName}. Amount: ${data.currency} ${data.paidMajor}. Total Paid: ${data.currency} ${data.totalPaidMajor}. Remaining: ${data.currency} ${data.remainingMajor}. Ref: ${data.reference}.`,
      attachments: [
        {
          filename: `payment-summary-${data.reference}.csv`,
          content: csv,
          contentType: "text/csv",
        },
      ],
    });
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("Email service connection failed:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
