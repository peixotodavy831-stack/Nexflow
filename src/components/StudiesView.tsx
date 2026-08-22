import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, Play, CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react';
import { Subject, StudyGoal } from '../types';
import { useTheme } from '../context/ThemeContext';

interface StudiesViewProps {
  subjects: Subject[];
  goals: StudyGoal[];
  onStartFlow: (subjectId: string, subjectName: string, subjectColor: string, goalTitle: string, topic?: string) => void;
  onOpenCreateGoal: () => void;
  onToggleGoalComplete: (goalId: string) => void;
  onAddSubject: (name: string, category: string, color: string) => void;
}

export const StudiesView: React.FC<StudiesViewProps> = ({
  subjects,
  goals,
  onStartFlow,
  onOpenCreateGoal,
  onToggleGoalComplete,
  onAddSubject,
}) => {
  const { isDark, isRose } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(subjects[0]?.id || null);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState<boolean>(false);
  const [newSubjName, setNewSubjName] = useState<string>('');
  const [newSubjCategory, setNewSubjCategory] = useState<string>('Exatas');
  const [newSubjColor, setNewSubjColor] = useState<string>(isDark ? '#6F7CFF' : '#FF70A6');

  const categories = ['all', 'Exatas', 'Humanas', 'Biológicas', 'Tecnologia'];

  const filteredSubjects = selectedCategory === 'all'
    ? subjects
    : subjects.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleCreateSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjName.trim()) return;
    onAddSubject(newSubjName.trim(), newSubjCategory, newSubjColor);
    setNewSubjName('');
    setShowAddSubjectModal(false);
  };

  const colors = isDark 
    ? ['#6F7CFF', '#A78BFA', '#FF8EAB', '#8ED8FF', '#9DE0C0', '#FFC978']
    : ['#FF70A6', '#A78BFA', '#72D0F4', '#9DE0C0', '#FFC78A', '#B8A1FF'];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight flex items-center gap-2.5 ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            <BookOpen className={`w-7 h-7 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
            <span>Seus Estudos</span>
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
            Organize suas matérias, objetivos e trilhas de aprendizado no seu ritmo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddSubjectModal(true)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-[#15182B] hover:bg-[#1E2338] border-[#2A3146] text-[#8ED8FF]'
                : 'bg-white hover:bg-[#FFF0F7] border-[#F1D6E6] text-[#FF70A6] shadow-xs'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nova Matéria</span>
          </button>

          <button
            onClick={onOpenCreateGoal}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] hover:from-[#5B6BF0] hover:to-[#9675F7] shadow-[0_4px_16px_rgba(111,124,255,0.35)]'
                : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] hover:from-[#F25C96] hover:to-[#9675F7] shadow-[0_4px_16px_rgba(255,112,166,0.3)]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? (isDark
                    ? 'bg-[#2A3146] text-white shadow-sm ring-1 ring-[#6F7CFF]/50'
                    : 'bg-white text-[#FF70A6] shadow-sm ring-2 ring-[#FF70A6] font-extrabold')
                : (isDark
                    ? 'bg-[#15182B] text-[#8E9BB5] hover:text-[#F4F5FA] border border-[#2A3146]/50'
                    : 'bg-white text-[#7F7299] hover:text-[#3D354B] border border-[#F1D6E6]')
            }`}
          >
            {cat === 'all' ? 'Todas as Matérias' : cat}
          </button>
        ))}
      </div>

      {/* Subjects Accordion / Card List */}
      <div className="space-y-4">
        {filteredSubjects.map((subj) => {
          const isExpanded = expandedSubjectId === subj.id;
          const subjectGoals = goals.filter(g => g.subjectId === subj.id);

          return (
            <motion.div
              key={subj.id}
              className={`border rounded-3xl overflow-hidden shadow-sm transition-all ${
                isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
              }`}
            >
              {/* Subject Summary Header Bar */}
              <div
                onClick={() => setExpandedSubjectId(isExpanded ? null : subj.id)}
                className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-[#1A1E33]' : 'hover:bg-[#FFF9FC]'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg shrink-0 shadow-inner"
                    style={{
                      backgroundColor: `${subj.color}25`,
                      color: subj.color,
                      border: `1px solid ${subj.color}50`,
                    }}
                  >
                    {subj.name.substring(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                        {subj.name}
                      </h3>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full border ${
                        isDark ? 'text-[#8E9BB5] bg-[#0B0D1A] border-[#2A3146]' : 'text-[#7F7299] bg-[#FFF0F7] border-[#F1D6E6]'
                      }`}>
                        {subj.category}
                      </span>
                    </div>

                    <p className={`text-xs mt-0.5 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                      {subjectGoals.length} objetivo{subjectGoals.length !== 1 ? 's' : ''} • {Math.round(subj.totalTimeMinutes / 60)}h {subj.totalTimeMinutes % 60}m estudados
                    </p>
                  </div>
                </div>

                {/* Progress Visual Bar and Accordion Arrow */}
                <div className="flex items-center gap-4">
                  <div className="w-36 sm:w-48 space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className={isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}>Consolidação</span>
                      <span className={isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}>{subj.progress}%</span>
                    </div>
                    <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
                      isDark ? 'bg-[#0B0D1A] border-[#2A3146]/60' : 'bg-[#FFF0F7] border-[#F1D6E6]'
                    }`}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${subj.progress}%`,
                          backgroundColor: subj.color,
                        }}
                      />
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#0B0D1A] border-[#2A3146] text-[#8E9BB5]' : 'bg-[#FFF0F7] border-[#F1D6E6] text-[#7F7299]'
                  }`}>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detail View: Goals & Topics */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`border-t p-5 sm:p-6 space-y-5 ${
                      isDark ? 'border-[#2A3146]/60 bg-[#0B0D1A]/50' : 'border-[#F1D6E6] bg-[#FFF9FC]'
                    }`}
                  >
                    {/* Active Topics Pills */}
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                        isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
                      }`}>
                        Tópicos do Conteúdo
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {subj.topics.map((t, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-3 py-1 rounded-xl border ${
                              isDark ? 'bg-[#15182B] border-[#2A3146] text-[#D5DBE8]' : 'bg-white border-[#F1D6E6] text-[#4A4358]'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Goals List inside Subject */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
                        }`}>
                          Objetivos Específicos
                        </span>
                        <button
                          onClick={onOpenCreateGoal}
                          className={`text-xs font-bold flex items-center gap-1 cursor-pointer ${
                            isDark ? 'text-[#8ED8FF] hover:underline' : 'text-[#FF70A6] hover:underline'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Adicionar objetivo</span>
                        </button>
                      </div>

                      {subjectGoals.length === 0 ? (
                        <div className={`text-center py-6 rounded-2xl border ${
                          isDark ? 'bg-[#15182B] border-[#2A3146]/50 text-[#8E9BB5]' : 'bg-white border-[#F1D6E6] text-[#7F7299]'
                        }`}>
                          <p className="text-xs">
                            Nenhum objetivo cadastrado nesta matéria ainda.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {subjectGoals.map((goal) => (
                            <div
                              key={goal.id}
                              className={`border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                                isDark
                                  ? 'bg-[#15182B] border-[#2A3146] hover:border-[#6F7CFF]/40'
                                  : 'bg-white border-[#F1D6E6] hover:border-[#FF70A6]/40'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <button
                                  onClick={() => onToggleGoalComplete(goal.id)}
                                  className={`mt-0.5 transition-colors cursor-pointer ${
                                    isDark ? 'text-[#8E9BB5] hover:text-[#9DE0C0]' : 'text-[#7F7299] hover:text-[#34B584]'
                                  }`}
                                >
                                  {goal.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-[#34B584] fill-[#34B584]/20" />
                                  ) : (
                                    <Circle className="w-5 h-5" />
                                  )}
                                </button>
                                <div>
                                  <h4 className={`text-sm font-bold ${
                                    goal.completed 
                                      ? (isDark ? 'line-through text-[#8E9BB5]' : 'line-through text-[#A399B5]') 
                                      : (isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]')
                                  }`}>
                                    {goal.title}
                                  </h4>
                                  {goal.notes && (
                                    <p className={`text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                                      {goal.notes}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-end sm:self-center">
                                <span className={`text-xs font-semibold ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                                  {goal.progress}%
                                </span>
                                <button
                                  onClick={() => onStartFlow(subj.id, subj.name, subj.color, goal.title, subj.topics[0])}
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    isDark
                                      ? 'bg-[#2A3146] hover:bg-[#6F7CFF] text-[#F4F5FA] hover:text-white'
                                      : 'bg-[#FFF0F7] hover:bg-[#FF70A6] text-[#FF70A6] hover:text-white'
                                  }`}
                                >
                                  <Play className="w-3 h-3 fill-current" />
                                  <span>Entrar no Flow</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Modal: Adicionar Matéria */}
      <AnimatePresence>
        {showAddSubjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md border rounded-3xl p-6 sm:p-8 shadow-2xl ${
                isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
              }`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                Criar Nova Matéria
              </h3>

              <form onSubmit={handleCreateSubjectSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
                  }`}>
                    Nome da Matéria
                  </label>
                  <input
                    type="text"
                    required
                    value={newSubjName}
                    onChange={(e) => setNewSubjName(e.target.value)}
                    placeholder="Ex: Química Orgânica"
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
                    Área do Conhecimento
                  </label>
                  <select
                    value={newSubjCategory}
                    onChange={(e) => setNewSubjCategory(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl text-sm outline-none cursor-pointer border ${
                      isDark
                        ? 'bg-[#0B0D1A] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA]'
                        : 'bg-[#FFF6FB] border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B]'
                    }`}
                  >
                    <option value="Exatas">Exatas</option>
                    <option value="Humanas">Humanas</option>
                    <option value="Biológicas">Biológicas</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Linguagens">Linguagens</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
                  }`}>
                    Cor de Destaque
                  </label>
                  <div className="flex items-center gap-3">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setNewSubjColor(c)}
                        className={`w-8 h-8 rounded-full transition-transform cursor-pointer ${
                          newSubjColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className={`flex justify-end gap-3 pt-4 border-t ${
                  isDark ? 'border-[#2A3146]/60' : 'border-[#F1D6E6]'
                }`}>
                  <button
                    type="button"
                    onClick={() => setShowAddSubjectModal(false)}
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
                      isDark ? 'bg-[#6F7CFF] hover:bg-[#5B6BF0]' : 'bg-[#FF70A6] hover:bg-[#F25C96]'
                    }`}
                  >
                    Criar Matéria
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
