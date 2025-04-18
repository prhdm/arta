import { NextResponse } from 'next/server';

interface PreparePaymentRequest {
  name: string;
  instagram_id: string;
  email: string;
  currency: string;
  amount: number;
  authority_id: string;
}

export async function POST(request: Request) {
  try {
    const body: PreparePaymentRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.instagram_id || !body.email || !body.currency || !body.amount || !body.authority_id) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Here you would typically call the Zarinpal API or any other logic
    // For now, let's assume the Zarinpal API call is successful and returns code 100
    const zarinpalResponse = { data: { code: 100, authority: body.authority_id } };

    if (zarinpalResponse.data.code === 100) {
      // Redirect user to payment
      return NextResponse.json({
        url: `https://www.zarinpal.com/pg/StartPay/${zarinpalResponse.data.authority}`,
      });
    } else {
      throw new Error('Error in payment preparation');
    }
  } catch (error) {
    console.error('Error in PreparePaymentRequest:', error);
    return NextResponse.json(
      { error: 'Error in payment preparation' },
      { status: 500 }
    );
  }
} 