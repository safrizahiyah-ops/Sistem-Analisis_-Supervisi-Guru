/**
 * SISTEM ANALISIS PEMBELAJARAN GURU
 * Analisis Perangkat Pembelajaran, Modul Guru, dan Video Pembelajaran Berbasis 6 Indikator Supervisi
 */

import React, { useState, useEffect } from 'react';
import { 
  SupervisionSession, 
  TeacherProfile, 
  UploadedFileItem, 
  IndicatorAnalysis, 
  IndicatorScore, 
  FollowUpPlanItem, 
  FollowUpStatus, 
  UserRole 
} from './types/supervision';
import { SAMPLE_SESSION, calculateScores } from './data/indicatorsData';
import { Navbar } from './components/Navbar';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TeacherDataForm } from './components/TeacherDataForm';
import { UploadView } from './components/UploadView';
import { VideoAnalysisView } from './components/VideoAnalysisView';
import { IndicatorsTable } from './components/IndicatorsTable';
import { EvidenceListView } from './components/EvidenceListView';
import { EvidenceModal } from './components/EvidenceModal';
import { RecommendationsView } from './components/RecommendationsView';
import { FollowUpPlanView } from './components/FollowUpPlanView';
import { CrossAnalysisView } from './components/CrossAnalysisView';
import { ReportGeneratorView } from './components/ReportGeneratorView';
import { AiAssistantChatbot } from './components/AiAssistantChatbot';
import { SettingsView } from './components/SettingsView';

export default function App() {
  // Session State - starts with rich pre-loaded authentic sample session
  const [session, setSession] = useState<SupervisionSession>(() => {
    const saved = localStorage.getItem('supervision_session_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return SAMPLE_SESSION;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('DASHBOARD');
  const [currentRole, setCurrentRole] = useState<UserRole>('Supervisor');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedIndicatorForModal, setSelectedIndicatorForModal] = useState<IndicatorAnalysis | null>(null);

  // Upload and text extraction state
  const [documentTextSnippet, setDocumentTextSnippet] = useState<string>('');
  const [videoTranscriptSnippet, setVideoTranscriptSnippet] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgressStep, setAnalysisProgressStep] = useState<number>(0);

  // Auto-save session state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('supervision_session_data', JSON.stringify(session));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or unavailable');
    }
  }, [session]);

  // Recalculate overall score whenever indicators change
  const { overallScore } = calculateScores(session.indicators);

  // Update profile
  const handleUpdateProfile = (updated: Partial<TeacherProfile>) => {
    setSession(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updated
      },
      updatedAt: new Date().toISOString()
    }));
  };

  // Add uploaded files
  const handleAddFiles = (newFiles: UploadedFileItem[]) => {
    setSession(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles],
      updatedAt: new Date().toISOString()
    }));
  };

  // Remove uploaded file
  const handleRemoveFile = (fileId: string) => {
    setSession(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId),
      updatedAt: new Date().toISOString()
    }));
  };

  // Update Supervisor Score for an indicator
  const handleUpdateIndicatorScore = (
    indicatorId: string, 
    supervisorScore: IndicatorScore, 
    notes?: string, 
    teacherNotes?: string
  ) => {
    setSession(prev => {
      const updatedIndicators = prev.indicators.map(ind => {
        if (ind.id === indicatorId) {
          const isVerified = supervisorScore !== ind.skorAi || Boolean(notes);
          return {
            ...ind,
            skorSupervisor: supervisorScore,
            diverifikasiSupervisor: isVerified,
            catatanSupervisor: notes !== undefined ? notes : ind.catatanSupervisor,
            catatanGuru: teacherNotes !== undefined ? teacherNotes : ind.catatanGuru
          };
        }
        return ind;
      });

      const { overallScore: newOverall } = calculateScores(updatedIndicators);

      return {
        ...prev,
        indicators: updatedIndicators,
        overallScore: newOverall,
        status: 'Terverifikasi',
        updatedAt: new Date().toISOString()
      };
    });
  };

  // Add Follow Up Plan (RTL)
  const handleAddFollowUpPlan = (plan: FollowUpPlanItem) => {
    setSession(prev => ({
      ...prev,
      followUpPlans: [plan, ...prev.followUpPlans],
      updatedAt: new Date().toISOString()
    }));
  };

  // Update Follow Up Plan Status
  const handleUpdateFollowUpStatus = (id: string, newStatus: FollowUpStatus) => {
    setSession(prev => ({
      ...prev,
      followUpPlans: prev.followUpPlans.map(p => p.id === id ? { ...p, status: newStatus } : p),
      updatedAt: new Date().toISOString()
    }));
  };

  // Delete Follow Up Plan
  const handleDeleteFollowUpPlan = (id: string) => {
    setSession(prev => ({
      ...prev,
      followUpPlans: prev.followUpPlans.filter(p => p.id !== id),
      updatedAt: new Date().toISOString()
    }));
  };

  // Reset to default authentic demonstration
  const handleResetToDemo = () => {
    if (confirm('Apakah Anda ingin memuat ulang contoh analisis supervisi Biologi lengkap? Seluruh 36 indikator, video timeline, dan evidence akan dipulihkan.')) {
      setSession(SAMPLE_SESSION);
      localStorage.setItem('supervision_session_data', JSON.stringify(SAMPLE_SESSION));
      setActiveTab('DASHBOARD');
    }
  };

  // Load imported session JSON
  const handleLoadSession = (imported: SupervisionSession) => {
    setSession(imported);
    setActiveTab('DASHBOARD');
  };

  // Start AI Multimodal Analysis
  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgressStep(0);
    setActiveTab('UPLOAD');

    try {
      // Simulate stepper progress:
      // 0: Mengunggah -> 1: Membaca -> 2: Mengekstraksi
      const stepTimer1 = setTimeout(() => setAnalysisProgressStep(1), 800);
      const stepTimer2 = setTimeout(() => setAnalysisProgressStep(2), 1800);
      const stepTimer3 = setTimeout(() => setAnalysisProgressStep(3), 2800);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: session.profile,
          files: session.files,
          documentTexts: documentTextSnippet,
          videoTranscript: videoTranscriptSnippet,
          videoNotes: 'Video 40 menit mencakup apersepsi, inkuiri laboratorium, diskusi kelompok, presentasi dan refleksi.'
        })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      setAnalysisProgressStep(4); // Memetakan Indikator
      await new Promise(r => setTimeout(r, 600));
      setAnalysisProgressStep(5); // Menghitung Skor
      await new Promise(r => setTimeout(r, 500));
      setAnalysisProgressStep(6); // Membuat Laporan

      const data = await response.json();

      if (data && data.indicators && data.indicators.length > 0) {
        // Merge or replace indicators with AI result
        const incomingIndicators: IndicatorAnalysis[] = data.indicators;
        const { overallScore: calculatedOverall } = calculateScores(incomingIndicators);

        setSession(prev => ({
          ...prev,
          indicators: incomingIndicators,
          timeline: data.timeline && data.timeline.length > 0 ? data.timeline : prev.timeline,
          interaction: data.interaction || prev.interaction,
          crossAnalysis: data.crossAnalysis || prev.crossAnalysis,
          summary: data.summary || prev.summary,
          followUpPlans: data.followUpPlans && data.followUpPlans.length > 0 ? data.followUpPlans : prev.followUpPlans,
          overallScore: calculatedOverall,
          status: 'Dianalisis',
          updatedAt: new Date().toISOString()
        }));

        await new Promise(r => setTimeout(r, 600));
        setIsAnalyzing(false);
        setActiveTab('DASHBOARD');
      } else {
        throw new Error(data.error || 'Respon AI tidak mengembalikan 36 indikator valid.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setIsAnalyzing(false);
      alert(`Analisis AI gagal: ${err.message || 'Terjadi kesalahan sistem'}. Sistem akan mempertahankan data supervisi yang ada.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        profile={session.profile}
        overallScore={overallScore}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        onResetDemo={handleResetToDemo}
        onOpenReport={() => setActiveTab('LAPORAN')}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          overallScore={overallScore}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          
          {/* 1. DASHBOARD */}
          {activeTab === 'DASHBOARD' && (
            <DashboardView
              session={{ ...session, overallScore }}
              onOpenEvidence={(ind) => setSelectedIndicatorForModal(ind)}
              onNavigateTab={(tab) => setActiveTab(tab as NavigationTab)}
            />
          )}

          {/* 2. DATA GURU */}
          {activeTab === 'DATA_GURU' && (
            <TeacherDataForm
              profile={session.profile}
              onChangeProfile={handleUpdateProfile}
              onGoToUploadDocs={() => setActiveTab('UPLOAD')}
              onGoToUploadVideos={() => setActiveTab('UPLOAD')}
              onStartAnalysis={handleStartAnalysis}
              canAnalyze={!isAnalyzing}
            />
          )}

          {/* 3. UPLOAD DOKUMEN & VIDEO */}
          {activeTab === 'UPLOAD' && (
            <UploadView
              files={session.files}
              onAddFiles={handleAddFiles}
              onRemoveFile={handleRemoveFile}
              documentTextSnippet={documentTextSnippet}
              onChangeDocumentText={setDocumentTextSnippet}
              videoTranscriptSnippet={videoTranscriptSnippet}
              onChangeVideoTranscript={setVideoTranscriptSnippet}
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
              analysisProgressStep={analysisProgressStep}
              profile={session.profile}
            />
          )}

          {/* 4. VIDEO & TIMELINE */}
          {activeTab === 'VIDEO_ANALISIS' && (
            <VideoAnalysisView
              timeline={session.timeline}
              interaction={session.interaction}
              indicators={session.indicators}
              onOpenEvidenceForId={(id) => {
                const ind = session.indicators.find(i => i.id === id);
                if (ind) setSelectedIndicatorForModal(ind);
              }}
            />
          )}

          {/* 5. 36 INDIKATOR */}
          {activeTab === 'INDIKATOR' && (
            <IndicatorsTable
              indicators={session.indicators}
              onOpenEvidence={(ind) => setSelectedIndicatorForModal(ind)}
              onUpdateScore={(id, sc) => handleUpdateIndicatorScore(id, sc)}
            />
          )}

          {/* 6. EVIDENCE & BUKTI DETAIL */}
          {activeTab === 'EVIDENCE' && (
            <EvidenceListView
              indicators={session.indicators}
              onOpenEvidenceModal={(ind) => setSelectedIndicatorForModal(ind)}
            />
          )}

          {/* 7. REKOMENDASI */}
          {activeTab === 'REKOMENDASI' && (
            <RecommendationsView
              indicators={session.indicators}
              onAddFollowUp={handleAddFollowUpPlan}
              onOpenEvidence={(ind) => setSelectedIndicatorForModal(ind)}
            />
          )}

          {/* 8. RENCANA TINDAK LANJUT */}
          {activeTab === 'TINDAK_LANJUT' && (
            <FollowUpPlanView
              plans={session.followUpPlans}
              onAddPlan={handleAddFollowUpPlan}
              onUpdateStatus={handleUpdateFollowUpStatus}
              onDeletePlan={handleDeleteFollowUpPlan}
            />
          )}

          {/* 9. LAPORAN RESMI */}
          {activeTab === 'LAPORAN' && (
            <ReportGeneratorView
              session={{ ...session, overallScore }}
            />
          )}

          {/* 10. ASISTEN AI SUPERVISOR */}
          {activeTab === 'AI_ASSISTANT' && (
            <AiAssistantChatbot
              session={{ ...session, overallScore }}
            />
          )}

          {/* 11. PERBANDINGAN DOKUMEN VS VIDEO */}
          {activeTab === 'PERBANDINGAN' && (
            <CrossAnalysisView
              crossAnalysis={session.crossAnalysis}
              indicators={session.indicators}
            />
          )}

          {/* 12. PENGATURAN */}
          {activeTab === 'PENGATURAN' && (
            <SettingsView
              currentRole={currentRole}
              onChangeRole={setCurrentRole}
              onResetToDemo={handleResetToDemo}
              session={session}
              onLoadSession={handleLoadSession}
            />
          )}

        </main>
      </div>

      {/* Detail Evidence Modal (Telusuri Bukti) */}
      <EvidenceModal
        indicator={selectedIndicatorForModal}
        onClose={() => setSelectedIndicatorForModal(null)}
        onUpdateScore={handleUpdateIndicatorScore}
      />

    </div>
  );
}
