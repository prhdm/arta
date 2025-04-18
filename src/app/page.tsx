"use client";
import React, { useState } from 'react';
import AlbumCover from '../components/AlbumCover';
import TopSupporters from '../components/TopSupporters';
import PurchaseForm from '../components/PurchaseForm';
import PrizesPopup from '../components/PrizesPopup';
import { Supporter, ConvertedSupporter } from '../types/supporter';
import Header from '@/components/Header';

const supporters: Supporter[] = [
  { name: 'Brian Etemad', instagram: 'brianetemad', amount: 13000, currency: 'USD' },
  { name: 'Alishmas', instagram: 'alishmasz', amount: 10000, currency: 'USD' },
  { name: 'SLP', instagram: 'slpabbas', amount: 3000, currency: 'USD' },
  { name: 'Aria Khosravi', instagram: 'ariaa_khosravi', amount: 3000000, currency: 'IRR' },
  { name: 'Bashir', instagram: 'bashir.official', amount: 2000000, currency: 'IRR' },
  { name: 'Ehsan Mombeini', instagram: 'ehsanmobeiniii', amount: 50, currency: 'USD' },
  { name: 'Erfan Eslahi', instagram: 'erfitunes', amount: 2000000, currency: 'IRR' },
  { name: 'Putak', instagram: 'braveputak', amount: 2500000, currency: 'IRR' },
  { name: 'Catchy Beatz', instagram: 'tiktaaksr', amount: 300, currency: 'USD' },
  { name: 'Behzad Leito', instagram: 'behzadleito', amount: 10, currency: 'USD' },
];


const convertedSupporters: ConvertedSupporter[] = supporters.map(supporter => {
  if (supporter.currency === 'IRR') {
    return {
      ...supporter,
      amount: supporter.amount / 100000,
      currency: 'USD' as const
    };
  }
  return {
    ...supporter,
    currency: 'USD' as const
  };
});

const topSupporters = convertedSupporters
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 10);

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
            <TopSupporters
              supporters={topSupporters}
              title="۱۰ خریدار برتر"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;