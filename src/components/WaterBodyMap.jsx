import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { MapPin, Navigation, Eye } from "lucide-react";

export function WaterBodyMap({ nodes, selectedNode, onSelectNode, currentWqi }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: selectedNode.coordinates,
        zoom: 6,
        zoomControl: false,
        attributionControl: false,
      });

      // OpenStreetMap standard tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom top-right zoom controls
      L.control.zoom({ position: "topright" }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add markers for all nodes
    nodes.forEach((node) => {
      const isSelected = node.id === selectedNode.id;
      const markerColor =
        node.badgeColor === "red"
          ? "#f43f5e"
          : node.badgeColor === "amber"
          ? "#f59e0b"
          : "#10b981";

      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
            ${
              isSelected
                ? `<div style="position: absolute; width: 32px; height: 32px; border-radius: 9999px; background-color: ${markerColor}; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
                : ""
            }
            <div style="
              width: ${isSelected ? "20px" : "14px"};
              height: ${isSelected ? "20px" : "14px"};
              border-radius: 9999px;
              background-color: ${markerColor};
              border: 2px solid #ffffff;
              box-shadow: 0 0 12px ${markerColor};
              transition: all 0.3s;
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(node.coordinates, { icon: customIcon }).addTo(map);

      // Popup
      const popupContent = `
        <div style="padding: 4px; font-family: inherit;">
          <h4 style="font-weight: 700; color: #38bdf8; margin: 0 0 2px 0; font-size: 13px;">${node.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #94a3b8;">${node.location}</p>
          <div style="font-size: 10px; font-family: monospace; color: #cbd5e1; margin-bottom: 4px;">
            Coords: ${node.coordinates[0].toFixed(2)}°N, ${node.coordinates[1].toFixed(2)}°E
          </div>
          <div style="font-size: 11px; font-weight: 600; color: ${markerColor};">
            ${node.category}
          </div>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        onSelectNode(node);
      });

      markersRef.current[node.id] = marker;
    });

    return () => {
      // Keep map alive during tab switches, but cleanup on full unmount
    };
  }, [nodes]);

  // Fly to selected node when it changes
  useEffect(() => {
    if (mapInstanceRef.current && selectedNode) {
      mapInstanceRef.current.flyTo(selectedNode.coordinates, 9, {
        duration: 1.4,
        easeLinearity: 0.25,
      });

      if (markersRef.current[selectedNode.id]) {
        setTimeout(() => {
          markersRef.current[selectedNode.id].openPopup();
        }, 800);
      }
    }
  }, [selectedNode]);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col h-[480px]">
      {/* Map Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Interactive Sentinel-2 & IoT Probe GIS Map
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {selectedNode.coordinates[0].toFixed(4)}°N, {selectedNode.coordinates[1].toFixed(4)}°E
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 w-full rounded-xl overflow-hidden border border-slate-800">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-950/85 backdrop-blur-md border border-slate-800/80 p-2.5 rounded-xl text-xs space-y-1.5 shadow-lg pointer-events-auto">
          <div className="font-bold text-[11px] text-slate-300 mb-1 font-mono uppercase">
            Active Telemetry Stations
          </div>
          {nodes.map((n) => (
            <button
              key={n.id}
              onClick={() => onSelectNode(n)}
              className={`flex items-center gap-2 w-full text-left px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                n.id === selectedNode.id ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  n.badgeColor === "red"
                    ? "bg-rose-500"
                    : n.badgeColor === "amber"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
              <span className="truncate max-w-[130px]">{n.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
