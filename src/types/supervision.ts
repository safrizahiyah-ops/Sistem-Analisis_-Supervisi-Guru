/**
 * Types for Sistem Analisis Pembelajaran Guru
 * Supervisi Akademik Berbasis 6 Indikator
 */

export type SupervisionType = 
  | 'Supervisi Perangkat'
  | 'Supervisi Pembelajaran'
  | 'Supervisi Video'
  | 'Supervisi Komprehensif';

export type IndicatorScore = 1 | 2 | 3 | 4 | 'N/A';

export type ConfidenceLevel = 'Tinggi' | 'Sedang' | 'Rendah';

export type PriorityLevel = 'Tinggi' | 'Sedang' | 'Rendah';

export type FollowUpStatus = 'Belum Dimulai' | 'Dalam Proses' | 'Selesai';

export type UserRole = 'Supervisor' | 'Guru' | 'Admin';

export interface TeacherProfile {
  namaGuru: string;
  nipNuptk: string;
  mataPelajaran: string;
  kelas: string;
  fase: string;
  madrasahSekolah: string;
  tahunPelajaran: string;
  semester: 'Ganjil' | 'Genap';
  namaSupervisor: string;
  tanggalSupervisi: string;
  jenisSupervisi: SupervisionType;
  topikPembelajaran: string;
}

export interface DocumentEvidence {
  namaFile: string;
  halaman: string;
  bagianHeading: string;
  kutipanTeks: string;
  isAiInference?: boolean;
}

export interface VideoEvidence {
  namaVideo: string;
  timestamp: string; // e.g. "08:32 - 09:15"
  startSeconds?: number;
  endSeconds?: number;
  transkrip: string;
  deskripsiVisual: string;
  aktivitasTerdeteksi: string;
  isAiInference?: boolean;
}

export interface IndicatorRecommendation {
  masalah: string;
  mengapaPenting: string;
  tindakanDisarankan: string;
  contohImplementasi: string;
  prioritas: PriorityLevel;
}

export interface IndicatorAnalysis {
  id: string; // e.g. "1.1", "2.3"
  componentId: number; // 1 to 6
  namaIndikator: string;
  deskripsi: string;
  skorAi: IndicatorScore;
  skorSupervisor?: IndicatorScore;
  diverifikasiSupervisor: boolean;
  alasanSkor: string;
  kekurangan: string;
  statusKeterpenuhan: 'Sangat Terpenuhi' | 'Terpenuhi' | 'Sebagian Terpenuhi' | 'Belum Terpenuhi' | 'N/A';
  confidence: ConfidenceLevel;
  perluVerifikasi: boolean;
  documentEvidence?: DocumentEvidence;
  videoEvidence?: VideoEvidence;
  sumberBukti: string; // e.g. "Modul Ajar Halaman 4 & Video 14:20" or "Bukti belum ditemukan"
  rekomendasi?: IndicatorRecommendation;
  catatanSupervisor?: string;
  catatanGuru?: string;
}

export interface ComponentSummary {
  id: number;
  kode: string;
  nama: string;
  deskripsi: string;
  totalSkorMaksimal: number;
  totalSkorDiperoleh: number;
  skorRataRata: number;
  persentase: number;
  jumlahIndikatorDinilai: number;
  jumlahIndikatorNA: number;
  indikatorKuat: string[];
  indikatorPerluPerbaikan: string[];
}

export type PancaCintaPillar = 
  | 'Cinta Allah dan Rasul'
  | 'Cinta Ilmu'
  | 'Cinta Diri Sendiri & Keselamatan'
  | 'Cinta Sesama & Lingkungan'
  | 'Cinta Tanah Air & Bangsa';

export interface PancaCintaEvidence {
  id: string;
  pilar: PancaCintaPillar;
  kalimatUcapan: string; // Teks yang diucapkan guru atau siswa
  lakonAktivitas: string; // Tindakan/perbuatan yang dilakonkan
  timestamp: string; // e.g. "01:15 - 02:30"
  segmenId: string;
  adeganVisual: string; // Deskripsi visual potongan adegan video
  skorImplementasi: number; // 1-4
  analisisSupervisor: string;
}

export interface VideoTimelineSegment {
  id: string;
  timeRange: string; // e.g. "00:00 - 03:20"
  startSeconds: number;
  endSeconds: number;
  faseKegiatan: 'Pembukaan' | 'Apersepsi' | 'Penyampaian Tujuan' | 'Eksplorasi Materi' | 'Diskusi Kelompok' | 'Presentasi Siswa' | 'Tanya Jawab & Penguatan' | 'Asesmen' | 'Refleksi' | 'Penutup';
  deskripsiAktivitas: string;
  transkripExcerpt: string;
  indikatorTerkait: string[]; // e.g. ["1.1", "2.1"]
  skorSegmen?: number;
  alasanAnalisis: string;
  // Potongan Adegan Video & Snapshot
  sceneSnapshot: {
    title: string;
    setting: string;
    fokusKamera: string;
    adeganKunci: string;
    dialogKunci: string;
    karakterTerlibat: string;
    thumbnailTheme: 'emerald' | 'cyan' | 'teal' | 'indigo' | 'amber' | 'purple' | 'blue';
  };
  // Analisis Panca Cinta / KBC
  pancaCintaKbc?: {
    pilar: PancaCintaPillar;
    terdeteksi: boolean;
    kalimatUcapanLakon: string; // Kalimat/teks yang diucapkan
    deskripsiLakon: string; // Tindakan yang dilakonkan di video
    maknaPedagogis: string; // Makna penanaman nilai cinta
  };
}

export interface VideoInteractionAnalysis {
  guruKeSiswa: number; // percentage e.g. 45
  siswaKeGuru: number; // percentage e.g. 25
  siswaKeSiswa: number; // percentage e.g. 30
  aktivitasGuruTerdeteksi: string[];
  aktivitasSiswaTerdeteksi: string[];
  metodePembelajaranTerdeteksi: string[];
  buktiDiferensiasiTerdeteksi: string[];
  buktiAsesmenTerdeteksi: string[];
  keteranganEstimasi: string;
}

export interface CrossAnalysis {
  keselarasanUmum: 'TERLIHAT SELARAS' | 'CUKUP SELARAS' | 'PERLU VERIFIKASI' | 'BELUM DAPAT DIBANDINGKAN';
  catatanKeselarasan: string;
  poinKesesuaian: Array<{
    aspek: string;
    pernyataanDokumen: string;
    pelaksanaanVideo: string;
    status: 'SELARAS' | 'SEBAGIAN SELARAS' | 'PERLU VERIFIKASI';
    catatan: string;
  }>;
}

export interface ExecutiveSummary {
  kekuatanUtama: string[];
  areaPerluDitingkatkan: string[];
  indikatorPrioritas: string[];
  buktiPositif: string[];
  potensiKetidaksesuaian: string[];
}

export interface FollowUpPlanItem {
  id: string;
  prioritas: PriorityLevel;
  indikator: string;
  kondisiSaatIni: string;
  tindakanPerbaikan: string;
  targetPencapaian: string;
  waktuPelaksanaan: string;
  status: FollowUpStatus;
  penanggungJawab?: string;
}

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: 'document' | 'video';
  mimeType: string;
  category: string; // "Modul Ajar", "RPP", "LKPD", "Video", etc.
  contentSnippet?: string;
  base64Data?: string;
  uploadDate: string;
}

export interface PancaCintaSummary {
  totalTerdeteksi: number;
  skorRataRata: number;
  persentaseImplementasi: number;
  catatanKurikulumBerbasisCinta: string;
  pilarStatus: Array<{
    pilar: PancaCintaPillar;
    terwujud: boolean;
    frekuensiMuncul: number;
    kutipanUnggulan: string;
    deskripsiLakon: string;
    timestampAdegan: string;
  }>;
}

export interface DeepLearningAnalysis {
  bloomLevelDistribution: {
    mengingatMemahami: number; // C1-C2 (%)
    menerapkan: number; // C3 (%)
    menganalisisMengevaluasi: number; // C4-C5 (%)
    menciptaKreasi: number; // C6 (%)
  };
  skorKedalamanMetakognisi: number; // 0-100
  levelMetakognisi: 'Tinggi (Reflektif-Strategis)' | 'Sedang (Prosedural)' | 'Rendah (Hafalan)';
  transferBelajarKehidupanNyata: string;
  studentAgencyDanKemandirian: string;
  catatanAnalisisMendalam: string;
}

export interface AyatKajianItem {
  suratAyat: string;
  teksArab: string;
  terjemah: string;
  tafsirKontekstual: string;
  kaitanPedagogis: string;
}

export interface HaditsKajianItem {
  perawi: string;
  matanArab: string;
  terjemah: string;
  hikmahTarbiyah: string;
  kaitanPedagogis: string;
}

export interface KitabTuratsKajianItem {
  judulKitab: string;
  pengarang: string;
  babKutipan: string;
  teksNaskah: string;
  syarahPedagogis: string;
  kaitanPedagogis: string;
}

export interface TuratsStudy {
  ayatAlQuran: AyatKajianItem[];
  haditsNabawi: HaditsKajianItem[];
  kitabTurats: KitabTuratsKajianItem[];
  kesimpulanTarbiyahIslamiyah: string;
}

export interface SavedReportItem {
  id: string;
  namaGuru: string;
  mataPelajaran: string;
  kelas: string;
  madrasahSekolah: string;
  tanggalSupervisi: string;
  jenisSupervisi: SupervisionType;
  overallScore: number;
  status: 'Draf' | 'Dianalisis' | 'Terverifikasi' | 'Selesai';
  timestamp: string;
  sessionData: SupervisionSession;
}

export interface SupervisionSession {
  id: string;
  profile: TeacherProfile;
  files: UploadedFileItem[];
  indicators: IndicatorAnalysis[];
  timeline: VideoTimelineSegment[];
  interaction: VideoInteractionAnalysis;
  crossAnalysis: CrossAnalysis;
  summary: ExecutiveSummary;
  pancaCintaSummary?: PancaCintaSummary;
  deepLearning?: DeepLearningAnalysis;
  turatsStudy?: TuratsStudy;
  followUpPlans: FollowUpPlanItem[];
  overallScore: number;
  createdAt: string;
  updatedAt: string;
  status: 'Draf' | 'Dianalisis' | 'Terverifikasi' | 'Selesai';
}
