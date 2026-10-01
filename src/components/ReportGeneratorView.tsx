import React from 'react';
import { SupervisionSession } from '../types/supervision';
import { calculateScores } from '../data/indicatorsData';
import { exportToWord, exportToExcel } from '../utils/exportHelpers';
import { RadarChart, ComponentBarChart } from './VisualCharts';
import { 
  Printer, 
  FileDown, 
  FileSpreadsheet, 
  Award, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  User, 
  BookOpen, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface ReportGeneratorViewProps {
  session: SupervisionSession;
}

export const ReportGeneratorView: React.FC<ReportGeneratorViewProps> = ({ session }) => {
  const { componentSummaries, overallScore, totalEvaluated, totalSangatTerpenuhi, totalTerpenuhi, totalSebagian, totalBelumTerpenuhi } = calculateScores(session.indicators);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Toolbar (Hidden during print) */}
      <div className="print:hidden bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            Laporan Resmi Supervisi Pembelajaran Guru
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Format laporan siap cetak, mencakup cover resmi, ringkasan, profil 6 komponen, 36 indikator, dan lembar pengesahan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Ekspor PDF</span>
          </button>

          <button
            type="button"
            onClick={() => exportToWord(session)}
            className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>Ekspor Word (.doc)</span>
          </button>

          <button
            type="button"
            onClick={() => exportToExcel(session)}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor Excel (.xls)</span>
          </button>
        </div>
      </div>

      {/* Printable Document Paper Simulation */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-300 p-8 sm:p-12 max-w-4xl mx-auto space-y-12 print:shadow-none print:border-none print:p-0 print:m-0 text-slate-900 font-serif">
        
        {/* ========================================================
            HALAMAN 1: COVER RESMI
            ======================================================== */}
        <div className="min-h-[920px] flex flex-col justify-between border-4 border-double border-emerald-900 p-8 sm:p-12 text-center rounded-lg relative overflow-hidden bg-gradient-to-b from-emerald-50/20 via-white to-slate-50/30 print:border-emerald-900 print:min-h-[1000px] print:break-after-page">
          
          {/* Subtle Islamic Geometric Corner Motifs */}
          <div className="absolute top-2 left-2 text-emerald-800 text-xs font-mono opacity-40">❖ ❖ ❖</div>
          <div className="absolute top-2 right-2 text-emerald-800 text-xs font-mono opacity-40">❖ ❖ ❖</div>
          <div className="absolute bottom-2 left-2 text-emerald-800 text-xs font-mono opacity-40">❖ ❖ ❖</div>
          <div className="absolute bottom-2 right-2 text-emerald-800 text-xs font-mono opacity-40">❖ ❖ ❖</div>

          {/* Header Lembaga / Kop */}
          <div className="space-y-2 pt-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-3xl shadow-md border-2 border-amber-400">
              <Award className="w-10 h-10 text-amber-300" />
            </div>
            <h4 className="text-xs uppercase font-sans tracking-widest text-emerald-900 font-bold mt-2">
              Kementerian Agama Republik Indonesia / Dinas Pendidikan
            </h4>
            <h3 className="text-xl font-bold uppercase text-slate-900 font-sans tracking-wider">
              {session.profile.madrasahSekolah}
            </h3>
            <p className="text-xs text-slate-600 font-sans italic">
              Supervisi Akademik, Pembinaan Mutu Pembelajaran Guru, dan Penjaminan Mutu Madrasah
            </p>
            <div className="w-40 h-1 bg-amber-500 mx-auto rounded-full mt-3" />
          </div>

          {/* Judul Laporan */}
          <div className="space-y-4 my-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-emerald-950 tracking-tight leading-tight">
              LAPORAN ANALISIS<br/>PEMBELAJARAN GURU
            </h1>
            <p className="text-sm font-sans font-medium text-slate-700 max-w-lg mx-auto leading-relaxed">
              Analisis Komprehensif Perangkat Pembelajaran, Modul Ajar, dan Observasi Video Pembelajaran Berbasis 6 Indikator Supervisi Akademik
            </p>
            <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-950 rounded-full font-sans text-xs font-bold border border-emerald-300">
              Jenis Supervisi: {session.profile.jenisSupervisi}
            </div>
          </div>

          {/* Profil Guru & Supervisor */}
          <div className="max-w-md mx-auto w-full bg-white/90 border border-slate-300 p-5 rounded-lg shadow-xs font-sans text-left space-y-2 text-xs">
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Nama Guru:</span>
              <span className="col-span-2 font-bold text-slate-900">{session.profile.namaGuru}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">NIP / NUPTK:</span>
              <span className="col-span-2 font-mono text-slate-800">{session.profile.nipNuptk || '-'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Mata Pelajaran:</span>
              <span className="col-span-2 font-semibold text-slate-800">{session.profile.mataPelajaran}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Kelas / Fase:</span>
              <span className="col-span-2 font-semibold text-slate-800">{session.profile.kelas} ({session.profile.fase})</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Supervisor:</span>
              <span className="col-span-2 font-bold text-emerald-950">{session.profile.namaSupervisor}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="text-slate-500 font-medium">Tanggal:</span>
              <span className="col-span-2 text-slate-800 font-medium">{session.profile.tanggalSupervisi}</span>
            </div>
          </div>

          {/* Nilai Akhir Card */}
          <div className="pt-6 font-sans">
            <div className="inline-flex items-center gap-3 bg-emerald-900 text-white px-6 py-2.5 rounded-full shadow-md">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">Nilai Akhir Supervisi:</span>
              <span className="text-2xl font-black text-amber-300">{overallScore}%</span>
              <span className="text-xs font-bold bg-emerald-800 px-2.5 py-0.5 rounded-full text-emerald-100">
                {overallScore >= 85 ? 'Sangat Baik (A)' : overallScore >= 70 ? 'Baik (B)' : 'Cukup (C)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Tahun Ajaran {session.profile.tahunPelajaran} • Semester {session.profile.semester}
            </p>
          </div>

        </div>

        {/* ========================================================
            HALAMAN 2: RINGKASAN EKSEKUTIF & TEMUAN
            ======================================================== */}
        <div className="space-y-6 pt-6 print:break-after-page">
          <div className="border-b-2 border-emerald-900 pb-2">
            <h2 className="text-xl font-bold font-sans text-emerald-950 tracking-wide uppercase">
              Bagian I: Ringkasan Eksekutif & Temuan Supervisi
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Analisis komprehensif kekuatan pedagogik, area pengembangan, dan konsistensi perencanaan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans text-xs">
            {/* Kekuatan Utama */}
            <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5 uppercase">
                <CheckCircle className="w-4 h-4 text-emerald-700" /> Kekuatan Utama Pembelajaran (Top 5)
              </h4>
              <ul className="space-y-1.5 text-slate-800 leading-relaxed">
                {session.summary.kekuatanUtama.map((k, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-700">✓</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Area Perlu Ditingkatkan */}
            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-200 space-y-2">
              <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-700" /> Area yang Perlu Penguatan (Top 5)
              </h4>
              <ul className="space-y-1.5 text-slate-800 leading-relaxed">
                {session.summary.areaPerluDitingkatkan.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-amber-700">!</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Konsistensi Dokumen vs Video */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans text-xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm uppercase">
                Konsistensi Perangkat vs Implementasi Video:
              </h4>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                {session.crossAnalysis.keselarasanUmum}
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {session.crossAnalysis.catatanKeselarasan}
            </p>
          </div>

          {/* Statistik Cepat Keterpenuhan */}
          <div className="grid grid-cols-4 gap-3 font-sans text-center text-xs">
            <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
              <div className="text-lg font-black text-emerald-800">{totalSangatTerpenuhi}</div>
              <div className="text-[11px] text-emerald-950 font-semibold">Sangat Terpenuhi (4)</div>
            </div>
            <div className="bg-teal-50 p-3 rounded border border-teal-200">
              <div className="text-lg font-black text-teal-800">{totalTerpenuhi}</div>
              <div className="text-[11px] text-teal-950 font-semibold">Terpenuhi (3)</div>
            </div>
            <div className="bg-amber-50 p-3 rounded border border-amber-200">
              <div className="text-lg font-black text-amber-800">{totalSebagian}</div>
              <div className="text-[11px] text-amber-950 font-semibold">Sebagian (2)</div>
            </div>
            <div className="bg-rose-50 p-3 rounded border border-rose-200">
              <div className="text-lg font-black text-rose-800">{totalBelumTerpenuhi}</div>
              <div className="text-[11px] text-rose-950 font-semibold">Belum Terpenuhi (1)</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            HALAMAN 3: PROFIL SKOR 6 KOMPONEN SUPERVISI
            ======================================================== */}
        <div className="space-y-6 pt-6 print:break-after-page">
          <div className="border-b-2 border-emerald-900 pb-2">
            <h2 className="text-xl font-bold font-sans text-emerald-950 tracking-wide uppercase">
              Bagian II: Profil Skor 6 Komponen Supervisi
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Diagram radar dan distribusi capaian setiap dimensi kompetensi pembelajaran
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-center">
              <RadarChart components={componentSummaries} size={340} />
            </div>

            <div className="font-sans">
              <ComponentBarChart components={componentSummaries} />
            </div>
          </div>

          {/* Tabel Detail 6 Komponen */}
          <div className="overflow-x-auto font-sans text-xs">
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase">
                <tr>
                  <th className="p-2 border border-slate-300 text-center w-12">No</th>
                  <th className="p-2 border border-slate-300">Komponen Penilaian</th>
                  <th className="p-2 border border-slate-300 text-center w-24">Skor / Maks</th>
                  <th className="p-2 border border-slate-300 text-center w-20">Rata-rata</th>
                  <th className="p-2 border border-slate-300 text-center w-24">Keterpenuhan</th>
                </tr>
              </thead>
              <tbody>
                {componentSummaries.map((c, i) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-300 text-center font-bold">{i + 1}</td>
                    <td className="p-2 border border-slate-300">
                      <b>{c.nama}</b>
                      <div className="text-[10px] text-slate-500">{c.deskripsi}</div>
                    </td>
                    <td className="p-2 border border-slate-300 text-center font-mono">
                      {c.totalSkorDiperoleh} / {c.totalSkorMaksimal}
                    </td>
                    <td className="p-2 border border-slate-300 text-center font-bold">
                      {c.skorRataRata}
                    </td>
                    <td className="p-2 border border-slate-300 text-center font-bold text-emerald-800">
                      {c.persentase}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================
            HALAMAN 4: ANALISIS 36 INDIKATOR LENGKAP
            ======================================================== */}
        <div className="space-y-6 pt-6 print:break-after-page">
          <div className="border-b-2 border-emerald-900 pb-2">
            <h2 className="text-xl font-bold font-sans text-emerald-950 tracking-wide uppercase">
              Bagian III: Matriks Penilaian 36 Indikator Supervisi
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Rincian skor, sumber bukti autentik, analisis kesenjangan, dan rekomendasi perbaikan
            </p>
          </div>

          <div className="overflow-x-auto font-sans text-xs">
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-2 border border-slate-300 text-center w-12">Kode</th>
                  <th className="p-2 border border-slate-300 w-52">Indikator</th>
                  <th className="p-2 border border-slate-300 text-center w-14">Skor</th>
                  <th className="p-2 border border-slate-300 w-64">Sumber & Bukti Ditemukan</th>
                  <th className="p-2 border border-slate-300">Analisis & Rekomendasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {session.indicators.map((ind) => {
                  const score = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined 
                    ? ind.skorSupervisor 
                    : ind.skorAi;
                  return (
                    <tr key={ind.id} className="hover:bg-slate-50/50">
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold">
                        {ind.id}
                      </td>
                      <td className="p-2 border border-slate-300">
                        <b>{ind.namaIndikator}</b>
                        <div className="text-[10px] text-slate-500 mt-0.5">{ind.statusKeterpenuhan}</div>
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-bold">
                        <span className={`px-1.5 py-0.5 rounded text-[11px] ${
                          score === 4 ? 'bg-emerald-100 text-emerald-800' :
                          score === 3 ? 'bg-teal-100 text-teal-800' :
                          score === 2 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {score}/4
                        </span>
                      </td>
                      <td className="p-2 border border-slate-300 text-[11px] text-slate-700">
                        <b>Sumber:</b> {ind.sumberBukti || 'Bukti belum ditemukan'}<br/>
                        {ind.documentEvidence && (
                          <div className="text-[10px] text-slate-600 mt-0.5 italic">
                            "{ind.documentEvidence.kutipanTeks}"
                          </div>
                        )}
                        {ind.videoEvidence && (
                          <div className="text-[10px] text-purple-900 mt-0.5">
                            <b>Video ({ind.videoEvidence.timestamp}):</b> {ind.videoEvidence.transkrip || ind.videoEvidence.aktivitasTerdeteksi}
                          </div>
                        )}
                      </td>
                      <td className="p-2 border border-slate-300 text-[11px]">
                        <div className="text-slate-800 leading-snug">{ind.alasanSkor}</div>
                        {ind.rekomendasi && (
                          <div className="text-emerald-900 font-medium mt-1 pt-1 border-t border-slate-100 text-[10px]">
                            <b>Saran:</b> {ind.rekomendasi.tindakanDisarankan}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================
            HALAMAN 5: RENCANA TINDAK LANJUT & TANDA TANGAN
            ======================================================== */}
        <div className="space-y-8 pt-6 font-sans">
          <div className="border-b-2 border-emerald-900 pb-2">
            <h2 className="text-xl font-bold text-emerald-950 tracking-wide uppercase">
              Bagian IV: Rencana Tindak Lanjut (RTL) & Pengesahan
            </h2>
            <p className="text-xs text-slate-500">
              Komitmen bersama perbaikan mutu pembelajaran antara guru dan supervisor akademik
            </p>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-2 border border-slate-300 text-center w-20">Prioritas</th>
                  <th className="p-2 border border-slate-300 w-44">Indikator</th>
                  <th className="p-2 border border-slate-300">Tindakan Perbaikan</th>
                  <th className="p-2 border border-slate-300 w-44">Target & Waktu</th>
                  <th className="p-2 border border-slate-300 text-center w-28">Status</th>
                </tr>
              </thead>
              <tbody>
                {session.followUpPlans.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2 border border-slate-300 text-center font-bold text-[10px]">
                      {p.prioritas}
                    </td>
                    <td className="p-2 border border-slate-300 font-semibold">
                      {p.indikator}
                    </td>
                    <td className="p-2 border border-slate-300">
                      {p.tindakanPerbaikan}
                    </td>
                    <td className="p-2 border border-slate-300 text-[11px]">
                      <b>{p.targetPencapaian}</b><br/>
                      <span className="text-slate-500">{p.waktuPelaksanaan}</span>
                    </td>
                    <td className="p-2 border border-slate-300 text-center font-bold text-emerald-800">
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Catatan Supervisor & Catatan Guru */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider">
                Catatan Pembina / Supervisor:
              </h5>
              <p className="text-slate-700 leading-relaxed italic">
                "Secara umum pembelajaran sangat aktif, bermakna, dan kontekstual. Perhatian khusus perlu difokuskan pada kedalaman refleksi metakognitif siswa dan kemandirian alur laboratorium."
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider">
                Komitmen Refleksi Guru Binaan:
              </h5>
              <p className="text-slate-700 leading-relaxed italic">
                "Terima kasih atas bimbingan objektif berbasis evidence ini. Saya berkomitmen menerapkan Tiket Keluar 4F dan membuka opsi otonomi pos lab pada pertemuan siklus berikutnya."
              </p>
            </div>
          </div>

          {/* Ruang Tanda Tangan */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs">
            <div className="space-y-16">
              <div>
                Mengetahui & Mengakui,<br/>
                <b>Guru Mata Pelajaran yang Disupervisi</b>
              </div>
              <div>
                <u><b>{session.profile.namaGuru}</b></u><br/>
                <span>NIP. {session.profile.nipNuptk || '...........................................'}</span>
              </div>
            </div>

            <div className="space-y-16">
              <div>
                {session.profile.madrasahSekolah}, {session.profile.tanggalSupervisi}<br/>
                <b>Supervisor Akademik / Pengawas Madya</b>
              </div>
              <div>
                <u><b>{session.profile.namaSupervisor}</b></u><br/>
                <span>Pengawas Madrasah / Kepala Sekolah</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
