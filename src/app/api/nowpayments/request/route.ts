import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface NowPaymentsRequestBody {
  amount: number;
  orderCode: string;
  description: string;
  currency: string;
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const apiKey = request.headers.get('X-API-Key');
    const expectedApiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'کلید API نامعتبر است' },
        { status: 401 }
      );
    }

    const body: NowPaymentsRequestBody = await request.json();

    if (!body.amount || !body.orderCode || !body.description || !body.currency) {
      return NextResponse.json(
        { error: 'همه پارامترها الزامی هستند' },
        { status: 400 }
      );
    }

    console.log('Sending request to NowPayments with:', {
      price_amount: body.amount,
      price_currency: body.currency.toLowerCase(),
      order_id: body.orderCode,
      order_description: body.description,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/nowpayments/callback`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    // ارسال درخواست به NowPayments.io با استفاده از کلید خصوصی
    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
      },
      body: JSON.stringify({
        price_amount: body.amount,
        price_currency: body.currency.toLowerCase(),
        order_id: body.orderCode,
        order_description: body.description,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/nowpayments/callback`,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      }),
    });

    const responseData = await response.json();
    console.log('NowPayments response:', responseData);

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.message || 'خطا در ایجاد تراکنش' },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in NowPayments request:', error);
    return NextResponse.json(
      { error: 'خطا در ایجاد تراکنش' },
      { status: 500 }
    );
  }
} 