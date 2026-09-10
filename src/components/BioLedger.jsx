import React from "react";
import { BookOpen } from "lucide-react";

export function BioLedger({ species }) {
  return (
    <div className="border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Ledger Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-teal-700" />
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              Indian Aquatic Bio-Indicator Field Ledger
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              WILDLIFE INSTITUTE OF INDIA (WII) &bull; SPECIES PHYSIOLOGICAL TOLERANCE
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-100 px-2 py-0.5 border border-slate-200 rounded-xs font-medium">
          Schedule I WPA 1972
        </span>
      </div>

      {/* Species Ledger Entries */}
      <div className="space-y-4 my-4">
        {species.map((sp) => {
          const isCritical = sp.vitalityScore < 25;
          const isStress = sp.vitalityScore >= 25 && sp.vitalityScore < 60;

          return (
            <div
              key={sp.id}
              className="p-4 bg-[#fafaf9] border border-slate-200 hover:border-slate-300 transition-colors rounded-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                      {sp.name}
                    </h4>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-600 font-medium">
                      Bio-Sentinel
                    </span>
                  </div>
                  <p className="text-xs italic text-slate-500 font-mono mt-0.5">
                    {sp.scientificName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="flex sm:justify-end items-center gap-2">
                    <span className="text-sm font-mono font-black text-slate-900">
                      {sp.vitalityScore}%
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded border ${
                        isCritical
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : isStress
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {sp.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Segmented Vitality Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-none overflow-hidden my-2.5">
                <div
                  className={`h-full transition-all duration-500 ${
                    isCritical
                      ? "bg-rose-500"
                      : isStress
                      ? "bg-amber-500"
                      : "bg-teal-600"
                  }`}
                  style={{ width: `${sp.vitalityScore}%` }}
                />
              </div>

              {/* Physiological Thresholds & Note */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-[11px] font-mono text-slate-600">
                <div>
                  <span className="text-slate-400 uppercase block text-[9px]">Hypoxia Limit</span>
                  <span className="text-slate-800 font-semibold">&ge; {sp.minDO} mg/L DO</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase block text-[9px]">Tolerable pH Band</span>
                  <span className="text-slate-800 font-semibold">{sp.optimalPh[0]} &ndash; {sp.optimalPh[1]} pH</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase block text-[9px]">Clinical Pathology</span>
                  <span className="text-slate-800 truncate block font-sans text-xs" title={sp.note}>
                    {sp.note}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-100">
        <span>REGULATORY REFERENCE: CPCB CLASS D / E BIOMONITORING MANUAL</span>
        <span className="text-slate-500">STATUS: CONTINUOUS RE-EVALUATION</span>
      </div>
    </div>
  );
}
