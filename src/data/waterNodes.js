export const WATER_NODES = [
  {
    id: "yamuna-delhi",
    name: "Yamuna River",
    location: "Delhi - Okhla Barrage",
    state: "Delhi NCR",
    coordinates: [28.5447, 77.3090],
    category: "High Industrial Contamination",
    type: "River Basin",
    badgeColor: "red",
    description: "Heavy discharge of untreated municipal sewage and industrial effluent from Shahdara and Najafgarh drain networks.",
    initialTelemetry: {
      ph: 4.8,
      dissolvedOxygen: 1.8, // mg/L
      turbidity: 84.2,     // NTU
      tds: 1680,          // ppm
      temperature: 28.4,   // °C
      ndci: 0.74,         // Normalized Difference Chlorophyll Index
    },
    species: [
      {
        id: "dolphin",
        name: "Ganges River Dolphin",
        scientificName: "Platanista gangetica",
        vitalityScore: 18,
        status: "Critical Danger",
        minDO: 5.0,
        optimalPh: [6.5, 8.5],
        note: "Anoxic dead zone downstream of barrage poses fatal asphyxiation hazard."
      },
      {
        id: "mahseer",
        name: "Golden Mahseer",
        scientificName: "Tor putitora",
        vitalityScore: 12,
        status: "Locally Extirpated",
        minDO: 6.5,
        optimalPh: [7.0, 8.2],
        note: "Excessive turbidity and toxic heavy metals prevent breeding and egg incubation."
      },
      {
        id: "pearlspot",
        name: "Pearlspot (Karimeen)",
        scientificName: "Etroplus suratensis",
        vitalityScore: 25,
        status: "Severe Distress",
        minDO: 4.0,
        optimalPh: [6.8, 8.6],
        note: "Acidic surges (pH < 5.0) induce severe gill tissue hyperplasia."
      }
    ],
    history: [
      { time: "00:00", ph: 5.1, dissolvedOxygen: 2.2, turbidity: 78, tds: 1520 },
      { time: "04:00", ph: 4.9, dissolvedOxygen: 1.9, turbidity: 82, tds: 1610 },
      { time: "08:00", ph: 4.8, dissolvedOxygen: 1.8, turbidity: 84.2, tds: 1680 },
      { time: "12:00", ph: 4.7, dissolvedOxygen: 1.6, turbidity: 91, tds: 1750 },
      { time: "16:00", ph: 4.8, dissolvedOxygen: 1.7, turbidity: 88, tds: 1710 },
      { time: "20:00", ph: 5.0, dissolvedOxygen: 2.0, turbidity: 80, tds: 1590 },
      { time: "Now", ph: 4.8, dissolvedOxygen: 1.8, turbidity: 84.2, tds: 1680 },
    ]
  },
  {
    id: "vembanad-kerala",
    name: "Vembanad Lake",
    location: "Kerala - Kuttanad Basin",
    state: "Kerala",
    coordinates: [9.6100, 76.4300],
    category: "Agricultural Runoff & Eutrophication",
    type: "Ramsar Wetland",
    badgeColor: "amber",
    description: "Paddy field fertilizer runoff and pesticide leachate triggering massive microalgae blooms and nocturnal hypolimnetic hypoxia.",
    initialTelemetry: {
      ph: 8.8,
      dissolvedOxygen: 3.9,
      turbidity: 38.5,
      tds: 850,
      temperature: 29.8,
      ndci: 0.91,
    },
    species: [
      {
        id: "pearlspot",
        name: "Pearlspot (Karimeen)",
        scientificName: "Etroplus suratensis",
        vitalityScore: 54,
        status: "Compromised",
        minDO: 4.0,
        optimalPh: [6.8, 8.6],
        note: "Diurnal dissolved oxygen oscillations caused by intense algal respiration cycles."
      },
      {
        id: "dolphin",
        name: "Ganges River Dolphin",
        scientificName: "Platanista gangetica",
        vitalityScore: 38,
        status: "Marginal Viability",
        minDO: 5.0,
        optimalPh: [6.5, 8.5],
        note: "Sub-lethal chemical toxicity from agrochemical runoff inhibits echolocation forage."
      },
      {
        id: "mahseer",
        name: "Golden Mahseer",
        scientificName: "Tor putitora",
        vitalityScore: 42,
        status: "Sub-Optimal",
        minDO: 6.5,
        optimalPh: [7.0, 8.2],
        note: "Elevated water temperatures and alkaline peaks exceed physiological tolerance."
      }
    ],
    history: [
      { time: "00:00", ph: 8.2, dissolvedOxygen: 4.6, turbidity: 32, tds: 790 },
      { time: "04:00", ph: 8.3, dissolvedOxygen: 4.1, turbidity: 34, tds: 810 },
      { time: "08:00", ph: 8.6, dissolvedOxygen: 4.3, turbidity: 36, tds: 830 },
      { time: "12:00", ph: 9.1, dissolvedOxygen: 5.2, turbidity: 41, tds: 870 },
      { time: "16:00", ph: 8.9, dissolvedOxygen: 4.4, turbidity: 39, tds: 860 },
      { time: "20:00", ph: 8.7, dissolvedOxygen: 3.8, turbidity: 37, tds: 840 },
      { time: "Now", ph: 8.8, dissolvedOxygen: 3.9, turbidity: 38.5, tds: 850 },
    ]
  },
  {
    id: "pangong-ladakh",
    name: "Pangong Tso",
    location: "Ladakh High Alpine",
    state: "Ladakh UT",
    coordinates: [33.7595, 78.6674],
    category: "Pristine Alpine Baseline",
    type: "Endorheic High-Altitude Lake",
    badgeColor: "emerald",
    description: "Glacial melt fed endorheic basin with near-zero anthropogenic discharge; standard reference benchmark for baseline aquatic integrity.",
    initialTelemetry: {
      ph: 7.4,
      dissolvedOxygen: 9.2,
      turbidity: 2.1,
      tds: 210,
      temperature: 7.8,
      ndci: 0.05,
    },
    species: [
      {
        id: "mahseer",
        name: "Golden Mahseer / Schizothoracinae",
        scientificName: "Tor putitora / Schizothorax",
        vitalityScore: 96,
        status: "Optimal Habitat",
        minDO: 6.5,
        optimalPh: [7.0, 8.2],
        note: "Hyper-oxygenated glacial waters and crystalline transparency support prime spawning."
      },
      {
        id: "dolphin",
        name: "Ganges River Dolphin (Reference)",
        scientificName: "Platanista gangetica",
        vitalityScore: 92,
        status: "Pristine Hydrochemistry",
        minDO: 5.0,
        optimalPh: [6.5, 8.5],
        note: "Hydrochemical parameters demonstrate ideal purity thresholds."
      },
      {
        id: "pearlspot",
        name: "Pearlspot (Physiological benchmark)",
        scientificName: "Etroplus suratensis",
        vitalityScore: 88,
        status: "High Vitality",
        minDO: 4.0,
        optimalPh: [6.8, 8.6],
        note: "Absence of organic contaminants ensures optimal respiratory enzyme performance."
      }
    ],
    history: [
      { time: "00:00", ph: 7.3, dissolvedOxygen: 9.4, turbidity: 1.8, tds: 205 },
      { time: "04:00", ph: 7.4, dissolvedOxygen: 9.3, turbidity: 1.9, tds: 208 },
      { time: "08:00", ph: 7.4, dissolvedOxygen: 9.1, turbidity: 2.0, tds: 210 },
      { time: "12:00", ph: 7.5, dissolvedOxygen: 9.0, turbidity: 2.3, tds: 215 },
      { time: "16:00", ph: 7.4, dissolvedOxygen: 9.2, turbidity: 2.2, tds: 212 },
      { time: "20:00", ph: 7.4, dissolvedOxygen: 9.3, turbidity: 2.0, tds: 209 },
      { time: "Now", ph: 7.4, dissolvedOxygen: 9.2, turbidity: 2.1, tds: 210 },
    ]
  }
];

export const PRESET_SCENARIOS = {
  chemicalSpill: {
    label: "Chemical Spill",
    description: "Acute toxic acid surge & industrial surge",
    ph: 4.2,
    dissolvedOxygen: 1.4,
    turbidity: 95.0,
    tds: 2100,
    anomalyType: "Acute Industrial Solute Injection",
  },
  algalBloom: {
    label: "Algal Bloom",
    description: "Eutrophication with hyper-alkalinity & nocturnal hypoxia",
    ph: 9.3,
    dissolvedOxygen: 3.2,
    turbidity: 48.0,
    tds: 920,
    anomalyType: "Microcystis Cyanobacterial Bloom",
  },
  pristine: {
    label: "Pristine Baseline",
    description: "Optimal ecological balance & coldwater saturation",
    ph: 7.4,
    dissolvedOxygen: 9.5,
    turbidity: 2.0,
    tds: 190,
    anomalyType: "Nominal Ecological Equilibrium",
  }
};
