import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  char: string;
}

export const CursorHearts: React.FC = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const colors = ['#F8C8DC', '#D8C9F5', '#EFA6B8', '#FFB6C1', '#FFF0F5'];
    const chars = ['💗', '✨', '🌸', '💖', '🤍'];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      if (now - lastTime < 50) return; // throttle for smooth 60fps performance
      lastTime = now;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const id = Date.now() + Math.random();
      const newParticle: HeartParticle = {
        id,
        x: clientX + (Math.random() - 0.5) * 16,
        y: clientY + (Math.random() - 0.5) * 16,
        size: 14 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        char: chars[Math.floor(Math.random() * chars.length)],
      };

      setParticles((prev) => [...prev.slice(-14), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 900);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-float-fade select-none transition-transform"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            color: p.color,
            transform: 'translate(-50%, -50%)',
            textShadow: '0 0 10px rgba(239, 166, 184, 0.7)',
          }}
        >
          {p.char}
        </span>
      ))}
      <style>{`
        @keyframes floatFade {
          0% {
            opacity: 0.95;
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1) translateY(-25px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) translateY(-50px);
          }
        }
        .animate-float-fade {
          animation: floatFade 0.9s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
