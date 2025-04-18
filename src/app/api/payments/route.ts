import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface CreatePaymentRequest {
  amount: number;
  currency: 'USD' | 'IRR';
  gateway: 'zarinpal' | 'paypal' | 'nowpayments';
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const apiKey = request.headers.get('X-API-Key');

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 401 }
      );
    }

    const body: CreatePaymentRequest = await request.json();

    // Validate request body
    if (!body.amount || !body.currency || !body.gateway) {
      return NextResponse.json(
        { error: 'Amount, currency, and gateway are required' },
        { status: 400 }
      );
    }

    // Validate amount
    if (body.amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Validate currency and gateway combinations
    if (body.gateway === 'zarinpal' && body.currency !== 'IRR') {
      return NextResponse.json(
        { error: 'Zarinpal only supports IRR currency' },
        { status: 400 }
      );
    }

    if (body.gateway === 'paypal' && body.currency !== 'USD') {
      return NextResponse.json(
        { error: 'PayPal only supports USD currency' },
        { status: 400 }
      );
    }

    // Make request to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to create payment' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
} 