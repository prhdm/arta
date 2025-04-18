import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payment_id, payment_status, pay_address, pay_amount, pay_currency, order_id } = body;

    if (!payment_id || !payment_status || !order_id) {
      return NextResponse.json(
        { error: 'اطلاعات پرداخت نامعتبر است' },
        { status: 400 }
      );
    }

    // ارسال درخواست تایید به سرور اصلی
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'کلید API نامعتبر است' },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nowpayments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        payment_id,
        payment_status,
        pay_address,
        pay_amount,
        pay_currency,
        order_id,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'خطا در تایید پرداخت' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in NowPayments callback:', error);
    return NextResponse.json(
      { error: 'خطا در پردازش callback' },
      { status: 500 }
    );
  }
} 