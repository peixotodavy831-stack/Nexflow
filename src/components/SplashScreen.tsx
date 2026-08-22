import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { isDark, isRose } = useTheme();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const stepLabels = [
    { num: 1, label: 'N' },
    { num: 2, label: 'Fluindo' },
    { num: 3, label: 'Transformando' },
    { num: 4, label: 'Virando onda' },
    { num: 5, label: 'Flow' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 700);
    const timer2 = setTimeout(() => setStep(3), 1400);
    const timer3 = setTimeout(() => setStep(4), 2100);
    const timer4 = setTimeout(() => setStep(5), 2900);
    const timerFinal = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timerFinal);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none transition-colors ${
      isDark ? 'bg-[#0B0D1A]' : 'bg-[#FFF6FB]'
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none ${
        isDark
          ? 'bg-gradient-to-tr from-[#6F7CFF]/20 via-[#A78BFA]/15 to-[#FF8EAB]/10'
          : 'bg-gradient-to-tr from-[#FF8EAB]/25 via-[#BEE7F6]/20 to-[#FFD9EC]/20'
      }`} />

      {/* Main Center Animation Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[340px] px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Step 1 to 4: N Morphing into Flow Wave */}
          {step <= 4 && (
            <motion.div
              key="morphing-n-wave"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center w-48 h-48"
            >
              <svg viewBox="0 0 160 160" className={`w-48 h-48 ${
                isDark
                  ? 'filter drop-shadow-[0_0_25px_rgba(111,124,255,0.6)]'
                  : 'filter drop-shadow-[0_0_25px_rgba(255,112,166,0.5)]'
              }`}>
                <defs>
                  <linearGradient id="splashGradDark" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8ED8FF" />
                    <stop offset="40%" stopColor="#6F7CFF" />
                    <stop offset="80%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#FF8EAB" />
                  </linearGradient>

                  <linearGradient id="splashGradRose" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF70A6" />
                    <stop offset="40%" stopColor="#A78BFA" />
                    <stop offset="80%" stopColor="#72D0F4" />
                    <stop offset="100%" stopColor="#9DE0C0" />
                  </linearGradient>
                </defs>

                {/* Morphing Path */}
                {step === 1 && (
                  <motion.path
                    d="M 45 120 L 45 40 L 115 120 L 115 40"
                    stroke={isDark ? "url(#splashGradDark)" : "url(#splashGradRose)"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                )}

                {step === 2 && (
                  <motion.path
                    d="M 45 115 C 45 70, 55 45, 65 45 C 80 45, 80 115, 95 115 C 105 115, 115 90, 115 45"
                    stroke={isDark ? "url(#splashGradDark)" : "url(#splashGradRose)"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ scaleY: 0.9 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}

                {step === 3 && (
                  <motion.path
                    d="M 30 100 C 40 50, 60 40, 75 75 C 90 110, 110 50, 130 90"
                    stroke={isDark ? "url(#splashGradDark)" : "url(#splashGradRose)"}
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {step === 4 && (
                  <motion.path
                    d="M 15 110 C 35 40, 65 30, 85 85 C 105 130, 125 50, 150 70"
                    stroke={isDark ? "url(#splashGradDark)" : "url(#splashGradRose)"}
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ scale: 0.9, x: -10 }}
                    animate={{ scale: 1.1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </svg>
            </motion.div>
          )}

          {/* Step 5: Full NexFlow Logo Reveal */}
          {step === 5 && (
            <motion.div
              key="full-nexflow-brand"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-4">
                <svg viewBox="0 0 100 100" className={`w-full h-full ${
                  isDark
                    ? 'filter drop-shadow-[0_8px_30px_rgba(111,124,255,0.4)]'
                    : 'filter drop-shadow-[0_8px_30px_rgba(255,112,166,0.35)]'
                }`} fill="none">
                  <defs>
                    <linearGradient id="cloudSplashDark" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2A3146" />
                      <stop offset="50%" stopColor="#1E2338" />
                      <stop offset="100%" stopColor="#15182B" />
                    </linearGradient>

                    <linearGradient id="cloudSplashRose" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#FFF2F8" />
                      <stop offset="100%" stopColor="#F5E4F0" />
                    </linearGradient>
                  </defs>

                  {/* Cloud */}
                  <path
                    d="M 32 68 C 22 68 14 60 14 50 C 14 41 20 34 29 32.5 C 33 21 44 14 56 14 C 67 14 76 20 80 30 C 88 32 94 39 94 48 C 94 58 86 68 76 68 Z"
                    fill={isDark ? "url(#cloudSplashDark)" : "url(#cloudSplashRose)"}
                    stroke={isDark ? "#6F7CFF" : "#FF8EAB"}
                    strokeWidth="2.5"
                  />

                  {/* N Wave */}
                  <path
                    d="M 30 60 C 30 38, 36 28, 42 28 C 49 28, 52 48, 58 48 C 64 48, 68 32, 74 32 C 78 32, 80 44, 80 58"
                    stroke={isDark ? "url(#splashGradDark)" : "url(#splashGradRose)"}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />

                  {/* Mustache (ONLY in Masculine/Dark mode) */}
                  {isDark && (
                    <path
                      d="M 40 65 C 45 61, 48 64, 52 66 C 56 64, 59 61, 64 65 C 60 67, 56 68, 52 67 C 48 68, 44 67, 40 65 Z"
                      fill="#0B0D1A"
                      stroke="#6F7CFF"
                      strokeWidth="1.2"
                    />
                  )}

                  {/* Star */}
                  <path
                    d="M 76 18 Q 78 22 82 24 Q 78 26 76 30 Q 74 26 70 24 Q 74 22 76 18 Z"
                    fill={isDark ? "#FFC978" : "#FFC78A"}
                  />
                </svg>
              </div>

              {/* Title & Slogan */}
              <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 flex items-center gap-1 ${
                isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
              }`}>
                <span>Nex</span>
                <span className={
                  isDark
                    ? "bg-gradient-to-r from-[#6F7CFF] via-[#A78BFA] to-[#8ED8FF] bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-[#FF70A6] via-[#A78BFA] to-[#72D0F4] bg-clip-text text-transparent"
                }>
                  Flow
                </span>
              </h1>
              <p className={`text-base sm:text-lg font-medium tracking-wide ${
                isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
              }`}>
                {isDark ? 'Seu espaço para entrar no Flow.' : 'Mais que um timer. Um estado de Flow.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step Progress Line */}
      <div className="absolute bottom-12 z-20 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 sm:gap-6">
          {stepLabels.map((item) => (
            <div key={item.num} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  step === item.num
                    ? (isDark ? 'bg-[#6F7CFF] scale-125 ring-4 ring-[#6F7CFF]/30' : 'bg-[#FF70A6] scale-125 ring-4 ring-[#FF70A6]/30')
                    : step > item.num
                    ? (isDark ? 'bg-[#A78BFA]' : 'bg-[#A78BFA]')
                    : (isDark ? 'bg-[#2A3146]' : 'bg-[#F1D6E6]')
                }`}
              />
              <span
                className={`text-[11px] font-semibold transition-colors duration-300 ${
                  step >= item.num 
                    ? (isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]') 
                    : (isDark ? 'text-[#5A6585]' : 'text-[#A399B5]')
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          className={`mt-4 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer border ${
            isDark
              ? 'text-[#8E9BB5] hover:text-[#F4F5FA] bg-[#15182B]/60 hover:bg-[#15182B] border-[#2A3146]'
              : 'text-[#7F7299] hover:text-[#3D354B] bg-white hover:bg-[#FFF0F7] border-[#F1D6E6] shadow-xs'
          }`}
        >
          <span>Pular introdução</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
