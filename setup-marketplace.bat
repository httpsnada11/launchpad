@echo off
REM ================================================================
REM Marketplace Standalone Website - Automated Setup Script
REM ================================================================
REM This script copies all required files to create a standalone
REM marketplace website.
REM ================================================================

echo.
echo ================================================================
echo  MARKETPLACE STANDALONE WEBSITE - SETUP
echo ================================================================
echo.

REM Set source and target paths
set SOURCE=D:\v5\echo.copym-v5
set TARGET=C:\marketplace-website

echo Source: %SOURCE%
echo Target: %TARGET%
echo.

REM Create target directory structure
echo [1/6] Creating directory structure...
mkdir %TARGET% 2>nul
mkdir %TARGET%\src
mkdir %TARGET%\src\pages
mkdir %TARGET%\src\pages\PublicMarketplace
mkdir %TARGET%\src\pages\PublicMarketplace\sections
mkdir %TARGET%\public
echo Done!
echo.

REM Copy root configuration files
echo [2/6] Copying configuration files...
copy /Y "%SOURCE%\package.json" "%TARGET%\"
copy /Y "%SOURCE%\vite.config.js" "%TARGET%\"
copy /Y "%SOURCE%\tailwind.config.js" "%TARGET%\"
copy /Y "%SOURCE%\postcss.config.js" "%TARGET%\"
copy /Y "%SOURCE%\index.html" "%TARGET%\"
copy /Y "%SOURCE%\vercel.json" "%TARGET%\" 2>nul
echo Done!
echo.

REM Copy source files
echo [3/6] Copying source files...
copy /Y "%SOURCE%\src\index.css" "%TARGET%\src\"
echo Done!
echo.

REM Copy App.jsx and main.jsx
echo [4/6] Copying React entry points...
copy /Y "%SOURCE%\src\pages\PublicMarketplace\App.jsx" "%TARGET%\src\"
copy /Y "%SOURCE%\src\pages\PublicMarketplace\main.jsx" "%TARGET%\src\"
echo Done!
echo.

REM Copy PublicMarketplace pages
echo [5/6] Copying PublicMarketplace components...
copy /Y "%SOURCE%\src\pages\PublicMarketplace\PublicMarketplace.jsx" "%TARGET%\src\pages\PublicMarketplace\"
copy /Y "%SOURCE%\src\pages\PublicMarketplace\sections\Publicmarketplace.jsx" "%TARGET%\src\pages\PublicMarketplace\sections\"
echo Done!
echo.

REM Copy public folder
echo [6/6] Copying public assets...
xcopy /E /I /Y "%SOURCE%\public\*" "%TARGET%\public\"
echo Done!
echo.

echo ================================================================
echo  SETUP COMPLETE!
echo ================================================================
echo.
echo Next steps:
echo.
echo 1. Navigate to the new folder:
echo    cd %TARGET%
echo.
echo 2. Install dependencies:
echo    npm install
echo.
echo 3. Run development server:
echo    npm run dev
echo.
echo 4. Visit: http://localhost:5173
echo.
echo ================================================================
echo.
pause
