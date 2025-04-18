import { NextResponse } from 'next/server';
import { generateOTP } from '@/lib/utils';

// Define the type for verification codes
type VerificationCodes = Record<string, string>;

// Initialize the global variable if it doesn't exist
if (!(global as any).verificationCodes) {
  (global as any).verificationCodes = {};
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'ایمیل الزامی است' },
        { status: 400 }
      );
    }

    // تولید کد تایید
    const verificationCode = generateOTP();

    // ذخیره کد در دیتابیس یا حافظه موقت
    // در این مثال از حافظه موقت استفاده می‌کنیم
    (global as any).verificationCodes[email] = verificationCode;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in verify-email route:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در پردازش درخواست' },
      { status: 500 }
    );
  }
} 