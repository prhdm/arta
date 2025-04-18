import { NextResponse } from 'next/server';

interface ZarinpalRequestBody {
  amount: number;
  orderCode: string;
  description: string;
  callback_url: string;
  name: string;
  instagram_id: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const body: ZarinpalRequestBody = await request.json();

    if (!body.amount || !body.orderCode || !body.description || !body.name || !body.instagram_id || !body.email) {
      return NextResponse.json(
        { error: 'همه پارامترها الزامی هستند' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.zarinpal.com/pg/v4/payment/request.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.ZARINPAL_MERCHANT_ID}`,
      },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: body.amount * 10, // تبدیل تومان به ریال
        description: body.description,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/zarinpal/callback`,
        metadata: {
          order_id: body.orderCode,
        }
      }),
    });

    const data = await response.json();

    if (data.data.code === 100) {
      const authorityId = data.data.authority;

      const prepareResponse = await fetch('/api/payment/prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: body.name,
          instagram_id: body.instagram_id,
          email: body.email,
          currency: 'irr',
          amount: body.amount,
          authority_id: authorityId,
        }),
      });

      const prepareData = await prepareResponse.json();

      if (prepareResponse.ok) {
        return NextResponse.json({
          url: prepareData.url,
        });
      } else {
        throw new Error(prepareData.error || 'Error in payment preparation');
      }
    } else {
      throw new Error(data.errors.message || 'خطا در ایجاد تراکنش');
    }
  } catch (error) {
    console.error('Error in Zarinpal request:', error);
    return NextResponse.json(
      { error: 'خطا در ایجاد تراکنش' },
      { status: 500 }
    );
  }
} 