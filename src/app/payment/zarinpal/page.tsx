"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ZarinpalPayment() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const orderCode = searchParams.get('orderCode');

  useEffect(() => {
    const redirectToZarinpal = async () => {
      if (amount && orderCode) {
        try {
          const response = await fetch('/api/zarinpal/request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: Number(amount),
              orderCode,
              description: 'خرید آلبوم',
              callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/verify/zarinpal`
            }),
          });

          const data = await response.json();

          if (response.ok && data.url) {
            window.location.href = data.url;
          } else {
            throw new Error(data.error || 'خطا در اتصال به درگاه پرداخت');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('خطا در اتصال به درگاه پرداخت. لطفاً دوباره تلاش کنید.');
          window.location.href = '/';
        }
      }
    };

    redirectToZarinpal();
  }, [amount, orderCode]);

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