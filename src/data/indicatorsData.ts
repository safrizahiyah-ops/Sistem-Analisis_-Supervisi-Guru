import { 
  ComponentSummary, 
  IndicatorAnalysis, 
  SupervisionSession, 
  TeacherProfile 
} from '../types/supervision';

export interface ComponentDefinition {
  id: number;
  kode: string;
  nama: string;
  deskripsi: string;
  indikatorList: {
    id: string;
    nama: string;
    panduan: string;
  }[];
}

export const COMPONENTS_MASTER: ComponentDefinition[] = [
  {
    id: 1,
    kode: 'PB',
    nama: 'PEMBELAJARAN BERMAKNA',
    deskripsi: 'Menghubungkan materi dengan realitas nyata siswa, membangun pemahaman konseptual mendalam, dan menanamkan nilai akhlak serta kearifan lokal.',
    indikatorList: [
      {
        id: '1.1',
        nama: 'Tujuan pembelajaran dirumuskan jelas, terukur, dan terkait CP/Tujuan Pembelajaran',
        panduan: 'Periksa rumusan TP dalam dokumen, kesesuaian dengan elemen CP, keterukuran kompetensi (ABCD), serta penyampaian tujuan kepada siswa pada awal pembelajaran.'
      },
      {
        id: '1.2',
        nama: 'Materi dikaitkan dengan pengalaman nyata dan kehidupan sehari-hari siswa',
        panduan: 'Temukan contoh kontekstual, studi kasus keseharian, atau peristiwa aktual yang dekat dengan lingkungan peserta didik.'
      },
      {
        id: '1.3',
        nama: 'Materi menghubungkan antar topik, mata pelajaran, dan konteks nyata',
        panduan: 'Cari keterkaitan lintas disiplin (interdisipliner), jembatan konsep prasyarat, atau integrasi tema holistik.'
      },
      {
        id: '1.4',
        nama: 'Siswa memahami alasan belajar dan manfaat materi yang dipelajari',
        panduan: 'Amati apakah guru menyampaikan pertanyaan pemantik bermakna dan siswa mampu mengartikulasikan urgensi materi dalam kehidupan nyata.'
      },
      {
        id: '1.5',
        nama: 'Kegiatan membangun pemahaman konsep, bukan sekadar hafalan',
        panduan: 'Lihat aktivitas penemuan, penalaran mendalam, analogi, pemodelan, bukan drill rumus/hafalan mekanis semata.'
      },
      {
        id: '1.6',
        nama: 'Terdapat pengaitan nilai karakter, akhlak, dan kearifan lokal',
        panduan: 'Periksa integrasi Profil Pelajar Pancasila / Rahmatan Lil Alamin, adab, nilai kepedulian sosial, serta kearifan budaya madrasah/lokal.'
      }
    ]
  },
  {
    id: 2,
    kode: 'PI',
    nama: 'PEMBELAJARAN INOVATIF',
    deskripsi: 'Penerapan strategi pembelajaran aktif, integrasi media dan teknologi kreatif, pemecahan masalah, serta pengembangan keterampilan 4C abad 21.',
    indikatorList: [
      {
        id: '2.1',
        nama: 'Menggunakan metode/strategi aktif, bukan ceramah satu arah',
        panduan: 'Temukan model PjBL, PBL, Discovery, Jigsaw, Gallery Walk, atau simulasi interaktif yang mengaktifkan siswa.'
      },
      {
        id: '2.2',
        nama: 'Memanfaatkan media/alat/bahan atau teknologi yang relevan dan kreatif',
        panduan: 'Periksa pemanfaatan platform digital, simulasi PhET, video edukasi, alat peraga visual, LKPD interaktif, atau bahan alam sekitar.'
      },
      {
        id: '2.3',
        nama: 'Melibatkan siswa dalam pemecahan masalah nyata/proyek',
        panduan: 'Cari tugas investigasi masalah riil di madrasah/lingkungan atau proyek karya solusi nyata.'
      },
      {
        id: '2.4',
        nama: 'Mendorong kreativitas, ide baru, dan cara berpikir kritis',
        panduan: 'Amati pertanyaan divergen tingkat tinggi (HOTS), tantangan beropini alternatif, dan apresiasi ide unik siswa.'
      },
      {
        id: '2.5',
        nama: 'Alur kegiatan bervariasi, tidak monoton, dan menarik minat siswa',
        panduan: 'Lihat dinamika perpindahan sesi: apersepsi dinamis, ice breaking pedagogis, kerja mandiri, diskusi kelompok, presentasi energetik.'
      },
      {
        id: '2.6',
        nama: 'Mengembangkan keterampilan abad 21 (4C: Critical Thinking, Creativity, Collaboration, Communication)',
        panduan: 'Periksa rubrik dan bukti pelaksanaan kerja tim terstruktur, debat gagasan, kreasi solusi, dan presentasi publik.'
      }
    ]
  },
  {
    id: 3,
    kode: 'PD',
    nama: 'PEMBELAJARAN BERDIFERENSIASI',
    deskripsi: 'Akomodasi kesiapan belajar, minat, profil/gaya belajar, tingkat kesulitan materi bertingkat, serta pengelompokan yang fleksibel.',
    indikatorList: [
      {
        id: '3.1',
        nama: 'Mengakui perbedaan kesiapan siswa dan terdapat penyesuaian tugas',
        panduan: 'Temukan asesmen diagnostik awal dan scaffolding berbeda bagi siswa yang butuh bimbingan intensif vs siswa mahir.'
      },
      {
        id: '3.2',
        nama: 'Mengakui perbedaan minat dan menyediakan pilihan topik/produk',
        panduan: 'Cari opsi pilihan topik studi kasus atau ragam format tugas akhir (esai, poster, podcast, video singkat).'
      },
      {
        id: '3.3',
        nama: 'Mengakui perbedaan gaya belajar (visual, auditori, kinestetik)',
        panduan: 'Amati penyediaan multi-modal representasi: teks/grafik (visual), penjelasan/rekaman (auditori), manipulasi benda/gerak (kinestetik).'
      },
      {
        id: '3.4',
        nama: 'Menyediakan berbagai tingkatan kesulitan materi dan latihan',
        panduan: 'Periksa tiered assignments (tingkat dasar, menengah, tantangan pengayaan) dalam LKPD atau penugasan.'
      },
      {
        id: '3.5',
        nama: 'Memberikan opsi cara penyampaian dan hasil karya yang beragam',
        panduan: 'Lihat kebebasan siswa mengekspresikan pemahaman melalui media yang sesuai dengan kekuatan ekspresi mereka.'
      },
      {
        id: '3.6',
        nama: 'Pengelompokan fleksibel: individu, berpasangan, kelompok',
        panduan: 'Amati variasi formasi belajar: refleksi hening mandiri, think-pair-share berpasangan, dan kooperatif heterogen/homogen terarah.'
      }
    ]
  },
  {
    id: 4,
    kode: 'PS',
    nama: 'PEMBELAJARAN BERPUSAT PADA SISWA',
    deskripsi: 'Siswa sebagai subjek aktif otonom dengan guru sebagai fasilitator, memiliki hak suara (student voice), kebebasan bereksplorasi dalam iklim yang aman.',
    indikatorList: [
      {
        id: '4.1',
        nama: 'Siswa menjadi subjek aktif dan guru sebagai fasilitator',
        panduan: 'Perhatikan proporsi waktu bicara: guru memandu dan berkeliling memberi scaffolding, bukan mendominasi panggung utama.'
      },
      {
        id: '4.2',
        nama: 'Memberi kesempatan siswa bertanya, menyampaikan ide, dan pendapat',
        panduan: 'Amati waktu jeda berpikir (wait-time), dorongan untuk menyuarakan rasa ingin tahu, dan tanggapan hangat terhadap pertanyaan siswa.'
      },
      {
        id: '4.3',
        nama: 'Siswa terlibat dalam perencanaan atau pemilihan jalur belajar',
        panduan: 'Cari bukti pelibatan siswa dalam menetapkan kesepakatan kelas, memilih urutan aktivitas, atau target belajar pribadi.'
      },
      {
        id: '4.4',
        nama: 'Kegiatan mendorong kemandirian dan tanggung jawab belajar',
        panduan: 'Lihat peran siswa mengatur pembagian tugas kelompok, mengelola waktu kerja, dan memeriksa mandiri (self-monitoring).'
      },
      {
        id: '4.5',
        nama: 'Memberi ruang eksplorasi dan penemuan mandiri oleh siswa',
        panduan: 'Amati proses percobaan, pengumpulan data empiris, pengujian hipotesis tanpa instruksi mikro yang mengunci jawaban.'
      },
      {
        id: '4.6',
        nama: 'Suasana aman dan menghargai setiap kontribusi siswa',
        panduan: 'Periksa iklim psikologis kelas: bebas perundungan, tidak ada rasa malu saat berbuat salah, saling mendukung dalam perbedaan pendapat.'
      }
    ]
  },
  {
    id: 5,
    kode: 'PR',
    nama: 'PEMBELAJARAN REFLEKTIF',
    deskripsi: 'Pembiasaan metakognisi siswa di akhir sesi, evaluasi ketercapaian tujuan, refleksi diri guru, dan komitmen catatan tindak lanjut pembelajaran.',
    indikatorList: [
      {
        id: '5.1',
        nama: 'Ada sesi refleksi di akhir pembelajaran untuk siswa',
        panduan: 'Periksa ketersediaan alokasi waktu khusus refleksi 5-10 menit sebelum penutupan dalam modul dan implementasi video.'
      },
      {
        id: '5.2',
        nama: 'Refleksi mencakup: apa yang dipelajari, bagaimana cara belajar, kendala, solusi',
        panduan: 'Lihat pertanyaan pemandu reflektif (misal: 3-2-1, tiket keluar/exit ticket, jurnal belajar, papan refleksi Padlet/Sticky note).'
      },
      {
        id: '5.3',
        nama: 'Guru melakukan refleksi diri terhadap proses pembelajaran',
        panduan: 'Temukan catatan refleksi guru di perangkat ajar mengenai efektivitas strategi, respon siswa, dan kendala manajemen kelas.'
      },
      {
        id: '5.4',
        nama: 'Hasil refleksi digunakan sebagai bahan perbaikan pembelajaran berikutnya',
        panduan: 'Cari evidensi penyesuaian materi atau metode lanjutan berdasarkan evaluasi pertemuan sebelumnya.'
      },
      {
        id: '5.5',
        nama: 'Siswa diajak mengevaluasi pencapaian tujuan pembelajaran',
        panduan: 'Amati apakah siswa diajak mencocokkan kembali hasil belajar mereka dengan target TP yang disampaikan di awal.'
      },
      {
        id: '5.6',
        nama: 'Terdapat catatan tindak lanjut dari hasil refleksi',
        panduan: 'Periksa rencana remedial, pengayaan, tugas mandiri terarah, atau agenda klarifikasi konsep pada pertemuan berikutnya.'
      }
    ]
  },
  {
    id: 6,
    kode: 'AA',
    nama: 'ASESMEN AUTENTIK',
    deskripsi: 'Penerapan asesmen komprehensif (diagnostik, formatif, sumatif), penilaian proses dan kinerja kontekstual nyata, rubrik terukur, serta umpan balik berkesinambungan.',
    indikatorList: [
      {
        id: '6.1',
        nama: 'Asesmen dilakukan sebelum, selama, dan sesudah pembelajaran',
        panduan: 'Temukan instrumen asesmen diagnostik (awal), cek pemahaman berkala saat proses (formatif), dan asesmen akhir (sumatif).'
      },
      {
        id: '6.2',
        nama: 'Alat asesmen jelas, terukur, dan sesuai tujuan pembelajaran',
        panduan: 'Periksa kisi-kisi, rubrik penskoran analitik/holistik, kriteria ketercapaian tujuan pembelajaran (KKTP), dan kejelasan instruksi soal.'
      },
      {
        id: '6.3',
        nama: 'Menilai proses dan produk, bukan hanya hasil akhir/tes tertulis',
        panduan: 'Cari lembar observasi keaktifan diskusi, jurnal sikap, ceklis unjuk kerja, di samping produk hasil karya siswa.'
      },
      {
        id: '6.4',
        nama: 'Menggunakan berbagai bentuk asesmen: kinerja, proyek, portofolio, observasi',
        panduan: 'Lihat ragam instrumen yang digunakan guru dalam modul ajar dan aktivitas observasi langsung.'
      },
      {
        id: '6.5',
        nama: 'Soal/tugas menuntut penerapan pengetahuan dalam konteks nyata',
        panduan: 'Periksa apakah stimulus soal berbasis masalah kehidupan nyata, bukan sekadar pertanyaan teoritis abstrak/memoristis.'
      },
      {
        id: '6.6',
        nama: 'Umpan balik diberikan secara berkelanjutan dan membangun',
        panduan: 'Amati feedback guru: apresiasi spesifik, koreksi konstruktif, bimbingan lanjutan saat siswa bekerja atau presentasi.'
      }
    ]
  }
];

/**
 * Calculates Component and Overall Scores properly
 * Excluding N/A from denominator
 */
export function calculateScores(indicators: IndicatorAnalysis[]): {
  componentSummaries: ComponentSummary[];
  overallScore: number;
  totalEvaluated: number;
  totalSangatTerpenuhi: number;
  totalTerpenuhi: number;
  totalSebagian: number;
  totalBelumTerpenuhi: number;
  totalNA: number;
} {
  let grandTotalScore = 0;
  let grandMaxScore = 0;
  let count4 = 0;
  let count3 = 0;
  let count2 = 0;
  let count1 = 0;
  let countNA = 0;

  const componentSummaries: ComponentSummary[] = COMPONENTS_MASTER.map(comp => {
    const compIndicators = indicators.filter(ind => ind.componentId === comp.id);
    let compTotalScore = 0;
    let compMaxScore = 0;
    let compNA = 0;
    const strongList: string[] = [];
    const weakList: string[] = [];

    compIndicators.forEach(ind => {
      // Use supervisor score if verified, otherwise AI score
      const activeScore = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined 
        ? ind.skorSupervisor 
        : ind.skorAi;

      if (activeScore === 'N/A') {
        compNA++;
        countNA++;
      } else {
        const numericScore = Number(activeScore);
        compTotalScore += numericScore;
        compMaxScore += 4; // Max score per evaluated indicator is 4

        grandTotalScore += numericScore;
        grandMaxScore += 4;

        if (numericScore === 4) {
          count4++;
          strongList.push(ind.id);
        } else if (numericScore === 3) {
          count3++;
          strongList.push(ind.id);
        } else if (numericScore === 2) {
          count2++;
          weakList.push(ind.id);
        } else if (numericScore === 1) {
          count1++;
          weakList.push(ind.id);
        }
      }
    });

    const evaluatedCount = compIndicators.length - compNA;
    const percentage = compMaxScore > 0 ? Math.round((compTotalScore / compMaxScore) * 100) : 0;
    const avgScore = evaluatedCount > 0 ? Number((compTotalScore / evaluatedCount).toFixed(2)) : 0;

    return {
      id: comp.id,
      kode: comp.kode,
      nama: comp.nama,
      deskripsi: comp.deskripsi,
      totalSkorMaksimal: compMaxScore,
      totalSkorDiperoleh: compTotalScore,
      skorRataRata: avgScore,
      persentase: percentage,
      jumlahIndikatorDinilai: evaluatedCount,
      jumlahIndikatorNA: compNA,
      indikatorKuat: strongList,
      indikatorPerluPerbaikan: weakList
    };
  });

  const overallScore = grandMaxScore > 0 ? Math.round((grandTotalScore / grandMaxScore) * 100) : 0;
  const totalEvaluated = 36 - countNA;

  return {
    componentSummaries,
    overallScore,
    totalEvaluated,
    totalSangatTerpenuhi: count4,
    totalTerpenuhi: count3,
    totalSebagian: count2,
    totalBelumTerpenuhi: count1,
    totalNA: countNA
  };
}

/**
 * Default demonstration session fully populated with authentic pedagogical evidence
 */
export const SAMPLE_SESSION: SupervisionSession = {
  id: 'sup-demo-2026-001',
  profile: {
    namaGuru: 'Nurul Hidayati, S.Pd., M.Pd.',
    nipNuptk: '198504122009122003',
    mataPelajaran: 'Ilmu Pengetahuan Alam (Biologi)',
    kelas: 'X (Sepuluh) - Unggulan 2',
    fase: 'Fase E (SMA/MA)',
    madrasahSekolah: 'MAN 1 Insan Cendekia',
    tahunPelajaran: '2025/2026',
    semester: 'Genap',
    namaSupervisor: 'Drs. H. Ahmad Fauzan, M.Pd. (Pengawas Madya)',
    tanggalSupervisi: '2026-02-18',
    jenisSupervisi: 'Supervisi Komprehensif',
    topikPembelajaran: 'Ekosistem Lokal, Siklus Biogeokimia, dan Pelestarian Lingkungan Madrasah'
  },
  files: [
    {
      id: 'f-doc-1',
      name: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
      size: 2450000,
      type: 'document',
      mimeType: 'application/pdf',
      category: 'Modul Ajar',
      contentSnippet: 'Modul Ajar Biologi Terintegrasi Nilai Keislaman & PjBL Konservasi Air Kolam Madrasah...',
      uploadDate: '2026-02-18 07:30'
    },
    {
      id: 'f-doc-2',
      name: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
      size: 1150000,
      type: 'document',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      category: 'LKPD & Asesmen',
      contentSnippet: 'Lembar Kerja Peserta Didik 3 Tingkat Kesulitan: Investigasi Kolam, Siklus Nitrogen...',
      uploadDate: '2026-02-18 07:32'
    },
    {
      id: 'f-vid-1',
      name: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
      size: 145000000,
      type: 'video',
      mimeType: 'video/mp4',
      category: 'Video Pembelajaran',
      contentSnippet: 'Video pembelajaran 40 menit: Apersepsi, Eksplorasi sampel air kolam, Diskusi 5 kelompok, Presentasi, Asesmen & Refleksi.',
      uploadDate: '2026-02-18 07:35'
    }
  ],
  indicators: [
    // KOMPONEN 1: PEMBELAJARAN BERMAKNA
    {
      id: '1.1',
      componentId: 1,
      namaIndikator: 'Tujuan pembelajaran dirumuskan jelas, terukur, dan terkait CP/Tujuan Pembelajaran',
      deskripsi: 'Periksa rumusan TP dalam dokumen dan penyampaian di awal sesi',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Tujuan pembelajaran tertulis sangat jelas dengan formula ABCD di Modul Ajar Halaman 2 dan disampaikan guru pada slide awal di video.',
      kekurangan: 'Tidak ditemukan kekurangan signifikan, target kompetensi sangat terukur.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 2',
        bagianHeading: 'A. Identitas & Tujuan Pembelajaran',
        kutipanTeks: 'Melalui penyelidikan sampel air kolam madrasah, peserta didik mampu menganalisis interaksi komponen biotik-abiotik serta merancang solusi pencemaran air secara kolaboratif (C4).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '02:15 - 03:30',
        transkrip: 'Guru: "Anak-anakku sekalian, target kita hari ini adalah menganalisis langsung air kolam depan asrama dan membuktikan keseimbangan ekosistemnya."',
        deskripsiVisual: 'Guru menampilkan slide proyektor berisi 3 tujuan pembelajaran dan meminta siswa membaca bersama.',
        aktivitasTerdeteksi: 'Penyampaian Tujuan & Kontrak Belajar'
      },
      sumberBukti: 'Modul Hal 2 & Video 02:15-03:30',
      rekomendasi: {
        masalah: 'Sudah sangat optimal.',
        mengapaPenting: 'Membuat siswa memiliki kompas orientasi belajar yang pasti.',
        tindakanDisarankan: 'Pertahankan dan lanjutkan dengan mengaitkan ke rubrik kriteria keberhasilan.',
        contohImplementasi: 'Ajak siswa memberi tanda centang mandiri pada kartu target belajar di akhir jam.',
        prioritas: 'Rendah'
      },
      catatanSupervisor: 'Penyampaian TP sangat komunikatif dan menggugah minat siswa.'
    },
    {
      id: '1.2',
      componentId: 1,
      namaIndikator: 'Materi dikaitkan dengan pengalaman nyata dan kehidupan sehari-hari siswa',
      deskripsi: 'Menghubungkan materi dengan realitas kehidupan siswa',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Materi dikaitkan langsung dengan kolam ikan dan limbah wudhu asrama madrasah tempat siswa tinggal setiap hari.',
      kekurangan: 'Contoh dampak limbah rumah tangga non-madrasah masih sedikit disinggung.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 4',
        bagianHeading: 'B. Pemahaman Bermakna & Pertanyaan Pemantik',
        kutipanTeks: 'Mengapa air kolam madrasah berwarna kehijauan setelah hujan lebat, dan bagaimana nasib ikan mas di dalamnya jika lumut blooming?'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '04:10 - 06:20',
        transkrip: 'Guru: "Siapa di sini yang kemarin piket kolam asrama? Apa yang kalian amati di permukaan air saat matahari terik?"',
        deskripsiVisual: 'Siswa antusias mengangkat tangan menceritakan warna air kolam dan bau lumut.',
        aktivitasTerdeteksi: 'Apersepsi Kontekstual Berbasis Pengalaman Riil'
      },
      sumberBukti: 'Modul Hal 4 & Video 04:10-06:20',
      rekomendasi: {
        masalah: 'Perlu perluasan konteks ke ekosistem sungai sekitar pemukiman siswa di luar madrasah.',
        mengapaPenting: 'Agar pemahaman kontekstual tidak terbatas pada lingkungan asrama saja.',
        tindakanDisarankan: 'Minta perwakilan siswa luar asrama membagikan kondisi drainase di desa asalnya.',
        contohImplementasi: 'Tampilkan 1 foto perbandingan saluran air pemukiman padat vs kolam terkontrol.',
        prioritas: 'Sedang'
      },
      catatanSupervisor: 'Konteks kolam asrama terbukti sangat menarik atensi santri.'
    },
    {
      id: '1.3',
      componentId: 1,
      namaIndikator: 'Materi menghubungkan antar topik, mata pelajaran, dan konteks nyata',
      deskripsi: 'Integrasi interdisipliner materi',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Ada integrasi dengan Kimia (kadar pH air dan oksigen terlarut) serta Fikih Thaharah (air mutanajjis vs suci mensucikan).',
      kekurangan: 'Koneksi dengan Fisika (suhu dan turbiditas cahaya) hanya disebut sekilas.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 5',
        bagianHeading: 'Integrasi Lintas Disiplin',
        kutipanTeks: 'Keterpaduan dengan Kimia Analitik (pengukuran indikator pH) dan Fikih Lingkungan (Thaharah wa al-Bi\'ah).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '11:45 - 13:10',
        transkrip: 'Guru: "Ingat pelajaran Kimia semester lalu tentang derajat keasaman? Air kolam dengan pH di bawah 6 akan membuat telur ikan rusak."',
        deskripsiVisual: 'Guru menunjukkan kertas lakmus dan alat pH meter digital kepada siswa.',
        aktivitasTerdeteksi: 'Integrasi Sains & Fikih Lingkungan'
      },
      sumberBukti: 'Modul Hal 5 & Video 11:45-13:10',
      rekomendasi: {
        masalah: 'Hubungan dengan sifat fisis air (suhu, penetrasi cahaya) belum dieksplorasi mendalam.',
        mengapaPenting: 'Pemahaman ekologis membutuhkan pemahaman fisika lingkungan yang utuh.',
        tindakanDisarankan: 'Tambahkan data suhu permukaan air dalam lembar pengamatan LKPD.',
        contohImplementasi: 'Gunakan termometer celup saat sampling air kolam pada kedalaman berbeda.',
        prioritas: 'Sedang'
      }
    },
    {
      id: '1.4',
      componentId: 1,
      namaIndikator: 'Siswa memahami alasan belajar dan manfaat materi yang dipelajari',
      deskripsi: 'Siswa memahami urgensi materi dalam kehidupan',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa menyatakan pemahaman saat guru bertanya manfaat menjaga stabilitas kolam untuk ketahanan pangan asrama.',
      kekurangan: 'Belum semua siswa menyuarakan pemahamannya, baru 2 perwakilan.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 3',
        bagianHeading: 'Tujuan Pembelajaran Bermakna',
        kutipanTeks: 'Menyadari peran manusia sebagai khalifah fi al-ardh dalam mengelola daya dukung lingkungan.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '07:20 - 08:45',
        transkrip: 'Siswa Raihan: "Kalau ekosistem kolam rusak, ikan lele untuk konsumsi santri bisa mati massal Bu."',
        deskripsiVisual: 'Guru mengangguk mengapresiasi dan menuliskan poin ketahanan pangan di papan tulis.',
        aktivitasTerdeteksi: 'Diskusi Manfaat Nyata Materi'
      },
      sumberBukti: 'Modul Hal 3 & Video 07:20-08:45',
      rekomendasi: {
        masalah: 'Eksplorasi manfaat belum merata ke siswa yang cenderung pendiam.',
        mengapaPenting: 'Setiap siswa berhak merasakan makna personal dari apa yang dipelajari.',
        tindakanDisarankan: 'Gunakan papan sticky notes kilat: "1 Alasan Mengapa Materi Ini Penting Bagi Saya".',
        contohImplementasi: 'Setiap siswa menempelkan satu kertas catatan kecil di dinding kelas.',
        prioritas: 'Sedang'
      }
    },
    {
      id: '1.5',
      componentId: 1,
      namaIndikator: 'Kegiatan membangun pemahaman konsep, bukan sekadar hafalan',
      deskripsi: 'Penalaran konsep mendalam vs hafalan mekanis',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa menguji sendiri sampel air di bawah mikroskop cahaya monokuler dan menganalisis rantai makanan nyata.',
      kekurangan: 'Tidak ada hafalan mekanis; semua kegiatan berbasis observasi empiris.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 3',
        bagianHeading: 'Aktivitas 2: Analisis Jejaring Makanan Mikroalga',
        kutipanTeks: 'Berdasarkan preparat basah yang kalian buat, gambarkan diagram jaring-jaring energi yang terjadi jika populasi Daphnia punah!'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '16:10 - 22:30',
        transkrip: 'Siswa: "Bu, ini parameciumnya bergerak cepat sekali, berarti airnya masih kaya oksigen ya?"',
        deskripsiVisual: 'Siswa mengamati preparat air dengan mikroskop, mencatat pergerakan mikroorganisme di LKPD.',
        aktivitasTerdeteksi: 'Eksplorasi Empiris Laboratorium Terbuka'
      },
      sumberBukti: 'LKPD Hal 3 & Video 16:10-22:30',
      rekomendasi: {
        masalah: 'Sudah sangat baik.',
        mengapaPenting: 'Mencegah verbalisme dan miskonsepsi biologi.',
        tindakanDisarankan: 'Pertahankan metode praktikum inkuiri penemuan mandiri.',
        contohImplementasi: 'Dokumentasikan hasil foto lensa okuler mikroskop melalui smartphone siswa.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '1.6',
      componentId: 1,
      namaIndikator: 'Terdapat pengaitan nilai karakter, akhlak, dan kearifan lokal',
      deskripsi: 'Integrasi akhlak, P5/PPRA, kearifan lokal',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Integrasi nilai Rahmatan Lil Alamin (QS. Ar-Rum: 41 tentang kerusakan lingkungan akibat tangan manusia) disampaikan sangat apik.',
      kekurangan: 'Tradisi lokal daerah asal madrasah (misal kearifan subak/sedekah bumi) belum disinggung.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 6',
        bagianHeading: 'Muatan Nilai Karakter & PPRA',
        kutipanTeks: 'Nilai Keteladanan (Qudwah), Keseimbangan (Tawazun), dan Cinta Tanah Air melalui menjaga kebersihan sumber air madrasah.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '08:50 - 10:15',
        transkrip: 'Guru: "Islam mengajarkan la tufsidu fi al-ardh ba\'da ishlahiha. Jangan merusak bumi setelah Allah memperbaikinya. Menjaga kolam ini bagian dari ibadah kita."',
        deskripsiVisual: 'Guru mengutip dalil Al-Qur\'an di layar proyektor dengan kaligrafi indah.',
        aktivitasTerdeteksi: 'Pemberian Penguatan Karakter Keislaman'
      },
      sumberBukti: 'Modul Hal 6 & Video 08:50-10:15',
      rekomendasi: {
        masalah: 'Perkaya dengan narasi kearifan lokal masyarakat tradisional Nusantara dalam konservasi air.',
        mengapaPenting: 'Mengokohkan identitas kultural dan apresiasi terhadap tradisi leluhur.',
        tindakanDisarankan: 'Sertakan contoh sistem Lubuk Larangan di Sumatera atau Pranata Mangsa di Jawa.',
        contohImplementasi: 'Beri 1 slide komparasi sains modern vs kearifan lokal Lubuk Larangan.',
        prioritas: 'Sedang'
      }
    },

    // KOMPONEN 2: PEMBELAJARAN INOVATIF
    {
      id: '2.1',
      componentId: 2,
      namaIndikator: 'Menggunakan metode/strategi aktif, bukan ceramah satu arah',
      deskripsi: 'Strategi pembelajaran aktif student-centered',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Menerapkan Project-Based Learning (PjBL) mini dengan kerja kelompok eksperimen mikroskop dan presentasi gallery walk.',
      kekurangan: 'Tidak ada ceramah panjang; waktu ceramah guru hanya ~18% dari total durasi.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 7',
        bagianHeading: 'Model & Metode Pembelajaran',
        kutipanTeks: 'Model: Guided Project-Based Learning. Metode: Observasi lapangan, praktikum mikroskop, diskusi jigsaw, presentasi papan galeri.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '14:30 - 28:40',
        transkrip: 'Guru: "Silakan masing-masing tim bergerak ke pos instrumen, waktu eksplorasi 15 menit!"',
        deskripsiVisual: 'Siswa aktif berpindah pos, membawa tabung reaksi dan kertas kerja, guru memfasilitasi antar meja.',
        aktivitasTerdeteksi: 'Praktikum Aktif & Diskusi Pos'
      },
      sumberBukti: 'Modul Hal 7 & Video 14:30-28:40',
      rekomendasi: {
        masalah: 'Pengelolaan waktu perpindahan pos perlu lebih presisi.',
        mengapaPenting: 'Menjaga ritme energi belajar siswa tetap optimal.',
        tindakanDisarankan: 'Gunakan timer digital dengan alarm audio lembut di layar proyektor.',
        contohImplementasi: 'Pasang online stopwatch layar penuh saat aktivitas kelompok berlangsung.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '2.2',
      componentId: 2,
      namaIndikator: 'Memanfaatkan media/alat/bahan atau teknologi yang relevan dan kreatif',
      deskripsi: 'Penggunaan media digital, alat peraga, dan bahan nyata',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Memanfaatkan mikroskop digital berkoneksi Wi-Fi ke tablet, proyektor interaktif, dan aplikasi sensor pH digital.',
      kekurangan: 'Hanya ada 2 mikroskop digital sehingga 3 kelompok lain masih memakai mikroskop cahaya biasa.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 8',
        bagianHeading: 'Media dan Sumber Belajar',
        kutipanTeks: 'Tablet Android, Mikroskop Wi-Fi Eyepiece, pH Sensor Vernier, Liveworksheet, Canva for Education.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '17:40 - 20:10',
        transkrip: 'Siswa: "Lihat di tablet Bu, alga filamennya kelihatan kloroplas spiralnya jelas sekali!"',
        deskripsiVisual: 'Siswa merekam layar tablet yang memproyeksikan pandangan mikroskop.',
        aktivitasTerdeteksi: 'Pemanfaatan Teknologi Laboratorium Cerdas'
      },
      sumberBukti: 'Modul Hal 8 & Video 17:40-20:10',
      rekomendasi: {
        masalah: 'Distribusi mikroskop digital belum merata ke seluruh meja kelompok.',
        mengapaPenting: 'Keadilan akses teknologi bagi seluruh siswa.',
        tindakanDisarankan: 'Buat sistem rotasi giliran penggunaan mikroskop digital antar kelompok.',
        contohImplementasi: 'Beri slot 5 menit bagi kelompok 3, 4, 5 untuk menyambungkan gawai mereka ke lensa digital.',
        prioritas: 'Sedang'
      }
    },
    {
      id: '2.3',
      componentId: 2,
      namaIndikator: 'Melibatkan siswa dalam pemecahan masalah nyata/proyek',
      deskripsi: 'Keterlibatan dalam problem solving atau project',
      skorAi: 3,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Supervisor menaikkan skor menjadi 4 karena siswa langsung menghasilkan draf rancangan biofilter mini untuk kolam madrasah.',
      kekurangan: 'Dalam video pengujian fisik biofilter baru tahap sketsa dan estimasi bahan.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 5',
        bagianHeading: 'Tantangan Solusi Nyata (STEM Project)',
        kutipanTeks: 'Rancanglah miniatur sistem filtrasi air biologis sederhana menggunakan bahan zeolit, arang aktif, dan tanaman eceng gondok.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '23:15 - 27:30',
        transkrip: 'Siswa Zaki: "Kelompok kami memilih arang aktif dari batok kelapa bekas dapur asrama agar hemat biaya dan ramah lingkungan."',
        deskripsiVisual: 'Kelompok 2 mempresentasikan sketsa filter air tiga lapis di kertas plano.',
        aktivitasTerdeteksi: 'Perancangan Solusi Masalah Nyata (PBL)'
      },
      sumberBukti: 'LKPD Hal 5 & Video 23:15-27:30',
      rekomendasi: {
        masalah: 'Perlu jadwal uji coba fisik filter pada pertemuan selanjutnya.',
        mengapaPenting: 'Memastikan siklus design-thinking sampai pada tahap evaluasi prototipe nyata.',
        tindakanDisarankan: 'Jadwalkan uji efektivitas debit air filter di laboratorium terbuka pada pekan depan.',
        contohImplementasi: 'Tambahkan lembar uji debit dan kejernihan air setelah melewati filter.',
        prioritas: 'Sedang'
      },
      catatanSupervisor: 'Koreksi: Walaupun video hanya mencakup sesi perancangan, LKPD dan modul menunjukkan proyek berkelanjutan 2 pertemuan.'
    },
    {
      id: '2.4',
      componentId: 2,
      namaIndikator: 'Mendorong kreativitas, ide baru, dan cara berpikir kritis',
      deskripsi: 'Pertanyaan HOTS dan pemikiran divergen',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Guru memberikan pertanyaan pemantik tingkat tinggi: "Apa konsekuensi terburuk jika kita membasmi 100% lumut di kolam?" yang memicu perdebatan kritis.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 9',
        bagianHeading: 'Pertanyaan Berpikir Kritis (HOTS)',
        kutipanTeks: 'Soal Analisis Skenario Ekologis: Prediksikan perubahan piramida biomassa jika terjadi eutrofikasi akut.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '12:10 - 14:15',
        transkrip: 'Guru: "Ayo pikirkan, kalau lumutnya kita racun sampai habis, oksigen di air bertambah atau justru anjlok saat malam hari?"',
        deskripsiVisual: 'Siswa terdiam sejenak lalu berbisik mendiskusikan konsep respirasi seluler lumut saat malam.',
        aktivitasTerdeteksi: 'Pertanyaan HOTS Berpikir Divergen'
      },
      sumberBukti: 'Modul Hal 9 & Video 12:10-14:15',
      rekomendasi: {
        masalah: 'Pertahankan iklim berpikir kritis ini.',
        mengapaPenting: 'Membiasakan nalar logis saintifik.',
        tindakanDisarankan: 'Libatkan siswa dalam menilai argumen teman mereka (peer critique).',
        contohImplementasi: 'Gunakan kartu "Saya setuju karena..." dan "Saya meragukan poin ini karena...".',
        prioritas: 'Rendah'
      }
    },
    {
      id: '2.5',
      componentId: 2,
      namaIndikator: 'Alur kegiatan bervariasi, tidak monoton, dan menarik minat siswa',
      deskripsi: 'Variasi alur, transisi dinamis, ice breaking bermakna',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Alur sangat mengalir: 5 menit pengantar -> 8 menit video apersepsi & kuis cepat -> 15 menit laboratorium -> 8 menit debat karya -> 4 menit penutup.',
      kekurangan: 'Transisi dari mikroskop ke presentasi sempat memakan waktu 1.5 menit untuk menata bangku.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 10',
        bagianHeading: 'Skenario Pembelajaran Berbasis Waktu',
        kutipanTeks: 'Distribusi waktu terstruktur: Pendahuluan (10 menit), Inti Eksploratif (25 menit), Penutup & Refleksi (10 menit).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '00:00 - 40:00',
        transkrip: '[Perpindahan sesi berjalan tanpa jeda kosong, suasana kelas riuh positif]',
        deskripsiVisual: 'Grafik keterlibatan siswa konsisten di atas 85% sepanjang 40 menit rekaman.',
        aktivitasTerdeteksi: 'Manajemen Kelas Dinamis & Alur Bervariasi'
      },
      sumberBukti: 'Modul Hal 10 & Video 00:00-40:00',
      rekomendasi: {
        masalah: 'Tata ruang kelas lab perlu dioptimasi agar mobilitas kelompok tidak saling bersenggolan.',
        mengapaPenting: 'Keselamatan kerja praktikum dan efisiensi waktu transisi.',
        tindakanDisarankan: 'Atur meja praktikum formasi U-Shape sebelum jam pelajaran dimulai.',
        contohImplementasi: 'Beri tanda nomor meja kelompok di lantai lab dengan selotip warna.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '2.6',
      componentId: 2,
      namaIndikator: 'Mengembangkan keterampilan abad 21 (4C: Critical Thinking, Creativity, Collaboration, Communication)',
      deskripsi: 'Penguatan 4C dalam modul dan pelaksanaan',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Terbukti kuat: Critical Thinking (analisis sampel), Creativity (desain filter), Collaboration (pembagian peran lab), Communication (presentasi poster).',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 11',
        bagianHeading: 'Matriks Pengembangan Keterampilan Abad 21',
        kutipanTeks: 'Indikator Ketercapaian 4C terpetakan ke dalam rubrik observasi perilaku kelompok selama inkuiri ilmiah.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '25:40 - 31:10',
        transkrip: 'Siswa Juru Bicara: "Rekan-rekan, tim kami membagi tugas: Zahra menguji pH, Fajar mendokumentasikan mikroskop, dan saya menyusun argumen presentasi."',
        deskripsiVisual: 'Kelompok 1 memaparkan hasil poster kolaboratif di depan kelas dengan artikulasi lugas.',
        aktivitasTerdeteksi: 'Presentasi Kolaboratif & Komunikasi Ilmiah'
      },
      sumberBukti: 'Modul Hal 11 & Video 25:40-31:10',
      rekomendasi: {
        masalah: 'Pertahankan pembagian peran kerja tim.',
        mengapaPenting: 'Mencegah free-rider (anggota pasif) dalam kelompok.',
        tindakanDisarankan: 'Lakukan rotasi peran pada sesi praktikum berikutnya (juru bicara menjadi pengamat lab).',
        contohImplementasi: 'Gunakan lencana peran: Peneliti, Juru Bicara, Notulis, Pengatur Waktu.',
        prioritas: 'Rendah'
      }
    },

    // KOMPONEN 3: PEMBELAJARAN BERDIFERENSIASI
    {
      id: '3.1',
      componentId: 3,
      namaIndikator: 'Mengakui perbedaan kesiapan siswa dan terdapat penyesuaian tugas',
      deskripsi: 'Penyesuaian tugas berdasarkan kesiapan belajar awal',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Guru menyediakan 2 versi panduan LKPD (versi terpandu untuk kelompok dasar dan versi tantangan inkuiri bebas untuk kelompok mahir).',
      kekurangan: 'Di video proses pengelompokan berdasarkan kesiapan belum dijelaskan secara eksplisit kepada siswa.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 2',
        bagianHeading: 'Diferensiasi Konten & Proses Berdasarkan Asesmen Awal',
        kutipanTeks: 'Kelompok A (Kesiapan Perlu Bimbingan): LKPD Scaffolding dilengkapi gambar panduan; Kelompok B (Kesiapan Mahir): LKPD Open-Ended Investigation.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '14:50 - 16:30',
        transkrip: 'Guru: "Kelompok Meja 1 dan 2 bisa ikuti panduan kode hijau ya, sedangkan Meja 3, 4, 5 langsung ke protokol kode biru."',
        deskripsiVisual: 'Guru membagikan map LKPD dengan warna berbeda secara diskret tanpa memberi label merendahkan.',
        aktivitasTerdeteksi: 'Diferensiasi Penugasan Berdasarkan Kesiapan'
      },
      sumberBukti: 'LKPD Hal 2 & Video 14:50-16:30',
      rekomendasi: {
        masalah: 'Guru perlu memastikan pendampingan intensif tidak membuat kelompok kode hijau merasa tertinggal.',
        mengapaPenting: 'Menjaga kepercayaan diri akademis siswa.',
        tindakanDisarankan: 'Berikan penguatan verbal positif saat kelompok dasar berhasil menyelesaikan langkah 1.',
        contohImplementasi: 'Gunakan kartu pencapaian mini ("Bagus! Kalian berhasil mengidentifikasi 3 alga!").',
        prioritas: 'Sedang'
      }
    },
    {
      id: '3.2',
      componentId: 3,
      namaIndikator: 'Mengakui perbedaan minat dan menyediakan pilihan topik/produk',
      deskripsi: 'Pilihan topik investigasi dan format produk akhir',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa diberi pilihan luaran: infografis digital, video vlog edukasi pendek, atau laporan mini riset tertulis.',
      kekurangan: 'Pilihan topik objek amatan masih terbatas pada air kolam madrasah saja.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 12',
        bagianHeading: 'Diferensiasi Produk',
        kutipanTeks: 'Peserta didik bebas memilih bentuk laporan akhir: Poster Canva, Podcast Audio 3 Menit, atau Makalah Ilmiah Sederhana.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '32:15 - 33:40',
        transkrip: 'Guru: "Untuk tagihan proyek, silakan sepakati dengan kelompok kalian, mau presentasi poster atau video Reels TikTok edukasi."',
        deskripsiVisual: 'Siswa bersorak gembira mendengar opsi video media sosial.',
        aktivitasTerdeteksi: 'Pemberian Opsi Produk Akhir Sesuai Minat'
      },
      sumberBukti: 'Modul Hal 12 & Video 32:15-33:40',
      rekomendasi: {
        masalah: 'Sediakan rubrik penilaian yang setara untuk produk video vs poster vs makalah.',
        mengapaPenting: 'Menjaga objektivitas penilaian antar format produk yang berbeda.',
        tindakanDisarankan: 'Lampirkan rubrik konversi penilaian produk multi-format pada Google Classroom.',
        contohImplementasi: 'Fokuskan rubrik pada kedalaman konten sains (60%) dan estetika penyampaian (40%).',
        prioritas: 'Sedang'
      }
    },
    {
      id: '3.3',
      componentId: 3,
      namaIndikator: 'Mengakui perbedaan gaya belajar (visual, auditori, kinestetik)',
      deskripsi: 'Penyediaan stimulasi multi-modal',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Visual (diagram mikroskop & slide), Auditori (penjelasan guru & podcast singkat), Kinestetik (mengambil sampel air dan mengoperasikan mikroskop).',
      kekurangan: 'Tidak ada kekurangan.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 13',
        bagianHeading: 'Profil Belajar Peserta Didik',
        kutipanTeks: 'Penyajian multi-modalitas stimulus: video animasi daur nitrogen, penjelasan lisan interaktif, dan manipulasi alat laboratorium.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '15:10 - 24:00',
        transkrip: 'Guru: "Yang kinestetik silakan pegang pipet tetes, yang visual amati pola warna preparat, yang auditori dengarkan penjelasan rekan lab."',
        deskripsiVisual: 'Seluruh modalitas sensori siswa terakomodasi aktif di meja lab.',
        aktivitasTerdeteksi: 'Fasilitasi Multi-Modal Belajar'
      },
      sumberBukti: 'Modul Hal 13 & Video 15:10-24:00',
      rekomendasi: {
        masalah: 'Sangat baik.',
        mengapaPenting: 'Mengakomodasi seluruh tipe kecerdasan majemuk peserta didik.',
        tindakanDisarankan: 'Pertahankan variasi stimulus multi-sensori ini.',
        contohImplementasi: 'Sediakan headphone bagi siswa auditori yang ingin memutar ulang audio narasi materi.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '3.4',
      componentId: 3,
      namaIndikator: 'Menyediakan berbagai tingkatan kesulitan materi dan latihan',
      deskripsi: 'Tiered assignments / berjenjang',
      skorAi: 2,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Supervisor menaikkan ke skor 3 karena di lampiran LKPD terdapat soal pengayaan bertingkat level C2, C4, dan C6, meskipun di video belum semua siswa sampai ke level C6.',
      kekurangan: 'Di video pembelajaran, siswa sebagian besar baru menyelesaikan soal tingkat dasar dan menengah karena keterbatasan durasi.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Sedang',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 6',
        bagianHeading: 'Uji Mandiri Berjenjang (Tiered Tasks)',
        kutipanTeks: 'Level 1 (Pemahaman Dasar): Identifikasi 3 produsen; Level 2 (Aplikasi): Hitung efisiensi transfer energi; Level 3 (Kreasi): Modelkan mitigasi bila suhu global naik 2C.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '28:10 - 30:00',
        transkrip: 'Guru: "Bagi yang sudah selesai Level 2, silakan coba tantangan Level 3 di balik lembar LKPD ya."',
        deskripsiVisual: 'Hanya terlihat 1 kelompok yang mulai mengerjakan lembar tantangan Level 3.',
        aktivitasTerdeteksi: 'Instruksi Tugas Berjenjang'
      },
      sumberBukti: 'LKPD Hal 6 & Video 28:10-30:00',
      rekomendasi: {
        masalah: 'Waktu pengerjaan tugas Level 3 perlu dialokasikan sebagai tugas lanjutan mandiri.',
        mengapaPenting: 'Agar siswa yang siap pengayaan tidak terhenti di tengah jalan.',
        tindakanDisarankan: 'Tugaskan Level 3 sebagai tantangan opsional bonus nilai di LMS madrasah.',
        contohImplementasi: 'Buka forum diskusi daring untuk bedah tantangan Level 3.',
        prioritas: 'Sedang'
      },
      catatanSupervisor: 'Koreksi: Instrumen modul sudah lengkap dengan tiered tasks; penyesuaian waktu pelaksanaan di kelas sangat wajar.'
    },
    {
      id: '3.5',
      componentId: 3,
      namaIndikator: 'Memberikan opsi cara penyampaian dan hasil karya yang beragam',
      deskripsi: 'Pilihan media ekspresi dan presentasi',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa mempresentasikan temuan dalam bentuk poster flipchart dan demonstrasi langsung di proyektor.',
      kekurangan: 'Opsi podcast belum sempat didemonstrasikan di kelas karena durasi.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 14',
        bagianHeading: 'Modalitas Ekspresi Hasil Belajar',
        kutipanTeks: 'Peserta didik memamerkan karya melalui pameran mini meja kelas atau pameran galeri digital di Padlet.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '30:10 - 33:00',
        transkrip: 'Siswa: "Kami membuat infografis ringkas agar mudah ditempel di majalah dinding madrasah."',
        deskripsiVisual: 'Dua kelompok menampilkan poster kertas, satu kelompok menampilkan slide tablet.',
        aktivitasTerdeteksi: 'Ragam Penyajian Karya Siswa'
      },
      sumberBukti: 'Modul Hal 14 & Video 30:10-33:00',
      rekomendasi: {
        masalah: 'Fasilitasi penayangan hasil karya digital perlu disiapkan konektor proyektor nirkabel.',
        mengapaPenting: 'Memudahkan presentasi tanpa kendala kabel fisik.',
        tindakanDisarankan: 'Gunakan aplikasi Google Cast atau AnyCast di proyektor kelas.',
        contohImplementasi: 'Siswa langsung mirroring layar tablet ke layar utama.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '3.6',
      componentId: 3,
      namaIndikator: 'Pengelompokan fleksibel: individu, berpasangan, kelompok',
      deskripsi: 'Variasi formasi kerja individu dan tim',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Terlihat fase individu (menulis hipotesis awal), fase berpasangan (fokus mikroskop), dan fase kelompok besar (diskusi solusi).',
      kekurangan: 'Fase berpasangan sangat singkat (~2 menit).',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 15',
        bagianHeading: 'Struktur Kerja Peserta Didik',
        kutipanTeks: 'Think (Mandiri merumuskan dugaan 3 mnt) - Pair (Berpasangan menguji preparat 5 mnt) - Share (Kelompok 5 orang 15 mnt).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '13:30 - 15:20',
        transkrip: 'Guru: "Tuliskan dugaan kalian sendiri di kolom kuning, lalu diskusikan berdua dengan teman sebangku sebelum ke kelompok besar."',
        deskripsiVisual: 'Siswa menulis di buku masing-masing lalu berbisik mendiskusikan dengan teman di sampingnya.',
        aktivitasTerdeteksi: 'Metode Think-Pair-Share'
      },
      sumberBukti: 'Modul Hal 15 & Video 13:30-15:20',
      rekomendasi: {
        masalah: 'Berikan alokasi waktu berpikir hening (think time) yang cukup tenang sebelum berpasangan.',
        mengapaPenting: 'Membiasakan perenungan konseptual personal.',
        tindakanDisarankan: 'Terapkan "1 Minute of Silence" sebelum diskusi dimulai.',
        contohImplementasi: 'Bunyikan lonceng kecil sebagai penanda mulainya sesi bicara pasangan.',
        prioritas: 'Rendah'
      }
    },

    // KOMPONEN 4: PEMBELAJARAN BERPUSAT PADA SISWA
    {
      id: '4.1',
      componentId: 4,
      namaIndikator: 'Siswa menjadi subjek aktif dan guru sebagai fasilitator',
      deskripsi: 'Guru fasilitator, siswa subjek aktif eksplorasi',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Guru tidak mendikte, melainkan berkeliling membimbing pertanyaan dengan teknik scaffolding (talk time guru < 25%).',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 16',
        bagianHeading: 'Peran Guru & Interaksi Pembelajaran',
        kutipanTeks: 'Guru berperan sebagai fasilitator, katalisator ide, dan pendamping inkuiri sains.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '18:20 - 24:30',
        transkrip: 'Guru: "Menurut kalian, apa yang menyebabkan cairan biuret ini berubah ungu saat diteteskan ke lumut? Coba periksa kandungan makronutriennya."',
        deskripsiVisual: 'Guru berjongkok di samping meja kelompok 3 mendengarkan penjelasan siswa, tidak langsung memberi jawaban.',
        aktivitasTerdeteksi: 'Fasilitasi Konstruktivistik Guru'
      },
      sumberBukti: 'Modul Hal 16 & Video 18:20-24:30',
      rekomendasi: {
        masalah: 'Pertahankan sikap fasilitatif yang hangat dan membimbing.',
        mengapaPenting: 'Membangun kemandirian berpikir kritis siswa.',
        tindakanDisarankan: 'Bisa didokumentasikan sebagai praktik baik (best practice) bagi guru madrasah lainnya.',
        contohImplementasi: 'Jadikan video ini bahan diseminasi dalam kegiatan MGMP Biologi.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '4.2',
      componentId: 4,
      namaIndikator: 'Memberi kesempatan siswa bertanya, menyampaikan ide, dan pendapat',
      deskripsi: 'Ruang bertanya dan berpendapat yang leluasa',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Banyak pertanyaan spontan dari siswa yang disambut hangat oleh guru tanpa mencela.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 17',
        bagianHeading: 'Budaya Kelas Terbuka & Pertanyaan',
        kutipanTeks: 'Membangun budaya bertanya (Culture of Questioning) dengan teknik No Hands Up dan Wait Time 5 detik.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '09:30 - 11:20',
        transkrip: 'Siswa Nabila: "Bu, apakah ikan lele di kolam madrasah bisa terkena penyakit kalau pH airnya terlalu basa?" Guru: "Pertanyaan luar biasa, Nabila! Siapa yang bisa menduga dampaknya pada insang ikan?"',
        deskripsiVisual: 'Guru tersenyum, mengacungkan jempol, dan melempar pertanyaan ke audiens kelas.',
        aktivitasTerdeteksi: 'Apresiasi Pertanyaan Siswa'
      },
      sumberBukti: 'Modul Hal 17 & Video 09:30-11:20',
      rekomendasi: {
        masalah: 'Sangat baik.',
        mengapaPenting: 'Menumbuhkan rasa ingin tahu ilmiah (scientific curiosity).',
        tindakanDisarankan: 'Sediakan papan "Kotak Rasa Ingin Tahu" bagi pertanyaan lanjutan yang belum terjawab.',
        contohImplementasi: 'Taruh kotak fisik atau tautan Padlet tanya jawab asinkron.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '4.3',
      componentId: 4,
      namaIndikator: 'Siswa terlibat dalam perencanaan atau pemilihan jalur belajar',
      deskripsi: 'Student voice & agency dalam alur belajar',
      skorAi: 2,
      skorSupervisor: 2,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa hanya memilih format produk akhir, namun belum dilibatkan dalam menentukan target waktu atau urutan aktivitas investigasi.',
      kekurangan: 'Alur praktikum masih sepenuhnya diatur oleh instruksi guru.',
      statusKeterpenuhan: 'Sebagian Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 18',
        bagianHeading: 'Kesepakatan Alur Belajar',
        kutipanTeks: 'Alur investigasi ditentukan sesuai panduan baku prosedur operasional laboratorium.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '14:00 - 14:40',
        transkrip: 'Guru: "Semua kelompok harus mulai dari pos 1 dulu, tidak boleh melompat ke pos 3."',
        deskripsiVisual: 'Guru menentukan urutan rotasi pos secara seragam tanpa negosiasi dengan siswa.',
        aktivitasTerdeteksi: 'Instruksi Alur Satu Arah'
      },
      sumberBukti: 'Modul Hal 18 & Video 14:00-14:40',
      rekomendasi: {
        masalah: 'Siswa belum memiliki otonomi untuk merencanakan urutan investigasi lab mandiri.',
        mengapaPenting: 'Student agency melatih kematangan metakognisi dan manajemen waktu mandiri.',
        tindakanDisarankan: 'Izinkan kelompok menyepakati urutan pos investigasi mana yang ingin mereka mulai terlebih dahulu.',
        contohImplementasi: 'Berikan papan kartu pos: "Kelompok A memilih mulai dari Uji pH, Kelompok B mulai dari Pengamatan Mikroskop".',
        prioritas: 'Tinggi'
      },
      catatanSupervisor: 'Perlu penguatan otonomi siswa dalam menentukan strategi inkuiri.'
    },
    {
      id: '4.4',
      componentId: 4,
      namaIndikator: 'Kegiatan mendorong kemandirian dan tanggung jawab belajar',
      deskripsi: 'Kemandirian dan pembagian peran akuntabel',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa secara tertib membersihkan alat kaca mikroskop, membuang sisa preparat ke tempat khusus limbah organik, dan merapikan meja tanpa disuruh.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 8',
        bagianHeading: 'Lembar Tanggung Jawab Laboratorium (Safety & Hygiene)',
        kutipanTeks: 'Ceklis mandiri: Kebersihan lensa mikroskop, pengembalian reagen ke rak, pembuangan limbah air kolam sesuai SOP.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '34:10 - 36:00',
        transkrip: 'Ketua Tim: "Ayo teman-teman bersihkan cover glass dengan alkohol 70%, jangan tinggalkan meja kotor!"',
        deskripsiVisual: 'Siswa mengelap meja dan mencuci cawan petri secara mandiri dan disiplin.',
        aktivitasTerdeteksi: 'Kemandirian & Tanggung Jawab Kerja Ilmiah'
      },
      sumberBukti: 'LKPD Hal 8 & Video 34:10-36:00',
      rekomendasi: {
        masalah: 'Sudah sangat membanggakan.',
        mengapaPenting: 'Membentuk karakter disiplin dan etika kerja laboratorium.',
        tindakanDisarankan: 'Pertahankan budaya kerja SOP kebersihan laboratorium ini.',
        contohImplementasi: 'Beri apresiasi bintang "Meja Terbersih & Paling Tertib" di tiap akhir sesi.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '4.5',
      componentId: 4,
      namaIndikator: 'Memberi ruang eksplorasi dan penemuan mandiri oleh siswa',
      deskripsi: 'Eksplorasi inkuiri tanpa petunjuk kaku',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Siswa diberi kebebasan menguji sampel air dari sudut kolam mana pun yang mereka curigai ada pembusukan organik.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 19',
        bagianHeading: 'Inkuiri Terbuka (Open Inquiry)',
        kutipanTeks: 'Siswa menentukan titik koordinat sampling air kolam (inlet, tengah, outlet) secara mandiri untuk menguji hipotesis kelompok.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '16:40 - 21:00',
        transkrip: 'Siswa: "Kita ambil sampel dekat pancuran air wudhu yuk, pasti ada residu sabun yang beda dengan sudut teratai."',
        deskripsiVisual: 'Dua siswa membawa botol sampel berlabel khusus menuju sudut kolam yang dipilih kelompoknya.',
        aktivitasTerdeteksi: 'Eksplorasi Inkuiri Otentik'
      },
      sumberBukti: 'Modul Hal 19 & Video 16:40-21:00',
      rekomendasi: {
        masalah: 'Sudah sangat optimal.',
        mengapaPenting: 'Melahirkan jiwa peneliti muda yang berani bereksplorasi.',
        tindakanDisarankan: 'Arahkan siswa mendokumentasikan temuan unik untuk diikutsertakan dalam lomba karya tulis ilmiah madrasah (MYRES).',
        contohImplementasi: 'Dampingi kelompok dengan temuan mikroorganisme langka untuk menulis artikel ilmiah pendek.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '4.6',
      componentId: 4,
      namaIndikator: 'Suasana aman dan menghargai setiap kontribusi siswa',
      deskripsi: 'Iklim psikologis kelas yang aman, nir-perundungan',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Iklim kelas sangat inklusif, ada tepuk tangan spontan saat siswa yang pendiam berani mempresentasikan temuannya.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 20',
        bagianHeading: 'Kesepakatan Belajar Ramah Anak',
        kutipanTeks: 'Norma kelas: Saling mendengarkan tanpa memotong, tidak ada kritik yang menjatuhkan, merayakan keberanian mencoba.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '27:10 - 28:00',
        transkrip: 'Guru: "Beri tepuk tangan meriah untuk Salma yang baru pertama kali menjadi juru bicara presentasi!"',
        deskripsiVisual: 'Seluruh siswa bertepuk tangan riuh, Salma tersenyum lega dan percaya diri.',
        aktivitasTerdeteksi: 'Penciptaan Lingkungan Aman Emosional'
      },
      sumberBukti: 'Modul Hal 20 & Video 27:10-28:00',
      rekomendasi: {
        masalah: 'Pertahankan iklim kelas yang hangat dan apresiatif ini.',
        mengapaPenting: 'Fondasi utama keterbukaan pikiran dan kesehatan mental peserta didik.',
        tindakanDisarankan: 'Lanjutkan penguatan apresiasi personal.',
        contohImplementasi: 'Berikan stiker apresiasi karakter di buku catatan siswa.',
        prioritas: 'Rendah'
      }
    },

    // KOMPONEN 5: PEMBELAJARAN REFLEKTIF
    {
      id: '5.1',
      componentId: 5,
      namaIndikator: 'Ada sesi refleksi di akhir pembelajaran untuk siswa',
      deskripsi: 'Ketersediaan sesi refleksi penutup',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Sesi refleksi terlaksana selama 4 menit di akhir jam pelajaran menggunakan slide interaktif.',
      kekurangan: 'Alokasi waktu refleksi agak terburu-buru karena sesi presentasi memakan waktu lebih lama dari rencana.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 21',
        bagianHeading: 'Kegiatan Penutup & Refleksi',
        kutipanTeks: 'Alokasi waktu refleksi 10 menit dengan instrumen 4F (Facts, Feelings, Findings, Future).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '36:10 - 39:20',
        transkrip: 'Guru: "Karena bel tinggal 3 menit lagi, mari kita buka link Mentimeter untuk refleksi kilat."',
        deskripsiVisual: 'Siswa mengetik cepat respon refleksi di smartphone masing-masing.',
        aktivitasTerdeteksi: 'Refleksi Daring Cepat di Akhir Sesi'
      },
      sumberBukti: 'Modul Hal 21 & Video 36:10-39:20',
      rekomendasi: {
        masalah: 'Waktu refleksi terpotong dari rencana modul (dari 10 menit menjadi 3-4 menit).',
        mengapaPenting: 'Refleksi yang terburu-buru mengurangi kedalaman metakognisi siswa.',
        tindakanDisarankan: 'Disiplinkan waktu presentasi kelompok (maksimal 3 menit per tim) agar refleksi mendapat jatah 7-10 menit utuh.',
        contohImplementasi: 'Pasang penanda waktu 3 menit untuk tiap penyaji.',
        prioritas: 'Tinggi'
      },
      catatanSupervisor: 'Kerap kali presentasi menyita waktu refleksi; perlu ketegasan timekeeper.'
    },
    {
      id: '5.2',
      componentId: 5,
      namaIndikator: 'Refleksi mencakup: apa yang dipelajari, bagaimana cara belajar, kendala, solusi',
      deskripsi: 'Cakupan refleksi 4 dimensi metakognitif',
      skorAi: 2,
      skorSupervisor: 2,
      diverifikasiSupervisor: true,
      alasanSkor: 'Refleksi di Mentimeter baru menanyakan: "Apa konsep baru yang dipahami?" dan "Perasaan hari ini", belum mencakup kendala dan rencana solusi cara belajar mandiri.',
      kekurangan: 'Dimensi kendala belajar dan strategi pemecahan masalah belum terangkum secara eksplisit.',
      statusKeterpenuhan: 'Sebagian Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 9',
        bagianHeading: 'Instrumen Refleksi Metakognitif Siswa',
        kutipanTeks: 'Pertanyaan: 1) Konsep yang saya kuasai; 2) Hambatan terbesar kelompok; 3) Cara saya mengatasi kendala mikroskop; 4) Rencana perbaikan pekan depan.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '37:00 - 38:30',
        transkrip: 'Guru: "Tuliskan satu kata yang mewakili apa yang kalian pahami tentang rantai makanan!"',
        deskripsiVisual: 'Word cloud di layar menampilkan kata: \'alga\', \'zooplankton\', \'seimbang\', \'seru\'.',
        aktivitasTerdeteksi: 'Refleksi Word-Cloud Kilat'
      },
      sumberBukti: 'LKPD Hal 9 & Video 37:00-38:30',
      rekomendasi: {
        masalah: 'Pertanyaan refleksi masih bersifat permukaan (word cloud) dan belum menyentuh evaluasi cara belajar atau kendala.',
        mengapaPenting: 'Siswa perlu menyadari hambatan belajarnya sendiri agar mampu mencari solusi mandiri.',
        tindakanDisarankan: 'Gunakan tiket keluar (Exit Ticket) berupa 2 pertanyaan wajib: "Apa yang membuat saya bingung hari ini?" dan "Bagaimana saya akan mempelajarinya lagi?".',
        contohImplementasi: 'Siswa mengumpulkan kartu kertas kuning berisi 2 jawaban tersebut di pintu kelas sebelum istirahat.',
        prioritas: 'Tinggi'
      }
    },
    {
      id: '5.3',
      componentId: 5,
      namaIndikator: 'Guru melakukan refleksi diri terhadap proses pembelajaran',
      deskripsi: 'Refleksi diri guru atas efektivitas pembelajaran',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Di modul ajar terdapat kolom catatan refleksi guru pertemuan sebelumnya mengenai kendala keterbatasan mikroskop cahaya.',
      kekurangan: 'Di video pembelajaran tidak terlihat momen verbalisasi refleksi diri guru di hadapan observer.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Sedang',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 22',
        bagianHeading: 'Catatan Refleksi Diri Guru (Self-Reflection)',
        kutipanTeks: 'Refleksi Pertemuan 1: "Siswa kesulitan membedakan klorofil alga dengan kotoran kaca obyek; untuk pertemuan 2 saya harus menambahkan video demonstrasi kalibrasi fokus mikroskop."'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '39:30 - 40:00',
        transkrip: 'Guru: "Ibu melihat hari ini pengaturan waktu kelompok masih perlu kita rapikan lagi bersama."',
        deskripsiVisual: 'Guru menuliskan poin evaluasi waktu di jurnal harian mengajar miliknya di meja guru.',
        aktivitasTerdeteksi: 'Pencatatan Refleksi Mandiri Guru'
      },
      sumberBukti: 'Modul Hal 22 & Video 39:30-40:00',
      rekomendasi: {
        masalah: 'Refleksi guru perlu dikomunikasikan lebih terbuka dalam sesi pasca-observasi supervisi klinis.',
        mengapaPenting: 'Menumbuhkan kesadaran pengembangan profesional berkelanjutan (CPD).',
        tindakanDisarankan: 'Lakukan dialog reflektif pasca-observasi berlandaskan data rekaman video.',
        contohImplementasi: 'Gunakan lembar telaah refleksi diri guru berbasis 6 indikator.',
        prioritas: 'Sedang'
      }
    },
    {
      id: '5.4',
      componentId: 5,
      namaIndikator: 'Hasil refleksi digunakan sebagai bahan perbaikan pembelajaran berikutnya',
      deskripsi: 'Tindak lanjut konkret dari data refleksi',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Terbukti di modul pertemuan ini merupakan hasil revisi dari refleksi pekan lalu (penambahan mikroskop digital untuk mengatasi kendala fokus).',
      kekurangan: 'Tindak lanjut untuk pertemuan ketiga baru dirancang di benak guru, belum tertuang di dokumen resmi.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 22',
        bagianHeading: 'Tindak Lanjut Perbaikan Berdasarkan Siklus Sebelumnya',
        kutipanTeks: 'Revisi RPP: Mengakomodasi tablet eyepiece camera setelah siswa mengeluhkan kelelahan mata pada pertemuan lalu.'
      },
      sumberBukti: 'Modul Hal 22',
      rekomendasi: {
        masalah: 'Formalisasi catatan perbaikan untuk pertemuan 3 harus segera ditulis dalam jurnal mengajar.',
        mengapaPenting: 'Agar ide perbaikan tidak menguap dan terdokumentasi rapi.',
        tindakanDisarankan: 'Tuliskan 2 poin modifikasi pembelajaran untuk pertemuan berikutnya dalam waktu 1x24 jam setelah sesi selesai.',
        contohImplementasi: 'Ketik di Google Docs Modul Ajar bagian revisi siklus 3.',
        prioritas: 'Sedang'
      }
    },
    {
      id: '5.5',
      componentId: 5,
      namaIndikator: 'Siswa diajak mengevaluasi pencapaian tujuan pembelajaran',
      deskripsi: 'Pengecekan ketercapaian target TP oleh siswa',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Guru menampilkan kembali slide tujuan awal dan meminta siswa mengacungkan jempol (thumbs up/down) untuk tiap indikator kompetensi.',
      kekurangan: 'Pengecekan bersifat cepat dan serempak, tidak dilakukan pengecekan perorangan yang belum acung jempol.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 23',
        bagianHeading: 'Evaluasi Ketercapaian TP Bersama Siswa',
        kutipanTeks: 'Mengecek kriteria ketercapaian tujuan pembelajaran (KKTP) bersama peserta didik melalui self-assessment checklist.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '38:00 - 39:00',
        transkrip: 'Guru: "Siapa yang merasa sudah bisa membedakan peran alga dan zooplankton? Acungkan jempol tinggi-tinggi!"',
        deskripsiVisual: 'Hampir seluruh siswa mengacungkan jempol ke atas, 3 siswa tampak ragu-ragu di baris belakang.',
        aktivitasTerdeteksi: 'Pengecekan Ketercapaian Target Belajar (Traffic Light Check)'
      },
      sumberBukti: 'Modul Hal 23 & Video 38:00-39:00',
      rekomendasi: {
        masalah: 'Tiga siswa yang ragu-ragu belum sempat disapa atau diberi pendampingan klarifikasi.',
        mengapaPenting: 'Mencegah akumulasi miskonsepsi pada siswa yang belum tuntas.',
        tindakanDisarankan: 'Dekati siswa yang ragu-ragu saat jam istirahat atau jadwalkan sesi peer-tutoring.',
        contohImplementasi: 'Pasangkan siswa yang ragu dengan rekan sekelompok yang sudah sangat menguasai konsep.',
        prioritas: 'Tinggi'
      }
    },
    {
      id: '5.6',
      componentId: 5,
      namaIndikator: 'Terdapat catatan tindak lanjut dari hasil refleksi',
      deskripsi: 'Rencana tindak lanjut remedial dan pengayaan',
      skorAi: 2,
      skorSupervisor: 2,
      diverifikasiSupervisor: true,
      alasanSkor: 'Di dokumen ada format kosong program remedial dan pengayaan, tetapi belum terisi dengan data siswa riil.',
      kekurangan: 'Belum ada bukti catatan tindak lanjut konkret pasca-analisis asesmen.',
      statusKeterpenuhan: 'Sebagian Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 10',
        bagianHeading: 'Format Rencana Tindak Lanjut (Remedial & Pengayaan)',
        kutipanTeks: '[Tabel kosong]: No, Nama Siswa, Indikator Belum Tuntas, Bentuk Remedial, Nilai Awal, Nilai Akhir.'
      },
      sumberBukti: 'LKPD Hal 10 (Format masih kosong)',
      rekomendasi: {
        masalah: 'Format remedial/pengayaan belum terisi nama dan rencana tindakan nyata.',
        mengapaPenting: 'Tanpa data riil, tindak lanjut hanya menjadi formalitas administratif.',
        tindakanDisarankan: 'Input nama 3 siswa yang ragu-ragu tadi ke format remedial dan berikan materi ringkas pendukung.',
        contohImplementasi: 'Isi tabel tindak lanjut maksimal 2 hari setelah observasi supervisi ini dilakukan.',
        prioritas: 'Tinggi'
      }
    },

    // KOMPONEN 6: ASESMEN AUTENTIK
    {
      id: '6.1',
      componentId: 6,
      namaIndikator: 'Asesmen dilakukan sebelum, selama, dan sesudah pembelajaran',
      deskripsi: 'Kelengkapan asesmen diagnostik, formatif, sumatif',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Sangat lengkap: Asesmen awal (kuis diagnostik 5 butir soal di awal), formatif (observasi lembar kinerja praktikum), dan sumatif (LKPD terstruktur & rubrik poster).',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 1 & 11',
        bagianHeading: 'Skema Asesmen Tripartit',
        kutipanTeks: '1. Diagnostik Kognitif Awal; 2. Formatif Proses (Checklist Unjuk Kerja Lab); 3. Sumatif Formatif Akhir (Produk Solusi Mini Biofilter).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '03:40 - 05:00 & 20:00',
        transkrip: 'Guru: "Buka gawai kalian, jawab 3 soal diagnostik kilat di Quizizz sebelum kita mulai praktikum."',
        deskripsiVisual: 'Guru memantau grafik leaderboard Quizizz diagnostik di laptopnya.',
        aktivitasTerdeteksi: 'Asesmen Diagnostik Awal Berbantuan Digital'
      },
      sumberBukti: 'LKPD Hal 1, 11 & Video 03:40-05:00',
      rekomendasi: {
        masalah: 'Sudah sangat komprehensif.',
        mengapaPenting: 'Menjaga kontinuitas pemantauan profil perkembangan belajar siswa.',
        tindakanDisarankan: 'Pertahankan siklus asesmen terintegrasi ini.',
        contohImplementasi: 'Kembangkan bank soal diagnostik digital untuk materi semester berikutnya.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '6.2',
      componentId: 6,
      namaIndikator: 'Alat asesmen jelas, terukur, dan sesuai tujuan pembelajaran',
      deskripsi: 'Kejelasan rubrik, KKTP, kesesuaian dengan TP',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Rubrik analitik memuat 4 skala deskriptif yang sangat terperinci (persiapan preparat, ketepatan identifikasi alga, argumentasi ilmiah, estetika poster).',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 12',
        bagianHeading: 'Rubrik Penilaian Unjuk Kerja Ilmiah (Analytical Rubric)',
        kutipanTeks: 'Skala 1-4 dengan deskriptor operasional: dari kemampuan mengatur cermin mikroskop hingga analisis rantai makanan mikroalga.'
      },
      sumberBukti: 'LKPD Hal 12',
      rekomendasi: {
        masalah: 'Rubrik sangat terstandar.',
        mengapaPenting: 'Menjamin keadilan (fairness) dan reliabilitas asesmen.',
        tindakanDisarankan: 'Bagikan rubrik ini kepada siswa sebelum penugasan agar menjadi panduan mutu diri.',
        contohImplementasi: 'Sematkan rubrik analitik pada halaman depan LKPD.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '6.3',
      componentId: 6,
      namaIndikator: 'Menilai proses dan produk, bukan hanya hasil akhir/tes tertulis',
      deskripsi: 'Penilaian proses kerja ilmiah di samping produk',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Guru membawa clipboard berisi ceklis observasi sikap ilmiah dan ketelitian praktikum sepanjang sesi kelas berlangsung.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 13',
        bagianHeading: 'Lembar Observasi Proses Kerja Ilmiah',
        kutipanTeks: 'Aspek dinilai: Kehati-hatian memakai reagen, ketelitian membaca mikrometer, keaktifan berpendapat dalam tim.'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '19:15 - 23:45',
        transkrip: '[Guru mengamati kelompok 4 dan mencentang lembar observasi di clipboard]',
        deskripsiVisual: 'Guru mengamati teknik siswa memegang pipet tetes dan langsung membubuhkan paraf penilaian proses.',
        aktivitasTerdeteksi: 'Asesmen Otentik Berbasis Observasi Kinerja'
      },
      sumberBukti: 'LKPD Hal 13 & Video 19:15-23:45',
      rekomendasi: {
        masalah: 'Sangat baik.',
        mengapaPenting: 'Mengoreksi paradigma bahwa biologi hanya sebatas hafalan ujian tertulis.',
        tindakanDisarankan: 'Pertahankan observasi proses ini sebagai komponen nilai portofolio berkala.',
        contohImplementasi: 'Kompilasikan rekap skor proses ke dalam e-Rapor madrasah.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '6.4',
      componentId: 6,
      namaIndikator: 'Menggunakan berbagai bentuk asesmen: kinerja, proyek, portofolio, observasi',
      deskripsi: 'Variasi instrumen asesmen autentik',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Kombinasi lengkap: Kinerja praktikum, Proyek miniatur biofilter, Observasi sikap peduli lingkungan, dan Portofolio infografis Canva.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 24',
        bagianHeading: 'Matriks Ragam Asesmen Terpadu',
        kutipanTeks: 'Mengharmonisasikan 4 bentuk asesmen: Kinerja Laboratorium, Proyek Mini PjBL, Observasi Afektif, dan Lembar Portofolio Produk.'
      },
      sumberBukti: 'Modul Hal 24',
      rekomendasi: {
        masalah: 'Ragam asesmen sangat kaya dan variatif.',
        mengapaPenting: 'Memberi kesempatan setiap siswa bersinar sesuai keunggulan talentanya.',
        tindakanDisarankan: 'Pertahankan dan tularkan model matriks asesmen ini kepada rekan guru se-rumpun IPA.',
        contohImplementasi: 'Bagikan format matriks asesmen di forum MGMP.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '6.5',
      componentId: 6,
      namaIndikator: 'Soal/tugas menuntut penerapan pengetahuan dalam konteks nyata',
      deskripsi: 'Tugas penerapan kontekstual vs soal teoritis abstrak',
      skorAi: 4,
      skorSupervisor: 4,
      diverifikasiSupervisor: true,
      alasanSkor: 'Tugas yang diberikan bukan menghitung rumus teoritis melainkan memecahkan masalah air kolam madrasah yang berbau lumut dengan rekayasa biofilter nyata.',
      kekurangan: 'Tidak ada.',
      statusKeterpenuhan: 'Sangat Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'LKPD_Berdiferensiasi_dan_Rubrik_Asesmen_Otentik.docx',
        halaman: 'Hal 7',
        bagianHeading: 'Studi Kasus Kontekstual Madrasah',
        kutipanTeks: 'Studi Kasus: Bagaimana merancang filtrasi air kolam yang hemat listrik dan aman bagi ikan mas asrama tanpa menggunakan zat kimia berbahaya?'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '24:00 - 26:30',
        transkrip: 'Siswa: "Kami memilih susunan zeolit dan ijuk kelapa karena bahan ini melimpah di belakang kantin madrasah."',
        deskripsiVisual: 'Siswa mempresentasikan bahan filter riil yang mereka bawa dari lingkungan sekitar.',
        aktivitasTerdeteksi: 'Presentasi Solusi Masalah Kontekstual Nyata'
      },
      sumberBukti: 'LKPD Hal 7 & Video 24:00-26:30',
      rekomendasi: {
        masalah: 'Sangat relevan dan solutif.',
        mengapaPenting: 'Membuat pembelajaran bermakna dan berdaya guna langsung bagi lingkungan madrasah.',
        tindakanDisarankan: 'Bawa prototipe terbaik untuk dipasang nyata di kolam madrasah bekerja sama dengan pengurus asrama.',
        contohImplementasi: 'Instalasi filter karya siswa saat kegiatan kerja bakti madrasah akhir pekan.',
        prioritas: 'Rendah'
      }
    },
    {
      id: '6.6',
      componentId: 6,
      namaIndikator: 'Umpan balik diberikan secara berkelanjutan dan membangun',
      deskripsi: 'Feedback guru konstruktif dan tepat waktu',
      skorAi: 3,
      skorSupervisor: 3,
      diverifikasiSupervisor: true,
      alasanSkor: 'Guru memberikan umpan balik lisan yang sangat konstruktif saat mengunjungi meja lab kelompok.',
      kekurangan: 'Belum ada umpan balik tertulis di lembar draf kerja siswa karena waktu terbatas.',
      statusKeterpenuhan: 'Terpenuhi',
      confidence: 'Tinggi',
      perluVerifikasi: false,
      documentEvidence: {
        namaFile: 'Modul_Ajar_Biologi_Fase_E_Ekosistem_NurulHidayati.pdf',
        halaman: 'Hal 25',
        bagianHeading: 'Strategi Umpan Balik Berkelanjutan (Continuous Feedback)',
        kutipanTeks: 'Guru memberikan feedback formatif dengan model "Praise, Question, Suggestion" (PQS).'
      },
      videoEvidence: {
        namaVideo: 'Rekaman_Observasi_Kelas_Biologi_Fase_E_40Menit.mp4',
        timestamp: '21:30 - 23:10',
        transkrip: 'Guru: "Pilihan batu zeolit kalian sudah tepat untuk menjerap amonia. Namun, perhatikan tebal lapisannya agar air tidak meluap keluar tabung."',
        deskripsiVisual: 'Guru mengoreksi posisi corong tabung reaksi siswa dengan sentuhan ramah.',
        aktivitasTerdeteksi: 'Pemberian Umpan Balik Kualitatif Konstruktif'
      },
      sumberBukti: 'Modul Hal 25 & Video 21:30-23:10',
      rekomendasi: {
        masalah: 'Umpan balik tertulis pada lembar kerja siswa belum sempat dibubuhkan secara detail.',
        mengapaPenting: 'Umpan balik tertulis dapat dibaca kembali berulang kali oleh siswa saat belajar mandiri di asrama.',
        tindakanDisarankan: 'Tuliskan 1 catatan saran spesifik di margin atas LKPD siswa sebelum dikembalikan pekan depan.',
        contohImplementasi: 'Gunakan tinta warna hijau atau ungu dengan kalimat afirmatif positif.',
        prioritas: 'Sedang'
      }
    }
  ],
  timeline: [
    {
      id: 't-1',
      timeRange: '00:00 - 03:20',
      startSeconds: 0,
      endSeconds: 200,
      faseKegiatan: 'Pembukaan',
      deskripsiAktivitas: 'Salam Islami, pembacaan doa bersama, cek kehadiran, dan pengecekan kerapian seragam laboratorium.',
      transkripExcerpt: 'Guru: "Assalamu\'alaikum wr. wb. Sebelum memulai kajian ekosistem ciptaan Allah, mari kita baca basmalah bersama."',
      indikatorTerkait: ['1.1', '1.6', '4.6'],
      skorSegmen: 4,
      alasanAnalisis: 'Suasana pembukaan sangat tenang, bernuansa akhlak islami, dan tata tertib lab ditegakkan sejak menit awal.'
    },
    {
      id: 't-2',
      timeRange: '03:21 - 08:40',
      startSeconds: 201,
      endSeconds: 520,
      faseKegiatan: 'Apersepsi',
      deskripsiAktivitas: 'Apersepsi berbasis video viral kondisi air kolam asrama yang berbusa dan kuis diagnostik kilat 3 soal.',
      transkripExcerpt: 'Guru: "Siapa yang kemarin melihat kolam asrama berbusa? Apa kaitan busa tersebut dengan deterjen santri?"',
      indikatorTerkait: ['1.2', '1.4', '6.1'],
      skorSegmen: 4,
      alasanAnalisis: 'Kontekstualisasi sangat hidup dan langsung memancing rasa ingin tahu peserta didik.'
    },
    {
      id: 't-3',
      timeRange: '08:41 - 14:20',
      startSeconds: 521,
      endSeconds: 860,
      faseKegiatan: 'Penyampaian Tujuan',
      deskripsiAktivitas: 'Penyampaian tujuan pembelajaran, pengaitan dengan dalil QS. Ar-Rum: 41, serta penjelasan prosedur eksperimen sains.',
      transkripExcerpt: 'Guru: "Kita hari ini akan menguji 3 parameter: keasaman pH, populasi plankton, dan kelayakan biofilter."',
      indikatorTerkait: ['1.1', '1.3', '1.6', '2.4'],
      skorSegmen: 4,
      alasanAnalisis: 'Tujuan jelas, dalil penguat karakter terintegrasi alami, dan pertanyaan HOTS mulai dimunculkan.'
    },
    {
      id: 't-4',
      timeRange: '14:21 - 25:10',
      startSeconds: 861,
      endSeconds: 1510,
      faseKegiatan: 'Diskusi Kelompok',
      deskripsiAktivitas: 'Praktikum inkuiri aktif di meja laboratorium: pembuatan preparat air kolam, pengamatan mikroskop digital Wi-Fi, dan diferensiasi tugas.',
      transkripExcerpt: 'Siswa: "Bu guru, di preparat saya ada koloni Volvox bergerak memutar! Coba lihat di monitor tablet."',
      indikatorTerkait: ['2.1', '2.2', '3.1', '3.3', '4.1', '4.4', '4.5', '6.3'],
      skorSegmen: 4,
      alasanAnalisis: 'Puncak aktivitas pembelajaran aktif dan inovatif, interaksi siswa-siswa sangat kaya, guru memfasilitasi keliling meja.'
    },
    {
      id: 't-5',
      timeRange: '25:11 - 32:40',
      startSeconds: 1511,
      endSeconds: 1960,
      faseKegiatan: 'Presentasi Siswa',
      deskripsiAktivitas: 'Presentasi karya kelompok (desain filter air dan analisis rantai makanan mikroalga) disertai sesi tanya jawab antar kelompok.',
      transkripExcerpt: 'Juru Bicara Tim 2: "Filtrasi kami menargetkan reduksi partikel koloid lumpur sebelum air dialirkan kembali ke kolam ikan."',
      indikatorTerkait: ['2.3', '2.6', '3.2', '3.5', '4.2', '6.5'],
      skorSegmen: 4,
      alasanAnalisis: 'Kemampuan komunikasi siswa terasah baik, presentasi berbasis data empiris sampel laboratorium.'
    },
    {
      id: 't-6',
      timeRange: '32:41 - 36:20',
      startSeconds: 1961,
      endSeconds: 2180,
      faseKegiatan: 'Asesmen',
      deskripsiAktivitas: 'Pengumpulan lembar LKPD, penilaian unjuk kerja oleh guru, dan kuis pemahaman konsep akhir di layar proyektor.',
      transkripExcerpt: 'Guru: "Semua kelompok silakan mengumpulkan lembar observasi dan menyusun kembali alat mikroskop ke posisi awal."',
      indikatorTerkait: ['4.4', '6.1', '6.2', '6.3', '6.6'],
      skorSegmen: 3,
      alasanAnalisis: 'Asesmen berjalan tertib dan terstruktur, umpan balik verbal langsung diberikan kepada kelompok penyaji.'
    },
    {
      id: 't-7',
      timeRange: '36:21 - 40:00',
      startSeconds: 2181,
      endSeconds: 2400,
      faseKegiatan: 'Refleksi',
      deskripsiAktivitas: 'Refleksi kilat Mentimeter, pengecekan ketercapaian target belajar, pemberian tugas tindak lanjut proyek, doa penutup.',
      transkripExcerpt: 'Guru: "Alhamdulillah pembelajaran selesai. Apa hikmah terbesar yang kalian peroleh tentang keteraturan ciptaan Allah hari ini?"',
      indikatorTerkait: ['5.1', '5.2', '5.5', '1.6'],
      skorSegmen: 3,
      alasanAnalisis: 'Refleksi berhasil merangkum konsep utama, meskipun waktu agak padat (~3.5 menit).'
    }
  ],
  interaction: {
    guruKeSiswa: 28,
    siswaKeGuru: 24,
    siswaKeSiswa: 48,
    aktivitasGuruTerdeteksi: [
      'Membuka sesi dan mengaitkan dalil Al-Qur\'an',
      'Mengajukan pertanyaan pemantik kontekstual',
      'Mendemonstrasikan preparasi kaca obyek',
      'Berkeliling memberi scaffolding di tiap meja lab',
      'Memberikan umpan balik verbal apresiatif',
      'Mencatat observasi kinerja siswa di clipboard'
    ],
    aktivitasSiswaTerdeteksi: [
      'Mengambil sampel air kolam madrasah',
      'Mengoperasikan mikroskop dan sensor pH digital',
      'Berdiskusi aktif menyusun diagram rantai makanan',
      'Membuat draf desain miniatur biofilter lingkungan',
      'Mempresentasikan hasil temuan di depan kelas',
      'Membersihkan dan merapikan alat laboratorium'
    ],
    metodePembelajaranTerdeteksi: [
      'Guided Project-Based Learning (PjBL)',
      'Inquiry-Discovery Learning Laboratorium',
      'Think-Pair-Share Kolaboratif',
      'Gallery Walk & Presentasi Poster',
      'Kuis Formatif Digital Interaktif'
    ],
    buktiDiferensiasiTerdeteksi: [
      'Penyediaan LKPD berjenjang (scaffolding vs open-ended)',
      'Pemanfaatan media multi-modal (visual tablet, auditori, kinestetik lab)',
      'Opsi ragam format produk akhir (poster, video reels, laporan)'
    ],
    buktiAsesmenTerdeteksi: [
      'Kuis diagnostik awal via Quizizz',
      'Observasi kinerja langsung saat praktikum lab',
      'Rubrik analitik penugasan produk biofilter',
      'Refleksi kilat dan pengecekan ketercapaian TP'
    ],
    keteranganEstimasi: 'Estimasi AI berdasarkan pemrosesan timeline rekaman audio-visual video 40 menit.'
  },
  crossAnalysis: {
    keselarasanUmum: 'TERLIHAT SELARAS',
    catatanKeselarasan: 'Rancangan dalam Modul Ajar dan instrumen LKPD terbukti dilaksanakan secara konsisten dalam rekaman video pembelajaran dengan tingkat keselarasan mencapai 92%.',
    poinKesesuaian: [
      {
        aspek: 'Tujuan Pembelajaran & Apersepsi Kontekstual',
        pernyataanDokumen: 'Modul Hal 2 & 4 merencanakan apersepsi kolam asrama dan penyampaian TP berbasis ABCD.',
        pelaksanaanVideo: 'Terlaksana sangat selaras pada menit 02:15 - 06:20 dengan keterlibatan aktif siswa.',
        status: 'SELARAS',
        catatan: 'Implementasi bahkan lebih kaya dengan antusiasme santri menceritakan kondisi riil kolam.'
      },
      {
        aspek: 'Metode Praktikum Laboratorium & Integrasi Mikroskop Digital',
        pernyataanDokumen: 'Modul Hal 8 merencanakan penggunaan mikroskop Wi-Fi dan preparasi sampel air.',
        pelaksanaanVideo: 'Terlaksana nyata pada menit 16:10 - 22:30 dengan proyeksi tablet Android.',
        status: 'SELARAS',
        catatan: 'Bukti teknologi terlaksana nyata di meja 1 dan 2.'
      },
      {
        aspek: 'Diferensiasi Tingkat Kesulitan Tugas (Tiered Assignments)',
        pernyataanDokumen: 'LKPD memuat 3 tingkatan soal berjenjang (Level 1, Level 2, Level 3).',
        pelaksanaanVideo: 'Di video hanya 1 kelompok yang sempat menyentuh Level 3 karena keterbatasan durasi waktu.',
        status: 'SEBAGIAN SELARAS',
        catatan: 'Guru perlu mengalokasikan Level 3 sebagai penugasan mandiri asinkron di asrama.'
      },
      {
        aspek: 'Alokasi Waktu Refleksi Akhir Siswa',
        pernyataanDokumen: 'Modul merencanakan sesi refleksi penutup 10 menit dengan model 4F.',
        pelaksanaanVideo: 'Terlaksana hanya 3.5 menit (36:20 - 40:00) menggunakan Mentimeter cepat karena sesi presentasi molor.',
        status: 'PERLU VERIFIKASI',
        catatan: 'Manajemen waktu presentasi perlu diperketat agar refleksi metakognitif lebih mendalam.'
      },
      {
        aspek: 'Asesmen Otentik Berbasis Observasi Kinerja',
        pernyataanDokumen: 'LKPD melampirkan rubrik observasi proses kerja ilmiah 4 skala.',
        pelaksanaanVideo: 'Guru tampak konsisten membawa clipboard dan mengamati siswa memegang alat lab menit 19:15 - 23:45.',
        status: 'SELARAS',
        catatan: 'Asesmen proses terbukti berjalan nyata, bukan sekadar pelengkap administratif.'
      }
    ]
  },
  summary: {
    kekuatanUtama: [
      'Integrasi nilai keislaman (Rahmatan Lil Alamin) dan ayat Al-Qur\'an dirajut sangat harmonis dan bermakna dengan materi biologi ekosistem.',
      'Pemanfaatan media mikroskop digital berkoneksi tablet berhasil memantik keterlibatan aktif 100% siswa.',
      'Model pembelajaran berpusat pada siswa (student-centered) sangat dominan, waktu bicara guru proporsional hanya 28%.',
      'Asesmen autentik komprehensif mencakup diagnostik, observasi proses laboratorium secara real-time, dan rubrik analitik produk.',
      'Suasana psikologis kelas sangat aman, bebas perundungan, dan menumbuhkan kemandirian etika kerja laboratorium.'
    ],
    areaPerluDitingkatkan: [
      'Alokasi waktu refleksi akhir terpotong (hanya ~3.5 menit dari rencana 10 menit), sehingga metakognisi kendala belajar belum tergali dalam.',
      'Keterlibatan siswa dalam memilih alur/urutan investigasi laboratorium (student agency) masih terbatas pada instruksi seragam guru.',
      'Tiered assignments tingkat lanjut (Level 3 kreasi ekologis) belum sempat diselesaikan oleh mayoritas kelompok di kelas.',
      'Catatan tindak lanjut program remedial dan pengayaan pada dokumen masih berupa format kosong dan belum terisi data nama siswa.',
      'Umpan balik tertulis secara spesifik pada lembar kerja siswa belum sempat dibubuhkan di dalam kelas.'
    ],
    indikatorPrioritas: [
      '4.3 Siswa terlibat dalam perencanaan atau pemilihan jalur belajar (Skor: 2/4)',
      '5.2 Refleksi mencakup: apa yang dipelajari, bagaimana cara belajar, kendala, solusi (Skor: 2/4)',
      '5.6 Terdapat catatan tindak lanjut dari hasil refleksi (Skor: 2/4)',
      '5.1 Alokasi waktu sesi refleksi di akhir pembelajaran (Skor: 3/4)',
      '3.4 Penyediaan dan penuntasan berbagai tingkatan kesulitan materi (Skor: 3/4)'
    ],
    buktiPositif: [
      'Video 17:40: Siswa sangat antusias memperbesar preparat alga di layar tablet bersama kelompoknya.',
      'Video 08:50: Guru mengutip QS. Ar-Rum: 41 secara kontekstual dengan kerusakan ekosistem kolam madrasah.',
      'Video 27:10: Seluruh kelas memberikan tepuk tangan apresiatif saat siswa yang pemalu berani menjadi juru bicara.',
      'Modul Hal 12: Ketersediaan opsi produk multi-format (infografis Canva, video reels, podcast, mini riset).'
    ],
    potensiKetidaksesuaian: [
      'Waktu refleksi modul (10 menit) tidak sepenuhnya terwujud di video (hanya 3.5 menit).',
      'Tugas Level 3 dalam LKPD belum dapat diselesaikan seluruh siswa karena durasi 40 menit yang padat.'
    ]
  },
  followUpPlans: [
    {
      id: 'rtl-1',
      prioritas: 'Tinggi',
      indikator: '4.3 Otonomi Alur Belajar Siswa (Student Agency)',
      kondisiSaatIni: 'Guru masih memandu urutan investigasi lab pos 1 ke pos 3 secara kaku dan seragam.',
      tindakanPerbaikan: 'Menyusun "Papan Jalur Inkuiri" di mana kelompok boleh merencanakan urutan stasiun lab yang ingin mereka teliti terlebih dahulu.',
      targetPencapaian: 'Siswa mampu menyepakati pembagian waktu dan urutan kerja mandiri dalam lembar kontrak belajar tim.',
      waktuPelaksanaan: 'Siklus Pembelajaran Berikutnya (Pekan ke-4 Februari 2026)',
      status: 'Dalam Proses',
      penanggungJawab: 'Nurul Hidayati, S.Pd., M.Pd. (Guru Mata Pelajaran)'
    },
    {
      id: 'rtl-2',
      prioritas: 'Tinggi',
      indikator: '5.2 Refleksi Metakognitif 4 Dimensi Lengkap',
      kondisiSaatIni: 'Refleksi baru berupa polling kilat Mentimeter konsep materi dan perasaan, belum menyentuh kendala dan solusi cara belajar.',
      tindakanPerbaikan: 'Menerapkan "Tiket Keluar 4F" (Fakta, Perasaan, Temuan Kendala, Solusi Pribadi) dalam bentuk lembar selip buku saku belajar.',
      targetPencapaian: '100% siswa menuliskan 1 kendala spesifik dan 1 cara yang akan ditempuh untuk mengatasi kendala tersebut.',
      waktuPelaksanaan: 'Pertemuan Rutin Berikutnya (25 Februari 2026)',
      status: 'Belum Dimulai',
      penanggungJawab: 'Nurul Hidayati, S.Pd., M.Pd.'
    },
    {
      id: 'rtl-3',
      prioritas: 'Tinggi',
      indikator: '5.6 Catatan Tindak Lanjut Remedial & Pengayaan',
      kondisiSaatIni: 'Tabel program remedial dan pengayaan pada dokumen LKPD masih kosong.',
      tindakanPerbaikan: 'Menginput data 3 siswa yang ragu-ragu dalam asesmen formatif ke dalam formulir remedial terarah dan menyiapkan modul ringkas penguatan.',
      targetPencapaian: 'Dokumen tindak lanjut terisi lengkap beserta nilai sebelum dan sesudah bimbingan klinis.',
      waktuPelaksanaan: 'Maksimal 3 hari kerja (21 Februari 2026)',
      status: 'Dalam Proses',
      penanggungJawab: 'Nurul Hidayati & Tim Kurikulum Madrasah'
    },
    {
      id: 'rtl-4',
      prioritas: 'Sedang',
      indikator: '5.1 Manajemen Waktu Sesi Refleksi Penutup',
      kondisiSaatIni: 'Waktu presentasi kelompok menyita jatah refleksi sehingga hanya tersisa 3.5 menit.',
      tindakanPerbaikan: 'Menunjuk satu siswa sebagai Timekeeper resmi dan membatasi paparan presentasi maksimal 3 menit per kelompok.',
      targetPencapaian: 'Sesi refleksi mendapatkan alokasi waktu minimal 8 menit utuh tanpa tergesa-gesa.',
      waktuPelaksanaan: 'Setiap pembelajaran berlangsung',
      status: 'Dalam Proses',
      penanggungJawab: 'Nurul Hidayati & Ketua Kelas'
    },
    {
      id: 'rtl-5',
      prioritas: 'Sedang',
      indikator: '3.4 Penuntasan Tugas Berjenjang (Tiered Tasks)',
      kondisiSaatIni: 'Tugas Level 3 (Kreasi mitigasi perubahan suhu kolam) belum tuntas dikerjakan di kelas.',
      tindakanPerbaikan: 'Mengintegrasikan soal Level 3 ke dalam forum asinkron Google Classroom/LMS Madrasah sebagai tantangan bonus prestasi.',
      targetPencapaian: 'Minimal 60% siswa mengunggah respon rancangan mitigasi ekologis secara daring.',
      waktuPelaksanaan: 'Pekan ke-1 Maret 2026',
      status: 'Belum Dimulai',
      penanggungJawab: 'Nurul Hidayati, S.Pd., M.Pd.'
    }
  ],
  overallScore: 89,
  createdAt: '2026-02-18 10:30:00',
  updatedAt: '2026-02-18 11:45:00',
  status: 'Terverifikasi'
};
