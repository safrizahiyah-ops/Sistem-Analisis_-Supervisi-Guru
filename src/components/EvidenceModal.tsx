import React, { useState } from 'react';
import { IndicatorAnalysis, IndicatorScore } from '../types/supervision';
import { 
  X, 
  FileText, 
  Video, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Quote, 
  Lightbulb, 
  UserCheck, 
  MessageSquare,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

interface EvidenceModalProps {
  indicator: IndicatorAnalysis | null;
  onClose: () => void;
  onUpdateScore: (indicatorId: string, supervisorScore: IndicatorScore, notes?: string, teacherNotes?: string) => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  indicator,
  onClose,
  onUpdateScore
}) => {
  if (!indicator) return null;

  const [selectedScore, setSelectedScore] = useState<IndicatorScore>(
    indicator.skorSupervisor !== undefined ? indicator.skorSupervisor : indicator.skorAi
  );
  const [supervisorNotes, setSupervisorNotes] = useState<string>(indicator.catatanSupervisor || '');
  const [teacherNotes, setTeacherNotes] = useState<string>(indicator.catatanGuru || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onUpdateScore(indicator.id, selectedScore, supervisorNotes, teacherNotes);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const getScoreBadge = (score: IndicatorScore) => {
    if (score === 'N/A') return 'bg-slate-100 text-slate-700 border-slate-300';
    if (score === 4) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (score === 3) return 'bg-teal-100 text-teal-800 border-teal-300';
    if (score === 2) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded text-xs font-bold font-mono tracking-wide">
                INDIKATOR {indicator.id}
              </span>
              <span className="text-xs text-emerald-200">
                Komponen {indicator.componentId}
              </span>
              {indicator.diverifikasiSupervisor && (
                <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Diverifikasi Supervisor
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">
              {indicator.namaIndikator}
            </h3>
            <p className="text-xs text-emerald-100 mt-1 opacity-90">
              {indicator.deskripsi}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">

          {/* AI Reasoning & Score Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Skor Diberikan AI:
                </span>
                <span className={`px-2.5 py-1 rounded font-black text-sm border ${getScoreBadge(indicator.skorAi)}`}>
                  {indicator.skorAi} / 4 ({indicator.statusKeterpenuhan})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Tingkat Keyakinan Evidence:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                  indicator.confidence === 'Tinggi' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : indicator.confidence === 'Sedang'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {indicator.confidence}
                </span>
              </div>
            </div>

            {indicator.confidence === 'Rendah' && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-2.5 mt-3 text-xs text-amber-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Confidence rendah: <b>Perlu verifikasi supervisor</b> secara langsung ke dokumen/rekaman.</span>
              </div>
            )}

            <div className="mt-3">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Alasan Pemberian Skor:
              </h4>
              <p className="text-slate-800 text-sm leading-relaxed">
                {indicator.alasanSkor}
              </p>
            </div>

            {indicator.kekurangan && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Catatan Keterbatasan / Kekurangan:
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed bg-amber-50/60 p-2 rounded border border-amber-200">
                  {indicator.kekurangan}
                </p>
              </div>
            )}
          </div>

          {/* Evidence Grid: Document & Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Document Evidence */}
            <div className="bg-blue-50/40 border border-blue-200 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <FileText className="w-4 h-4 text-blue-700" /> Bukti Dokumen (Document Evidence)
                </div>
                {indicator.documentEvidence ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold truncate max-w-[200px]" title={indicator.documentEvidence.namaFile}>
                        {indicator.documentEvidence.namaFile}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono font-bold">
                        {indicator.documentEvidence.halaman}
                      </span>
                    </div>
                    {indicator.documentEvidence.bagianHeading && (
                      <div className="text-[11px] text-slate-500 font-medium">
                        Bagian: {indicator.documentEvidence.bagianHeading}
                      </div>
                    )}
                    <div className="bg-white p-3 rounded border border-blue-100 text-slate-800 italic relative text-xs leading-relaxed">
                      <Quote className="w-3.5 h-3.5 text-blue-300 absolute -top-1.5 -left-1" />
                      "{indicator.documentEvidence.kutipanTeks}"
                    </div>
                    {indicator.documentEvidence.isAiInference && (
                      <span className="inline-block text-[11px] text-amber-700 font-semibold mt-1">
                        ⚠️ Inferensi AI — perlu verifikasi supervisor.
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 text-xs italic">
                    Bukti belum ditemukan dalam dokumen yang diunggah.
                  </div>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-blue-100 text-[11px] text-slate-500">
                Sumber: {indicator.documentEvidence?.halaman || 'Tidak ditemukan'}
              </div>
            </div>

            {/* Video Evidence */}
            <div className="bg-purple-50/40 border border-purple-200 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <Video className="w-4 h-4 text-purple-700" /> Bukti Video (Video Evidence)
                </div>
                {indicator.videoEvidence ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold truncate max-w-[180px]" title={indicator.videoEvidence.namaVideo}>
                        {indicator.videoEvidence.namaVideo}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {indicator.videoEvidence.timestamp}
                      </span>
                    </div>
                    {indicator.videoEvidence.aktivitasTerdeteksi && (
                      <div className="text-[11px] text-purple-800 font-medium bg-purple-100/60 px-2 py-0.5 rounded">
                        Aktivitas: {indicator.videoEvidence.aktivitasTerdeteksi}
                      </div>
                    )}
                    {indicator.videoEvidence.transkrip && (
                      <div className="bg-white p-3 rounded border border-purple-100 text-slate-800 italic relative text-xs leading-relaxed">
                        <Quote className="w-3.5 h-3.5 text-purple-300 absolute -top-1.5 -left-1" />
                        "{indicator.videoEvidence.transkrip}"
                      </div>
                    )}
                    {indicator.videoEvidence.deskripsiVisual && (
                      <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                        <b>Visual:</b> {indicator.videoEvidence.deskripsiVisual}
                      </div>
                    )}
                    {indicator.videoEvidence.isAiInference && (
                      <span className="inline-block text-[11px] text-amber-700 font-semibold mt-1">
                        ⚠️ Inferensi AI — perlu verifikasi supervisor.
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 text-xs italic">
                    Bukti belum ditemukan dalam rekaman video pembelajaran.
                  </div>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-purple-100 text-[11px] text-slate-500">
                Timestamp: {indicator.videoEvidence?.timestamp || 'Tidak ditemukan'}
              </div>
            </div>

          </div>

          {/* Recommendation Box */}
          {indicator.rekomendasi && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-900 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-emerald-700" /> Rekomendasi Perbaikan Praktis
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  indicator.rekomendasi.prioritas === 'Tinggi' 
                    ? 'bg-rose-100 text-rose-800' 
                    : indicator.rekomendasi.prioritas === 'Sedang'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Prioritas {indicator.rekomendasi.prioritas}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <b className="text-slate-900">Masalah / Kesenjangan:</b> {indicator.rekomendasi.masalah}
                </div>
                <div>
                  <b className="text-slate-900">Mengapa Penting:</b> {indicator.rekomendasi.mengapaPenting}
                </div>
                <div className="bg-white p-2.5 rounded border border-emerald-200 text-emerald-950 font-medium">
                  <b>Tindakan yang Disarankan:</b> {indicator.rekomendasi.tindakanDisarankan}
                </div>
                <div className="text-[11px] text-slate-600">
                  <b>Contoh Implementasi Kelas:</b> {indicator.rekomendasi.contohImplementasi}
                </div>
              </div>
            </div>
          )}

          {/* Supervisor Verification & Adjustment Panel */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-700" /> Mode Verifikasi Supervisor Akademik
              </h4>
              <span className="text-[11px] text-amber-700">
                Supervisor berhak mengubah skor dan menambah catatan pembinaan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tetapkan Skor Akhir (Supervisor Score):
                </label>
                <div className="flex items-center gap-2">
                  {([4, 3, 2, 1, 'N/A'] as IndicatorScore[]).map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setSelectedScore(sc)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold border transition-all ${
                        selectedScore === sc 
                          ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs ring-2 ring-emerald-400' 
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
                {selectedScore !== indicator.skorAi && (
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    * Skor diubah dari AI ({indicator.skorAi} ➔ {selectedScore}). Label "Diverifikasi Supervisor" akan disematkan.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan Pembinaan Supervisor:
                </label>
                <textarea
                  value={supervisorNotes}
                  onChange={(e) => setSupervisorNotes(e.target.value)}
                  placeholder="Tuliskan arahan, tindak lanjut, atau klarifikasi hasil observasi..."
                  rows={2}
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-emerald-600 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" /> Tanggapan / Catatan Guru Binaan:
              </label>
              <textarea
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
                placeholder="Tuliskan refleksi atau komitmen guru terhadap indikator ini..."
                rows={2}
                className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-emerald-600 bg-white"
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {savedSuccess ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Perubahan berhasil disimpan!
              </span>
            ) : (
              <span>Klik Simpan untuk memperbarui nilai akhir supervisi.</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" /> Simpan Verifikasi
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
