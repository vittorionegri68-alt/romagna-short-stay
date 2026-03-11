// ─────────────────────────────────────────────────────────────────────────────
// strutture.js — Property data for Romagna Short Rentals
//
// To add a new property:
// 1. Create folder src/assets/Strutture/<name>/
// 2. Add cover.jpg to the folder
// 3. Add the import at the top of this file
// 4. Copy the template below and fill in all fields
// ─────────────────────────────────────────────────────────────────────────────

// ── TEMPLATE — copy this block to add a new property ─────────────────────────
  // {
  //   id: "property-name",
  //   nome: "Property Name",
  //   cover: "https://...",           // external URL OR local import
  //   localita: "City (PR)",
  //   regione: "Emilia-Romagna",
  //   tipologia: "Villa",             // Appartamento / B&B / Villa / Agriturismo
  //   ospiti: 8,
  //   camere: 4,
  //   bagni: 2,
  //   animali: true,
  //   descrizione: "Short description...",
  //   tag: ["Pool", "WiFi", "BBQ"],
  //   distanze: [
  //     { luogo: "Rimini", tempo: "10 min" },
  //     { luogo: "San Marino", tempo: "25 min" },
  //   ],
  //   rating: 4.9,
  //   recensioni: 12,
  //   prezzo_da: 150,
  //   url: "https://your-site.vercel.app/",
  //   airbnb: "https://airbnb.com/h/...",
  //   attivo: true,
  // },

import casaCavourCover from './assets/strutture/casa-cavour/Cover.jpg'
import perlacover from './assets/strutture/perla/cover.jpg'
import scalinocover from './assets/strutture/Teatro/cover.jpg'

export const strutture = [
  {
    id: "casa-cavour",
    nome: "Casa Cavour",
    cover: casaCavourCover,
    localita: "Bertinoro (FC)",
    regione: "Emilia-Romagna",
    tipologia: "Appartamento",
    ospiti: 4,
    camere: 2,
    bagni: 1,
    animali: true,
    descrizione: "Design apartment in the historic centre of Bertinoro — the \"Balcony of Romagna\". Curated furnishings, full kitchen, fibre WiFi. Perfect for couples, families and remote workers.",
    tag: ["Fibre WiFi", "Full kitchen", "A/C", "Public parking", "Self check-in"],
    distanze: [
      { luogo: "Cesena", tempo: "15 min" },
      { luogo: "Cesenatico", tempo: "30 min" },
      { luogo: "San Marino", tempo: "35 min" },
      { luogo: "Rimini", tempo: "40 min" },
      { luogo: "Bologna", tempo: "60 min" },
    ],
    rating: 5.0,
    recensioni: 24,
    prezzo_da: 85,
    url: "https://casa-cavour-en.vercel.app/",
    airbnb: "https://airbnb.com/h/casacavour-bertinoro",
    attivo: true,
  },

  {
    id: "La-Perla-del-Mare",
    nome: "La Perla del Mare",
    cover: perlacover,
    localita: "Cesenatico (FC)",
    regione: "Emilia-Romagna",
    tipologia: "Appartamento",
    ospiti: 6,
    camere: 2,
    bagni: 1,
    animali: true,
    descrizione: "In the heart of Cesenatico, steps from the sea. La Perla del Mare features a lift, balconies and a private garage — perfect for families, groups of friends and remote workers thanks to fast WiFi.",
    tag: ["Fibre WiFi", "Full kitchen", "A/C", "Lift", "Bicycles", "Private garage", "Self check-in"],
    distanze: [
      { luogo: "Parco di Levante", tempo: "4 min" },
      { luogo: "Beach", tempo: "400 m" },
      { luogo: "Cesena", tempo: "15 min" },
      { luogo: "San Marino", tempo: "35 min" },
      { luogo: "Rimini", tempo: "40 min" },
      { luogo: "Bologna", tempo: "60 min" },
    ],
    rating: 5.0,
    recensioni: 26,
    prezzo_da: 120,
    url: "https://www.airbnb.it/rooms/1310946139319199865?adults=4&search_mode=regular_search&check_in=2025-03-20&check_out=2025-03-25&children=0&infants=0&pets=0&source_impression_id=p3_1742416555_P3xjNrF5P55kSM1D&previous_page_section_name=1000&federated_search_id=54d46396-a5b9-4f12-919f-4386ba2ec412",
    airbnb: "https://www.airbnb.it/rooms/1310946139319199865?adults=4&search_mode=regular_search&check_in=2025-03-20&check_out=2025-03-25&children=0&infants=0&pets=0&source_impression_id=p3_1742416555_P3xjNrF5P55kSM1D&previous_page_section_name=1000&federated_search_id=54d46396-a5b9-4f12-919f-4386ba2ec412",
    attivo: true,
  },

  {
    id: "Scalino-66",
    nome: "Scalino 66",
    cover: scalinocover,
    localita: "Cesena (FC)",
    regione: "Emilia-Romagna",
    tipologia: "Appartamento",
    ospiti: 2,
    camere: 1,
    bagni: 1,
    animali: true,
    descrizione: "Bright newly renovated one-bedroom flat on the third floor (no lift), in the historic centre of Cesena, steps from cafes, restaurants and public transport. Scalino 66 takes its name from the 66 steps you climb to reach the apartment.",
    tag: ["WiFi", "Full kitchen", "A/C", "Bright", "Historic centre", "Self check-in"],
    distanze: [
      { luogo: "Cesenatico", tempo: "25 min" },
      { luogo: "San Marino", tempo: "45 min" },
      { luogo: "Rimini", tempo: "30 min" },
    ],
    rating: 5.0,
    recensioni: 12,
    prezzo_da: 125,
    url: "https://www.airbnb.it/rooms/1388960535225462602?source_impression_id=p3_1773137227_P3LTxQgztVFjnYT2",
    airbnb: "https://www.airbnb.it/rooms/1388960535225462602?source_impression_id=p3_1773137227_P3LTxQgztVFjnYT2",
    attivo: true,
  },
];
