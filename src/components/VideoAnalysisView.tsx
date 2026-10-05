import React, { useState } from 'react';
import { 
  VideoTimelineSegment, 
  VideoInteractionAnalysis, 
  IndicatorAnalysis,
  PancaCintaPillar,
  PancaCintaSummary
} from '../types/supervision';
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
  Video as VideoIcon,
  Heart,
  Camera,
  Maximize2,
  Volume2,
  Film,
  Sparkle
} from 'lucide-react';

interface VideoAnalysisViewProps {
  timeline: VideoTimelineSegment[];
  interaction: VideoInteractionAnalysis;
  indicators: IndicatorAnalysis[];
  pancaCintaSummary?: PancaCintaSummary;
  onOpenEvidenceForId?: (indicatorId: string) => void;
}

export const VideoAnalysisView: React.FC<VideoAnalysisViewProps> = ({
  timeline,
  interaction,
  indicators,
  pancaCintaSummary,
  onOpenEvidenceForId
}) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    timeline[0]?.id || ''
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<'ALL' | PancaCintaPillar>('ALL');

  const activeSegment = timeline.find(s => s.id === selectedSegmentId) || timeline[0];

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

  const getPillarBadge = (pillar: PancaCintaPillar) => {
    switch (pillar) {
      case 'Cinta Allah dan Rasul':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Cinta Ilmu':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Cinta Diri Sendiri & Keselamatan':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Cinta Sesama & Lingkungan':
        return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'Cinta Tanah Air & Bangsa':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  const filteredSegmentsForPancaCinta = timeline.filter(seg => {
    if (selectedPillarFilter === 'ALL') return true;
    return seg.pancaCintaKbc?.pilar === selectedPillarFilter;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Video Visual Player */}
      <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 text-white">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Observasi Video Pembelajaran Digital & Telaah Panca Cinta (KBC)
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Rekaman 40 Menit • Analisis Audio-Visual Multimodal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
              <span>Kurikulum Berbasis Cinta (KBC) Terintegrasi</span>
            </div>
          </div>
        </div>

        {/* Video Canvas Simulation: Realistic Scene Frame */}
        <div className="relative aspect-video max-h-[420px] w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black flex flex-col items-center justify-between p-6 select-none overflow-hidden">
          
          {/* Top Overlays */}
          <div className="w-full flex items-center justify-between z-10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-emerald-400 font-mono border border-emerald-500/30">
                REC • {activeSegment?.timeRange || '00:00 - 03:20'}
              </span>
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-slate-300 font-medium border border-white/10 hidden sm:inline-block">
                Fase: <b className="text-white">{activeSegment?.faseKegiatan}</b>
              </span>
            </div>

            {/* Panca Cinta Badge on top right */}
            {activeSegment?.pancaCintaKbc && (
              <div className="bg-emerald-900/90 backdrop-blur-md text-emerald-200 px-3 py-1 rounded-full border border-emerald-500/40 font-bold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Panca Cinta: {activeSegment.pancaCintaKbc.pilar}</span>
              </div>
            )}
          </div>

          {/* Central Scene Snapshot Visual Illustration */}
          <div className="relative z-10 w-full max-w-2xl bg-black/60 backdrop-blur-md border border-white/15 p-5 rounded-2xl shadow-2xl space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {activeSegment?.sceneSnapshot?.setting || 'Laboratorium Madrasah'}
                </span>
                <h4 className="text-lg font-extrabold text-white leading-tight">
                  {activeSegment?.sceneSnapshot?.title || activeSegment?.faseKegiatan}
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/90 text-amber-950 shrink-0">
                Kamera: {activeSegment?.sceneSnapshot?.fokusKamera || 'Wide Shot'}
              </span>
            </div>

            {/* Adegan Kunci & Dialog Teks */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80 text-slate-200 leading-relaxed">
                <b className="text-emerald-300 flex items-center gap-1 mb-0.5">
                  <Camera className="w-3.5 h-3.5" /> Adegan yang Dilakonkan di Layar:
                </b>
                {activeSegment?.sceneSnapshot?.adeganKunci || activeSegment?.deskripsiAktivitas}
              </div>

              {activeSegment?.pancaCintaKbc && (
                <div className="bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/30 text-rose-200 leading-relaxed">
                  <b className="text-amber-300 flex items-center gap-1 mb-0.5">
                    <Quote className="w-3.5 h-3.5 text-amber-400" /> Kalimat/Teks Unsur Cinta yang Diucapkan:
                  </b>
                  <p className="italic text-white font-medium">
                    "{activeSegment.pancaCintaKbc.kalimatUcapanLakon}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls Bar */}
          <div className="w-full flex items-center justify-between z-10 text-xs pt-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all shadow-lg cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div className="text-slate-300 text-[11px] font-mono hidden sm:block">
                <span>{activeSegment?.timeRange}</span> / <span>40:00</span>
              </div>
            </div>

            <div className="text-slate-400 text-[11px]">
              Subjek Terlibat: <b className="text-white">{activeSegment?.sceneSnapshot?.karakterTerlibat || 'Guru & Siswa'}</b>
            </div>
          </div>

        </div>

        {/* Timeline Bar Navigation (Segment Buttons) */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Film className="w-4 h-4 text-emerald-400" />
              <span>POTONGAN ADEGAN VIDEO MENURUT TAHAPAN PEMBELAJARAN (Klik untuk melihat cuplikan):</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {timeline.length} Segmen Berurutan
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {timeline.map((seg, idx) => {
              const isSelected = seg.id === selectedSegmentId;
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                    isSelected 
                      ? 'ring-2 ring-emerald-400 bg-slate-800 shadow-lg scale-102 border-emerald-500' 
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{seg.timeRange}</span>
                    <span className="text-amber-400 font-bold">★ {seg.skorSegmen || 4}</span>
                  </div>
                  
                  <div className="text-xs font-bold text-white truncate mt-1">
                    {seg.faseKegiatan}
                  </div>

                  {seg.pancaCintaKbc && (
                    <div className="mt-1.5 pt-1 border-t border-slate-700/60 flex items-center gap-1 text-[9px] text-rose-300 truncate">
                      <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400 shrink-0" />
                      <span className="truncate">{seg.pancaCintaKbc.pilar.replace('Cinta ', '')}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rincian Adegan Terpilih & Analisis Panca Cinta KBC */}
      {activeSegment && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          
          {/* Header Adegan */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded border border-emerald-300">
                  {activeSegment.timeRange}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Fase: {activeSegment.faseKegiatan}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {activeSegment.sceneSnapshot?.title || activeSegment.faseKegiatan}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Skor Kualitas Sesi:</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-300">
                {activeSegment.skorSegmen || 4} / 4
              </span>
            </div>
          </div>

          {/* Dual Panel: Potongan Adegan Visual & Analisis Kurikulum Berbasis Cinta (KBC) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Panel Kiri: Potongan Adegan Video & Dialog */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <Film className="w-4 h-4 text-emerald-700" />
                  <span>Potongan Adegan Video & Setting Visual</span>
                </div>

                <div className="text-xs space-y-2 text-slate-700">
                  <div>
                    <b className="text-slate-900">Setting Lokasi:</b> {activeSegment.sceneSnapshot?.setting}
                  </div>
                  <div>
                    <b className="text-slate-900">Fokus Kamera:</b> {activeSegment.sceneSnapshot?.fokusKamera}
                  </div>
                  <div>
                    <b className="text-slate-900">Karakter Terlibat:</b> {activeSegment.sceneSnapshot?.karakterTerlibat}
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 leading-relaxed text-slate-800">
                    <b className="text-slate-900 block mb-1">Aksi & Perilaku yang Dilakonkan:</b>
                    {activeSegment.sceneSnapshot?.adeganKunci}
                  </div>
                </div>
              </div>

              {/* Transkrip Percakapan */}
              <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-blue-700" />
                  <span>Kutipan Transkrip Percakapan Guru - Siswa:</span>
                </div>
                <div className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-blue-100 italic leading-relaxed">
                  "{activeSegment.transkripExcerpt}"
                </div>
              </div>
            </div>

            {/* Panel Kanan: Deteksi Panca Cinta / KBC */}
            <div className="space-y-4">
              {activeSegment.pancaCintaKbc ? (
                <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
                      <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                      <span>Deteksi Nilai Panca Cinta / KBC</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getPillarBadge(activeSegment.pancaCintaKbc.pilar)}`}>
                      {activeSegment.pancaCintaKbc.pilar}
                    </span>
                  </div>

                  {/* Kalimat yang Diucapkan */}
                  <div className="bg-white p-3.5 rounded-xl border border-rose-200 space-y-1">
                    <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                      Kalimat / Teks yang Diucapkan / Dilakonkan:
                    </span>
                    <p className="text-xs text-slate-900 font-semibold italic leading-relaxed">
                      "{activeSegment.pancaCintaKbc.kalimatUcapanLakon}"
                    </p>
                  </div>

                  {/* Perilaku Lakon yang Ditampilkan */}
                  <div className="text-xs text-slate-700 space-y-1">
                    <b className="text-slate-900">Perwujudan Lakon di Kelas:</b>
                    <p className="leading-relaxed bg-white/80 p-2.5 rounded border border-rose-100">
                      {activeSegment.pancaCintaKbc.deskripsiLakon}
                    </p>
                  </div>

                  {/* Makna Pedagogis */}
                  <div className="text-xs text-emerald-950 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <b>Makna Nilai Cinta (KBC):</b> {activeSegment.pancaCintaKbc.maknaPedagogis}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-slate-200">
                  Unsur spesifik Panca Cinta belum terpetakan pada segmen ini.
                </div>
              )}

              {/* Indikator Supervisi Terkait */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-xs text-slate-700 uppercase tracking-wider block">
                  Indikator Supervisi Terkait Pada Segmen Ini:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSegment.indikatorTerkait.map(indId => {
                    const ind = indicators.find(i => i.id === indId);
                    return (
                      <button
                        key={indId}
                        type="button"
                        onClick={() => onOpenEvidenceForId && onOpenEvidenceForId(indId)}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-300 text-left transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <span className="font-mono font-bold text-emerald-800">{indId}</span>
                        <span className="text-[11px] text-slate-700 truncate max-w-[180px]">
                          {ind?.namaIndikator || 'Indikator'}
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          KATALOG SEMUA POTONGAN ADEGAN & DETEKSI PANCA CINTA (KBC)
          ======================================================== */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <span>Katalog Potongan Adegan Video & Analisis Panca Cinta (KBC)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Setiap potongan adegan dilengkapi teks ucapan yang dilakonkan, visual adegan, dan pilar Kurikulum Berbasis Cinta.
            </p>
          </div>

          {/* Filter Pilar Panca Cinta */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500 mr-1">Filter Pilar:</span>
            {(['ALL', 'Cinta Allah dan Rasul', 'Cinta Ilmu', 'Cinta Diri Sendiri & Keselamatan', 'Cinta Sesama & Lingkungan', 'Cinta Tanah Air & Bangsa'] as Array<'ALL' | PancaCintaPillar>).map((pil) => (
              <button
                key={pil}
                type="button"
                onClick={() => setSelectedPillarFilter(pil)}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                  selectedPillarFilter === pil
                    ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {pil === 'ALL' ? 'Semua (7 Adegan)' : pil.replace('Cinta ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Panca Cinta Summary Cards */}
        {pancaCintaSummary && (
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 p-5 rounded-2xl border border-rose-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                  Ikhtisar Kurikulum Berbasis Cinta (KBC) di Kelas
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Implementasi Panca Cinta Terlaksana Sangat Kuat ({pancaCintaSummary.persentaseImplementasi}%)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs shadow-xs">
                  {pancaCintaSummary.totalTerdeteksi} Bukti Terdeteksi
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-700 text-white font-bold text-xs shadow-xs">
                  Skor Rata-rata: {pancaCintaSummary.skorRataRata} / 4.00
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{pancaCintaSummary.catatanKurikulumBerbasisCinta}"
            </p>

            {/* 5 Pillars Status Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
              {pancaCintaSummary.pilarStatus.map((p, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-rose-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">Pilar {i + 1}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate" title={p.pilar}>
                    {p.pilar}
                  </div>
                  <div className="text-[11px] text-rose-700 font-semibold">
                    {p.frekuensiMuncul}x Muncul ({p.timestampAdegan})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery of Video Scene Clips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSegmentsForPancaCinta.map((seg, idx) => (
            <div 
              key={seg.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Card */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-emerald-400 px-2.5 py-0.5 rounded">
                        {seg.timeRange}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getFaseColor(seg.faseKegiatan)}`}>
                        {seg.faseKegiatan}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug pt-1">
                      {seg.sceneSnapshot?.title || seg.faseKegiatan}
                    </h4>
                  </div>
                  <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-1 rounded">
                    ★ {seg.skorSegmen || 4}/4
                  </span>
                </div>

                {/* Potongan Adegan & Setting */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-700">
                  <div className="text-[11px] text-slate-500 font-medium">
                    <b>Fokus Kamera:</b> {seg.sceneSnapshot?.fokusKamera} • <b>Lokasi:</b> {seg.sceneSnapshot?.setting}
                  </div>
                  <div className="pt-1 text-slate-800 leading-relaxed">
                    <b>Adegan Dilakonkan:</b> {seg.sceneSnapshot?.adeganKunci}
                  </div>
                </div>

                {/* Panca Cinta KBC Box with Spoken Quote */}
                {seg.pancaCintaKbc && (
                  <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-rose-900 flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                        <span>Pilar: {seg.pancaCintaKbc.pilar}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-rose-700">Terdeteksi Nyata</span>
                    </div>

                    <div className="bg-white p-2.5 rounded border border-rose-200 text-slate-900 italic font-medium">
                      "{seg.pancaCintaKbc.kalimatUcapanLakon}"
                    </div>

                    <div className="text-[11px] text-slate-600">
                      <b>Makna:</b> {seg.pancaCintaKbc.maknaPedagogis}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Play / Jump */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  Indikator: {seg.indikatorTerkait.join(', ')}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Lihat Potongan Adegan</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

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
