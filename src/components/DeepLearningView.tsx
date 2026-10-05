import React from 'react';
import { DeepLearningAnalysis } from '../types/supervision';
import { 
  Brain, 
  Lightbulb, 
  Compass, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Smile, 
  Zap,
  Target,
  FileText,
  Printer
} from 'lucide-react';

interface DeepLearningViewProps {
  deepLearning?: DeepLearningAnalysis;
  overallScore: number;
}

export const DeepLearningView: React.FC<DeepLearningViewProps> = ({ 
  deepLearning, 
  overallScore 
}) => {
  const data: DeepLearningAnalysis = deepLearning || {
    bloomLevelDistribution: {
      mengingatMemahami: 18,
      menerapkan: 27,
      menganalisisMengevaluasi: 38,
      menciptaKreasi: 17
    },
    skorKedalamanMetakognisi: 85,
    levelMetakognisi: 'Tinggi (Reflektif-Strategis)',
    transferBelajarKehidupanNyata: 'Siswa memecahkan masalah pencemaran kolam madrasah dan merancang biofilter air menggunakan material lokal nusantara.',
    studentAgencyDanKemandirian: 'Siswa aktif memimpin penyelidikan mikroskop, membagi peran kelompok mandiri, dan melakukan penilaian sejawat secara objektif.',
    catatanAnalisisMendalam: 'Pembelajaran telah melampaui hafalan tekstual (surface learning), bergerak dinamis menuju pemahaman mendalam (deep learning), berpikir kritis tingkat tinggi (HOTS), serta internalisasi nilai adab saintis muslim.'
  };

  const hotsTotal = data.bloomLevelDistribution.menganalisisMengevaluasi + data.bloomLevelDistribution.menciptaKreasi;

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Brain className="w-4 h-4 text-emerald-300" />
              <span>Analisis Pedagogik Tingkat Tinggi (Deep Learning & Metakognisi)</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Telaah Mendalam Kualitas Pembelajaran (Deep Learning)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Mengevaluasi kedalaman proses berpikir siswa (Taksonomi Bloom Revisi), kemandirian belajar (Student Agency), metakognisi, serta transfer pengetahuan ke pemecahan masalah dunia nyata.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center min-w-[140px]">
            <div className="text-xs text-emerald-200 font-medium uppercase tracking-wider">Proporsi HOTS</div>
            <div className="text-3xl font-black text-amber-300 mt-1">{hotsTotal}%</div>
            <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-semibold">
              Tingkat Tinggi (C4 - C6)
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 3 Pilar Deep Learning (Mindful, Meaningful, Joyful) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Mindful Learning */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
              Mindful Learning
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Kesadaran & Kehadiran Utuh</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Siswa fokus secara sadar (mindful) pada eksperimen sains, mengamati pergerakan mikroskop dengan ketelitian tinggi dan rasa kagum (tadabbur alam).
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Fokus Perhatian:</span>
            <span className="font-bold text-emerald-700">92% Terjaga</span>
          </div>
        </div>

        {/* Meaningful Learning */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Meaningful Learning
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Pembelajaran Bermakna</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Materi tidak sekadar dihafalkan, melainkan dihubungkan dengan masalah riil air kolam madrasah dan krisis pencemaran air lingkungan sekitar.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Relevansi Kontekstual:</span>
            <span className="font-bold text-emerald-700">Sangat Kuat</span>
          </div>
        </div>

        {/* Joyful Learning */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
              <Smile className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Joyful Learning
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Suasana Menyenangkan & Kasih Sayang</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Interaksi guru-siswa hangat tanpa intimidasi, santri bersemangat mencoba mikroskop Wi-Fi, dan saling bertepuk tangan saat presentasi kelompok.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Iklim Emosional Kelas:</span>
            <span className="font-bold text-amber-700">Aman & Menginspirasi</span>
          </div>
        </div>

      </div>

      {/* Main Section: Bloom Taxonomy Breakdown & Metacognition Depth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bloom's Revised Taxonomy Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">
                Distribusi Tingkat Berpikir (Taksonomi Bloom)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">Revisi Anderson & Krathwohl</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Perbandingan proporsi aktivitas berpikir yang diamati selama observasi perangkat dan cuplikan video pembelajaran:
          </p>

          <div className="space-y-4">
            
            {/* C1 - C2 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">
                  C1 - C2: Mengingat & Memahami (Remembering & Understanding)
                </span>
                <span className="font-bold text-slate-900 font-mono">
                  {data.bloomLevelDistribution.mengingatMemahami}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-slate-400 rounded-full transition-all duration-500" 
                  style={{ width: `${data.bloomLevelDistribution.mengingatMemahami}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Definisi komponen ekosistem biotik/abiotik & pengenalan anatomi mikroskop.
              </div>
            </div>

            {/* C3 */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-teal-800">
                  C3: Menerapkan (Applying)
                </span>
                <span className="font-bold text-teal-800 font-mono">
                  {data.bloomLevelDistribution.menerapkan}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                  style={{ width: `${data.bloomLevelDistribution.menerapkan}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Mengoperasikan mikroskop digital, mengukur pH air dengan kertas lakmus dan pH meter.
              </div>
            </div>

            {/* C4 - C5 (HOTS) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-800">
                  C4 - C5: Menganalisis & Mengevaluasi (Analyzing & Evaluating) • HOTS
                </span>
                <span className="font-bold text-emerald-800 font-mono">
                  {data.bloomLevelDistribution.menganalisisMengevaluasi}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                  style={{ width: `${data.bloomLevelDistribution.menganalisisMengevaluasi}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Menguji hubungan eutrofikasi dengan penurunan populasi ikan, membandingkan efektivitas variasi media filter.
              </div>
            </div>

            {/* C6 (HOTS) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-indigo-800">
                  C6: Mencipta / Kreasi (Creating) • HOTS
                </span>
                <span className="font-bold text-indigo-800 font-mono">
                  {data.bloomLevelDistribution.menciptaKreasi}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                  style={{ width: `${data.bloomLevelDistribution.menciptaKreasi}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Merancang prototipe biofilter air bertingkat dengan material arang batok kelapa lokal dan tanaman eceng gondok.
              </div>
            </div>

          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <b>Kesimpulan Taksonomi:</b> Dominasi proses berpikir berada pada level <b>C4 (Menganalisis)</b> dan <b>C3 (Menerapkan)</b>, mengindikasikan pembelajaran inkuiri saintifik yang sangat sehat dan tidak terjebak pada hafalan dangkal.
            </div>
          </div>
        </div>

        {/* Metacognition & Student Agency */}
        <div className="space-y-6">
          
          {/* Metacognition Depth Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Kedalaman Metakognisi Siswa
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                {data.levelMetakognisi}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl font-black text-amber-700">{data.skorKedalamanMetakognisi}</span>
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Skor / 100</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-900">
                  Kemampuan Berpikir tentang Cara Berpikir (Thinking About Thinking)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Siswa mampu memonitor kesalahannya sendiri saat pembuatan preparat, menyadari mengapa hasil pengamatan mikroskop sebelumnya buram, dan memperbaiki posisi cermin cahaya secara otonom.
                </p>
              </div>
            </div>

            {/* Metacognitive 3-Stage Indicator */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800 block">1. Planning</span>
                <span className="text-[10px] text-emerald-700 font-medium">Merancang langkah kerja sebelum memulai</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800 block">2. Monitoring</span>
                <span className="text-[10px] text-emerald-700 font-medium">Memeriksa kesesuaian data pH berkala</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-800 block">3. Evaluating</span>
                <span className="text-[10px] text-emerald-700 font-medium">Menilai kekuatan desain filter kelompok</span>
              </div>
            </div>
          </div>

          {/* Student Agency Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-base">
                Kemandirian Belajar & Student Agency
              </h3>
            </div>
            <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs text-indigo-950 leading-relaxed">
              <b>Karakteristik Otonomi Santri:</b> {data.studentAgencyDanKemandirian}
            </div>
            <div className="text-xs text-slate-600 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span><b>Voice:</b> Siswa leluasa mengajukan hipotesis unik mengenai penyebab kematian mikroorganisme air.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span><b>Choice:</b> Siswa bebas memilih bentuk media presentasi akhir (diagram alir, infografis, atau narasi lisan).</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span><b>Ownership:</b> Siswa memiliki rasa kepemilikan tinggi terhadap keberhasilan purwarupa filter air kelompoknya.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Transfer of Knowledge to Real World */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-5 h-5 text-teal-700" />
          <h3 className="font-bold text-slate-900 text-base">
            Transfer Belajar ke Kehidupan Nyata (Real-World Application)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Konteks Masalah yang Dipecahkan:
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {data.transferBelajarKehidupanNyata}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Dampak Bagi Pembentukan Karakter:
            </span>
            <p className="text-emerald-950 leading-relaxed font-medium">
              Santri menyadari bahwa ilmu sains biologi bukan sekadar angka di lembar ujian, melainkan instrumen ibadah untuk merawat kelestarian lingkungan madrasah dan kemaslahatan umat manusia.
            </p>
          </div>
        </div>

        {/* Supervisor Summary Box */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Catatan Komprehensif Supervisor Akademik:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{data.catatanAnalisisMendalam}"
          </p>
        </div>
      </div>

    </div>
  );
};
