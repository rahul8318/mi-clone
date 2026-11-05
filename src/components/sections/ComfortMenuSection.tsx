import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ComfortModal, ComfortOptionType } from '../modals/ComfortModal';

interface ComfortMenuSectionProps {
  onTriggerAudio?: () => void;
}

export const ComfortMenuSection: React.FC<ComfortMenuSectionProps> = ({ onTriggerAudio }) => {
  const [selectedOption, setSelectedOption] = useState<ComfortOptionType>(null);

  const menuItems = [
    {
      id: 'hug' as ComfortOptionType,
      title: 'A Virtual Hug',
      icon: '🧸',
      tagline: 'Warm, tight, infinite squeezes',
      preview: 'Imagine me holding you close and telling you that everything is going to be alright.',
      bgGradient: 'from-[#F8C8DC]/40 to-[#FDEDF3]',
      accentColor: '#EFA6B8',
    },
    {
      id: 'chocolate' as ComfortOptionType,
      title: 'Chocolate Therapy',
      icon: '🍫',
      tagline: 'Zero calories, 100% endorphins',
      preview: "If chocolate could fix everything, I'd bring you an entire chocolate factory.",
      bgGradient: 'from-[#EFA6B8]/20 to-[#FFF8F0]',
      accentColor: '#D15374',
    },
    {
      id: 'appreciation' as ComfortOptionType,
      title: 'A Little Appreciation',
      icon: '🌷',
      tagline: 'Because you are breathtaking',
      preview: "Even on the days you don't feel your best, you're still the most beautiful person in my world.",
      bgGradient: 'from-[#D8C9F5]/40 to-[#FFF8F0]',
      accentColor: '#BFA7EE',
    },
    {
      id: 'music' as ComfortOptionType,
      title: 'Some Peaceful Music',
      icon: '🎵',
      tagline: 'Melodies for your calm soul',
      preview: 'Dreamy gentle chime chords and soft sound waves to soothe any cramps or tension.',
      bgGradient: 'from-[#D8C9F5]/30 to-[#FDEDF3]',
      accentColor: '#9C84D4',
    },
    {
      id: 'letter' as ComfortOptionType,
      title: 'A Love Letter',
      icon: '💌',
      tagline: 'Pouring my heart on paper',
      preview: 'A personalized note to remind you how deeply and unconditionally you are adored.',
      bgGradient: 'from-[#F8C8DC]/40 to-[#FFF8F0]',
      accentColor: '#EFA6B8',
    },
    {
      id: 'rest' as ComfortOptionType,
      title: 'Permission To Do Nothing',
      icon: '💤',
      tagline: 'Guilt-free blanket mode activated',
      preview: "Today's mission: No pressure, no expectations. Just you, your blanket, and some well-deserved rest.",
      bgGradient: 'from-[#FFF8F0] to-[#D8C9F5]/30',
      accentColor: '#54354D',
    },
  ];

  return (
    <section
      id="menu"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#FFF8F0] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#F8C8DC]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-[#D8C9F5]/30 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm mb-4">
            <Heart size={15} className="text-[#EFA6B8] fill-[#EFA6B8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
              Self-Care Menu On Demand
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#54354D] tracking-tight mb-4">
            What does my princess need today? 💗
          </h2>

          <p className="text-base sm:text-lg text-[#54354D]/80 max-w-xl mx-auto font-sans">
            Choose whatever your heart or body is craving right now. There are no limits — you can tap all of them.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setSelectedOption(item.id)}
              className="group cursor-pointer rounded-3xl p-6 sm:p-7 glass-panel hover:glass-card shadow-md hover:shadow-xl transition-all duration-300 border-2 border-[#F8C8DC]/60 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle top corner gradient */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${item.bgGradient} blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
              />

              <div>
                {/* Icon & Tagline */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-sm border border-[#F8C8DC] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#EFA6B8] px-3 py-1 rounded-full bg-white/70 border border-[#F8C8DC]/60">
                    {item.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#54354D] mb-3 group-hover:text-[#D15374] transition-colors">
                  {item.title}
                </h3>

                {/* Preview quote */}
                <p className="text-sm text-[#54354D]/80 leading-relaxed font-sans line-clamp-3 mb-6">
                  "{item.preview}"
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-[#F8C8DC]/40 flex items-center justify-between text-xs font-bold text-[#EFA6B8] group-hover:text-[#D15374]">
                <span>Tap to Open Surprise ✨</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup for selected option */}
      <ComfortModal
        selectedOption={selectedOption}
        onClose={() => setSelectedOption(null)}
        onTriggerAudio={onTriggerAudio}
      />
    </section>
  );
};
