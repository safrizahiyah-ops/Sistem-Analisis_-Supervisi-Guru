import React, { useState } from 'react';
import { IndicatorAnalysis, PriorityLevel, FollowUpPlanItem } from '../types/supervision';
import { Lightbulb, PlusCircle, AlertCircle, ArrowRight, CheckCircle, Filter } from 'lucide-react';

interface RecommendationsViewProps {
  indicators: IndicatorAnalysis[];
  onAddFollowUp: (item: FollowUpPlanItem) => void;
  onOpenEvidence: (indicator: IndicatorAnalysis) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  indicators,
  onAddFollowUp,
  onOpenEvidence
}) => {
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | PriorityLevel>('ALL');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  // Extract all indicators that have recommendations
  const recommendationItems = indicators.filter(ind => ind.rekomendasi !== undefined);

  const filteredItems = recommendationItems.filter(ind => {
    if (priorityFilter !== 'ALL' && ind.rekomendasi?.prioritas !== priorityFilter) {
      return false;
    }
    return true;
  });

  const handleConvertToFollowUp = (ind: IndicatorAnalysis) => {
    if (!ind.rekomendasi) return;

    const newPlan: FollowUpPlanItem = {
      id: `rtl-${Date.now()}-${ind.id.replace('.', '_')}`,
      prioritas: ind.rekomendasi.prioritas,
      indikator: `${ind.id} ${ind.namaIndikator}`,
      kondisiSaatIni: ind.rekomendasi.masalah,
      tindakanPerbaikan: ind.rekomendasi.tindakanDisarankan,
      targetPencapaian: `Perbaikan implementasi indikator ${ind.id}: ${ind.rekomendasi.contohImplementasi}`,
      waktuPelaksanaan: '2 pekan pasca-supervisi',
      status: 'Belum Dimulai'
    };

    onAddFollowUp(newPlan);
    setAddedIds(prev => new Set(prev).add(ind.id));
  };

  const getPriorityBadge = (p: PriorityLevel) => {
    if (p === 'Tinggi') return 'bg-rose-100 text-rose-800 border-rose-300';
    if (p === 'Sedang') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Priority Filter */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Rekomendasi Perbaikan Pembelajaran Praktis & Terarah
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Setiap rekomendasi disusun berbasis evidence riil, terstruktur dari masalah hingga contoh implementasi kelas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-600">Prioritas:</span>
          {(['ALL', 'Tinggi', 'Sedang', 'Rendah'] as Array<'ALL' | PriorityLevel>).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setPriorityFilter(lvl)}
              className={`px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                priorityFilter === lvl
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {lvl === 'ALL' ? 'Semua' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((ind) => {
          const rec = ind.rekomendasi!;
          const isAdded = addedIds.has(ind.id);
          const activeScore = ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined 
            ? ind.skorSupervisor 
            : ind.skorAi;

          return (
            <div 
              key={ind.id}
              className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {ind.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(rec.prioritas)}`}>
                        Prioritas {rec.prioritas}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug pt-1">
                      {ind.namaIndikator}
                    </h4>
                  </div>
                  <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-1 rounded shrink-0">
                    Skor: {activeScore}/4
                  </span>
                </div>

                {/* Structured Breakdown: Masalah, Mengapa Penting, Tindakan, Contoh */}
                <div className="space-y-2.5 text-xs">
                  <div className="bg-rose-50/60 p-2.5 rounded border border-rose-100 text-rose-950">
                    <b className="text-rose-800 block mb-0.5">1. Kesenjangan / Apa yang Belum Terlihat:</b>
                    {rec.masalah}
                  </div>

                  <div className="text-slate-700">
                    <b className="text-slate-900 block mb-0.5">2. Mengapa Aspek Ini Krusial:</b>
                    {rec.mengapaPenting}
                  </div>

                  <div className="bg-emerald-50/70 p-2.5 rounded border border-emerald-200 text-emerald-950 font-medium">
                    <b className="text-emerald-900 block mb-0.5">3. Tindakan Praktis yang Disarankan:</b>
                    {rec.tindakanDisarankan}
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                    <b className="text-slate-900 block mb-0.5">4. Contoh Riil Implementasi Kelas:</b>
                    {rec.contohImplementasi}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => onOpenEvidence(ind)}
                  className="text-slate-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
                >
                  <span>Telusuri Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleConvertToFollowUp(ind)}
                  disabled={isAdded}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors ${
                    isAdded
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sudah di RTL</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Jadikan RTL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
