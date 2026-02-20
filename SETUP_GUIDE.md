# Marketplace Standalone Website - Setup Guide

## Quick Start

### Step 1: Create New Project Folder

```bash
mkdir marketplace-website
cd marketplace-website
```

### Step 2: Copy Files from This Directory

Copy these files from `D:\v5\echo.copym-v5\src\pages\PublicMarketplace\`:

```
✅ App.jsx
✅ main.jsx
✅ README.md
✅ sections/Publicmarketplace.jsx
✅ PublicMarketplace.jsx
```

### Step 3: Copy Root Configuration Files

From `D:\v5\echo.copym-v5\` copy:

```
✅ package.json
✅ vite.config.js
✅ tailwind.config.js
✅ postcss.config.js
✅ index.html
✅ vercel.json (optional, for Vercel deployment)
```

### Step 4: Copy src Files

From `D:\v5\echo.copym-v5\src\` copy:

```
✅ index.css (entire file - contains all styles and Tailwind config)
```

### Step 5: Copy Public Folder

From `D:\v5\echo.copym-v5\public\` copy the entire `public` folder with all assets.

### Step 6: Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` to see the marketplace.

---

## File Structure

Your final structure should look like:

```
marketplace-website/
├── src/
│   ├── App.jsx                    ← From PublicMarketplace folder
│   ├── main.jsx                   ← From PublicMarketplace folder
│   └── index.css                  ← From D:\v5\echo.copym-v5\src\
├── public/                        ← Entire folder from D:\v5\echo.copym-v5\
├── index.html                     ← From D:\v5\echo.copym-v5\
├── package.json                   ← From D:\v5\echo.copym-v5\
├── vite.config.js                 ← From D:\v5\echo.copym-v5\
├── tailwind.config.js             ← From D:\v5\echo.copym-v5\
├── postcss.config.js              ← From D:\v5\echo.copym-v5\
└── vercel.json                    ← Optional (for Vercel deployment)
```

---

## Features Included

✅ **5 Asset Categories**:
- Real Estate (with Property Type, Investment Strategy, Location filters)
- Commodities (with Category, Type, Origin filters)
- Arts (with Type, Artist Tier, Authentication filters)
- Sports (with Asset Type, Sport Type, Revenue Model filters)
- Carbon Credits (with Project Type, Standard, Credit Type filters)

✅ **Advanced Filters**:
- Country → City dependent dropdowns
- Search within location
- Multi-select filters
- Sort by price/token percentage

✅ **Responsive Design**: Mobile, tablet, desktop

✅ **Interactive Cards**: Hover animations with slide effect

---

## Customization

### Update Mock Data

Edit `src/pages/PublicMarketplace/sections/Publicmarketplace.jsx`:

- Replace `MOCK_INVESTMENTS` with API calls
- Update asset data as needed

### Change Branding

- Update colors in `tailwind.config.js`
- Replace logos in `public/` folder
- Modify hero text in the Publicmarketplace component

---

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Other Platforms

```bash
npm run build
# Deploy the 'dist' folder to your hosting
```

---

## Support

For issues or questions, check the main project documentation.
