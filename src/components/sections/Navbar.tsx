import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Warm Hug', href: '#hero' },
    { name: 'My Letter', href: '#letter' },
    { name: 'Comfort World', href: '#world' },
    { name: 'Princess Menu', href: '#menu' },
    { name: 'Why You', href: '#reasons' },
    { name: 'Surprise', href: '#surprise' },
    { name: 'Starry Sky', href: '#final' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#FFF8F0]/85 backdrop-blur-md shadow-sm border-b border-[#F8C8DC]/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EFA6B8] to-[#F8C8DC] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Heart size={16} className="text-[#54354D] fill-[#54354D]" />
          </div>
          <span className="font-serif font-bold text-lg sm:text-xl text-[#54354D] tracking-tight">
            A Little World of Comfort
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full glass-panel shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#54354D]/80 hover:text-[#54354D] hover:bg-[#F8C8DC]/40 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Tag */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#54354D]/90 bg-[#F8C8DC]/30 px-3 py-1.5 rounded-full border border-[#F8C8DC]/60">
          <Sparkles size={14} className="text-[#EFA6B8] animate-pulse" />
          <span>Made for You 💗</span>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-[#F8C8DC]/40 text-[#54354D] flex items-center justify-center transition-transform active:scale-95"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel mx-4 mt-2 p-4 rounded-2xl shadow-xl border border-[#F8C8DC] animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#54354D] hover:bg-[#F8C8DC]/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
