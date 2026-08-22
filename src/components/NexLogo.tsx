import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface NexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
  withMustache?: boolean;
  variant?: 'masculine' | 'feminine' | 'auto';
}

export const NexLogo: React.FC<NexLogoProps> = ({
  size = 'md',
  showText = true,
  animated = false,
  className = '',
  withMustache,
  variant = 'auto',
}) => {
  const { isDark, isRose } = useTheme();

  const isMasculine = variant === 'auto' ? isDark : variant === 'masculine';
  // Mustache only appears if explicitly enabled OR if in dark/masculine mode
  const showMustache = withMustache !== undefined ? withMustache : isMasculine;

  const sizeMap = {
    sm: { icon: 32, text: 'text-lg', subtext: 'text-[10px]' },
    md: { icon: 46, text: 'text-2xl', subtext: 'text-xs' },
    lg: { icon: 72, text: 'text-3xl', subtext: 'text-sm' },
    xl: { icon: 110, text: 'text-5xl', subtext: 'text-base' },
  };

  const dim = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Visual Symbol: Cloud + Wave-N (+ Mustache in masculine mode) */}
      <div 
        className="relative flex items-center justify-center select-none"
        style={{ width: dim.icon, height: dim.icon }}
      >
        {/* Glow backdrop */}
        <div 
          className={`absolute inset-0 rounded-full blur-md ${
            isMasculine
              ? 'bg-gradient-to-tr from-[#6F7CFF]/30 to-[#A78BFA]/20'
              : 'bg-gradient-to-tr from-[#FF8EAB]/30 to-[#BEE7F6]/30'
          }`} 
        />

        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full relative z-10 ${
            isMasculine
              ? 'filter drop-shadow-[0_4px_12px_rgba(111,124,255,0.25)]'
              : 'filter drop-shadow-[0_4px_12px_rgba(255,142,171,0.25)]'
          } ${animated ? 'animate-float-mascot' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Cloud Gradient Dark */}
            <linearGradient id="cloudGradDark" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A3146" />
              <stop offset="45%" stopColor="#1E2338" />
              <stop offset="100%" stopColor="#15182B" />
            </linearGradient>

            {/* Cloud Gradient Rose */}
            <linearGradient id="cloudGradRose" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF2F8" />
              <stop offset="100%" stopColor="#F5E4F0" />
            </linearGradient>

            {/* Cloud Border Gradient Dark */}
            <linearGradient id="cloudBorderDark" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8ED8FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6F7CFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
            </linearGradient>

            {/* Cloud Border Gradient Rose */}
            <linearGradient id="cloudBorderRose" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF8EAB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8ED8FF" stopOpacity="0.5" />
            </linearGradient>

            {/* Wave N Gradient Dark */}
            <linearGradient id="waveNGradDark" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8ED8FF" />
              <stop offset="45%" stopColor="#6F7CFF" />
              <stop offset="85%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#FF8EAB" />
            </linearGradient>

            {/* Wave N Gradient Rose */}
            <linearGradient id="waveNGradRose" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF70A6" />
              <stop offset="45%" stopColor="#A78BFA" />
              <stop offset="85%" stopColor="#72D0F4" />
              <stop offset="100%" stopColor="#9DE0C0" />
            </linearGradient>
          </defs>

          {/* Cloud Body Shape */}
          <path
            d="M 32 68 
               C 22 68 14 60 14 50 
               C 14 41 20 34 29 32.5 
               C 33 21 44 14 56 14 
               C 67 14 76 20 80 30 
               C 88 32 94 39 94 48 
               C 94 58 86 68 76 68 
               Z"
            fill={isMasculine ? "url(#cloudGradDark)" : "url(#cloudGradRose)"}
            stroke={isMasculine ? "url(#cloudBorderDark)" : "url(#cloudBorderRose)"}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Stylized 'N' in Wave / Flow shape born inside the cloud */}
          <path
            d="M 30 60
               C 30 38, 36 28, 42 28
               C 49 28, 52 48, 58 48
               C 64 48, 68 32, 74 32
               C 78 32, 80 44, 80 58"
            stroke={isMasculine ? "url(#waveNGradDark)" : "url(#waveNGradRose)"}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_2px_8px_rgba(111,124,255,0.4)]"
          />

          {/* Minimalist Mustache (ONLY in Masculine/Dark mode) */}
          {showMustache && (
            <path
              d="M 40 65 
                 C 45 61, 48 64, 52 66 
                 C 56 64, 59 61, 64 65 
                 C 60 67, 56 68, 52 67 
                 C 48 68, 44 67, 40 65 Z"
              fill="#0B0D1A"
              stroke="#6F7CFF"
              strokeWidth="1.2"
              className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            />
          )}

          {/* Little Star / Spark of Flow */}
          <path
            d="M 76 18 Q 78 22 82 24 Q 78 26 76 30 Q 74 26 70 24 Q 74 22 76 18 Z"
            fill={isMasculine ? "#FFC978" : "#FFC78A"}
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-extrabold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'} ${dim.text} leading-none flex items-center`}>
            <span>Nex</span>
            <span className={
              isDark
                ? "bg-gradient-to-r from-[#6F7CFF] via-[#A78BFA] to-[#8ED8FF] bg-clip-text text-transparent"
                : "bg-gradient-to-r from-[#FF70A6] via-[#A78BFA] to-[#60C3EB] bg-clip-text text-transparent"
            }>
              Flow
            </span>
          </div>
          <span className={`font-medium tracking-wide ${dim.subtext} mt-0.5 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
            {isDark ? 'Seu espaço para entrar no Flow' : 'Mais que um timer. Um estado de Flow.'}
          </span>
        </div>
      )}
    </div>
  );
};
