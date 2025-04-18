import { NextResponse } from 'next/server';

interface Supporter {
  name: string;
  instagram: string;
  amount: number;
  currency: 'USD' | 'IRR';
}

export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/top-users`;
    console.log('Calling backend at:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend response not OK:', response.status, response.statusText);
      throw new Error('Failed to fetch supporters from backend');
    }

    const data = await response.json();
    console.log('Received data from backend:', data);

    const rawSupporters = data?.supporters;
    const supporters: Supporter[] = Array.isArray(rawSupporters) ? rawSupporters : [];

    // Sort all supporters by amount and take top 10
    const topSupporters = supporters
      .sort((a, b) => {
        const amountA = a.currency === 'IRR' ? a.amount / 100000 : a.amount;
        const amountB = b.currency === 'IRR' ? b.amount / 100000 : b.amount;
        return amountB - amountA;
      })
      .slice(0, 10);

    return NextResponse.json(topSupporters);
  } catch (error) {
    console.error('Error in top-users:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت اطلاعات' },
      { status: 500 }
    );
  }
}
