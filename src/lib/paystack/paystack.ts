/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is required");
}

export interface PaystackInitializeData {
  email: string;
  amount: number; // in pesewas (smallest currency unit)
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
  channels?: string[];
  currency?: string;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    log: any;
    fees: number;
    fees_split: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any>;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: any;
    split: any;
    order_id: any;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: any;
    source: any;
    fees_breakdown: any;
  };
}

class PaystackService {
  private apiClient = axios.create({
    baseURL: PAYSTACK_BASE_URL,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  async initializeTransaction(
    data: PaystackInitializeData
  ): Promise<PaystackInitializeResponse> {
    try {
      const response = await this.apiClient.post("/transaction/initialize", {
        ...data,
        currency: data.currency || "GHS", // Ghana Cedis
        channels: data.channels || ["card", "mobile_money"],
      });

      return response.data;
    } catch (error: any) {
      console.error(
        "Paystack initialization error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to initialize payment"
      );
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
    try {
      const response = await this.apiClient.get(
        `/transaction/verify/${reference}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Paystack verification error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to verify payment"
      );
    }
  }

  async refundTransaction(reference: string, amount?: number): Promise<any> {
    try {
      const response = await this.apiClient.post("/refund", {
        transaction: reference,
        amount: amount, // in kobo, if not provided, full refund
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Paystack refund error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to process refund"
      );
    }
  }

  // Convert amount from cedis to pesewas (smallest unit)
  convertToPesewas(amount: number): number {
    return Math.round(amount * 100);
  }

  // Convert amount from pesewas to cedis
  convertFromPesewas(amount: number): number {
    return amount / 100;
  }

  // Generate unique reference
  generateReference(prefix = "GSA"): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}_${timestamp}_${random}`;
  }
}

export const paystackService = new PaystackService();
export { PAYSTACK_PUBLIC_KEY };
