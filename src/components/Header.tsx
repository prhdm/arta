"use client";
import React, { useState } from 'react';
import { FaGift } from 'react-icons/fa';
import PrizesPopup from './PrizesPopup';

const Header: React.FC = () => {
  const [showPrizes, setShowPrizes] = useState(false);

  return (
    <>
      <header className="z-50 bg-[#4B0000]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center">
          <button
            onClick={() => setShowPrizes(true)}
            className="text-white/90 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 px-5 py-3 bg-gradient-to-r from-[#6B0000]/90 to-[#8B0000]/90 hover:from-[#8B0000]/90 hover:to-[#A00000]/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl font-iranyekan transform hover:scale-105 active:scale-95 border border-white/10 hover:border-white/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 group-hover:from-white/0 group-hover:via-white/10 group-hover:to-white/0 transition-all duration-500"></div>
            <FaGift className="text-white text-2xl transform group-hover:rotate-12 transition-transform duration-500 z-10" />
            <span className="text-white text-lg font-medium tracking-wide z-10">جوایز</span>
          </button>
        </div>
      </header>

      {showPrizes && <PrizesPopup onClose={() => setShowPrizes(false)} />}
    </>
  );
};

export default Header; 