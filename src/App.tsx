import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeScreen } from './components/HomeScreen';
import { FlowSessionView } from './components/FlowSessionView';
import { SessionCompletedView } from './components/SessionCompletedView';
import { StudiesView } from './components/StudiesView';
import { StatsView } from './components/StatsView';
import { NexAssistantView } from './components/NexAssistantView';
import { ProfileView } from './components/ProfileView';
import { CreateGoalModal } from './components/CreateGoalModal';
import { flowAudio } from './components/FlowSoundEngine';
import { useTheme } from './context/ThemeContext';

import {
  initialUser,
  initialSubjects,
  initialStudyGoals,
  initialSessionsHistory,
  initialAchievements,
  initialWeeklyStats,
} from './data/initialData';
import { UserProfile, Subject, StudyGoal, FlowSession, Achievement, WeeklyFlowStat } from './types';

export default function App() {
  const { isDark, isRose } = useTheme();

  // App view flow states
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'home' | 'studies' | 'flow' | 'stats' | 'nex' | 'profile'>('home');

  // Active Flow Session state
  const [activeFlowConfig, setActiveFlowConfig] = useState<{
    subjectId: string;
    subjectName: string;
    subjectColor: string;
    goalTitle: string;
    topicName: string;
  } | null>(null);

  // Completed session review state
  const [completedSession, setCompletedSession] = useState<FlowSession | null>(null);

  // Create goal modal
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState<boolean>(false);

  // App data state
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [goals, setGoals] = useState<StudyGoal[]>(initialStudyGoals);
  const [sessions, setSessions] = useState<FlowSession[]>(initialSessionsHistory);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyFlowStat[]>(initialWeeklyStats);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  // Sound toggle handler
  const handleToggleMute = () => {
    const isMuted = flowAudio.toggleMute();
    setSoundMuted(isMuted);
  };

  // Launch Flow Session
  const handleStartFlow = (
    subjectId: string,
    subjectName: string,
    subjectColor: string,
    goalTitle: string,
    topic?: string
  ) => {
    setActiveFlowConfig({
      subjectId,
      subjectName,
      subjectColor,
      goalTitle,
      topicName: topic || goalTitle,
    });
    setCompletedSession(null);
  };

  // Handle Finish Flow Session
  const handleFinishFlowSession = (finishedSession: FlowSession) => {
    setActiveFlowConfig(null);
    setCompletedSession(finishedSession);

    // Update session history
    setSessions((prev) => [finishedSession, ...prev]);

    // Update user stats
    const durationMin = Math.round(finishedSession.durationSeconds / 60);
    setUser((prev) => {
      const newTotal = prev.totalStudyMinutes + durationMin;
      const newAvgScore = Math.round((prev.averageFlowScore * 4 + finishedSession.flowScore) / 5);
      return {
        ...prev,
        totalStudyMinutes: newTotal,
        averageFlowScore: newAvgScore,
      };
    });

    // Update goal progress
    setGoals((prev) =>
      prev.map((g) => {
        if (g.title === finishedSession.goalTitle) {
          const newStudied = g.studiedMinutes + durationMin;
          const newProg = Math.min(100, Math.round((newStudied / g.estimatedMinutes) * 100));
          return {
            ...g,
            studiedMinutes: newStudied,
            progress: newProg,
            completed: newProg >= 100,
            lastStudied: 'Hoje',
          };
        }
        return g;
      })
    );

    // Update weekly chart
    setWeeklyStats((prev) => {
      const lastIndex = prev.length - 1;
      const updated = [...prev];
      if (updated[lastIndex]) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          minutes: updated[lastIndex].minutes + durationMin,
          flowScore: Math.round((updated[lastIndex].flowScore + finishedSession.flowScore) / 2),
        };
      }
      return updated;
    });

    // Update subject time
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase() === finishedSession.subjectName.toLowerCase()) {
          return {
            ...s,
            totalTimeMinutes: s.totalTimeMinutes + durationMin,
            progress: Math.min(100, s.progress + 5),
          };
        }
        return s;
      })
    );
  };

  const handleToggleGoalComplete = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, completed: !g.completed, progress: !g.completed ? 100 : 50 }
          : g
      )
    );
  };

  const handleCreateGoal = (newGoalData: Omit<StudyGoal, 'id'>) => {
    const newGoal: StudyGoal = {
      id: `goal_${Date.now()}`,
      ...newGoalData,
    };
    setGoals((prev) => [newGoal, ...prev]);
  };

  const handleAddSubject = (name: string, category: string, color: string) => {
    const newSubject: Subject = {
      id: `subj_${Date.now()}`,
      name,
      category,
      color,
      progress: 10,
      totalTimeMinutes: 0,
      goalsCount: 0,
      topics: ['Introdução aos Fundamentos', 'Prática Inicial'],
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  // 1. Splash Screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // 2. Active Flow Session (Distraction-free environment)
  if (activeFlowConfig) {
    return (
      <FlowSessionView
        subjectName={activeFlowConfig.subjectName}
        subjectColor={activeFlowConfig.subjectColor}
        topicName={activeFlowConfig.topicName}
        goalTitle={activeFlowConfig.goalTitle}
        onFinishSession={handleFinishFlowSession}
        onCancelSession={() => setActiveFlowConfig(null)}
      />
    );
  }

  // 3. Completed Session Summary (Flow Score & Celebration)
  if (completedSession) {
    return (
      <SessionCompletedView
        session={completedSession}
        onGoHome={() => {
          setCompletedSession(null);
          setActiveTab('home');
        }}
        onGoStats={() => {
          setCompletedSession(null);
          setActiveTab('stats');
        }}
      />
    );
  }

  // 4. Main App Container
  return (
    <div className={`min-h-screen font-['Nunito',sans-serif] flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0B0D1A] text-[#F4F5FA] selection:bg-[#6F7CFF] selection:text-white' 
        : 'bg-[#FFF6FB] text-[#3D354B] selection:bg-[#FF70A6] selection:text-white'
    }`}>
      {/* Top Header */}
      <Header
        user={user}
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab as any)}
        onReplaySplash={() => setShowSplash(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
        soundMuted={soundMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {activeTab === 'home' && (
          <HomeScreen
            user={user}
            subjects={subjects}
            goals={goals}
            onStartFlow={handleStartFlow}
            onNavigate={(tab) => setActiveTab(tab as any)}
            onOpenCreateGoal={() => setIsCreateGoalOpen(true)}
          />
        )}

        {activeTab === 'studies' && (
          <StudiesView
            subjects={subjects}
            goals={goals}
            onStartFlow={handleStartFlow}
            onOpenCreateGoal={() => setIsCreateGoalOpen(true)}
            onToggleGoalComplete={handleToggleGoalComplete}
            onAddSubject={handleAddSubject}
          />
        )}

        {activeTab === 'flow' && (
          <div className="max-w-xl mx-auto py-10">
            <HomeScreen
              user={user}
              subjects={subjects}
              goals={goals}
              onStartFlow={handleStartFlow}
              onNavigate={(tab) => setActiveTab(tab as any)}
              onOpenCreateGoal={() => setIsCreateGoalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <StatsView
            user={user}
            sessions={sessions}
            weeklyStats={weeklyStats}
          />
        )}

        {activeTab === 'nex' && (
          <NexAssistantView
            subjects={subjects}
            goals={goals}
            onStartFlow={handleStartFlow}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            achievements={achievements}
            onReplaySplash={() => setShowSplash(true)}
            onOpenOnboarding={() => setShowOnboarding(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab as any)}
        onStartFlowDirectly={() => {
          const firstSubj = subjects[0];
          handleStartFlow(
            firstSubj.id,
            firstSubj.name,
            firstSubj.color,
            firstSubj.activeGoal || 'Estudo Focado',
            firstSubj.topics[0]
          );
        }}
      />

      {/* Modal: Create Goal */}
      <CreateGoalModal
        isOpen={isCreateGoalOpen}
        onClose={() => setIsCreateGoalOpen(false)}
        subjects={subjects}
        onCreateGoal={handleCreateGoal}
      />

      {/* Modal: Onboarding */}
      {showOnboarding && (
        <OnboardingModal onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
