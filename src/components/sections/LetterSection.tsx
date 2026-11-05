import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Feather, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LetterSection: React.FC = () => {
  const fullTextParagraphs = [
    "Baby, I know your body is going through a lot right now. I wish I could take away every little bit of discomfort and replace it with warmth, peace, and a thousand hugs.",
    "I may not always know exactly what you're feeling, and I might not have the perfect words to make everything better. But I want you to know that you never have to pretend to be okay around me.",
    "You can be quiet, emotional, sleepy, irritated, or just not in the mood. I'll still love every version of you.",
    "You don't have to smile all the time. You don't have to be strong every second. Take your time, rest as much as you need, and let the world wait a little.",
    "If I could, I'd wrap you in the softest blanket, bring you your favorite snacks, gently hold your hand, and remind you that everything is going to be okay.",
    "You're not a burden on your difficult days. You're my favorite person on every single day.",
    "I wish I could give you a hug right now, but until then, let this little website be one. ❤️"
  ];

  // Word-by-word reveal state
  const allWords = fullTextParagraphs.join(' \n\n ').split(' ');
  const [revealedWordCount, setRevealedWordCount] = useState<number>(12); // start with first few words visible
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTyping && revealedWordCount < allWords.length) {
      intervalRef.current = window.setInterval(() => {
        setRevealedWordCount((prev) => {
          if (prev >= allWords.length) {
            setIsTyping(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 75); // pleasant reading speed
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTyping, revealedWordCount, allWords.length]);

  const handleRevealAll = () => {
    setRevealedWordCount(allWords.length);
    setIsTyping(false);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F8C8DC', '#EFA6B8', '#FFF8F0'],
    });
  };

  const handleRestart = () => {
    setRevealedWordCount(0);
    setIsTyping(true);
  };

  // Reconstruct displayed paragraphs
  const currentText = allWords.slice(0, revealedWordCount).join(' ');
  const displayedParagraphs = currentText.split(' \n\n ');

  return (
    <section
      id="letter"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#FFF8F0] overflow-hidden"
    >
      {/* Decorative ambient elements */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#D8C9F5]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#F8C8DC]/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm mb-4">
            <Feather size={15} className="text-[#EFA6B8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
              Written from My Heart to Yours
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#54354D] tracking-tight mb-4">
            A Letter For Your Hard Days 💌
          </h2>
          <p className="text-base sm:text-lg text-[#54354D]/80 max-w-xl mx-auto font-sans">
            Read this slowly. Take a deep breath. Every word here was written just for you.
          </p>
        </div>

        {/* Parchment Letter Container */}
        <div className="relative">
          {/* Subtle envelope border / shadow layers */}
          <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-[#F8C8DC]/60 via-[#EFA6B8]/40 to-[#D8C9F5]/60 blur-lg transform rotate-[-0.5deg] opacity-75" />

          <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 md:p-16 shadow-2xl border-2 border-[#F8C8DC]/80 overflow-hidden">
            {/* Top vintage stamp & wax seal */}
            <div className="flex items-center justify-between border-b border-[#F8C8DC]/50 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EFA6B8] to-[#F8C8DC] flex items-center justify-center text-[#54354D] shadow-sm font-serif font-bold text-xl">
                  ❤️
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#54354D]">To: My Princess</h3>
                  <p className="text-xs text-[#54354D]/60 font-sans">Special Delivery • Infinite Hugs Included</p>
                </div>
              </div>

              {/* Romantic wax seal stamp */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#D15374] to-[#EFA6B8] text-white flex items-center justify-center font-serif font-bold text-sm shadow-md border-2 border-white/80 transform rotate-12 select-none"
                title="Official seal of endless love"
              >
                <span>LOVE</span>
              </div>
            </div>

            {/* Handwritten Message Area */}
            <div className="space-y-6 min-h-[380px] font-handwriting text-2xl sm:text-3xl text-[#54354D] leading-relaxed tracking-wide">
              {displayedParagraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="transition-opacity"
                >
                  {para}
                </motion.p>
              ))}

              {isTyping && revealedWordCount < allWords.length && (
                <span className="inline-block w-2.5 h-6 bg-[#EFA6B8] rounded-full animate-pulse ml-1 align-middle" />
              )}
            </div>

            {/* Signature at bottom */}
            <div className="border-t border-[#F8C8DC]/50 pt-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-handwriting text-2xl sm:text-3xl text-[#EFA6B8] font-bold">
                Yours always, in every season & mood 💕
              </div>

              {/* Reveal Controls */}
              <div className="flex items-center gap-2">
                {revealedWordCount < allWords.length ? (
                  <>
                    <button
                      onClick={() => setIsTyping(!isTyping)}
                      className="px-4 py-2 rounded-full glass-panel text-xs font-semibold text-[#54354D] hover:bg-[#F8C8DC]/30 transition-all flex items-center gap-1.5"
                    >
                      <Play size={13} className={isTyping ? 'text-[#EFA6B8]' : ''} />
                      <span>{isTyping ? 'Pause Reading' : 'Resume'}</span>
                    </button>
                    <button
                      onClick={handleRevealAll}
                      className="px-4 py-2 rounded-full bg-[#EFA6B8] text-white text-xs font-semibold hover:bg-[#D15374] transition-all shadow-sm"
                    >
                      Read Full Letter 📜
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleRestart}
                    className="px-4 py-2 rounded-full glass-panel text-xs font-semibold text-[#54354D] hover:bg-[#F8C8DC]/30 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} />
                    <span>Replay Handwritten Reveal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
