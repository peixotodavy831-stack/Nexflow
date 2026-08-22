import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Zap, Target, Flame } from 'lucide-react';
import { NexMascot } from './NexMascot';
import { MascotMood } from '../types';
import { useTheme } from '../context/ThemeContext';

interface OnboardingModalProps {
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const { isDark, isRose } = useTheme();
  const [slide, setSlide] = useState<number>(0);

  const slides = [
    {
      title: 'Foco real, sem distrações',
      subtitle: 'Mais concentração, clareza e imersão. Sem complicação, sem desculpas.',
      mascotMood: 'focused' as MascotMood,
      icon: Target,
      tag: 'FOCO PROFUNDO',
      points: [
        'Cronômetro progressivo que liberta da ansiedade do tempo restante',
        'Ambiente visual limpo que desaparece enquanto você estuda',
        'Paisagens sonoras relaxantes geradas especialmente para o Flow'
      ]
    },
    {
      title: 'Dados que te ajudam a evoluir',
      subtitle: 'Entenda seus padrões mentais e descubra seus melhores horários.',
      mascotMood: 'deep_flow' as MascotMood,
      icon: Zap,
      tag: 'PROGRESSO INTELIGENTE',
      points: [
        'Métrica orientativa de Flow Score calculada em cada sessão',
        'Registro de consistência sem pressão de competição tóxica',
        'Histórico claro da sua evolução por matéria e assunto'
      ]
    },
    {
      title: 'Rotina leve, mente no modo certo',
      subtitle: 'O NexFlow transforma o estudo em um momento agradável e profundo.',
      mascotMood: 'celebrating' as MascotMood,
      icon: Flame,
      tag: 'CONSTÂNCIA & EQUILÍBRIO',
      points: [
        'Organização intuitiva de matérias e objetivos diários',
        'Assistente Nex para quebrar tarefas difíceis e sugerir roteiros',
        'Conquistas discretas que valorizam sua persistência real'
      ]
    }
  ];

  const current = slides[slide];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}
      >
        {/* Glow effect */}
        <div className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#6F7CFF]/20' : 'bg-[#FF8EAB]/20'
        }`} />
        <div className={`absolute -bottom-24 -left-24 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#A78BFA]/20' : 'bg-[#72D0F4]/20'
        }`} />

        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
            isDark
              ? 'bg-[#2A3146]/70 border-[#6F7CFF]/40 text-[#8ED8FF]'
              : 'bg-[#FFF0F7] border-[#FF8EAB]/40 text-[#FF70A6]'
          }`}>
            <current.icon className="w-3.5 h-3.5" />
            {current.tag}
          </span>
          <button
            onClick={onComplete}
            className={`text-xs font-medium transition-colors cursor-pointer ${
              isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]'
            }`}
          >
            Pular
          </button>
        </div>

        {/* Mascot Center Stage */}
        <div className="flex justify-center my-4 py-2">
          <NexMascot mood={current.mascotMood} size="lg" withSpeechBubble={false} />
        </div>

        {/* Slide Content */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 tracking-tight ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            {current.title}
          </h2>
          <p className={`text-sm leading-relaxed max-w-md mx-auto ${
            isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
          }`}>
            {current.subtitle}
          </p>
        </div>

        {/* Benefit bullet list */}
        <div className={`space-y-2.5 mb-8 border rounded-2xl p-4 ${
          isDark ? 'bg-[#0B0D1A]/60 border-[#2A3146]/70' : 'bg-[#FFF6FB] border-[#F1D6E6]'
        }`}>
          {current.points.map((pt, idx) => (
            <div key={idx} className={`flex items-start gap-2.5 text-left text-xs sm:text-sm ${
              isDark ? 'text-[#D5DBE8]' : 'text-[#4A4358]'
            }`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                isDark ? 'bg-[#6F7CFF]/20 text-[#8ED8FF]' : 'bg-[#FF70A6]/20 text-[#FF70A6]'
              }`}>
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className="leading-snug">{pt}</span>
            </div>
          ))}
        </div>

        {/* Footer with steps and action button */}
        <div className={`flex items-center justify-between pt-2 border-t ${
          isDark ? 'border-[#2A3146]/50' : 'border-[#F1D6E6]'
        }`}>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  slide === i 
                    ? (isDark ? 'w-6 bg-[#6F7CFF]' : 'w-6 bg-[#FF70A6]') 
                    : (isDark ? 'w-2 bg-[#2A3146]' : 'w-2 bg-[#F1D6E6]')
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm transition-all transform active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] hover:from-[#5C6BF0] hover:to-[#9675F7] shadow-[0_4px_16px_rgba(111,124,255,0.4)]'
                : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] hover:from-[#F25C96] hover:to-[#9675F7] shadow-[0_4px_16px_rgba(255,112,166,0.35)]'
            }`}
          >
            <span>{slide === slides.length - 1 ? 'Começar agora' : 'Próximo'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
