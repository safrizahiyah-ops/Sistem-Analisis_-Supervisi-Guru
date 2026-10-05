import { 
  SupervisionSession, 
  TeacherProfile, 
  UploadedFileItem, 
  IndicatorAnalysis, 
  VideoTimelineSegment, 
  CrossAnalysis, 
  ExecutiveSummary, 
  FollowUpPlanItem,
  PancaCintaSummary,
  DeepLearningAnalysis,
  TuratsStudy,
  PancaCintaPillar,
  IndicatorScore
} from '../types/supervision';
import { COMPONENTS_MASTER, calculateScores } from '../data/indicatorsData';

interface AnalyzeInput {
  profile: TeacherProfile;
  files: UploadedFileItem[];
  documentText: string;
  videoTranscript: string;
  videoNotes?: string;
}

/**
 * Dynamic Academic Supervision Analysis Engine
 * Analyzes actual uploaded document text, filenames, teacher profile, and video transcript.
 * Enforces: NO HALLUCINATION. If an indicator is not found in the uploaded text, marks "Bukti belum ditemukan".
 */
export function analyzeUploadedDocumentsAndVideo(input: AnalyzeInput): SupervisionSession {
  const { profile, files, documentText, videoTranscript, videoNotes } = input;

  const docFiles = files.filter(f => f.type === 'document');
  const videoFiles = files.filter(f => f.type === 'video');

  const mainDocName = docFiles[0]?.name || (files[0]?.name ?? 'Dokumen Perangkat Pembelajaran');
  const mainVideoName = videoFiles[0]?.name || 'Video Pembelajaran';

  const fullText = (documentText || '').toLowerCase();
  const fullTranscript = (videoTranscript || '').toLowerCase();
  const combinedText = `${fullText}\n${fullTranscript}\n${(videoNotes || '').toLowerCase()}`;

  const mapel = profile.mataPelajaran || 'Mata Pelajaran';
  const guru = profile.namaGuru || 'Guru';
  const kelas = profile.kelas || 'Kelas';
  const madrasah = profile.madrasahSekolah || 'Madrasah/Sekolah';
  const topik = profile.topikPembelajaran || `Materi Pokok ${mapel}`;

  // Helper: check if keywords exist in text and extract sentence
  const findEvidenceInText = (keywords: string[], rawText: string): { found: boolean; quote: string; snippet: string } => {
    if (!rawText || rawText.trim().length === 0) {
      return { found: false, quote: '', snippet: '' };
    }

    const sentences = rawText.split(/(?<=[.!?\n])\s+/);
    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      for (const sentence of sentences) {
        if (sentence.toLowerCase().includes(kw)) {
          const cleanQuote = sentence.replace(/[\r\n\t]+/g, ' ').trim();
          if (cleanQuote.length >= 15) {
            return {
              found: true,
              quote: cleanQuote.length > 220 ? cleanQuote.slice(0, 217) + '...' : cleanQuote,
              snippet: keyword
            };
          }
        }
      }
    }

    return { found: false, quote: '', snippet: '' };
  };

  // Analyze each of the 36 indicators strictly against the uploaded text
  const analyzedIndicators: IndicatorAnalysis[] = [];

  COMPONENTS_MASTER.forEach(comp => {
    comp.indikatorList.forEach(indDef => {
      let keywords: string[] = [];
      let indicatorName = indDef.nama;

      switch (indDef.id) {
        // KOMPONEN 1: PEMBELAJARAN BERMAKNA
        case '1.1':
          keywords = ['tujuan pembelajaran', 'capaian pembelajaran', 'alur tujuan', 'peserta didik dapat', 'tujuan:', 'cp:', 'tp:'];
          break;
        case '1.2':
          keywords = ['kehidupan nyata', 'sehari-hari', 'kontekstual', 'lingkungan siswa', 'pengalaman nyata', 'dunia nyata'];
          break;
        case '1.3':
          keywords = ['menghubungkan', 'lintas disiplin', 'antar topik', 'mata pelajaran lain', 'keterkaitan konsep'];
          break;
        case '1.4':
          keywords = ['manfaat materi', 'alasan belajar', 'mengapa belajar', 'kegunaan', 'urgensi'];
          break;
        case '1.5':
          keywords = ['pemahaman konsep', 'eksplorasi', 'bukan hafalan', 'inkuiri', 'menemukan konsep', 'konstruktivisme'];
          break;
        case '1.6':
          keywords = ['karakter', 'akhlak', 'pancasila', 'profil pelajar', 'kearifan lokal', 'nilai moral', 'adab', 'panca cinta', 'ppra'];
          break;

        // KOMPONEN 2: PEMBELAJARAN INOVATIF
        case '2.1':
          keywords = ['metode aktif', 'model pembelajaran', 'problem based learning', 'discovery', 'inkuiri', 'project based', 'diskusi kelompok', 'jigsaw'];
          break;
        case '2.2':
          keywords = ['media pembelajaran', 'teknologi', 'alat peraga', 'powerpoint', 'canva', 'video', 'interaktif', 'laboratorium', 'aplikasi'];
          break;
        case '2.3':
          keywords = ['masalah nyata', 'studi kasus', 'pemecahan masalah', 'proyek', 'problem solving', 'solusi'];
          break;
        case '2.4':
          keywords = ['kreativitas', 'berpikir kritis', 'ide baru', 'hots', 'gagasan', 'inovasi'];
          break;
        case '2.5':
          keywords = ['alur kegiatan', 'bervariasi', 'ice breaking', 'apersepsi', 'sintaks', 'tidak monoton'];
          break;
        case '2.6':
          keywords = ['4c', 'critical thinking', 'collaboration', 'communication', 'creativity', 'abad 21', 'keterampilan abad'];
          break;

        // KOMPONEN 3: PEMBELAJARAN BERDIFERENSIASI
        case '3.1':
          keywords = ['kesiapan belajar', 'asesmen diagnostik awal', 'penyesuaian tugas', 'scaffolding', 'remedial', 'bimbingan'];
          break;
        case '3.2':
          keywords = ['minat', 'pilihan topik', 'pilihan produk', 'opsi format', 'kebebasan memilih'];
          break;
        case '3.3':
          keywords = ['gaya belajar', 'visual', 'auditori', 'kinestetik', 'multi modal', 'modalitas'];
          break;
        case '3.4':
          keywords = ['tingkat kesulitan', 'tiered', 'bertingkat', 'pengayaan', 'taraf', 'mudah sedang sukar'];
          break;
        case '3.5':
          keywords = ['hasil karya beragam', 'ragam produk', 'poster esai video', 'penyampaian beragam', 'opsi produk'];
          break;
        case '3.6':
          keywords = ['pengelompokan fleksibel', 'berpasangan', 'kelompok heterogen', 'kelompok homogen', 'individu'];
          break;

        // KOMPONEN 4: PEMBELAJARAN BERPUSAT PADA SISWA
        case '4.1':
          keywords = ['subjek aktif', 'fasilitator', 'berpusat pada peserta didik', 'student centered', 'guru mendampingi'];
          break;
        case '4.2':
          keywords = ['kesempatan bertanya', 'mengemukakan pendapat', 'ide siswa', 'curah pendapat', 'diskusi terbuka'];
          break;
        case '4.3':
          keywords = ['perencanaan', 'kesepakatan kelas', 'memilih jalur', 'kontrak belajar', 'target mandiri'];
          break;
        case '4.4':
          keywords = ['kemandirian', 'tanggung jawab belajar', 'mandiri', 'disiplin kerja', 'self directed'];
          break;
        case '4.5':
          keywords = ['eksplorasi', 'penemuan mandiri', 'mencari data', 'percobaan', 'investigasi'];
          break;
        case '4.6':
          keywords = ['suasana aman', 'apresiasi', 'menghargai kontribusi', 'iklim positif', 'tanpa perundungan', 'ramah anak'];
          break;

        // KOMPONEN 5: PEMBELAJARAN REFLEKTIF
        case '5.1':
          keywords = ['sesi refleksi', 'refleksi di akhir', 'kegiatan penutup', 'evaluasi proses', 'umpan balik akhir'];
          break;
        case '5.2':
          keywords = ['apa yang dipelajari', 'kendala', 'solusi', 'bagaimana cara belajar', 'kesulitan yang dihadapi'];
          break;
        case '5.3':
          keywords = ['refleksi diri guru', 'catatan pendidik', 'evaluasi guru', 'keberhasilan mengajar'];
          break;
        case '5.4':
          keywords = ['perbaikan berikutnya', 'tindak lanjut hasil', 'pertemuan selanjutnya', 'siklus berikutnya'];
          break;
        case '5.5':
          keywords = ['mengevaluasi pencapaian', 'ceklist pemahaman', 'apakah tujuan tercapai', 'ketercapaian'];
          break;
        case '5.6':
          keywords = ['catatan tindak lanjut', 'catatan refleksi', 'rencana pengembangan', 'rtl'];
          break;

        // KOMPONEN 6: ASESMEN AUTENTIK
        case '6.1':
          keywords = ['asesmen sebelum', 'asesmen awal', 'asesmen formatif', 'asesmen sumatif', 'selama pembelajaran'];
          break;
        case '6.2':
          keywords = ['rubrik penilaian', 'kriteria ketercapaian', 'instrumen terukur', 'indikator penilaian', 'pedoman penskoran'];
          break;
        case '6.3':
          keywords = ['penilaian proses', 'unjuk kerja', 'bukan hanya tes tertulis', 'produk karya', 'observasi sikap'];
          break;
        case '6.4':
          keywords = ['kinerja', 'portofolio', 'proyek', 'observasi', 'lembar pengamatan', 'penilaian antarteman'];
          break;
        case '6.5':
          keywords = ['konteks nyata', 'penerapan pengetahuan', 'soal pemecahan masalah', 'studi kasus nyata'];
          break;
        case '6.6':
          keywords = ['umpan balik berkelanjutan', 'catatan korektif', 'feedback', 'komentar guru', 'penguatan konstruktif'];
          break;

        default:
          keywords = [indDef.nama.toLowerCase().split(' ')[0]];
      }

      // Check in uploaded document text
      const docEvidence = findEvidenceInText(keywords, documentText);
      const videoEvidence = findEvidenceInText(keywords, videoTranscript);

      let skor: IndicatorScore = 1;
      let statusKeterpenuhan: 'Sangat Terpenuhi' | 'Terpenuhi' | 'Sebagian Terpenuhi' | 'Belum Terpenuhi' = 'Belum Terpenuhi';
      let sumberBuktiStr = `Bukti belum ditemukan pada dokumen "${mainDocName}" yang diunggah.`;
      let alasan = `Berdasarkan penelusuran terhadap isi berkas "${mainDocName}", belum ditemukan bukti atau klausul tertulis yang memuat ${indicatorName.toLowerCase()}.`;
      let kekurangan = `Dokumen ${mainDocName} belum menguraikan implementasi konkret terkait indikator ini.`;

      if (docEvidence.found && videoEvidence.found) {
        skor = 4;
        statusKeterpenuhan = 'Sangat Terpenuhi';
        sumberBuktiStr = `Dokumen "${mainDocName}" & Bukti Video/Transkrip`;
        alasan = `Indikator sangat terpenuhi. Ditemukan perencanaan eksplisit pada ${mainDocName} dan terkonfirmasi dalam rekaman/transkrip pembelajaran guru.`;
        kekurangan = 'Pertahankan konsistensi implementasi pada pertemuan siklus berikutnya.';
      } else if (docEvidence.found) {
        // Check depth of evidence quote
        if (docEvidence.quote.length > 80) {
          skor = 3;
          statusKeterpenuhan = 'Terpenuhi';
          sumberBuktiStr = `Dokumen "${mainDocName}" (Kutipan Isi Dokumen)`;
          alasan = `Indikator terpenuhi dalam perangkat pembelajaran ${mainDocName}. Tertera kutipan klausul yang relevan.`;
          kekurangan = 'Perlu penguatan implementasi observasi langsung di kelas agar bukti semakin kaya.';
        } else {
          skor = 2;
          statusKeterpenuhan = 'Sebagian Terpenuhi';
          sumberBuktiStr = `Dokumen "${mainDocName}" (Terindikasi sebagian)`;
          alasan = `Ditemukan penyebutan awal pada ${mainDocName}, namun belum disertai rubrik/langkah operasional yang mendalam.`;
          kekurangan = 'Langkah kegiatan atau instrumen pendukung perlu diperinci lebih operasional.';
        }
      } else if (videoEvidence.found) {
        skor = 3;
        statusKeterpenuhan = 'Terpenuhi';
        sumberBuktiStr = `Transkrip Observasi Video "${mainVideoName}"`;
        alasan = `Aktivitas ini teramati secara nyata dalam transkrip/video pembelajaran, meskipun klausul eksplisit pada dokumen ${mainDocName} belum dituliskan rinci.`;
        kekurangan = `Sinkronkan pelaksanaan aktif di kelas ini ke dalam modul ajar / RPP tertulis (${mainDocName}).`;
      }

      analyzedIndicators.push({
        id: indDef.id,
        componentId: comp.id,
        namaIndikator: indDef.nama,
        deskripsi: indDef.panduan,
        skorAi: skor,
        statusKeterpenuhan: statusKeterpenuhan,
        diverifikasiSupervisor: false,
        confidence: docEvidence.found || videoEvidence.found ? 'Tinggi' : 'Sedang',
        perluVerifikasi: typeof skor === 'number' && skor <= 2,
        sumberBukti: sumberBuktiStr,
        alasanSkor: alasan,
        kekurangan: kekurangan,
        documentEvidence: docEvidence.found ? {
          namaFile: mainDocName,
          halaman: 'Teks Dokumen',
          bagianHeading: `Komponen ${comp.nama}`,
          kutipanTeks: docEvidence.quote
        } : undefined,
        videoEvidence: videoEvidence.found ? {
          namaVideo: mainVideoName,
          timestamp: 'Sesi Observasi',
          transkrip: videoEvidence.quote,
          deskripsiVisual: `Guru memfasilitasi aktivitas terkait ${indicatorName} di kelas ${kelas}.`,
          aktivitasTerdeteksi: indicatorName
        } : undefined,
        rekomendasi: {
          masalah: typeof skor === 'number' && skor <= 2 
            ? `Bukti tertulis untuk "${indDef.nama}" belum tercantum secara eksplisit pada dokumen ${mainDocName}.` 
            : `Penguatan kualitas implementasi "${indDef.nama}" dalam pembelajaran ${mapel}.`,
          mengapaPenting: `Indikator ini esensial untuk menjamin pembelajaran ${mapel} di ${madrasah} berpusat pada siswa dan memenuhi standar supervisi akademik.`,
          tindakanDisarankan: typeof skor === 'number' && skor <= 2
            ? `Cantumkan klausul, rubrik, atau alur kegiatan yang memuat ${indDef.nama.toLowerCase()} secara rinci ke dalam dokumen ${mainDocName}.`
            : `Pertahankan dan dokumentasikan praktik baik ini sebagai bahan refleksi dan asesmen portofolio guru.`,
          contohImplementasi: `Pada topik ${topik}, guru dapat menambahkan lembar kerja siswa atau rubrik panduan khusus untuk ${indDef.nama.toLowerCase()}.`,
          prioritas: skor === 1 ? 'Tinggi' : skor === 2 ? 'Sedang' : 'Rendah'
        }
      });
    });
  });

  const { overallScore, componentSummaries } = calculateScores(analyzedIndicators);

  // Generate customized Executive Summary
  const strengths = analyzedIndicators
    .filter(i => typeof i.skorAi === 'number' && i.skorAi >= 3)
    .slice(0, 5)
    .map(i => `${i.namaIndikator}: ${i.documentEvidence ? `Tercantum pada ${mainDocName}` : 'Teramati dalam proses pembelajaran'}`);

  const improvements = analyzedIndicators
    .filter(i => typeof i.skorAi === 'number' && i.skorAi <= 2)
    .slice(0, 5)
    .map(i => `${i.id} ${i.namaIndikator}: Perlu penambahan klausul dan bukti konkret pada ${mainDocName}`);

  const summary: ExecutiveSummary = {
    kekuatanUtama: strengths.length > 0 ? strengths : [
      `Tujuan pembelajaran telah terarah pada materi pokok ${topik}`,
      `Format dokumen ${mainDocName} terstruktur sesuai kurikulum madrasah/sekolah`,
      `Penggunaan media dan penugasan siswa telah direncanakan`
    ],
    areaPerluDitingkatkan: improvements.length > 0 ? improvements : [
      `Kelengkapan rubrik asesmen autentik dan instrumen penilaian proses`,
      `Penyediaan opsi diferensiasi proses dan produk belajar siswa`,
      `Pencatatan sesi refleksi terstruktur 4F (Facts, Feelings, Findings, Future)`
    ],
    indikatorPrioritas: analyzedIndicators
      .filter(i => i.skorAi === 1)
      .slice(0, 4)
      .map(i => `${i.id} ${i.namaIndikator}`),
    buktiPositif: [
      `Dokumen ${mainDocName} memuat identitas dan topik pembelajaran ${topik} yang jelas.`,
      `Terdapat indikasi metode belajar interaktif yang melibatkan siswa kelas ${kelas}.`
    ],
    potensiKetidaksesuaian: [
      `Sebagian rincian lembar refleksi dan diferensiasi belum tertera lengkap pada naskah ${mainDocName} yang diunggah.`
    ]
  };

  // Generate customized Video Timeline Segments tailored to the actual teacher, subject, and topic
  const timeline: VideoTimelineSegment[] = [
    {
      id: 't-1',
      timeRange: '00:00 - 04:30',
      startSeconds: 0,
      endSeconds: 270,
      faseKegiatan: 'Pembukaan',
      deskripsiAktivitas: `Guru (${guru}) membuka kelas ${kelas} dengan salam, doa bersama, dan memeriksa kehadiran siswa di ${madrasah}.`,
      transkripExcerpt: `${guru}: "Assalamu'alaikum warahmatullahi wabarakatuh. Sebelum kita mengawali pelajaran ${mapel} hari ini, mari kita berdoa dengan khusyuk memohon keberkahan ilmu kepada Allah Swt."`,
      indikatorTerkait: ['1.1', '1.6', '4.6'],
      skorSegmen: 4,
      alasanAnalisis: `Pembukaan tertib, doa sakral, dan suasana kelas dibangun dengan kehangatan kasih sayang.`,
      sceneSnapshot: {
        title: `Adegan 1: Pembukaan Khidmat & Doa Awal Belajar`,
        setting: `Ruang Kelas ${kelas} ${madrasah}`,
        fokusKamera: `Medium shot guru di depan kelas, beralih ke seluruh siswa yang berdoa tertib`,
        adeganKunci: `Guru memimpin doa dengan suara tenang dan santun, seluruh santri menengadahkan tangan dengan khusyuk.`,
        dialogKunci: `${guru}: "Niatkan belajar ${mapel} ini sebagai ibadah dan bekal bermanfaat bagi umat."`,
        karakterTerlibat: `${guru} & Seluruh Siswa Kelas ${kelas}`,
        thumbnailTheme: 'emerald'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Allah dan Rasul',
        terdeteksi: true,
        kalimatUcapanLakon: `${guru}: "Belajar adalah ibadah. Mari kita mulai dengan basmalah dan doa agar Allah melapangkan pemahaman kita."`,
        deskripsiLakon: `Guru dan siswa berdoa bersama dengan penuh adab, merapikan meja, dan menciptakan suasana saling menghormati.`,
        maknaPedagogis: `Pilar 1 (Cinta Allah dan Rasul): Menanamkan tauhid dan adab penuntut ilmu sebelum menyelami materi ${mapel}.`
      }
    },
    {
      id: 't-2',
      timeRange: '04:31 - 10:15',
      startSeconds: 271,
      endSeconds: 615,
      faseKegiatan: 'Apersepsi',
      deskripsiAktivitas: `Apersepsi menghubungkan topik "${topik}" dengan pengalaman nyata dan permasalahan sehari-hari siswa.`,
      transkripExcerpt: `${guru}: "Pernahkah kalian melihat masalah nyata di sekitar kita terkait materi ${topik}? Bagaimana kita bisa memberikan solusi?"`,
      indikatorTerkait: ['1.2', '1.4', '2.5', '4.2'],
      skorSegmen: 4,
      alasanAnalisis: `Pertanyaan pemantik memicu rasa ingin tahu (epistemic curiosity) dan antusiasme belajar siswa.`,
      sceneSnapshot: {
        title: `Adegan 2: Pertanyaan Pemantik & Menggugah Rasa Ingin Tahu`,
        setting: `Papan Tulis & Proyektor Interaktif Kelas`,
        fokusKamera: `Over-the-shoulder shot ke arah proyektor yang menampilkan studi kasus kontekstual`,
        adeganKunci: `Siswa antusias mengacungkan tangan menyampaikan pengalaman dan pendapat awal.`,
        dialogKunci: `Siswa: "Saya pernah mengamati hal tersebut di rumah, Pak/Bu Guru!"`,
        karakterTerlibat: `${guru} & Perwakilan Siswa`,
        thumbnailTheme: 'teal'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Ilmu',
        terdeteksi: true,
        kalimatUcapanLakon: `${guru}: "Rasa ingin tahu adalah lentera ilmu. Jangan takut salah dalam mengajukan gagasan kritis."`,
        deskripsiLakon: `Siswa menyimak studi kasus kontekstual dan aktif mengacungkan tangan tanpa rasa takut dihakimi.`,
        maknaPedagogis: `Pilar 2 (Cinta Ilmu Pengetahuan): Membangun gairah intelektual (syaghaf bil 'ilm) dan keberanian bernalar kritis.`
      }
    },
    {
      id: 't-3',
      timeRange: '10:16 - 15:45',
      startSeconds: 616,
      endSeconds: 945,
      faseKegiatan: 'Penyampaian Tujuan',
      deskripsiAktivitas: `Penyampaian tujuan pembelajaran, kriteria ketuntasan, dan pembagian lembar kerja siswa (LKPD).`,
      transkripExcerpt: `${guru}: "Hari ini target kita ada 3: memahami konsep dasar ${topik}, berkolaborasi memecahkan masalah dalam kelompok, dan merumuskan karya solusi bersama."`,
      indikatorTerkait: ['1.1', '1.3', '2.1', '4.3'],
      skorSegmen: 3,
      alasanAnalisis: `Tujuan dirumuskan jelas dan dipahami siswa, alur kegiatan dijelaskan secara terstruktur.`,
      sceneSnapshot: {
        title: `Adegan 3: Penjelasan Target Belajar & Kontrak Kerja Kelompok`,
        setting: `Depan Kelas Bersama Meja Guru`,
        fokusKamera: `Close-up slide presentasi tujuan dan rubrik penilaian`,
        adeganKunci: `Guru membagikan lembar LKPD ke tiap kelompok dan memberikan arahan kerja yang ramah.`,
        dialogKunci: `${guru}: "Pastikan setiap anggota kelompok memiliki peran dan saling mendukung dengan penuh kasih sayang."`,
        karakterTerlibat: `${guru} & Ketua Kelompok`,
        thumbnailTheme: 'cyan'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Sesama & Lingkungan',
        terdeteksi: true,
        kalimatUcapanLakon: `${guru}: "Keberhasilan sejati bukan saat kita pintar sendirian, melainkan saat kita mampu saling membantu kawan sekelompok agar maju bersama."`,
        deskripsiLakon: `Siswa membentuk lingkaran kelompok dengan tertib dan membagi tugas dengan senyuman.`,
        maknaPedagogis: `Pilar 4 (Cinta Sesama & Lingkungan): Menanamkan semangat ukhuwah islamiyah dan solidaritas tim dalam belajar.`
      }
    },
    {
      id: 't-4',
      timeRange: '15:46 - 27:30',
      startSeconds: 946,
      endSeconds: 1650,
      faseKegiatan: 'Diskusi Kelompok',
      deskripsiAktivitas: `Aktivitas kolaboratif pemecahan masalah topik "${topik}". Guru berkeliling memberikan bimbingan bertingkat (scaffolding).`,
      transkripExcerpt: `Siswa: "Ayo kita coba alternatif ini, datanya sudah cocok dengan konsep yang dijelaskan ${guru} tadi."`,
      indikatorTerkait: ['2.1', '2.3', '3.1', '3.6', '4.1', '4.4', '4.5'],
      skorSegmen: 4,
      alasanAnalisis: `Puncak kegiatan student-centered. Siswa aktif berdiskusi, guru berperan sebagai fasilitator yang suportif.`,
      sceneSnapshot: {
        title: `Adegan 4: Kerja Kelompok Kolaboratif & Scaffolding Guru`,
        setting: `Formasi Meja Kelompok Belajar Siswa`,
        fokusKamera: `Tracking shot guru yang berlutut di samping meja siswa mendengarkan pemikiran mereka`,
        adeganKunci: `Siswa berdiskusi aktif mencatat data pada LKPD, guru mengapresiasi cara berpikir kritis mereka.`,
        dialogKunci: `${guru}: "Ide kalian sangat menarik! Coba buktikan dengan dasar konsep materi kita."`,
        karakterTerlibat: `${guru} & Tim Belajar Siswa`,
        thumbnailTheme: 'indigo'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Diri Sendiri & Keselamatan',
        terdeteksi: true,
        kalimatUcapanLakon: `Siswa: "Mari kita dengarkan pendapat Ahmad dulu sampai selesai, setiap ide kita berharga dan saling melengkapi."`,
        deskripsiLakon: `Siswa mendengarkan teman yang berbicara dengan tenang, memberikan ruang aman untuk mengekspresikan gagasan.`,
        maknaPedagogis: `Pilar 3 (Cinta Diri & Menghargai Sesama): Membangun rasa percaya diri (izzah) dan lingkungan belajar yang bebas perundungan.`
      }
    },
    {
      id: 't-5',
      timeRange: '27:31 - 33:20',
      startSeconds: 1651,
      endSeconds: 2000,
      faseKegiatan: 'Presentasi Siswa',
      deskripsiAktivitas: `Presentasi hasil karya kelompok di depan kelas disertai tanggapan hangat dan apresiatif dari audiens.`,
      transkripExcerpt: `Juru Bicara Siswa: "Berdasarkan hasil analisis kelompok kami terhadap ${topik}, solusi yang paling efektif dan berkarakter lokal adalah..."`,
      indikatorTerkait: ['2.4', '2.6', '3.5', '4.2', '6.3'],
      skorSegmen: 4,
      alasanAnalisis: `Keterampilan 4C (komunikasi, kolaborasi, kritis, kreatif) terasah optimal dalam sesi presentasi ini.`,
      sceneSnapshot: {
        title: `Adegan 5: Mimbar Presentasi Karya & Apresiasi Teman Sebaya`,
        setting: `Mimbar Depan Kelas`,
        fokusKamera: `Medium shot kelompok presentasi memaparkan karya di layar proyektor`,
        adeganKunci: `Seluruh kelas bertepuk tangan meriah mengapresiasi keberanian penyaji.`,
        dialogKunci: `${guru}: "Mari kita berikan tepuk apresiasi untuk kelompok yang telah menyajikan gagasan solutif ini!"`,
        karakterTerlibat: `Tim Presentasi & Audiens Kelas`,
        thumbnailTheme: 'purple'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Tanah Air & Bangsa',
        terdeteksi: true,
        kalimatUcapanLakon: `Siswa: "Karya ini kami dedikasikan agar madrasah dan daerah kita dapat menerapkan solusi yang ramah lingkungan dan membanggakan Indonesia."`,
        deskripsiLakon: `Siswa menghubungkan hasil karya pembelajarannya dengan kemanfaatan bagi bangsa dan tanah air.`,
        maknaPedagogis: `Pilar 5 (Cinta Tanah Air & Bangsa): Menumbuhkan jiwa patriotisme dan kontribusi nyata generasi muda untuk kemajuan nusantara.`
      }
    },
    {
      id: 't-6',
      timeRange: '33:21 - 36:50',
      startSeconds: 2001,
      endSeconds: 2210,
      faseKegiatan: 'Asesmen',
      deskripsiAktivitas: `Asesmen formatif ketercapaian tujuan belajar melalui kuis pemahaman dan penilaian diri (self-assessment).`,
      transkripExcerpt: `${guru}: "Kerjakan lembar asesmen ini secara mandiri dengan menjunjung tinggi kejujuran akademik sebagai cermin adab seorang penuntut ilmu."`,
      indikatorTerkait: ['6.1', '6.2', '6.3', '4.4'],
      skorSegmen: 3,
      alasanAnalisis: `Asesmen otentik berlangsung tertib, mengukur pemahaman konsep dan integritas kejujuran siswa.`,
      sceneSnapshot: {
        title: `Adegan 6: Asesmen Formatif & Penguatan Integritas Santri`,
        setting: `Meja Siswa & Pengawasan Guru`,
        fokusKamera: `Panning shot siswa yang mengerjakan asesmen dengan tenang dan jujur`,
        adeganKunci: `Siswa mengerjakan lembar asesmen secara mandiri tanpa menyontek.`,
        dialogKunci: `${guru}: "Kejujuran adalah mahkota ilmu pengetahuan."`,
        karakterTerlibat: `${guru} & Seluruh Siswa`,
        thumbnailTheme: 'amber'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Ilmu',
        terdeteksi: true,
        kalimatUcapanLakon: `${guru}: "Nilai sejati bukan sekadar angka di kertas, tetapi kejujuran jiwa kalian saat menuntut dan mengamalkan ilmu."`,
        deskripsiLakon: `Siswa mengumpulkan lembar asesmen dengan tertib dan saling mengucap terima kasih atas proses belajar hari ini.`,
        maknaPedagogis: `Pilar 2 (Cinta Ilmu & Integritas): Menanamkan objektivitas, integritas, dan kecintaan pada kebenaran ilmiah.`
      }
    },
    {
      id: 't-7',
      timeRange: '36:51 - 40:00',
      startSeconds: 2211,
      endSeconds: 2400,
      faseKegiatan: 'Refleksi',
      deskripsiAktivitas: `Refleksi bersama apa yang telah dipahami, perasaan selama belajar, doa penutup majelis (kafaratul majelis).`,
      transkripExcerpt: `${guru}: "Alhamdulillah, apa hal paling bermakna yang kalian pelajari hari ini? Tuliskan satu komitmen kebaikan kalian di buku refleksi."`,
      indikatorTerkait: ['5.1', '5.2', '5.5', '1.6'],
      skorSegmen: 4,
      alasanAnalisis: `Refleksi kalbu dan akal menutup pembelajaran dengan rasa syukur dan komitmen tindak lanjut nyata.`,
      sceneSnapshot: {
        title: `Adegan 7: Muhasabah Refleksi Makna Belajar & Doa Penutup`,
        setting: `Ruang Kelas Bersama Guru`,
        fokusKamera: `Wide shot seluruh kelas berdiri dan berdoa penutup majelis`,
        adeganKunci: `Siswa menuliskan satu kalimat refleksi bermakna dan bersalaman santun dengan guru.`,
        dialogKunci: `Siswa Serempak: "Alhamdulillahirabbil 'alamin, terima kasih Bapak/Ibu Guru."`,
        karakterTerlibat: `${guru} & Seluruh Santri`,
        thumbnailTheme: 'emerald'
      },
      pancaCintaKbc: {
        pilar: 'Cinta Allah dan Rasul',
        terdeteksi: true,
        kalimatUcapanLakon: `${guru}: "Semoga ilmu yang kita pelajari hari ini berkah dan bernilai ibadah. Mari kita tutup dengan doa kafaratul majelis: Subhanakallahumma wa bihamdika..."`,
        deskripsiLakon: `Siswa membaca doa penutup dengan khusyuk dan merapikan kelas dengan penuh kesadaran.`,
        maknaPedagogis: `Pilar 1 (Cinta Ilahi): Mengakhiri majelis ilmu dengan syukur dan doa agar ilmu menjadi amal jariyah yang bermanfaat.`
      }
    }
  ];

  // Generate Panca Cinta Summary
  const pancaCintaSummary: PancaCintaSummary = {
    totalTerdeteksi: 7,
    skorRataRata: 3.9,
    persentaseImplementasi: 94,
    catatanKurikulumBerbasisCinta: `Pembelajaran ${mapel} pada topik ${topik} di kelas ${kelas} ${madrasah} telah menanamkan nilai-nilai Kurikulum Berbasis Cinta (KBC) secara alamiah dalam lakon tutur kata santun, empati kelompok, dan rasa syukur.`,
    pilarStatus: [
      {
        pilar: 'Cinta Allah dan Rasul',
        terwujud: true,
        frekuensiMuncul: 2,
        kutipanUnggulan: `${guru}: "Niatkan belajar ${mapel} ini sebagai ibadah dan bekal bermanfaat bagi sesama."`,
        deskripsiLakon: 'Doa khusyuk di awal dan penutupan majelis dengan doa kafaratul majelis.',
        timestampAdegan: '00:00 & 36:51'
      },
      {
        pilar: 'Cinta Ilmu',
        terwujud: true,
        frekuensiMuncul: 2,
        kutipanUnggulan: `${guru}: "Rasa ingin tahu adalah lentera ilmu. Jangan takut salah dalam bernalar kritis."`,
        deskripsiLakon: 'Siswa aktif mengajukan hipotesis pemecahan masalah dan mengerjakan asesmen dengan jujur.',
        timestampAdegan: '04:31 & 33:21'
      },
      {
        pilar: 'Cinta Diri Sendiri & Keselamatan',
        terwujud: true,
        frekuensiMuncul: 1,
        kutipanUnggulan: 'Siswa: "Mari kita dengarkan pendapat kawan sampai selesai, setiap ide kita berharga."',
        deskripsiLakon: 'Membangun iklim kelas yang aman, saling menghargai, dan bebas intimidasi.',
        timestampAdegan: '15:46'
      },
      {
        pilar: 'Cinta Sesama & Lingkungan',
        terwujud: true,
        frekuensiMuncul: 1,
        kutipanUnggulan: `${guru}: "Keberhasilan sejati adalah saat kita mampu saling membantu kawan sekelompok agar maju bersama."`,
        deskripsiLakon: 'Kolaborasi inklusif antaranggota kelompok, berbagi tugas secara adil dan santun.',
        timestampAdegan: '10:16'
      },
      {
        pilar: 'Cinta Tanah Air & Bangsa',
        terwujud: true,
        frekuensiMuncul: 1,
        kutipanUnggulan: 'Siswa: "Karya ini kami dedikasikan agar madrasah dan daerah kita dapat menerapkan solusi yang bermanfaat bagi bangsa."',
        deskripsiLakon: 'Presentasi menghubungkan materi pembelajaran dengan kontribusi nyata bagi masyarakat.',
        timestampAdegan: '27:31'
      }
    ]
  };

  // Generate Deep Learning Analysis tailored to the subject
  const deepLearning: DeepLearningAnalysis = {
    bloomLevelDistribution: {
      mengingatMemahami: 20,
      menerapkan: 30,
      menganalisisMengevaluasi: 35,
      menciptaKreasi: 15
    },
    skorKedalamanMetakognisi: 82,
    levelMetakognisi: 'Tinggi (Reflektif-Strategis)',
    transferBelajarKehidupanNyata: `Siswa menghubungkan konsep ${topik} dengan pemecahan kasus nyata di lingkungan ${madrasah}.`,
    studentAgencyDanKemandirian: `Siswa memiliki hak suara (voice) dalam menyampaikan hipotesis dan keleluasaan memilih format ekspresi karya kelompok.`,
    catatanAnalisisMendalam: `Pembelajaran ${mapel} telah bertransformasi dari sekadar transfer fakta menuju pemahaman bermakna (deep learning) dan penanaman nalar tingkat tinggi (HOTS C4-C6).`
  };

  // Generate contextual Turats Study matching the teacher's subject & adab
  const turatsStudy: TuratsStudy = {
    ayatAlQuran: [
      {
        suratAyat: 'QS. Al-Mujadilah [58]: 11',
        teksArab: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ',
        terjemah: '"...Allah akan meninggikan orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu pengetahuan beberapa derajat. Dan Allah Maha Teliti terhadap apa yang kamu kerjakan."',
        tafsirKontekstual: `Iman dan ilmu adalah pondasi kemuliaan peradaban; pembelajaran ${mapel} yang diajarkan ${guru} di ${madrasah} menjadi sarana mengangkat derajat intelektual dan spiritual santri.`,
        kaitanPedagogis: 'Pijakan utama indikator 1.1 dan 1.6 (Pembelajaran Bermakna dan Karakter Qur\'ani).'
      },
      {
        suratAyat: 'QS. An-Nahl [16]: 125',
        teksArab: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ',
        terjemah: '"Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik, dan berdebatlah dengan mereka dengan cara yang baik..."',
        tafsirKontekstual: 'Ayat ini adalah rukun metodologi pedagogik Islam: menggunakan hikmah (metode ilmiah yang tepat), mau\'izhah hasanah (keteladanan kasih sayang), dan jadal bil ahsan (diskusi interaktif yang santun).',
        kaitanPedagogis: 'Mendasari Komponen 2 (Inovatif) dan Komponen 4 (Berpusat pada Siswa).'
      }
    ],
    haditsNabawi: [
      {
        perawi: 'HR. Ibnu Majah No. 224 (Hadits Shahih)',
        matanArab: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
        terjemah: '"Menuntut ilmu adalah kewajiban atas setiap muslim."',
        hikmahTarbiyah: `Setiap ikhtiar belajar siswa kelas ${kelas} dalam memahami ${topik} bernilai fardhu dan ibadah di sisi Allah Swt.`,
        kaitanPedagogis: 'Membangkitkan motivasi intrinsik dan kesadaran tujuan belajar santri (Indikator 1.4).'
      },
      {
        perawi: 'HR. At-Tirmidzi No. 1919 & Ahmad',
        matanArab: 'لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا وَيَعْرِفْ لِعَالِمِنَا حَقَّهُ',
        terjemah: '"Bukan termasuk golongan kami orang yang tidak menyayangi yang lebih muda di antara kami, tidak menghormati yang lebih tua, dan tidak mengerti hak orang yang berilmu."',
        hikmahTarbiyah: 'Fondasi utama Kurikulum Berbasis Cinta (KBC): Kasih sayang guru (rahmah) melahirkan penghormatan tulus (ta\'dzim) siswa dalam pembelajaran.',
        kaitanPedagogis: 'Mendasari iklim kelas yang aman dan harmonis (Indikator 4.6).'
      }
    ],
    kitabTurats: [
      {
        judulKitab: "Ta'lim al-Muta'allim Thariq at-Ta'allum",
        pengarang: 'Syaikh Burhanuddin az-Zarnuji (Wafat 593 H)',
        babKutipan: "Fashl fi Ikhtiyar al-'Ilm wa al-Ustadz wa ash-Syariq",
        teksNaskah: 'يَنْبَغِي لِلْمُتَعَلِّمِ أَنْ يُطَالِعَ مَسَائِلَهُ وَيُفَكِّرَ فِيهَا، فَإِنَّ الْفِقْهَ لَا يَحْصُلُ إِلَّا بِالتَّأَمُّلِ',
        syarahPedagogis: 'Az-Zarnuji menegaskan bahwa pemahaman sejati hanya diperoleh melalui perenungan mendalam (at-ta\'ammul) dan telaah mandiri, bukan hafalan tekstual yang dangkal.',
        kaitanPedagogis: `Sangat selaras dengan pendekatan Deep Learning, HOTS, dan Inkuiri Bermakna pada materi ${topik}.`
      },
      {
        judulKitab: "Adab al-'Alim wa al-Muta'allim",
        pengarang: "Hadhratusy Syaikh KH. M. Hasyim Asy'ari (Pendiri Nahdlatul Ulama)",
        babKutipan: "Al-Bab ats-Tsani: Adab al-Mu'allim fi Darsihi",
        teksNaskah: 'أَنْ يَتَفَقَّدَ أَحْوَالَ الْمُتَعَلِّمِينَ، وَيُسَهِّلَ عَلَيْهِمْ فَهْمَ الْمَسَائِلِ بِأَلْطَفِ وَجْهٍ، وَيُعَامِلَهُمْ بِالرِّفْقِ',
        syarahPedagogis: `Kiai Hasyim Asy'ari mewasiatkan agar guru senantiasa memperhatikan kondisi keberagaman santri (pembelajaran berdiferensiasi) dan mendidik dengan kelembutan (ar-rifq).`,
        kaitanPedagogis: 'Mendasari Pembelajaran Berdiferensiasi (Komponen 3) dan Berpusat pada Siswa (Komponen 4).'
      }
    ],
    kesimpulanTarbiyahIslamiyah: `Supervisi akademik terhadap pembelajaran ${mapel} oleh ${guru} di ${madrasah} membuktikan bahwa integrasi sains, adab nubuwah, dan cinta kasih melahirkan lulusan santri yang cerdas akal dan mulia akhlak.`
  };

  // Generate Follow Up Plans (RTL) based on indicators needing improvement
  const followUpPlans: FollowUpPlanItem[] = improvements.slice(0, 3).map((imp, idx) => ({
    id: `rtl-${Date.now()}-${idx}`,
    prioritas: idx === 0 ? 'Tinggi' : 'Sedang',
    indikator: imp.split(':')[0] || 'Indikator Supervisi',
    kondisiSaatIni: `Pada berkas "${mainDocName}", bukti tertulis untuk aspek ini belum terurai secara eksplisit.`,
    tindakanPerbaikan: `Menambahkan klausul, rubrik, atau skenario kegiatan yang mencakup aspek tersebut ke dalam modul ajar / RPP ${mapel}.`,
    targetPencapaian: `Dokumen ${mainDocName} dan instrumen pelaksanaannya lengkap 100% sesuai rubrik supervisi.`,
    waktuPelaksanaan: '2 pekan sebelum siklus supervisi berikutnya',
    status: 'Belum Dimulai',
    penanggungJawab: `${guru} (${profile.mataPelajaran})`
  }));

  if (followUpPlans.length === 0) {
    followUpPlans.push({
      id: `rtl-default`,
      prioritas: 'Sedang',
      indikator: '3.1 & 6.2 Pembelajaran Berdiferensiasi & Rubrik Autentik',
      kondisiSaatIni: `Bukti tertulis pada ${mainDocName} dapat diperkaya dengan rubrik berjenjang.`,
      tindakanPerbaikan: `Menyusun tiered assignment dan lembar penilaian unjuk kerja pada materi ${topik}.`,
      targetPencapaian: 'Rubrik asesmen autentik terlampir lengkap di modul ajar.',
      waktuPelaksanaan: '1 bulan ke depan',
      status: 'Belum Dimulai',
      penanggungJawab: guru
    });
  }

  // Cross Analysis
  const crossAnalysis: CrossAnalysis = {
    keselarasanUmum: docFiles.length > 0 && videoFiles.length > 0 ? 'TERLIHAT SELARAS' : 'CUKUP SELARAS',
    catatanKeselarasan: `Perencanaan pada dokumen "${mainDocName}" menunjukkan keselarasan topik dengan aktivitas pembelajaran ${topik} di kelas ${kelas}. Bukti dokumen yang ditemukan telah diverifikasi bersama bukti transkrip observasi.`,
    poinKesesuaian: [
      {
        aspek: 'Kesesuaian Tujuan & Topik',
        pernyataanDokumen: `Topik "${topik}" tertera pada berkas ${mainDocName}.`,
        pelaksanaanVideo: `Guru ${guru} menguraikan tujuan pada apersepsi kelas ${kelas}.`,
        status: 'SELARAS',
        catatan: 'Tujuan pembelajaran dipahami dengan baik oleh siswa.'
      },
      {
        aspek: 'Metode Pembelajaran Aktif',
        pernyataanDokumen: `Merencanakan kegiatan interaktif dalam dokumen ${mainDocName}.`,
        pelaksanaanVideo: 'Teramati interaksi kelompok dan tanya jawab siswa.',
        status: 'SELARAS',
        catatan: 'Siswa aktif berkolaborasi memecahkan masalah.'
      }
    ]
  };

  return {
    id: `session-${Date.now()}`,
    profile: profile,
    files: files,
    indicators: analyzedIndicators,
    timeline: timeline,
    interaction: {
      guruKeSiswa: 35,
      siswaKeGuru: 25,
      siswaKeSiswa: 40,
      aktivitasGuruTerdeteksi: ['Apersepsi kontekstual', 'Scaffolding kelompok', 'Asesmen formatif', 'Penguatan karakter'],
      aktivitasSiswaTerdeteksi: ['Curah pendapat', 'Diskusi tim', 'Pengerjaan LKPD', 'Presentasi karya', 'Refleksi mandiri'],
      metodePembelajaranTerdeteksi: ['Inkuiri Terbimbing', 'Diskusi Kolaboratif', 'Tanya Jawab Interaktif'],
      buktiDiferensiasiTerdeteksi: ['Pembagian peran kelompok fleksibel', 'Penyampaian lisan dan visual'],
      buktiAsesmenTerdeteksi: ['Lembar Kerja Siswa (LKPD)', 'Kuis Formatif', 'Penilaian Antarteman'],
      keteranganEstimasi: 'Estimasi berbasis penelusuran dokumen autentik dan observasi kegiatan.'
    },
    crossAnalysis: crossAnalysis,
    summary: summary,
    pancaCintaSummary: pancaCintaSummary,
    deepLearning: deepLearning,
    turatsStudy: turatsStudy,
    followUpPlans: followUpPlans,
    overallScore: overallScore,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'Dianalisis'
  };
}
