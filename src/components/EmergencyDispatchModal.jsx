import React, { useState } from "react";
import { X, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export function EmergencyDispatchModal({
  isOpen,
  onClose,
  node,
  telemetry,
  wqiData,
  anomalyData,
}) {
  const [dispatchStatus, setDispatchStatus] = useState("idle"); // 'idle' | 'transmitting' | 'confirmed'

  if (!isOpen) return null;

  const handleExecuteBroadcast = () => {
    setDispatchStatus("transmitting");
    setTimeout(() => {
      setDispatchStatus("confirmed");
    }, 1100);
  };

  const handleClose = () => {
    setDispatchStatus("idle");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-slate-300 text-slate-900 shadow-2xl p-6 sm:p-7 rounded-xs">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-xs hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Masthead */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 border border-rose-200 bg-rose-50 text-rose-700 flex items-center justify-center rounded-xs">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Emergency Protocol &bull; MoEFCC Fast-Track
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Aquatic Incident & Regulatory Dispatch Console
            </h3>
          </div>
        </div>

        {/* Incident Telemetry Packet */}
        <div className="my-5 p-4 bg-slate-50 border border-slate-200 font-mono text-xs space-y-2 rounded-xs">
          <div className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-2 font-semibold">
            Incident Packet Snapshot [CPCB-PKT-2026]
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Station Target</span>
              <span className="text-slate-900 font-bold">{node.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Jurisdiction</span>
              <span className="text-slate-700">{node.state} SPCB</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Evaluated WQI</span>
              <span className="text-rose-700 font-bold">{wqiData.score} / 100 ({wqiData.classGrade})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Anomaly Vector</span>
              <span className="text-amber-700 font-semibold">{anomalyData.vector}</span>
            </div>
          </div>

          <div className="flex gap-4 pt-2 border-t border-slate-200 text-[10px] text-slate-600">
            <span>DO: {telemetry.dissolvedOxygen} mg/L</span>
            <span>pH: {telemetry.ph}</span>
            <span>Turb: {telemetry.turbidity} NTU</span>
            <span>TDS: {telemetry.tds} ppm</span>
          </div>
        </div>

        {/* Dispatch Routing Desks */}
        <div className="mb-6 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block font-semibold">
            Target Regulatory Recipients:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
            <div className="p-2.5 bg-white border border-slate-200 flex items-center justify-between shadow-2xs rounded-xs">
              <div>
                <div className="text-slate-900 font-semibold">CPCB Incident Command</div>
                <div className="text-[10px] text-slate-500">New Delhi HQ Registry</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="p-2.5 bg-white border border-slate-200 flex items-center justify-between shadow-2xs rounded-xs">
              <div>
                <div className="text-slate-900 font-semibold">State Pollution Control Board</div>
                <div className="text-[10px] text-slate-500">Rapid Inspection Team</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="p-2.5 bg-white border border-slate-200 flex items-center justify-between shadow-2xs rounded-xs">
              <div>
                <div className="text-slate-900 font-semibold">Inland Fisheries Desk</div>
                <div className="text-[10px] text-slate-500">Fish Mortality Early Warning</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="p-2.5 bg-white border border-slate-200 flex items-center justify-between shadow-2xs rounded-xs">
              <div>
                <div className="text-slate-900 font-semibold">Edge Aeration Relays</div>
                <div className="text-[10px] text-slate-500">Automated Micro-Aerator Trigger</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Modal Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 font-mono text-xs">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer rounded-xs"
          >
            Dismiss
          </button>

          {dispatchStatus === "confirmed" ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold rounded-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Broadcast Transmitted Successfully</span>
            </div>
          ) : (
            <button
              onClick={handleExecuteBroadcast}
              disabled={dispatchStatus === "transmitting"}
              className="flex items-center gap-2 px-5 py-2 bg-rose-700 hover:bg-rose-800 border border-rose-800 text-white font-bold transition-colors cursor-pointer active:scale-95 disabled:opacity-50 rounded-xs shadow-xs"
            >
              <Send className={`w-3.5 h-3.5 ${dispatchStatus === "transmitting" ? "animate-spin text-white" : ""}`} />
              <span>
                {dispatchStatus === "transmitting" ? "Transmitting Packet..." : "Execute Incident Broadcast"}
              </span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
