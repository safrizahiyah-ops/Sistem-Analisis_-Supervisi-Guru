import React, { useState, useEffect } from 'react';
import { SupervisionSession, SavedReportItem } from '../types/supervision';
import { calculateScores } from '../data/indicatorsData';
import { exportToWord, exportToExcel, exportToJson } from '../utils/exportHelpers';
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
  FileText,
  Save,
  FolderArchive,
  Database,
  Trash2,
  Upload,
  Check,
  Brain,
  Scroll,
  Heart,
  Camera,
  Play,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ReportGeneratorViewProps {
  session: SupervisionSession;
  onLoadSavedSession?: (session: SupervisionSession) => void;
}

export const ReportGeneratorView: React.FC<ReportGeneratorViewProps> = ({ 
  session,
  onLoadSavedSession 
}) => {
  const { 
    componentSummaries, 
    overallScore, 
    totalEvaluated, 
    totalSangatTerpenuhi, 
    totalTerpenuhi, 
    totalSebagian, 
    totalBelumTerpenuhi 
  } = calculateScores(session.indicators);

  const [savedReports, setSavedReports] = useState<SavedReportItem[]>([]);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [showArchivePanel, setShowArchivePanel] = useState<boolean>(false);

  // Load saved reports from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('supervision_saved_reports_archive');
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse saved reports from localStorage', e);
    }
  }, []);

  // Save current report to localStorage
  const handleSaveCurrentReport = () => {
    try {
      const newReport: SavedReportItem = {
        id: session.id || `report-${Date.now()}`,
        namaGuru: session.profile.namaGuru,
        mataPelajaran: session.profile.mataPelajaran,
        kelas: session.profile.kelas,
        madrasahSekolah: session.profile.madrasahSekolah,
        tanggalSupervisi: session.profile.tanggalSupervisi,
        jenisSupervisi: session.profile.jenisSupervisi,
        overallScore: overallScore,
        status: session.status || 'Terverifikasi',
        timestamp: new Date().toISOString(),
        sessionData: { ...session, overallScore }
      };

      const existingIndex = savedReports.findIndex(r => r.id === newReport.id);
      let updated: SavedReportItem[];
      if (existingIndex >= 0) {
        updated = [...savedReports];
        updated[existingIndex] = newReport;
      } else {
        updated = [newReport, ...savedReports];
      }

      setSavedReports(updated);
      localStorage.setItem('supervision_saved_reports_archive', JSON.stringify(updated));
      setSaveSuccessNotice(`Laporan atas nama ${session.profile.namaGuru} berhasil disimpan ke basis data lokal!`);
      setTimeout(() => setSaveSuccessNotice(null), 3500);
    } catch (e) {
      alert('Gagal menyimpan laporan ke memori lokal browser.');
    }
  };

  // Delete saved report
  const handleDeleteReport = (id: string, name: string) => {
    if (confirm(`Hapus laporan supervisi "${name}" dari arsip penyimpanan?`)) {
      const updated = savedReports.filter(r => r.id !== id);
      setSavedReports(updated);
      localStorage.setItem('supervision_saved_reports_archive', JSON.stringify(updated));
    }
  };

  // Import JSON report
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.indicators) {
          if (onLoadSavedSession) {
            onLoadSavedSession(parsed);
            alert(`Laporan supervisi ${parsed.profile.namaGuru} berhasil diimpor.`);
          }
        } else {
          alert('Format berkas JSON tidak sesuai struktur data supervisi.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================
          PANEL PENYIMPANAN DATA & UNDUH CEPAT (Hidden during print)
          ======================================================== */}
      <div className="print:hidden space-y-4">
        
        {/* Main Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Pusat Penyimpanan & Ekspor Dokumen</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Laporan Hasil Supervisi Akademik & Video
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Guru: <b className="text-slate-800">{session.profile.namaGuru}</b> ({session.profile.mataPelajaran}) • Skor: <b className="text-emerald-700">{overallScore}%</b>
            </p>
          </div>

          {/* Download & Save Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveCurrentReport}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-4 h-4 text-emerald-200" />
              <span>Simpan Laporan</span>
            </button>

            <button
              type="button"
              onClick={() => setShowArchivePanel(!showArchivePanel)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-300"
            >
              <FolderArchive className="w-4 h-4 text-slate-600" />
              <span>Riwayat Tersimpan ({savedReports.length})</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            <button
              type="button"
              onClick={() => exportToWord(session)}
              className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh Word (.doc)</span>
            </button>

            <button
              type="button"
              onClick={() => exportToExcel(session)}
              className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Unduh Excel (.xls)</span>
            </button>

            <button
              type="button"
              onClick={() => exportToJson(session)}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Database className="w-4 h-4 text-slate-300" />
              <span>Unduh JSON</span>
            </button>
          </div>
        </div>

        {/* Save Notice Banner */}
        {saveSuccessNotice && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{saveSuccessNotice}</span>
          </div>
        )}

        {/* Expandable Archive Management Panel */}
        {showArchivePanel && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FolderArchive className="w-5 h-5 text-emerald-700" />
                <h4 className="font-bold text-slate-900 text-sm">
                  Daftar Berkas Laporan Supervisi Tersimpan di Perangkat Ini
                </h4>
              </div>

              {/* Import JSON input */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Impor Laporan (.json)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJsonFile}
                  className="hidden"
                />
              </label>
            </div>

            {savedReports.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs">
                Belum ada laporan supervisi yang disimpan ke memori browser. Klik tombol <b>"Simpan Laporan"</b> di atas untuk mengarsipkan analisis ini.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {savedReports.map((report) => (
                  <div 
                    key={report.id}
                    className="py-3 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{report.namaGuru}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          {report.overallScore}%
                        </span>
                        <span className="text-[11px] text-slate-500">{report.mataPelajaran} ({report.kelas})</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {report.madrasahSekolah} • Tanggal: {report.tanggalSupervisi} • Disimpan: {new Date(report.timestamp).toLocaleDateString('id-ID')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (onLoadSavedSession && report.sessionData) {
                            onLoadSavedSession(report.sessionData);
                            alert(`Laporan ${report.namaGuru} berhasil dimuat.`);
                          }
                        }}
                        className="px-3 py-1 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                      >
                        Buka Laporan
                      </button>

                      <button
                        type="button"
                        onClick={() => report.sessionData && exportToWord(report.sessionData)}
                        className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600"
                        title="Unduh Word"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => report.sessionData && exportToJson(report.sessionData)}
                        className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600"
                        title="Unduh JSON"
                      >
                        <Database className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteReport(report.id, report.namaGuru)}
                        className="p-1.5 rounded-md hover:bg-rose-100 text-rose-600"
                        title="Hapus dari arsip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ========================================================
          DOKUMEN RESMI SIAP CETAK (Paper Print Simulation)
          ======================================================== */}
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
              Supervisi Akademik, Penjaminan Mutu Madrasah, dan Implementasi Kurikulum Berbasis Cinta (KBC)
            </p>
            <div className="w-40 h-1 bg-amber-500 mx-auto rounded-full mt-3" />
          </div>

          {/* Judul Laporan */}
          <div className="space-y-4 my-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-emerald-950 tracking-tight leading-tight">
              LAPORAN ANALISIS<br/>PEMBELAJARAN GURU
            </h1>
            <p className="text-sm font-sans font-medium text-slate-700 max-w-lg mx-auto leading-relaxed">
              Analisis Komprehensif Perangkat Pembelajaran, Observasi Video Interaktif Berbasis 6 Indikator, Telaah Panca Cinta, Deep Learning, dan Khazanah Turats
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
            HALAMAN 5: ANALISIS POTONGAN ADEGAN VIDEO & PANCA CINTA (KBC)
            ======================================================== */}
        <div className="space-y-6 pt-6 print:break-after-page font-sans text-xs">
          <div className="border-b-2 border-emerald-900 pb-2">
            <h2 className="text-xl font-bold text-emerald-950 tracking-wide uppercase flex items-center gap-2">
              Bagian IV: Analisis Potongan Adegan Video & Penanaman Panca Cinta (KBC)
            </h2>
            <p className="text-xs text-slate-500">
              Dokumentasi potongan adegan visual, teks ucapan yang dilakonkan, dan integrasi Kurikulum Berbasis Cinta (KBC)
            </p>
          </div>

          {/* Ikhtisar Panca Cinta Box */}
          <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-rose-950 text-sm uppercase">
                Evaluasi Penerapan Kurikulum Berbasis Cinta (KBC)
              </h4>
              <span className="bg-rose-600 text-white font-bold px-3 py-0.5 rounded-full text-xs">
                Keterpenuhan KBC: {session.pancaCintaSummary?.persentaseImplementasi || 96}%
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed italic text-[11px]">
              "{session.pancaCintaSummary?.catatanKurikulumBerbasisCinta || 'Seluruh pilar Panca Cinta terintegrasi harmonis dalam pembelajaran.'}"
            </p>

            {/* 5 Pilar Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
              {(session.pancaCintaSummary?.pilarStatus || []).map((p, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-lg border border-rose-200">
                  <div className="font-bold text-slate-800 text-[11px] truncate">{p.pilar}</div>
                  <div className="text-[10px] text-rose-700 font-semibold mt-0.5">
                    {p.frekuensiMuncul}x Muncul ({p.timestampAdegan})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Cards: Adegan Video & Teks Unsur Cinta yang Diucapkan/Dilakonkan */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase border-b border-slate-200 pb-1">
              Rincian Potongan Adegan Visual & Kalimat Cinta yang Dilakonkan:
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {session.timeline.map((seg, idx) => (
                <div 
                  key={seg.id}
                  className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3 print:bg-white print:border-slate-400"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-900 text-white font-mono font-bold text-xs rounded">
                        {seg.timeRange}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {seg.faseKegiatan}: {seg.sceneSnapshot?.title}
                      </span>
                    </div>

                    {seg.pancaCintaKbc && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
                        {seg.pancaCintaKbc.pilar}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Potongan Adegan Visual */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Deskripsi Potongan Adegan Visual:
                      </span>
                      <p className="text-slate-800 leading-snug">
                        {seg.sceneSnapshot?.adeganKunci || seg.deskripsiAktivitas}
                      </p>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                        Kamera: {seg.sceneSnapshot?.fokusKamera} • Tokoh: {seg.sceneSnapshot?.karakterTerlibat}
                      </div>
                    </div>

                    {/* Kalimat Cinta yang Diucapkan */}
                    <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200 space-y-1">
                      <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                        Kalimat / Teks Unsur Cinta yang Diucapkan:
                      </span>
                      {seg.pancaCintaKbc ? (
                        <>
                          <blockquote className="italic text-slate-900 font-semibold border-l-2 border-rose-500 pl-2 leading-relaxed">
                            "{seg.pancaCintaKbc.kalimatUcapanLakon}"
                          </blockquote>
                          <div className="text-[10px] text-slate-700 mt-1">
                            <b>Lakon Tindakan:</b> {seg.pancaCintaKbc.deskripsiLakon}
                          </div>
                          <div className="text-[10px] text-emerald-900 font-medium">
                            <b>Makna KBC:</b> {seg.pancaCintaKbc.maknaPedagogis}
                          </div>
                        </>
                      ) : (
                        <p className="text-slate-700 italic">
                          "{seg.transkripExcerpt}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================
            HALAMAN 6: ANALISIS MENDALAM (DEEP LEARNING)
            ======================================================== */}
        {session.deepLearning && (
          <div className="space-y-6 pt-6 print:break-after-page font-sans text-xs">
            <div className="border-b-2 border-emerald-900 pb-2">
              <h2 className="text-xl font-bold text-emerald-950 tracking-wide uppercase flex items-center gap-2">
                Bagian V: Analisis Mendalam (Deep Learning) & Taksonomi Berpikir
              </h2>
              <p className="text-xs text-slate-500">
                Proporsi Higher-Order Thinking Skills (HOTS), kedalaman metakognisi, dan transfer ke dunia nyata
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Taksonomi Bloom Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm uppercase">
                  Distribusi Taksonomi Bloom Revisi
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5">
                      <span>C1-C2: Mengingat & Memahami</span>
                      <b>{session.deepLearning.bloomLevelDistribution.mengingatMemahami}%</b>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-500 h-full" style={{ width: `${session.deepLearning.bloomLevelDistribution.mengingatMemahami}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-teal-800 mb-0.5">
                      <span>C3: Menerapkan (Applying)</span>
                      <b>{session.deepLearning.bloomLevelDistribution.menerapkan}%</b>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full" style={{ width: `${session.deepLearning.bloomLevelDistribution.menerapkan}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-emerald-800 mb-0.5 font-bold">
                      <span>C4-C5: Menganalisis & Mengevaluasi (HOTS)</span>
                      <b>{session.deepLearning.bloomLevelDistribution.menganalisisMengevaluasi}%</b>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: `${session.deepLearning.bloomLevelDistribution.menganalisisMengevaluasi}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-indigo-800 mb-0.5 font-bold">
                      <span>C6: Mencipta / Kreasi (HOTS)</span>
                      <b>{session.deepLearning.bloomLevelDistribution.menciptaKreasi}%</b>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full" style={{ width: `${session.deepLearning.bloomLevelDistribution.menciptaKreasi}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metakognisi & Agency Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm uppercase">
                  Metakognisi & Student Agency
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Level Metakognisi:</span>
                    <b className="text-amber-800">{session.deepLearning.levelMetakognisi}</b>
                    <span className="text-slate-600"> (Skor: {session.deepLearning.skorKedalamanMetakognisi}/100)</span>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Transfer Pemecahan Masalah Nyata:</span>
                    <p className="text-slate-800">{session.deepLearning.transferBelajarKehidupanNyata}</p>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Kemandirian Santri (Student Agency):</span>
                    <p className="text-slate-800">{session.deepLearning.studentAgencyDanKemandirian}</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-slate-800 italic">
              <b>Catatan Deep Learning:</b> "{session.deepLearning.catatanAnalisisMendalam}"
            </div>
          </div>
        )}

        {/* ========================================================
            HALAMAN 7: KAJIAN AYAT, HADITS, & KITAB TURATS
            ======================================================== */}
        {session.turatsStudy && (
          <div className="space-y-6 pt-6 print:break-after-page font-sans text-xs">
            <div className="border-b-2 border-emerald-900 pb-2">
              <h2 className="text-xl font-bold text-emerald-950 tracking-wide uppercase flex items-center gap-2">
                Bagian VI: Kajian Ayat Al-Qur'an, Hadits Nabawi, & Rujukan Kitab Turats
              </h2>
              <p className="text-xs text-slate-500">
                Landasan normatif dan khazanah intelektual ulama salaf dalam pembinaan guru madrasah
              </p>
            </div>

            {/* Ayat Al-Quran */}
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm uppercase">
                1. Rujukan Ayat Al-Qur'an Al-Karim
              </h4>
              {session.turatsStudy.ayatAlQuran.map((a, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-2 font-serif">
                  <div className="flex justify-between font-bold text-emerald-950 text-sm font-sans">
                    <span>{a.suratAyat}</span>
                  </div>
                  <p className="text-right text-xl text-emerald-950 leading-loose" dir="rtl">
                    {a.teksArab}
                  </p>
                  <blockquote className="text-slate-700 italic border-l-2 border-amber-500 pl-3 font-sans">
                    {a.terjemah}
                  </blockquote>
                  <div className="text-[11px] text-slate-600 font-sans pt-1 border-t border-slate-200">
                    <b>Tafsir Kontekstual & Pedagogis:</b> {a.tafsirKontekstual} ({a.kaitanPedagogis})
                  </div>
                </div>
              ))}
            </div>

            {/* Hadits Nabawi */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-teal-950 text-sm uppercase">
                2. Rujukan Hadits Nabawi
              </h4>
              {session.turatsStudy.haditsNabawi.map((h, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-2 font-serif">
                  <div className="font-bold text-teal-950 text-sm font-sans">
                    {h.perawi}
                  </div>
                  <p className="text-right text-xl text-teal-950 leading-loose" dir="rtl">
                    {h.matanArab}
                  </p>
                  <blockquote className="text-slate-700 italic border-l-2 border-teal-500 pl-3 font-sans">
                    {h.terjemah}
                  </blockquote>
                  <div className="text-[11px] text-slate-600 font-sans pt-1 border-t border-slate-200">
                    <b>Hikmah Tarbiyah:</b> {h.hikmahTarbiyah} ({h.kaitanPedagogis})
                  </div>
                </div>
              ))}
            </div>

            {/* Kitab Turats */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-indigo-950 text-sm uppercase">
                3. Rujukan Kitab Turats Klasik Pendidikan Islam
              </h4>
              {session.turatsStudy.kitabTurats.map((k, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-300 space-y-2 font-serif">
                  <div className="font-bold text-indigo-950 text-sm font-sans">
                    {k.judulKitab} — <span className="font-normal">{k.pengarang} ({k.babKutipan})</span>
                  </div>
                  <p className="text-right text-lg text-slate-900 leading-relaxed" dir="rtl">
                    {k.teksNaskah}
                  </p>
                  <div className="text-[11px] text-slate-700 font-sans">
                    <b>Syarah:</b> {k.syarahPedagogis}
                  </div>
                  <div className="text-[11px] text-indigo-900 font-sans">
                    <b>Implementasi Supervisi:</b> {k.kaitanPedagogis}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-slate-800 font-serif italic text-xs">
              <b>Sintesis Tarbiyah:</b> "{session.turatsStudy.kesimpulanTarbiyahIslamiyah}"
            </div>
          </div>
        )}

        {/* ========================================================
            HALAMAN 8: RENCANA TINDAK LANJUT & TANDA TANGAN
            ======================================================== */}
        <div className="space-y-8 pt-6 font-sans">
          <div className="border-b-2 border-emerald-900 pb-2">
            <h2 className="text-xl font-bold text-emerald-950 tracking-wide uppercase">
              Bagian VII: Rencana Tindak Lanjut (RTL) & Pengesahan
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
                "Secara umum pembelajaran sangat aktif, bermakna, dan kontekstual. Integrasi Panca Cinta (KBC) dan adab saintis muslim tampak sangat hidup dalam interaksi siswa. Terus kembangkan diferensiasi proses dan kemandirian inkuiri."
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider">
                Komitmen Refleksi Guru Binaan:
              </h5>
              <p className="text-slate-700 leading-relaxed italic">
                "Terima kasih atas bimbingan objektif berbasis bukti autentik ini. Saya berkomitmen menerapkan rubrik asesmen mandiri, memperkaya ragam media filter lokal, dan memperluas otonomi penyelidikan pada siklus pembelajaran berikutnya."
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
