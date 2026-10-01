import React, { useState } from 'react';
import { CrossAnalysis, IndicatorAnalysis } from '../types/supervision';
import { 
  GitCompare, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Video, 
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface CrossAnalysisViewProps {
  crossAnalysis: CrossAnalysis;
  indicators: IndicatorAnalysis[];
}

export const CrossAnalysisView: React.FC<CrossAnalysisViewProps> = ({
  crossAnalysis,
  indicators
}) => {
  const [activeTab, setActiveTab] = useState<'CROSS' | 'LONGITUDINAL'>('CROSS');

  // Simulated Longitudinal Data (Semester 1 vs Semester 2)
  const longitudinalData = [
    {
      id: '1.1',
      nama: 'Perumusan & Penyampaian Tujuan Pembelajaran',
      skorLalu: 3,
      skorKini: 4,
      perubahan: '+1',
      status: 'Meningkat'
    },
    {
      id: '2.1',
      nama: 'Metode Pembelajaran Aktif & Inovatif',
      skorLalu: 3,
      skorKini: 4,
      perubahan: '+1',
      status: 'Meningkat'
    },
    {
      id: '2.2',
      nama: 'Pemanfaatan Media & Teknologi Laboratorium Cerdas',
      skorLalu: 2,
      skorKini: 4,
      perubahan: '+2',
      status: 'Meningkat Signifikan'
    },
    {
      id: '3.1',
      nama: 'Diferensiasi Kesiapan Belajar & Penugasan Berjenjang',
      skorLalu: 2,
      skorKini: 3,
      perubahan: '+1',
      status: 'Meningkat'
    },
    {
      id: '4.3',
      nama: 'Keterlibatan Siswa dalam Jalur Belajar (Agency)',
      skorLalu: 2,
      skorKini: 2,
      perubahan: '0',
      status: 'Stabil (Perlu Bimbingan)'
    },
    {
      id: '5.1',
      nama: 'Alokasi Waktu Refleksi Akhir Siswa',
      skorLalu: 2,
      skorKini: 3,
      perubahan: '+1',
      status: 'Meningkat'
    },
    {
      id: '6.1',
      nama: 'Asesmen Formatif & Observasi Kinerja Otentik',
      skorLalu: 3,
      skorKini: 4,
      perubahan: '+1',
      status: 'Meningkat'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SELARAS':
      case 'TERLIHAT SELARAS':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'SEBAGIAN SELARAS':
      case 'CUKUP SELARAS':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('CROSS')}
          className={`py-3 px-5 font-bold text-xs border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'CROSS'
              ? 'border-emerald-700 text-emerald-800 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GitCompare className="w-4 h-4" />
          <span>Analisis Silang (Dokumen vs Video)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('LONGITUDINAL')}
          className={`py-3 px-5 font-bold text-xs border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'LONGITUDINAL'
              ? 'border-emerald-700 text-emerald-800 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Komparasi Longitudinal (Perkembangan Guru)</span>
        </button>
      </div>

      {activeTab === 'CROSS' ? (
        <div className="space-y-6">
          
          {/* Alignment Banner */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status Konsistensi Dokumen ➔ Implementasi Video:
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black text-slate-900">
                  {crossAnalysis.keselarasanUmum}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(crossAnalysis.keselarasanUmum)}`}>
                  Tingkat Keselarasan Tinggi (~92%)
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {crossAnalysis.catatanKeselarasan}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500 max-w-xs">
              <span className="font-bold text-slate-700 block mb-0.5">Prinsip Etika Supervisi:</span>
              Ketiadaan bukti dalam video tidak langsung diartikan kegiatan tidak dilakukan; hanya ditandai "Perlu Verifikasi".
            </div>
          </div>

          {/* Comparative Table */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-emerald-700" />
              <span>Matriks Perbandingan Perangkat Pembelajaran vs Praktik Kelas Nyata</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-44">Aspek Supervisi</th>
                    <th className="py-3 px-4 w-64">
                      <span className="flex items-center gap-1.5 text-blue-800">
                        <FileText className="w-3.5 h-3.5" /> Rencana Tertulis di Dokumen
                      </span>
                    </th>
                    <th className="py-3 px-4 w-64">
                      <span className="flex items-center gap-1.5 text-purple-800">
                        <Video className="w-3.5 h-3.5" /> Pelaksanaan Teramati di Video
                      </span>
                    </th>
                    <th className="py-3 px-3 w-32 text-center">Status Keselarasan</th>
                    <th className="py-3 px-4">Catatan Kritis Supervisor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {crossAnalysis.poinKesesuaian.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {item.aspek}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed bg-blue-50/20">
                        {item.pernyataanDokumen}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed bg-purple-50/20">
                        {item.pelaksanaanVideo}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-1 rounded text-[11px] font-bold border inline-block ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 leading-relaxed">
                        {item.catatan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* Longitudinal Comparison Tab */
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Tren Perkembangan Kinerja Pedagogik Guru
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Membandingkan Supervisi Semester 1 (Oktober 2025) vs Semester 2 (Februari 2026).
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
                  Rata-rata Kenaikan: +18.4%
                </span>
              </div>
            </div>

            <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <b>Catatan Pendampingan:</b> Fokus pembinaan berpusat pada perkembangan kompetensi masing-masing individu guru secara longitudinal, bukan meranking atau membandingkan antar guru madrasah secara kompetitif.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 w-16 text-center">Kode</th>
                    <th className="py-3 px-4">Indikator Kunci</th>
                    <th className="py-3 px-3 w-28 text-center">Semester Lalu</th>
                    <th className="py-3 px-3 w-28 text-center">Semester Ini</th>
                    <th className="py-3 px-24 w-28 text-center">Delta Skor</th>
                    <th className="py-3 px-4 w-44">Kategori Perubahan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {longitudinalData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                        {row.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {row.nama}
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600 font-bold">
                        {row.skorLalu} / 4
                      </td>
                      <td className="py-3 px-3 text-center text-emerald-700 font-bold">
                        {row.skorKini} / 4
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded font-black text-xs ${
                          row.perubahan.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {row.perubahan}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">
                        <span className="flex items-center gap-1.5">
                          {row.perubahan.startsWith('+') && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />}
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
