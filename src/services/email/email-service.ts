import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AccountCreatedEmail } from "@/services/email/account-created-email";
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
}

interface AccountCreatedEmailData {
  userEmail: string;
  userName?: string;
  signinUrl: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const config: EmailConfig = {
      service: process.env.SMTP_HOST || "gmail",
      secure: process.env.SMTP_SECURE === "false",
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
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email");
    }
  }

  async sendVerificationNoticeEmailAdmin(
    email: string,
    userName?: string
  ): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Verification Request</h2>
        <p>Hello Admin,</p>
        <p>A new verification request has been submitted by ${userName || email}.</p>
        <p>Please review the request in the admin panel.</p>
        <p>Best regards,<br>The Gree Software Academy Team</p>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: "New Verification Request - Gree Software Academy",
      html,
      text: `A new verification request has been submitted by ${userName || email}. Please review it in the admin panel.`,
    });
  }

  async sendVerificationNoticeEmailUser(
    email: string,
    userName?: string
  ): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verification Submitted</h2>
        <p>Hello ${userName || "there"},</p>
        <p>Your verification request has been successfully submitted. We'll notify you once it has been reviewed.</p>
        <p>At Gree Software Academy, we teach relevant real-world skills to the youth and beyond — thanks for taking this step.</p>
        <p>Best regards,<br>The Gree Software Academy Team</p>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: "Verification Submitted - Gree Software Academy",
      html,
      text: `Your verification request has been submitted. We'll notify you after review.`,
    });
  }

  async sendVerificationStatusEmailUser(
    email: string,
    status: "APPROVED" | "REJECTED",
    userName?: string
  ): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verification ${status}</h2>
        <p>Hello ${userName || "there"},</p>
        <p>Your verification has been ${status === "APPROVED" ? "approved" : "rejected"}. ${status === "APPROVED" ? "You can now access all features that require verification." : ""}</p>
        <p>At Gree Software Academy, our mission is to equip learners with real-world skills. ${status === "APPROVED" ? "You're all set to continue." : "If you have questions, reply to this email and we'll help."}</p>
        <p>Best regards,<br>The Gree Software Academy Team</p>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: `Verification ${status} - Gree Software Academy`,
      html,
      text: `Your verification is ${status === "APPROVED" ? "approved" : "rejected"}. ${status === "APPROVED" ? "You're good to go." : "Reply if you need assistance."}`,
    });
  }

  async sendPasswordResetConfirmation(
    email: string,
    userName?: string
  ): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Successful</h2>
        <p>Hello ${userName || "there"},</p>
        <p>Your password has been successfully reset. If you didn't make this change, please contact our support team immediately.</p>
        <p>For security, you may want to:</p>
        <ul>
          <li>Review your recent account activity</li>
          <li>Update your security settings</li>
        </ul>
        <p>Best regards,<br>The Gree Software Academy Team</p>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: "Password Reset Confirmation - Gree Software Academy",
      html,
      text: "Your password has been successfully reset.",
    });
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
