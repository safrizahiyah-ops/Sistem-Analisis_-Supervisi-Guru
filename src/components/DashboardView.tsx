import React from 'react';
import { SupervisionSession, IndicatorAnalysis } from '../types/supervision';
import { calculateScores } from '../data/indicatorsData';
import { RadarChart, ComponentBarChart, IndicatorHeatmap } from './VisualCharts';
import { 
  Award, 
  Users, 
  FileText, 
  Video, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  Eye, 
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface DashboardViewProps {
  session: SupervisionSession;
  onOpenEvidence: (indicator: IndicatorAnalysis) => void;
  onNavigateTab: (tabId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  session,
  onOpenEvidence,
  onNavigateTab
}) => {
  const { 
    componentSummaries, 
    overallScore, 
    totalEvaluated, 
    totalSangatTerpenuhi, 
    totalTerpenuhi, 
    totalSebagian, 
    totalBelumTerpenuhi, 
    totalNA 
  } = calculateScores(session.indicators);

  return (
    <div className="space-y-6">
      
      {/* Welcome & Supervisor Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sistem Analisis Pembelajaran Guru Berbasis 6 Indikator Supervisi</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ANALISIS SUPERVISI GURU: {session.profile.namaGuru}
            </h2>
            
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-emerald-100 opacity-90">
              <span className="flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-emerald-300" /> {session.profile.madrasahSekolah}
              </span>
              <span>•</span>
              <span className="font-semibold text-white">{session.profile.mataPelajaran}</span>
              <span>•</span>
              <span>{session.profile.kelas} ({session.profile.fase})</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-300" /> {session.profile.tanggalSupervisi}
              </span>
            </div>
          </div>

          {/* Overall Score Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
              {overallScore}%
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold">
                Nilai Keterpenuhan
              </div>
              <div className="text-sm font-black text-white">
                {overallScore >= 85 ? 'Sangat Terpenuhi (A)' : overallScore >= 70 ? 'Terpenuhi (B)' : 'Sebagian (C)'}
              </div>
              <div className="text-[10px] text-emerald-300 mt-0.5">
                {totalEvaluated} Indikator Dinilai ({totalNA} N/A)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Stats Cards as requested in Section Y */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">1 Guru</div>
            <div className="text-xs text-slate-500">Guru Dianalisis</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {session.files.filter(f => f.type === 'document').length || 2} File
            </div>
            <div className="text-xs text-slate-500">Dokumen Dianalisis</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {session.files.filter(f => f.type === 'video').length || 1} Video
            </div>
            <div className="text-xs text-slate-500">Video (40 Menit)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{session.status}</div>
            <div className="text-xs text-slate-500">Status Supervisi</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{overallScore}%</div>
            <div className="text-xs text-slate-500">Rata-rata Keterpenuhan</div>
          </div>
        </div>

      </div>

      {/* 6 Component Cards Grid (Section J) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            6 Komponen Penilaian Supervisi Akademik
          </h3>
          <button
            type="button"
            onClick={() => onNavigateTab('INDIKATOR')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Lihat Semua 36 Indikator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentSummaries.map((comp) => {
            const getCompColor = (pct: number) => {
              if (pct >= 80) return 'border-emerald-200 bg-emerald-50/20';
              if (pct >= 70) return 'border-teal-200 bg-teal-50/20';
              if (pct >= 60) return 'border-amber-200 bg-amber-50/20';
              return 'border-rose-200 bg-rose-50/20';
            };

            return (
              <div 
                key={comp.id}
                className={`bg-white rounded-xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 ${getCompColor(comp.persentase)}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      KOMPONEN {comp.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-black ${
                      comp.persentase >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      comp.persentase >= 70 ? 'bg-teal-100 text-teal-800' :
                      comp.persentase >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {comp.persentase}%
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mt-2 leading-snug">
                    {comp.nama}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {comp.deskripsi}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Skor Rata-rata:</span>
                    <b className="text-slate-900">{comp.skorRataRata} / 4.00</b>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Indikator Terpenuhi:</span>
                    <span><b>{comp.jumlahIndikatorDinilai}</b> dari 6 indikator</span>
                  </div>
                  
                  {/* Indikator Kuat & Perlu Perbaikan */}
                  <div className="pt-1 flex flex-wrap items-center justify-between text-[11px] gap-1">
                    <span className="text-emerald-700 font-semibold">
                      ✓ {comp.indikatorKuat.length} Indikator Kuat
                    </span>
                    <span className="text-amber-700 font-semibold">
                      ! {comp.indikatorPerluPerbaikan.length} Perlu Penguatan
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visualizations: Radar Chart & Bar Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart Card */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Radar Profil 6 Komponen Pembelajaran
            </h4>
            <span className="text-[11px] text-slate-500">Skala Keterpenuhan 0 - 100%</span>
          </div>
          <div className="flex justify-center py-2">
            <RadarChart components={componentSummaries} size={360} />
          </div>
        </div>

        {/* Bar Comparison Card */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" /> Perbandingan Skor Keenam Komponen
            </h4>
            <span className="text-[11px] text-slate-500">Rata-rata & Persentase</span>
          </div>
          <div className="py-2">
            <ComponentBarChart components={componentSummaries} />
          </div>
        </div>

      </div>

      {/* 36 Indicators Heatmap (Section K) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Heatmap Pemetaan 36 Indikator Supervisi
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik kotak indikator untuk melihat rincian bukti, sumber kutipan, dan rekomendasi perbaikan.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            {totalSangatTerpenuhi + totalTerpenuhi} dari {totalEvaluated} indikator terpenuhi
          </div>
        </div>

        <IndicatorHeatmap 
          indicators={session.indicators} 
          onSelectIndicator={(id) => {
            const ind = session.indicators.find(i => i.id === id);
            if (ind) onOpenEvidence(ind);
          }}
        />
      </div>

      {/* Temuan Utama (Section O) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            Temuan Utama Supervisi Akademik (Executive Summary)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Disarikan secara objektif oleh AI berdasarkan bukti autentik dokumen dan pelaksanaan kelas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Kekuatan Utama */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-3">
            <h5 className="font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-700" /> Kekuatan Utama (Maksimal 5 Poin):
            </h5>
            <ul className="space-y-2 text-slate-700">
              {session.summary.kekuatanUtama.map((k, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="font-bold text-emerald-700">✓</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Area Perlu Ditingkatkan */}
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-3">
            <h5 className="font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-700" /> Area yang Perlu Ditingkatkan (Maksimal 5 Poin):
            </h5>
            <ul className="space-y-2 text-slate-700">
              {session.summary.areaPerluDitingkatkan.map((a, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="font-bold text-amber-700">!</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Indikator Prioritas & Bukti Positif */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
              Indikator Prioritas Pembinaan:
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {session.summary.indikatorPrioritas.map((p, i) => (
                <li key={i} className="text-slate-800 leading-snug">
                  • {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
              Bukti Positif Paling Menonjol:
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {session.summary.buktiPositif.map((b, i) => (
                <li key={i} className="text-emerald-900 leading-snug">
                  • {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
              Potensi Ketidaksesuaian Dokumen-Video:
            </span>
            <ul className="space-y-1.5 text-slate-700">
              {session.summary.potensiKetidaksesuaian.map((pk, i) => (
                <li key={i} className="text-amber-900 leading-snug">
                  • {pk}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Analisis Terakhir Table (Section Y) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wider">
          Analisis Terakhir Supervisi Guru
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Nama Guru</th>
                <th className="py-3 px-4">Mata Pelajaran</th>
                <th className="py-3 px-4">Tanggal Supervisi</th>
                <th className="py-3 px-4 text-center">Skor Keseluruhan</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">
                  {session.profile.namaGuru}
                  <div className="text-[11px] text-slate-500 font-normal">{session.profile.madrasahSekolah}</div>
                </td>
                <td className="py-3 px-4 text-slate-700">
                  {session.profile.mataPelajaran}
                  <div className="text-[11px] text-slate-500">{session.profile.kelas}</div>
                </td>
                <td className="py-3 px-4 text-slate-700 font-mono">
                  {session.profile.tanggalSupervisi}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                    {overallScore}%
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-800">
                    {session.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('LAPORAN')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Buka Laporan</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
