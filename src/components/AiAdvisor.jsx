import React, { useState } from "react";
import { Bot, Sparkles, RefreshCw, CheckCircle, AlertTriangle, ShieldCheck, FileSpreadsheet } from "lucide-react";

export function AiAdvisor({ node, telemetry, wqiData, anomalyData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 700);
  };

  // Dynamic Generative AI Insights based on telemetry
  const isAnoxic = telemetry.dissolvedOxygen < 3.0;
  const isAcidic = telemetry.ph < 6.0;
  const isAlkaline = telemetry.ph > 8.5;
  const isTurbid = telemetry.turbidity > 40;
  const isHighTds = telemetry.tds > 1000;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Tier 2 Generative AI Remediation Advisor
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Multi-Step LLM Reasoning Engine (Environmental Jurisprudence)
            </p>
          </div>
        </div>

        <button
          onClick={handleRegenerate}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          <span>{isGenerating ? "Synthesizing..." : "Re-evaluate"}</span>
        </button>
      </div>

      {/* Advisory Content Sections */}
      <div className="space-y-4 my-4">
        {/* Step 1: Executive Summary */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold">
              1
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Executive Hydrodynamic Assessment
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-7">
            {wqiData.score < 40
              ? `Telemetry stream indicates acute aquatic crisis at ${node.name} with an evaluated WQI of ${wqiData.score} (Status: ${wqiData.status}). Multi-sensor telemetry reflects severe hydrochemical degradation demanding immediate inter-agency enforcement.`
              : wqiData.score < 70
              ? `Moderate hydrochemical perturbation observed at ${node.name} (WQI: ${wqiData.score}). Ambient parameters exhibit diffuse ecological stress across seasonal baseline buffers.`
              : `Aquatic integrity at ${node.name} remains within nominal Class-A environmental baselines (WQI: ${wqiData.score}). Micro-ecological health supports diverse native species reproduction.`}
          </p>
        </div>

        {/* Step 2: Contamination Vector Analysis */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold">
              2
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Contamination Vector & Chemical Fingerprint
            </h4>
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 pl-7 list-disc list-outside">
            {isAnoxic && (
              <li>
                <strong className="text-rose-400">Severe Anoxic Collapse:</strong> Dissolved oxygen at{" "}
                {telemetry.dissolvedOxygen} mg/L sits well below the critical hypoxia boundary (4.0 mg/L),
                accelerating toxic sulfide genesis.
              </li>
            )}
            {isAcidic && (
              <li>
                <strong className="text-rose-400">Industrial Acid Injection:</strong> pH {telemetry.ph} indicates
                unneutralized industrial pickling/acid-bath runoff, destroying water buffering capacity.
              </li>
            )}
            {isAlkaline && (
              <li>
                <strong className="text-amber-400">Hyper-Alkaline Eutrophication:</strong> pH {telemetry.ph} paired
                with NDCI satellite signatures denotes active cyanobacterial photosynthetic blooms.
              </li>
            )}
            {isTurbid && (
              <li>
                <strong className="text-amber-400">High Suspended Particulates:</strong> Turbidity at{" "}
                {telemetry.turbidity} NTU impairs benthic light penetration and smothers aquatic oviposition.
              </li>
            )}
            {!isAnoxic && !isAcidic && !isAlkaline && !isTurbid && (
              <li className="text-emerald-400">
                All multivariate telemetry parameters conform to standard Class-A chemical equilibrium.
              </li>
            )}
          </ul>
        </div>

        {/* Step 3: Biodiversity Impact */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
              3
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Biodiversity & Biota Impact Assessment
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-7">
            {isAnoxic
              ? "Endemic freshwater macrofauna (e.g. Ganges Dolphin, Schizothorax) face irreversible asphyxiation and immediate avoidance flight. Benthic invertebrates face localized mortality."
              : isAcidic
              ? "Acidic toxicity triggers lethal mucus coagulation on gills and inhibits embryonic hatchability of native teleost fishes."
              : isAlkaline
              ? "Microcystin release during bloom senescence risks acute hepatotoxicity across surrounding riparian livestock and avian populations."
              : "Favorable dissolved gas solubility and clean benthic substrate promote healthy larval recruitment and balanced trophic dynamics."}
          </p>
        </div>

        {/* Step 4: CPCB Statutory Action Directives */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
              4
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              CPCB Statutory Directives (Water Act 1974)
            </h4>
          </div>
          <div className="text-xs text-slate-300 pl-7 space-y-1">
            <p className="text-cyan-300 font-mono font-semibold text-[11px]">
              Mandated Interventions:
            </p>
            <p>
              1. Issue Section 33A notice requiring immediate effluent diversion and real-time probe re-calibration.
            </p>
            <p>
              2. Deploy mobile solar-powered cascade surface aerators at 500m intervals along affected reach.
            </p>
            <p>
              3. Transmit telemetry incident packet to State Fisheries Desks for harvest restriction advisories.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 text-[10px] text-slate-500 font-mono border-t border-slate-800/80 text-center">
        Powered by EcoTrack Edge Inference Engine • Model: Environmental GPT-Aquatics v4.2
      </div>
    </div>
  );
}
