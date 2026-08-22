import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Clock, Zap, Target, TrendingUp, Calendar, CheckCircle, Flame, Star, Sparkles, Award, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { UserProfile, FlowSession, WeeklyFlowStat } from '../types';
import { NexMascot } from './NexMascot';
import { useTheme } from '../context/ThemeContext';

interface StatsViewProps {
  user: UserProfile;
  sessions: FlowSession[];
  weeklyStats: WeeklyFlowStat[];
}

export const StatsView: React.FC<StatsViewProps> = ({
  user,
  sessions,
  weeklyStats,
}) => {
  const { isDark, isRose } = useTheme();
  const [chartMode, setChartMode] = useState<'flow_score' | 'study_time' | 'combined'>('flow_score');

  const totalHours = Math.floor(user.totalStudyMinutes / 60);
  const totalRemainingMinutes = user.totalStudyMinutes % 60;

  // Calculate highest flow day and average flow
  const avgFlow = Math.round(
    weeklyStats.reduce((acc, curr) => acc + curr.flowScore, 0) / (weeklyStats.length || 1)
  );
  const bestDay = [...weeklyStats].sort((a, b) => b.flowScore - a.flowScore)[0] || weeklyStats[0];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3.5 rounded-2xl shadow-2xl border backdrop-blur-md ${
          isDark 
            ? 'bg-[#15182B]/95 border-[#2A3146] text-[#F4F5FA]' 
            : 'bg-white/95 border-[#F1D6E6] text-[#4A4358]'
        }`}>
          <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/10">
            <p className="text-xs font-bold">{label}-feira</p>
            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
              isDark ? 'bg-[#6F7CFF]/20 text-[#8ED8FF]' : 'bg-[#FF8EAB]/20 text-[#FF70A6]'
            }`}>
              Registro Diário
            </span>
          </div>

          {payload.map((entry: any, index: number) => {
            const isScore = entry.dataKey === 'flowScore';
            return (
              <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-xs py-0.5">
                <span className="font-medium opacity-80">{entry.name}:</span>
                <span className={`font-extrabold ${
                  isScore 
                    ? (isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]') 
                    : (isDark ? 'text-[#A78BFA]' : 'text-[#8B7FA6]')
                }`}>
                  {entry.value} {isScore ? 'pts (/100)' : 'minutos'}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  // Custom Dot for high flow highlights
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isPeak = payload.flowScore >= 90;
    const strokeColor = isDark ? '#6F7CFF' : '#FF70A6';
    const fillColor = isPeak ? (isDark ? '#8ED8FF' : '#FFB7D5') : (isDark ? '#15182B' : '#FFFFFF');

    return (
      <g>
        {isPeak && (
          <circle cx={cx} cy={cy} r={8} fill={strokeColor} opacity={0.25} className="animate-ping" />
        )}
        <circle
          cx={cx}
          cy={cy}
          r={isPeak ? 5.5 : 4}
          stroke={strokeColor}
          strokeWidth={2.5}
          fill={fillColor}
        />
      </g>
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight flex items-center gap-2.5 ${
            isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'
          }`}>
            <BarChart3 className={`w-7 h-7 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
            <span>Seu Flow & Estatísticas</span>
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
            {isDark 
              ? 'Compreenda seu ritmo mental, horários ideais e evolução ao longo do tempo.' 
              : 'Seu progresso leve e constante. Veja como o Flow transforma seu aprendizado.'}
          </p>
        </div>

        {/* Mascot Insight Badge */}
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-sm ${
          isDark 
            ? 'bg-[#15182B] border-[#2A3146]' 
            : 'bg-white border-[#F1D6E6]'
        }`}>
          <NexMascot mood="focused" size="sm" withSpeechBubble={false} />
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${
              isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
            }`}>
              Diagnóstico de Aprendizado
            </span>
            <span className={`text-xs font-semibold ${isDark ? 'text-[#F4F5FA]' : 'text-[#4A4358]'}`}>
              Pico de absorção aos sábados ({bestDay.flowScore} pts).
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Essential Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Time */}
        <div className={`rounded-3xl p-5 border shadow-sm ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}>
          <div className="flex items-center justify-between opacity-80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tempo Total</span>
            <Clock className={`w-4 h-4 ${isDark ? 'text-[#6F7CFF]' : 'text-[#FF70A6]'}`} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-black ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              {totalHours}h {totalRemainingMinutes}m
            </span>
          </div>
          <span className={`text-[11px] font-semibold mt-1 block ${isDark ? 'text-[#9DE0C0]' : 'text-[#34B584]'}`}>
            +3.5h comparado à semana anterior
          </span>
        </div>

        {/* Average Flow Score */}
        <div className={`rounded-3xl p-5 border shadow-sm ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}>
          <div className="flex items-center justify-between opacity-80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Flow Médio</span>
            <TrendingUp className={`w-4 h-4 ${isDark ? 'text-[#8ED8FF]' : 'text-[#72D0F4]'}`} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-black ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              {avgFlow}
            </span>
            <span className="text-xs opacity-70 font-semibold">/100</span>
          </div>
          <span className={`text-[11px] font-semibold mt-1 block ${isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'}`}>
            Zona de alta absorção ativa
          </span>
        </div>

        {/* Best Study Window (Seu melhor horário) */}
        <div className={`rounded-3xl p-5 border shadow-sm ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}>
          <div className="flex items-center justify-between opacity-80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Melhor Horário</span>
            <Zap className={`w-4 h-4 ${isDark ? 'text-[#FFC978]' : 'text-[#FFC78A]'}`} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              18:00–20:00
            </span>
          </div>
          <span className={`text-[11px] font-semibold mt-1 block ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
            94% de foco médio no entardecer
          </span>
        </div>

        {/* Longest Flow Session */}
        <div className={`rounded-3xl p-5 border shadow-sm ${
          isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
        }`}>
          <div className="flex items-center justify-between opacity-80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Maior Flow Contínuo</span>
            <Flame className={`w-4 h-4 ${isDark ? 'text-[#FF8EAB]' : 'text-[#FF70A6]'}`} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-black ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              1h 24m
            </span>
          </div>
          <span className={`text-[11px] font-semibold mt-1 block ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
            Matemática • 0 interrupções
          </span>
        </div>
      </div>

      {/* Main Weekly Flow Progression Line Chart (Smooth Monotone Curve) */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm relative overflow-hidden ${
        isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
      }`}>
        {/* Glow backdrop */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#6F7CFF]/10' : 'bg-[#FF8EAB]/10'
        }`} />

        {/* Chart Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDark ? 'bg-[#6F7CFF]' : 'bg-[#FF70A6]'}`} />
              <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                Progressão Semanal do Flow Score
              </h3>
            </div>
            <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              Linha suave com a evolução diária do seu ritmo mental e profundidade (0 a 100)
            </p>
          </div>

          {/* Chart Mode Toggle Pills */}
          <div className={`flex items-center p-1 rounded-2xl border text-xs font-semibold ${
            isDark ? 'bg-[#0B0D1A] border-[#2A3146]' : 'bg-[#FFF2F8] border-[#F1D6E6]'
          }`}>
            <button
              onClick={() => setChartMode('flow_score')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                chartMode === 'flow_score'
                  ? (isDark ? 'bg-[#6F7CFF] text-white shadow-sm' : 'bg-[#FF70A6] text-white shadow-sm')
                  : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
              }`}
            >
              🌊 Flow Score
            </button>
            <button
              onClick={() => setChartMode('study_time')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                chartMode === 'study_time'
                  ? (isDark ? 'bg-[#6F7CFF] text-white shadow-sm' : 'bg-[#FF70A6] text-white shadow-sm')
                  : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
              }`}
            >
              ⏱️ Minutos
            </button>
            <button
              onClick={() => setChartMode('combined')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                chartMode === 'combined'
                  ? (isDark ? 'bg-[#6F7CFF] text-white shadow-sm' : 'bg-[#FF70A6] text-white shadow-sm')
                  : (isDark ? 'text-[#8E9BB5] hover:text-[#F4F5FA]' : 'text-[#7F7299] hover:text-[#3D354B]')
              }`}
            >
              📊 Combinado
            </button>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="flex items-center gap-6 mb-4 text-xs font-semibold">
          {(chartMode === 'flow_score' || chartMode === 'combined') && (
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full ${isDark ? 'bg-[#6F7CFF]' : 'bg-[#FF70A6]'}`} />
              <span className={isDark ? 'text-[#D5DBE8]' : 'text-[#4A4358]'}>
                Flow Score (Qualidade do Ritmo)
              </span>
            </div>
          )}
          {(chartMode === 'study_time' || chartMode === 'combined') && (
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full ${isDark ? 'bg-[#8ED8FF]' : 'bg-[#72D0F4]'}`} />
              <span className={isDark ? 'text-[#D5DBE8]' : 'text-[#4A4358]'}>
                Minutos Estudados
              </span>
            </div>
          )}
          <div className="hidden sm:flex items-center gap-2 ml-auto text-[11px] opacity-70">
            <span className="w-4 border-t-2 border-dashed border-emerald-400" />
            <span>Zona de Alta Absorção (85+)</span>
          </div>
        </div>

        {/* Chart Canvas with Smooth Spline Curve */}
        <div className="h-72 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyStats} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
              <defs>
                {/* Flow Score Gradient Fill Dark */}
                <linearGradient id="flowScoreGradDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6F7CFF" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#6F7CFF" stopOpacity={0.0} />
                </linearGradient>

                {/* Flow Score Gradient Fill Rose */}
                <linearGradient id="flowScoreGradRose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF70A6" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#FF70A6" stopOpacity={0.0} />
                </linearGradient>

                {/* Minutes Gradient Fill */}
                <linearGradient id="minutesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8ED8FF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8ED8FF" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#2A3146' : '#F1D6E6'}
                vertical={false}
                opacity={0.6}
              />

              <XAxis
                dataKey="day"
                stroke={isDark ? '#5A6585' : '#8B7FA6'}
                tickLine={false}
                tick={{ fill: isDark ? '#8E9BB5' : '#7F7299', fontSize: 12, fontWeight: 'bold' }}
              />

              <YAxis
                domain={chartMode === 'study_time' ? [0, 'auto'] : [50, 100]}
                stroke={isDark ? '#5A6585' : '#8B7FA6'}
                tickLine={false}
                tick={{ fill: isDark ? '#8E9BB5' : '#7F7299', fontSize: 12 }}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Reference line for Flow zone (85 pts) */}
              {(chartMode === 'flow_score' || chartMode === 'combined') && (
                <ReferenceLine
                  y={85}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: 'Zona de Flow (85)',
                    fill: isDark ? '#9DE0C0' : '#10B981',
                    fontSize: 10,
                    position: 'insideTopRight',
                  }}
                />
              )}

              {/* Study Time Area Curve */}
              {(chartMode === 'study_time' || chartMode === 'combined') && (
                <Area
                  type="monotone"
                  name="Tempo de Estudo"
                  dataKey="minutes"
                  stroke="#8ED8FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#minutesGrad)"
                />
              )}

              {/* Flow Score Smooth Curve */}
              {(chartMode === 'flow_score' || chartMode === 'combined') && (
                <Area
                  type="monotone"
                  name="Flow Score"
                  dataKey="flowScore"
                  stroke={isDark ? '#6F7CFF' : '#FF70A6'}
                  strokeWidth={3.5}
                  fillOpacity={1}
                  fill={isDark ? 'url(#flowScoreGradDark)' : 'url(#flowScoreGradRose)'}
                  dot={<CustomDot />}
                  activeDot={{
                    r: 7,
                    fill: isDark ? '#8ED8FF' : '#FF70A6',
                    stroke: '#FFFFFF',
                    strokeWidth: 2,
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Day by Day Quick Score Pill Row */}
        <div className="grid grid-cols-7 gap-2 pt-6 border-t mt-4 border-white/10">
          {weeklyStats.map((item, idx) => {
            const isTop = item.flowScore >= 90;
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-2xl text-center border transition-transform hover:scale-105 ${
                  isTop
                    ? (isDark ? 'bg-[#6F7CFF]/15 border-[#6F7CFF]/40' : 'bg-[#FF8EAB]/20 border-[#FF70A6]/40')
                    : (isDark ? 'bg-[#0B0D1A]/60 border-[#2A3146]' : 'bg-[#FFF6FB] border-[#F1D6E6]')
                }`}
              >
                <span className="text-[11px] font-bold opacity-75 block">{item.day}</span>
                <span className={`text-base font-black block ${
                  isTop
                    ? (isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]')
                    : (isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]')
                }`}>
                  {item.flowScore}
                </span>
                <span className="text-[10px] opacity-60 block">{item.minutes}m</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Sessions History Table / List */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${
        isDark ? 'bg-[#15182B] border-[#2A3146]' : 'bg-white border-[#F1D6E6]'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
              Histórico de Sessões Recentes
            </h3>
            <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
              Registro automático de cada bloco de estudo com métricas de Flow e foco
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.map((sess) => {
            const mins = Math.max(1, Math.round(sess.durationSeconds / 60));
            return (
              <div
                key={sess.id}
                className={`border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isDark ? 'bg-[#0B0D1A] border-[#2A3146]' : 'bg-[#FFF6FB] border-[#F1D6E6]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                    style={{
                      backgroundColor: `${sess.subjectColor}20`,
                      color: sess.subjectColor,
                      border: `1px solid ${sess.subjectColor}40`,
                    }}
                  >
                    🌊
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-[#F4F5FA]' : 'text-[#3D354B]'}`}>
                      {sess.subjectName} • {sess.goalTitle}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-[#8E9BB5]' : 'text-[#7F7299]'}`}>
                      {sess.startTime} • {mins} min de Flow • {sess.pausesCount} pausa(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className={`text-xs font-extrabold block ${
                      isDark ? 'text-[#8ED8FF]' : 'text-[#FF70A6]'
                    }`}>
                      Flow {sess.flowScore}/100
                    </span>
                    <span className={`text-[10px] font-semibold ${
                      isDark ? 'text-[#9DE0C0]' : 'text-[#34B584]'
                    }`}>
                      {sess.focusScore}% foco estável
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
