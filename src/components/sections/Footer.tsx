import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E1120] text-[#FFF8F0]/80 py-12 px-4 border-t border-[#F8C8DC]/15 text-center select-none relative z-10">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center gap-2 p-2 rounded-full bg-white/5 border border-white/10 px-4">
          <Heart size={14} className="text-[#FF4D79] fill-[#FF4D79] animate-pulse" />
          <span className="text-xs tracking-wider uppercase font-semibold text-[#F8C8DC]">
            Forever Your Safe Haven
          </span>
        </div>

        <p className="text-base sm:text-lg font-serif italic text-white/90 max-w-lg mx-auto">
          "Made with infinite love, warm cuddles, and endless appreciation for my favorite human in the whole world."
        </p>

        <p className="text-xs text-[#FFF8F0]/50 font-sans">
          Take a deep breath, drink some water, and remember you are adored every single second. ❤️
        </p>
      </div>
    </footer>
  );
};
