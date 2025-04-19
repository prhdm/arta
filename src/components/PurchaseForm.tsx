"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  instagram: string;
  amount: number;
  paymentMethod: 'zarinpal' | 'crypto';
  currency: 'USD' | 'IRR';
}

const persianToLatinDigits = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)));
};

const latinToPersianDigits = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (d) => persianDigits[parseInt(d, 10)]);
};

const PurchaseForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      instagram: '',
      amount: 420000,
      paymentMethod: 'zarinpal',
      currency: 'IRR',
    },
  });

  const [amountDisplay, setAmountDisplay] = useState<string>('');
  const [finalAmountDisplay, setFinalAmountDisplay] = useState<string>('');
  const currency = watch('currency');

  useEffect(() => {
    if (currency === 'IRR') {
      setValue('paymentMethod', 'zarinpal');
      setValue('amount', 1000000);
      setAmountDisplay((1000000).toLocaleString('fa-IR'));
      setFinalAmountDisplay((1000000 * 1.14).toLocaleString('fa-IR'));
    } else if (currency === 'USD') {
      setValue('paymentMethod', 'crypto');
      setValue('amount', 10);
      setAmountDisplay((10).toLocaleString('fa-IR'));
      setFinalAmountDisplay((10 * 1.07).toLocaleString('fa-IR'));
    }
  }, [currency, setValue]);

  const updateFinalAmount = (amount: number) => {
    if (currency === 'IRR') {
      setFinalAmountDisplay((amount * 1.14).toLocaleString('fa-IR'));
    } else if (currency === 'USD') {
      setFinalAmountDisplay((amount * 1.07).toLocaleString('fa-IR'));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const formData = watch();
      const finalAmount = formData.currency === 'IRR' 
        ? Math.round(formData.amount * 1.14)
        : Math.round(formData.amount * 1.07);

      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: formData.currency,
          gateway: formData.currency === 'IRR' ? 'zarinpal' : formData.paymentMethod,
          name: formData.name,
          email: formData.email,
          instagram: formData.instagram,
        }),
      });

      const result = await paymentResponse.json();

      if (paymentResponse.ok) {
        if (formData.currency === 'IRR' || formData.paymentMethod === 'zarinpal') {
          window.location.href = `/payment/zarinpal?amount=${finalAmount}&orderCode=${result.orderCode}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&instagram=${encodeURIComponent(formData.instagram)}`;
        } else if (formData.paymentMethod === 'crypto') {
          window.location.href = `/payment/crypto?amount=${finalAmount}&orderCode=${result.orderCode}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&instagram=${encodeURIComponent(formData.instagram)}`;
        }
      } else {
        throw new Error(result.error || 'خطا در پردازش پرداخت');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطا در پردازش درخواست. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);

    try {
      const formData = watch();
      const finalAmount = formData.currency === 'IRR' 
        ? Math.round(formData.amount * 1.14)
        : Math.round(formData.amount * 1.07);

      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: finalAmount,
          code,
        }),
      });

      const result = await paymentResponse.json();

      if (paymentResponse.ok) {
        if (formData.paymentMethod === 'zarinpal') {
          window.location.href = `/payment/zarinpal?amount=${finalAmount}&orderCode=${result.orderCode}`;
        } else if (formData.paymentMethod === 'crypto') {
          window.location.href = `/payment/crypto?amount=${finalAmount}&orderCode=${result.orderCode}`;
        }
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="w-full max-w-[95vw] mx-auto bg-neutral-900 text-neutral-100 p-6 sm:p-10 px-4 sm:px-6 rounded-3xl border border-neutral-800 transition-all duration-300 font-iranyekan shadow-lg"
      >
        <h2 className="mb-10 text-2xl md:text-2xl text-center">فرم خرید آلبوم</h2>
        
        <div className="space-y-8">
          <div>
            <label className="block text-base mb-3">اسم به انگلیسی (برای نمایش در سایت)</label>
            <input
              {...register('name', {
                required: 'وارد کردن نام به انگلیسی الزامی است',
                minLength: { value: 2, message: 'نام باید حداقل ۲ کاراکتر باشد' },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'فقط حروف انگلیسی وارد کنید',
                },
              })}
              placeholder="Your Name or Nickname"
              className="w-full px-4 py-4 text-base min-[16px] rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] focus:outline-none placeholder-neutral-500 font-iranyekan"
            />
            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-base mb-3">ایمیل</label>
            <input
              {...register('email', {
                required: 'ایمیل الزامی است',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'ایمیل معتبر نیست',
                },
              })}
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-4 text-base min-[16px] rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] focus:outline-none placeholder-neutral-500 font-iranyekan"
            />
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-base mb-3">آیدی اینستاگرام</label>
            <input
              {...register('instagram', {
                required: 'آیدی اینستاگرام الزامی است',
                pattern: {
                  value: /^[A-Za-z0-9._]+$/,
                  message: 'لطفاً آیدی را بدون @ وارد کنید',
                },
                validate: (value) => 
                  value.startsWith('@') ? 'لطفاً آیدی را بدون @ وارد کنید' : true,
              })}
              placeholder="Your Instagram ID"
              className="w-full px-4 py-4 text-base min-[16px] rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] focus:outline-none placeholder-neutral-500 font-iranyekan"
            />
            {errors.instagram && <p className="mt-2 text-sm text-red-400">{errors.instagram.message}</p>}
          </div>

          <div>
            <label className="block text-base mb-3">واحد پول</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setValue('currency', 'IRR')}
                className={`w-full py-4 px-6 text-base rounded-xl border transition ${
                  currency === 'IRR'
                    ? 'bg-[#8B0000] border-[#8B0000] text-white'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700'
                }`}
              >
                تومان
              </button>
              <button
                type="button"
                onClick={() => setValue('currency', 'USD')}
                className={`w-full py-4 px-6 text-base rounded-xl border transition ${
                  currency === 'USD'
                    ? 'bg-[#8B0000] border-[#8B0000] text-white'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700'
                }`}
              >
                کریپتو
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base mb-3">
              مبلغ ({currency === 'IRR' ? 'تومان' : 'دلار'})
            </label>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: 'مقدار الزامی است',
                validate: (value) => {
                  if (currency === 'USD') {
                    return value >= 10 || 'حداقل مبلغ ۱۰ دلار است';
                  } else if (currency === 'IRR') {
                    return value >= 1000000 || 'حداقل مبلغ ۱,۰۰۰,۰۰۰ تومان است';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    value={amountDisplay}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[,،٬]/g, '');
                      const latinValue = persianToLatinDigits(rawValue);
                      const numericValue = Number(latinValue);
                      
                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                        try {
                          const persianValue = numericValue.toLocaleString('fa-IR');
                          setAmountDisplay(persianValue);
                          updateFinalAmount(numericValue);
                        } catch {
                          const withCommas = latinValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                          const persianWithCommas = latinToPersianDigits(withCommas);
                          setAmountDisplay(persianWithCommas);
                          updateFinalAmount(numericValue);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      const rawValue = e.target.value.replace(/[,،٬]/g, '');
                      const latinValue = persianToLatinDigits(rawValue);
                      
                      if (latinValue === '') {
                        if (currency === 'IRR') {
                          setAmountDisplay((1000000).toLocaleString('fa-IR'));
                          setFinalAmountDisplay((1000000 * 1.14).toLocaleString('fa-IR'));
                          field.onChange(1000000);
                        } else if (currency === 'USD') {
                          setAmountDisplay((10).toLocaleString('fa-IR'));
                          setFinalAmountDisplay((10 * 1.07).toLocaleString('fa-IR'));
                          field.onChange(10);
                        }
                      } else {
                        const numericValue = Number(latinValue);
                        if (currency === 'IRR' && numericValue < 1000000) {
                          setAmountDisplay((1000000).toLocaleString('fa-IR'));
                          setFinalAmountDisplay((1000000 * 1.14).toLocaleString('fa-IR'));
                          field.onChange(1000000);
                        } else if (currency === 'USD' && numericValue < 10) {
                          setAmountDisplay((10).toLocaleString('fa-IR'));
                          setFinalAmountDisplay((10 * 1.07).toLocaleString('fa-IR'));
                          field.onChange(10);
                        } else {
                          field.onChange(numericValue);
                          try {
                            const persianValue = numericValue.toLocaleString('fa-IR');
                            setAmountDisplay(persianValue);
                            updateFinalAmount(numericValue);
                          } catch {
                            const withCommas = latinValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            const persianWithCommas = latinToPersianDigits(withCommas);
                            setAmountDisplay(persianWithCommas);
                            updateFinalAmount(numericValue);
                          }
                        }
                      }
                    }}
                    placeholder={currency === 'IRR' ? "حداقل ۱,۰۰۰,۰۰۰ تومان" : "حداقل ۱۰ دلار"}
                    className="w-full px-4 py-4 text-base min-[16px] rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] focus:outline-none placeholder-neutral-500 font-iranyekan"
                  />
                  <div className="mt-3 text-base text-neutral-400">
                    مبلغ نهایی با احتساب مالیات: {finalAmountDisplay} {currency === 'IRR' ? 'تومان' : 'دلار'}
                  </div>
                  {errors.amount && <p className="mt-2 text-sm text-red-400">{errors.amount.message}</p>}
                </>
              )}
            />
          </div>

          {currency === 'USD' && (
            <div>
              <label className="block text-base mb-3">روش پرداخت</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'crypto')}
                    className={`w-full h-[100px] bg-white p-3 rounded-xl transition flex items-center justify-center ${
                      watch('paymentMethod') === 'crypto'
                        ? 'ring-2 ring-red-300'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src="/images/payments/crypto.jpg"
                      alt="Crypto"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </button>
                  <span className="mt-2 text-base text-neutral-100">Crypto</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 text-base bg-[#8B0000] text-white rounded-xl hover:bg-[#8B0000] transition-colors duration-300 font-iranyekan"
          >
            {isLoading ? (
              <div className="flex items-center justify-center font-iranyekan">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                در حال پردازش...
              </div>
            ) : (
              'ادامه'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default PurchaseForm;