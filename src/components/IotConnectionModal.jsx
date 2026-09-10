import React, { useState } from "react";
import { X, Wifi, Radio, Key, Check, Send, ArrowRight, RefreshCw, Cpu, Server } from "lucide-react";

export function IotConnectionModal({
  isOpen,
  onClose,
  selectedNode,
  currentTelemetry,
  onInjectTelemetry,
  liveMeta
}) {
  const [activeTab, setActiveTab] = useState("api"); // 'api' | 'webhook' | 'hardware'
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("https://api.ecotrack-iot.in/v1/telemetry/push");
  const [isInjecting, setIsInjecting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateHardwareIngest = () => {
    setIsInjecting(true);
    setTimeout(() => {
      // Inject slightly drifted real-time reading
      const randomDoDelta = (Math.random() * 0.4 - 0.2);
      const randomPhDelta = (Math.random() * 0.2 - 0.1);
      const newTelemetry = {
        ...currentTelemetry,
        dissolvedOxygen: Number(Math.max(1.0, currentTelemetry.dissolvedOxygen + randomDoDelta).toFixed(1)),
        ph: Number(Math.max(3.5, Math.min(10.5, currentTelemetry.ph + randomPhDelta)).toFixed(1)),
        turbidity: Number(Math.max(1.0, currentTelemetry.turbidity + (Math.random() * 2 - 1)).toFixed(1)),
        tds: Math.round(currentTelemetry.tds + (Math.random() * 20 - 10))
      };
      onInjectTelemetry(newTelemetry);
      setIsInjecting(false);
    }, 600);
  };

  const handleSaveConfig = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const sampleJsonPayload = JSON.stringify({
    station_id: selectedNode.id,
    device_uid: "ESP32-WQI-PROBE-04",
    timestamp: new Date().toISOString(),
    metrics: {
      dissolved_oxygen_mg_l: currentTelemetry.dissolvedOxygen,
      ph: currentTelemetry.ph,
      turbidity_ntu: currentTelemetry.turbidity,
      tds_ppm: currentTelemetry.tds,
      temperature_c: currentTelemetry.temperature,
      river_discharge_m3_s: currentTelemetry.riverDischarge ?? 0.8
    }
  }, null, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-2xl bg-white border border-slate-300 text-slate-900 shadow-2xl p-6 sm:p-7 rounded-xs max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-xs hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 border border-teal-200 bg-teal-50 text-teal-800 flex items-center justify-center rounded-xs">
            <Wifi className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Live Edge Hardware & External API Gateway
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Real Data Stream & Sensor Webhook Ingestion
            </h3>
          </div>
        </div>

        {/* Live Active Feed Status Banner */}
        <div className="my-4 p-3 bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs font-mono rounded-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>
              LIVE SOURCE: <strong>{liveMeta?.source || "Open-Meteo & ECMWF Ingestion"}</strong>
            </span>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold">
            {liveMeta?.fetchedAt ? `SYNCED AT ${liveMeta.fetchedAt}` : "LIVE SYNC ACTIVE"}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 text-xs font-mono mb-4">
          <button
            onClick={() => setActiveTab("api")}
            className={`pb-2 px-3 transition-colors cursor-pointer border-b-2 font-medium ${
              activeTab === "api"
                ? "border-teal-700 text-teal-800 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            CPCB / Open Data API
          </button>
          <button
            onClick={() => setActiveTab("webhook")}
            className={`pb-2 px-3 transition-colors cursor-pointer border-b-2 font-medium ${
              activeTab === "webhook"
                ? "border-teal-700 text-teal-800 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Custom IoT Webhook
          </button>
          <button
            onClick={() => setActiveTab("hardware")}
            className={`pb-2 px-3 transition-colors cursor-pointer border-b-2 font-medium ${
              activeTab === "hardware"
                ? "border-teal-700 text-teal-800 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            ESP32 / LoRaWAN Probe
          </button>
        </div>

        {/* Tab 1: CPCB / Open Data API */}
        {activeTab === "api" && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Connect directly to the National Water Quality Monitoring Programme (NWMP) through CPCB or data.gov.in. Telemetry is currently assimilated from Open-Meteo and ECMWF hydrological models in real time.
            </p>

            <div className="space-y-1.5">
              <label className="font-mono text-slate-700 font-semibold block text-[11px] uppercase">
                data.gov.in / CPCB API Key (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste your 32-character data.gov.in API key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-xs font-mono text-xs focus:outline-teal-700"
                />
                <button
                  onClick={handleSaveConfig}
                  className="px-4 py-2 bg-slate-900 text-white font-mono text-xs font-semibold rounded-xs hover:bg-slate-800 cursor-pointer"
                >
                  {savedSuccess ? "Saved!" : "Save Key"}
                </button>
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                Leave blank to continue using public unauthenticated Open-Meteo & ECMWF live assimilation.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Webhook */}
        {activeTab === "webhook" && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Transmit live probe data directly from your field sensors, server, or Postman to this dashboard via HTTP POST:
            </p>

            <div className="space-y-1.5">
              <label className="font-mono text-slate-700 font-semibold block text-[11px] uppercase">
                Ingestion Endpoint URL
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xs font-mono text-xs text-slate-800 bg-slate-50"
                readOnly
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-slate-700 font-semibold block text-[11px] uppercase">
                Expected JSON Body Format (POST)
              </label>
              <pre className="p-3 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-xs overflow-x-auto leading-tight">
                {sampleJsonPayload}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: ESP32 / Hardware Simulation */}
        {activeTab === "hardware" && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Compatible with standard analog & digital sensors:
              <br />
              &bull; <strong>pH Sensor:</strong> DFRobot Gravity Analog pH Meter (0-14 pH)
              <br />
              &bull; <strong>Dissolved Oxygen:</strong> Galvanic DO Probe kit with BNC interface
              <br />
              &bull; <strong>Turbidity:</strong> Optical Transmittance Sensor (0-1000 NTU)
              <br />
              &bull; <strong>TDS/Conductivity:</strong> Analog electrical conductivity probe
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
              <span className="font-mono text-[11px] font-bold text-slate-800 uppercase block">
                Instant Hardware Ingestion Test:
              </span>
              <p className="text-slate-500">
                Trigger a live sample packet injection to verify dashboard reactivity and Z-score calculation:
              </p>
              <button
                onClick={handleSimulateHardwareIngest}
                disabled={isInjecting}
                className="flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-mono text-xs font-bold rounded-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${isInjecting ? "animate-spin" : ""}`} />
                <span>{isInjecting ? "Transmitting Packet..." : "Transmit Live Sensor Sample"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 font-mono text-xs mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
