import React, { useState } from 'react';
import { ComponentSummary, IndicatorAnalysis } from '../types/supervision';

interface RadarChartProps {
  components: ComponentSummary[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ components, size = 380 }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.38;
  const totalVertices = components.length; // 6 components

  // Ring levels: 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (index: number, ratio: number) => {
    const angle = (Math.PI * 2 / totalVertices) * index - Math.PI / 2;
    const x = center + radius * ratio * Math.cos(angle);
    const y = center + radius * ratio * Math.sin(angle);
    return { x, y, angle };
  };

  // Build polygon path for data
  const dataPoints = components.map((c, i) => {
    const ratio = Math.max(0.1, Math.min(1.0, c.persentase / 100));
    return getCoordinates(i, ratio);
  });

  const polygonPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center justify-center p-2 relative select-none">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#047857" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Concentric Polygons / Rings */}
        {levels.map((level, lvlIdx) => {
          const ringPoints = Array.from({ length: totalVertices }).map((_, i) => getCoordinates(i, level));
          const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
          return (
            <g key={lvlIdx}>
              <path
                d={ringPath}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={lvlIdx === 3 ? '1.5' : '1'}
                strokeDasharray={lvlIdx === 3 ? 'none' : '3 3'}
              />
              <text
                x={center + 6}
                y={center - radius * level + 11}
                fontSize="9"
                fill="#94a3b8"
                fontWeight="500"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* Spokes / Axis lines */}
        {components.map((_, i) => {
          const outer = getCoordinates(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              stroke="#e2e8f0"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Filled Area */}
        <path
          d={polygonPath}
          fill="url(#radarGlow)"
          stroke="#059669"
          strokeWidth="2.5"
          filter="url(#shadow)"
          className="transition-all duration-300"
        />

        {/* Data Vertices / Circles */}
        {dataPoints.map((p, i) => {
          const comp = components[i];
          const isHovered = hoveredIdx === i;
          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 7 : 5}
                fill="#ffffff"
                stroke="#047857"
                strokeWidth={isHovered ? 3 : 2.5}
                className="transition-all duration-200"
              />
              {/* Tooltip on active point */}
              {isHovered && (
                <g>
                  <rect
                    x={p.x - 45}
                    y={p.y - 32}
                    width="90"
                    height="24"
                    rx="4"
                    fill="#0f172a"
                    opacity="0.9"
                  />
                  <text
                    x={p.x}
                    y={p.y - 16}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {comp.persentase}% ({comp.skorRataRata}/4)
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Axis Labels */}
        {components.map((comp, i) => {
          const outer = getCoordinates(i, 1.22);
          const isHovered = hoveredIdx === i;
          
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (outer.x < center - 30) textAnchor = 'end';
          else if (outer.x > center + 30) textAnchor = 'start';

          const shortNames = [
            '1. Bermakna',
            '2. Inovatif',
            '3. Berdiferensiasi',
            '4. Berpusat Siswa',
            '5. Reflektif',
            '6. Asesmen Autentik'
          ];

          return (
            <g 
              key={i} 
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <text
                x={outer.x}
                y={outer.y}
                textAnchor={textAnchor}
                fontSize={isHovered ? '12' : '11'}
                fontWeight={isHovered ? 'bold' : '600'}
                fill={isHovered ? '#047857' : '#334155'}
                className="transition-all duration-150"
              >
                {shortNames[i]}
              </text>
              <text
                x={outer.x}
                y={outer.y + 14}
                textAnchor={textAnchor}
                fontSize="10"
                fontWeight="bold"
                fill={comp.persentase >= 80 ? '#059669' : comp.persentase >= 70 ? '#0284c7' : '#d97706'}
              >
                {comp.persentase}%
              </text>
            </g>
          );
        })}
      </svg>
      <div className="text-xs text-slate-600 mt-1 text-center">
        Profil radar 6 dimensi supervisi akademik guru
      </div>
    </div>
  );
};

interface BarChartProps {
  components: ComponentSummary[];
}

export const ComponentBarChart: React.FC<BarChartProps> = ({ components }) => {
  return (
    <div className="space-y-4 w-full">
      {components.map((comp, idx) => {
        const getBarColor = (pct: number) => {
          if (pct >= 80) return 'from-emerald-500 to-emerald-600';
          if (pct >= 70) return 'from-teal-500 to-teal-600';
          if (pct >= 60) return 'from-amber-500 to-amber-600';
          return 'from-rose-500 to-rose-600';
        };

        const getBadgeStyle = (pct: number) => {
          if (pct >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (pct >= 70) return 'bg-teal-50 text-teal-700 border-teal-200';
          if (pct >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
          return 'bg-rose-50 text-rose-700 border-rose-200';
        };

        return (
          <div key={comp.id} className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 inline-flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span>{comp.nama}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono text-[11px]">
                  {comp.skorRataRata}/4.00
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-xs border ${getBadgeStyle(comp.persentase)}`}>
                  {comp.persentase}%
                </span>
              </div>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getBarColor(comp.persentase)} transition-all duration-500`}
                style={{ width: `${comp.persentase}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500">
              <span>{comp.jumlahIndikatorDinilai} dari 6 indikator dinilai</span>
              <span>{comp.indikatorKuat.length} indikator kuat / {comp.indikatorPerluPerbaikan.length} perlu penguatan</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface HeatmapProps {
  indicators: IndicatorAnalysis[];
  onSelectIndicator?: (indicatorId: string) => void;
}

export const IndicatorHeatmap: React.FC<HeatmapProps> = ({ indicators, onSelectIndicator }) => {
  const getCellBg = (score: number | string) => {
    if (score === 'N/A') return 'bg-slate-100 text-slate-400 border-slate-300';
    if (score === 4) return 'bg-emerald-600 text-white border-emerald-700';
    if (score === 3) return 'bg-emerald-400 text-slate-900 border-emerald-500';
    if (score === 2) return 'bg-amber-400 text-amber-950 border-amber-500';
    return 'bg-rose-500 text-white border-rose-600';
  };

  const getStatusLabel = (score: number | string) => {
    if (score === 'N/A') return 'N/A';
    if (score === 4) return 'Sangat Terpenuhi (4/4)';
    if (score === 3) return 'Terpenuhi (3/4)';
    if (score === 2) return 'Sebagian (2/4)';
    return 'Belum Terpenuhi (1/4)';
  };

  const componentNames = [
    '1. Bermakna',
    '2. Inovatif',
    '3. Berdiferensiasi',
    '4. Berpusat Siswa',
    '5. Reflektif',
    '6. Asesmen'
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[620px]">
        {/* Heatmap Header */}
        <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-semibold text-slate-600">
          <div className="text-left pl-2">Komponen</div>
          <div>Sub .1</div>
          <div>Sub .2</div>
          <div>Sub .3</div>
          <div>Sub .4</div>
          <div>Sub .5</div>
          <div>Sub .6</div>
        </div>

        {/* Heatmap Rows */}
        {[1, 2, 3, 4, 5, 6].map((compNum) => {
          const compIndicators = indicators.filter(ind => ind.componentId === compNum);
          return (
            <div key={compNum} className="grid grid-cols-7 gap-1.5 mb-2 items-center">
              <div className="text-xs font-bold text-slate-700 pl-2 truncate" title={componentNames[compNum - 1]}>
                {componentNames[compNum - 1]}
              </div>
              {[1, 2, 3, 4, 5, 6].map((subNum) => {
                const indId = `${compNum}.${subNum}`;
                const ind = compIndicators.find(i => i.id === indId);
                const activeScore = ind ? (ind.diverifikasiSupervisor && ind.skorSupervisor !== undefined ? ind.skorSupervisor : ind.skorAi) : 1;

                return (
                  <button
                    key={indId}
                    type="button"
                    onClick={() => onSelectIndicator && onSelectIndicator(indId)}
                    title={`${indId} ${ind?.namaIndikator || ''}\nSkor: ${getStatusLabel(activeScore)}`}
                    className={`h-11 rounded border flex flex-col items-center justify-center font-bold text-xs shadow-xs transition-all hover:scale-105 hover:shadow-md cursor-pointer ${getCellBg(activeScore)}`}
                  >
                    <span className="text-[10px] opacity-80">{indId}</span>
                    <span className="text-sm font-black">{activeScore}</span>
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-200 text-xs">
          <span className="font-semibold text-slate-600">Keterangan:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-700 inline-block" />
            <span>Skor 4 (Sangat Terpenuhi)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-400 border border-emerald-500 inline-block" />
            <span>Skor 3 (Terpenuhi)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-500 inline-block" />
            <span>Skor 2 (Sebagian)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-500 border border-rose-600 inline-block" />
            <span>Skor 1 (Belum Terpenuhi)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300 inline-block" />
            <span>N/A (Tidak Dinilai)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
