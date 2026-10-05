import React, { useState } from 'react';
import { TuratsStudy } from '../types/supervision';
import { 
  BookOpen, 
  Sparkles, 
  Scroll, 
  Quote, 
  GraduationCap, 
  CheckCircle, 
  Award, 
  Bookmark, 
  Copy, 
  Check,
  Search,
  Filter
} from 'lucide-react';

interface TuratsStudyViewProps {
  turatsStudy?: TuratsStudy;
}

export const TuratsStudyView: React.FC<TuratsStudyViewProps> = ({ turatsStudy }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'AYAT' | 'HADITS' | 'TURATS'>('ALL');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const study = turatsStudy;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!study) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        Data kajian ayat, hadits, dan kitab turats belum tersedia.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card with Islamic Aesthetics */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-2xl p-6 text-white shadow-xl border border-amber-500/30 relative overflow-hidden">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute top-0 right-0 p-8 text-amber-300/10 font-serif text-8xl select-none pointer-events-none">
          ﷽
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Scroll className="w-4 h-4 text-amber-300" />
            <span>Integrasi Nilai Qur'ani, Nabawi, & Khazanah Intelektual Islam</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
            Kajian Ayat Al-Qur'an, Hadits Nabawi, & Kitab Turats Pendidikan
          </h2>

          <p className="text-sm text-emerald-100/90 leading-relaxed font-sans">
            Landasan teologis dan epistemologis tarbiyah Islamiyah yang mengokohkan analisis 6 komponen supervisi akademik, Kurikulum Berbasis Cinta (KBC), adab penuntut ilmu, serta etos guru madrasah.
          </p>
        </div>

        {/* Tab Selector Filter */}
        <div className="mt-6 pt-4 border-t border-emerald-800/60 flex flex-wrap items-center gap-2 relative z-10 font-sans text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'ALL'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            Semua Rujukan ({study.ayatAlQuran.length + study.haditsNabawi.length + study.kitabTurats.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('AYAT')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'AYAT'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            Ayat Al-Qur'an ({study.ayatAlQuran.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('HADITS')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'HADITS'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            Hadits Nabawi ({study.haditsNabawi.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('TURATS')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'TURATS'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
            }`}
          >
            Kitab Turats Klasik ({study.kitabTurats.length})
          </button>
        </div>
      </div>

      {/* Bagian 1: Ayat-Ayat Al-Qur'an */}
      {(activeTab === 'ALL' || activeTab === 'AYAT') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-emerald-900/10 pb-2">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <h3 className="font-bold text-slate-900 text-lg">
              I. Ayat-Ayat Al-Qur'an Al-Karim (Tadabbur Pedagogis)
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {study.ayatAlQuran.map((ayat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-emerald-950 text-base">
                      {ayat.suratAyat}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(`${ayat.suratAyat}\n${ayat.teksArab}\n${ayat.terjemah}`, `ayat-${idx}`)}
                    className="text-xs text-slate-500 hover:text-emerald-800 flex items-center gap-1 font-medium bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                  >
                    {copiedIndex === `ayat-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Ayat</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Teks Naskah Arab */}
                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/80 text-right">
                  <p className="font-serif text-2xl sm:text-3xl text-emerald-950 leading-loose tracking-wide" dir="rtl">
                    {ayat.teksArab}
                  </p>
                </div>

                {/* Terjemah */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Terjemah Resmi Kemenag RI:
                  </span>
                  <blockquote className="text-xs sm:text-sm text-slate-800 italic leading-relaxed pl-3 border-l-2 border-amber-500 font-serif">
                    {ayat.terjemah}
                  </blockquote>
                </div>

                {/* Tafsir & Kaitan Pedagogis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">
                      Tafsir Kontekstual Pembelajaran:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {ayat.tafsirKontekstual}
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900 block">
                      Kaitan dengan Supervisi & Panca Cinta:
                    </span>
                    <p className="text-emerald-950 leading-relaxed font-medium">
                      {ayat.kaitanPedagogis}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bagian 2: Hadits Nabawi */}
      {(activeTab === 'ALL' || activeTab === 'HADITS') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-teal-900/10 pb-2">
            <Bookmark className="w-5 h-5 text-teal-800" />
            <h3 className="font-bold text-slate-900 text-lg">
              II. Hadits Nabawi (Kaifiyyah Ta'lim & Adab Tarbiyah)
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {study.haditsNabawi.map((hadits, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-teal-200 p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-teal-950 text-base">
                      {hadits.perawi}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(`${hadits.perawi}\n${hadits.matanArab}\n${hadits.terjemah}`, `hadits-${idx}`)}
                    className="text-xs text-slate-500 hover:text-teal-800 flex items-center gap-1 font-medium bg-slate-50 hover:bg-teal-50 px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                  >
                    {copiedIndex === `hadits-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-700" />
                        <span className="text-teal-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Hadits</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Matan Arab */}
                <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-100/80 text-right">
                  <p className="font-serif text-2xl sm:text-3xl text-teal-950 leading-loose tracking-wide" dir="rtl">
                    {hadits.matanArab}
                  </p>
                </div>

                {/* Terjemah */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Terjemah:
                  </span>
                  <blockquote className="text-xs sm:text-sm text-slate-800 italic leading-relaxed pl-3 border-l-2 border-teal-600 font-serif">
                    {hadits.terjemah}
                  </blockquote>
                </div>

                {/* Hikmah Tarbiyah & Kaitan Supervisi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">
                      Hikmah Tarbiyah Nabawiyyah:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {hadits.hikmahTarbiyah}
                    </p>
                  </div>

                  <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-200 space-y-1">
                    <span className="font-bold text-teal-900 block">
                      Aplikasi dalam Supervisi Pembelajaran:
                    </span>
                    <p className="text-teal-950 leading-relaxed font-medium">
                      {hadits.kaitanPedagogis}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bagian 3: Kitab Turats Klasik */}
      {(activeTab === 'ALL' || activeTab === 'TURATS') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-indigo-900/10 pb-2">
            <GraduationCap className="w-5 h-5 text-indigo-800" />
            <h3 className="font-bold text-slate-900 text-lg">
              III. Rujukan Khazanah Kitab Turats Pendidikan Islam
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {study.kitabTurats.map((kitab, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-bold text-indigo-950 text-base">
                      {kitab.judulKitab}
                    </h4>
                    <div className="text-xs text-slate-500 font-serif">
                      Karya: <b>{kitab.pengarang}</b> • Bab: <i>{kitab.babKutipan}</i>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(`${kitab.judulKitab} (${kitab.pengarang})\n${kitab.teksNaskah}\n${kitab.syarahPedagogis}`, `turats-${idx}`)}
                    className="text-xs text-slate-500 hover:text-indigo-800 flex items-center gap-1 font-medium bg-slate-50 hover:bg-indigo-50 px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                  >
                    {copiedIndex === `turats-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-indigo-700" />
                        <span className="text-indigo-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Turats</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Teks Naskah Asli Arab */}
                <div className="p-4 rounded-xl bg-amber-50/30 border border-amber-200/60 text-right">
                  <p className="font-serif text-xl sm:text-2xl text-slate-900 leading-relaxed" dir="rtl">
                    {kitab.teksNaskah}
                  </p>
                </div>

                {/* Syarah & Kaitan Pedagogis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-slate-900 block">
                      Syarah Konsep Tarbiyah:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-serif">
                      {kitab.syarahPedagogis}
                    </p>
                  </div>

                  <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 space-y-1.5">
                    <span className="font-bold text-indigo-950 block">
                      Relevansi dengan Indikator Kurikulum Modern:
                    </span>
                    <p className="text-indigo-950 leading-relaxed font-medium">
                      {kitab.kaitanPedagogis}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kesimpulan Sintesis Tarbiyah */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-2xl p-6 shadow-md border border-emerald-700/50 space-y-3">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Sintesis Tarbiyah Islamiyah & Penjaminan Mutu Guru
        </div>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-serif">
          "{study.kesimpulanTarbiyahIslamiyah}"
        </p>
      </div>

    </div>
  );
};
