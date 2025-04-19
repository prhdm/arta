"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ZarinpalPayment() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const instagram = searchParams.get('instagram');

  useEffect(() => {
    const redirectToZarinpal = async () => {
      console.log('=== Zarinpal Payment Debug ===');
      console.log('URL parameters:', {
        amount,
        name,
        email,
        instagram
      });

      if (!amount || !name || !email || !instagram) {
        console.log('Missing required parameters:', {
          amount: !amount,
          name: !name,
          email: !email,
          instagram: !instagram
        });
        alert('اطلاعات پرداخت ناقص است. لطفاً دوباره تلاش کنید.');
        window.location.href = '/';
        return;
      }

      try {
        const requestBody = {
          amount: Number(amount),
          description: 'خرید آلبوم',
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/zarinpal/callback`,
          name,
          email,
          instagram_id: instagram
        };

        console.log('Sending request to Zarinpal with:', requestBody);

        // فراخوانی API زرین‌پال
        const response = await fetch('/api/zarinpal/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('خطا در آماده‌سازی پرداخت');
        }

        const data = await response.json();
        if (!data.paymentUrl) {
          throw new Error('خطا در دریافت لینک پرداخت');
        }

        console.log('Redirecting to:', data.paymentUrl);
        window.location.href = data.paymentUrl;
      } catch (error) {
        console.error('Error:', error);
        alert('خطا در اتصال به درگاه پرداخت. لطفاً دوباره تلاش کنید.');
        window.location.href = '/';
      }
    };

    redirectToZarinpal();
  }, [amount, name, email, instagram]);

  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-700 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Loader2 className="w-20 h-20 text-[#8B0000] animate-spin" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-6 font-iranyekan">
          در حال انتقال به درگاه پرداخت
        </h1>
        
        <p className="text-neutral-400 mb-6 font-iranyekan">
          لطفاً صبر کنید. در حال انتقال به درگاه پرداخت زرین‌پال هستید.
        </p>
      </div>
    </div>
  );
} 