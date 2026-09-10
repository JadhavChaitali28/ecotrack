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
import { TrendingUp, Sliders, ShieldAlert } from "lucide-react";

export function TelemetryCharts({ historyData, nodeName }) {
  const [metricTab, setMetricTab] = useState("do_ph"); // 'do_ph' | 'turb_tds'

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between h-[480px]">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/80 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            24h Telemetry Trend & Regulatory Thresholds
          </h2>
        </div>

        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setMetricTab("do_ph")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              metricTab === "do_ph"
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            DO & pH Hypoxia
          </button>
          <button
            onClick={() => setMetricTab("turb_tds")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              metricTab === "turb_tds"
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Turbidity & TDS
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full pt-4">
        {metricTab === "do_ph" ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#38bdf8" domain={[0, 12]} tick={{ fontSize: 11 }} unit=" mg/L" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" domain={[2, 12]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                  color: "#f8fafc",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />

              {/* Hypoxia Reference Line (DO = 4.0 mg/L) */}
              <ReferenceLine
                yAxisId="left"
                y={4.0}
                stroke="#f43f5e"
                strokeDasharray="4 4"
                label={{
                  value: "Hypoxia Limit (4.0 mg/L)",
                  fill: "#f43f5e",
                  fontSize: 10,
                  position: "insideBottomRight",
                }}
              />

              {/* Acidification Threshold Line (pH = 6.5) */}
              <ReferenceLine
                yAxisId="right"
                y={6.5}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: "Acidification (pH 6.5)",
                  fill: "#f59e0b",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="dissolvedOxygen"
                name="Dissolved Oxygen (mg/L)"
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#38bdf8" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="ph"
                name="pH Level"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#10b981" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#f59e0b" tick={{ fontSize: 11 }} unit=" NTU" />
              <YAxis yAxisId="right" orientation="right" stroke="#a855f7" tick={{ fontSize: 11 }} unit=" ppm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                  color: "#f8fafc",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />

              {/* High Turbidity Reference Line */}
              <ReferenceLine
                yAxisId="left"
                y={50}
                stroke="#f97316"
                strokeDasharray="4 4"
                label={{
                  value: "Turbidity Threshold (50 NTU)",
                  fill: "#f97316",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="turbidity"
                name="Turbidity (NTU)"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#f59e0b" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="tds"
                name="TDS (ppm)"
                stroke="#a855f7"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#a855f7" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 font-mono">
        <span>Station: {nodeName}</span>
        <span className="text-cyan-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          Synchronized 24h IoT Stream
        </span>
      </div>
    </div>
  );
}
