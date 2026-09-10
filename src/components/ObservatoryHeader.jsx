import React from "react";
import { Download, ShieldAlert, Wifi, RefreshCw } from "lucide-react";

export function ObservatoryHeader({
  nodes,
  selectedNode,
  onSelectNode,
  onExportPdf,
  onOpenAlertModal,
  onOpenIotModal,
  onRefreshLiveData,
  isRefreshing,
  liveMeta,
  wqiScore,
  classGrade
}) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-[9999] shadow-sm">
      {/* Top micro-ribbon */}
      <div className="border-b border-slate-100 bg-[#fbfbfa] px-4 lg:px-8 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            REAL LIVE DATA &bull; OPEN-METEO & ECMWF ASSIMILATION
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-500">
            CPCB NWMP MONITORING DIRECTORY
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500">
            LAST SYNC: <span className="text-slate-900 font-semibold">{liveMeta?.fetchedAt || "LIVE"}</span>
          </span>
          <span className="text-slate-300">|</span>
          <button
            onClick={onRefreshLiveData}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-teal-700 hover:text-teal-900 cursor-pointer font-medium disabled:opacity-50"
            title="Poll fresh real-time meteorological & hydrological APIs"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Live Data"}</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Brand & Observatory Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded border border-teal-200 bg-teal-50 flex items-center justify-center text-teal-800 font-mono text-xs font-black tracking-tighter shadow-xs">
            ET
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-slate-900 uppercase">
                EcoTrack
              </h1>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                LIVE TELEMETRY
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">
              Hydrochemical Inversion & Biotic Telemetry System
            </p>
          </div>
        </div>

        {/* Station Navigation Selector */}
        <div className="flex items-center p-1 bg-slate-100 rounded border border-slate-200/80 overflow-x-auto max-w-full">
          {nodes.map((node) => {
            const isSelected = node.id === selectedNode.id;
            return (
              <button
                key={node.id}
                onClick={() => onSelectNode(node)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-white text-slate-900 font-semibold border border-slate-200 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    node.badgeColor === "red"
                      ? "bg-rose-500"
                      : node.badgeColor === "amber"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                />
                <span>{node.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({node.state.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenIotModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-teal-200 text-teal-800 bg-teal-50 hover:bg-teal-100/80 transition-colors cursor-pointer active:scale-[0.98]"
            title="Connect Real Hardware Sensors or CPCB API Key"
          >
            <Wifi className="w-3.5 h-3.5 text-teal-700" />
            <span className="hidden sm:inline">Connect</span> Sensors
          </button>

          <button
            onClick={onOpenAlertModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-rose-200 text-rose-700 bg-rose-50/80 hover:bg-rose-100/80 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Broadcast</span>
          </button>

          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 transition-colors cursor-pointer active:scale-[0.98] shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-teal-700" />
            <span>PDF Brief</span>
          </button>
        </div>

      </div>
    </header>
  );
}
