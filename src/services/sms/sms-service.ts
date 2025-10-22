interface UelloSendConfig {
  apiKey: string;
  senderId: string;
  baseUrl: string;
}

interface SendSMSOptions {
  to: string;
  message: string;
}

// interface UelloSendResponse {
//   success: boolean;
//   message: string;
//   data?: any;
// }

class SMSService {
  private config: UelloSendConfig;

  constructor() {
    this.config = {
      apiKey: process.env.UELLOSEND_API_KEY || "",
      senderId: process.env.UELLOSEND_SENDER_ID || "",
      baseUrl:
        process.env.UELLOSEND_BASE_URL || "https://uellosend.com/quicksend/",
    };
  }

  async sendSMS(options: SendSMSOptions): Promise<void> {
    try {
      await fetch(`${this.config.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: this.config.apiKey,
          sender_id: this.config.senderId,
          recipient: options.to,
          message: options.message,
        }),
      });
    } catch (error) {
      console.error("SMS sending failed:", error);
      throw new Error("Failed to send SMS");
    }
  }

  async sendPasswordResetOTP(
    phoneNumber: string,
    otp: string,
    expiresIn: string
  ): Promise<void> {
    const message = `Your Farzel password reset OTP is: ${otp}. This code expires in ${expiresIn}. Do not share this code with anyone.`;

    await this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  async sendPasswordResetConfirmation(phoneNumber: string): Promise<void> {
    const message =
      "Your Farzel password has been successfully reset. If you didn't make this change, please contact support immediately.";

    await this.sendSMS({
      to: phoneNumber,
      message,
    });
  }

  formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Add country code if not present (assuming Nigeria +234)
    if (cleaned.length === 10 && cleaned.startsWith("0")) {
      return `233${cleaned.substring(1)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith("233")) {
      return cleaned;
    } else if (cleaned.length === 13 && cleaned.startsWith("233")) {
      return cleaned;
    }

    return cleaned;
  }
}

export const smsService = new SMSService();
