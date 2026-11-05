import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

interface ReasonItem {
  id: number;
  number: string;
  title: string;
  message: string;
  accent: string;
}

const TiltCard: React.FC<{ item: ReasonItem; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? 1.03 : 1
          }, ${isHovered ? 1.03 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative h-full rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#FFF8F0]/90 via-[#FDEDF3]/80 to-[#FFF8F0]/95 backdrop-blur-md border-2 border-[#F8C8DC]/70 shadow-lg hover:shadow-2xl overflow-hidden group select-none flex flex-col justify-between"
      >
        {/* Subtle holographic sheen */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: `translate(${rotateY * 2}px, ${rotateX * 2}px)`,
          }}
        />

        {/* Top Header: Badge & 3D Floating Heart Icon */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/80 border border-[#F8C8DC] text-[#EFA6B8] shadow-sm">
              Reason {item.number}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#EFA6B8] to-[#F8C8DC] flex items-center justify-center shadow-sm text-white transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
              <Heart size={18} className="fill-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#54354D] mb-3 leading-snug">
            {item.title}
          </h3>

          {/* Heartfelt Message */}
          <p className="text-sm sm:text-base text-[#54354D]/85 leading-relaxed font-sans mb-4">
            {item.message}
          </p>
        </div>

        {/* Bottom Sparkle accent */}
        <div className="pt-4 border-t border-[#F8C8DC]/50 flex items-center gap-1.5 text-xs text-[#EFA6B8] font-semibold">
          <Sparkles size={14} />
          <span>Etched in my heart forever</span>
        </div>
      </div>
    </motion.div>
  );
};

export const SpecialReasonsSection: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Your Radiant Smile',
      message: 'Your smile makes my entire day better. Even a tiny glimpse of your grin can instantly dissolve my worst stress.',
      accent: '#EFA6B8',
    },
    {
      id: 2,
      number: '02',
      title: 'Your Magical Presence',
      message: 'Your presence makes ordinary moments special. Just sharing a quiet room or resting under a blanket with you feels like heaven.',
      accent: '#D8C9F5',
    },
    {
      id: 3,
      number: '03',
      title: 'Loving All Your Sides',
      message: 'I love the way you are, even when you don’t feel perfect. The messy hair, the tired eyes, the cranky moments — all deeply loved.',
      accent: '#F8C8DC',
    },
    {
      id: 4,
      number: '04',
      title: 'Endless Kindness You Deserve',
      message: 'You deserve kindness, patience, and endless love. You give so much warmth to the world, and you deserve every ounce of it returned.',
      accent: '#EFA6B8',
    },
    {
      id: 5,
      number: '05',
      title: 'My Brightest Light',
      message: 'You make my world a little brighter. Your sweet thoughts, genuine laughter, and tender empathy illuminate my darkest days.',
      accent: '#D8C9F5',
    },
    {
      id: 6,
      number: '06',
      title: 'My Forever Choice',
      message: 'I would choose you on your happiest and hardest days. Through every storm, every cramp, and every sleepy cuddle, I am right by your side.',
      accent: '#F8C8DC',
    },
  ];

  return (
    <section
      id="reasons"
      className="relative py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F0] via-[#FDEDF3] to-[#FFF8F0] overflow-hidden"
    >
      {/* Background radial orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#F8C8DC]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-[#D8C9F5]/25 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-sm mb-4">
            <Star size={15} className="text-[#EFA6B8] fill-[#EFA6B8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#54354D] tracking-wide">
              Infinite Admiration
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#54354D] tracking-tight mb-4">
            Reasons Why You're Special ✨
          </h2>

          <p className="text-base sm:text-lg text-[#54354D]/80 max-w-xl mx-auto font-sans leading-relaxed">
            Hover over each 3D heart card to feel the gentle tilt. These aren't just sweet compliments — they are promises.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, index) => (
            <TiltCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
