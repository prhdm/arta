import React from 'react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#4B0000] p-4 sm:p-6 pb-16">
        <div className="w-full max-w-[95vw] mx-auto bg-gradient-to-b from-[#6B0000] to-[#8B0000] text-white p-6 sm:p-8 px-4 sm:px-6 rounded-3xl border border-white/10 font-iranyekan shadow-lg text-center">
          <h1 className="text-3xl font-bold text-white mb-6">
            به زودی برمی‌گردیم
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg text-white/90">
              در حال ارتقای سیستم برای ارائه خدمات بهتر به شما هستیم.
            </p>
            <p className="text-base text-white/70">
              به زودی با قابلیت‌های جدید و بهبود یافته در خدمت شما خواهیم بود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 