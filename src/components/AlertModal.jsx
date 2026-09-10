import React, { useState } from "react";
import { X, Send, Radio, CheckCircle2, ShieldAlert, Siren, PhoneCall, Mail } from "lucide-react";

export function AlertModal({ isOpen, onClose, node, telemetry, wqiData, anomalyData }) {
  const [broadcastState, setBroadcastState] = useState("idle"); // 'idle' | 'broadcasting' | 'sent'

  if (!isOpen) return null;

  const handleBroadcast = () => {
    setBroadcastState("broadcasting");
    setTimeout(() => {
      setBroadcastState("sent");
    }, 1200);
  };

  const handleReset = () => {
    setBroadcastState("idle");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Automated Fisheries & CPCB Incident Broadcast
            </h3>
            <p className="text-xs text-slate-400">
              National Aquatic Disaster Early Warning System (Protocol 4A)
            </p>
          </div>
        </div>

        {/* Incident Summary Card */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 mb-4 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Target Water Body:</span>
            <span className="font-bold text-cyan-400">{node.name} ({node.location})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">CPCB WQI Evaluation:</span>
            <span className="font-mono font-bold text-rose-400">{wqiData.score}/100 — {wqiData.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Detected Anomaly Vector:</span>
            <span className="font-semibold text-amber-400">{anomalyData.vector}</span>
          </div>
          <div className="flex justify-between font-mono text-[11px] pt-1 border-t border-slate-800">
            <span className="text-slate-400">DO: {telemetry.dissolvedOxygen} mg/L</span>
            <span className="text-slate-400">pH: {telemetry.ph}</span>
            <span className="text-slate-400">Turb: {telemetry.turbidity} NTU</span>
            <span className="text-slate-400">TDS: {telemetry.tds} ppm</span>
          </div>
        </div>

        {/* Dispatch Targets */}
        <div className="mb-5 space-y-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Automated Multi-Agency Dispatch Channels:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">State PCB Rapid Desk</p>
                <p className="text-[10px] text-slate-400">Priority SMS & Edge IVR Alert</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">Inland Fisheries Desk</p>
                <p className="text-[10px] text-slate-400">Fish Mortality Emergency Dispatch</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">CPCB Central Node</p>
                <p className="text-[10px] text-slate-400">Official Violation Register Log</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">IoT Edge Aerator Relays</p>
                <p className="text-[10px] text-slate-400">Trigger Autonomous Aeration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {broadcastState === "sent" ? (
            <div className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>Broadcast Dispatched Successfully</span>
            </div>
          ) : (
            <button
              onClick={handleBroadcast}
              disabled={broadcastState === "broadcasting"}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-lg shadow-rose-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Send className={`w-4 h-4 ${broadcastState === "broadcasting" ? "animate-spin" : ""}`} />
              <span>
                {broadcastState === "broadcasting"
                  ? "Transmitting Broadcast..."
                  : "Dispatch Emergency Broadcast"}
              </span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
