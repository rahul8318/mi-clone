import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const soundMode = 'lullaby';
  const volume = 0.25;
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play peaceful chime chord / note
  const playChimeNote = (freq: number, duration: number = 2.5) => {
    if (!audioCtxRef.current || !isPlaying) return;
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Soft sine with slight harmonics
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    // Soft gentle attack & long dreamy decay
    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(volume * 0.18, now + 0.15);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    if (gainNodeRef.current) {
      noteGain.connect(gainNodeRef.current);
    } else {
      noteGain.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + duration);
  };

  // Calming pentatonic melody notes (Frequencies in Hz)
  // C4, D4, E4, G4, A4, C5, D5, E5, G5
  const lullabyScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  // Start peaceful melody loop
  useEffect(() => {
    if (isPlaying && soundMode === 'lullaby') {
      let step = 0;
      const melodySequence = [0, 2, 4, 2, 5, 4, 2, 3, 1, 0, 4, 3];

      const playNext = () => {
        const noteIdx = melodySequence[step % melodySequence.length];
        const freq = lullabyScale[noteIdx];
        playChimeNote(freq, 3.2);

        // Harmonize with soft sub-fifth occasionally
        if (step % 3 === 0) {
          playChimeNote(freq * 0.5, 4.0);
        }

        step++;
        // Gentle relaxed pacing
        const interval = 1200 + Math.random() * 600;
        timerRef.current = window.setTimeout(playNext, interval);
      };

      playNext();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, soundMode, volume]);

  const togglePlay = () => {
    initAudio();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center">
      <div className="glass-panel px-3.5 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg border border-[#F8C8DC]/60 backdrop-blur-md">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EFA6B8] to-[#F8C8DC] text-[#54354D] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm"
          title={isPlaying ? 'Pause calming lullaby' : 'Play calming lullaby'}
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <div className="hidden sm:flex flex-col pr-1">
          <span className="text-xs font-semibold text-[#54354D] flex items-center gap-1">
            <Music size={12} className="text-[#EFA6B8] animate-bounce" />
            {isPlaying ? 'Soothing Ambience' : 'Calm Music'}
          </span>
          <span className="text-[10px] text-[#54354D]/70">
            {isPlaying ? 'Playing gentle melody' : 'Tap to relax'}
          </span>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-1 pl-1">
            <span className="w-1 h-3 bg-[#EFA6B8] rounded-full animate-pulse" />
            <span className="w-1 h-5 bg-[#D8C9F5] rounded-full animate-pulse delay-100" />
            <span className="w-1 h-2 bg-[#EFA6B8] rounded-full animate-pulse delay-200" />
          </div>
        )}
      </div>
    </div>
  );
};
