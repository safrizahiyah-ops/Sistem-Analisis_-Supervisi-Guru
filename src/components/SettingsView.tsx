import React from 'react';
import { UserRole, SupervisionSession } from '../types/supervision';
import { 
  Settings, 
  ShieldCheck, 
  User, 
  Lock, 
  Database, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle 
} from 'lucide-react';

interface SettingsViewProps {
  currentRole: UserRole;
  onChangeRole: (newRole: UserRole) => void;
  onResetToDemo: () => void;
  session: SupervisionSession;
  onLoadSession: (importedSession: SupervisionSession) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentRole,
  onChangeRole,
  onResetToDemo,
  session,
  onLoadSession
}) => {
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(session, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Backup_Supervisi_${session.profile.namaGuru.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.profile && imported.indicators) {
          onLoadSession(imported);
          alert('Data supervisi berhasil dimuat dari file JSON!');
        } else {
          alert('Format berkas JSON tidak sesuai.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-700" />
          Pengaturan Sistem, Hak Akses & Privasi Data
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Kelola peran pengguna (Role-Based Access Control) serta privasi data guru sesuai prinsip etika supervisi madrasah.
        </p>
      </div>

      {/* Role Selection (Section AD) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Pengalihan Peran Pengguna (Active Role)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Supervisor */}
          <div 
            onClick={() => onChangeRole('Supervisor')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentRole === 'Supervisor' 
                ? 'bg-emerald-50/50 border-emerald-500 shadow-xs ring-2 ring-emerald-400' 
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">Supervisor Akademik</span>
              {currentRole === 'Supervisor' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <b>Hak Akses:</b> Melihat, menganalisis, memverifikasi skor AI, memberikan catatan pembinaan, menyusun RTL, dan menerbitkan laporan resmi.
            </p>
          </div>

          {/* Guru Binaan */}
          <div 
            onClick={() => onChangeRole('Guru')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentRole === 'Guru' 
                ? 'bg-blue-50/50 border-blue-500 shadow-xs ring-2 ring-blue-400' 
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">Guru Binaan</span>
              {currentRole === 'Guru' && <CheckCircle className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <b>Hak Akses:</b> Melihat hasil supervisinya, menelaah bukti dan rekomendasi, mengisi catatan refleksi guru, serta memantau tindak lanjut (RTL).
            </p>
          </div>

          {/* Admin */}
          <div 
            onClick={() => onChangeRole('Admin')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentRole === 'Admin' 
                ? 'bg-purple-50/50 border-purple-500 shadow-xs ring-2 ring-purple-400' 
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">Administrator Sistem</span>
              {currentRole === 'Admin' && <CheckCircle className="w-4 h-4 text-purple-600" />}
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              <b>Hak Akses:</b> Mengelola pengguna, mengatur master indikator supervisi, mencadangkan basis data, dan konfigurasi API key server.
            </p>
          </div>

        </div>
      </div>

      {/* Backup, Restore & Reset */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <Database className="w-4 h-4 text-emerald-600" /> Cadangan & Pemulihan Data Supervisi
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <button
            type="button"
            onClick={handleExportJson}
            className="p-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Unduh Cadangan (JSON)</span>
          </button>

          <label className="p-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Impor Data Sesi</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={onResetToDemo}
            className="p-3 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 font-bold text-amber-900 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-700" />
            <span>Muat Ulang Contoh Lengkap</span>
          </button>

        </div>
      </div>

      {/* Privacy & Ethics Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700" />
          Komitmen Keamanan & Privasi Data Supervisi (Bagian AD)
        </div>
        <p className="leading-relaxed">
          Seluruh rekaman video, teks rancangan modul ajar, rubrik asesmen, dan catatan pembinaan diperlakukan sebagai berkas privat yang terlindungi. Sistem menggunakan verifikasi berbasis bukti nyata dan menolak pemberian skor tanpa konfirmasi evidence faktual.
        </p>
      </div>

    </div>
  );
};
