import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Crosshair, Layers, MapPin } from "lucide-react";

const MAP_LAYERS = {
  topo: {
    name: "Topographic / Hydrology",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &bull; USGS, NOAA",
    maxZoom: 18,
  },
  satellite: {
    name: "True Satellite Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri, DigitalGlobe, GeoEye, Earthstar",
    maxZoom: 18,
  },
  osm: {
    name: "OpenStreetMap",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19,
  },
};

export function MapObservatory({ nodes, selectedNode, onSelectNode }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const [activeLayerKey, setActiveLayerKey] = useState("topo");

  // 1. Initialize Map Instance once with strict cleanup
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up any existing map instance on container to prevent "Map container is already initialized"
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: selectedNode.coordinates,
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
    });

    const activeConfig = MAP_LAYERS[activeLayerKey];
    const tileLayer = L.tileLayer(activeConfig.url, {
      attribution: activeConfig.attribution,
      maxZoom: activeConfig.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Add zoom controls to top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // 2. Switch tile layers dynamically without re-initializing the whole map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const activeConfig = MAP_LAYERS[activeLayerKey];

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = L.tileLayer(activeConfig.url, {
      attribution: activeConfig.attribution,
      maxZoom: activeConfig.maxZoom,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
  }, [activeLayerKey]);

  // 3. Render and update custom surveyor reticle markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    nodes.forEach((node) => {
      const isSelected = node.id === selectedNode.id;
      const markerColor =
        node.badgeColor === "red"
          ? "#be123c"
          : node.badgeColor === "amber"
          ? "#d97706"
          : "#059669";

      const reticleIcon = L.divIcon({
        className: "geodetic-reticle",
        html: `
          <div style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            ${
              isSelected
                ? `<div style="position: absolute; inset: 0; border: 2px dashed ${markerColor}; border-radius: 9999px; animation: spin 8s linear infinite; opacity: 0.85;"></div>`
                : ""
            }
            <div style="width: 16px; height: 16px; border: 2.5px solid #ffffff; background: ${markerColor}; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.35);">
              <div style="width: 4px; height: 4px; background: #ffffff; border-radius: 9999px;"></div>
            </div>
            ${
              isSelected
                ? `<div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-family: monospace; font-size: 9.5px; font-weight: 700; color: #0f172a; background: #ffffff; padding: 2px 6px; border: 1.5px solid ${markerColor}; border-radius: 3px; box-shadow: 0 2px 5px rgba(0,0,0,0.15); white-space: nowrap; z-index: 1000;">
                    ${node.name}
                  </div>`
                : ""
            }
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker(node.coordinates, { icon: reticleIcon }).addTo(map);

      const popupContent = `
        <div style="padding: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="font-family: monospace; font-size: 9px; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 700;">Active Surveillance Node</div>
          <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-top: 2px;">${node.name}</div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">${node.location}</div>
          <div style="display: flex; gap: 8px; font-family: monospace; font-size: 10px; color: #1e293b; border-top: 1px solid #e2e8f0; padding-top: 6px;">
            <span>${node.coordinates[0].toFixed(4)}°N</span>
            <span>${node.coordinates[1].toFixed(4)}°E</span>
          </div>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        onSelectNode(node);
      });

      markersRef.current[node.id] = marker;
    });
  }, [nodes, selectedNode]);

  // 4. Smooth Pan to selected node
  useEffect(() => {
    if (mapInstanceRef.current && selectedNode) {
      mapInstanceRef.current.flyTo(selectedNode.coordinates, 9, {
        duration: 1.2,
      });

      if (markersRef.current[selectedNode.id]) {
        setTimeout(() => {
          markersRef.current[selectedNode.id]?.openPopup();
        }, 700);
      }
    }
  }, [selectedNode]);

  return (
    <div className="border border-slate-200 bg-white p-5 flex flex-col h-[500px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] isolate relative z-0">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 mb-3 gap-2">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-teal-700" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            Geospatial Sensor Cartography
          </h3>
        </div>

        {/* Tile Layer Selector (100% Free Public GIS Layers) */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xs border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setActiveLayerKey("topo")}
            className={`px-2 py-1 rounded-xs transition-colors cursor-pointer ${
              activeLayerKey === "topo"
                ? "bg-white text-slate-900 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Topographic
          </button>
          <button
            onClick={() => setActiveLayerKey("satellite")}
            className={`px-2 py-1 rounded-xs transition-colors cursor-pointer ${
              activeLayerKey === "satellite"
                ? "bg-white text-slate-900 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setActiveLayerKey("osm")}
            className={`px-2 py-1 rounded-xs transition-colors cursor-pointer ${
              activeLayerKey === "osm"
                ? "bg-white text-slate-900 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Street (OSM)
          </button>
        </div>
      </div>

      {/* Map Area with HUD */}
      <div className="relative flex-1 w-full border border-slate-200 overflow-hidden bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Station Navigation HUD Panel */}
        <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 text-xs font-mono space-y-1.5 shadow-md max-w-[210px] rounded-xs">
          <div className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold">
            Monitoring Stations
          </div>
          <div className="space-y-1">
            {nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => onSelectNode(n)}
                className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded-xs transition-colors cursor-pointer ${
                  n.id === selectedNode.id
                    ? "bg-slate-100 text-slate-900 font-bold border border-slate-300 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    n.badgeColor === "red"
                      ? "bg-rose-600"
                      : n.badgeColor === "amber"
                      ? "bg-amber-500"
                      : "bg-emerald-600"
                  }`}
                />
                <span className="truncate">{n.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Coordinate HUD Bottom-Right */}
        <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 border border-slate-200 px-2.5 py-1 text-[10px] font-mono text-slate-700 shadow-xs pointer-events-none rounded-xs font-semibold">
          LAT {selectedNode.coordinates[0].toFixed(4)}° &bull; LON {selectedNode.coordinates[1].toFixed(4)}°
        </div>
      </div>
    </div>
  );
}
