import React from "react";
import { Waves, Radio, FileDown, BellRing, ShieldAlert, Cpu } from "lucide-react";

export function Navbar({ 
  nodes, 
  selectedNode, 
  onSelectNode, 
  onExportPdf, 
  onOpenAlertModal,
  wqi 
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Waves className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                EcoTrack <span className="text-cyan-400 text-xs font-mono font-normal px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">AI-IOT</span>
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Aquatic Ecosystem Degradation & CPCB Regulatory Monitoring
            </p>
          </div>
        </div>

        {/* Node Switcher Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800/80 max-w-full overflow-x-auto shadow-inner">
          {nodes.map((node) => {
            const isActive = node.id === selectedNode.id;
            return (
              <button
                key={node.id}
                onClick={() => onSelectNode(node)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  node.badgeColor === "red" ? "bg-rose-400" :
                  node.badgeColor === "amber" ? "bg-amber-400" : "bg-emerald-400"
                }`} />
                {node.name}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAlertModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Simulate Fisheries Incident Alert"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Broadcast</span> Alert
          </button>

          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Download CPCB Official Brief PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>CPCB Brief</span>
          </button>
        </div>

      </div>
    </header>
  );
}
