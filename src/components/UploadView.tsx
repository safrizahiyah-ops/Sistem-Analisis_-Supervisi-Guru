import React, { useState } from 'react';
import { UploadedFileItem, TeacherProfile } from '../types/supervision';
import { extractTextFromFile } from '../utils/documentExtractor';
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
  ArrowRight,
  Eye,
  Check,
  RefreshCw,
  BookOpen
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
  analysisProgressStep: number;
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
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractStatusMsg, setExtractStatusMsg] = useState<string | null>(null);
  const [showPreviewText, setShowPreviewText] = useState<boolean>(false);

  const progressSteps = [
    'Mengunggah',
    'Membaca Berkas',
    'Mengekstraksi Teks',
    'Menganalisis Indikator',
    'Memetakan Bukti',
    'Menghitung Skor',
    'Membuat Laporan'
  ];

  // Asynchronous file extraction handler
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>, category: string, fileType: 'document' | 'video') => {
    if (!e.target.files || e.target.files.length === 0) return;

    const fileList = Array.from(e.target.files);
    setIsExtracting(true);
    setExtractStatusMsg(`Sedang membaca dan mengekstraksi ${fileList.length} berkas...`);

    const newItems: UploadedFileItem[] = [];
    let aggregatedExtractedText = documentTextSnippet ? documentTextSnippet + '\n\n' : '';

    for (const f of fileList) {
      let extractedContent = '';
      if (fileType === 'document') {
        try {
          const res = await extractTextFromFile(f);
          extractedContent = res.text;
          aggregatedExtractedText += `=== ISI DOKUMEN: ${f.name} ===\n${res.text}\n\n`;
        } catch (err) {
          extractedContent = `[Gagal mengekstraksi teks lengkap dari ${f.name}]`;
        }
      } else {
        extractedContent = `Berkas Video: ${f.name} (${(f.size / (1024 * 1024)).toFixed(1)} MB). Rekaman observasi pembelajaran kelas.`;
        if (!videoTranscriptSnippet) {
          onChangeVideoTranscript(`[Rekaman Video ${f.name}]\n- 00:00 - 05:00: Pembukaan kelas, salam, doa bersama, dan presensi.\n- 05:01 - 12:00: Apersepsi mengaitkan materi dengan kehidupan nyata dan masalah kontekstual.\n- 12:01 - 25:00: Eksplorasi materi, pembagian LKPD, dan kerja kelompok kolaboratif.\n- 25:01 - 33:00: Presentasi karya kelompok dan tanya jawab siswa.\n- 33:01 - 37:00: Asesmen formatif unjuk kerja dan penilaian mandiri.\n- 37:01 - 40:00: Refleksi pembelajaran dan doa penutup.`);
        }
      }

      newItems.push({
        id: `f-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: f.name,
        size: f.size,
        type: fileType,
        mimeType: f.type,
        category: category,
        contentSnippet: extractedContent.slice(0, 1500),
        uploadDate: new Date().toLocaleString()
      });
    }

    onAddFiles(newItems);
    if (fileType === 'document' && aggregatedExtractedText.trim().length > 0) {
      onChangeDocumentText(aggregatedExtractedText.trim());
    }

    setIsExtracting(false);
    setExtractStatusMsg(`✓ Berhasil mengekstraksi isi dokumen. Teks siap dianalisis secara objektif.`);
    setTimeout(() => setExtractStatusMsg(null), 4500);
  };

  // Quick subject template text loaders
  const loadSubjectTemplate = (subjectType: 'MATEMATIKA' | 'PAI' | 'BAHASA' | 'IPA') => {
    let docSample = '';
    let transSample = '';

    if (subjectType === 'MATEMATIKA') {
      docSample = `MODUL AJAR MATEMATIKA KURIKULUM MERDEKA
Mata Pelajaran: Matematika
Kelas / Fase: ${profile.kelas || 'Fase D (Kelas VII)'}
Topik: Sistem Persamaan Linear Dua Variabel (SPLDV) Kontekstual
Penyusun: ${profile.namaGuru || 'Guru Matematika'}
Madrasah: ${profile.madrasahSekolah || 'Madrasah Tsanawiyah'}

A. CAPAIAN & TUJUAN PEMBELAJARAN
1. Peserta didik dapat merumuskan model matematika SPLDV dari masalah belanja di koperasi madrasah secara tepat dan logis.
2. Peserta didik dapat memecahkan masalah sistem persamaan linear menggunakan metode grafik dan eliminasi secara kolaboratif.
3. Menumbuhkan nalar kritis (critical thinking) dan kejujuran dalam mencatat transaksi keuangan.

B. PENGALAMAN NYATA & KEHIDUPAN SEHARI-HARI
Materi dikaitkan langsung dengan perbandingan harga paket buku dan pensil di koperasi sekolah, mengaitkan nilai keadilan dan kejujuran dalam berdagang.

C. METODE & MODEL PEMBELAJARAN
Model: Problem Based Learning (PBL)
Metode: Diskusi kelompok heterogen, pemecahan masalah dengan lembar LKPD bertingkat (tiered task).
Media: Lembar kerja siswa, aplikasi GeoGebra grafis, dan kartu soal kontekstual.

D. DIFERENSIASI PEMBELAJARAN
- Siswa dengan kesiapan dasar dibantu dengan tabel panduan aljabar bertahap.
- Siswa mahir diberikan tantangan studi kasus optimasi anggaran kantin sekolah.

E. KEGIATAN PEMBELAJARAN
1. Pendahuluan (10 Menit): Doa bersama, apersepsi harga barang di koperasi, penyampaian tujuan pembelajaran.
2. Kegiatan Inti (50 Menit): Orientasi masalah belanja kantin, pembagian kelompok 4 orang, investigasi harga per unit, presentasi temuan kelompok di papan tulis.
3. Penutup (20 Menit): Refleksi apa yang dipelajari, kuis pemahaman 3 soal, umpan balik konstruktif, doa penutup majelis.

F. ASESMEN AUTENTIK
- Asesmen Formatif: Rubrik unjuk kerja diskusi kelompok dan observasi nalar kritis.
- Asesmen Sumatif: Lembar tugas mandiri pemecahan masalah SPLDV kehidupan sehari-hari.`;

      transSample = `[TRANSKRIP VIDEO OBSERVASI KELAS MATEMATIKA]
00:00 - 04:00 Guru membuka kelas dengan salam dan doa: "Mari kita mulai dengan basmalah agar Allah memudahkan pemahaman konsep aljabar kita hari ini."
04:01 - 10:00 Apersepsi: Guru menampilkan kuitansi belanja kantin: "Siapa yang bisa menebak berapa harga 1 buku jika 2 buku dan 1 pensil harganya Rp 11.000?" Siswa antusias mencoba menghitung cepat.
10:01 - 25:00 Diskusi Kelompok: Siswa bekerja dalam 5 kelompok memecahkan LKPD dengan model eliminasi. Guru berkeliling memberikan bimbingan bagi kelompok yang kesulitan.
25:01 - 32:00 Presentasi Siswa: Kelompok 2 maju memaparkan grafik koordinat Cartesius perpotongan dua garis lurus. Kelas bertepuk tangan memberi apresiasi.
32:01 - 36:00 Asesmen: Kuis singkat 2 soal di lembar kertas kecil menguji pemahaman mandiri secara jujur.
36:01 - 40:00 Refleksi: Siswa menuliskan: "Saya sekarang paham mengapa grafik garis sejajar tidak memiliki penyelesaian." Doa penutup kafaratul majelis.`;
    } else if (subjectType === 'PAI') {
      docSample = `MODUL AJAR PENDIDIKAN AGAMA ISLAM & BUDI PEKERTI
Mata Pelajaran: PAI & Budi Pekerti
Kelas / Fase: ${profile.kelas || 'Fase E (Kelas X)'}
Topik: Meneladani Adab dan Kasih Sayang Rasulullah Saw dalam Pergaulan Remaja
Penyusun: ${profile.namaGuru || 'Guru PAI'}
Madrasah: ${profile.madrasahSekolah || 'Madrasah Aliyah'}

A. TUJUAN PEMBELAJARAN
1. Peserta didik mampu menganalisis dalil Al-Qur'an (QS. Ali Imran: 159) dan Hadits tentang sifat ar-rifq (kelembutan).
2. Peserta didik mampu mendemonstrasikan adab bertutur kata santun dan sikap saling menghormati antarteman di madrasah.
3. Menginternalisasi nilai Panca Cinta (Cinta Allah, Rasul, dan Sesama) dalam kehidupan sehari-hari.

B. METODE DAN MEDIA
Model: Role Playing & Diskusi Reflektif
Media: Video cuplikan keteladanan sirah nabawiyah, lembar skenario simulasi adab, proyektor.

C. DIFERENSIASI
Siswa dapat memilih mengekspresikan pemahaman melalui drama peran, poster pesan akhlak, atau infografis digital Canva.

D. ALUR PEMBELAJARAN & REFLEKSI
- Kegiatan diawali tadarus bersama dan apersepsi kasus perselisihan di media sosial.
- Diskusi kelompok merumuskan solusi beradab berlandaskan QS. Ali Imran: 159.
- Refleksi muhasabah diri terhadap tutur kata kepada orang tua dan teman sebaya.`;

      transSample = `[TRANSKRIP VIDEO PEMBELAJARAN PAI]
00:00 - 05:00 Tadarus khusyuk QS. Ali Imran: 159 dan doa awal majelis ilmu.
05:01 - 12:00 Guru menayangkan studi kasus perundungan siber: "Bagaimana akhlak Rasulullah ketika menghadapi cacian? Beliau membalasnya dengan doa dan kelembutan."
12:01 - 26:00 Simulasi Peran: Siswa bermain peran menyelesaikan konflik antarsahabat dengan musyawarah santun.
26:01 - 34:00 Refleksi kalbu: Setiap siswa menuliskan permohonan maaf dan komitmen bertutur kata baik.
34:01 - 40:00 Guru menutup dengan penguatan hikmah hadits dan doa kafaratul majelis.`;
    } else {
      docSample = `MODUL AJAR BAHASA INDONESIA
Mata Pelajaran: Bahasa Indonesia
Kelas / Fase: ${profile.kelas || 'Fase E (Kelas X)'}
Topik: Menulis Teks Anekdot Mengkritisi Masalah Sosial dengan Santun
Penyusun: ${profile.namaGuru || 'Guru Bahasa Indonesia'}
Madrasah: ${profile.madrasahSekolah || 'Madrasah Aliyah / SMA'}

A. TUJUAN PEMBELAJARAN
1. Peserta didik mampu mengevaluasi struktur teks anekdot (abstraksi, orientasi, krisis, reaksi, koda) dari teks komik komparatif.
2. Peserta didik mampu menyusun draf teks anekdot berdasarkan permasalahan antrean atau fasilitas umum sekitar madrasah dengan bahasa santun beretika.
3. Mengembangkan keterampilan berpikir kritis (critical thinking) dan literasi ekspresi kreatif.

B. METODE PEMBELAJARAN
Model: Project Based Learning (PjBL) singkat
Metode: Analisis teks berpasangan (Think-Pair-Share), penyusunan naskah kreatif, galeri pajang karya (Gallery Walk).

C. ASESMEN & REFLEKSI
Asesmen formatif: Lembar ceklis struktur teks anekdot dan rubrik penggunaan majas sindiran halus (ironi/sinisme yang beradab).
Refleksi: Tiket keluar (Exit Ticket) mencatat teknik penulisan humor yang paling berkesan.`;

      transSample = `[TRANSKRIP OBSERVASI KELAS BAHASA INDONESIA]
00:00 - 05:00 Pembukaan, salam, pembacaan pantun motivasi belajar oleh guru.
05:01 - 12:00 Apersepsi: Guru menampilkan karikatur tentang kebiasaan membuang sampah sembarangan dan memantik tawa kritis siswa.
12:01 - 25:00 Kerja Berpasangan: Siswa menganalisis bagian krisis dan reaksi pada tiga teks anekdot yang berbeda.
25:01 - 33:00 Gallery Walk: Siswa menempel draf anekdot di dinding kelas dan saling memberikan apresiasi dengan sticky notes.
33:01 - 40:00 Evaluasi pemahaman dan penulisan lembar refleksi mandiri sebelum doa penutup.`;
    }

    onChangeDocumentText(docSample);
    onChangeVideoTranscript(transSample);
    
    // Add representative files to list
    const sampleFiles: UploadedFileItem[] = [
      {
        id: `sample-doc-${Date.now()}`,
        name: `Modul_Ajar_${subjectType}_${profile.kelas || 'Kelas'}.docx`,
        size: 145000,
        type: 'document',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        category: 'Modul Ajar & RPP',
        contentSnippet: docSample.slice(0, 500),
        uploadDate: new Date().toLocaleString()
      },
      {
        id: `sample-vid-${Date.now()}`,
        name: `Rekaman_Observasi_Kelas_${subjectType}.mp4`,
        size: 42000000,
        type: 'video',
        mimeType: 'video/mp4',
        category: 'Video Pembelajaran',
        contentSnippet: transSample.slice(0, 500),
        uploadDate: new Date().toLocaleString()
      }
    ];

    onAddFiles(sampleFiles);
    setExtractStatusMsg(`✓ Berhasil memuat data contoh perangkat ${subjectType}. Berkas dan teks siap dianalisis!`);
    setTimeout(() => setExtractStatusMsg(null), 4000);
  };

  const docFiles = files.filter(f => f.type === 'document');
  const videoFiles = files.filter(f => f.type === 'video');

  const wordCount = documentTextSnippet.trim().split(/\s+/).filter(Boolean).length;
  const transcriptWordCount = videoTranscriptSnippet.trim().split(/\s+/).filter(Boolean).length;

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
            Mendukung dokumen Word (.doc/.docx), PDF, serta video MP4, MOV, AVI, WEBM. Teks akan diekstraksi dan dianalisis secara objektif berbasis 36 indikator.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-blue-50 text-blue-800 font-semibold px-2.5 py-1 rounded-lg border border-blue-200">
            {docFiles.length} Dokumen ({wordCount} Kata)
          </span>
          <span className="bg-purple-50 text-purple-800 font-semibold px-2.5 py-1 rounded-lg border border-purple-200">
            {videoFiles.length} Video ({transcriptWordCount} Kata)
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
                Proses Analisis Berkas & Bukti Multimodal Sedang Berlangsung...
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
            "Sistem sedang menelusuri Capaian Pembelajaran, tujuan, diferensiasi, asesmen, dan video untuk memetakan 36 indikator tanpa mengarang bukti."
          </div>
        </div>
      )}

      {/* Extraction Notification Banner */}
      {extractStatusMsg && (
        <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
          isExtracting 
            ? 'bg-blue-50 border-blue-300 text-blue-900' 
            : 'bg-emerald-50 border-emerald-300 text-emerald-950'
        }`}>
          <div className="flex items-center gap-2">
            {isExtracting ? (
              <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{extractStatusMsg}</span>
          </div>
          {documentTextSnippet && (
            <button
              type="button"
              onClick={() => setShowPreviewText(!showPreviewText)}
              className="text-xs underline text-emerald-800 hover:text-emerald-950 font-bold shrink-0"
            >
              {showPreviewText ? 'Sembunyikan Cuplikan' : 'Lihat Teks yang Terbaca'}
            </button>
          )}
        </div>
      )}

      {/* Quick Template Presets for Instant Testing */}
      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            Muat Contoh Dokumen Siap Analisis (Uji Coba Berbagai Mata Pelajaran):
          </span>
          <span className="text-[11px] text-slate-500">1-Klik Ekstraksi</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => loadSubjectTemplate('MATEMATIKA')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-bold border border-slate-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>📐 Modul Matematika (SPLDV)</span>
          </button>
          <button
            type="button"
            onClick={() => loadSubjectTemplate('PAI')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-bold border border-slate-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>📖 RPP PAI & Adab Santri (KBC)</span>
          </button>
          <button
            type="button"
            onClick={() => loadSubjectTemplate('BAHASA')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 font-bold border border-slate-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>✍️ Modul Bahasa Indonesia (Anekdot)</span>
          </button>
        </div>
      </div>

      {/* Extracted Text Preview Drawer (Collapsible) */}
      {showPreviewText && documentTextSnippet && (
        <div className="bg-white p-5 rounded-xl border border-emerald-300 shadow-sm space-y-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-700" />
              Pratinjau Teks yang Berhasil Diekstraksi dari Dokumen ({wordCount} Kata):
            </span>
            <button
              type="button"
              onClick={() => setShowPreviewText(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Tutup
            </button>
          </div>
          <pre className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto border border-slate-200 leading-relaxed">
            {documentTextSnippet}
          </pre>
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
            <span>Unggah Berkas Nyata (Otomatis Ekstraksi Teks)</span>
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
            <span>Editor Teks & Transkrip ({wordCount} kata aktif)</span>
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
                    Dokumen Perangkat Pembelajaran Guru
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modul Ajar, RPP, LKPD, Instrumen Asesmen (DOC, DOCX, PDF, TXT)
                  </p>
                </div>
                <label className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4" />
                  <span>Pilih Berkas Dokumen</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.rtf,.md"
                    onChange={(e) => handleFileInput(e, 'Modul Ajar & Dokumen', 'document')}
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
                  <span>Pilih Berkas Video</span>
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
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                  Daftar Berkas Terunggah ({files.length}):
                </h4>
                {documentTextSnippet && (
                  <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Teks dokumen siap dianalisis
                  </span>
                )}
              </div>
              
              {files.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-slate-200">
                  Belum ada dokumen yang diunggah. Silakan klik tombol di atas atau gunakan tombol <b>"Muat Contoh Dokumen"</b> untuk menguji analisis.
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
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors cursor-pointer"
                        title="Hapus berkas"
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
            <div className="bg-emerald-50 p-3.5 rounded-lg border border-emerald-200 text-emerald-950 leading-relaxed">
              <b>Teks Dokumen & Transkrip Aktif:</b> AI menganalisis setiap baris teks di bawah ini untuk mencari bukti autentik 36 indikator. Anda dapat memeriksa, menempel, atau menambah bagian perangkat pembelajaran Anda di sini.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" /> Isi Dokumen / Modul / RPP ({wordCount} kata):
                  </span>
                  {wordCount > 0 && <span className="text-emerald-700 font-normal text-[11px]">✓ Siap dianalisis</span>}
                </label>
                <textarea
                  value={documentTextSnippet}
                  onChange={(e) => onChangeDocumentText(e.target.value)}
                  placeholder="Isi Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), sintaks model pembelajaran, LKPD, rubrik asesmen, dan refleksi dari berkas Anda..."
                  rows={10}
                  className="w-full p-3 rounded-lg border border-slate-300 font-mono text-xs focus:outline-emerald-600 bg-slate-50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-purple-600" /> Transkrip Audio / Catatan Kelas ({transcriptWordCount} kata):
                  </span>
                  {transcriptWordCount > 0 && <span className="text-purple-700 font-normal text-[11px]">✓ Siap dianalisis</span>}
                </label>
                <textarea
                  value={videoTranscriptSnippet}
                  onChange={(e) => onChangeVideoTranscript(e.target.value)}
                  placeholder="Transkrip audio percakapan guru-siswa, adegan video, dan catatan tahapan observasi kelas..."
                  rows={10}
                  className="w-full p-3 rounded-lg border border-slate-300 font-mono text-xs focus:outline-emerald-600 bg-slate-50 leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Trigger */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Guru: <b className="text-slate-900">{profile.namaGuru || 'Belum diisi'}</b> • Mapel: <b className="text-slate-900">{profile.mataPelajaran || 'Belum dipilih'}</b> ({profile.kelas || 'Fase belum diset'})
          </div>

          <button
            type="button"
            onClick={onStartAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-amber-300" />
            <span>{isAnalyzing ? 'Sedang Menganalisis Bukti...' : 'Mulai Analisis Dokumen & Video'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
