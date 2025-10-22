export interface Course {
  id: string;
  name: string;
  description?: string | null;
  amount?: number | null; // amount in major units (e.g., GHS)
  currency?: string | null; // e.g., "GHS"
  active: boolean;
  createdAt: string; // ISO string from API
  updatedAt: string; // ISO string from API
}

export interface EnrollmentData {
  userId: string;
  courseId: string;
  notes?: string;
}

// Payment initialization payload for backend /api/payment/initialize
export interface PaymentInitRequest {
  enrollmentId: string;
  userId: string;
  amountMajor: number; // in cedis; backend converts to pesewas
  callbackUrl?: string;
}

export interface EnrollmentResponse {
  id: string;
  enrollment: {
    id: string;
  };
  userId: string;
  courseId: string;
  status: string;
  createdAt: string;
}

export interface PaymentInitResponse {
  success: boolean;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
    paymentId: string;
  };
}
