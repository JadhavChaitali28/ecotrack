import React from "react";

export function MultivariateAnomalyMatrix({ anomalyData }) {
  const { detected, severity, vector, primaryDriver, score, confidence, zScores } = anomalyData;

  const isCritical = severity === "CRITICAL";
  const isElevated = severity === "ELEVATED";

  const renderZScoreBar = (label, valStr) => {
    const val = parseFloat(valStr);
    const isExceeded = Math.abs(val) >= 2.0;
    const normalizedPercent = Math.max(0, Math.min(100, ((val + 4) / 8) * 100));

    return (
      <div className="space-y-1 font-mono text-xs">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-slate-600">{label}</span>
          <span className={`font-bold ${isExceeded ? "text-rose-600" : "text-slate-900"}`}>
            {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}&sigma;
          </span>
        </div>

        {/* Bipolar Scale (-4 sigma to +4 sigma with center zero mark) */}
        <div className="relative h-2 w-full bg-slate-100 border border-slate-200 rounded-xs overflow-hidden">
          {/* Center 0 sigma tick */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400 z-10" />
          
          {/* Deviation bar */}
          <div
            className={`absolute top-0 bottom-0 transition-all duration-300 ${
              isExceeded ? "bg-rose-500" : "bg-teal-600"
            }`}
            style={{
              left: val >= 0 ? "50%" : `${normalizedPercent}%`,
              width: `${Math.abs(val / 8) * 100}%`,
            }}
          />
        </div>

        <div className="flex justify-between text-[9px] text-slate-400">
          <span>-4&sigma;</span>
          <span>0 (Nominal)</span>
          <span>+4&sigma;</span>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Top Banner Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xs border flex items-center justify-center font-mono text-xs font-bold ${
              isCritical
                ? "border-rose-300 bg-rose-50 text-rose-700"
                : isElevated
                ? "border-amber-300 bg-amber-50 text-amber-700"
                : "border-emerald-300 bg-emerald-50 text-emerald-700"
            }`}
          >
            {isCritical ? "!!" : isElevated ? "!" : "OK"}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                Machine Learning Inversion
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-[10px] font-mono text-slate-400">
                Confidence: {confidence}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {vector}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">Divergence Magnitude</span>
            <span className="text-sm font-bold text-slate-800">{score} / 1.00</span>
          </div>
          <span
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border ${
              isCritical
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : isElevated
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            {severity}
          </span>
        </div>
      </div>

      {/* Analytical Detail & Z-Score Deviation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[11px] font-mono uppercase text-slate-500 tracking-wider block font-semibold">
            Primary Chemical Driver
          </span>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {primaryDriver}. Continuous multidimensional clustering isolates divergence in ion flux exceeding 95th percentile confidence boundaries.
          </p>
          <div className="pt-2 text-[10px] font-mono text-slate-400 space-y-1">
            <div>ALGORITHM: Ensemble Isolation Forest (iForest-Aquatics)</div>
            <div>TRAINED ON: CPCB National River Quality Baseline 2018&ndash;2025</div>
          </div>
        </div>

        {/* 4 Z-Score Deviation Gauges */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderZScoreBar("pH Hydronium Ion (Z-pH)", zScores.ph)}
          {renderZScoreBar("Dissolved Oxygen Sag (Z-DO)", zScores.dissolvedOxygen)}
          {renderZScoreBar("Turbid Matter (Z-Turb)", zScores.turbidity)}
          {renderZScoreBar("Solute Electrolytes (Z-TDS)", zScores.tds)}
        </div>
      </div>
    </div>
  );
}
