import { Supporter, ConvertedSupporter } from '../types/supporter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const fetchTopSupporters = async (): Promise<ConvertedSupporter[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/top-users`);
    if (!response.ok) {
      throw new Error('Failed to fetch top supporters');
    }
    const supporters: Supporter[] = await response.json();
    
    return supporters.map(supporter => {
      if (supporter.currency === 'IRR') {
        return {
          ...supporter,
          amount: supporter.amount / 100000,
          currency: 'USD' as const
        };
      }
      return {
        ...supporter,
        currency: 'USD' as const
      };
    });
  } catch (error) {
    console.error('Error fetching top supporters:', error);
    return [];
  }
};

interface SendOTPResponse {
  success: boolean;
  error?: string;
}

export const sendOTP = async (email: string): Promise<SendOTPResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send OTP');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'خطا در ارسال کد تایید'
    };
  }
};

interface VerifyOTPRequest {
  email: string;
  otp: string;
  instagram_id: string;
  name: string;
}

interface VerifyOTPResponse {
  success: boolean;
  error?: string;
  token?: string;
}

export const verifyOTP = async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to verify OTP');
    }

    const result = await response.json();
    return {
      success: true,
      token: result.token
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'خطا در تایید کد'
    };
  }
};

interface PaymentRequest {
  amount: number;
  currency: 'USD' | 'IRR';
  paymentMethod: 'zarinpal' | 'crypto' | 'paypal';
  name: string;
  email: string;
  instagram: string;
  code: string;
}

interface PaymentResponse {
  success: boolean;
  error?: string;
  orderCode?: string;
  paymentUrl?: string;
}

export const createPayment = async (data: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency,
        gateway: data.paymentMethod,
        name: data.name,
        email: data.email,
        instagram_id: data.instagram,
        code: data.code
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment');
    }

    const result = await response.json();
    return {
      success: true,
      orderCode: result.orderCode,
      paymentUrl: result.paymentUrl
    };
  } catch (error) {
    console.error('Error creating payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'خطا در ایجاد پرداخت'
    };
  }
}; 