import React, { useState, useMemo, useEffect, useCallback } from "react";
import { WATER_NODES } from "./data/waterNodes";
import { calculateWQI, detectAnomalies, calculateSpeciesVitality } from "./utils/wqiCalculator";
import { generateCpcbReport } from "./utils/exportPdf";
import { fetchLiveStationTelemetry } from "./services/liveDataService";

import { ObservatoryHeader } from "./components/ObservatoryHeader";
import { StationOverview } from "./components/StationOverview";
import { MapObservatory } from "./components/MapObservatory";
import { TelemetryWorkbench } from "./components/TelemetryWorkbench";
import { MultivariateAnomalyMatrix } from "./components/MultivariateAnomalyMatrix";
import { BioLedger } from "./components/BioLedger";
import { SensorCalibrationConsole } from "./components/SensorCalibrationConsole";
import { RegulatoryBrief } from "./components/RegulatoryBrief";
import { EmergencyDispatchModal } from "./components/EmergencyDispatchModal";
import { IotConnectionModal } from "./components/IotConnectionModal";

export function App() {
  const [selectedNode, setSelectedNode] = useState(WATER_NODES[0]);
  const [telemetry, setTelemetry] = useState(WATER_NODES[0].initialTelemetry);
  const [historyData, setHistoryData] = useState(WATER_NODES[0].history);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isIotModalOpen, setIsIotModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveMeta, setLiveMeta] = useState({
    source: "Connecting to Open-Meteo & ECMWF...",
    fetchedAt: "Connecting...",
    status: "SYNCING"
  });

  // Pull real live data from Open-Meteo and ECMWF hydrological APIs
  const loadLiveDataForNode = useCallback(async (node) => {
    setIsRefreshing(true);
    const result = await fetchLiveStationTelemetry(node);
    if (result && result.telemetry) {
      setTelemetry(result.telemetry);
      setHistoryData(result.history);
      setLiveMeta(result.meta);
    }
    setIsRefreshing(false);
  }, []);

  // Fetch real data on initial load and when station changes
  useEffect(() => {
    loadLiveDataForNode(selectedNode);
  }, [selectedNode, loadLiveDataForNode]);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };

  const handleResetTelemetry = () => {
    loadLiveDataForNode(selectedNode);
  };

  const handleRefreshLiveData = () => {
    loadLiveDataForNode(selectedNode);
  };

  // Real-time analytics calculations based on live telemetry
  const wqiData = useMemo(() => {
    return calculateWQI(telemetry);
  }, [telemetry]);

  const anomalyData = useMemo(() => {
    return detectAnomalies(telemetry, selectedNode);
  }, [telemetry, selectedNode]);

  const speciesVitality = useMemo(() => {
    return calculateSpeciesVitality(selectedNode.species, telemetry);
  }, [selectedNode.species, telemetry]);

  const handleExportPdf = () => {
    generateCpcbReport(selectedNode, telemetry, wqiData, anomalyData);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] flex flex-col selection:bg-teal-100 selection:text-teal-900">
      {/* Observatory Technical Masthead with Live Stream Indicators */}
      <ObservatoryHeader
        nodes={WATER_NODES}
        selectedNode={selectedNode}
        onSelectNode={handleSelectNode}
        onExportPdf={handleExportPdf}
        onOpenAlertModal={() => setIsAlertModalOpen(true)}
        onOpenIotModal={() => setIsIotModalOpen(true)}
        onRefreshLiveData={handleRefreshLiveData}
        isRefreshing={isRefreshing}
        liveMeta={liveMeta}
        wqiScore={wqiData.score}
        classGrade={wqiData.classGrade}
      />

      {/* Main Observatory Content Flow */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Section 1: Editorial Station Profile & Live Telemetry Evaluation */}
        <StationOverview
          node={selectedNode}
          telemetry={telemetry}
          wqiData={wqiData}
          liveMeta={liveMeta}
        />

        {/* Section 2: Isolation Forest Multivariate Deviation Matrix */}
        <MultivariateAnomalyMatrix anomalyData={anomalyData} />

        {/* Section 3: Dual Asymmetrical Observatory: GIS Map & 24h Telemetry Trace */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <MapObservatory
              nodes={WATER_NODES}
              selectedNode={selectedNode}
              onSelectNode={handleSelectNode}
            />
          </div>
          <div className="lg:col-span-6">
            <TelemetryWorkbench
              historyData={historyData}
              nodeName={selectedNode.name}
            />
          </div>
        </section>

        {/* Section 4: Interactive Workbench: Instrument Sliders & Bio-Indicator Ledger */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <SensorCalibrationConsole
              telemetry={telemetry}
              onChangeTelemetry={setTelemetry}
              onResetTelemetry={handleResetTelemetry}
              selectedNode={selectedNode}
            />
          </div>
          <div className="lg:col-span-6">
            <BioLedger species={speciesVitality} />
          </div>
        </section>

        {/* Section 5: Legal Environmental Jurisprudence Memorandum */}
        <RegulatoryBrief
          node={selectedNode}
          telemetry={telemetry}
          wqiData={wqiData}
          anomalyData={anomalyData}
        />

      </main>

      {/* Emergency Incident Dispatch Terminal Modal */}
      <EmergencyDispatchModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        node={selectedNode}
        telemetry={telemetry}
        wqiData={wqiData}
        anomalyData={anomalyData}
      />

      {/* Live IoT Hardware & API Connection Gateway Modal */}
      <IotConnectionModal
        isOpen={isIotModalOpen}
        onClose={() => setIsIotModalOpen(false)}
        selectedNode={selectedNode}
        currentTelemetry={telemetry}
        onInjectTelemetry={setTelemetry}
        liveMeta={liveMeta}
      />

      {/* Institutional Observatory Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-slate-900 font-bold text-sm">ECOTRACK</span>
            <span className="text-slate-300">|</span>
            <span>Real-time Hydrological & Biotic Telemetry Framework</span>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <span>Open-Meteo &bull; ECMWF Global Hydrology &bull; CPCB Guidelines &bull; Copernicus Sentinel-2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
