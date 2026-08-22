import React from 'react';
import { motion } from 'motion/react';
import { User, Award, Flame, Zap, Volume2, VolumeX, ShieldCheck, Heart, Moon, Check, Sparkles } from 'lucide-react';
import { UserProfile, Achievement } from '../types';
import { NexMascot } from './NexMascot';
import { useTheme } from '../context/ThemeContext';

interface ProfileViewProps {
  user: UserProfile;
  achievements: Achievement[];
  soundMuted: boolean;
  onToggleMute: () => void;
  onSelectSound: (sound: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  achievements,
  soundMuted,
  onToggleMute,
  onSelectSound,
}) => {
  const { isDark, isRose, theme, setTheme } = useTheme();

  const soundOptions = [
    { id: 'ocean', name: 'Ondas do Oceano', icon: '🌊', desc: 'Frequência de 432Hz para foco contínuo' },
    { id: 'rain', name: 'Chuva Suave', icon: '🌧️', desc: 'Ruído rosa para isolamento acústico' },
    { id: 'binaural', name: 'Ondas Alfa 10Hz', icon: '🧠', desc: 'Estímulo neural para concentração leve' },
    { id: 'lofi', name: 'Café & Teclado', icon: '☕', desc: 'Ambiente acolhedor e relaxante' },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* User Header Profile Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#15182B] to-[#1E2338] border-[#2A3146]'
          : 'bg-gradient-to-br from-white via-[#FFF5FA] to-[#FFF0F7] border-[#F1D6E6]'
      }`}>
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#6F7CFF]/15' : 'bg-[#FF8EAB]/20'
        }`} />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          {/* Mascot in celebratory or calm mood */}
          <div className="shrink-0">
            <NexMascot mood="celebrating" size="lg" withSpeechBubble={false} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
                }`}>
                  {user.name}
                </h1>
                <p className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
                }`}>
                  Nível {user.level} • {user.levelTitle}
                </p>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold self-center sm:self-auto ${
                isDark ? 'bg-[#0B0D1A] border-[#2A3146] text-[#FF8EAB]' : 'bg-white border-[#F1D6E6] text-[#FF70A6]'
              }`}>
                <Flame className="w-4 h-4 fill-current" />
                <span>{user.streakDays} dias seguidos</span>
              </div>
            </div>

            {/* Level progress bar */}
            <div className="space-y-1.5 mt-4">
              <div className={`flex justify-between text-xs font-semibold ${
                isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
              }`}>
                <span>Progresso para Nível 5 (Mestre do Flow)</span>
                <span className={isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}>75%</span>
              </div>
              <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
                isDark ? 'bg-[#0B0D1A] border-[#2A3146]' : 'bg-[#FFF0F7] border-[#F1D6E6]'
              }`}>
                <div
                  className={`h-full rounded-full ${
                    isDark
                      ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA]'
                      : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA]'
                  }`}
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED THEME SELECTOR: Modo Dark (Masculino c/ Bigode) vs Modo Rosa (Feminino Nuvem Normal) */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
        isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className={`w-5 h-5 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
            Identidade Visual & Modo do Mascote
          </h2>
        </div>
        <p className={`text-xs mb-6 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
          Escolha a atmosfera que melhor combina com seu estilo de estudo e foco diário
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Modo Dark (Masculino c/ Bigode) */}
          <div
            onClick={() => setTheme('dark_masculine')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              theme === 'dark_masculine'
                ? 'border-[#6F7CFF] bg-[#0B0D1A] shadow-[0_4px_20px_rgba(111,124,255,0.25)]'
                : 'border-[#2A3146] bg-[#0B0D1A]/50 hover:border-[#6F7CFF]/50 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#15182B] border border-[#2A3146] flex items-center justify-center text-xl">
                  <Moon className="w-5 h-5 text-[#8ED8FF]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F4F5FA] flex items-center gap-2">
                    <span>Modo Dark</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2A3146] text-[#8ED8FF] font-semibold">
                      Com Bigode
                    </span>
                  </h3>
                  <p className="text-xs text-[#8E9BB5]">
                    Estética profunda índigo e nuvem focada estilosa
                  </p>
                </div>
              </div>

              {theme === 'dark_masculine' && (
                <div className="w-6 h-6 rounded-full bg-[#6F7CFF] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {/* Mascot Preview */}
            <div className="flex items-center justify-center py-2 bg-[#15182B]/60 rounded-xl border border-[#2A3146]">
              <NexMascot mood="focused" size="sm" variant="masculine" withSpeechBubble={false} />
            </div>
          </div>

          {/* Option 2: Modo Rosa (Feminino Pastel Nuvem Normal) */}
          <div
            onClick={() => setTheme('rose_feminine')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              theme === 'rose_feminine'
                ? 'border-[#FF70A6] bg-[#FFF5FA] shadow-[0_4px_20px_rgba(255,112,166,0.25)]'
                : 'border-[#F1D6E6] bg-white hover:border-[#FF70A6]/50 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0F7] border border-[#F1D6E6] flex items-center justify-center text-xl">
                  <Heart className="w-5 h-5 text-[#FF70A6] fill-[#FF70A6]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D354B] flex items-center gap-2">
                    <span>Modo Rosa Pastel</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF0F7] text-[#FF70A6] font-semibold">
                      Nuvem Clássica
                    </span>
                  </h3>
                  <p className="text-xs text-[#7F7299]">
                    Estética leve pastel dream e nuvem fofa sem bigode
                  </p>
                </div>
              </div>

              {theme === 'rose_feminine' && (
                <div className="w-6 h-6 rounded-full bg-[#FF70A6] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {/* Mascot Preview */}
            <div className="flex items-center justify-center py-2 bg-white rounded-xl border border-[#F1D6E6]">
              <NexMascot mood="focused" size="sm" variant="feminine" withSpeechBubble={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Soundscape & Audio Settings */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
        isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              Paisagem Sonora do Flow
            </h2>
            <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              Frequências que bloqueiam ruídos externos e induzem ondas alfa
            </p>
          </div>

          <button
            onClick={onToggleMute}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              soundMuted
                ? (isDark ? 'bg-[#2A3146] text-[#8E9BB5] border-[#2A3146]' : 'bg-[#FFF0F7] text-[#7F7299] border-[#F1D6E6]')
                : (isDark ? 'bg-[#6F7CFF]/20 text-[#8ED8FF] border-[#6F7CFF]/40' : 'bg-[#FF8EAB]/20 text-[#FF70A6] border-[#FF8EAB]/40')
            }`}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{soundMuted ? 'Mutado' : 'Ativo'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {soundOptions.map((snd) => {
            const isSelected = user.ambientSound === snd.id;
            return (
              <div
                key={snd.id}
                onClick={() => onSelectSound(snd.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? (isDark
                        ? 'bg-[#0B0D1A] border-[#6F7CFF] text-[#F4F5FA]'
                        : 'bg-[#FFF0F7] border-[#FF70A6] text-[#3D354B]')
                    : (isDark
                        ? 'bg-[#0B0D1A]/50 border-[#2A3146] text-[#8E9BB5] hover:border-[#6F7CFF]/40'
                        : 'bg-[#FFF6FB] border-[#F1D6E6] text-[#7F7299] hover:border-[#FF70A6]/40')
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{snd.icon}</span>
                  <div>
                    <h3 className={`text-sm font-bold ${
                      isSelected 
                        ? (isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]') 
                        : (isDark ? 'text-[#D5DBE8]' : 'text-[#5A5268]')
                    }`}>
                      {snd.name}
                    </h3>
                    <p className="text-[11px] opacity-75">{snd.desc}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-[#6F7CFF] text-white' : 'bg-[#FF70A6] text-white'
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements / Conquistas */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
        isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Award className={`w-5 h-5 ${isDark ? 'text-[#FFC978]' : 'text-[#FFC78A]'}`} />
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
            Conquistas de Constância
          </h2>
        </div>
        <p className={`text-xs mb-6 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
          Marcos reais da sua evolução e foco contínuo
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all ${
                ach.unlocked
                  ? (isDark
                      ? 'bg-[#0B0D1A] border-[#2A3146]'
                      : 'bg-[#FFF6FB] border-[#F1D6E6]')
                  : (isDark
                      ? 'bg-[#0B0D1A]/30 border-[#2A3146]/40 opacity-40'
                      : 'bg-[#FFF6FB]/40 border-[#F1D6E6]/40 opacity-40')
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: ach.unlocked ? `${ach.badgeColor}20` : '#2A3146',
                    border: `1px solid ${ach.unlocked ? ach.badgeColor : '#3B4468'}`,
                  }}
                >
                  {ach.icon === 'wave' && '〰️'}
                  {ach.icon === 'cloud' && '☁️'}
                  {ach.icon === 'zap' && '⚡'}
                  {ach.icon === 'flame' && '🔥'}
                  {ach.icon === 'star' && '⭐'}
                  {ach.icon === 'award' && '🏆'}
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                    {ach.title}
                  </h3>
                  {ach.unlockedAt && (
                    <span className={`text-[10px] font-semibold ${isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'}`}>
                      Desbloqueado {ach.unlockedAt}
                    </span>
                  )}
                </div>
              </div>
              <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
