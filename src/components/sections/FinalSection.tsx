import React from 'react';
import { motion } from 'framer-motion';
import { Moon, ArrowUp } from 'lucide-react';
import { NightSkyScene } from '../3d/NightSkyScene';

export const FinalSection: React.FC = () => {
  const handleReplay = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="final"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#241421] via-[#341F2F] to-[#1E1120] text-[#FFF8F0] overflow-hidden flex items-center justify-center"
    >
      {/* 3D Night Sky with Moon, Twinkling Stars & Beating 3D Heart */}
      <div className="absolute inset-0 z-0">
        <NightSkyScene />
      </div>

      {/* Deep starry radial overlay to ensure crystal clear readability of text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1120] via-[#2A1E29]/50 to-transparent pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
        {/* Subtle glowing pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#F8C8DC]/30 shadow-lg"
        >
          <Moon size={15} className="text-[#F8C8DC]" />
          <span className="text-xs sm:text-sm font-semibold text-[#F8C8DC] tracking-wide">
            Under The Same Starry Sky 🌙
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight text-glow"
        >
          One Last Thing, My Love...
        </motion.h2>

        {/* Cinematic Card with Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass-panel-dark rounded-3xl p-8 sm:p-12 md:p-14 border border-[#F8C8DC]/30 shadow-2xl space-y-6 text-left sm:text-center max-w-3xl mx-auto"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#F8C8DC] leading-relaxed">
            "Periods last a few days, difficult moments pass, but my care for you isn't limited to your good days."
          </p>

          <div className="w-16 h-0.5 bg-[#EFA6B8]/50 mx-auto" />

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans font-light">
            I don't need you to be happy all the time. I just want you to feel safe being yourself with me.
          </p>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans font-light">
            Sending you unlimited hugs, forehead kisses, and all my love.
          </p>

          <p className="text-lg sm:text-xl font-handwriting text-[#D8C9F5] text-2xl sm:text-3xl font-bold pt-2">
            "You're my favorite notification, my sweetest thought, and my most beautiful feeling."
          </p>

          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#EFA6B8] pt-2">
            I love you, baby. ❤️
          </p>
        </motion.div>

        {/* Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="pt-4"
        >
          <button
            onClick={handleReplay}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#EFA6B8] via-[#F8C8DC] to-[#EFA6B8] text-[#54354D] font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2.5 border border-white/60 group"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span>Replay Our Little World</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
