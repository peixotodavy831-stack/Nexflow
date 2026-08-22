import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Zap, Award } from 'lucide-react';
import { FlowSession } from '../types';
import { NexMascot } from './NexMascot';
import { useTheme } from '../context/ThemeContext';

interface SessionCompletedViewProps {
  session: FlowSession;
  onGoHome: () => void;
  onGoStats: () => void;
}

export const SessionCompletedView: React.FC<SessionCompletedViewProps> = ({
  session,
  onGoHome,
  onGoStats,
}) => {
  const { isDark, isRose } = useTheme();
  const durationMin = Math.max(1, Math.round(session.durationSeconds / 60));

  useEffect(() => {
    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
        colors: isDark
          ? ['#6F7CFF', '#A78BFA', '#FFC978', '#8ED8FF', '#FF8EAB']
          : ['#FF70A6', '#A78BFA', '#FFC78A', '#72D0F4', '#9DE0C0'],
      });
    } catch (e) {}
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 select-none transition-colors ${
      isDark ? 'bg-[#0B0D1A]' : 'bg-[#FFF6FB]'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}
      >
        {/* Glow ambient backdrops */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#6F7CFF]/25' : 'bg-[#FF8EAB]/20'
        }`} />
        <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#A78BFA]/20' : 'bg-[#72D0F4]/20'
        }`} />

        {/* Celebrating Mascot */}
        <div className="flex justify-center mb-2">
          <NexMascot
            mood="celebrating"
            size="lg"
            withSpeechBubble={false}
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
            isDark
              ? 'bg-[#FFC978]/15 border-[#FFC978]/30 text-[#FFC978]'
              : 'bg-[#FFF0F7] border-[#FF8EAB]/40 text-[#FF70A6]'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sessão concluída com sucesso!</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            Você entrou em um ótimo Flow.
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${
            isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
          }`}>
            {session.subjectName} • {session.goalTitle}
          </p>
        </div>

        {/* Main Score Dashboard Metrics */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          {/* Flow Score Card */}
          <div className={`border rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden ${
            isDark ? 'bg-[#0B0D1A]/90 border-[#2A3146]' : 'bg-[#FFF6FB] border-[#F1D6E6]'
          }`}>
            <div className="relative w-20 h-20 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className={isDark ? "text-[#2A3146]" : "text-[#F1D6E6]"}
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={isDark ? "text-[#6F7CFF]" : "text-[#FF70A6]"}
                  strokeDasharray={`${session.flowScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-xl font-black ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                  {session.flowScore}
                </span>
                <span className={`text-[9px] font-bold ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                  /100
                </span>
              </div>
            </div>
            <span className={`text-xs font-bold ${isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'}`}>
              Flow Score
            </span>
            <span className={`text-[10px] ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              Métrica de ritmo mental
            </span>
          </div>

          {/* Time & Focus Summary */}
          <div className="space-y-3.5 flex flex-col justify-between">
            {/* Total Time */}
            <div className={`border rounded-2xl p-3.5 ${
              isDark ? 'bg-[#0B0D1A]/90 border-[#2A3146]' : 'bg-[#FFF6FB] border-[#F1D6E6]'
            }`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
              }`}>
                Tempo Total
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-2xl font-black ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                  {durationMin}
                </span>
                <span className={`text-xs font-semibold ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                  min
                </span>
              </div>
            </div>

            {/* Productive Focus */}
            <div className={`border rounded-2xl p-3.5 ${
              isDark ? 'bg-[#0B0D1A]/90 border-[#2A3146]' : 'bg-[#FFF6FB] border-[#F1D6E6]'
            }`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
              }`}>
                Foco Produtivo
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-2xl font-black ${isDark ? 'text-[#9DE0C0]' : 'text-[#34B584]'}`}>
                  {session.focusScore}%
                </span>
                <span className={`text-[10px] font-semibold ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                  estável
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Session Breakdown */}
        <div className={`border rounded-2xl p-4 mb-6 space-y-2.5 ${
          isDark ? 'bg-[#0B0D1A]/60 border-[#2A3146]/70' : 'bg-[#FFF6FB] border-[#F1D6E6]'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34B584]" />
              Objetivo Concluído
            </span>
            <span className={`font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              {session.goalTitle}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
              Horário da Sessão
            </span>
            <span className={`font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              {session.startTime} - {session.endTime}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              <Zap className="w-3.5 h-3.5 text-[#FFC78A]" />
              Pausas registradas
            </span>
            <span className={`font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              {session.pausesCount === 0 ? 'Nenhuma (Fluxo contínuo)' : `${session.pausesCount} pausa(s)`}
            </span>
          </div>

          {session.notes && (
            <div className={`pt-2 border-t text-xs ${isDark ? 'border-[#2A3146]/60' : 'border-[#F1D6E6]'}`}>
              <span className={`block mb-1 font-semibold ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                Sua anotação rápida:
              </span>
              <p className={`italic p-2 rounded-xl border ${
                isDark ? 'text-[#D5DBE8] bg-[#15182B] border-[#2A3146]' : 'text-[#4A4358] bg-white border-[#F1D6E6]'
              }`}>
                "{session.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onGoHome}
            className={`w-full flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm transition-all cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] hover:from-[#5B6BF0] hover:to-[#9675F7] shadow-[0_4px_20px_rgba(111,124,255,0.4)]'
                : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] hover:from-[#F25C96] hover:to-[#9675F7] shadow-[0_4px_20px_rgba(255,112,166,0.35)]'
            }`}
          >
            <span>Concluir e Voltar ao Início</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoStats}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-[#0B0D1A] hover:bg-[#1E2338] border-[#2A3146] text-[#8ED8FF]'
                : 'bg-white hover:bg-[#FFF0F7] border-[#F1D6E6] text-[#FF70A6]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Ver Estatísticas</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
