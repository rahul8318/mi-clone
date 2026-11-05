import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { LetterSection } from './components/sections/LetterSection';
import { ComfortWorldSection } from './components/sections/ComfortWorldSection';
import { ComfortMenuSection } from './components/sections/ComfortMenuSection';
import { CareKitSection } from './components/sections/CareKitSection';
import { SpecialReasonsSection } from './components/sections/SpecialReasonsSection';
import { SurpriseSection } from './components/sections/SurpriseSection';
import { FinalSection } from './components/sections/FinalSection';
import { Footer } from './components/sections/Footer';
import { CursorHearts } from './components/effects/CursorHearts';
import { AudioController } from './components/audio/AudioController';

export function App() {
  const handleOpenSurprise = () => {
    const letterElem = document.getElementById('letter');
    if (letterElem) {
      letterElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#54354D] relative selection:bg-[#F8C8DC] selection:text-[#54354D]">
      {/* Interactive Cursor Hearts Particle Trail */}
      <CursorHearts />

      {/* Floating Audio Controller */}
      <AudioController />

      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* 1. Hero Section - A Warm Hug with 3D Teddy */}
      <HeroSection onOpenSurprise={handleOpenSurprise} />

      {/* 2. Deep Emotional Message Section - Handwritten Reveal */}
      <LetterSection />

      {/* 3. Interactive 3D Comfort World & Virtual Hug */}
      <ComfortWorldSection />

      {/* 4. Your Little Comfort Menu - 6 Options */}
      <ComfortMenuSection />

      {/* 5. Period Care Kit & Calming Station */}
      <CareKitSection />

      {/* 6. Reasons Why You're Special - 3D Tilt Heart Cards */}
      <SpecialReasonsSection />

      {/* 7. A Little Surprise - 3D Interactive Gift Box */}
      <SurpriseSection />

      {/* 8. Final Section - Cinematic Starry Sky & Moon */}
      <FinalSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
