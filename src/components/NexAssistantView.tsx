import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Play, CheckCircle2, Loader2 } from 'lucide-react';
import { NexChatMessage, Subject, StudyGoal } from '../types';
import { NexMascot } from './NexMascot';
import { useTheme } from '../context/ThemeContext';

interface NexAssistantViewProps {
  subjects: Subject[];
  goals: StudyGoal[];
  onStartFlow: (subjectId: string, subjectName: string, subjectColor: string, goalTitle: string, topic?: string) => void;
}

export const NexAssistantView: React.FC<NexAssistantViewProps> = ({
  subjects,
  goals,
  onStartFlow,
}) => {
  const { isDark, isRose } = useTheme();
  const [messages, setMessages] = useState<NexChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'nex',
      text: isDark 
        ? 'Olá. Eu sou o Nex. Diga qual é seu desafio atual ou objetivo que eu monto uma sessão de Flow objetiva e sem enrolação.'
        : 'Olá! Eu sou o Nex, seu companheiro de estudos. Diga qual assunto ou desafio você quer destravar hoje e vamos montar um Flow super leve e focado! ✨',
      timestamp: 'Agora',
      breakdownTasks: [
        'Organizar matérias e pendências',
        'Dividir metas complexas em blocos de 30–45 min',
        'Explicar conceitos difíceis de forma direta'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Tenho prova sexta e não sei por onde começar.',
    'Divida uma tarefa grande em 3 blocos de Flow.',
    'Explique Função Quadrática e o cálculo do Vértice.',
    'Qual a melhor matéria para eu estudar agora?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    const userMsg: NexChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/nex-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: query,
          currentSubject: subjects[0]?.name || 'Matemática',
          currentGoals: goals.map(g => g.title),
        }),
      });

      const data = await res.json();

      const nexMsg: NexChatMessage = {
        id: `nex_${Date.now()}`,
        sender: 'nex',
        text: data.reply || 'Vamos simplificar. Sugiro iniciarmos uma sessão agora.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: data.suggestedAction,
        breakdownTasks: data.breakdownTasks,
      };

      setMessages((prev) => [...prev, nexMsg]);
    } catch (e) {
      // Fallback
      const fallbackMsg: NexChatMessage = {
        id: `nex_${Date.now()}`,
        sender: 'nex',
        text: 'Vamos simplificar. O melhor caminho agora é focar em uma única meta por 35 minutos para entrar no Flow.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'start_flow',
          subjectName: 'Matemática',
          goalTitle: 'Sessão Focada com Nex',
          suggestedDurationMin: 35
        },
        breakdownTasks: [
          'Passo 1: Revisar tópicos fundamentais (10 min)',
          'Passo 2: Resolver 5 exercícios práticos (20 min)',
          'Passo 3: Mapear dúvidas (5 min)'
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerAction = (action: NonNullable<NexChatMessage['suggestedAction']>) => {
    const subj = subjects.find(s => s.name.toLowerCase() === action.subjectName.toLowerCase()) || subjects[0];
    onStartFlow(subj.id, subj.name, subj.color, action.goalTitle, subj.topics[0]);
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)]">
      {/* Header */}
      <div className={`flex items-center justify-between pt-2 border-b pb-4 ${
        isDark ? 'border-[#2A3146]/60' : 'border-[#F1D6E6]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm border ${
            isDark ? 'bg-[#FF8EAB]/15 border-[#FF8EAB]/30 text-[#FF8EAB]' : 'bg-[#FFF0F7] border-[#FF8EAB]/40 text-[#FF70A6]'
          }`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-2xl font-extrabold tracking-tight flex items-center gap-2 ${
              isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
            }`}>
              <span>Nex</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                isDark ? 'bg-[#2A3146] text-[#8ED8FF]' : 'bg-[#FFF0F7] text-[#FF70A6]'
              }`}>
                IA de Estudos
              </span>
            </h1>
            <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              Roteiros objetivos, divisão de tarefas e clareza para entrar no Flow.
            </p>
          </div>
        </div>

        <NexMascot mood="focused" size="sm" withSpeechBubble={false} />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => {
          const isNex = msg.sender === 'nex';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isNex ? 'justify-start' : 'justify-end'}`}
            >
              {isNex && (
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-1 ${
                  isDark ? 'bg-[#2A3146] border-[#6F7CFF]/40 text-[#8ED8FF]' : 'bg-white border-[#FF8EAB]/50 text-[#FF70A6]'
                }`}>
                  <span className="text-xs font-black">N</span>
                </div>
              )}

              <div
                className={`max-w-xl rounded-3xl p-4 sm:p-5 text-sm shadow-sm ${
                  isNex
                    ? (isDark
                        ? 'bg-[#15182B] border border-[#2A3146] text-[#F4F5FA]'
                        : 'bg-white border border-[#F1D6E6] text-[#4A4358]')
                    : (isDark
                        ? 'bg-gradient-to-r from-[#6F7CFF] to-[#8B74FF] text-white'
                        : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] text-white')
                }`}
              >
                <p className="leading-relaxed font-medium whitespace-pre-wrap">
                  {msg.text}
                </p>

                {/* Breakdown tasks if provided by Nex */}
                {isNex && msg.breakdownTasks && msg.breakdownTasks.length > 0 && (
                  <div className={`mt-3.5 pt-3 border-t space-y-2 p-3 rounded-2xl ${
                    isDark ? 'border-[#2A3146]/80 bg-[#0B0D1A]/50' : 'border-[#F1D6E6] bg-[#FFF9FC]'
                  }`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                      isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
                    }`}>
                      Roteiro Sugerido:
                    </span>
                    {msg.breakdownTasks.map((t, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs ${
                        isDark ? 'text-[#D5DBE8]' : 'text-[#5A5268]'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34B584] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct Action Button to jump straight into Flow */}
                {isNex && msg.suggestedAction && (
                  <div className="mt-4 pt-2">
                    <button
                      onClick={() => handleTriggerAction(msg.suggestedAction!)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-extrabold shadow-md cursor-pointer transition-all active:scale-95 ${
                        isDark
                          ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] hover:from-[#5B6BF0] hover:to-[#9675F7]'
                          : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] hover:from-[#F25C96] hover:to-[#9675F7]'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Iniciar Flow: {msg.suggestedAction.goalTitle} ({msg.suggestedAction.suggestedDurationMin} min)</span>
                    </button>
                  </div>
                )}

                <span className="text-[10px] opacity-60 block mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#2A3146] border-[#6F7CFF]/40 text-[#8ED8FF]' : 'bg-white border-[#FF8EAB]/50 text-[#FF70A6]'
            }`}>
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className={`border px-4 py-3 rounded-2xl text-xs flex items-center gap-2 ${
              isDark ? 'bg-[#15182B] border-[#2A3146] text-[#8E9BB5]' : 'bg-white border-[#F1D6E6] text-[#7F7299]'
            }`}>
              <span>Nex está organizando seu plano...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Fast Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              isDark
                ? 'bg-[#15182B] hover:bg-[#2A3146] border-[#2A3146] text-[#8ED8FF]'
                : 'bg-white hover:bg-[#FFF0F7] border-[#F1D6E6] text-[#FF70A6]'
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Peça um roteiro, divida uma tarefa ou tire uma dúvida..."
          className={`w-full text-sm font-medium px-4 py-3.5 rounded-2xl outline-none pr-14 shadow-inner border ${
            isDark
              ? 'bg-[#15182B] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA] placeholder-[#5A6585]'
              : 'bg-white border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B] placeholder-[#A399B5]'
          }`}
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isLoading}
          className={`absolute right-2.5 w-10 h-10 rounded-xl text-white flex items-center justify-center transition-all cursor-pointer ${
            isDark
              ? 'bg-[#6F7CFF] hover:bg-[#5B6BF0] disabled:opacity-40'
              : 'bg-[#FF70A6] hover:bg-[#F25C96] disabled:opacity-40'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
