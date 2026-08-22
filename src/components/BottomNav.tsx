import React from 'react';
import { Home, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onStartFlowDirectly?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  onStartFlowDirectly,
}) => {
  const { isDark, isRose } = useTheme();

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t px-2 py-1.5 safe-area-bottom transition-colors ${
      isDark
        ? 'bg-[#0B0D1A]/95 border-[#2A3146]/80'
        : 'bg-[#FFF6FB]/95 border-[#F1D6E6]'
    }`}>
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Início */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? (isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6] font-bold')
              : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Início</span>
        </button>

        {/* Estudos */}
        <button
          onClick={() => onNavigate('studies')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'studies'
              ? (isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6] font-bold')
              : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Estudos</span>
        </button>

        {/* Central Flow Button */}
        <div className="relative -top-4">
          <button
            onClick={() => {
              if (onStartFlowDirectly) {
                onStartFlowDirectly();
              } else {
                onNavigate('flow');
              }
            }}
            className={`w-14 h-14 rounded-full p-0.5 flex items-center justify-center transition-transform hover:scale-105 active:scale-90 cursor-pointer ${
              isDark
                ? 'bg-gradient-to-tr from-[#6F7CFF] via-[#A78BFA] to-[#8ED8FF] shadow-[0_8px_25px_rgba(111,124,255,0.6)]'
                : 'bg-gradient-to-tr from-[#FF70A6] via-[#A78BFA] to-[#72D0F4] shadow-[0_8px_25px_rgba(255,112,166,0.5)]'
            }`}
          >
            <div className={`w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden group ${
              isDark ? 'bg-[#15182B] text-white' : 'bg-white text-[#3D354B]'
            }`}>
              <div className={`absolute inset-0 transition-opacity ${
                isDark 
                  ? 'bg-gradient-to-tr from-[#6F7CFF]/30 to-[#A78BFA]/30' 
                  : 'bg-gradient-to-tr from-[#FF8EAB]/30 to-[#BEE7F6]/30'
              }`} />
              {/* Wave SVG Icon */}
              <svg viewBox="0 0 32 32" className={`w-6 h-6 relative z-10 fill-none stroke-current stroke-2 ${
                isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
              }`}>
                <path d="M4 16 C8 10, 12 22, 16 16 C20 10, 24 22, 28 16" strokeLinecap="round" />
              </svg>
              <span className={`text-[9px] font-extrabold tracking-wider uppercase relative z-10 -mt-0.5 ${
                isDark ? 'text-[#F4F5FA]' : 'text-[#FF70A6]'
              }`}>
                Flow
              </span>
            </div>
          </button>
        </div>

        {/* Estatísticas */}
        <button
          onClick={() => onNavigate('stats')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'stats'
              ? (isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6] font-bold')
              : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Seu Flow</span>
        </button>

        {/* Nex IA */}
        <button
          onClick={() => onNavigate('nex')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'nex'
              ? (isDark ? 'text-[#FF8EAB]' : 'text-[#FF70A6] font-bold')
              : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${isDark ? 'text-[#FF8EAB]' : 'text-[#FF70A6]'}`} />
          <span className="text-[10px] font-bold">Nex IA</span>
        </button>
      </div>
    </div>
  );
};
