import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { Activity } from "lucide-react";

export function TelemetryWorkbench({ historyData, nodeName }) {
  const [activeView, setActiveView] = useState("dissolved_ph"); // 'dissolved_ph' | 'solids_turb'

  return (
    <div className="border border-slate-200 bg-white p-5 flex flex-col justify-between h-[500px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-700" />
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              24-Hour Continuous Telemetry Trace
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              STATION: {nodeName.toUpperCase()} &bull; 4-HOUR SAMPLE INTERVALS
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 border border-slate-200 p-0.5 rounded-xs font-mono text-xs">
          <button
            onClick={() => setActiveView("dissolved_ph")}
            className={`px-2.5 py-1 transition-colors cursor-pointer rounded-xs ${
              activeView === "dissolved_ph"
                ? "bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            DO / pH Inversion
          </button>
          <button
            onClick={() => setActiveView("solids_turb")}
            className={`px-2.5 py-1 transition-colors cursor-pointer rounded-xs ${
              activeView === "solids_turb"
                ? "bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Turbidity / TDS
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full pt-4">
        {activeView === "dissolved_ph" ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 12, right: 20, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 10, fontFamily: "monospace", fill: "#475569" }} />
              <YAxis yAxisId="do" stroke="#0f766e" domain={[0, 12]} tick={{ fontSize: 10, fontFamily: "monospace", fill: "#0f766e" }} unit=" mg/L" />
              <YAxis yAxisId="ph" orientation="right" stroke="#b45309" domain={[3, 11]} tick={{ fontSize: 10, fontFamily: "monospace", fill: "#b45309" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "3px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#0f172a",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "monospace", paddingTop: "8px" }} />

              {/* Hypoxia Reference Line */}
              <ReferenceLine
                yAxisId="do"
                y={4.0}
                stroke="#e11d48"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: "Hypoxia Boundary (4.0 mg/L)",
                  fill: "#be123c",
                  fontSize: 9,
                  fontFamily: "monospace",
                  position: "insideBottomRight",
                }}
              />

              {/* Acidification Threshold */}
              <ReferenceLine
                yAxisId="ph"
                y={6.5}
                stroke="#d97706"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: "Acidification Cutoff (pH 6.5)",
                  fill: "#b45309",
                  fontSize: 9,
                  fontFamily: "monospace",
                  position: "insideTopRight",
                }}
              />

              <Line
                yAxisId="do"
                type="monotone"
                dataKey="dissolvedOxygen"
                name="Dissolved Oxygen (mg/L)"
                stroke="#0f766e"
                strokeWidth={2}
                dot={{ r: 3, fill: "#0f766e", stroke: "#ffffff", strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="ph"
                type="monotone"
                dataKey="ph"
                name="pH Hydrochemistry"
                stroke="#d97706"
                strokeWidth={2}
                dot={{ r: 3, fill: "#d97706", stroke: "#ffffff", strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 12, right: 20, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 10, fontFamily: "monospace", fill: "#475569" }} />
              <YAxis yAxisId="turb" stroke="#ea580c" domain={[0, 120]} tick={{ fontSize: 10, fontFamily: "monospace", fill: "#ea580c" }} unit=" NTU" />
              <YAxis yAxisId="tds" orientation="right" stroke="#4f46e5" tick={{ fontSize: 10, fontFamily: "monospace", fill: "#4f46e5" }} unit=" ppm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "3px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#0f172a",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "monospace", paddingTop: "8px" }} />

              <ReferenceLine
                yAxisId="turb"
                y={50}
                stroke="#ea580c"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: "Turbidity Limit (50 NTU)",
                  fill: "#c2410c",
                  fontSize: 9,
                  fontFamily: "monospace",
                  position: "insideTopRight",
                }}
              />

              <Line
                yAxisId="turb"
                type="monotone"
                dataKey="turbidity"
                name="Turbidity (NTU)"
                stroke="#ea580c"
                strokeWidth={2}
                dot={{ r: 3, fill: "#ea580c", stroke: "#ffffff", strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="tds"
                type="monotone"
                dataKey="tds"
                name="Total Dissolved Solids (ppm)"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 3, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Statistical Inversion Band */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[10px] text-slate-400">
        <span>DATA CONFIDENCE: 99.4% (KALMAN FILTERED)</span>
        <span className="text-slate-500">TELEMETRY BAND: CPCB-RTD-PROTOCOL-V2</span>
      </div>
    </div>
  );
}
