import React from 'react';
import { MascotMood } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NexMascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSpeechBubble?: boolean;
  speechText?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'masculine' | 'feminine' | 'auto';
  forceMustache?: boolean;
}

export const NexMascot: React.FC<NexMascotProps> = ({
  mood = 'calm',
  size = 'md',
  withSpeechBubble = false,
  speechText,
  className = '',
  onClick,
  variant = 'auto',
  forceMustache,
}) => {
  const { isDark, isRose } = useTheme();

  // Determine if mascot has mustache
  const isMasculine = variant === 'auto' ? (forceMustache !== undefined ? forceMustache : isDark) : variant === 'masculine';
  const showMustache = isMasculine;

  const sizeConfig = {
    sm: { width: 64, height: 64, bubbleText: 'text-xs' },
    md: { width: 100, height: 100, bubbleText: 'text-sm' },
    lg: { width: 150, height: 150, bubbleText: 'text-base' },
    xl: { width: 220, height: 220, bubbleText: 'text-lg' },
  };

  const dim = sizeConfig[size];

  // Default speech texts for each mood
  const defaultSpeech = isMasculine
    ? {
        calm: 'Pronto para um estudo leve e focado.',
        focused: 'Mente blindada. Vamos direto ao objetivo.',
        deep_flow: 'Você está no ápice do Flow. Siga no ritmo.',
        celebrating: 'Excelente sessão! Seu Flow Score subiu.',
        resting: 'Pausa merecida para consolidar o aprendizado.',
      }[mood]
    : {
        calm: 'Respire fundo. Vamos estudar no seu melhor ritmo! ✨',
        focused: 'Foco leve e mente tranquila. Você consegue!',
        deep_flow: 'Que delícia de Flow! Você está absorvendo tudo.',
        celebrating: 'Parabéns pela dedicação! Seu Flow brilhou hoje. 🌸',
        resting: 'Momento de descanso para recarregar as energias. ☁️',
      }[mood];

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      onClick={onClick}
    >
      {/* Speech Bubble */}
      {withSpeechBubble && (
        <div 
          className={`mb-2.5 max-w-[260px] px-3.5 py-2 rounded-2xl relative text-center shadow-lg backdrop-blur-md animate-fade-in ${
            isDark
              ? 'bg-[#15182B]/95 border border-[#2A3146] text-[#F4F5FA]'
              : 'bg-white/95 border border-[#F1D6E6] text-[#4A4358] shadow-[0_8px_20px_rgba(255,142,171,0.15)]'
          }`}
        >
          <p className={`font-medium leading-snug ${dim.bubbleText}`}>
            {speechText || defaultSpeech}
          </p>
          <div 
            className={`w-2.5 h-2.5 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 ${
              isDark 
                ? 'bg-[#15182B] border-b border-r border-[#2A3146]' 
                : 'bg-white border-b border-r border-[#F1D6E6]'
            }`} 
          />
        </div>
      )}

      {/* Mascot Graphic */}
      <div 
        className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
        style={{ width: dim.width, height: dim.height }}
      >
        {/* Mood Ambient Glow / Aura */}
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${
            isMasculine
              ? mood === 'deep_flow'
                ? 'bg-gradient-to-r from-[#6F7CFF]/50 via-[#A78BFA]/50 to-[#8ED8FF]/50 animate-pulse-glow'
                : mood === 'celebrating'
                ? 'bg-gradient-to-r from-[#FFC978]/40 to-[#FF8EAB]/30 animate-pulse'
                : mood === 'focused'
                ? 'bg-[#6F7CFF]/30'
                : 'bg-[#2A3146]/30'
              : mood === 'deep_flow'
              ? 'bg-gradient-to-r from-[#FF8EAB]/40 via-[#A78BFA]/30 to-[#8ED8FF]/40 animate-pulse-glow'
              : mood === 'celebrating'
              ? 'bg-gradient-to-r from-[#FFB7D5]/50 to-[#FFD59E]/40 animate-pulse'
              : mood === 'focused'
              ? 'bg-[#FF8EAB]/25'
              : 'bg-[#FFD9EC]/30'
          }`}
        />

        <svg
          viewBox="0 0 120 120"
          className={`w-full h-full relative z-10 animate-float-mascot ${
            isMasculine
              ? 'filter drop-shadow-[0_8px_24px_rgba(11,13,26,0.8)]'
              : 'filter drop-shadow-[0_6px_20px_rgba(235,160,195,0.35)]'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Masculine Mascot Body Gradient (Dark Midnight Indigo) */}
            <linearGradient id="mascotGradDark" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B4468" />
              <stop offset="50%" stopColor="#252C42" />
              <stop offset="100%" stopColor="#15192A" />
            </linearGradient>

            {/* Feminine Mascot Body Gradient (Soft Pastel Dream Cloud) */}
            <linearGradient id="mascotGradRose" x1="20" y1="15" x2="100" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF2F8" />
              <stop offset="100%" stopColor="#F5E4F0" />
            </linearGradient>

            {/* Deep Flow Outer Wave Aura */}
            <linearGradient id="flowWaveAuraDark" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8ED8FF" />
              <stop offset="50%" stopColor="#6F7CFF" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>

            <linearGradient id="flowWaveAuraRose" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF8EAB" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#8ED8FF" />
            </linearGradient>

            <linearGradient id="goldGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
          </defs>

          {/* Deep Flow External Orbiting Waves */}
          {mood === 'deep_flow' && (
            <g className="animate-spin" style={{ animationDuration: '20s', transformOrigin: '60px 60px' }}>
              <path
                d="M 15 60 C 15 30, 40 10, 75 12"
                stroke={isMasculine ? "url(#flowWaveAuraDark)" : "url(#flowWaveAuraRose)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 8"
                opacity="0.85"
              />
              <path
                d="M 105 60 C 105 90, 80 110, 45 108"
                stroke={isMasculine ? "url(#flowWaveAuraDark)" : "url(#flowWaveAuraRose)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 8"
                opacity="0.85"
              />
            </g>
          )}

          {/* Cloud Body Shape */}
          <path
            d="M 38 82 
               C 24 82 14 72 14 59 
               C 14 47 22 38 34 36 
               C 38 22 52 14 68 14 
               C 82 14 94 22 98 34 
               C 108 37 114 46 114 57 
               C 114 70 104 82 90 82 
               Z"
            fill={isMasculine ? "url(#mascotGradDark)" : "url(#mascotGradRose)"}
            stroke={isMasculine ? "#6F7CFF" : "#FF8EAB"}
            strokeWidth={isMasculine ? "3" : "2.5"}
            strokeLinejoin="round"
          />

          {/* Inner Cloud Highlight */}
          <path
            d="M 40 36 C 50 24 70 24 80 34"
            stroke={isMasculine ? "#8ED8FF" : "#FFFFFF"}
            strokeWidth="3"
            strokeLinecap="round"
            opacity={isMasculine ? "0.4" : "0.9"}
          />

          {/* === EYES & EXPRESSIONS === */}

          {/* 1. CALM MOOD */}
          {mood === 'calm' && (
            <g>
              {isMasculine ? (
                <>
                  {/* Confident gentle dark eyes */}
                  <circle cx="48" cy="48" r="4.5" fill="#F4F5FA" />
                  <circle cx="72" cy="48" r="4.5" fill="#F4F5FA" />
                  <circle cx="49.5" cy="46.5" r="1.5" fill="#6F7CFF" />
                  <circle cx="73.5" cy="46.5" r="1.5" fill="#6F7CFF" />
                </>
              ) : (
                <>
                  {/* Sweet Kawaii eyes with white catchlight */}
                  <circle cx="46" cy="47" r="5" fill="#3D354B" />
                  <circle cx="74" cy="47" r="5" fill="#3D354B" />
                  <circle cx="44.5" cy="45" r="1.8" fill="#FFFFFF" />
                  <circle cx="72.5" cy="45" r="1.8" fill="#FFFFFF" />
                  {/* Rosy blush cheeks */}
                  <circle cx="36" cy="54" r="4.5" fill="#FF8EAB" opacity="0.65" />
                  <circle cx="84" cy="54" r="4.5" fill="#FF8EAB" opacity="0.65" />
                  {/* Cute small smiling mouth */}
                  <path d="M 56 55 Q 60 59 64 55" stroke="#3D354B" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}
            </g>
          )}

          {/* 2. FOCUSED MOOD */}
          {mood === 'focused' && (
            <g>
              {isMasculine ? (
                <>
                  {/* Determined Eyebrows & Focus Eyes */}
                  <path d="M 42 43 L 54 47" stroke="#8ED8FF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 78 43 L 66 47" stroke="#8ED8FF" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="48" cy="50" r="4" fill="#8ED8FF" />
                  <circle cx="72" cy="50" r="4" fill="#8ED8FF" />
                  {/* Small Energy Spark */}
                  <path d="M 98 22 L 94 30 L 100 30 L 96 38" stroke="#FFC978" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <>
                  {/* Cute determined kawaii eyes with star spark */}
                  <circle cx="46" cy="48" r="4.5" fill="#3D354B" />
                  <circle cx="74" cy="48" r="4.5" fill="#3D354B" />
                  <circle cx="44.5" cy="46" r="1.5" fill="#FFFFFF" />
                  <circle cx="72.5" cy="46" r="1.5" fill="#FFFFFF" />
                  {/* Rosy cheeks */}
                  <circle cx="36" cy="54" r="4" fill="#FF8EAB" opacity="0.7" />
                  <circle cx="84" cy="54" r="4" fill="#FF8EAB" opacity="0.7" />
                  {/* Tiny concentrated smile */}
                  <path d="M 57 54 Q 60 57 63 54" stroke="#3D354B" strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Magical spark */}
                  <path d="M 98 22 Q 100 25 103 26 Q 100 27 98 30 Q 96 27 93 26 Q 96 25 98 22 Z" fill="#FFC978" />
                </>
              )}
            </g>
          )}

          {/* 3. DEEP FLOW MOOD */}
          {mood === 'deep_flow' && (
            <g>
              {isMasculine ? (
                <>
                  {/* Glowing Flow Visor */}
                  <rect x="36" y="42" width="48" height="14" rx="7" fill="#15182B" stroke="#6F7CFF" strokeWidth="2" />
                  <path d="M 42 49 C 50 45, 55 53, 63 49 C 71 45, 75 53, 78 49" stroke="#8ED8FF" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Flow pastel visor / blissful wave glasses */}
                  <rect x="36" y="42" width="48" height="14" rx="7" fill="#FFF0F7" stroke="#FF8EAB" strokeWidth="2" />
                  <path d="M 42 49 C 50 45, 55 53, 63 49 C 71 45, 75 53, 78 49" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="36" cy="55" r="4" fill="#FF8EAB" opacity="0.6" />
                  <circle cx="84" cy="55" r="4" fill="#FF8EAB" opacity="0.6" />
                  <path d="M 57 58 Q 60 61 63 58" stroke="#3D354B" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}
            </g>
          )}

          {/* 4. CELEBRATING MOOD */}
          {mood === 'celebrating' && (
            <g>
              {/* Happy closed arched eyes (^_^) */}
              <path d="M 42 50 C 45 44, 51 44, 54 50" stroke={isMasculine ? "#FFC978" : "#FF70A6"} strokeWidth="3" strokeLinecap="round" />
              <path d="M 66 50 C 69 44, 75 44, 78 50" stroke={isMasculine ? "#FFC978" : "#FF70A6"} strokeWidth="3" strokeLinecap="round" />
              {/* Rosy Cheeks */}
              <circle cx="36" cy="54" r="4.5" fill="#FF8EAB" opacity="0.8" />
              <circle cx="84" cy="54" r="4.5" fill="#FF8EAB" opacity="0.8" />
              {/* Big happy smile for feminine */}
              {!showMustache && (
                <path d="M 54 55 Q 60 63 66 55" stroke="#3D354B" strokeWidth="2.2" strokeLinecap="round" fill="#FFB7D5" />
              )}
            </g>
          )}

          {/* 5. RESTING MOOD */}
          {mood === 'resting' && (
            <g>
              {/* Sleeping / Relaxed curved lines (u_u) */}
              <path d="M 43 47 C 46 51, 52 51, 55 47" stroke={isMasculine ? "#8E9BB5" : "#8B7FA6"} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 67 47 C 70 51, 76 51, 79 47" stroke={isMasculine ? "#8E9BB5" : "#8B7FA6"} strokeWidth="2.5" strokeLinecap="round" />
              {!showMustache && (
                <>
                  <circle cx="36" cy="52" r="3.5" fill="#FF8EAB" opacity="0.5" />
                  <circle cx="84" cy="52" r="3.5" fill="#FF8EAB" opacity="0.5" />
                  <path d="M 57 53 Q 60 55 63 53" stroke="#8B7FA6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </>
              )}
              <text x="86" y="32" fill="#A78BFA" fontSize="11" fontWeight="bold" fontFamily="sans-serif">z</text>
              <text x="96" y="24" fill={isMasculine ? "#6F7CFF" : "#FF8EAB"} fontSize="14" fontWeight="bold" fontFamily="sans-serif">Z</text>
            </g>
          )}

          {/* === MUSTACHE (Rendered ONLY in Masculine/Dark mode) === */}
          {showMustache && (
            <path
              d="M 44 63 
                 C 50 57, 56 61, 60 64 
                 C 64 61, 70 57, 76 63 
                 C 72 67, 66 68, 60 67 
                 C 54 68, 48 67, 44 63 Z"
              fill="#0B0D1A"
              stroke="#6F7CFF"
              strokeWidth="1.8"
              className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            />
          )}

          {/* Celebrating Trophy or Star Props */}
          {mood === 'celebrating' && (
            <g transform="translate(86, 60) scale(0.9)">
              <path
                d="M 4 2 L 16 2 L 14 12 C 14 16, 12 18, 10 18 C 8 18, 6 16, 6 12 Z"
                fill="url(#goldGrad)"
                stroke="#FFC978"
                strokeWidth="1.5"
              />
              <path d="M 10 18 L 10 24 M 6 24 L 14 24" stroke="#FFC978" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
