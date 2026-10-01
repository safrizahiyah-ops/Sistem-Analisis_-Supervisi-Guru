import React, { useState } from 'react';
import { FollowUpPlanItem, FollowUpStatus, PriorityLevel } from '../types/supervision';
import { 
  ClipboardList, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  X,
  Calendar
} from 'lucide-react';

interface FollowUpPlanViewProps {
  plans: FollowUpPlanItem[];
  onAddPlan: (item: FollowUpPlanItem) => void;
  onUpdateStatus: (id: string, newStatus: FollowUpStatus) => void;
  onDeletePlan: (id: string) => void;
}

export const FollowUpPlanView: React.FC<FollowUpPlanViewProps> = ({
  plans,
  onAddPlan,
  onUpdateStatus,
  onDeletePlan
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [prioritas, setPrioritas] = useState<PriorityLevel>('Tinggi');
  const [indikator, setIndikator] = useState('');
  const [kondisiSaatIni, setKondisiSaatIni] = useState('');
  const [tindakanPerbaikan, setTindakanPerbaikan] = useState('');
  const [targetPencapaian, setTargetPencapaian] = useState('');
  const [waktuPelaksanaan, setWaktuPelaksanaan] = useState('');
  const [penanggungJawab, setPenanggungJawab] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!indikator || !tindakanPerbaikan) return;

    const newItem: FollowUpPlanItem = {
      id: `rtl-${Date.now()}`,
      prioritas,
      indikator,
      kondisiSaatIni: kondisiSaatIni || 'Perlu penguatan implementasi di kelas.',
      tindakanPerbaikan,
      targetPencapaian: targetPencapaian || 'Peningkatan keterpenuhan indikator supervisi.',
      waktuPelaksanaan: waktuPelaksanaan || '2 pekan pasca-supervisi',
      status: 'Belum Dimulai',
      penanggungJawab: penanggungJawab || 'Guru Mata Pelajaran'
    };

    onAddPlan(newItem);
    setIsModalOpen(false);

    // Reset
    setIndikator('');
    setKondisiSaatIni('');
    setTindakanPerbaikan('');
    setTargetPencapaian('');
    setWaktuPelaksanaan('');
    setPenanggungJawab('');
  };

  const getStatusBadge = (status: FollowUpStatus) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
      case 'Dalam Proses':
        return 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getPriorityBadge = (p: PriorityLevel) => {
    if (p === 'Tinggi') return 'bg-rose-100 text-rose-800 border-rose-300';
    if (p === 'Sedang') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Action */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-700" />
            Rencana Tindak Lanjut (RTL) Pasca-Supervisi Akademik
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Komitmen tindak lanjut pembinaan terukur dengan target, lini masa waktu, dan status progres nyata.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tindak Lanjut</span>
        </button>
      </div>

      {/* RTL Interactive Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 w-24 text-center">Prioritas</th>
                <th className="py-3 px-4 w-48">Indikator Fokus</th>
                <th className="py-3 px-4 w-56">Kondisi Saat Ini</th>
                <th className="py-3 px-4 w-60">Tindakan Perbaikan Nyata</th>
                <th className="py-3 px-4 w-52">Target Pencapaian</th>
                <th className="py-3 px-3 w-32">Waktu Target</th>
                <th className="py-3 px-3 w-36 text-center">Status Progres</th>
                <th className="py-3 px-2 w-12 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {plans.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Prioritas */}
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-block ${getPriorityBadge(item.prioritas)}`}>
                      {item.prioritas}
                    </span>
                  </td>

                  {/* Indikator */}
                  <td className="py-3 px-4 font-bold text-slate-900 leading-snug">
                    {item.indikator}
                    {item.penanggungJawab && (
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        PJ: {item.penanggungJawab}
                      </div>
                    )}
                  </td>

                  {/* Kondisi Saat Ini */}
                  <td className="py-3 px-4 text-slate-600 leading-relaxed">
                    {item.kondisiSaatIni}
                  </td>

                  {/* Tindakan Perbaikan */}
                  <td className="py-3 px-4 text-emerald-950 font-medium leading-relaxed bg-emerald-50/20">
                    {item.tindakanPerbaikan}
                  </td>

                  {/* Target Pencapaian */}
                  <td className="py-3 px-4 text-slate-700 leading-relaxed">
                    {item.targetPencapaian}
                  </td>

                  {/* Waktu Pelaksanaan */}
                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.waktuPelaksanaan}
                    </span>
                  </td>

                  {/* Status Progres Selector */}
                  <td className="py-3 px-3 text-center">
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value as FollowUpStatus)}
                      className={`text-xs font-bold py-1 px-2 rounded border cursor-pointer focus:outline-emerald-600 ${getStatusBadge(item.status)}`}
                    >
                      <option value="Belum Dimulai">Belum Dimulai</option>
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>

                  {/* Hapus */}
                  <td className="py-3 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => onDeletePlan(item.id)}
                      title="Hapus Agenda Tindak Lanjut"
                      className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Tindak Lanjut */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Tambah Rencana Tindak Lanjut (RTL)
              </h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tingkat Prioritas:
                  </label>
                  <select
                    value={prioritas}
                    onChange={(e) => setPrioritas(e.target.value as PriorityLevel)}
                    className="w-full p-2 rounded border border-slate-300 font-bold text-xs"
                  >
                    <option value="Tinggi">Tinggi (Mendesak)</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Waktu / Tenggat:
                  </label>
                  <input
                    type="text"
                    value={waktuPelaksanaan}
                    onChange={(e) => setWaktuPelaksanaan(e.target.value)}
                    placeholder="Contoh: Pekan ke-4 Februari 2026"
                    className="w-full p-2 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Indikator / Fokus Supervisi: *
                </label>
                <input
                  type="text"
                  required
                  value={indikator}
                  onChange={(e) => setIndikator(e.target.value)}
                  placeholder="Contoh: 5.2 Refleksi Metakognitif 4 Dimensi"
                  className="w-full p-2 rounded border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kondisi Saat Ini (Kesenjangan):
                </label>
                <textarea
                  value={kondisiSaatIni}
                  onChange={(e) => setKondisiSaatIni(e.target.value)}
                  rows={2}
                  placeholder="Jelaskan kendala atau hal yang belum optimal..."
                  className="w-full p-2 rounded border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tindakan Perbaikan Konkret: *
                </label>
                <textarea
                  required
                  value={tindakanPerbaikan}
                  onChange={(e) => setTindakanPerbaikan(e.target.value)}
                  rows={2}
                  placeholder="Langkah spesifik yang akan dilaksanakan guru..."
                  className="w-full p-2 rounded border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Pencapaian:
                  </label>
                  <input
                    type="text"
                    value={targetPencapaian}
                    onChange={(e) => setTargetPencapaian(e.target.value)}
                    placeholder="Contoh: 100% siswa mengisi lembar refleksi"
                    className="w-full p-2 rounded border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Penanggung Jawab:
                  </label>
                  <input
                    type="text"
                    value={penanggungJawab}
                    onChange={(e) => setPenanggungJawab(e.target.value)}
                    placeholder="Nama Guru / Pembina MGMP"
                    className="w-full p-2 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-xs"
                >
                  Simpan Tindak Lanjut
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
