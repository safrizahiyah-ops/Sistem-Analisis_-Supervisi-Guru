import React, { useState } from 'react';
import { UploadedFileItem, TeacherProfile } from '../types/supervision';
import { 
  UploadCloud, 
  FileText, 
  Video, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  Sparkles, 
  FileCode,
  Layers,
  ArrowRight
} from 'lucide-react';

interface UploadViewProps {
  files: UploadedFileItem[];
  onAddFiles: (newFiles: UploadedFileItem[]) => void;
  onRemoveFile: (fileId: string) => void;
  documentTextSnippet: string;
  onChangeDocumentText: (text: string) => void;
  videoTranscriptSnippet: string;
  onChangeVideoTranscript: (text: string) => void;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
  analysisProgressStep: number; // 0 to 7
  profile: TeacherProfile;
}

export const UploadView: React.FC<UploadViewProps> = ({
  files,
  onAddFiles,
  onRemoveFile,
  documentTextSnippet,
  onChangeDocumentText,
  videoTranscriptSnippet,
  onChangeVideoTranscript,
  onStartAnalysis,
  isAnalyzing,
  analysisProgressStep,
  profile
}) => {
  const [activeTab, setActiveTab] = useState<'FILE_UPLOAD' | 'PASTE_TEXT'>('FILE_UPLOAD');

  const progressSteps = [
    'Mengunggah',
    'Membaca',
    'Mengekstraksi',
    'Menganalisis',
    'Memetakan Indikator',
    'Menghitung Skor',
    'Membuat Laporan'
  ];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, category: string, fileType: 'document' | 'video') => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newItems: UploadedFileItem[] = Array.from(e.target.files).map((f) => {
      return {
        id: `f-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: f.name,
        size: f.size,
        type: fileType,
        mimeType: f.type,
        category: category,
        contentSnippet: `File: ${f.name} (${Math.round(f.size / 1024)} KB). Siap diekstraksi AI.`,
        uploadDate: new Date().toLocaleString()
      };
    });

    onAddFiles(newItems);
  };

  const docFiles = files.filter(f => f.type === 'document');
  const videoFiles = files.filter(f => f.type === 'video');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-emerald-700" />
            Upload Dokumen Perangkat Pembelajaran & Video Observasi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Dukung DOC, DOCX, PDF, serta video MP4, MOV, AVI, WEBM, MKV untuk dianalisis otomatis dengan AI.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
            {docFiles.length} Dokumen
          </span>
          <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
            {videoFiles.length} Video
          </span>
        </div>
      </div>

      {/* Progress Stepper Bar (Active when analyzing) */}
      {isAnalyzing && (
        <div className="bg-emerald-900 text-white rounded-xl shadow-md p-6 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
              <h4 className="font-bold text-sm">
                Proses Analisis Multimodal AI Sedang Berlangsung...
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-200">
              Tahap {analysisProgressStep + 1} dari {progressSteps.length}
            </span>
          </div>

          {/* Stepper Horizontal */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
            {progressSteps.map((stepName, idx) => {
              const isPassed = idx < analysisProgressStep;
              const isCurrent = idx === analysisProgressStep;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-amber-950 font-black border-amber-300 shadow-md scale-102 ring-2 ring-amber-300'
                      : isPassed
                      ? 'bg-emerald-800 text-emerald-100 font-semibold border-emerald-700'
                      : 'bg-emerald-950/60 text-emerald-400/60 border-emerald-900'
                  }`}
                >
                  <div className="text-[10px] font-mono opacity-80">Langkah {idx + 1}</div>
                  <div className="text-[11px] truncate mt-0.5">{stepName}</div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-emerald-200/90 text-center italic">
            "AI membaca CP, TP, diferensiasi LKPD, menyampling frame video, mendeteksi pola interaksi, dan memetakan 36 indikator tanpa mengarang bukti."
          </div>
        </div>
      )}

      {/* Upload Tabs: File Upload vs Direct Text Paste */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('FILE_UPLOAD')}
            className={`py-3 px-5 font-bold text-xs border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'FILE_UPLOAD'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Unggah Berkas (Dokumen & Video)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('PASTE_TEXT')}
            className={`py-3 px-5 font-bold text-xs border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'PASTE_TEXT'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Teks & Transkrip Langsung (Ekstraksi Cepat)</span>
          </button>
        </div>

        {activeTab === 'FILE_UPLOAD' ? (
          <div className="p-6 space-y-6">
            
            {/* Dual Dropzones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Dokumen Dropzone */}
              <div className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-xl p-6 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Dokumen Perangkat Pembelajaran
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modul Ajar, RPP, LKPD, Rubrik Asesmen, Bahan Ajar (PDF, DOC, DOCX)
                  </p>
                </div>
                <label className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4" />
                  <span>Pilih Dokumen</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileInput(e, 'Modul Ajar & LKPD', 'document')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Video Dropzone */}
              <div className="border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-xl p-6 text-center bg-purple-50/20 hover:bg-purple-50/40 transition-colors flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Video Pembelajaran Kelas
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rekaman Praktik Mengajar (MP4, MOV, AVI, MKV, WEBM)
                  </p>
                </div>
                <label className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4" />
                  <span>Pilih Video</span>
                  <input
                    type="file"
                    multiple
                    accept="video/*,.mp4,.mov,.avi,.mkv,.webm"
                    onChange={(e) => handleFileInput(e, 'Video Pembelajaran', 'video')}
                    className="hidden"
                  />
                </label>
              </div>

            </div>

            {/* Uploaded Files Table */}
            <div>
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
                Daftar Berkas Terunggah ({files.length}):
              </h4>
              
              {files.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-slate-200">
                  Belum ada dokumen atau video yang diunggah. Silakan klik tombol di atas atau gunakan data contoh.
                </div>
              ) : (
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                  {files.map((file) => (
                    <div key={file.id} className="p-3 bg-white flex items-center justify-between text-xs hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${file.type === 'document' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {file.type === 'document' ? <FileText className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{file.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {file.category} • {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.uploadDate}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFile(file.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Direct Text Extraction / Paste Tab */
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900 leading-relaxed">
              <b>Fitur Ekstraksi Fleksibel:</b> Anda dapat menempelkan kutipan isi Modul Ajar, RPP, LKPD, serta transkrip audio video kelas secara langsung di bawah ini untuk mempercepat analisis AI tanpa bergantung pada ukuran file biner.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" /> Teks Ekstraksi Dokumen / Modul / LKPD:
                </label>
                <textarea
                  value={documentTextSnippet}
                  onChange={(e) => onChangeDocumentText(e.target.value)}
                  placeholder="Tempelkan isi Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), sintaks model pembelajaran, LKPD, rubrik asesmen, dan refleksi..."
                  rows={8}
                  className="w-full p-3 rounded-lg border border-slate-300 font-mono text-xs focus:outline-emerald-600 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-purple-600" /> Transkrip / Catatan Observasi Video:
                </label>
                <textarea
                  value={videoTranscriptSnippet}
                  onChange={(e) => onChangeVideoTranscript(e.target.value)}
                  placeholder="Tempelkan transkrip audio percakapan guru-siswa, catatan aktivitas timeline (misal: 05:00 apersepsi, 15:00 diskusi kelompok)..."
                  rows={8}
                  className="w-full p-3 rounded-lg border border-slate-300 font-mono text-xs focus:outline-emerald-600 bg-slate-50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Trigger */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Guru: <b>{profile.namaGuru || 'Belum diisi'}</b> • {profile.mataPelajaran || 'Mapel belum dipilih'}
          </div>

          <button
            type="button"
            onClick={onStartAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 text-amber-300" />
            <span>{isAnalyzing ? 'Sedang Menganalisis...' : 'Mulai Analisis AI Sekarang'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
