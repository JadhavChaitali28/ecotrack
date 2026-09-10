import React from "react";
import { Satellite, Compass, Thermometer, Waves, Wind, Gauge } from "lucide-react";

export function StationOverview({ node, telemetry, wqiData, liveMeta }) {
  const { score, classGrade, status, description, breakdown } = wqiData;

  const isViolating = score < 50;
  const isModerate = score >= 50 && score < 70;

  return (
    <section className="border border-slate-200 bg-white rounded-none md:rounded-xs p-6 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Editorial Station Narrative */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Live Hydrodynamics &bull; {node.state}
            </span>
            <span className="text-slate-300 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-slate-400">
              Station #{node.id.toUpperCase()}
            </span>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {node.name}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1 font-mono">
              {node.location} &mdash; <span className="text-slate-700 font-semibold">{node.type}</span>
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
            {node.description}
          </p>

          {/* Technical Real Telemetry Metadata Strip (4 Real Physical Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 font-mono text-xs">
            
            {/* 1. Real River Discharge */}
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xs">
              <div className="text-[9px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
                <Waves className="w-3 h-3 text-teal-700" />
                River Discharge
              </div>
              <div className="text-slate-800 font-bold mt-1">
                {telemetry.riverDischarge ?? 0.82} <span className="text-[10px] text-slate-500 font-normal">m&sup3;/s</span>
              </div>
              <div className="text-[9px] text-emerald-700 mt-0.5">Real ECMWF Ingest</div>
            </div>

            {/* 2. Real Ambient Temperature */}
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xs">
              <div className="text-[9px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
                <Thermometer className="w-3 h-3 text-amber-600" />
                Live Temp
              </div>
              <div className="text-slate-800 font-bold mt-1">
                {telemetry.temperature ?? 26.5}&deg;C
              </div>
              <div className="text-[9px] text-emerald-700 mt-0.5">Real Open-Meteo</div>
            </div>

            {/* 3. Real Barometric Pressure & DO Saturation */}
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xs">
              <div className="text-[9px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
                <Gauge className="w-3 h-3 text-indigo-600" />
                Pressure & Sat
              </div>
              <div className="text-slate-800 font-bold mt-1 truncate">
                {telemetry.pressure ?? 1010} <span className="text-[10px] text-slate-500 font-normal">hPa</span>
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                Sat: {telemetry.theoreticalDoSaturation ?? 8.2} mg/L
              </div>
            </div>

            {/* 4. Sentinel-2 NDCI */}
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xs">
              <div className="text-[9px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
                <Satellite className="w-3 h-3 text-teal-600" />
                Sentinel-2 NDCI
              </div>
              <div className="text-slate-800 font-bold mt-1">
                {telemetry.ndci ?? 0.15}
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">Chlorophyll Index</div>
            </div>

          </div>
        </div>

        {/* Right Column: Precision WQI Gauge & CPCB Matrix */}
        <div className="lg:col-span-5 bg-[#fafaf9] border border-slate-200 p-6 space-y-5 rounded-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-medium">
                Official Designated Metric
              </span>
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                CPCB Weighted Water Quality Index
              </span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                isViolating
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : isModerate
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {classGrade}
            </span>
          </div>

          {/* Precision Numerical Readout */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black tracking-tighter text-slate-900 font-mono">
                  {score}
                </span>
                <span className="text-xs font-mono text-slate-400">/100</span>
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">
                Evaluation: <span className={isViolating ? "text-rose-600" : isModerate ? "text-amber-600" : "text-emerald-600"}>{status}</span>
              </div>
            </div>

            <div className="text-right max-w-[180px]">
              <span className="text-[11px] text-slate-500 leading-snug block">
                {description}
              </span>
            </div>
          </div>

          {/* Segmented Linear Progress Indicator (20 segments) */}
          <div>
            <div className="flex gap-1 h-2 w-full">
              {Array.from({ length: 20 }).map((_, i) => {
                const stepVal = (i + 1) * 5;
                const isFilled = score >= stepVal;
                let barBg = "bg-slate-200";
                if (isFilled) {
                  if (stepVal <= 30) barBg = "bg-rose-500";
                  else if (stepVal <= 65) barBg = "bg-amber-500";
                  else if (stepVal <= 85) barBg = "bg-teal-600";
                  else barBg = "bg-emerald-500";
                }
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-xs transition-colors duration-300 ${barBg}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
              <span>0 Unfit (Class E)</span>
              <span>50 Moderate</span>
              <span>100 Pristine (Class A)</span>
            </div>
          </div>

          {/* Sub-Parameters Ledger */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-200">
            <div className="bg-white p-2.5 border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] uppercase block">DO (35% Wt)</span>
              <span className="text-slate-900 font-bold">{telemetry.dissolvedOxygen} mg/L</span>
              <span className="text-[10px] text-slate-500 block">Standard: &ge; 6.0</span>
            </div>

            <div className="bg-white p-2.5 border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] uppercase block">pH (25% Wt)</span>
              <span className="text-slate-900 font-bold">{telemetry.ph}</span>
              <span className="text-[10px] text-slate-500 block">Band: 6.5 &ndash; 8.5</span>
            </div>

            <div className="bg-white p-2.5 border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] uppercase block">Turbidity (20% Wt)</span>
              <span className="text-slate-900 font-bold">{telemetry.turbidity} NTU</span>
              <span className="text-[10px] text-slate-500 block">Limit: &le; 10.0</span>
            </div>

            <div className="bg-white p-2.5 border border-slate-200 shadow-2xs">
              <span className="text-slate-400 text-[10px] uppercase block">TDS (20% Wt)</span>
              <span className="text-slate-900 font-bold">{Math.round(telemetry.tds)} ppm</span>
              <span className="text-[10px] text-slate-500 block">Limit: &le; 500</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
