
Objective
Expose marketplace listings in read-only mode for showcase pages using a new public endpoint, without authentication.

🔵 BACKEND IMPLEMENTATION PLAN
1️⃣ Endpoint Overview
Endpoint Name
GET /api/marketplace/public
Purpose
Fetch all LISTED marketplace items


Read-only


No authentication


Same core data as /api/marketplace/marketplace, but trimmed



2️⃣ Database Tables Used
Table
Usage
marketplace
Main source of listings
token
Token metadata
asset
Asset details (category, image, ESG, etc.)
issuer
Issuer identity
companyProfile
Issuer branding (logo, legal name)

❌ Do NOT query
token_purchases


ownership


vault


users (beyond issuer reference)



3️⃣ Folder & File Structure
routes/
  Marketplace.routes.js

controllers/
  Marketplace.controller.js

services/
  Marketplace.service.js


4️⃣ Router Layer
routes/Marketplace.routes.js  //ADD NEW ROUTE
import express from 'express';
import { getPublicMarketplace } from '../controllers/publicMarketplace.controller.js';  

const router = express.Router();

router.get('/public', getPublicMarketplace);

export default router;


5️⃣ Controller Layer
controllers/Marketplace.controller.js
import { fetchPublicMarketplaceListings } from '../services/publicMarketplace.service.js';

export const getPublicMarketplace = async (req, res) => {
  try {
    const listings = await fetchPublicMarketplaceListings();

    res.json({
      success: true,
      data: {
        listings
      }
    });
  } catch (error) {
    console.error('Public marketplace error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch marketplace listings'
    });
  }
};


6️⃣ Service Layer (Core Logic)
services/Marketplace.service.js
import prisma from '../prisma/client.js';

export const fetchPublicMarketplaceListings = async () => {
  const listings = await prisma.marketplace.findMany({
    where: {
      status: 'LISTED'
    },
    include: {
      token: {
        include: {
          asset: true
        }
      },
      issuer: {
        include: {
          companyProfile: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return listings.map(listing => {
    const token = listing.token;
    const asset = token?.asset;
    const issuer = listing.issuer;

    return {
      // Listing
      id: listing.id,
      createdAt: listing.createdAt,

      // Asset / Token
      name: token?.name,
      symbol: token?.symbol,
      description: token?.description || asset?.description,
      category: asset?.category,
      network: token?.blockchain || 'ETH',
      imageUrl: asset?.imageUrl || token?.imageUrl,

      // Supply & Pricing
      price: listing.price,
      priceUsd: listing.priceUsd,
      currency: listing.currency || 'ETH',
      availableSupply: listing.amount,
      totalSupply: token?.totalSupply,

      // Issuer (branding only)
      issuer: {
        name: issuer?.companyProfile?.legalName || 'Verified Issuer',
        logoUrl: issuer?.companyProfile?.logoUrl || null
      },

      // Optional display fields
      esgScore: asset?.esgScore || null
    };
  });
};


7️⃣ Response Format (Final)
Success Response
{
  "success": true,
  "data": {
    "listings": [
      {
        "id": "uuid",
        "name": "Green Energy Token",
        "symbol": "GET",
        "description": "Solar-backed asset",
        "category": "ENERGY",
        "network": "ETH",
        "imageUrl": "...",
        "price": "0.015",
        "priceUsd": "45",
        "currency": "ETH",
        "availableSupply": 100000,
        "totalSupply": 1000000,
        "issuer": {
          "name": "Green Power Ltd",
          "logoUrl": "/uploads/logo.png"
        },
        "esgScore": "A"
      }
    ]
  }
}


8️⃣ Timeline (Backend)
Day
Task
Day 1
Create route + controller + service




Day 2
QA + frontend handoff


🟢 FRONTEND / UI IMPLEMENTATION PLAN
Endpoint to Use
GET /marketplace/public

❌ No auth token
 ❌ No headers beyond Content-Type

Data Usage Rules (UI Team)
Allowed
Asset cards


Asset details page


Filters


Search


Category images


Remove / Disable
Buy button


Wallet balance


Ownership %


Transaction history


Vault info



Frontend Integration Steps
1️⃣ API Service
export const fetchPublicMarketplace = async () => {
  const res = await fetch(`${API_BASE_URL}/marketplace/public`);
  return res.json();
};


2️⃣ UI Behaviour
Marketplace page loads without login


CTA button:


 “Login to invest”



Clicking asset opens read-only details page



Timeline (Frontend)
Day
Task
Day 1
Hook public endpoint
Day 2
Disable investor features
Day 3
UI polish + QA


✅ Final Deliverables
/marketplace/public  endpoint live


Read-only marketplace UI


No auth dependency


No investor data exposure



