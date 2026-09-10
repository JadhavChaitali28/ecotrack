import React from "react";
import { Sliders, RotateCcw, Zap, AlertTriangle, Droplets, Sparkles } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/waterNodes";

export function CalibrationSandbox({
  telemetry,
  onChangeTelemetry,
  onResetTelemetry,
  selectedNode,
}) {
  const handleSliderChange = (param, value) => {
    onChangeTelemetry({
      ...telemetry,
      [param]: parseFloat(value),
    });
  };

  const applyPreset = (presetKey) => {
    const preset = PRESET_SCENARIOS[presetKey];
    if (preset) {
      onChangeTelemetry({
        ...telemetry,
        ph: preset.ph,
        dissolvedOxygen: preset.dissolvedOxygen,
        turbidity: preset.turbidity,
        tds: preset.tds,
      });
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Judge Sandbox & Telemetry Calibration
          </h2>
        </div>
        <button
          onClick={onResetTelemetry}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          title="Reset to selected station's real-time baseline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Node</span>
        </button>
      </div>

      {/* Scenario Presets Bar */}
      <div className="my-3">
        <label className="text-[11px] font-mono text-slate-400 block mb-2 uppercase tracking-wider">
          Simulated Scenario Presets:
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => applyPreset("chemicalSpill")}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 text-rose-200 transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 group-hover:text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Chemical Spill</span>
            </div>
            <span className="text-[10px] text-rose-300/70 mt-0.5">Acid + Anoxia</span>
          </button>

          <button
            onClick={() => applyPreset("algalBloom")}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-200 transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <Droplets className="w-3.5 h-3.5" />
              <span>Algal Bloom</span>
            </div>
            <span className="text-[10px] text-amber-300/70 mt-0.5">Eutrophic pH 9.3</span>
          </button>

          <button
            onClick={() => applyPreset("pristine")}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-200 transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pristine Baseline</span>
            </div>
            <span className="text-[10px] text-emerald-300/70 mt-0.5">Class A Quality</span>
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        {/* pH Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium text-slate-300">Water Acidity / Alkalinity (pH)</span>
            <span className="font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {telemetry.ph.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="3.0"
            max="11.5"
            step="0.1"
            value={telemetry.ph}
            onChange={(e) => handleSliderChange("ph", e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span>3.0 (Acidic)</span>
            <span className="text-emerald-500">7.0 Ideal</span>
            <span>11.5 (Alkaline)</span>
          </div>
        </div>

        {/* Dissolved Oxygen Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium text-slate-300">Dissolved Oxygen (DO)</span>
            <span className="font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {telemetry.dissolvedOxygen.toFixed(1)} mg/L
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="14.0"
            step="0.1"
            value={telemetry.dissolvedOxygen}
            onChange={(e) => handleSliderChange("dissolvedOxygen", e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span className="text-rose-500">0.0 (Anoxia)</span>
            <span className="text-amber-500">4.0 Hypoxia</span>
            <span className="text-emerald-500">8.0+ Saturated</span>
          </div>
        </div>

        {/* Turbidity Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium text-slate-300">Water Turbidity</span>
            <span className="font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {telemetry.turbidity.toFixed(1)} NTU
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="120.0"
            step="0.5"
            value={telemetry.turbidity}
            onChange={(e) => handleSliderChange("turbidity", e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span className="text-emerald-500">0.0 Clear</span>
            <span>25.0 Moderate</span>
            <span className="text-rose-500">120.0 Muddy/Contaminated</span>
          </div>
        </div>

        {/* TDS Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium text-slate-300">Total Dissolved Solids (TDS)</span>
            <span className="font-mono font-bold text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {Math.round(telemetry.tds)} ppm
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="2500"
            step="10"
            value={telemetry.tds}
            onChange={(e) => handleSliderChange("tds", e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span className="text-emerald-500">50 Pure</span>
            <span>500 Limit</span>
            <span className="text-rose-500">2500 Heavy Solute</span>
          </div>
        </div>
      </div>
    </div>
  );
}
