"use client";
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function CryptoPaymentContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const orderCode = searchParams.get('orderCode');

  useEffect(() => {
    const redirectToNowPayments = async () => {
      if (amount && orderCode) {
        try {
          console.log('Sending request to NowPayments with:', {
            amount: Number(amount),
            orderCode,
            description: 'خرید آلبوم',
            currency: 'USD',
          });

          const response = await fetch('/api/nowpayments/request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
            },
            body: JSON.stringify({
              amount: Number(amount),
              orderCode,
              description: 'خرید آلبوم',
              currency: 'USD',
            }),
          });

          const data = await response.json();
          console.log('NowPayments response:', data);

          if (response.ok && data.invoice_url) {
            window.location.href = data.invoice_url;
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

    redirectToNowPayments();
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
          لطفاً صبر کنید. در حال انتقال به درگاه پرداخت ارز دیجیتال هستید.
        </p>
      </div>
    </div>
  );
}

export default function CryptoPaymentPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <CryptoPaymentContent />
    </Suspense>
  );
} 