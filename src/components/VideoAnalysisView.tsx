import React, { useState } from 'react';
import { VideoTimelineSegment, VideoInteractionAnalysis, IndicatorAnalysis } from '../types/supervision';
import { 
  Play, 
  Pause, 
  Clock, 
  User, 
  Users, 
  Layers, 
  CheckSquare, 
  Info, 
  Sparkles, 
  Quote, 
  ChevronRight,
  Video as VideoIcon
} from 'lucide-react';

interface VideoAnalysisViewProps {
  timeline: VideoTimelineSegment[];
  interaction: VideoInteractionAnalysis;
  indicators: IndicatorAnalysis[];
  onOpenEvidenceForId?: (indicatorId: string) => void;
}

export const VideoAnalysisView: React.FC<VideoAnalysisViewProps> = ({
  timeline,
  interaction,
  indicators,
  onOpenEvidenceForId
}) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    timeline[0]?.id || ''
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeSegment = timeline.find(s => s.id === selectedSegmentId) || timeline[0];

  // Helper colors for timeline segments
  const getFaseColor = (fase: string) => {
    switch (fase) {
      case 'Pembukaan':
        return 'bg-blue-600 text-white border-blue-700';
      case 'Apersepsi':
        return 'bg-cyan-600 text-white border-cyan-700';
      case 'Penyampaian Tujuan':
        return 'bg-teal-600 text-white border-teal-700';
      case 'Eksplorasi Materi':
      case 'Diskusi Kelompok':
        return 'bg-emerald-600 text-white border-emerald-700';
      case 'Presentasi Siswa':
        return 'bg-indigo-600 text-white border-indigo-700';
      case 'Tanya Jawab & Penguatan':
      case 'Asesmen':
        return 'bg-amber-600 text-white border-amber-700';
      case 'Refleksi':
      case 'Penutup':
        return 'bg-purple-600 text-white border-purple-700';
      default:
        return 'bg-slate-600 text-white border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Video Mock Player */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 text-white">
        <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">
              Observasi Video Pembelajaran Digital
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              (Total Durasi: 40 Menit 00 Detik)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold">Terekstraksi & Terpetakan AI</span>
          </div>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video max-h-[360px] w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
          <div className="absolute inset-0 bg-radial from-slate-800/40 via-transparent to-black/80" />
          
          <div className="relative z-10 space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Segmen Aktif: {activeSegment?.timeRange || '00:00 - 03:20'}</span>
            </div>
            <h4 className="text-xl font-bold text-white tracking-wide">
              {activeSegment?.faseKegiatan}
            </h4>
            <p className="text-xs text-slate-300 italic px-4 line-clamp-2">
              "{activeSegment?.transkripExcerpt || activeSegment?.deskripsiAktivitas}"
            </p>
            
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-950"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Jeda Simulasi' : 'Putar Analisis Audio-Visual'}</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Sampling frame video setiap 3 detik</span>
            <span className="text-amber-400 font-medium">Model: Gemini 3.8 Multimodal Analysis</span>
          </div>
        </div>

        {/* Timeline Bar Navigation */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span>TIMELINE SEGMEN AKTIVITAS KELAS (Klik segmen untuk membuka rincian):</span>
            <span className="text-[11px] text-slate-400">{timeline.length} Segmen Teridentifikasi</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {timeline.map((seg, idx) => {
              const isSelected = seg.id === selectedSegmentId;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className={`p-2 rounded-lg text-left transition-all border ${
                    isSelected 
                      ? 'ring-2 ring-emerald-400 bg-slate-800 shadow-md scale-102 border-emerald-500' 
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400">
                    {seg.timeRange}
                  </div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">
                    {seg.faseKegiatan}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${getFaseColor(seg.faseKegiatan)}`}>
                      Pos {idx + 1}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold ml-auto">
                      ★ {seg.skorSegmen || 4}/4
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Segment Detail Drawer */}
      {activeSegment && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
                {activeSegment.timeRange}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                Fase Pembelajaran: {activeSegment.faseKegiatan}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Skor Kualitas Sesi:</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-300">
                {activeSegment.skorSegmen || 4} / 4
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Deskripsi & Transkrip */}
            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Deskripsi Aktivitas Kelas:
                </h5>
                <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
                  {activeSegment.deskripsiAktivitas}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Quote className="w-3.5 h-3.5 text-slate-400" /> Transkrip Percakapan / Audio Terdeteksi:
                </h5>
                <div className="text-xs text-slate-700 bg-emerald-50/40 p-3 rounded border border-emerald-100 italic leading-relaxed">
                  "{activeSegment.transkripExcerpt}"
                </div>
              </div>
            </div>

            {/* Indikator Terkait & Alasan Analisis */}
            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Indikator Supervisi Terkait:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeSegment.indikatorTerkait.map(indId => {
                    const ind = indicators.find(i => i.id === indId);
                    return (
                      <button
                        key={indId}
                        type="button"
                        onClick={() => onOpenEvidenceForId && onOpenEvidenceForId(indId)}
                        className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-left transition-colors flex items-center gap-1.5"
                      >
                        <span className="font-mono font-bold text-emerald-800 text-xs">{indId}</span>
                        <span className="text-[11px] text-slate-700 truncate max-w-[160px]">
                          {ind?.namaIndikator || 'Indikator Supervisi'}
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Catatan Alasan Analisis AI:
                </h5>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
                  {activeSegment.alasanAnalisis}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Video Deep Metrics: Interaction Pattern & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interaction Patterns */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Estimasi Pola Interaksi Kelas
            </h4>
          </div>

          <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{interaction.keteranganEstimasi || 'Tandai sebagai estimasi AI, bukan pengukuran absolut.'}</span>
          </div>

          {/* Interactive Stacked Progress */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Siswa ➔ Siswa (Kolaboratif)</span>
                <span className="font-mono font-bold text-emerald-700">{interaction.siswaKeSiswa}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${interaction.siswaKeSiswa}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Guru ➔ Siswa (Instruksi & Fasilitasi)</span>
                <span className="font-mono font-bold text-blue-700">{interaction.guruKeSiswa}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${interaction.guruKeSiswa}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Siswa ➔ Guru (Pertanyaan & Respon)</span>
                <span className="font-mono font-bold text-purple-700">{interaction.siswaKeGuru}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${interaction.siswaKeGuru}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200">
            <b>Kesimpulan AI:</b> Proporsi interaksi siswa-siswa ({interaction.siswaKeSiswa}%) membuktikan dominasi pembelajaran berbasis inkuiri aktif dan student-centered.
          </div>
        </div>

        {/* Guru & Siswa Activities */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-emerald-600" /> Deteksi Perilaku Guru & Siswa
          </h4>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Aktivitas Guru Teramati:
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {interaction.aktivitasGuruTerdeteksi.map((act, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Aktivitas Siswa Teramati:
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {interaction.aktivitasSiswaTerdeteksi.map((act, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Methods, Differentiation & Assessment Evidence */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Layers className="w-4 h-4 text-emerald-600" /> Metode, Diferensiasi & Asesmen
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Model & Metode Pembelajaran:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {interaction.metodePembelajaranTerdeteksi.map((m, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Bukti Pembelajaran Berdiferensiasi:
              </span>
              <ul className="space-y-1 text-slate-700">
                {interaction.buktiDiferensiasiTerdeteksi.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Bukti Asesmen Kelas:
              </span>
              <ul className="space-y-1 text-slate-700">
                {interaction.buktiAsesmenTerdeteksi.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
