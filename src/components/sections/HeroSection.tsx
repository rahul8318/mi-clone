import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onOpenSurprise: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSurprise }) => {
  const [teddyMessage, setTeddyMessage] = useState<string | null>(null);

  const handleTeddyClick = () => {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#F8C8DC', '#EFA6B8', '#D8C9F5'],
    });

    const messages = [
      'Teddy says: You are so deeply loved! 🧸💕',
      'Sending you a big warm cuddle! 🌸',
      'Rest your sweet head, you deserve all the care! 💤',
      'Remember you are my favorite person in the entire universe! ✨',
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setTeddyMessage(randomMsg);

    setTimeout(() => {
      setTeddyMessage(null);
    }, 3500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#FFF8F0]"
    >
      {/* Dreamy ambient light blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#F8C8DC]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#D8C9F5]/35 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#EFA6B8]/15 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#EFA6B8] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
                Safe Sanctuary • Just For You 🌸
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#54354D] leading-[1.15] tracking-tight">
              Hey, my favorite human...{' '}
              <span className="inline-block relative">
                <span className="text-[#EFA6B8] animate-pulse">❤️</span>
                <span className="absolute -inset-1 rounded-full bg-[#EFA6B8]/20 blur-md pointer-events-none" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#54354D]/85 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              I know these days aren't always easy, so I made a little corner of the internet just for you. A place where you can relax, smile, and remember how incredibly special you are.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenSurprise}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#EFA6B8] via-[#F8C8DC] to-[#EFA6B8] text-[#54354D] font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 border border-[#FFF8F0]/70 group"
              >
                <span>Open Your Little Surprise</span>
                <span className="group-hover:translate-x-1 transition-transform">💗</span>
              </button>

              <a
                href="#world"
                className="w-full sm:w-auto px-6 py-4 rounded-full glass-panel text-[#54354D] font-semibold text-sm sm:text-base hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                <span>Visit Comfort World</span>
                <ChevronDown size={16} className="text-[#EFA6B8]" />
              </a>
            </div>

            {/* Warm micro note */}
            <p className="text-xs text-[#54354D]/60 flex items-center justify-center lg:justify-start gap-1 pt-1">
              <Sparkles size={13} className="text-[#EFA6B8]" />
              <span>Tap the 3D teddy on the right to tickle him!</span>
            </p>
          </motion.div>

          {/* Right Column: 3D Teddy Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Soft decorative glow backplate */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#F8C8DC]/40 via-[#D8C9F5]/30 to-[#FFF8F0]/80 blur-2xl transform scale-95 pointer-events-none" />

            <div className="w-full relative z-10 glass-panel rounded-3xl p-3 border-2 border-[#F8C8DC]/60 shadow-xl overflow-hidden">
              <HeroScene onTeddyClick={handleTeddyClick} />

              {/* Heartbeat subtle indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#F8C8DC] text-[11px] font-semibold text-[#54354D] shadow-sm flex items-center gap-1.5">
                <Heart size={12} className="text-[#FF4D79] fill-[#FF4D79] animate-ping" />
                <span>Teddy is holding a beating heart for you</span>
              </div>

              {/* Toast when clicking teddy */}
              {teddyMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-4 left-4 right-4 p-3 rounded-2xl bg-white/95 border-2 border-[#EFA6B8] shadow-lg text-center text-xs sm:text-sm font-semibold text-[#54354D] z-20"
                >
                  {teddyMessage}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
