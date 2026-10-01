import React from 'react';
import { TeacherProfile, SupervisionType } from '../types/supervision';
import { 
  User, 
  BookOpen, 
  Calendar, 
  Building2, 
  CheckCircle, 
  FilePlus, 
  Video, 
  PlayCircle 
} from 'lucide-react';

interface TeacherDataFormProps {
  profile: TeacherProfile;
  onChangeProfile: (updated: Partial<TeacherProfile>) => void;
  onGoToUploadDocs: () => void;
  onGoToUploadVideos: () => void;
  onStartAnalysis: () => void;
  canAnalyze: boolean;
}

export const TeacherDataForm: React.FC<TeacherDataFormProps> = ({
  profile,
  onChangeProfile,
  onGoToUploadDocs,
  onGoToUploadVideos,
  onStartAnalysis,
  canAnalyze
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-700" />
          Formulir Identitas Guru & Supervisi Akademik
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Lengkapi data administrasi guru dan supervisor sebagai dasar pembinaan dan penerbitan laporan resmi supervisi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        
        {/* Nama Guru */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Nama Lengkap Guru & Gelar: *
          </label>
          <input
            type="text"
            required
            value={profile.namaGuru}
            onChange={(e) => onChangeProfile({ namaGuru: e.target.value })}
            placeholder="Contoh: Nurul Hidayati, S.Pd., M.Pd."
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 font-medium text-slate-800"
          />
        </div>

        {/* NIP / NUPTK */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            NIP / NUPTK / PegID (Jika ada):
          </label>
          <input
            type="text"
            value={profile.nipNuptk}
            onChange={(e) => onChangeProfile({ nipNuptk: e.target.value })}
            placeholder="Contoh: 198504122009122003"
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 font-mono text-slate-800"
          />
        </div>

        {/* Madrasah / Sekolah */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Madrasah / Sekolah: *
          </label>
          <input
            type="text"
            required
            value={profile.madrasahSekolah}
            onChange={(e) => onChangeProfile({ madrasahSekolah: e.target.value })}
            placeholder="Contoh: MAN 1 Insan Cendekia"
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 font-medium text-slate-800"
          />
        </div>

        {/* Mata Pelajaran */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Mata Pelajaran: *
          </label>
          <input
            type="text"
            required
            value={profile.mataPelajaran}
            onChange={(e) => onChangeProfile({ mataPelajaran: e.target.value })}
            placeholder="Contoh: Biologi / IPA / PAI"
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 font-medium text-slate-800"
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Kelas / Rombel: *
          </label>
          <input
            type="text"
            required
            value={profile.kelas}
            onChange={(e) => onChangeProfile({ kelas: e.target.value })}
            placeholder="Contoh: X Unggulan 2 / VII-A"
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800"
          />
        </div>

        {/* Fase Kurikulum */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Fase Kurikulum Merdeka: *
          </label>
          <select
            value={profile.fase}
            onChange={(e) => onChangeProfile({ fase: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800 font-medium"
          >
            <option value="Fase A (Kelas 1-2 SD/MI)">Fase A (Kelas 1-2 SD/MI)</option>
            <option value="Fase B (Kelas 3-4 SD/MI)">Fase B (Kelas 3-4 SD/MI)</option>
            <option value="Fase C (Kelas 5-6 SD/MI)">Fase C (Kelas 5-6 SD/MI)</option>
            <option value="Fase D (Kelas 7-9 SMP/MTs)">Fase D (Kelas 7-9 SMP/MTs)</option>
            <option value="Fase E (Kelas 10 SMA/MA)">Fase E (Kelas 10 SMA/MA)</option>
            <option value="Fase F (Kelas 11-12 SMA/MA)">Fase F (Kelas 11-12 SMA/MA)</option>
          </select>
        </div>

        {/* Topik / Materi Pembelajaran */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-slate-700 mb-1">
            Topik / Materi Pembelajaran:
          </label>
          <input
            type="text"
            value={profile.topikPembelajaran}
            onChange={(e) => onChangeProfile({ topikPembelajaran: e.target.value })}
            placeholder="Contoh: Ekosistem Lokal, Siklus Biogeokimia & Pelestarian Air Kolam Madrasah"
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800"
          />
        </div>

        {/* Jenis Supervisi */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Jenis Supervisi: *
          </label>
          <select
            value={profile.jenisSupervisi}
            onChange={(e) => onChangeProfile({ jenisSupervisi: e.target.value as SupervisionType })}
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800 font-bold bg-emerald-50/50"
          >
            <option value="Supervisi Komprehensif">Supervisi Komprehensif (Dokumen + Video)</option>
            <option value="Supervisi Perangkat">Supervisi Perangkat (Dokumen Saja)</option>
            <option value="Supervisi Video">Supervisi Video (Video Saja)</option>
            <option value="Supervisi Pembelajaran">Supervisi Pembelajaran (Observasi Langsung)</option>
          </select>
        </div>

        {/* Tahun Pelajaran */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Tahun Pelajaran: *
          </label>
          <input
            type="text"
            value={profile.tahunPelajaran}
            onChange={(e) => onChangeProfile({ tahunPelajaran: e.target.value })}
            placeholder="Contoh: 2025/2026"
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800"
          />
        </div>

        {/* Semester */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Semester: *
          </label>
          <select
            value={profile.semester}
            onChange={(e) => onChangeProfile({ semester: e.target.value as 'Ganjil' | 'Genap' })}
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800 font-medium"
          >
            <option value="Ganjil">Semester Ganjil</option>
            <option value="Genap">Semester Genap</option>
          </select>
        </div>

        {/* Nama Supervisor */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Nama Supervisor / Pengawas / Kepala Madrasah: *
          </label>
          <input
            type="text"
            required
            value={profile.namaSupervisor}
            onChange={(e) => onChangeProfile({ namaSupervisor: e.target.value })}
            placeholder="Contoh: Drs. H. Ahmad Fauzan, M.Pd."
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 font-medium text-slate-800"
          />
        </div>

        {/* Tanggal Supervisi */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Tanggal Supervisi: *
          </label>
          <input
            type="date"
            value={profile.tanggalSupervisi}
            onChange={(e) => onChangeProfile({ tanggalSupervisi: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 text-slate-800 font-medium"
          />
        </div>

      </div>

      {/* Action Buttons as requested in Section B */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onGoToUploadDocs}
            className="px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FilePlus className="w-4 h-4 text-blue-600" />
            <span>+ Tambah Dokumen</span>
          </button>

          <button
            type="button"
            onClick={onGoToUploadVideos}
            className="px-4 py-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Video className="w-4 h-4 text-purple-600" />
            <span>+ Tambah Video</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onStartAnalysis}
          className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <PlayCircle className="w-4 h-4 text-amber-300" />
          <span>Mulai Analisis AI</span>
        </button>
      </div>

    </div>
  );
};
