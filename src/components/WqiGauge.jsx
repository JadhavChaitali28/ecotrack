import React from "react";
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react";

export function WqiGauge({ wqiData, telemetry }) {
  const { score, status, ringColor, badgeBg, breakdown } = wqiData;

  // SVG circular arc calculations
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc represents 240 degrees (leaving bottom open)
  const angleRange = 240;
  const arcLength = (angleRange / 360) * circumference;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Water Quality Index (WQI)
          </h2>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          CPCB Weighted Arithmetic
        </span>
      </div>

      {/* Radial Gauge Center */}
      <div className="relative flex flex-col items-center justify-center my-4">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(30, 41, 59, 0.6)"
            strokeWidth={strokeWidth}
            strokeDasharray={arcLength}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="transform origin-center rotate-[150deg]"
          />
          {/* Active animated meter */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transform origin-center rotate-[150deg] transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text inside gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
            {score}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            / 100 WQI
          </span>
          <div className={`mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeBg} shadow-sm`}>
            {status}
          </div>
        </div>
      </div>

      {/* Parameter Sub-Indices Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <div className="flex justify-between text-slate-400 mb-1">
            <span>DO (35%)</span>
            <span className="font-mono text-slate-200">{telemetry.dissolvedOxygen} mg/L</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${breakdown.doScore}%` }} 
            />
          </div>
        </div>

        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <div className="flex justify-between text-slate-400 mb-1">
            <span>pH (25%)</span>
            <span className="font-mono text-slate-200">{telemetry.ph}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${breakdown.phScore}%` }} 
            />
          </div>
        </div>

        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Turbidity (20%)</span>
            <span className="font-mono text-slate-200">{telemetry.turbidity} NTU</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${breakdown.turbidityScore}%` }} 
            />
          </div>
        </div>

        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <div className="flex justify-between text-slate-400 mb-1">
            <span>TDS (20%)</span>
            <span className="font-mono text-slate-200">{telemetry.tds} ppm</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${breakdown.tdsScore}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
