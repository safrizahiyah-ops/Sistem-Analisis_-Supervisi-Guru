import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  UploadCloud, 
  Video, 
  ListChecks, 
  Quote, 
  Lightbulb, 
  ClipboardList, 
  FileText, 
  Bot, 
  GitCompare, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Brain,
  Scroll,
  Heart
} from 'lucide-react';

export type NavigationTab = 
  | 'DASHBOARD'
  | 'DATA_GURU'
  | 'UPLOAD'
  | 'VIDEO_ANALISIS'
  | 'DEEP_LEARNING'
  | 'TURATS'
  | 'INDIKATOR'
  | 'EVIDENCE'
  | 'REKOMENDASI'
  | 'TINDAK_LANJUT'
  | 'LAPORAN'
  | 'AI_ASSISTANT'
  | 'PERBANDINGAN'
  | 'PENGATURAN';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  overallScore: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
  overallScore
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'DASHBOARD', label: '1. Dashboard Utama', icon: LayoutDashboard },
    { id: 'DATA_GURU', label: '2. Data Guru & Supervisi', icon: User },
    { id: 'UPLOAD', label: '3. Upload Dokumen & Video', icon: UploadCloud },
    { id: 'VIDEO_ANALISIS', label: '4. Video & Panca Cinta (KBC)', icon: Video, badge: '40 Mnt' },
    { id: 'DEEP_LEARNING', label: '5. Analisis Deep Learning', icon: Brain, badge: 'HOTS' },
    { id: 'TURATS', label: '6. Kajian Ayat, Hadits & Turats', icon: Scroll, badge: 'Khazanah' },
    { id: 'INDIKATOR', label: '7. 36 Indikator Supervisi', icon: ListChecks, badge: '36' },
    { id: 'EVIDENCE', label: '8. Evidence & Penelusuran Bukti', icon: Quote },
    { id: 'REKOMENDASI', label: '9. Rekomendasi Perbaikan', icon: Lightbulb },
    { id: 'TINDAK_LANJUT', label: '10. Rencana Tindak Lanjut (RTL)', icon: ClipboardList },
    { id: 'LAPORAN', label: '11. Laporan, Arsip & Cetak', icon: FileText, badge: 'Arsip' },
    { id: 'AI_ASSISTANT', label: '12. Asisten AI Supervisor', icon: Bot, badge: 'AI' },
    { id: 'PERBANDINGAN', label: '13. Perbandingan Dokumen-Video', icon: GitCompare },
    { id: 'PENGATURAN', label: '14. Pengaturan & Hak Akses', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Drawer / Column */}
      <aside className={`
        fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 
        z-35 overflow-y-auto transition-transform duration-300 ease-in-out shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 space-y-4">
          
          {/* Supervisor Card Widget */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[11px] text-emerald-200">
              <span className="font-semibold">Supervisi Terpadu</span>
              <span className="bg-emerald-700/80 px-2 py-0.5 rounded font-mono font-bold">6 Indikator</span>
            </div>
            <div className="text-xs font-bold text-white pt-0.5">
              Skor Keterpenuhan: <span className="text-amber-300 font-black text-sm">{overallScore}%</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold
                    transition-all text-left cursor-pointer
                    ${isActive 
                      ? 'bg-emerald-700 text-white shadow-xs font-bold' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isActive 
                        ? 'bg-emerald-800 text-amber-200' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Academic Branding */}
          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center leading-relaxed">
            Sistem Penjaminan Mutu Akademik<br/>
            Madrasah & Sekolah Unggul
          </div>

        </div>
      </aside>
    </>
  );
};
