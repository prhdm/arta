"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from 'lucide-react';
import EmailVerificationPopup from "./EmailVerificationPopup";
import { sendOTP, verifyOTP, createPayment } from '../lib/api';

interface FormData {
  name: string;
  email: string;
  instagram: string;
  amount: number;
  paymentMethod: 'zarinpal' | 'crypto' | 'paypal';
  currency: 'USD' | 'IRR';
}

const PurchaseForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const [finalAmountDisplay, setFinalAmountDisplay] = useState<string>('');
  const currency = watch('currency');

  useEffect(() => {
    if (currency === 'IRR') {
      setValue('paymentMethod', 'zarinpal');
      setValue('amount', 1000000);
      setFinalAmountDisplay((1000000 * 1.14).toLocaleString('fa-IR'));
    } else if (currency === 'USD') {
      setValue('paymentMethod', 'crypto');
      setValue('amount', 10);
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
    setError(null);

    try {
      const result = await sendOTP(data.email);
      if (!result.success) {
        throw new Error(result.error || 'خطا در ارسال کد تایید');
      }
      setShowVerification(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در پردازش درخواست');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = watch();
      const verifyResult = await verifyOTP({
        email: formData.email,
        otp: code,
        instagram_id: formData.instagram,
        name: formData.name
      });

      if (!verifyResult.success) {
        throw new Error(verifyResult.error || 'خطا در تایید کد');
      }

      const finalAmount = formData.currency === 'IRR' 
        ? Math.round(formData.amount * 1.14)
        : Math.round(formData.amount * 1.07);

      const paymentResult = await createPayment({
        ...formData,
        amount: finalAmount,
        code
      });

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'خطا در ایجاد پرداخت');
      }

      if (formData.paymentMethod === 'zarinpal') {
        window.location.href = `/payment/zarinpal?amount=${finalAmount}&orderCode=${paymentResult.orderCode}`;
      } else if (formData.paymentMethod === 'crypto') {
        window.location.href = `/payment/crypto?amount=${finalAmount}&orderCode=${paymentResult.orderCode}`;
      } else if (formData.paymentMethod === 'paypal') {
        window.location.href = `/payment/paypal?amount=${finalAmount}&orderCode=${paymentResult.orderCode}`;
      }
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در پردازش درخواست');
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
        
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-800 rounded-lg text-red-200">
            {error}
          </div>
        )}
        
        {!showVerification && (
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
                  دلار
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
                  <input
                    {...field}
                    type="number"
                    min={currency === 'USD' ? 10 : 1000000}
                    step={currency === 'USD' ? 1 : 100000}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(value);
                      updateFinalAmount(value);
                    }}
                    className="w-full px-4 py-4 text-base min-[16px] rounded-lg bg-neutral-800 text-neutral-100 border border-neutral-700 focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] focus:outline-none placeholder-neutral-500 font-iranyekan"
                  />
                )}
              />
              {errors.amount && <p className="mt-2 text-sm text-red-400">{errors.amount.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-400">مبلغ نهایی:</p>
              <p className="text-xl font-bold">{finalAmountDisplay} {currency === 'IRR' ? 'تومان' : 'دلار'}</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 text-base rounded-xl bg-[#8B0000] text-white hover:bg-[#6B0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>در حال پردازش...</span>
                </div>
              ) : (
                'ادامه'
              )}
            </button>
          </div>
        )}
      </form>

      {showVerification && (
        <EmailVerificationPopup
          onClose={() => setShowVerification(false)}
          onVerify={handleVerify}
          onResendCode={async () => {
            try {
              const result = await sendOTP(watch('email'));
              if (!result.success) {
                throw new Error(result.error || 'خطا در ارسال مجدد کد');
              }
            } catch (error) {
              console.error('Error resending code:', error);
            }
          }}
          email={watch('email')}
        />
      )}
    </>
  );
};

export default PurchaseForm;