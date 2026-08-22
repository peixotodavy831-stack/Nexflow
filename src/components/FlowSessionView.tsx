import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, Volume2, VolumeX, Music, PenLine, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { FlowSession } from '../types';
import { flowAudio } from './FlowSoundEngine';
import { NexMascot } from './NexMascot';
import { useTheme } from '../context/ThemeContext';

interface FlowSessionViewProps {
  subjectName: string;
  subjectColor: string;
  topicName: string;
  goalTitle: string;
  onFinishSession: (sessionData: FlowSession) => void;
  onCancelSession: () => void;
}

export const FlowSessionView: React.FC<FlowSessionViewProps> = ({
  subjectName,
  subjectColor,
  topicName,
  goalTitle,
  onFinishSession,
  onCancelSession,
}) => {
  const { isDark, isRose } = useTheme();
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [pausesCount, setPausesCount] = useState<number>(0);
  const [interruptionsCount, setInterruptionsCount] = useState<number>(0);
  const [flowStateBadge, setFlowStateBadge] = useState<'Entrando no Flow' | 'Flow estável' | 'Foco profundo'>('Entrando no Flow');
  
  // Sound controls
  const [ambientSound, setAmbientSound] = useState<'none' | 'ocean' | 'rain' | 'binaural' | 'lofi_synth'>('ocean');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSoundMenu, setShowSoundMenu] = useState<boolean>(false);

  // Quick note modal
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [quickNote, setQuickNote] = useState<string>('');

  // Start time record
  const startTimeRef = useRef<Date>(new Date());

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Adjust flow state badge based on progressive time and low interruptions
  useEffect(() => {
    if (seconds < 180) {
      setFlowStateBadge('Entrando no Flow');
    } else if (seconds < 1200) {
      setFlowStateBadge('Flow estável');
    } else {
      setFlowStateBadge('Foco profundo');
    }
  }, [seconds]);

  // Sound Engine Sync
  useEffect(() => {
    flowAudio.playSoundtrack(ambientSound);
    flowAudio.playChime(true);

    return () => {
      flowAudio.stopAll();
    };
  }, []);

  const handleSoundChange = (mode: 'none' | 'ocean' | 'rain' | 'binaural' | 'lofi_synth') => {
    setAmbientSound(mode);
    flowAudio.playSoundtrack(mode);
    setShowSoundMenu(false);
  };

  const handleToggleMute = () => {
    const muted = flowAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleTogglePause = () => {
    if (isActive) {
      setIsActive(false);
      setPausesCount((p) => p + 1);
      flowAudio.stopAll();
    } else {
      setIsActive(true);
      flowAudio.playSoundtrack(ambientSound);
    }
  };

  const handleRegisterInterruption = () => {
    setInterruptionsCount((prev) => prev + 1);
  };

  const handleFinish = () => {
    flowAudio.stopAll();
    flowAudio.playChime(true);

    // Calculate Flow Score algorithm
    const durationMin = Math.max(1, Math.round(seconds / 60));
    const pausePenalty = pausesCount * 3;
    const interruptionPenalty = interruptionsCount * 5;
    const timeBonus = Math.min(25, Math.floor(durationMin / 2));

    let calculatedFocusScore = Math.max(50, Math.min(99, 95 - pausePenalty - interruptionPenalty));
    let calculatedFlowScore = Math.max(45, Math.min(99, 75 + timeBonus - pausePenalty - interruptionPenalty));

    const finalSession: FlowSession = {
      id: `session_${Date.now()}`,
      subjectId: 'subj_auto',
      subjectName: subjectName || 'Matemática',
      subjectColor: subjectColor || (isDark ? '#6F7CFF' : '#FF70A6'),
      topic: topicName || 'Estudo Focado',
      goalTitle: goalTitle || 'Sessão de Flow',
      startTime: startTimeRef.current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: Math.max(10, seconds),
      pausesCount,
      interruptionsCount,
      focusScore: calculatedFocusScore,
      flowScore: calculatedFlowScore,
      state: 'finished',
      notes: quickNote,
      completed: true,
    };

    onFinishSession(finalSession);
  };

  // Format MM:SS or HH:MM:SS
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden select-none transition-colors ${
      isDark ? 'bg-[#0B0D1A] text-[#F4F5FA]' : 'bg-[#FFF6FB] text-[#3D354B]'
    }`}>
      {/* Background Animated Flow Waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient glow */}
        <div 
          className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] transition-all duration-1000 ${
            isDark ? 'opacity-25' : 'opacity-35'
          }`}
          style={{ backgroundColor: subjectColor || (isDark ? '#6F7CFF' : '#FF8EAB') }}
        />

        {/* Ambient Wave Vector 1 */}
        <div className={`absolute bottom-0 left-0 right-0 w-[200%] h-48 animate-wave-slow ${
          isDark ? 'opacity-25 fill-[#6F7CFF]/20' : 'opacity-35 fill-[#FF8EAB]/20'
        }`}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* Ambient Wave Vector 2 */}
        <div className={`absolute bottom-0 left-0 right-0 w-[200%] h-40 animate-wave-fast ${
          isDark ? 'opacity-20 fill-[#A78BFA]/25' : 'opacity-25 fill-[#B8A1FF]/25'
        }`}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C300,120 450,10 700,70 C950,130 1100,10 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      {/* Top Bar: Minimal Subject Info & Audio Controls */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 max-w-5xl mx-auto w-full">
        {/* Subject & Topic */}
        <div className="flex flex-col">
          <span 
            className="text-xs sm:text-sm font-extrabold uppercase tracking-widest"
            style={{ color: subjectColor || (isDark ? '#8ED8FF' : '#FF70A6') }}
          >
            {subjectName}
          </span>
          <h2 className={`text-base sm:text-lg font-bold tracking-tight ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            {topicName || goalTitle}
          </h2>
        </div>

        {/* Top Right: Sound Controls & Quick Note */}
        <div className="flex items-center gap-2">
          {/* Quick Note insight button */}
          <button
            onClick={() => setShowNoteModal(true)}
            title="Anotação rápida de insight"
            className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#15182B]/80 border-[#2A3146] text-[#8E9BB5] hover:text-[#F4F5FA] hover:border-[#6F7CFF]'
                : 'bg-white/80 border-[#F1D6E6] text-[#7F7299] hover:text-[#3D354B] hover:border-[#FF70A6]'
            }`}
          >
            <PenLine className="w-4 h-4" />
          </button>

          {/* Soundtrack Selector */}
          <div className="relative">
            <button
              onClick={() => setShowSoundMenu(!showSoundMenu)}
              title="Trilha de Foco"
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#15182B]/80 border-[#2A3146] text-[#8ED8FF] hover:border-[#6F7CFF]'
                  : 'bg-white/80 border-[#F1D6E6] text-[#FF70A6] hover:border-[#FF70A6]'
              }`}
            >
              <Music className="w-4 h-4" />
            </button>

            {/* Sound Selector Dropdown */}
            <AnimatePresence>
              {showSoundMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`absolute right-0 mt-2 w-52 border rounded-2xl p-2 shadow-2xl z-30 space-y-1 backdrop-blur-xl ${
                    isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
                  }`}
                >
                  <div className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
                  }`}>
                    Sons para Flow
                  </div>
                  {[
                    { id: 'ocean', label: '🌊 Ondas do Mar' },
                    { id: 'rain', label: '🌧️ Chuva Suave' },
                    { id: 'binaural', label: '🎧 Binaural Alpha (10Hz)' },
                    { id: 'lofi_synth', label: '🎹 Synth Drone Lo-fi' },
                    { id: 'none', label: '🔇 Silêncio Total' },
                  ].map((snd) => (
                    <button
                      key={snd.id}
                      onClick={() => handleSoundChange(snd.id as any)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        ambientSound === snd.id
                          ? (isDark ? 'bg-[#2A3146] text-[#8ED8FF]' : 'bg-[#FFF0F7] text-[#FF70A6] font-bold')
                          : (isDark ? 'text-[#D5DBE8] hover:bg-[#1E2338]' : 'text-[#4A4358] hover:bg-[#FFF6FB]')
                      }`}
                    >
                      <span>{snd.label}</span>
                      {ambientSound === snd.id && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mute Button */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? "Desmutar áudio" : "Mutar áudio"}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#15182B]/80 border-[#2A3146] text-[#8E9BB5] hover:text-[#F4F5FA]'
                : 'bg-white/80 border-[#F1D6E6] text-[#7F7299] hover:text-[#3D354B]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className={`w-4 h-4 ${isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'}`} />}
          </button>
        </div>
      </header>

      {/* Main Focus Center Stage */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 my-auto">
        {/* Subtle Wave Animation Ring */}
        <div className="relative flex items-center justify-center mb-6">
          <div className={`absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border animate-ping opacity-20 pointer-events-none ${
            isDark ? 'border-[#6F7CFF]' : 'border-[#FF70A6]'
          }`} />
          <div className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border animate-pulse-glow pointer-events-none ${
            isDark ? 'border-[#A78BFA]/30' : 'border-[#FF8EAB]/30'
          }`} />

          {/* Progressive Timer Display */}
          <div className="relative z-10 flex flex-col items-center">
            <h1 className={`text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter tabular-nums ${
              isDark
                ? 'text-[#F4F5FA] drop-shadow-[0_8px_35px_rgba(111,124,255,0.3)]'
                : 'text-[#3D354B] drop-shadow-[0_8px_35px_rgba(255,142,171,0.25)]'
            }`}>
              {formatTime(seconds)}
            </h1>

            {/* Flow State Badge */}
            <motion.div
              key={flowStateBadge}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-lg backdrop-blur-md ${
                isDark
                  ? 'bg-[#15182B]/90 border-[#6F7CFF]/40 text-[#8ED8FF]'
                  : 'bg-white/90 border-[#FF8EAB]/50 text-[#FF70A6]'
              }`}
            >
              <span className="text-sm">🌊</span>
              <span className="text-xs sm:text-sm font-bold">
                {flowStateBadge}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mascot in Deep Flow / Focused State */}
        <div className="mt-2 opacity-90 transition-opacity">
          <NexMascot
            mood={seconds > 600 ? 'deep_flow' : 'focused'}
            size="sm"
            withSpeechBubble={false}
          />
        </div>
      </main>

      {/* Bottom Action Controls */}
      <footer className="relative z-20 px-6 py-8 max-w-xl mx-auto w-full">
        <div className="flex flex-col gap-3.5">
          {/* Main Controls Row: Pause + Finish */}
          <div className="flex items-center justify-center gap-4">
            {/* Pause / Resume Button */}
            <button
              onClick={handleTogglePause}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm tracking-wide border transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? (isDark
                      ? 'bg-[#15182B] hover:bg-[#1E2338] border-[#2A3146] text-[#F4F5FA]'
                      : 'bg-white hover:bg-[#FFF0F7] border-[#F1D6E6] text-[#3D354B]')
                  : (isDark
                      ? 'bg-[#6F7CFF] hover:bg-[#5B6BF0] border-[#6F7CFF] text-white shadow-[0_4px_20px_rgba(111,124,255,0.4)]'
                      : 'bg-[#FF70A6] hover:bg-[#F25C96] border-[#FF70A6] text-white shadow-[0_4px_20px_rgba(255,112,166,0.35)]')
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Retomar Flow</span>
                </>
              )}
            </button>

            {/* Finish Session Button */}
            <button
              onClick={handleFinish}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white font-extrabold text-sm tracking-wide transition-all cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-gradient-to-r from-[#6F7CFF] to-[#A78BFA] hover:from-[#5B6BF0] hover:to-[#9675F7] shadow-[0_6px_25px_rgba(111,124,255,0.4)]'
                  : 'bg-gradient-to-r from-[#FF70A6] to-[#A78BFA] hover:from-[#F25C96] hover:to-[#9675F7] shadow-[0_6px_25px_rgba(255,112,166,0.35)]'
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Encerrar sessão</span>
            </button>
          </div>

          {/* Interruption tracker button */}
          <div className={`flex items-center justify-between text-xs px-2 ${
            isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'
          }`}>
            <span>
              {pausesCount > 0 ? `${pausesCount} pausa${pausesCount > 1 ? 's' : ''}` : 'Sem pausas'}
            </span>

            <button
              onClick={handleRegisterInterruption}
              className={`transition-colors cursor-pointer flex items-center gap-1 text-[11px] ${
                isDark ? 'hover:text-[#FF8EAB]' : 'hover:text-[#FF70A6]'
              }`}
              title="Contabiliza se você precisou desviar o foco"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Registrar distração ({interruptionsCount})</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Quick Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md border rounded-3xl p-6 shadow-2xl ${
                isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
              }`}
            >
              <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${
                isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
              }`}>
                <PenLine className={`w-4 h-4 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
                <span>Anotação rápida do Flow</span>
              </h3>
              <p className={`text-xs mb-4 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                Despeje pensamentos rápidos para não perder o foco do estudo.
              </p>

              <textarea
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Ex: Não esquecer de revisar a fórmula do delta e raízes reais..."
                rows={4}
                className={`w-full rounded-2xl p-3.5 text-sm outline-none resize-none mb-4 border ${
                  isDark
                    ? 'bg-[#0B0D1A] border-[#2A3146] focus:border-[#6F7CFF] text-[#F4F5FA]'
                    : 'bg-[#FFF6FB] border-[#F1D6E6] focus:border-[#FF70A6] text-[#3D354B]'
                }`}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNoteModal(false)}
                  className={`px-4 py-2 rounded-xl text-white font-bold text-xs cursor-pointer ${
                    isDark ? 'bg-[#6F7CFF]' : 'bg-[#FF70A6]'
                  }`}
                >
                  Salvar e Voltar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
