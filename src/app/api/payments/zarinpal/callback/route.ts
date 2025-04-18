import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const Authority = searchParams.get('Authority');
    const Status = searchParams.get('Status');

    if (!Authority || !Status) {
      return NextResponse.redirect(new URL('/cancel', request.url));
    }

    // ارسال درخواست تایید به سرور اصلی
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      return NextResponse.redirect(new URL('/cancel', request.url));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/zarinpal/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        authority: Authority,
        status: Status,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.redirect(new URL('/success', request.url));
    } else {
      return NextResponse.redirect(new URL('/cancel', request.url));
    }
  } catch (error) {
    console.error('Error in Zarinpal callback:', error);
    return NextResponse.redirect(new URL('/cancel', request.url));
  }
} 