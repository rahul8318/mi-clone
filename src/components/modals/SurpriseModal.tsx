import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Droplets, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReopen: () => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose, onReopen }) => {
  if (!isOpen) return null;

  const handleCelebrate = () => {
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F8C8DC', '#EFA6B8', '#D8C9F5', '#FFF8F0'],
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1E29]/75 backdrop-blur-lg">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#F8C8DC]/30 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#EFA6B8] overflow-hidden z-10 max-h-[92vh] overflow-y-auto"
        >
          {/* Subtle glow circle behind modal */}
          <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#EFA6B8]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-[#D8C9F5]/40 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#54354D]/10 hover:bg-[#54354D]/20 text-[#54354D] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <X size={20} />
          </button>

          <div className="text-center relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#EFA6B8] to-[#F8C8DC] shadow-md mb-4 text-3xl">
              🎁
            </div>

            <span className="text-xs font-semibold tracking-widest uppercase text-[#EFA6B8] block mb-1">
              Your Unwrapped Surprise
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#54354D] mb-6">
              A Little Promise To You
            </h2>

            {/* The Heartfelt Love Message */}
            <div className="bg-white/85 p-6 sm:p-8 rounded-3xl border border-[#F8C8DC] shadow-inner mb-6 space-y-4 text-left">
              <p className="text-base sm:text-lg text-[#54354D] leading-relaxed font-serif italic text-center text-[#54354D]">
                "If I could make one wish today, it would be that you feel even half the happiness you bring into my life."
              </p>

              <div className="w-12 h-0.5 bg-[#EFA6B8]/40 mx-auto my-3" />

              <p className="text-sm sm:text-base text-[#54354D]/90 leading-relaxed font-sans">
                Take care of yourself, my love. Drink some water, get comfortable, eat something you enjoy, and remember that you are loved more than words can explain.
              </p>

              <p className="text-sm sm:text-base text-[#54354D] font-medium leading-relaxed font-sans flex items-center gap-1.5">
                And if today feels difficult, remember: you don't have to go through it alone. ❤️
              </p>
            </div>

            {/* Quick 3 Reminders */}
            <div className="grid grid-cols-3 gap-2.5 mb-7">
              <div className="p-3 rounded-2xl bg-white/70 border border-[#F8C8DC] flex flex-col items-center text-center">
                <Droplets size={20} className="text-[#89CFF0] mb-1" />
                <span className="text-xs font-bold text-[#54354D]">Drink Water</span>
                <span className="text-[10px] text-[#54354D]/70">Hydrate your glow</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 border border-[#F8C8DC] flex flex-col items-center text-center">
                <Utensils size={20} className="text-[#EFA6B8] mb-1" />
                <span className="text-xs font-bold text-[#54354D]">Eat Good Food</span>
                <span className="text-[10px] text-[#54354D]/70">Treat your cravings</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 border border-[#F8C8DC] flex flex-col items-center text-center">
                <Heart size={20} className="text-[#FF4D79] fill-[#FF4D79] mb-1" />
                <span className="text-xs font-bold text-[#54354D]">Deep Rest</span>
                <span className="text-[10px] text-[#54354D]/70">Let me pamper you</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  handleCelebrate();
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EFA6B8] to-[#F8C8DC] text-[#54354D] font-bold text-sm shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Heart size={18} className="fill-[#54354D] text-[#54354D]" />
                I Feel So Loved 🥺💗
              </button>

              <button
                onClick={() => {
                  onReopen();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/80 border border-[#F8C8DC] text-[#54354D] font-semibold text-sm hover:bg-white transition-colors"
              >
                Reopen Box 🎁
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
