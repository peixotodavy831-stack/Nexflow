import React from 'react';
import { NexLogo } from './NexLogo';
import { Flame, Sparkles, Volume2, VolumeX, HelpCircle, RotateCcw, Moon, Sun, Heart } from 'lucide-react';
import { UserProfile } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  user: UserProfile;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onReplaySplash: () => void;
  onOpenOnboarding: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  onNavigate,
  onReplaySplash,
  onOpenOnboarding,
  soundMuted,
  onToggleMute,
}) => {
  const { isDark, isRose, toggleTheme, theme } = useTheme();

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors ${
      isDark
        ? 'bg-[#0B0D1A]/85 border-[#2A3146]/60'
        : 'bg-[#FFF6FB]/85 border-[#F1D6E6]/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
        >
          <NexLogo size="md" showText={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center gap-1 p-1.5 rounded-2xl border transition-colors ${
          isDark
            ? 'bg-[#15182B] border-[#2A3146]'
            : 'bg-white border-[#F1D6E6] shadow-xs'
        }`}>
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'home'
                ? (isDark ? 'bg-[#2A3146] text-[#F4F5FA] shadow-sm' : 'bg-[#FFF0F7] text-[#FF70A6] shadow-sm font-bold')
                : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA] hover:bg-[#1E2338]' : 'text-[#7F7299] hover:text-[#3D354B] hover:bg-[#FFF6FB]')
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onNavigate('studies')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'studies'
                ? (isDark ? 'bg-[#2A3146] text-[#F4F5FA] shadow-sm' : 'bg-[#FFF0F7] text-[#FF70A6] shadow-sm font-bold')
                : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA] hover:bg-[#1E2338]' : 'text-[#7F7299] hover:text-[#3D354B] hover:bg-[#FFF6FB]')
            }`}
          >
            Estudos
          </button>
          <button
            onClick={() => onNavigate('flow')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flow'
                ? (isDark
                    ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] text-white shadow-[0_2px_12px_rgba(111,124,255,0.4)]'
                    : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] text-white shadow-[0_2px_12px_rgba(255,112,166,0.35)]')
                : (isDark ? 'text-[#8ED8FF] hover:bg-[#1E2338]' : 'text-[#FF70A6] hover:bg-[#FFF0F7]')
            }`}
          >
            <span className="text-base">🌊</span>
            <span>Flow</span>
          </button>
          <button
            onClick={() => onNavigate('stats')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'stats'
                ? (isDark ? 'bg-[#2A3146] text-[#F4F5FA] shadow-sm' : 'bg-[#FFF0F7] text-[#FF70A6] shadow-sm font-bold')
                : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA] hover:bg-[#1E2338]' : 'text-[#7F7299] hover:text-[#3D354B] hover:bg-[#FFF6FB]')
            }`}
          >
            Estatísticas
          </button>
          <button
            onClick={() => onNavigate('nex')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'nex'
                ? (isDark ? 'bg-[#2A3146] text-[#FF8EAB] shadow-sm' : 'bg-[#FFF0F7] text-[#FF70A6] shadow-sm font-bold')
                : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA] hover:bg-[#1E2338]' : 'text-[#7F7299] hover:text-[#3D354B] hover:bg-[#FFF6FB]')
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#FF8EAB]' : 'text-[#FF70A6]'}`} />
            <span>Nex IA</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? (isDark ? 'bg-[#2A3146] text-[#F4F5FA] shadow-sm' : 'bg-[#FFF0F7] text-[#FF70A6] shadow-sm font-bold')
                : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA] hover:bg-[#1E2338]' : 'text-[#7F7299] hover:text-[#3D354B] hover:bg-[#FFF6FB]')
            }`}
          >
            Perfil
          </button>
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* THEME TOGGLE BUTTON (Dark Masculino vs Rosa Feminino) */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Mudar para Modo Rosa (Feminino / Nuvem clássica)" : "Mudar para Modo Dark (Masculino / Nuvem com bigode)"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-[#15182B] border-[#2A3146] text-[#8ED8FF] hover:border-[#6F7CFF]'
                : 'bg-white border-[#F1D6E6] text-[#FF70A6] hover:border-[#FF70A6] shadow-xs'
            }`}
          >
            {isDark ? (
              <>
                <Moon className="w-3.5 h-3.5 text-[#8ED8FF]" />
                <span className="hidden sm:inline">Dark (Bigode)</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5 text-[#FF70A6] fill-[#FF70A6]" />
                <span className="hidden sm:inline">Rosa (Pastel)</span>
              </>
            )}
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={onToggleMute}
            title={soundMuted ? "Ativar som ambiente" : "Mutar som"}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-[#15182B] border-[#2A3146] text-[#8E9BB5] hover:text-[#F4F5FA] hover:border-[#6F7CFF]'
                : 'bg-white border-[#F1D6E6] text-[#7F7299] hover:text-[#3D354B] hover:border-[#FF70A6]'
            }`}
          >
            {soundMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className={`w-4 h-4 ${isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'}`} />
            )}
          </button>

          {/* Replay Intro Wave Animation */}
          <button
            onClick={onReplaySplash}
            title="Rever animação de abertura (N → Onda → Flow)"
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-[#15182B] border-[#2A3146] text-[#8E9BB5] hover:text-[#F4F5FA] hover:border-[#6F7CFF]'
                : 'bg-white border-[#F1D6E6] text-[#7F7299] hover:text-[#3D354B] hover:border-[#FF70A6]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Help / Guide */}
          <button
            onClick={onOpenOnboarding}
            title="Conceito do Flow & Guia"
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-[#15182B] border-[#2A3146] text-[#8E9BB5] hover:text-[#F4F5FA] hover:border-[#6F7CFF]'
                : 'bg-white border-[#F1D6E6] text-[#7F7299] hover:text-[#3D354B] hover:border-[#FF70A6]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Streak Badge */}
          <div 
            onClick={() => onNavigate('stats')}
            className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#15182B] border-[#2A3146] hover:border-[#FF8EAB]/50 text-[#F4F5FA]'
                : 'bg-white border-[#F1D6E6] hover:border-[#FF8EAB] text-[#3D354B] shadow-xs'
            }`}
            title="Sequência de estudos contínuos"
          >
            <Flame className={`w-4 h-4 ${isDark ? 'text-[#FF8EAB] fill-[#FF8EAB]/20' : 'text-[#FF70A6] fill-[#FF70A6]/30'}`} />
            <span className="text-xs font-bold">{user.streakDays}d</span>
          </div>

          {/* Flow Score Pill */}
          <div 
            onClick={() => onNavigate('stats')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-[#6F7CFF]/15 to-[#A78BFA]/15 border-[#6F7CFF]/30'
                : 'bg-gradient-to-r from-[#FF8EAB]/15 to-[#A78BFA]/15 border-[#FF8EAB]/40'
            }`}
            title="Seu Flow Score médio"
          >
            <span className={`text-xs font-medium ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>Flow</span>
            <span className={`text-xs font-extrabold ${isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'}`}>
              {user.averageFlowScore}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
