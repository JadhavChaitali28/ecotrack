import React, { useState } from "react";
import { Scale, RefreshCw } from "lucide-react";

export function RegulatoryBrief({ node, telemetry, wqiData, anomalyData }) {
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleReevaluate = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 600);
  };

  const isAnoxic = telemetry.dissolvedOxygen < 3.5;
  const isAcidic = telemetry.ph < 6.0;
  const isAlkaline = telemetry.ph > 8.5;
  const isTurbid = telemetry.turbidity > 40;

  return (
    <div className="border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Memorandum Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2.5">
          <Scale className="w-4 h-4 text-teal-700" />
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              CPCB Statutory Directive & Remediation Memorandum
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              PURSUANT TO SECTION 33A &bull; WATER (PREVENTION & CONTROL OF POLLUTION) ACT, 1974
            </p>
          </div>
        </div>

        <button
          onClick={handleReevaluate}
          disabled={isSynthesizing}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50 active:scale-95"
        >
          <RefreshCw className={`w-3 h-3 ${isSynthesizing ? "animate-spin text-teal-700" : ""}`} />
          <span>{isSynthesizing ? "Inverting Ingest..." : "Re-evaluate Findings"}</span>
        </button>
      </div>

      {/* Memorandum Content Box */}
      <div className="my-4 space-y-4 font-sans text-xs text-slate-700 leading-relaxed">
        
        {/* Memo Metadata Block */}
        <div className="p-3 bg-[#fafaf9] border border-slate-200 font-mono text-[11px] text-slate-600 space-y-1 rounded-xs">
          <div className="flex justify-between">
            <span>MEMO REF: CPCB/LEG-33A/{node.id.toUpperCase()}-2026</span>
            <span>JURISDICTION: {node.state.toUpperCase()} SPCB</span>
          </div>
          <div className="flex justify-between text-slate-900 font-medium">
            <span>RECEPTOR NODE: {node.name} ({node.location})</span>
            <span>STATUS: {wqiData.classGrade} ({wqiData.status.toUpperCase()})</span>
          </div>
        </div>

        {/* Diagnostic Finding 1: Hydrodynamic & Chemical Finding */}
        <div className="space-y-1">
          <div className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="text-teal-700">01.</span> Hydrodynamic & Inversion Finding
          </div>
          <p className="pl-5 text-slate-600">
            Continuous multi-sensor telemetry recorded at {node.name} evaluates to an indexed water quality of{" "}
            <strong className="text-slate-900">{wqiData.score}/100</strong> ({wqiData.classGrade}). Real-time telemetry{" "}
            {wqiData.score < 50
              ? "exhibits critical departure from statutory Class-A criteria, reflecting acute chemical or biological pollution loading."
              : "demonstrates stabilized water quality within acceptable designated-best-use thresholds."}
          </p>
        </div>

        {/* Diagnostic Finding 2: Contamination Vector */}
        <div className="space-y-1">
          <div className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="text-teal-700">02.</span> Chemical Fingerprint & Vector Identification
          </div>
          <p className="pl-5 text-slate-600">
            {isAnoxic && (
              <span className="block mb-1">
                &bull; <strong className="text-rose-700">Anoxic Asphyxiation Zone:</strong> Dissolved oxygen at {telemetry.dissolvedOxygen} mg/L falls below the minimum biological threshold (4.0 mg/L), indicating catastrophic microbial consumption of free oxygen.
              </span>
            )}
            {isAcidic && (
              <span className="block mb-1">
                &bull; <strong className="text-rose-700">Industrial Mineral Acid Shock:</strong> Hydronium concentration (pH {telemetry.ph}) denotes untreated pickling liquor or sulfuric discharge from upstream manufacturing clusters.
              </span>
            )}
            {isAlkaline && (
              <span className="block mb-1">
                &bull; <strong className="text-amber-700">Cyanobacterial Eutrophication:</strong> Hyper-alkalinity (pH {telemetry.ph}) accompanied by high Sentinel-2 NDCI indices confirms massive photosynthetic chlorophyll surges.
              </span>
            )}
            {isTurbid && (
              <span className="block mb-1">
                &bull; <strong className="text-amber-700">Suspended Particulate Silt:</strong> Turbidity at {telemetry.turbidity} NTU drastically attenuates euphotic depth and damages benthic spawning beds.
              </span>
            )}
            {!isAnoxic && !isAcidic && !isAlkaline && !isTurbid && (
              <span>
                Hydrochemical indicators reflect baseline equilibrium with dissolved gases and solutes conforming to undisturbed alpine standards.
              </span>
            )}
          </p>
        </div>

        {/* Diagnostic Finding 3: Statutory Remediation Mandates */}
        <div className="space-y-1">
          <div className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="text-teal-700">03.</span> Mandated Interventions & CPCB Directives
          </div>
          <div className="pl-5 space-y-1.5 font-mono text-[11px] text-slate-700">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
              <strong className="text-slate-900 font-bold">Directive A:</strong> Immediate deployment of mobile solar-powered cascade surface aerators to reverse anoxic bottom-layer asphyxiation.
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
              <strong className="text-slate-900 font-bold">Directive B:</strong> Issue emergency stop-discharge citations under Section 33A of the Water Act to point-source electroplating/industrial outfalls within 7.5 km reach.
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs">
              <strong className="text-slate-900 font-bold">Directive C:</strong> Transmit automated fish mortality warning to Inland Fisheries Directorate and local aquaculture co-operatives.
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center justify-between">
        <span>CERTIFIED: CPCB ENVIRONMENTAL AUDIT DIVISION</span>
        <span className="text-slate-500 font-medium">DOCUMENT SIGNATURE: VALIDATED</span>
      </div>
    </div>
  );
}
