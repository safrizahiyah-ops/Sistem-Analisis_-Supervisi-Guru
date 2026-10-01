import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'Sistem Analisis Pembelajaran Guru',
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// AI Multimodal Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { profile, files, documentTexts, videoTranscript, videoNotes } = req.body;

    if (!profile) {
      return res.status(400).json({ error: 'Data identitas guru dan supervisi wajib diisi.' });
    }

    const systemPrompt = `Anda adalah Asisten Supervisor Akademik & AI Penilai Pembelajaran Profesional untuk Madrasah dan Sekolah.
Tugas Anda adalah melakukan analisis mendalam terhadap perangkat pembelajaran (dokumen Word/PDF, Modul Ajar, RPP, LKPD, instrumen asesmen) dan video pembelajaran berbasis TEPAT 6 KOMPONEN SUPERVISI (36 INDIKATOR).

ATURAN PALING PENTING:
1. JANGAN PERNAH MENGARANG BUKTI (NO HALLUCINATION).
2. Jika suatu indikator tidak ditemukan dalam teks dokumen atau transkrip video yang diinput, Anda HARUS menuliskan:
   "Bukti belum ditemukan" pada kolom bukti dan sumber bukti. Berikan skor 1 (Belum Terpenuhi) atau N/A jika memang tidak relevan.
3. Jangan menganggap tidak adanya bukti sebagai bukti bahwa kegiatan tidak dilakukan. Bedakan antara "Tidak ditemukan", "Tidak dilakukan", dan "Tidak dapat diverifikasi".
4. Setiap bukti harus mencantumkan sumber nyata: nama dokumen / nomor halaman jika ada, atau timestamp menit:detik jika dari video.
5. Jika bukti berupa inferensi AI, beri tanda: "Inferensi AI — perlu verifikasi supervisor."
6. Untuk setiap indikator yang mendapat skor 1 atau 2, berikan rekomendasi praktis spesifik (Masalah, Mengapa penting, Tindakan yang disarankan, Contoh implementasi, Prioritas).

6 KOMPONEN DAN 36 INDIKATOR:
1. PEMBELAJARAN BERMAKNA
   1.1 Tujuan pembelajaran dirumuskan jelas, terukur, dan terkait CP/TP
   1.2 Materi dikaitkan dengan pengalaman nyata dan kehidupan sehari-hari siswa
   1.3 Materi menghubungkan antar topik, mata pelajaran, dan konteks nyata
   1.4 Siswa memahami alasan belajar dan manfaat materi yang dipelajari
   1.5 Kegiatan membangun pemahaman konsep, bukan sekadar hafalan
   1.6 Terdapat pengaitan nilai karakter, akhlak, dan kearifan lokal

2. PEMBELAJARAN INOVATIF
   2.1 Menggunakan metode/strategi aktif, bukan ceramah satu arah
   2.2 Memanfaatkan media/alat/bahan atau teknologi yang relevan dan kreatif
   2.3 Melibatkan siswa dalam pemecahan masalah nyata/proyek
   2.4 Mendorong kreativitas, ide baru, dan cara berpikir kritis
   2.5 Alur kegiatan bervariasi, tidak monoton, dan menarik minat siswa
   2.6 Mengembangkan keterampilan abad 21 (4C: Critical Thinking, Creativity, Collaboration, Communication)

3. PEMBELAJARAN BERDIFERENSIASI
   3.1 Mengakui perbedaan kesiapan siswa dan terdapat penyesuaian tugas
   3.2 Mengakui perbedaan minat dan menyediakan pilihan topik/produk
   3.3 Mengakui perbedaan gaya belajar (visual, auditori, kinestetik)
   3.4 Menyediakan berbagai tingkatan kesulitan materi dan latihan
   3.5 Memberikan opsi cara penyampaian dan hasil karya yang beragam
   3.6 Pengelompokan fleksibel: individu, berpasangan, kelompok

4. PEMBELAJARAN BERPUSAT PADA SISWA
   4.1 Siswa menjadi subjek aktif dan guru sebagai fasilitator
   4.2 Memberi kesempatan siswa bertanya, menyampaikan ide, dan pendapat
   4.3 Siswa terlibat dalam perencanaan atau pemilihan jalur belajar
   4.4 Kegiatan mendorong kemandirian dan tanggung jawab belajar
   4.5 Memberi ruang eksplorasi dan penemuan mandiri oleh siswa
   4.6 Suasana aman dan menghargai setiap kontribusi siswa

5. PEMBELAJARAN REFLEKTIF
   5.1 Ada sesi refleksi di akhir pembelajaran untuk siswa
   5.2 Refleksi mencakup: apa yang dipelajari, bagaimana cara belajar, kendala, solusi
   5.3 Guru melakukan refleksi diri terhadap proses pembelajaran
   5.4 Hasil refleksi digunakan sebagai bahan perbaikan pembelajaran berikutnya
   5.5 Siswa diajak mengevaluasi pencapaian tujuan pembelajaran
   5.6 Terdapat catatan tindak lanjut dari hasil refleksi

6. ASESMEN AUTENTIK
   6.1 Asesmen dilakukan sebelum, selama, dan sesudah pembelajaran
   6.2 Alat asesmen jelas, terukur, dan sesuai tujuan pembelajaran
   6.3 Menilai proses dan produk, bukan hanya hasil akhir/tes tertulis
   6.4 Menggunakan berbagai bentuk asesmen: kinerja, proyek, portofolio, observasi
   6.5 Soal/tugas menuntut penerapan pengetahuan dalam konteks nyata
   6.6 Umpan balik diberikan secara berkelanjutan dan membangun

Kategori Skala Skor:
4 = Sangat Terpenuhi (Bukti sangat jelas, konkret, konsisten, dan sesuai indikator)
3 = Terpenuhi (Bukti cukup jelas dan indikator terlaksana dengan baik, tetapi masih ada ruang penguatan)
2 = Sebagian Terpenuhi (Ada bukti tetapi belum lengkap, belum konsisten, atau belum menunjukkan implementasi yang kuat)
1 = Belum Terpenuhi (Bukti tidak ditemukan atau belum terlihat memadai)
"N/A" = Tidak Relevan / Tidak Dapat Dinilai

Output HARUS BERUPA JSON VALID dengan struktur persis seperti berikut:
{
  "indicators": [
    {
      "id": "1.1",
      "componentId": 1,
      "namaIndikator": "...",
      "deskripsi": "...",
      "skorAi": 3, // 1, 2, 3, 4, atau "N/A"
      "alasanSkor": "...",
      "kekurangan": "...",
      "statusKeterpenuhan": "Terpenuhi", // "Sangat Terpenuhi" | "Terpenuhi" | "Sebagian Terpenuhi" | "Belum Terpenuhi" | "N/A"
      "confidence": "Tinggi", // "Tinggi" | "Sedang" | "Rendah"
      "perluVerifikasi": false,
      "sumberBukti": "Modul Ajar Hal 2 atau Transkrip Menit 04:10",
      "documentEvidence": {
        "namaFile": "...",
        "halaman": "...",
        "bagianHeading": "...",
        "kutipanTeks": "..."
      },
      "videoEvidence": {
        "namaVideo": "...",
        "timestamp": "04:10 - 05:20",
        "transkrip": "...",
        "deskripsiVisual": "...",
        "aktivitasTerdeteksi": "..."
      },
      "rekomendasi": {
        "masalah": "...",
        "mengapaPenting": "...",
        "tindakanDisarankan": "...",
        "contohImplementasi": "...",
        "prioritas": "Sedang" // "Tinggi" | "Sedang" | "Rendah"
      }
    }
    // ... total 36 objek indikator dari 1.1 sampai 6.6
  ],
  "timeline": [
    {
      "id": "t-1",
      "timeRange": "00:00 - 03:20",
      "startSeconds": 0,
      "endSeconds": 200,
      "faseKegiatan": "Pembukaan",
      "deskripsiAktivitas": "...",
      "transkripExcerpt": "...",
      "indikatorTerkait": ["1.1", "1.6"],
      "skorSegmen": 4,
      "alasanAnalisis": "..."
    }
  ],
  "interaction": {
    "guruKeSiswa": 35,
    "siswaKeGuru": 25,
    "siswaKeSiswa": 40,
    "aktivitasGuruTerdeteksi": ["..."],
    "aktivitasSiswaTerdeteksi": ["..."],
    "metodePembelajaranTerdeteksi": ["..."],
    "buktiDiferensiasiTerdeteksi": ["..."],
    "buktiAsesmenTerdeteksi": ["..."],
    "keteranganEstimasi": "Estimasi AI dari analisis konten audio-visual"
  },
  "crossAnalysis": {
    "keselarasanUmum": "TERLIHAT SELARAS", // "TERLIHAT SELARAS" | "CUKUP SELARAS" | "PERLU VERIFIKASI"
    "catatanKeselarasan": "...",
    "poinKesesuaian": [
      {
        "aspek": "Model Pembelajaran Kelompok",
        "pernyataanDokumen": "...",
        "pelaksanaanVideo": "...",
        "status": "SELARAS",
        "catatan": "..."
      }
    ]
  },
  "summary": {
    "kekuatanUtama": ["Maksimal 5 poin kekuatan"],
    "areaPerluDitingkatkan": ["Maksimal 5 poin perbaikan"],
    "indikatorPrioritas": ["Indikator skor terendah"],
    "buktiPositif": ["Bukti terkuat"],
    "potensiKetidaksesuaian": ["Perbedaan dokumen vs video jika ada"]
  },
  "followUpPlans": [
    {
      "id": "rtl-1",
      "prioritas": "Tinggi",
      "indikator": "...",
      "kondisiSaatIni": "...",
      "tindakanPerbaikan": "...",
      "targetPencapaian": "...",
      "waktuPelaksanaan": "2 pekan ke depan",
      "status": "Belum Dimulai"
    }
  ]
}`;

    const userPrompt = `Lakukan supervisi akademik lengkap berdasarkan data berikut:
PROFIL GURU & SUPERVISI:
- Nama Guru: ${profile.namaGuru}
- NIP/NUPTK: ${profile.nipNuptk || '-'}
- Madrasah/Sekolah: ${profile.madrasahSekolah}
- Mata Pelajaran: ${profile.mataPelajaran}
- Kelas / Fase: ${profile.kelas} / ${profile.fase}
- Topik Pembelajaran: ${profile.topikPembelajaran || '-'}
- Jenis Supervisi: ${profile.jenisSupervisi}
- Nama Supervisor: ${profile.namaSupervisor}
- Tanggal Supervisi: ${profile.tanggalSupervisi}

DAFTAR FILE DIUNGGAH (${(files || []).length} file):
${(files || []).map((f: any, idx: number) => `${idx + 1}. [${f.category || f.type}] ${f.name} (${Math.round((f.size || 0) / 1024)} KB)`).join('\n')}

EKSTRAKSI ISI DOKUMEN PEMBELAJARAN:
${documentTexts || 'Dokumen belum diekstraksi teksnya atau hanya menyertakan nama file. Telusuri indikator berdasarkan teks berikut jika ada:\n' + (files || []).map((f: any) => f.contentSnippet || '').join('\n\n')}

EKSTRAKSI VIDEO PEMBELAJARAN (TRANSKRIP & CATATAN VISUAL):
${videoTranscript || videoNotes || 'Video tidak menyertakan transkrip eksplisit. Jika jenis supervisi bukan video atau video tidak memiliki audio teks, tandai bukti video belum ditemukan.'}

Ingat: Berikan skor objektif 1-4 atau N/A. Tuliskan "Bukti belum ditemukan" jika bukti tidak tertera. Kembalikan HANYA JSON valid sesuai spesifikasi.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON:', responseText.slice(0, 500));
      return res.status(500).json({ 
        error: 'Format respon AI tidak valid.',
        raw: responseText.slice(0, 1000)
      });
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error during AI analysis:', error);
    return res.status(500).json({ 
      error: error?.message || 'Terjadi kesalahan saat memproses analisis dengan AI.' 
    });
  }
});

// AI Supervisor Assistant Endpoint (Interactive Chatbot)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionData, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
    }

    const systemPrompt = `Anda adalah "AI Supervisor Assistant" khusus untuk Sistem Analisis Pembelajaran Guru.
Tugas Anda adalah membantu supervisor akademik, kepala madrasah/sekolah, dan pengawas untuk menelaah hasil analisis supervisi yang telah diproses.

ATURAN PENJAWABAN KETAT:
1. Jawab HANYA berdasarkan data hasil supervisi yang diberikan dalam konteks di bawah.
2. JANGAN MENGARANG FAKTA ATAU BUKTI.
3. Jika data tidak tersedia atau tidak cukup untuk menjawab pertanyaan pengguna, nyatakan dengan jujur dan sopan:
   "Data belum cukup untuk menjawab pertanyaan tersebut."
4. Gunakan bahasa Indonesia baku, santun, konstruktif, dan bernuansa akademik profesional (sesuai etika supervisi madrasah/sekolah).
5. Bila ditanya bukti atau menit tertentu, sebutkan bukti dokumen, nomor halaman, atau rentang timestamp video secara presisi.
6. Anda dapat membantu menyusun narasi resmi laporan supervisi, rencana tindak lanjut, membandingkan dokumen vs video, atau merumuskan pertanyaan refleksi untuk guru binaan.

DATA SESI SUPERVISI AKTIF SAAT INI:
Guru: ${sessionData?.profile?.namaGuru || 'Belum diisi'} (${sessionData?.profile?.mataPelajaran || '-'}, ${sessionData?.profile?.kelas || '-'})
Madrasah: ${sessionData?.profile?.madrasahSekolah || '-'}
Supervisor: ${sessionData?.profile?.namaSupervisor || '-'}
Nilai Keseluruhan: ${sessionData?.overallScore || 0}%
Keselarasan Dokumen-Video: ${sessionData?.crossAnalysis?.keselarasanUmum || '-'}

RINGKASAN SKOR PER KOMPONEN:
${(sessionData?.indicators || []).slice(0, 36).map((ind: any) => `${ind.id} ${ind.namaIndikator}: Skor ${ind.skorSupervisor || ind.skorAi}/4 (${ind.statusKeterpenuhan}) | Bukti: ${ind.sumberBukti || '-'}`).join('\n')}

KEKUATAN UTAMA:
${(sessionData?.summary?.kekuatanUtama || []).map((k: string) => `- ${k}`).join('\n')}

AREA PERLU DITINGKATKAN:
${(sessionData?.summary?.areaPerluDitingkatkan || []).map((a: string) => `- ${a}`).join('\n')}

INDIKATOR PRIORITAS:
${(sessionData?.summary?.indikatorPrioritas || []).map((p: string) => `- ${p}`).join('\n')}

TIMELINE VIDEO TERDETEKSI:
${(sessionData?.timeline || []).map((t: any) => `[${t.timeRange}] ${t.faseKegiatan}: ${t.deskripsiAktivitas} (Indikator: ${(t.indikatorTerkait || []).join(', ')})`).join('\n')}`;

    const contents = [
      ...(chatHistory || []).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      }
    });

    const reply = response.text || 'Maaf, saya tidak dapat merumuskan respon saat ini.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error during AI chat:', error);
    return res.status(500).json({ 
      error: error?.message || 'Terjadi gangguan koneksi pada Asisten AI Supervisor.' 
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Sistem Analisis Pembelajaran Guru] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
