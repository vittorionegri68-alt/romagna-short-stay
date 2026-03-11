# Romagna Affitti Brevi

Directory di strutture per affitti brevi, B&B e case vacanze in Emilia-Romagna.

## Stack

- React + Vite
- Stile inline (nessun file CSS separato)
- Font: Cormorant Garamond + DM Sans (Google Fonts)
- Deploy: Vercel

## Avvio locale

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Su Vercel: connetti la repo GitHub e Vercel fa il resto automaticamente.

## Come aggiungere una struttura

1. Aggiungi le immagini in `src/assets/strutture/<nome-struttura>/cover.jpg`
2. Modifica `src/strutture.js` — aggiungi l'import e compila il template

Vedi `src/assets/strutture/README.md` per istruzioni dettagliate.

## Struttura del progetto

```
romagna-affitti-brevi/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx          ← UI principale (bacheca, card, filtri)
    ├── strutture.js     ← Dati di tutte le strutture
    └── assets/
        └── strutture/
            ├── README.md
            └── casa-cavour/
                └── cover.jpg   ← da inserire
```
