# Public Marketplace - Standalone Website

This folder contains everything needed to run the Public Marketplace as a **separate/white-labeled website**.

## Files to Copy for Standalone Website

### 1. Root Configuration Files (from `D:\v5\echo.copym-v5\`)
Copy these files to your new marketplace website root:

```
✅ package.json              - All dependencies
✅ vite.config.js            - Vite build configuration
✅ tailwind.config.js        - Tailwind CSS configuration
✅ postcss.config.js         - PostCSS configuration
✅ index.html                - Main HTML entry point
✅ vercel.json               - Vercel deployment config
✅ .gitignore                - Git ignore rules
```

### 2. Source Files Structure

Create this folder structure:

```
marketplace-website/
├── src/
│   ├── pages/
│   │   └── PublicMarketplace/
│   │       ├── PublicMarketplace.jsx    ✅ COPY from D:\v5\echo.copym-v5\src\pages\PublicMarketplace\
│   │       └── sections/
│   │           └── Publicmarketplace.jsx ✅ COPY from D:\v5\echo.copym-v5\src\pages\PublicMarketplace\sections\
│   ├── App.jsx                          ✅ CREATE NEW (see below)
│   ├── main.jsx                         ✅ COPY from D:\v5\echo.copym-v5\src\
│   └── index.css                        ✅ COPY from D:\v5\echo.copym-v5\src\
├── public/                              ✅ COPY entire folder from D:\v5\echo.copym-v5\
├── package.json                         ✅ COPY from D:\v5\echo.copym-v5\
├── vite.config.js                       ✅ COPY from D:\v5\echo.copym-v5\
├── tailwind.config.js                   ✅ COPY from D:\v5\echo.copym-v5\
├── postcss.config.js                    ✅ COPY from D:\v5\echo.copym-v5\
└── index.html                           ✅ COPY from D:\v5\echo.copym-v5\
```

### 3. New App.jsx for Marketplace (Minimal)

Create `src/App.jsx`:

```jsx
import React from 'react';
import PublicMarketplace from './pages/PublicMarketplace/PublicMarketplace';

function App() {
  return (
    <div className="min-h-screen">
      <PublicMarketplace />
    </div>
  );
}

export default App;
```

### 4. Installation & Run Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Dependencies Required

All dependencies are in `package.json`. Key ones for PublicMarketplace:

- `react` & `react-dom` - React framework
- `framer-motion` - Animations
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `react-router-dom` - Routing (if needed)

## Notes

- The marketplace has **5 asset categories**: Real Estate, Commodities, Arts, Sports, Carbon Credits
- All filters are functional (Country → City → Search)
- Mock data is included (can be replaced with API calls)
- Responsive design (mobile-first)
