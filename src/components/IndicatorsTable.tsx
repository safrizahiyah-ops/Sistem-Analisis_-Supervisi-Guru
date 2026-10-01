import React, { useState, useMemo } from 'react';
import { IndicatorAnalysis, IndicatorScore } from '../types/supervision';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Video, 
  HelpCircle 
} from 'lucide-react';

interface IndicatorsTableProps {
  indicators: IndicatorAnalysis[];
  onOpenEvidence: (indicator: IndicatorAnalysis) => void;
  onUpdateScore: (indicatorId: string, supervisorScore: IndicatorScore) => void;
}

export const IndicatorsTable: React.FC<IndicatorsTableProps> = ({
  indicators,
  onOpenEvidence,
  onUpdateScore
}) => {
  const [selectedComponent, setSelectedComponent] = useState<number | 'ALL'>('ALL');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredIndicators = useMemo(() => {
    return indicators.filter(ind => {
      // Component filter
      if (selectedComponent !== 'ALL' && ind.componentId !== selectedComponent) {
        return false;
      }
      
      // Active score
      const activeScore = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined 
        ? ind.skorSupervisor 
        : ind.skorAi;

      // Score filter
      if (selectedScoreFilter !== 'ALL') {
        if (selectedScoreFilter === '4' && activeScore !== 4) return false;
        if (selectedScoreFilter === '3' && activeScore !== 3) return false;
        if (selectedScoreFilter === '2' && activeScore !== 2) return false;
        if (selectedScoreFilter === '1' && activeScore !== 1) return false;
        if (selectedScoreFilter === 'NA' && activeScore !== 'N/A') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ind.namaIndikator.toLowerCase().includes(q);
        const matchesId = ind.id.toLowerCase().includes(q);
        const matchesEvidence = (ind.sumberBukti || '').toLowerCase().includes(q) ||
          (ind.documentEvidence?.kutipanTeks || '').toLowerCase().includes(q) ||
          (ind.videoEvidence?.transkrip || '').toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesEvidence) return false;
      }

      return true;
    });
  }, [indicators, selectedComponent, selectedScoreFilter, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getScoreBadge = (score: IndicatorScore) => {
    if (score === 'N/A') return 'bg-slate-100 text-slate-600 border-slate-300';
    if (score === 4) return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
    if (score === 3) return 'bg-teal-100 text-teal-800 border-teal-300 font-bold';
    if (score === 2) return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
    return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
  };

  const componentNames: Record<number, string> = {
    1: '1. Pembelajaran Bermakna',
    2: '2. Pembelajaran Inovatif',
    3: '3. Berdiferensiasi',
    4: '4. Berpusat Siswa',
    5: '5. Reflektif',
    6: '6. Asesmen Autentik'
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      
      {/* Control Header & Filters */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari indikator, kata kunci bukti, nomor (contoh: 1.2, refleksi, asesmen)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* Component Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="text-xs py-2 px-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
            >
              <option value="ALL">Semua 6 Komponen</option>
              <option value="1">1. Pembelajaran Bermakna</option>
              <option value="2">2. Pembelajaran Inovatif</option>
              <option value="3">3. Pembelajaran Berdiferensiasi</option>
              <option value="4">4. Pembelajaran Berpusat Siswa</option>
              <option value="5">5. Pembelajaran Reflektif</option>
              <option value="6">6. Asesmen Autentik</option>
            </select>

            {/* Score Filter */}
            <select
              value={selectedScoreFilter}
              onChange={(e) => setSelectedScoreFilter(e.target.value)}
              className="text-xs py-2 px-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700"
            >
              <option value="ALL">Semua Skor</option>
              <option value="4">Skor 4 (Sangat Terpenuhi)</option>
              <option value="3">Skor 3 (Terpenuhi)</option>
              <option value="2">Skor 2 (Sebagian)</option>
              <option value="1">Skor 1 (Belum Terpenuhi)</option>
              <option value="NA">Skor N/A (Tidak Dinilai)</option>
            </select>
          </div>
        </div>

        {/* Quick Summary Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
          <span>Menampilkan <b>{filteredIndicators.length}</b> dari {indicators.length} indikator</span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 4: Sangat Terpenuhi
            </span>
            <span className="inline-flex items-center gap-1 text-teal-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span> 3: Terpenuhi
            </span>
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> 2: Sebagian
            </span>
            <span className="inline-flex items-center gap-1 text-rose-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> 1: Belum Terpenuhi
            </span>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 w-16 text-center">Kode</th>
              <th className="py-3 px-3 w-40">Komponen</th>
              <th className="py-3 px-4">Deskripsi Indikator Supervisi</th>
              <th className="py-3 px-3 w-24 text-center">Skor AI</th>
              <th className="py-3 px-3 w-28 text-center">Skor Supervisor</th>
              <th className="py-3 px-4 w-52">Sumber & Bukti Singkat</th>
              <th className="py-3 px-3 w-28 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredIndicators.map((ind) => {
              const isExpanded = expandedId === ind.id;
              const activeScore = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined 
                ? ind.skorSupervisor 
                : ind.skorAi;

              return (
                <React.Fragment key={ind.id}>
                  <tr className={`hover:bg-slate-50/80 transition-colors ${isExpanded ? 'bg-emerald-50/20' : ''}`}>
                    
                    {/* Kode */}
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                      {ind.id}
                    </td>

                    {/* Komponen */}
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {componentNames[ind.componentId] || `Komponen ${ind.componentId}`}
                    </td>

                    {/* Indikator Text */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 leading-snug">
                        {ind.namaIndikator}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {ind.deskripsi}
                      </div>
                      {ind.diverifikasiSupervisor && (
                        <div className="mt-1">
                          <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-amber-700" /> Skor Diverifikasi Supervisor
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Skor AI */}
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs inline-block border ${getScoreBadge(ind.skorAi)}`}>
                        {ind.skorAi}
                      </span>
                    </td>

                    {/* Skor Supervisor (Selector) */}
                    <td className="py-3 px-3 text-center">
                      <select
                        value={activeScore}
                        onChange={(e) => {
                          const val = e.target.value === 'N/A' ? 'N/A' : (Number(e.target.value) as IndicatorScore);
                          onUpdateScore(ind.id, val);
                        }}
                        className={`text-xs font-bold py-1 px-2 rounded border cursor-pointer focus:outline-emerald-600 ${getScoreBadge(activeScore)}`}
                      >
                        <option value="4">4 - Sangat Terpenuhi</option>
                        <option value="3">3 - Terpenuhi</option>
                        <option value="2">2 - Sebagian</option>
                        <option value="1">1 - Belum</option>
                        <option value="N/A">N/A - Tidak Dinilai</option>
                      </select>
                    </td>

                    {/* Sumber Bukti Preview */}
                    <td className="py-3 px-4 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        {ind.documentEvidence && <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                        {ind.videoEvidence && <Video className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                        <span className="truncate max-w-[190px]" title={ind.sumberBukti}>
                          {ind.sumberBukti || 'Bukti belum ditemukan'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]">
                        {ind.documentEvidence?.kutipanTeks || ind.videoEvidence?.transkrip || ind.alasanSkor}
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenEvidence(ind)}
                          title="Telusuri Bukti Lengkap"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors inline-flex items-center gap-1 font-bold text-[11px]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Bukti</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleExpand(ind.id)}
                          title="Buka / Tutup Detail"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Detail Row */}
                  {isExpanded && (
                    <tr className="bg-slate-50/90 border-b border-slate-200">
                      <td colSpan={7} className="p-4 space-y-3 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Alasan & Kekurangan */}
                          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                            <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                              Alasan Penilaian AI:
                            </h5>
                            <p className="text-slate-700 leading-relaxed">
                              {ind.alasanSkor}
                            </p>
                            {ind.kekurangan && (
                              <div className="pt-2 border-t border-slate-100 text-amber-900">
                                <b>Catatan Kekurangan:</b> {ind.kekurangan}
                              </div>
                            )}
                          </div>

                          {/* Rekomendasi Singkat */}
                          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-emerald-800 text-[11px] uppercase tracking-wider">
                                Rekomendasi Perbaikan:
                              </h5>
                              {ind.rekomendasi && (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  Prioritas {ind.rekomendasi.prioritas}
                                </span>
                              )}
                            </div>
                            {ind.rekomendasi ? (
                              <div className="space-y-1 text-slate-700">
                                <div><b>Saran:</b> {ind.rekomendasi.tindakanDisarankan}</div>
                                <div className="text-[11px] text-slate-500"><b>Contoh:</b> {ind.rekomendasi.contohImplementasi}</div>
                              </div>
                            ) : (
                              <p className="text-slate-400 italic">Tidak ada rekomendasi khusus untuk indikator ini.</p>
                            )}
                          </div>

                        </div>

                        {/* Catatan Supervisor / Guru jika ada */}
                        {(ind.catatanSupervisor || ind.catatanGuru) && (
                          <div className="bg-amber-50/70 p-2.5 rounded border border-amber-200 flex flex-wrap gap-4 text-[11px]">
                            {ind.catatanSupervisor && (
                              <div><b>Catatan Supervisor:</b> {ind.catatanSupervisor}</div>
                            )}
                            {ind.catatanGuru && (
                              <div><b>Catatan Guru:</b> {ind.catatanGuru}</div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
