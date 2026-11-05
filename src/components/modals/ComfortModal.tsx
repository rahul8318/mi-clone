import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export type ComfortOptionType = 'hug' | 'chocolate' | 'appreciation' | 'music' | 'letter' | 'rest' | null;

interface ComfortModalProps {
  selectedOption: ComfortOptionType;
  onClose: () => void;
  onTriggerAudio?: () => void;
}

export const ComfortModal: React.FC<ComfortModalProps> = ({
  selectedOption,
  onClose,
  onTriggerAudio,
}) => {
  // Chocolate interaction state: eaten pieces
  const [eatenChocolates, setEatenChocolates] = useState<number[]>([]);
  // Hug count
  const [extraHugs, setExtraHugs] = useState<number>(1);
  const [hugGiven, setHugGiven] = useState<boolean>(false);

  if (!selectedOption) return null;

  const handleEatChocolate = (index: number) => {
    if (!eatenChocolates.includes(index)) {
      setEatenChocolates([...eatenChocolates, index]);
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#D2691E', '#8B4513', '#F8C8DC'],
      });
    }
  };

  const handleSendExtraHug = () => {
    setExtraHugs((prev) => prev + 1);
    setHugGiven(true);
    confetti({
      particleCount: 35,
      spread: 60,
      colors: ['#F8C8DC', '#EFA6B8', '#FFF8F0'],
    });
    setTimeout(() => setHugGiven(false), 2000);
  };

  const chocolatesList = [
    { name: 'Warm Caramel', icon: '🍮', note: 'Sweet & buttery to melt away stress' },
    { name: 'Dark Truffle', icon: '🍫', note: 'Rich cocoa rich in natural comfort' },
    { name: 'Strawberry Cream', icon: '🍓', note: 'Soft, fruity hug in every bite' },
    { name: 'Roasted Hazelnut', icon: '🌰', note: 'Cozy crunch for calm vibes' },
    { name: 'Sea Salt Blossom', icon: '🌸', note: 'A pinch of bliss just for you' },
    { name: 'Pure Love Ganache', icon: '💖', note: 'Specially made by me with all my love' },
  ];

  const appreciationPoints = [
    "Even on the days you don't feel your best, you're still the most beautiful person in my world.",
    "Your laugh is my favorite sound, but even your quietest sighs matter deeply to me.",
    "You have a golden heart that radiates kindness everywhere, and today it's your turn to be spoiled.",
    "I admire your courage, your gentle soul, and the way you make every room warmer.",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2A1E29]/60 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#FFF8F0] to-[#FDEDF3] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#F8C8DC] overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#54354D]/10 hover:bg-[#54354D]/20 text-[#54354D] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            <X size={20} />
          </button>

          {/* Dynamic Content based on Option */}
          {selectedOption === 'hug' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8C8DC]/50 flex items-center justify-center text-3xl animate-bounce">
                🧸
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EFA6B8] mb-1 block">
                Warm Comfort Dispenser
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#54354D] mb-3">
                A Giant Virtual Hug
              </h3>
              <p className="text-[#54354D]/85 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                "Close your eyes for a second. Imagine me holding you close and telling you that everything is going to be alright."
              </p>

              <div className="p-4 rounded-2xl bg-white/70 border border-[#F8C8DC] mb-6 shadow-sm">
                <p className="text-sm text-[#54354D]/80 italic">
                  "Wrap your arms around yourself right now and squeeze. That tight squeeze is sponsored directly by my heart."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendExtraHug}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#EFA6B8] to-[#F8C8DC] text-[#54354D] font-semibold text-sm shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Heart size={18} className="fill-[#54354D] text-[#54354D]" />
                  {hugGiven ? 'Hug Sent to You! 🥰' : `Add Another Warm Squeeze (${extraHugs})`}
                </button>
              </div>
            </div>
          )}

          {selectedOption === 'chocolate' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EFA6B8]/20 flex items-center justify-center text-3xl">
                🍫
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EFA6B8] mb-1 block">
                Zero Calorie • 100% Love
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#54354D] mb-3">
                Chocolate Therapy
              </h3>
              <p className="text-[#54354D]/90 text-base sm:text-lg leading-relaxed mb-5 font-medium">
                "If chocolate could fix everything, I'd bring you an entire chocolate factory."
              </p>

              <p className="text-xs text-[#54354D]/70 mb-3">
                Tap each chocolate piece to take a bite:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                {chocolatesList.map((choc, i) => {
                  const isEaten = eatenChocolates.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => handleEatChocolate(i)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isEaten
                          ? 'bg-white/40 border-dashed border-[#F8C8DC] opacity-60'
                          : 'bg-white/85 border-[#F8C8DC] shadow-sm hover:scale-105 hover:border-[#EFA6B8]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xl">{isEaten ? '✨' : choc.icon}</span>
                        {isEaten && <Check size={14} className="text-[#EFA6B8]" />}
                      </div>
                      <p className="text-xs font-bold text-[#54354D] truncate">{choc.name}</p>
                      <p className="text-[10px] text-[#54354D]/70 line-clamp-2">{choc.note}</p>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-[#54354D]/80 bg-white/60 p-2.5 rounded-xl border border-[#F8C8DC]/50">
                {eatenChocolates.length === chocolatesList.length
                  ? "🎉 You ate all of them! I promise real sweet treats are waiting for you too!"
                  : `You've enjoyed ${eatenChocolates.length} of ${chocolatesList.length} treats.`}
              </div>
            </div>
          )}

          {selectedOption === 'appreciation' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D8C9F5]/40 flex items-center justify-center text-3xl">
                🌷
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EFA6B8] mb-1 block">
                Pure Truth From My Heart
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#54354D] mb-4">
                A Little Appreciation
              </h3>
              <p className="text-lg sm:text-xl font-handwriting text-[#54354D] leading-relaxed mb-6 bg-white/80 p-5 rounded-2xl border border-[#D8C9F5] shadow-sm">
                "Even on the days you don't feel your best, you're still the most beautiful person in my world."
              </p>

              <div className="space-y-2.5 text-left mb-6">
                {appreciationPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-[#F8C8DC]/60"
                  >
                    <Sparkles size={16} className="text-[#EFA6B8] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#54354D]/90">{point}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D8C9F5] to-[#F8C8DC] text-[#54354D] font-semibold text-sm shadow hover:scale-105 transition-transform"
              >
                I Believe You 🥺💗
              </button>
            </div>
          )}

          {selectedOption === 'music' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D8C9F5]/50 flex items-center justify-center text-3xl">
                🎵
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EFA6B8] mb-1 block">
                Harmonic Sanctuary
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#54354D] mb-3">
                Peaceful Music
              </h3>
              <p className="text-[#54354D]/85 text-sm sm:text-base mb-5">
                Gentle, soothing melodies designed to calm your nerves, ease tension, and float you into comfort.
              </p>

              <div className="p-4 rounded-2xl bg-white/80 border border-[#D8C9F5] mb-5 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#54354D]">Interactive Calming Lullaby</h4>
                    <p className="text-xs text-[#54354D]/70">Soft pentatonic chime synthesizer</p>
                  </div>
                  <button
                    onClick={onTriggerAudio}
                    className="px-4 py-2 rounded-full bg-[#EFA6B8] hover:bg-[#EB7EAE] text-white text-xs font-semibold shadow transition-transform hover:scale-105 active:scale-95"
                  >
                    Toggle Sound 🎶
                  </button>
                </div>
                <div className="border-t border-[#F8C8DC]/40 pt-3">
                  <p className="text-xs text-[#54354D]/80">
                    💡 <strong>Pro Tip:</strong> Put on comfortable headphones, turn down the lights, and close your eyes for 3 minutes.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-[#FFF8F0] border-2 border-[#D8C9F5] text-[#54354D] font-semibold text-sm shadow-sm hover:bg-[#D8C9F5]/20 transition-colors"
              >
                Back to Comfort World
              </button>
            </div>
          )}

          {selectedOption === 'letter' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F8C8DC]/40 flex items-center justify-center text-3xl">
                💌
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EFA6B8] mb-1 block">
                Handwritten With Love
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#54354D] mb-3">
                A Little Love Letter
              </h3>

              <div className="p-5 rounded-2xl bg-white/90 border-2 border-[#EFA6B8]/40 shadow-inner text-left font-handwriting text-xl sm:text-2xl text-[#54354D] leading-relaxed mb-6 relative">
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#EFA6B8]/20 flex items-center justify-center text-xs font-sans text-[#EFA6B8] font-bold">
                  💌
                </div>
                "My Sweet Girl,
                <br /><br />
                I wish I could be sitting right beside you, rubbing your back or gently holding a warm heating pad for you. Please remember to go gentle on yourself today. You are cherished beyond measure, and seeing you resting peacefully makes my heart happy.
                <br /><br />
                Forever yours ❤️"
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#EFA6B8] to-[#F8C8DC] text-[#54354D] font-semibold text-sm shadow hover:scale-105 transition-transform"
              >
                Keep This In My Heart 💖
              </button>
            </div>
          )}

          {selectedOption === 'rest' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D8C9F5]/30 flex items-center justify-center text-3xl">
                💤
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#EFA6B8] mb-1 block">
                Official Certification
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#54354D] mb-3">
                Permission To Do Absolutely Nothing
              </h3>

              <div className="p-6 rounded-2xl bg-white/85 border-2 border-dashed border-[#54354D]/30 mb-6 relative shadow-sm">
                <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-[#EFA6B8] text-white text-[10px] font-bold uppercase tracking-wider">
                  Official Pass
                </div>

                <div className="flex items-center justify-center gap-2 mb-2 text-[#54354D]">
                  <ShieldCheck size={24} className="text-[#EFA6B8]" />
                  <h4 className="font-serif font-bold text-lg">Official Rest Waiver</h4>
                </div>

                <p className="text-base sm:text-lg font-medium text-[#54354D] mb-4">
                  "Today's mission: No pressure, no expectations. Just you, your blanket, and some well-deserved rest."
                </p>

                <div className="inline-block px-4 py-1.5 rounded-lg border-2 border-[#D15374] text-[#D15374] font-bold text-xs uppercase tracking-widest rotate-[-3deg] shadow-sm">
                  ✓ APPROVED WITH INFINITE LOVE
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D8C9F5] to-[#F8C8DC] text-[#54354D] font-semibold text-sm shadow hover:scale-105 transition-transform"
              >
                I Am Going To Cozy Up Under The Blanket Now 🧸
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
