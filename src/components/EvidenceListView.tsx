import React, { useState } from 'react';
import { IndicatorAnalysis } from '../types/supervision';
import { 
  FileText, 
  Video, 
  Search, 
  Filter, 
  Quote, 
  Clock, 
  Eye, 
  AlertTriangle, 
  ShieldCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface EvidenceListViewProps {
  indicators: IndicatorAnalysis[];
  onOpenEvidenceModal: (indicator: IndicatorAnalysis) => void;
}

export const EvidenceListView: React.FC<EvidenceListViewProps> = ({
  indicators,
  onOpenEvidenceModal
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'DOC' | 'VIDEO'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndicators = indicators.filter(ind => {
    // Type filter
    if (filterType === 'DOC' && !ind.documentEvidence) return false;
    if (filterType === 'VIDEO' && !ind.videoEvidence) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = ind.id.toLowerCase().includes(q);
      const matchName = ind.namaIndikator.toLowerCase().includes(q);
      const matchDoc = (ind.documentEvidence?.kutipanTeks || '').toLowerCase().includes(q) ||
                       (ind.documentEvidence?.namaFile || '').toLowerCase().includes(q);
      const matchVid = (ind.videoEvidence?.transkrip || '').toLowerCase().includes(q) ||
                       (ind.videoEvidence?.aktivitasTerdeteksi || '').toLowerCase().includes(q);
      if (!matchId && !matchName && !matchDoc && !matchVid) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Quote className="w-5 h-5 text-emerald-700" />
            Penelusuran Bukti Autentik (Evidence Explorer)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Setiap penilaian diverifikasi langsung ke halaman dokumen atau timestamp detik video.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kutipan bukti, timestamp..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-emerald-600 bg-white"
            />
          </div>

          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1 bg-slate-50">
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs transition-colors ${
                filterType === 'ALL' ? 'bg-white shadow-2xs text-emerald-800' : 'text-slate-600'
              }`}
            >
              Semua Bukti
            </button>
            <button
              type="button"
              onClick={() => setFilterType('DOC')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs flex items-center gap-1 transition-colors ${
                filterType === 'DOC' ? 'bg-white shadow-2xs text-blue-800' : 'text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dokumen Saja</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterType('VIDEO')}
              className={`px-2.5 py-1 rounded-md font-bold text-xs flex items-center gap-1 transition-colors ${
                filterType === 'VIDEO' ? 'bg-white shadow-2xs text-purple-800' : 'text-slate-600'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video Saja</span>
            </button>
          </div>
        </div>
      </div>

      {/* Evidence Cards List */}
      <div className="space-y-4">
        {filteredIndicators.map((ind) => {
          const activeScore = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined 
            ? ind.skorSupervisor 
            : ind.skorAi;

          return (
            <div 
              key={ind.id} 
              className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                    {ind.id}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">
                    {ind.namaIndikator}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    Skor: <b className="text-slate-900 font-bold">{activeScore}/4</b> ({ind.statusKeterpenuhan})
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenEvidenceModal(ind)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Verifikasi / Koreksi</span>
                  </button>
                </div>
              </div>

              {/* Dual Evidence Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Document Evidence Box */}
                <div className="bg-blue-50/30 border border-blue-200 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-blue-900 font-bold uppercase tracking-wider text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-700" /> Bukti Dokumen
                    </span>
                    {ind.documentEvidence && (
                      <span className="bg-blue-100 px-2 py-0.5 rounded font-mono text-blue-800">
                        {ind.documentEvidence.halaman}
                      </span>
                    )}
                  </div>

                  {ind.documentEvidence ? (
                    <div className="space-y-1.5 text-slate-700">
                      <div className="text-[11px] text-slate-500 font-medium">
                        Berkas: {ind.documentEvidence.namaFile} • {ind.documentEvidence.bagianHeading}
                      </div>
                      <div className="bg-white p-2.5 rounded border border-blue-100 italic text-slate-800 leading-relaxed">
                        "{ind.documentEvidence.kutipanTeks}"
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 italic py-3 text-center">
                      Bukti dokumen belum ditemukan untuk indikator ini.
                    </div>
                  )}
                </div>

                {/* Video Evidence Box */}
                <div className="bg-purple-50/30 border border-purple-200 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-purple-900 font-bold uppercase tracking-wider text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-purple-700" /> Bukti Video
                    </span>
                    {ind.videoEvidence && (
                      <span className="bg-purple-100 px-2 py-0.5 rounded font-mono text-purple-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {ind.videoEvidence.timestamp}
                      </span>
                    )}
                  </div>

                  {ind.videoEvidence ? (
                    <div className="space-y-1.5 text-slate-700">
                      <div className="text-[11px] text-purple-900 font-semibold bg-purple-100/60 px-2 py-0.5 rounded inline-block">
                        Aktivitas: {ind.videoEvidence.aktivitasTerdeteksi}
                      </div>
                      <div className="bg-white p-2.5 rounded border border-purple-100 italic text-slate-800 leading-relaxed">
                        "{ind.videoEvidence.transkrip || ind.videoEvidence.deskripsiVisual}"
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 italic py-3 text-center">
                      Bukti rekaman video belum ditemukan untuk indikator ini.
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Reason & Confidence Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex-1 pr-4">
                  <b>Alasan Penilaian:</b> {ind.alasanSkor}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-slate-500 font-semibold">Confidence:</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    ind.confidence === 'Tinggi' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ind.confidence}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
