import React, { useState, useRef } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { GiftBoxScene, GiftBoxHandle } from '../3d/GiftBoxScene';
import { SurpriseModal } from '../modals/SurpriseModal';

export const SurpriseSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const giftBoxHandleRef = useRef<GiftBoxHandle | null>(null);

  const handleBoxOpen = () => {
    setIsModalOpen(true);
  };

  const handleManualOpenClick = () => {
    if (giftBoxHandleRef.current) {
      giftBoxHandleRef.current.open();
    }
  };

  const handleReopen = () => {
    if (giftBoxHandleRef.current) {
      giftBoxHandleRef.current.reset();
      setTimeout(() => {
        giftBoxHandleRef.current?.open();
      }, 300);
    }
  };

  return (
    <section
      id="surprise"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#FFF8F0] overflow-hidden"
    >
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F8C8DC]/30 via-[#EFA6B8]/20 to-[#D8C9F5]/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm mb-4">
          <Gift size={15} className="text-[#EFA6B8]" />
          <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
            A Special Digital Present
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#54354D] tracking-tight mb-4">
          There's something I want you to remember... 🎁
        </h2>

        <p className="text-base sm:text-lg text-[#54354D]/80 max-w-xl mx-auto font-sans mb-8">
          A handcrafted gift box wrapped with satin ribbons and bursting with warm love. Click the 3D box below to reveal what’s waiting inside.
        </p>

        {/* 3D Gift Box Stage */}
        <div className="relative glass-panel rounded-3xl p-4 sm:p-6 border-2 border-[#F8C8DC]/80 shadow-2xl overflow-hidden max-w-2xl mx-auto mb-8">
          {/* Subtle click guide */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#F8C8DC] text-xs font-semibold text-[#54354D] shadow-sm flex items-center gap-1.5 pointer-events-none">
            <Sparkles size={13} className="text-[#EFA6B8]" />
            <span>Click directly on the box to untie the ribbon!</span>
          </div>

          <GiftBoxScene ref={giftBoxHandleRef} onBoxOpen={handleBoxOpen} />
        </div>

        {/* Fallback button if she prefers button click */}
        <button
          onClick={handleManualOpenClick}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#EFA6B8] via-[#F8C8DC] to-[#EFA6B8] text-[#54354D] font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 border border-white"
        >
          <Heart size={18} className="fill-[#54354D] text-[#54354D]" />
          <span>Tap Here To Open Present</span>
        </button>
      </div>

      {/* Full-Screen Love Message Modal */}
      <SurpriseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReopen={handleReopen}
      />
    </section>
  );
};
