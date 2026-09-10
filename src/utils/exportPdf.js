import { jsPDF } from "jspdf";

export function generateCpcbReport(node, telemetry, wqiData, anomalyData) {
  const doc = new jsPDF();

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0];

  // Header background banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 42, "F");

  // Title
  doc.setTextColor(56, 189, 248); // sky-400
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CENTRAL POLLUTION CONTROL BOARD (CPCB)", 14, 16);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("EcoTrack Aquatic Telemetry & Anomaly Regulatory Brief", 14, 23);
  doc.text("Ministry of Environment, Forest and Climate Change (MoEFCC), Govt. of India", 14, 29);

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`DOC-REF: CPCB/ECO-${node.id.toUpperCase()}-${Date.now().toString().slice(-6)}`, 14, 36);
  doc.text(`TIMESTAMP: ${dateStr} ${timeStr} IST`, 135, 36);

  // Section 1: Monitoring Node Metadata
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("1. MONITORING NODE PROFILE", 14, 52);

  doc.setLineWidth(0.5);
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 54, 196, 54);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Station Name: ${node.name} (${node.location})`, 14, 62);
  doc.text(`Jurisdiction: ${node.state} Pollution Control Board`, 14, 68);
  doc.text(`GPS Coordinates: ${node.coordinates[0].toFixed(4)}° N, ${node.coordinates[1].toFixed(4)}° E`, 14, 74);
  doc.text(`Ecosystem Type: ${node.type}`, 14, 80);

  // Section 2: WQI & Compliance Classification
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("2. WATER QUALITY INDEX (WQI) & CLASSIFICATION", 14, 94);
  doc.line(14, 96, 196, 96);

  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(`Assessed WQI Score: ${wqiData.score} / 100`, 14, 104);
  doc.text(`CPCB Designated Classification: ${wqiData.status}`, 14, 110);
  doc.text(`Anomaly Divergence Vector: ${anomalyData.vector}`, 14, 116);
  doc.text(`Isolation Forest Anomaly Score: ${anomalyData.score} (Severity: ${anomalyData.severity})`, 14, 122);

  // Section 3: Telemetry Parameters & Thresholds
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("3. LIVE TELEMETRY VS CPCB CLASS-A THRESHOLDS", 14, 136);
  doc.line(14, 138, 196, 138);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 142, 182, 8, "F");
  doc.text("Parameter", 18, 147);
  doc.text("Live Observed", 65, 147);
  doc.text("CPCB Class-A Limit", 110, 147);
  doc.text("Compliance State", 160, 147);

  doc.setFont("helvetica", "normal");
  const params = [
    { name: "pH", val: `${telemetry.ph}`, limit: "6.5 - 8.5", ok: telemetry.ph >= 6.5 && telemetry.ph <= 8.5 },
    { name: "Dissolved Oxygen (DO)", val: `${telemetry.dissolvedOxygen} mg/L`, limit: ">= 6.0 mg/L", ok: telemetry.dissolvedOxygen >= 6.0 },
    { name: "Turbidity", val: `${telemetry.turbidity} NTU`, limit: "<= 10.0 NTU", ok: telemetry.turbidity <= 10.0 },
    { name: "TDS", val: `${telemetry.tds} ppm`, limit: "<= 500 ppm", ok: telemetry.tds <= 500 },
    { name: "Sentinel-2 NDCI", val: `${telemetry.ndci ?? "0.20"}`, limit: "< 0.40 (Oligotrophic)", ok: (telemetry.ndci ?? 0.2) < 0.4 }
  ];

  let y = 156;
  params.forEach((p) => {
    doc.text(p.name, 18, y);
    doc.text(p.val, 65, y);
    doc.text(p.limit, 110, y);
    if (p.ok) {
      doc.setTextColor(16, 149, 102);
      doc.text("COMPLIANT", 160, y);
    } else {
      doc.setTextColor(225, 29, 72);
      doc.text("VIOLATION", 160, y);
    }
    doc.setTextColor(15, 23, 42);
    y += 7;
  });

  // Section 4: Regulatory Action Directive
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("4. CPCB STATUTORY DIRECTIVE & MITIGATION NOTICE", 14, 202);
  doc.line(14, 204, 196, 204);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const directives = [
    "1. Immediate mobilization of rapid inspection teams pursuant to Section 33A of the Water Act 1974.",
    "2. Issue stop-work notice to point-source electroplating and chemical discharging units within 5km radius.",
    "3. Activate aeration cascades to mitigate severe anoxic asphyxiation for endemic aquatic macrofauna.",
    "4. Transmit telemetry snapshot to Inland Fisheries Directorate for biological quarantine."
  ];

  let dirY = 212;
  directives.forEach(d => {
    doc.text(d, 14, dirY);
    dirY += 6;
  });

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 275, 196, 275);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Generated autonomously by EcoTrack AI Telemetry Edge System | Validated against CPCB Criteria", 14, 282);

  doc.save(`CPCB_Brief_${node.id}_${dateStr}.pdf`);
}
