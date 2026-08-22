import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Plus, Clock, Target, ArrowRight, Sparkles, CheckCircle2, ChevronRight, BookOpen, Flame } from 'lucide-react';
import { UserProfile, Subject, StudyGoal } from '../types';
import { NexMascot } from './NexMascot';
import { useTheme } from '../context/ThemeContext';

interface HomeScreenProps {
  user: UserProfile;
  subjects: Subject[];
  goals: StudyGoal[];
  onStartFlow: (subjectId: string, subjectName: string, subjectColor: string, goalTitle: string, topic?: string) => void;
  onNavigate: (tab: string) => void;
  onOpenCreateGoal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  subjects,
  goals,
  onStartFlow,
  onNavigate,
  onOpenCreateGoal,
}) => {
  const { isDark, isRose } = useTheme();
  const [customGoalText, setCustomGoalText] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'subj_math');

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    const goalTitle = customGoalText.trim() || selectedSubject.activeGoal || 'Estudo Focado';
    onStartFlow(
      selectedSubject.id,
      selectedSubject.name,
      selectedSubject.color,
      goalTitle,
      selectedSubject.topics[0] || selectedSubject.name
    );
  };

  const handleContinueGoal = (goal: StudyGoal) => {
    onStartFlow(
      goal.subjectId,
      goal.subjectName,
      goal.subjectColor,
      goal.title,
      goal.subjectName
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2 ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            <span>Olá, {user.name}</span>
            <span className="animate-pulse">👋</span>
          </h1>
          <p className={`text-base font-medium mt-1 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
            {isDark 
              ? 'Pronto para entrar no Flow? Mente blindada e foco profundo.' 
              : 'Seu espaço de estudo leve, organizado e profundo. Vamos fluir? ✨'}
          </p>
        </div>

        {/* Mascot Greeting Badge */}
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-sm ${
          isDark 
            ? 'bg-[#15182B] border-[#2A3146]' 
            : 'bg-white border-[#F1D6E6]'
        }`}>
          <NexMascot mood="calm" size="sm" withSpeechBubble={false} />
          <div className="text-left">
            <span className={`text-[11px] font-bold uppercase tracking-wider block ${
              isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
            }`}>
              Mascote Nex
            </span>
            <span className={`text-xs font-medium ${isDark ? 'text-[#D5DBE8]' : 'text-[#4A4358]'}`}>
              {isDark ? '"Foco sem sofrimento hoje."' : '"Estudo leve e produtivo hoje!" 🌸'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Flow Launcher Hero Box (O que vamos estudar hoje?) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative rounded-3xl p-6 sm:p-8 border overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#15182B] via-[#15182B] to-[#1F243B] border-[#2A3146] shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
            : 'bg-gradient-to-br from-[#FFFFFF] via-[#FFF5FA] to-[#FFF0F7] border-[#F1D6E6] shadow-[0_12px_40px_rgba(255,142,171,0.15)]'
        }`}
      >
        {/* Ambient background glows */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-bl from-[#6F7CFF]/15 to-[#A78BFA]/10' 
            : 'bg-gradient-to-bl from-[#FF8EAB]/20 to-[#BEE7F6]/20'
        }`} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#6F7CFF]' : 'bg-[#FF70A6]'}`} />
            <span className={`text-xs font-extrabold uppercase tracking-widest ${
              isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
            }`}>
              Sua Sessão Agora
            </span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            O que vamos estudar hoje?
          </h2>

          <form onSubmit={handleQuickStart} className="space-y-4">
            {/* Subject Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {subjects.map((subj) => {
                const isSelected = subj.id === selectedSubjectId;
                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => setSelectedSubjectId(subj.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? (isDark
                            ? 'bg-[#2A3146] text-white ring-2 ring-[#6F7CFF] shadow-sm'
                            : 'bg-white text-[#FF70A6] ring-2 ring-[#FF70A6] shadow-sm font-black')
                        : (isDark
                            ? 'bg-[#0B0D1A]/80 text-[#8E9BB5] hover:text-[#F4F5FA] border border-[#2A3146]/60'
                            : 'bg-white/80 text-[#7F7299] hover:text-[#3D354B] border border-[#F1D6E6]')
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: subj.color }}
                    />
                    <span>{subj.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Target Goal Input Field */}
            <div className="relative">
              <input
                type="text"
                value={customGoalText}
                onChange={(e) => setCustomGoalText(e.target.value)}
                placeholder={`Ex: Resolver 15 questões de ${selectedSubject.name}...`}
                className={`w-full text-base sm:text-lg font-semibold px-4 py-4 rounded-2xl outline-none transition-all pr-12 shadow-inner border ${
                  isDark
                    ? 'bg-[#0B0D1A] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA] placeholder-[#5A6585]'
                    : 'bg-white border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B] placeholder-[#A399B5]'
                }`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Target className={`w-5 h-5 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
              </div>
            </div>

            {/* Action Buttons: Entrar no Flow + Sugestão da IA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-white font-extrabold text-base tracking-wide transition-all transform active:scale-98 cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-r from-[#6F7CFF] via-[#8B74FF] to-[#A78BFA] hover:from-[#5B6BF0] hover:to-[#9675F7] shadow-[0_6px_25px_rgba(111,124,255,0.45)]'
                    : 'bg-gradient-to-r from-[#FF70A6] via-[#A78BFA] to-[#72D0F4] hover:from-[#F25C96] hover:to-[#5DC3EC] shadow-[0_6px_25px_rgba(255,112,166,0.35)]'
                }`}
              >
                <span className="text-lg">🌊</span>
                <span>ENTRAR NO FLOW</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('nex')}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#15182B] hover:bg-[#1E2338] border-[#2A3146] text-[#FF8EAB]'
                    : 'bg-white hover:bg-[#FFF0F7] border-[#F1D6E6] text-[#FF70A6]'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#FF8EAB]' : 'text-[#FF70A6]'}`} />
                <span>Pedir Roteiro para Nex</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Section: Continuar Estudando (Cards de Objetivos Ativos) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
              isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
            }`}>
              <BookOpen className={`w-5 h-5 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
              <span>Continuar estudando</span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              Retome seus objetivos exatamente de onde parou
            </p>
          </div>

          <button
            onClick={onOpenCreateGoal}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'text-[#8ED8FF] hover:text-white bg-[#15182B] hover:bg-[#1E2338] border-[#2A3146]'
                : 'text-[#FF70A6] hover:text-[#3D354B] bg-white hover:bg-[#FFF0F7] border-[#F1D6E6]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo objetivo</span>
          </button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              whileHover={{ y: -2 }}
              className={`rounded-2xl p-5 flex flex-col justify-between transition-all border shadow-sm group ${
                isDark
                  ? 'bg-[#15182B] border-[#2A3146] hover:border-[#6F7CFF]/50'
                  : 'bg-white border-[#F1D6E6] hover:border-[#FF70A6]/50'
              }`}
            >
              <div>
                {/* Header: Subject badge & Last studied */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${goal.subjectColor}20`,
                      color: goal.subjectColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: goal.subjectColor }}
                    />
                    {goal.subjectName}
                  </span>

                  {goal.lastStudied && (
                    <span className={`text-[11px] flex items-center gap-1 ${
                      isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {goal.lastStudied}
                    </span>
                  )}
                </div>

                {/* Goal Title */}
                <h4 className={`text-base font-bold transition-colors line-clamp-2 mb-3 ${
                  isDark
                    ? 'text-[#F4F5FA] group-hover:text-[#8ED8FF]'
                    : 'text-[#3D354B] group-hover:text-[#FF70A6]'
                }`}>
                  {goal.title}
                </h4>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}>Progresso</span>
                    <span className={isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}>{goal.progress}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden border ${
                    isDark ? 'bg-[#0B0D1A] border-[#2A3146]/50' : 'bg-[#FFF0F7] border-[#F1D6E6]'
                  }`}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${goal.progress}%`,
                        backgroundColor: goal.subjectColor,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer: Study time info & Quick continue button */}
              <div className={`flex items-center justify-between pt-3 border-t ${
                isDark ? 'border-[#2A3146]/60' : 'border-[#F1D6E6]/80'
              }`}>
                <span className={`text-xs font-medium ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                  {goal.studiedMinutes} min estudados
                </span>

                <button
                  onClick={() => handleContinueGoal(goal)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#2A3146] group-hover:bg-[#6F7CFF] text-[#F4F5FA] group-hover:text-white'
                      : 'bg-[#FFF0F7] group-hover:bg-[#FF70A6] text-[#FF70A6] group-hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Continuar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy banner / Minimal reminder */}
      <div className={`rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border ${
        isDark
          ? 'bg-[#15182B]/60 border-[#2A3146]/80'
          : 'bg-white border-[#F1D6E6]'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
            isDark
              ? 'bg-[#6F7CFF]/15 border-[#6F7CFF]/30'
              : 'bg-[#FF8EAB]/15 border-[#FF8EAB]/30'
          }`}>
            〰️
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              {isDark ? 'O Flow é o produto, não um timer enfeitado' : 'Estudar com leveza e foco profundo'}
            </h4>
            <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              {isDark ? 'Foco é poder. Menos distração, mais evolução real.' : 'Menos pressão, mais Flow. Seu ritmo te leva mais longe.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('stats')}
          className={`inline-flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer shrink-0 ${
            isDark ? 'text-[#8ED8FF] hover:text-white' : 'text-[#FF70A6] hover:text-[#3D354B]'
          }`}
        >
          <span>Ver sua evolução</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
