import React from 'react';
import { UserRole, TeacherProfile } from '../types/supervision';
import { 
  Award, 
  Menu, 
  X, 
  UserCheck, 
  Printer, 
  RotateCcw, 
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  profile: TeacherProfile;
  overallScore: number;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onResetDemo: () => void;
  onOpenReport: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  overallScore,
  currentRole,
  onChangeRole,
  onResetDemo,
  onOpenReport,
  isSidebarOpen,
  onToggleSidebar
}) => {
  return (
    <header className="bg-emerald-900 text-white border-b border-emerald-950/60 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand & Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 transition-colors"
              title="Toggle Menu"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 border-2 border-amber-400 flex items-center justify-center font-bold text-white shadow-xs">
              <Award className="w-5 h-5 text-amber-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-wide text-white leading-tight">
                  SISTEM ANALISIS PEMBELAJARAN GURU
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase">
                  Supervisi AI
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 hidden md:block">
                Analisis Perangkat Pembelajaran, Modul Guru & Video Berbasis 6 Indikator
              </p>
            </div>
          </div>

          {/* Right: Quick Stats, Role Selector & Actions */}
          <div className="flex items-center gap-3">
            
            {/* Quick Score Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-700/60 text-xs">
              <span className="text-emerald-300 text-[11px]">Skor Supervisi:</span>
              <span className="font-black text-amber-300 text-sm">{overallScore}%</span>
            </div>

            {/* Role Switcher */}
            <div className="relative flex items-center">
              <select
                value={currentRole}
                onChange={(e) => onChangeRole(e.target.value as UserRole)}
                className="text-xs font-bold py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-emerald-100 cursor-pointer focus:outline-amber-400"
                title="Ganti Peran Pengguna"
              >
                <option value="Supervisor">Supervisor</option>
                <option value="Guru">Guru Binaan</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Muat Contoh Lengkap */}
            <button
              type="button"
              onClick={onResetDemo}
              title="Buka Data Contoh Biologi Lengkap (36 Indikator, Video Timeline & Evidence)"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Contoh Lengkap</span>
            </button>

            {/* Cetak Laporan Button */}
            <button
              type="button"
              onClick={onOpenReport}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak Laporan</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
