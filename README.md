# 🌊 EcoTrack - AI-Driven Application for Tracking Aquatic Ecosystem Degradation

> **EcoTrack** is a production-grade, interactive web dashboard prototype designed for tracking, diagnosing, and remediating aquatic ecosystem degradation across India in real time. It features Sentinel-2 multi-spectral satellite sensing, live IoT edge telemetry streams, XGBoost Water Quality Index (WQI) predictions, Isolation Forest anomaly detection, Generative AI degradation reports, interactive GIS mapping, and CPCB regulatory brief PDF generation.

---

## 🌟 Key Functional Modules

### 1. Predefined Indian Water Body Nodes
- **Yamuna River (Delhi - Okhla Barrage)**: High industrial contamination scenario (**pH 4.8**, **DO 1.8 mg/L**, **Turbidity 84.2 NTU**, **TDS 1680 ppm**).
- **Vembanad Lake (Kerala - Kuttanad Basin)**: Ramsar wetland agricultural runoff & eutrophication scenario (**pH 8.8**, **DO 3.9 mg/L**, **NDCI 0.91**).
- **Pangong Tso (Ladakh)**: High-altitude alpine pristine baseline scenario (**pH 7.4**, **DO 9.2 mg/L**, **Turbidity 2.1 NTU**).

### 2. Dual-Tier AI Analytics Core
- **Tier 1 (Predictive ML Engine)**:
  - **Dynamic WQI SVG Radial Gauge**: 0–100 score based on CPCB weighted parameters (pH, DO, Turbidity, TDS).
  - **Isolation Forest Anomaly Detection Banner**: Detects multivariate divergence vectors (e.g. chemical spill vs eutrophic shift) with Z-score metrics.
  - **Indian Species Safety Threshold Meter**: Biological vitality tracking for *Ganges River Dolphin*, *Golden Mahseer*, and *Pearlspot (Karimeen)*.
- **Tier 2 (Generative AI Remediation Advisor)**:
  - Multi-step LLM reasoning engine generating Executive Summaries, Contamination Vector Analyses, Biodiversity Impact Assessments, and CPCB Action Directives.

### 3. Visualization & Map Interface
- **Interactive GIS Map**: Dark Leaflet map with CartoDB dark vector tiles, probe station markers, heatmaps, pan-to-node animation, and station popups.
- **Dynamic Historical Trend Charts**: Recharts timeline comparing telemetry parameters with hypoxia (`DO = 4.0 mg/L`) and acidification (`pH = 6.5`) threshold lines.

### 4. Stakeholder Action Hub & Judge Sandbox
- **Telemetry Parameter Calibration Sliders**: Real-time sliders (pH, DO, Turbidity, TDS) + scenario presets (`Chemical Spill`, `Algal Bloom`, `Pristine Baseline`).
- **Official CPCB Regulatory Brief Export**: Downloadable PDF compliance reports via `jsPDF`.
- **Automated Fisheries Incident Alert Broadcast**: Emergency alert simulation for CPCB, SPCB, and Inland Fisheries Desks.

---

## 🛠️ Tech Stack & Libraries

- **Frontend**: React 19, Vite 8
- **Styling**: Tailwind CSS v4, Custom Industrial Glassmorphism Dark Theme
- **GIS Mapping**: Leaflet.js, CartoDB Dark Tiles
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

---

## 🚀 Local Quickstart

```bash
# Clone repository
git clone https://github.com/your-username/ecotrack.git
cd ecotrack

# Install dependencies
npm install

# Start local server
npm run dev
```

Visit `http://localhost:5173/` in your browser.
