"use client";
import React, { useState } from 'react';
import AlbumCover from '../components/AlbumCover';
import TopSupporters from './api/TopSupporters';
import PurchaseForm from '../components/PurchaseForm';
import PrizesPopup from '../components/PrizesPopup';
import { Supporter, ConvertedSupporter } from '../types/supporter';
import Header from '@/components/Header';

const Home: React.FC = () => {
  const [showPrizesPopup, setShowPrizesPopup] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasSeenPopup = localStorage.getItem('hasSeenPrizesPopup');
      return !hasSeenPopup;
    }
    return true;
  });

  const handleClosePopup = () => {
    setShowPrizesPopup(false);
    localStorage.setItem('hasSeenPrizesPopup', 'true');
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#4B0000] p-4 sm:p-6 pb-16">
        {showPrizesPopup && (
          <PrizesPopup onClose={handleClosePopup} />
        )}
        
        <div className="mb-0">
          <AlbumCover
            coverUrl="/album-cover.jpg"
            albumName="AK-47 (ALBUM)"
            artistName="ARTA x KOOROSH"
          />
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4" dir="rtl">
          <div className="w-full md:w-1/2 px-0 sm:px-1 order-3 md:order-1">
            <PurchaseForm />
          </div>

          <div className="w-full md:w-1/2 px-0 sm:px-1 order-1 md:order-2">
            <div className="h-full">
              <TopSupporters
                title="۱۰ خریدار برتر"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;