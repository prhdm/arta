import { NextResponse } from 'next/server';
import { VerifyOTPRequest } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const body: VerifyOTPRequest = await request.json();
    console.log('Received OTP verification request:', body);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error || 'Failed to verify OTP' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (data.api_key) {
      return NextResponse.json({
        success: true,
        message: data.message || 'OTP verified successfully',
        api_key: data.api_key
      });
    } else {
      return NextResponse.json({
        error: 'Invalid response from server',
        status: 500
      });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
} 