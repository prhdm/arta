"use client";
import React from 'react';
import { X } from 'lucide-react';
import { FaTrophy, FaTicketAlt, FaHotel, FaGift, FaVideo } from 'react-icons/fa';
import { GiTicket, GiNecklaceDisplay } from 'react-icons/gi';

interface PrizesPopupProps {
  onClose: () => void;
}

const PrizesPopup: React.FC<PrizesPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 pt-16 sm:pt-4">
      <div className="bg-gradient-to-b from-[#4B0000] via-[#3A0000] to-[#2B0000] rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden font-iranyekan relative shadow-2xl border border-white/10">
        <div className="sticky top-0 bg-gradient-to-b from-[#4B0000] to-[#3A0000] backdrop-blur-md z-10 flex justify-between items-center border-b border-white/10 p-4">
          <h2 className="text-2xl text-white flex items-center gap-3">
            <FaTrophy className="text-yellow-400 text-2xl drop-shadow-lg" />
            جوایز ویژه پیش‌فروش آلبوم
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-4rem)] pt-2">
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-[#3A0000]/70 to-[#2A0000]/70 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              <h3 className="text-lg text-white mb-4 flex items-center gap-3 relative">
                <FaTrophy className="text-yellow-400 text-xl drop-shadow-lg" />
                ۱. جوایز ویژه خریداران برتر
              </h3>
              <div className="space-y-4 relative">
                <div>
                  <h4 className="text-white/90 text-base mb-2">نفرات اول و دوم:</h4>
                  <ul className="text-white/80 text-base space-y-2">
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaTicketAlt className="text-blue-400 text-xl drop-shadow-lg" />
                      بلیط رفت و برگشت
                    </li>
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaHotel className="text-green-400 text-xl drop-shadow-lg" />
                      اقامت
                    </li>
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <GiTicket className="text-purple-400 text-xl drop-shadow-lg" />
                      بلیط کنسرت آرتا و کوروش
                    </li>
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <GiNecklaceDisplay className="text-pink-400 text-xl drop-shadow-lg" />
                      گردنبند اختصاصی AK47
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/90 text-base mb-2">نفرات سوم تا پنجم:</h4>
                  <ul className="text-white/80 text-base">
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <GiNecklaceDisplay className="text-pink-400 text-xl drop-shadow-lg" />
                      گردنبند اختصاصی AK47
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/90 text-base mb-2">نفرات ششم تا دهم:</h4>
                  <ul className="text-white/80 text-base space-y-2">
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaGift className="text-orange-400 text-xl drop-shadow-lg" />
                      یادگاری از آلبوم
                    </li>
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaVideo className="text-red-400 text-xl drop-shadow-lg" />
                      ویدیوکال اختصاصی با آرتیست‌ها
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#3A0000]/70 to-[#2A0000]/70 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              <h3 className="text-lg text-white mb-4 flex items-center gap-3 relative">
                <FaTrophy className="text-yellow-400 text-xl drop-shadow-lg" />
                ۲. قرعه‌کشی بین تمام خریداران
              </h3>
              <div className="space-y-4 relative">
                <div>
                  <h4 className="text-white/90 text-base mb-2">۱ نفر:</h4>
                  <ul className="text-white/80 text-base space-y-2">
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaTicketAlt className="text-blue-400 text-xl drop-shadow-lg" />
                      بلیط رفت و برگشت
                    </li>
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaHotel className="text-green-400 text-xl drop-shadow-lg" />
                      اقامت
                    </li>
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <GiTicket className="text-purple-400 text-xl drop-shadow-lg" />
                      بلیط کنسرت آرتا و کوروش
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/90 text-base mb-2">۱ نفر:</h4>
                  <ul className="text-white/80 text-base">
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <GiNecklaceDisplay className="text-pink-400 text-xl drop-shadow-lg" />
                      گردنبند اختصاصی AK47
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/90 text-base mb-2">۵ نفر:</h4>
                  <ul className="text-white/80 text-base">
                    <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                      <FaVideo className="text-red-400 text-xl drop-shadow-lg" />
                      ویدیوکال اختصاصی با آرتیست‌ها
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesPopup; 