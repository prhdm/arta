"use client";
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaTicketAlt, FaHotel, FaGift, FaVideo } from 'react-icons/fa';
import { GiTicket, GiNecklaceDisplay } from 'react-icons/gi';

interface PrizesPopupProps {
  onClose: () => void;
}

const PrizesPopup: React.FC<PrizesPopupProps> = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4 pt-16 sm:pt-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#4B0000] rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden font-iranyekan tracking-tight relative"
        >
          <div className="sticky top-0 bg-[#4B0000] backdrop-blur-md z-10 flex justify-between items-center border-b border-white/10 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaTrophy className="text-yellow-400 animate-pulse" />
              جوایز ویژه پیش‌فروش آلبوم
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-4rem)] pt-2">
            <div className="p-4 space-y-4">
              <div className="bg-[#3A0000]/50 backdrop-blur-sm p-3 rounded-2xl border border-white/5">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <FaTrophy className="text-yellow-400" />
                  ۱. جوایز ویژه خریداران برتر
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white/90 text-sm mb-1">نفرات اول و دوم:</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaTicketAlt className="text-blue-400 text-lg" />
                        بلیط رفت و برگشت
                      </li>
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaHotel className="text-green-400 text-lg" />
                        اقامت
                      </li>
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <GiTicket className="text-purple-400 text-lg" />
                        بلیط کنسرت آرتا و کوروش
                      </li>
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <GiNecklaceDisplay className="text-pink-400 text-lg" />
                        گردنبند اختصاصی AK47
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 text-sm mb-1">نفرات سوم تا پنجم:</h4>
                    <ul className="text-white/80 text-sm">
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <GiNecklaceDisplay className="text-pink-400 text-lg" />
                        گردنبند اختصاصی AK47
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 text-sm mb-1">نفرات ششم تا دهم:</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaGift className="text-orange-400 text-lg" />
                        یادگاری از آلبوم
                      </li>
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaVideo className="text-red-400 text-lg" />
                        ویدیوکال اختصاصی با آرتیست‌ها
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#3A0000]/50 backdrop-blur-sm p-3 rounded-2xl border border-white/5">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <FaTrophy className="text-yellow-400" />
                  ۲. قرعه‌کشی بین تمام خریداران
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white/90 text-sm mb-1">۱ نفر:</h4>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaTicketAlt className="text-blue-400 text-lg" />
                        بلیط رفت و برگشت
                      </li>
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaHotel className="text-green-400 text-lg" />
                        اقامت
                      </li>
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <GiTicket className="text-purple-400 text-lg" />
                        بلیط کنسرت آرتا و کوروش
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 text-sm mb-1">۱ نفر:</h4>
                    <ul className="text-white/80 text-sm">
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <GiNecklaceDisplay className="text-pink-400 text-lg" />
                        گردنبند اختصاصی AK47
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 text-sm mb-1">۵ نفر:</h4>
                    <ul className="text-white/80 text-sm">
                      <li className="flex items-center gap-2 bg-white/5 p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <FaVideo className="text-red-400 text-lg" />
                        ویدیوکال اختصاصی با آرتیست‌ها
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PrizesPopup; 