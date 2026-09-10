import React from "react";
import { Sliders, RotateCcw, Flame, Droplets, Mountain } from "lucide-react";
import { PRESET_SCENARIOS } from "../data/waterNodes";

export function SensorCalibrationConsole({
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
    <div className="border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Console Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-4 h-4 text-teal-700" />
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              Sensor Calibration & Scenario Sandbox
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              REAL-TIME PROBE OVERRIDE & INVERSION BENCHMARKING
            </p>
          </div>
        </div>

        <button
          onClick={onResetTelemetry}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
          title="Reset to station default telemetry"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Telemetry</span>
        </button>
      </div>

      {/* Preset Scenario Selector Switchboard */}
      <div className="my-4">
        <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-2 font-medium">
          Load Certified Crisis Scenarios:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
          <button
            onClick={() => applyPreset("chemicalSpill")}
            className="p-2.5 bg-rose-50/60 border border-rose-200 hover:bg-rose-100/70 text-left transition-colors cursor-pointer group active:scale-[0.99] rounded-xs"
          >
            <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>Chemical Spill</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-1 font-sans">
              pH 4.2 &bull; Severe Anoxia &bull; 2100 ppm
            </p>
          </button>

          <button
            onClick={() => applyPreset("algalBloom")}
            className="p-2.5 bg-amber-50/60 border border-amber-200 hover:bg-amber-100/70 text-left transition-colors cursor-pointer group active:scale-[0.99] rounded-xs"
          >
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs">
              <Droplets className="w-3.5 h-3.5" />
              <span>Algal Bloom</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-1 font-sans">
              pH 9.3 &bull; Eutrophic Hypoxia &bull; Microcystis
            </p>
          </button>

          <button
            onClick={() => applyPreset("pristine")}
            className="p-2.5 bg-emerald-50/60 border border-emerald-200 hover:bg-emerald-100/70 text-left transition-colors cursor-pointer group active:scale-[0.99] rounded-xs"
          >
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
              <Mountain className="w-3.5 h-3.5" />
              <span>Pristine Baseline</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-1 font-sans">
              pH 7.4 &bull; 9.5 mg/L DO &bull; Class A
            </p>
          </button>
        </div>
      </div>

      {/* Precision Instrument Sliders */}
      <div className="space-y-4 pt-2 border-t border-slate-100 font-mono text-xs">
        
        {/* Dissolved Oxygen */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-medium">Dissolved Oxygen (DO)</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200">
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
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0.0 Anoxia</span>
            <span className="text-rose-600 font-medium">&lt; 4.0 Hypoxia Cutoff</span>
            <span className="text-emerald-700 font-medium">&ge; 6.0 Class A Standard</span>
            <span>14.0 Saturated</span>
          </div>
        </div>

        {/* pH */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-medium">Potential of Hydrogen (pH)</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200">
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
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span className="text-rose-600 font-medium">&lt; 6.5 Acidic Violation</span>
            <span className="text-emerald-700 font-medium">7.2 Neutral</span>
            <span className="text-rose-600 font-medium">&gt; 8.5 Alkaline Violation</span>
          </div>
        </div>

        {/* Turbidity */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-medium">Turbidity Suspended Solids</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200">
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
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span className="text-emerald-700 font-medium">&le; 5.0 Ideal</span>
            <span>10.0 CPCB Permissible</span>
            <span className="text-amber-700 font-medium">&gt; 50 High Silt / Sludge</span>
          </div>
        </div>

        {/* TDS */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-medium">Total Dissolved Solids (TDS)</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200">
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
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span className="text-emerald-700 font-medium">&le; 300 Glacial Baseline</span>
            <span>500 Class A Limit</span>
            <span className="text-rose-600 font-medium">&gt; 1200 Industrial Solute</span>
          </div>
        </div>

      </div>
    </div>
  );
}
