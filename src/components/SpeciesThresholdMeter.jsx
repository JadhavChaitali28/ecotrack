import React from "react";
import { Fish, AlertCircle, HeartPulse, Sparkles } from "lucide-react";

export function SpeciesThresholdMeter({ species }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Indian Bio-Indicator Vitality Index
          </h2>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          Ecological Stress Thresholds
        </span>
      </div>

      {/* Species Cards List */}
      <div className="space-y-4 my-3">
        {species.map((sp) => (
          <div
            key={sp.id}
            className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="flex items-center gap-2">
                  <Fish className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-slate-100">{sp.name}</h4>
                </div>
                <p className="text-[11px] italic text-slate-400 font-mono pl-6">
                  {sp.scientificName}
                </p>
              </div>

              <div className="text-right">
                <span className={`text-xs font-bold ${sp.statusColor}`}>
                  {sp.status}
                </span>
                <div className="text-xs font-mono font-bold text-white">
                  {sp.vitalityScore}% <span className="text-[10px] font-normal text-slate-400">vitality</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden my-2">
              <div
                className={`h-full rounded-full transition-all duration-700 ${sp.barColor}`}
                style={{ width: `${sp.vitalityScore}%` }}
              />
            </div>

            {/* Threshold limits and physiological note */}
            <div className="flex items-start gap-1.5 text-[11px] text-slate-400 mt-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/40">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <span className="font-semibold text-slate-300">Min DO:</span> {sp.minDO} mg/L |{" "}
                <span className="font-semibold text-slate-300">pH:</span> {sp.optimalPh[0]}–{sp.optimalPh[1]} —{" "}
                <span className="text-slate-300">{sp.note}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[10px] text-slate-500 font-mono border-t border-slate-800/80 text-center">
        CPCB & Wildlife Institute of India (WII) Aquatic Bio-Assessment Guidelines
      </div>
    </div>
  );
}
