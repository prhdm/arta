"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface ConvertedSupporter {
  instagram: string;
  name: string;
  amount: number;
}

interface TopSupportersProps {
  supporters: ConvertedSupporter[];
  title: string;
}

const TopSupporters: React.FC<TopSupportersProps> = ({ supporters, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-2xl p-4 sm:p-6 shadow-lg"
    >
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 font-iranyekan">
        {title}
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {supporters.map((supporter, index) => (
          <motion.div
            key={supporter.instagram}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {index === 0 && <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />}
                {index === 1 && <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
                {index === 2 && <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />}
                {index > 2 && <span className="text-sm sm:text-base font-bold text-gray-600">{index + 1}</span>}
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-800 font-iranyekan">
                  {supporter.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 font-iranyekan">
                  @{supporter.instagram}
                </p>
              </div>
            </div>
            <div className="text-sm sm:text-base font-bold text-gray-800 font-iranyekan">
              {supporter.amount.toLocaleString()} تومان
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopSupporters;