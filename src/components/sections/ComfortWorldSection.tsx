import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Sun } from 'lucide-react';
import { ComfortWorldScene, ComfortWorldHandle } from '../3d/ComfortWorldScene';
import confetti from 'canvas-confetti';

export const ComfortWorldSection: React.FC = () => {
  const sceneRef = useRef<ComfortWorldHandle | null>(null);
  const [hugMessageActive, setHugMessageActive] = useState<boolean>(false);
  const [interactiveToast, setInteractiveToast] = useState<string | null>(null);

  const handleVirtualHugClick = () => {
    if (sceneRef.current) {
      sceneRef.current.triggerVirtualHug();
    }
    setHugMessageActive(true);

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#F8C8DC', '#EFA6B8', '#D8C9F5', '#FFB6C1', '#FFF8F0'],
    });

    setTimeout(() => {
      setHugMessageActive(false);
    }, 6500);
  };

  const handleObjectClick = (type: string) => {
    if (type === 'teddy') {
      handleVirtualHugClick();
    } else if (type === 'flower') {
      setInteractiveToast('🌸 The flower petals showered you with love!');
      setTimeout(() => setInteractiveToast(null), 2500);
    } else if (type === 'butterfly') {
      setInteractiveToast('🦋 A dreamy butterfly whispered: You are doing great today!');
      setTimeout(() => setInteractiveToast(null), 2500);
    }
  };

  return (
    <section
      id="world"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#FFF8F0] overflow-hidden"
    >
      {/* Dreamy background lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#F8C8DC]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#D8C9F5]/35 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm mb-4">
            <Sun size={15} className="text-[#EFA6B8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
              3D Interactive Haven
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#54354D] tracking-tight mb-4">
            Step Into Our Comfort World 🧸
          </h2>

          <p className="text-base sm:text-lg text-[#54354D]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Move your cursor to guide the glowing heart. Tap the teddy bear, the floating flowers, or the butterflies. Everything here responds to your touch.
          </p>
        </div>

        {/* 3D World Container */}
        <div className="relative glass-panel rounded-3xl p-3 sm:p-5 border-2 border-[#F8C8DC]/70 shadow-2xl overflow-hidden">
          {/* Virtual Hug Button overlay at bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm px-4">
            <button
              onClick={handleVirtualHugClick}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#EFA6B8] via-[#F8C8DC] to-[#EFA6B8] text-[#54354D] font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 border-2 border-white/80 group"
            >
              <Heart size={20} className="fill-[#54354D] text-[#54354D] group-hover:scale-125 transition-transform" />
              <span>Send Me A Virtual Hug 🤗</span>
            </button>
          </div>

          {/* Interactive Object Toast */}
          <AnimatePresence>
            {interactiveToast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-5 py-2.5 rounded-full bg-white/95 border border-[#F8C8DC] shadow-lg text-xs sm:text-sm font-semibold text-[#54354D] flex items-center gap-2"
              >
                <Sparkles size={16} className="text-[#EFA6B8]" />
                <span>{interactiveToast}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hug Activated Heartfelt Card */}
          <AnimatePresence>
            {hugMessageActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ type: 'spring', damping: 20 }}
                className="absolute inset-x-4 top-6 sm:top-12 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-30 max-w-md p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#EFA6B8] shadow-2xl text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#F8C8DC]/60 flex items-center justify-center text-3xl">
                  🤗
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#54354D] mb-2">
                  Teddy Embraces You!
                </h3>
                <p className="text-base sm:text-lg font-serif italic text-[#54354D] leading-relaxed mb-3">
                  "Imagine the biggest hug from me. I'm right there with you."
                </p>
                <p className="text-xs text-[#54354D]/75 font-sans">
                  Arms opened wide • Hearts floating upward • Pure warmth delivered.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WebGL Scene */}
          <ComfortWorldScene
            ref={sceneRef}
            onHugTriggered={handleVirtualHugClick}
            onObjectClicked={handleObjectClick}
          />
        </div>
      </div>
    </section>
  );
};
