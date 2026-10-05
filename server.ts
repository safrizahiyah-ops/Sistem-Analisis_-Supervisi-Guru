import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfParseModule from 'pdf-parse';
const pdfParse: any = (pdfParseModule as any).PDFParse || (pdfParseModule as any).default || pdfParseModule;
import mammoth from 'mammoth';
import { analyzeUploadedDocumentsAndVideo } from './src/utils/dynamicSupervisionAnalyzer.ts';

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

// Document Extraction Endpoint (PDF, DOCX, TXT)
app.post('/api/extract', async (req, res) => {
  try {
    const { fileName, fileType, base64Data } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'Data base64 berkas kosong.' });
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const lowerName = (fileName || '').toLowerCase();

    // 1. PDF extraction
    if (lowerName.endsWith('.pdf') || fileType === 'application/pdf') {
      try {
        const pdfData = await pdfParse(buffer);
        return res.json({
          text: pdfData.text || '',
          pageEstimate: pdfData.numpages || 1
        });
      } catch (pdfErr: any) {
        console.warn('pdf-parse error, returning raw buffer extraction:', pdfErr.message);
      }
    }

    // 2. DOCX extraction
    if (lowerName.endsWith('.docx') || fileType?.includes('wordprocessingml')) {
      try {
        const result = await mammoth.extractRawText({ buffer });
        return res.json({
          text: result.value || '',
          pageEstimate: Math.max(1, Math.round(result.value.length / 2500))
        });
      } catch (docxErr: any) {
        console.warn('mammoth error:', docxErr.message);
      }
    }

    // 3. Plain text / fallback
    const rawText = buffer.toString('utf-8');
    return res.json({ text: rawText });
  } catch (err: any) {
    console.error('Extraction error:', err);
    return res.status(500).json({ error: 'Gagal mengekstrak teks berkas.', details: err.message });
  }
});

// AI Multimodal Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { profile, files, documentTexts, videoTranscript, videoNotes } = req.body;

    if (!profile) {
      return res.status(400).json({ error: 'Data identitas guru dan supervisi wajib diisi.' });
    }

    // Build user prompt
    const userPrompt = `Lakukan supervisi akademik lengkap berdasarkan berkas dan teks dokumen yang diunggah berikut:
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

BERKAS YANG DIUNGGAH (${(files || []).length} berkas):
${(files || []).map((f: any, idx: number) => `${idx + 1}. [${f.category || f.type}] ${f.name} (${Math.round((f.size || 0) / 1024)} KB)`).join('\n')}

ISI DOKUMEN YANG DIUNGGAH:
${documentTexts || (files || []).map((f: any) => f.contentSnippet || '').join('\n\n') || 'Dokumen tidak memuat teks eksplisit.'}

TRANSKRIP & CATATAN OBSERVASI VIDEO:
${videoTranscript || videoNotes || 'Video tidak memuat transkrip audio eksplisit.'}

ATURAN WAJIB:
1. Analisis harus HANYA bersumber dari isi dokumen dan video yang tertera di atas. JANGAN MENGGUNAKAN CONTOH DATA LAIN (misal jangan menggunakan data biologi atau data dari sekolah lain).
2. Jika suatu indikator dari 36 indikator TIDAK DITEMUKAN buktinya dalam teks di atas, tuliskan "Bukti belum ditemukan pada dokumen yang diunggah" dan beri skor 1 atau N/A.
3. Sebutkan nama file dokumen secara spesifik pada setiap bukti dan alasan skor.
4. Sesuaikan analisis Deep Learning, Panca Cinta (KBC), dan Kajian Turats dengan mata pelajaran ${profile.mataPelajaran} dan materi ${profile.topikPembelajaran || profile.mataPelajaran}.`;

    const systemPrompt = `Anda adalah Asisten Supervisor Akademik & AI Penilai Pembelajaran Profesional untuk Madrasah dan Sekolah.
Tugas Anda adalah menelaah dokumen dan video yang diunggah secara objektif berdasarkan 6 KOMPONEN (36 INDIKATOR).
JANGAN PERNAH MENGARANG BUKTI. Jika tidak ada bukti di dokumen, tulis "Bukti belum ditemukan" dengan skor 1.
Kembalikan HANYA JSON valid dengan struktur:
{
  "indicators": [ /* 36 objek indikator dari 1.1 sampai 6.6 dengan skorAi, alasanSkor, sumberBukti, statusKeterpenuhan, documentEvidence, videoEvidence, rekomendasi */ ],
  "timeline": [ /* 7 objek segmen video dengan timeRange, faseKegiatan, sceneSnapshot, pancaCintaKbc */ ],
  "pancaCintaSummary": { /* totalTerdeteksi, skorRataRata, persentaseImplementasi, catatanKurikulumBerbasisCinta, pilarStatus */ },
  "deepLearning": { /* bloomLevelDistribution, skorKedalamanMetakognisi, levelMetakognisi, transferBelajarKehidupanNyata, studentAgencyDanKemandirian, catatanAnalisisMendalam */ },
  "turatsStudy": { /* ayatAlQuran, haditsNabawi, kitabTurats, kesimpulanTarbiyahIslamiyah */ },
  "interaction": { /* guruKeSiswa, siswaKeGuru, siswaKeSiswa, aktivitasGuruTerdeteksi, aktivitasSiswaTerdeteksi, metodePembelajaranTerdeteksi, buktiDiferensiasiTerdeteksi, buktiAsesmenTerdeteksi */ },
  "crossAnalysis": { /* keselarasanUmum, catatanKeselarasan, poinKesesuaian */ },
  "summary": { /* kekuatanUtama, areaPerluDitingkatkan, indikatorPrioritas, buktiPositif, potensiKetidaksesuaian */ },
  "followUpPlans": [ /* 3-5 item tindak lanjut */ ]
}`;

    // Try Gemini API first if configured
    if (process.env.GEMINI_API_KEY) {
      try {
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
        const parsedData = JSON.parse(responseText);
        if (parsedData && parsedData.indicators && parsedData.indicators.length >= 30) {
          return res.json(parsedData);
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call returned non-standard output or error, utilizing dynamic analyzer:', geminiError?.message || geminiError);
      }
    }

    // Dynamic document & video analysis engine fallback
    const dynamicResult = analyzeUploadedDocumentsAndVideo({
      profile,
      files: files || [],
      documentText: documentTexts || '',
      videoTranscript: videoTranscript || '',
      videoNotes: videoNotes || ''
    });

    return res.json(dynamicResult);
  } catch (error: any) {
    console.error('Error during AI analysis:', error);
    // Safe dynamic analysis fallback so the app NEVER fails and NEVER retains outdated dummy data
    try {
      const fallbackResult = analyzeUploadedDocumentsAndVideo({
        profile: req.body.profile,
        files: req.body.files || [],
        documentText: req.body.documentTexts || '',
        videoTranscript: req.body.videoTranscript || '',
        videoNotes: req.body.videoNotes || ''
      });
      return res.json(fallbackResult);
    } catch (fallbackErr) {
      return res.status(500).json({ error: 'Gagal menganalisis dokumen dan video.' });
    }
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
1. Jawab HANYA berdasarkan data hasil supervisi guru "${sessionData?.profile?.namaGuru}" mata pelajaran "${sessionData?.profile?.mataPelajaran}" di bawah.
2. JANGAN MENGARANG FAKTA ATAU BUKTI.
3. Sebutkan bukti dokumen, nomor halaman, atau rentang timestamp video secara presisi.

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
${(sessionData?.summary?.areaPerluDitingkatkan || []).map((a: string) => `- ${a}`).join('\n')}`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const formattedHistory = (chatHistory || []).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

        const chat = ai.chats.create({
          model: 'gemini-3.8-flash',
          history: formattedHistory,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.3,
          }
        });

        const result = await chat.sendMessage({ message });
        return res.json({ reply: result.text || 'Maaf, tidak dapat menghasilkan jawaban.' });
      } catch (err: any) {
        console.warn('Gemini chat error, using heuristic response:', err.message);
      }
    }

    // Heuristic response if Gemini API key not present
    const lowerQ = message.toLowerCase();
    let reply = `Berdasarkan analisis hasil supervisi untuk Bapak/Ibu ${sessionData?.profile?.namaGuru || 'Guru'} pada mata pelajaran ${sessionData?.profile?.mataPelajaran}:\n\n`;

    if (lowerQ.includes('skor') || lowerQ.includes('nilai')) {
      reply += `Nilai keterpenuhan supervisi saat ini adalah ${sessionData?.overallScore || 0}%. Terdapat indikator kuat pada perumusan tujuan dan interaksi kelas, serta indikator yang perlu penguatan pada rubrik asesmen dan diferensiasi.`;
    } else if (lowerQ.includes('bukti') || lowerQ.includes('dokumen')) {
      const sampleEvidence = (sessionData?.indicators || []).find((i: any) => i.documentEvidence);
      reply += `Bukti dokumen ditelusuri dari berkas yang diunggah. Sebagai contoh pada indikator ${sampleEvidence?.id || '1.1'} (${sampleEvidence?.namaIndikator}): "${sampleEvidence?.documentEvidence?.kutipanTeks || 'Tercantum pada modul ajar'}".`;
    } else if (lowerQ.includes('rekomendasi') || lowerQ.includes('saran') || lowerQ.includes('tindak lanjut')) {
      reply += `Rekomendasi utama mencakup penguatan diferensiasi proses belajar dan kelengkapan rubrik asesmen autentik. Pastikan instrumen penilaian tercantum lengkap pada modul ajar.`;
    } else {
      reply += `Analisis supervisi menunjukkan kekuatan pada aspek: ${sessionData?.summary?.kekuatanUtama?.[0] || 'Tujuan pembelajaran terarah'}. Sementara aspek yang perlu ditingkatkan: ${sessionData?.summary?.areaPerluDitingkatkan?.[0] || 'Kelengkapan lembar refleksi dan asesmen'}.`;
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error during AI chat:', error);
    return res.status(500).json({ error: error?.message || 'Terjadi kesalahan percakapan AI.' });
  }
});

// Production / Dev Vite Integration
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

app.listen(PORT, () => {
  console.log(`Server Sistem Analisis Pembelajaran Guru berjalan di port ${PORT}`);
});
