import { UserProfile, Subject, StudyGoal, FlowSession, Achievement, WeeklyFlowStat } from '../types';

export const initialUser: UserProfile = {
  id: 'user_001',
  name: 'Lucas',
  avatar: 'cloud_gentleman',
  level: 4,
  levelTitle: 'Arquiteto do Flow',
  totalStudyMinutes: 1420, // ~23.6 hrs
  averageFlowScore: 88,
  streakDays: 8,
  weeklyGoalHours: 12,
  currentWeeklyMinutes: 490,
  soundEnabled: true,
  ambientSound: 'ocean',
};

export const initialSubjects: Subject[] = [
  {
    id: 'subj_math',
    name: 'Matemática',
    color: '#6F7CFF', // Azul/lilás
    category: 'Exatas',
    progress: 80,
    totalTimeMinutes: 540,
    goalsCount: 4,
    activeGoal: 'Função Quadrática e Vértices',
    topics: ['Equações de 2º Grau', 'Função Quadrática', 'Trigonometria', 'Geometria Espacial']
  },
  {
    id: 'subj_hist',
    name: 'História',
    color: '#A78BFA', // Roxo
    category: 'Humanas',
    progress: 60,
    totalTimeMinutes: 320,
    goalsCount: 3,
    activeGoal: 'Revolução Francesa & Iluminismo',
    topics: ['Revolução Francesa', 'Era Vargas', 'Guerra Fria', 'Brasil Colonial']
  },
  {
    id: 'subj_bio',
    name: 'Biologia',
    color: '#9DE0C0', // Verde suave
    category: 'Biológicas',
    progress: 40,
    totalTimeMinutes: 240,
    goalsCount: 2,
    activeGoal: 'Fotossíntese e Respiração Celular',
    topics: ['Fotossíntese', 'Genética Mendeliana', 'Ecologia de Populações']
  },
  {
    id: 'subj_phys',
    name: 'Física',
    color: '#8ED8FF', // Azul claro
    category: 'Exatas',
    progress: 72,
    totalTimeMinutes: 380,
    goalsCount: 3,
    activeGoal: 'Cinemática Vetorial e Movimento Circular',
    topics: ['Cinemática Escalar', 'Leis de Newton', 'Energia Mecânica']
  },
  {
    id: 'subj_prog',
    name: 'Programação',
    color: '#FF8EAB', // Rosa destaque
    category: 'Tecnologia',
    progress: 55,
    totalTimeMinutes: 280,
    goalsCount: 2,
    activeGoal: 'Estruturas de Dados e Algoritmos',
    topics: ['Lógica de Programação', 'TypeScript & React', 'Estruturas de Dados']
  }
];

export const initialStudyGoals: StudyGoal[] = [
  {
    id: 'goal_1',
    subjectId: 'subj_math',
    subjectName: 'Matemática',
    subjectColor: '#6F7CFF',
    title: 'Resolver 15 questões de Função Quadrática',
    progress: 80,
    completed: false,
    estimatedMinutes: 50,
    studiedMinutes: 40,
    lastStudied: 'Hoje, há 2 horas',
    notes: 'Revisar fórmulas do vértice Xv = -b/2a e Yv = -Δ/4a.'
  },
  {
    id: 'goal_2',
    subjectId: 'subj_hist',
    subjectName: 'História',
    subjectColor: '#A78BFA',
    title: 'Fazer mapa mental da Revolução Francesa',
    progress: 60,
    completed: false,
    estimatedMinutes: 45,
    studiedMinutes: 30,
    lastStudied: 'Ontem',
    notes: 'Destacar queda da Bastilha e Declaração dos Direitos.'
  },
  {
    id: 'goal_3',
    subjectId: 'subj_bio',
    subjectName: 'Biologia',
    subjectColor: '#9DE0C0',
    title: 'Entender fase clara e escura da Fotossíntese',
    progress: 40,
    completed: false,
    estimatedMinutes: 40,
    studiedMinutes: 18,
    lastStudied: 'Há 2 dias',
    notes: 'Ciclo de Calvin e cadeia transportadora de elétrons.'
  },
  {
    id: 'goal_4',
    subjectId: 'subj_phys',
    subjectName: 'Física',
    subjectColor: '#8ED8FF',
    title: 'Cinemática: MUV e Gráficos de Velocidade',
    progress: 90,
    completed: false,
    estimatedMinutes: 45,
    studiedMinutes: 42,
    lastStudied: 'Hoje de manhã',
    notes: 'Torricelli e equação horária da posição.'
  }
];

export const initialSessionsHistory: FlowSession[] = [
  {
    id: 'sess_1',
    subjectId: 'subj_math',
    subjectName: 'Matemática',
    subjectColor: '#6F7CFF',
    topic: 'Função Quadrática',
    goalTitle: 'Resolver 15 questões de Função Quadrática',
    startTime: 'Hoje às 14:10',
    endTime: 'Hoje às 15:02',
    durationSeconds: 3120, // 52 min
    pausesCount: 1,
    interruptionsCount: 0,
    focusScore: 91,
    flowScore: 87,
    state: 'finished',
    notes: 'Fluxo contínuo sem distrações. Resolvidas 12 questões consecutivas.',
    completed: true
  },
  {
    id: 'sess_2',
    subjectId: 'subj_phys',
    subjectName: 'Física',
    subjectColor: '#8ED8FF',
    topic: 'Leis de Newton',
    goalTitle: 'Exercícios de Plano Inclinado com Atrito',
    startTime: 'Ontem às 18:30',
    endTime: 'Ontem às 19:35',
    durationSeconds: 3900, // 65 min
    pausesCount: 2,
    interruptionsCount: 1,
    focusScore: 94,
    flowScore: 92,
    state: 'finished',
    notes: 'Excelente estado de imersão no início da noite.',
    completed: true
  },
  {
    id: 'sess_3',
    subjectId: 'subj_hist',
    subjectName: 'História',
    subjectColor: '#A78BFA',
    topic: 'Revolução Francesa',
    goalTitle: 'Leitura crítica e resumo dos 3 estados',
    startTime: '20 de Ago às 10:00',
    endTime: '20 de Ago às 10:48',
    durationSeconds: 2880, // 48 min
    pausesCount: 1,
    interruptionsCount: 0,
    focusScore: 88,
    flowScore: 84,
    state: 'finished',
    notes: 'Bom ritmo de leitura.',
    completed: true
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach_1',
    title: 'Primeiro Flow',
    description: 'Completou sua primeira sessão com foco estável.',
    icon: 'wave',
    unlocked: true,
    unlockedAt: '15 de Ago',
    category: 'flow',
    badgeColor: '#6F7CFF'
  },
  {
    id: 'ach_2',
    title: 'Mente em Movimento',
    description: 'Concluiu 7 sessões de estudo com consistência.',
    icon: 'cloud',
    unlocked: true,
    unlockedAt: '20 de Ago',
    category: 'constancy',
    badgeColor: '#A78BFA'
  },
  {
    id: 'ach_3',
    title: 'Deep Flow',
    description: 'Manteve uma sessão profunda superior a 60 minutos.',
    icon: 'zap',
    unlocked: true,
    unlockedAt: 'Ontem',
    category: 'flow',
    badgeColor: '#FFC978'
  },
  {
    id: 'ach_4',
    title: 'Constância de Ferro',
    description: 'Estudou por 7 dias consecutivos no seu ritmo ideal.',
    icon: 'flame',
    unlocked: true,
    unlockedAt: 'Hoje',
    category: 'constancy',
    badgeColor: '#FF8EAB'
  },
  {
    id: 'ach_5',
    title: 'Mestre do Foco',
    description: 'Atingiu Flow Score 95+ em 3 sessões consecutivas.',
    icon: 'star',
    unlocked: false,
    category: 'mastery',
    badgeColor: '#9DE0C0'
  },
  {
    id: 'ach_6',
    title: 'Imersão Centrada',
    description: 'Completou mais de 25 horas totais de estudo produtivo.',
    icon: 'award',
    unlocked: false,
    category: 'milestone',
    badgeColor: '#8ED8FF'
  }
];

export const initialWeeklyStats: WeeklyFlowStat[] = [
  { day: 'Seg', minutes: 75, flowScore: 84 },
  { day: 'Ter', minutes: 60, flowScore: 86 },
  { day: 'Qua', minutes: 95, flowScore: 92 },
  { day: 'Qui', minutes: 45, flowScore: 80 },
  { day: 'Sex', minutes: 85, flowScore: 89 },
  { day: 'Sáb', minutes: 110, flowScore: 94 },
  { day: 'Dom', minutes: 52, flowScore: 87 },
];
