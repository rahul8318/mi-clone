import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, Coffee, Heart, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CareKitSection: React.FC = () => {
  // Water tracker
  const [glassesDrank, setGlassesDrank] = useState<number>(2);

  // Heating pad timer
  const [timerSeconds, setTimerSeconds] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Mood selected
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAddWater = () => {
    if (glassesDrank < 8) {
      setGlassesDrank((prev) => prev + 1);
      confetti({
        particleCount: 20,
        spread: 45,
        colors: ['#89CFF0', '#D8C9F5', '#FFFFFF'],
      });
    }
  };

  const moods = [
    {
      id: 'crampy',
      label: 'Cramps hurt 😣',
      reply: 'Take a warm heating pad, curl into a ball, and close your eyes. Your body is doing intense work, and I am sending you so much soothing energy.',
    },
    {
      id: 'tired',
      label: 'Super sleepy 🥱',
      reply: 'Sleep is the best medicine today, my love. Don’t feel bad about sleeping in or taking 3 naps. The world can wait!',
    },
    {
      id: 'emotional',
      label: 'A little emotional 🥺',
      reply: 'Cry if you need to, complain as much as you want. Your emotions are completely valid and safe with me. I love you endlessly.',
    },
    {
      id: 'cuddle',
      label: 'Just need hugs 🧸',
      reply: 'Sending you the biggest virtual bear hug right now! Tucking you in with the fluffiest blanket.',
    },
  ];

  return (
    <section
      id="carekit"
      className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F0] to-[#FDEDF3] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm mb-3">
            <Sparkles size={14} className="text-[#EFA6B8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
              Girlfriend Care Package
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#54354D]">
            Your Little Comfort Station 🌸
          </h2>
          <p className="text-sm sm:text-base text-[#54354D]/75 max-w-lg mx-auto mt-2">
            Practical little comforts to help ease cramps, stay hydrated, and feel comforted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. Heating Pad Timer */}
          <div className="glass-panel rounded-3xl p-6 border-2 border-[#F8C8DC] shadow-md flex flex-col justify-between text-center relative overflow-hidden">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#EFA6B8]/20 flex items-center justify-center text-[#EFA6B8]">
                <Flame size={24} className={isTimerRunning ? 'animate-bounce text-[#FF4D79]' : ''} />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#54354D] mb-1">
                Warm Heating Pad Timer
              </h3>
              <p className="text-xs text-[#54354D]/75 mb-4">
                Put your warm compress on your tummy or lower back and relax.
              </p>

              <div className="text-3xl font-mono font-bold text-[#54354D] my-3">
                {formatTime(timerSeconds)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-5 py-2.5 rounded-full bg-[#EFA6B8] hover:bg-[#D15374] text-white text-xs font-bold transition-all shadow-sm"
              >
                {isTimerRunning ? 'Pause' : 'Start 15m Relax'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(15 * 60);
                }}
                className="p-2.5 rounded-full bg-white/80 hover:bg-white text-[#54354D] text-xs transition-colors border border-[#F8C8DC]"
                title="Reset timer"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* 2. Hydration & Warm Tea Tracker */}
          <div className="glass-panel rounded-3xl p-6 border-2 border-[#F8C8DC] shadow-md flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#89CFF0]/20 flex items-center justify-center text-[#54354D]">
                <Droplets size={24} className="text-[#89CFF0]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#54354D] mb-1">
                Warm Water & Tea Tracker
              </h3>
              <p className="text-xs text-[#54354D]/75 mb-4">
                Warm fluids relax tense muscles and keep you feeling light.
              </p>

              {/* Water glasses visual */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-7 h-9 rounded-lg border flex items-center justify-center text-xs transition-all ${
                      i < glassesDrank
                        ? 'bg-[#89CFF0]/40 border-[#89CFF0] text-[#54354D] font-bold shadow-sm'
                        : 'bg-white/40 border-dashed border-[#F8C8DC] text-gray-300'
                    }`}
                  >
                    {i < glassesDrank ? '💧' : ''}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddWater}
              disabled={glassesDrank >= 6}
              className="w-full py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#89CFF0] text-[#54354D] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Coffee size={14} className="text-[#89CFF0]" />
              <span>{glassesDrank >= 6 ? 'Hydration Champion! 🌸' : 'I Drank a Warm Glass 🍵'}</span>
            </button>
          </div>

          {/* 3. Real-Time Mood Hug Box */}
          <div className="glass-panel rounded-3xl p-6 border-2 border-[#F8C8DC] shadow-md flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#D8C9F5]/30 flex items-center justify-center text-[#54354D]">
                <Heart size={24} className="text-[#EFA6B8] fill-[#EFA6B8]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#54354D] mb-1">
                How Are You Feeling Right Now?
              </h3>
              <p className="text-xs text-[#54354D]/75 mb-3">
                Tap whichever resonates with you right now:
              </p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(m.reply)}
                    className="p-2 rounded-xl text-left text-xs bg-white/80 hover:bg-white border border-[#F8C8DC] hover:border-[#EFA6B8] text-[#54354D] font-semibold transition-all"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-white/90 border border-[#EFA6B8] text-xs text-[#54354D] text-left leading-relaxed shadow-sm italic"
              >
                "{selectedMood}"
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
