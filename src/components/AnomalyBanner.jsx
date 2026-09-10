import React from "react";
import { AlertOctagon, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

export function AnomalyBanner({ anomalyData }) {
  const { detected, severity, vector, description, score, zScores } = anomalyData;

  const isCritical = severity === "CRITICAL";
  const isModerate = severity === "MODERATE";

  return (
    <div
      className={`rounded-2xl p-4 border transition-all duration-500 backdrop-blur-md shadow-lg ${
        isCritical
          ? "bg-rose-950/40 border-rose-500/50 shadow-rose-950/30 text-rose-100"
          : isModerate
          ? "bg-amber-950/40 border-amber-500/50 shadow-amber-950/30 text-amber-100"
          : "bg-emerald-950/30 border-emerald-500/40 text-emerald-100"
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Status & Vector */}
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2.5 rounded-xl mt-0.5 ${
              isCritical
                ? "bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/30"
                : isModerate
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {isCritical ? (
              <AlertOctagon className="w-6 h-6" />
            ) : isModerate ? (
              <ShieldAlert className="w-6 h-6" />
            ) : (
              <CheckCircle2 className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/40 border border-white/10">
                Isolation Forest ML
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isCritical
                    ? "bg-rose-500 text-white"
                    : isModerate
                    ? "bg-amber-500 text-black"
                    : "bg-emerald-500 text-black"
                }`}
              >
                {severity} ANOMALY
              </span>
              <span className="text-xs font-mono text-slate-400">
                Divergence Score: <strong className="text-white">{score}</strong>
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Vector: {vector}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right Z-Scores Metrics Bar */}
        <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-auto justify-end">
          <div className="text-[11px] font-mono bg-black/40 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[9px] uppercase">Z(pH)</span>
              <span className={`font-bold ${Math.abs(Number(zScores.ph)) >= 2 ? "text-rose-400" : "text-slate-200"}`}>
                {zScores.ph > 0 ? `+${zScores.ph}` : zScores.ph}σ
              </span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-slate-400 text-[9px] uppercase">Z(DO)</span>
              <span className={`font-bold ${Number(zScores.dissolvedOxygen) <= -2 ? "text-rose-400" : "text-slate-200"}`}>
                {zScores.dissolvedOxygen > 0 ? `+${zScores.dissolvedOxygen}` : zScores.dissolvedOxygen}σ
              </span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-slate-400 text-[9px] uppercase">Z(Turb)</span>
              <span className={`font-bold ${Math.abs(Number(zScores.turbidity)) >= 2 ? "text-rose-400" : "text-slate-200"}`}>
                {zScores.turbidity > 0 ? `+${zScores.turbidity}` : zScores.turbidity}σ
              </span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-slate-400 text-[9px] uppercase">Z(TDS)</span>
              <span className={`font-bold ${Math.abs(Number(zScores.tds)) >= 2 ? "text-rose-400" : "text-slate-200"}`}>
                {zScores.tds > 0 ? `+${zScores.tds}` : zScores.tds}σ
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
