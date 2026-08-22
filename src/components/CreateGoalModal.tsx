import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, X } from 'lucide-react';
import { Subject, StudyGoal } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  onCreateGoal: (newGoal: Omit<StudyGoal, 'id'>) => void;
}

export const CreateGoalModal: React.FC<CreateGoalModalProps> = ({
  isOpen,
  onClose,
  subjects,
  onCreateGoal,
}) => {
  const { isDark, isRose } = useTheme();
  const [subjectId, setSubjectId] = useState<string>(subjects[0]?.id || 'subj_math');
  const [title, setTitle] = useState<string>('');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(45);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const selectedSubject = subjects.find(s => s.id === subjectId) || subjects[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateGoal({
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      subjectColor: selectedSubject.color,
      title: title.trim(),
      progress: 0,
      completed: false,
      estimatedMinutes,
      studiedMinutes: 0,
      notes: notes.trim(),
      lastStudied: 'Criado agora',
    });

    setTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-md border rounded-3xl p-6 sm:p-8 shadow-2xl relative ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${
              isDark ? 'bg-[#6F7CFF]/15 border-[#6F7CFF]/30 text-[#8ED8FF]' : 'bg-[#FFF0F7] border-[#FF8EAB]/40 text-[#FF70A6]'
            }`}>
              <Target className="w-4 h-4" />
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              Novo Objetivo de Estudo
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#0B0D1A] border-[#2A3146] text-[#8E9BB5] hover:text-[#F4F5FA]'
                : 'bg-[#FFF6FB] border-[#F1D6E6] text-[#7F7299] hover:text-[#3D354B]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
            }`}>
              Matéria
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none cursor-pointer border ${
                isDark
                  ? 'bg-[#0B0D1A] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA]'
                  : 'bg-[#FFF6FB] border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B]'
              }`}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
            }`}>
              O que você vai estudar?
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Resolver 15 exercícios de Função Quadrática"
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none border ${
                isDark
                  ? 'bg-[#0B0D1A] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA]'
                  : 'bg-[#FFF6FB] border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
            }`}>
              Tempo Estimado (minutos)
            </label>
            <div className="flex items-center gap-2">
              {[25, 35, 45, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setEstimatedMinutes(mins)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    estimatedMinutes === mins
                      ? (isDark ? 'bg-[#6F7CFF] text-white shadow-sm' : 'bg-[#FF70A6] text-white shadow-sm')
                      : (isDark
                          ? 'bg-[#0B0D1A] text-[#8E9BB5] hover:text-[#F4F5FA] border border-[#2A3146]'
                          : 'bg-[#FFF6FB] text-[#7F7299] hover:text-[#3D354B] border border-[#F1D6E6]')
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
              isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
            }`}>
              Anotações / Fórmulas chave (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Focar nas raízes e cálculo do discriminante delta."
              rows={2}
              className={`w-full px-4 py-2.5 rounded-xl text-xs outline-none resize-none border ${
                isDark
                  ? 'bg-[#0B0D1A] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA]'
                  : 'bg-[#FFF6FB] border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B]'
              }`}
            />
          </div>

          <div className={`flex justify-end gap-3 pt-4 border-t ${
            isDark ? 'border-[#2A3146]/60' : 'border-[#F1D6E6]'
          }`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                isDark
                  ? 'bg-[#0B0D1A] border-[#2A3146] text-[#8E9BB5]'
                  : 'bg-[#FFF6FB] border-[#F1D6E6] text-[#7F7299]'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] hover:from-[#5B6BF0] hover:to-[#9675F7]'
                  : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] hover:from-[#F25C96] hover:to-[#9675F7]'
              }`}
            >
              Salvar Objetivo
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
