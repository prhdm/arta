"use client";
import React from "react";
import Image from "next/image";
import { ConvertedSupporter } from "../types/supporter";

interface TopSupportersProps {
  title?: string;
  supporters: ConvertedSupporter[];
}

const TopSupporters: React.FC<TopSupportersProps> = ({ supporters, title }) => {
  const sortedSupporters = supporters.slice().sort((a, b) => b.amount - a.amount);

  return (
    <div
      dir="rtl"
      className="w-full max-w-[95vw] mx-auto bg-neutral-900 text-neutral-100 p-6 sm:p-10 px-4 sm:px-6 rounded-3xl border border-neutral-800 transition-all duration-300 font-iranyekan shadow-lg"
    >
      {title && ( 
        <h2 className="mb-8 text-2xl md:text-2xl text-center">
          {title}
        </h2>
      )}
      <ul className="space-y-4 sm:space-y-6">
        {sortedSupporters.map((supporter, index) => (
          <li
            key={index}
            dir="ltr"
            className={`flex items-center justify-between p-4 sm:p-4 rounded-xl border transition duration-200 ${
              index === 0
                ? 'bg-gradient-to-r from-[#8B0000] to-[#8B0000] border-[#8B0000]'
                : index === 1
                ? 'bg-gradient-to-r from-[#8B0000] to-[#8B0000] border-[#8B0000]'
                : index === 2
                ? 'bg-gradient-to-r from-[#8B0000] to-[#8B0000] border-[#8B0000]'
                : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            <div className="flex items-center gap-4 sm:gap-4">
              {index < 3 ? (
                <Image 
                  src={`/icons/medal-${index + 1}.png`} 
                  alt={`Medal ${index + 1}`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              ) : (
                <span className="text-lg sm:text-base font-bold text-neutral-100 font-sf">{index + 1}</span>
              )}
              <div className="flex flex-col text-left">
                <span className={`text-lg sm:text-base font-bold ${
                  index < 3 ? 'text-white' : 'text-neutral-100'
                } font-sf`}>{supporter.name}</span>
                <a
                  href={`https://instagram.com/${supporter.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm sm:text-xs ${
                    index < 3 ? 'text-white/80 hover:text-white' : 'text-neutral-400 hover:text-neutral-100'
                  } transition-colors font-sf`}
                  dir="ltr"
                >
                  @{supporter.instagram}
                </a>
              </div>
            </div>
            <div className="text-left">
              <p className={`text-xl sm:text-lg font-bold ${
                index < 3 ? 'text-white' : 'text-neutral-100'
              } font-sf`}>${Math.round(supporter.amount)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSupporters;