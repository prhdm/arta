"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Loader2, RefreshCw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailVerificationPopupProps {
  onClose: () => void;
  onVerify: (code: string) => Promise<boolean>;
  onResendCode: () => Promise<void>;
  email: string;
}

const EmailVerificationPopup: React.FC<EmailVerificationPopupProps> = ({ 
  onClose, 
  onVerify, 
  onResendCode,
  email 
}) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Delete') {
      e.preventDefault();
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleChange = (index: number, value: string) => {
    // تبدیل اعداد فارسی به انگلیسی
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let numericValue = value;
    
    // تبدیل اعداد فارسی به انگلیسی
    persianNumbers.forEach((persianNum, i) => {
      numericValue = numericValue.replace(new RegExp(persianNum, 'g'), englishNumbers[i]);
    });
    
    // حذف کاراکترهای غیر عددی
    numericValue = numericValue.replace(/\D/g, '');
    
    if (numericValue) {
      const newCode = [...code];
      newCode[index] = numericValue;
      setCode(newCode);
      setError(null);

      // حرکت به فیلد بعدی
      if (index < 5) {
        requestAnimationFrame(() => {
          inputRefs.current[index + 1]?.focus();
        });
      } else {
        const fullCode = [...newCode].join('');
        if (fullCode.length === 6) {
          handleSubmit(fullCode);
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length === 6) {
      setCode(pastedData.split(''));
      inputRefs.current[5]?.focus();
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await onVerify(codeToVerify);
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/payment';
        }, 2000);
      } else {
        setError('کد وارد شده اشتباه است. لطفاً دوباره تلاش کنید.');
      }
    } catch (error) {
      setError('کد وارد شده اشتباه است. لطفاً دوباره تلاش کنید.');
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    setIsResending(true);
    try {
      await onResendCode();
      setResendTimer(120);
      setError(null);
    } catch {
      setError('خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-md lg:max-w-2xl p-4 sm:p-6 md:p-8 rounded-2xl bg-white border border-white shadow-lg mx-4 sm:mx-6 md:mx-8"
      >
        <div className="flex justify-between items-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 font-iranyekan">تایید ایمیل</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
          </button>
        </div>

        <p className="text-xs sm:text-sm lg:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-12 font-iranyekan leading-relaxed">
          کد تایید به ایمیل <span className="text-gray-800 font-medium">{email}</span> ارسال شد
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 sm:space-y-8">
          <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4" dir="ltr">
            {code.map((digit, index) => (
              <div
                key={index}
                className="relative"
              >
                <input
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl rounded-2xl focus:outline-none transition-all duration-200 font-iranyekan text-gray-800 relative z-10 border-2 ${
                    digit ? 'bg-transparent border-black text-black' : 'bg-transparent border-black'
                  }`}
                  disabled={isLoading || success}
                  dir="ltr"
                  style={{ 
                    textAlign: 'center', 
                    direction: 'ltr'
                  }}
                  lang="fa"
                  pattern="[0-9]*"
                  autoComplete="off"
                />
              </div>
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs sm:text-sm text-center font-iranyekan bg-red-50 p-2 sm:p-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-3 sm:gap-4">
            <motion.button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isLoading || success}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-4 px-4 rounded-xl bg-black text-white hover:bg-gray-900 transition-all duration-200 shadow-lg font-iranyekan text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>در حال تایید...</span>
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>تایید شد</span>
                </div>
              ) : (
                'تایید کد'
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleResendCode}
              disabled={isResending || resendTimer > 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-600 hover:text-gray-800 transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 font-iranyekan"
            >
              {isResending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  <span>در حال ارسال...</span>
                </div>
              ) : resendTimer > 0 ? (
                `ارسال مجدد کد (${formatTime(resendTimer)})`
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>ارسال مجدد کد</span>
                </div>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EmailVerificationPopup;