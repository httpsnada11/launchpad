# Public Marketplace API Endpoints

## Overview
This document outlines all required API endpoints to make the Public Marketplace page fully functional. The marketplace supports multiple asset categories with category-specific filtering and details.

---

## Base URL
```
/api/v1/marketplace
```

---

## Table of Contents
1. [Investment Listings](#investment-listings)
2. [Category-Specific Endpoints](#category-specific-endpoints)
3. [Filter & Search](#filter--search)
4. [Investment Details](#investment-details)
5. [Issuer/Provider Information](#issuerprovider-information)
6. [User Actions](#user-actions)

---

## Investment Listings

### GET `/listings`
Fetch all investment listings with optional filtering, sorting, and pagination.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category: `REAL_ESTATE`, `COMMODITIES`, `ARTS`, `SPORTS`, `CARBON_CREDITS`, `LUXURY_GOODS` |
| `status` | string | No | Filter by status: `open`, `coming-soon`, `sold-out` |
| `search` | string | No | Search query for title, tokenSymbol, issuerName |
| `sortBy` | string | No | Sort option: `price_desc`, `price_asc`, `tokens_desc`, `tokens_asc` |
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "UK Property Tokens",
      "tokenSymbol": "UKPT",
      "category": "REAL_ESTATE",
      "esgScore": "A+",
      "roi": "12%",
      "cagr": "15.50%",
      "issuerName": "London Estates",
      "issuerLogo": "https://...",
      "assetPrice": "AED 1M",
      "tokenPriceETH": "0.015 ETH",
      "tokenPriceUSD": "$45 USD",
      "availableTokens": 100000,
      "totalTokens": 1000000,
      "status": "coming-soon",
      "image": "https://...",
      "badge": "COMING SOON",
      "launchDate": "Coming soon",
      "progress": 0,
      "priceVal": 100000,
      "tokenPercentage": 0
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## Category-Specific Endpoints

### Real Estate

#### GET `/listings/real-estate`
Fetch real estate listings with property-specific filters.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `propertyType` | string | No | `Residential`, `Commercial`, `Land`, `Multi-Units` |
| `investmentStrategy` | string[] | No | `Capital Growth`, `High-Yield`, `Prime`, `Fix & Flip` |
| `completionStatus` | string | No | `Ready`, `Under Construction`, `Off-Plan` |
| `country` | string | No | Country filter |
| `city` | string | No | City filter |
| `location` | string | No | Location search within area |
| `minBeds` | integer | No | Minimum bedrooms (Residential only) |
| `maxBeds` | integer | No | Maximum bedrooms (Residential only) |
| `minPrice` | number | No | Minimum asset price |
| `maxPrice` | number | No | Maximum asset price |

**Response:** Same as GET `/listings` with real estate-specific fields:
```json
{
  "data": [
    {
      "...": "base listing fields",
      "propertyType": "Residential",
      "investmentStrategy": "Capital Growth",
      "beds": 2,
      "country": "UK",
      "city": "London",
      "location": "Kensington",
      "completionStatus": "Ready"
    }
  ]
}
```

---

### Commodities

#### GET `/listings/commodities`
Fetch commodities listings with category-specific filters.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `commodityCategory` | string | No | `Precious Metals`, `Energy Commodities`, `Agricultural Commodities`, `Industrial / Strategic Metals` |
| `commodityType` | string | No | Specific type (e.g., `Gold`, `Silver`, `Solar farm revenue share`, `Wheat`) |
| `investmentStrategy` | string[] | No | Investment strategy filters |
| `country` | string | No | Country of origin |
| `city` | string | No | City of origin |
| `location` | string | No | Location search |

**Response:**
```json
{
  "data": [
    {
      "...": "base listing fields",
      "commodityCategory": "Precious Metals",
      "commodityType": "Gold",
      "country": "South Africa",
      "region": "Africa",
      "location": "Johannesburg"
    }
  ]
}
```

---

### Arts

#### GET `/listings/arts`
Fetch art investment listings.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `artType` | string | No | `Paintings`, `Sculptures`, `Photography`, `Digital / Mixed Media` |
| `artistTier` | string | No | `Emerging`, `Mid-Career`, `Established`, `Blue-Chip` |
| `investmentStrategy` | string[] | No | `Capital Growth`, `Blue-Chip Stability`, `Speculative Upside`, `Curated Portfolio` |
| `authentication` | string[] | No | `Authenticated`, `Museum Exhibited`, `Auction Proven`, `Private Collection Verified` |
| `country` | string | No | Country |
| `city` | string | No | City |
| `location` | string | No | Location search |
| `artistName` | string | No | Search by artist name |

**Response:**
```json
{
  "data": [
    {
      "...": "base listing fields",
      "artType": "Paintings",
      "artistName": "Claude Monet",
      "artistTier": "Blue-Chip",
      "yearCreated": 1906,
      "authentication": ["Authenticated", "Museum Exhibited"],
      "provenance": "Private Collection, Paris",
      "exhibitionHistory": "Musée d'Orsay 2019",
      "country": "France",
      "region": "Europe",
      "location": "Paris"
    }
  ]
}
```

---

### Sports

#### GET `/listings/sports`
Fetch sports investment listings.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `assetType` | string | No | `Athlete Revenue Share`, `Sports Academy Investment`, `Club / Franchise Equity`, `Media Rights Revenue`, `Tournament Revenue Pool` |
| `sportType` | string | No | `Football`, `Cricket`, `Basketball`, `Tennis`, `Motorsports`, `Others` |
| `investmentStrategy` | string[] | No | `Revenue Yield`, `Growth Potential`, `Performance-Linked`, `Franchise Stability` |
| `revenueModel` | string[] | No | `Contracted Revenue Share`, `Sponsorship Income`, `Media Rights Distribution`, `Prize Pool Distribution`, `Equity Appreciation` |
| `athleteName` | string | No | Search by athlete name |
| `teamAffiliation` | string | No | Filter by team/league |
| `country` | string | No | Country |
| `city` | string | No | City |
| `location` | string | No | Location search |

**Response:**
```json
{
  "data": [
    {
      "...": "base listing fields",
      "assetType": "Athlete Revenue Share",
      "sportType": "Football",
      "athleteName": "Cristiano Ronaldo",
      "teamAffiliation": "Al Nassr FC",
      "revenueModel": "Contracted Revenue Share",
      "contractValue": "$200M",
      "contractDuration": "3 years",
      "country": "Saudi Arabia",
      "region": "Middle East",
      "location": "Riyadh"
    }
  ]
}
```

---

### Carbon Credits

#### GET `/listings/carbon-credits`
Fetch carbon credit investment listings.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectType` | string | No | `Forestry`, `Renewable Energy`, `Methane Capture`, `Industrial Reduction`, `Blue Carbon` |
| `standard` | string | No | `VARA Standards`, `Gold Standard` |
| `investmentStrategy` | string[] | No | `Capital Appreciation`, `Yield via Offtake`, `Long-Term Impact`, `ESG Allocation` |
| `creditType` | string[] | No | `Avoidance`, `Removal`, `Nature-Based`, `Tech-Based` |
| `sdgAlignment` | string | No | SDG goals alignment (e.g., `SDG 13, 15`) |
| `country` | string | No | Country |
| `city` | string | No | City |
| `location` | string | No | Location search / project location |

**Response:**
```json
{
  "data": [
    {
      "...": "base listing fields",
      "projectType": "Forestry",
      "standard": "Gold Standard",
      "creditType": "Nature-Based",
      "co2Volume": "50,000 tonnes/year",
      "sdgAlignment": "SDG 13, 15",
      "projectLocation": "Brazil",
      "permanencePeriod": "100 years",
      "country": "Brazil",
      "region": "South America",
      "location": "Amazon Basin"
    }
  ]
}
```

---

### Luxury Goods

#### GET `/listings/luxury-goods`
Fetch luxury goods investment listings.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `assetType` | string | No | `Cars`, `Watches`, `Yachts`, `Private Jets`, `Designer Handbags`, `Jewelry` |
| `luxuryCategory` | string | No | `Fine Jewelry`, `Fine Wine & Spirits`, `Luxury Watches`, `Designer Fashion`, `Classic Cars`, `Collectibles` |
| `investmentStrategy` | string[] | No | `Capital Appreciation`, `Blue-Chip Stability`, `Speculative Upside`, `Yield via Appreciation`, `Rare Asset Collection`, `Limited Edition Scarcity`, `Rental / Charter Yield`, `Long-Term Collectible` |
| `usageModel` | string | No | `Storage Only`, `Rental Revenue Share`, `Charter Income`, `Fractional Usage` |
| `verification` | string[] | No | `Manufacturer Certified`, `Service History Verified`, `Insurance Covered`, `Independently Valued` |
| `rarity` | string | No | `Flawless`, `Ultra Rare`, `Rare`, `Limited Edition`, `Exclusive` |
| `brand` | string | No | Brand filter (e.g., `Patek Philippe`, `Rolex`, `Ferrari`) |
| `country` | string | No | Country |
| `city` | string | No | City |
| `location` | string | No | Location search |

**Response:**
```json
{
  "data": [
    {
      "...": "base listing fields",
      "assetType": "Watches",
      "luxuryCategory": "Luxury Watches",
      "luxuryType": "Swiss Watches",
      "brand": "Patek Philippe",
      "rarity": "Rare",
      "certification": "Swiss Certified",
      "usageModel": "Storage Only",
      "verification": ["Manufacturer Certified", "Service History Verified"],
      "country": "Switzerland",
      "region": "Europe",
      "location": "Geneva"
    }
  ]
}
```

---

## Filter & Search

### GET `/filters/options`
Fetch available filter options for each category (for populating dropdowns).

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | Yes | Category to get filter options for |

**Response:**
```json
{
  "propertyTypes": ["Residential", "Commercial", "Land", "Multi-Units"],
  "investmentStrategies": ["Capital Growth", "High-Yield", "Prime", "Fix & Flip"],
  "completionStatuses": ["Ready", "Under Construction", "Off-Plan"],
  "countries": [
    { "code": "UK", "name": "United Kingdom", "cities": ["London", "Manchester"] },
    { "code": "UAE", "name": "United Arab Emirates", "cities": ["Dubai", "Abu Dhabi"] },
    { "code": "USA", "name": "United States", "cities": ["New York", "Los Angeles", "Miami"] }
  ],
  "bedOptions": ["1", "2", "3", "4", "5", "6"],
  "commodityCategories": ["Precious Metals", "Energy Commodities", "Agricultural Commodities", "Industrial / Strategic Metals"],
  "artsTypes": ["Paintings", "Sculptures", "Photography", "Digital / Mixed Media"],
  "artistTiers": ["Emerging", "Mid-Career", "Established", "Blue-Chip"],
  "sportsAssetTypes": ["Athlete Revenue Share", "Sports Academy Investment", "Club / Franchise Equity", "Media Rights Revenue", "Tournament Revenue Pool"],
  "carbonProjectTypes": ["Forestry", "Renewable Energy", "Methane Capture", "Industrial Reduction", "Blue Carbon"],
  "carbonStandards": ["VARA Standards", "Gold Standard"],
  "luxuryBrands": ["Patek Philippe", "Rolex", "Ferrari", "Hermès", "Chanel"],
  "luxuryRarityLevels": ["Flawless", "Ultra Rare", "Rare", "Limited Edition", "Exclusive"]
}
```

### GET `/filters/sort-options`
Fetch available sort options.

**Response:**
```json
{
  "sortOptions": [
    { "label": "Listing Price > Highest to low", "value": "price_desc" },
    { "label": "Listing Price > Lowest to high", "value": "price_asc" },
    { "label": "Percentage Tokens > Lowest first", "value": "tokens_asc" },
    { "label": "Percentage Tokens > Highest first", "value": "tokens_desc" }
  ]
}
```

---

## Investment Details

### GET `/listings/:id`
Fetch detailed information for a specific investment listing.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Listing ID |

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "UK Property Tokens",
    "tokenSymbol": "UKPT",
    "category": "REAL_ESTATE",
    "description": "Premium UK property tokenized investment opportunity...",
    "esgScore": "A+",
    "roi": "12%",
    "cagr": "15.50%",
    "issuer": {
      "name": "London Estates",
      "logo": "https://...",
      "id": 101,
      "verified": true,
      "rating": 4.8
    },
    "assetPrice": "AED 1M",
    "assetPriceValue": 1000000,
    "tokenPriceETH": "0.015 ETH",
    "tokenPriceUSD": "$45 USD",
    "availableTokens": 100000,
    "totalTokens": 1000000,
    "tokensSold": 0,
    "status": "coming-soon",
    "image": "https://...",
    "gallery": ["https://...", "https://..."],
    "badge": "COMING SOON",
    "launchDate": "2026-03-15T00:00:00Z",
    "progress": 0,
    "priceVal": 100000,
    "tokenPercentage": 0,
    "propertyType": "Residential",
    "investmentStrategy": "Capital Growth",
    "beds": 2,
    "country": "UK",
    "city": "London",
    "location": "Kensington",
    "completionStatus": "Ready",
    "documents": [
      { "type": "prospectus", "url": "https://...", "name": "Investment Prospectus" },
      { "type": "factsheet", "url": "https://...", "name": "Factsheet" }
    ],
    "riskDisclosure": "Investment in tokenized assets carries risks...",
    "minimumInvestment": {
      "tokens": 10,
      "usd": 450
    },
    "fees": {
      "managementFee": "1.5%",
      "performanceFee": "10%"
    }
  }
}
```

---

## Issuer/Provider Information

### GET `/issuers/:id`
Fetch issuer details.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Issuer ID |

**Response:**
```json
{
  "data": {
    "id": 101,
    "name": "London Estates",
    "logo": "https://...",
    "verified": true,
    "rating": 4.8,
    "totalListings": 12,
    "totalRaised": "$50M",
    "description": "Leading UK property investment firm...",
    "website": "https://...",
    "founded": 2010,
    "headquarters": "London, UK",
    "regulatoryLicenses": ["FCA Regulated", "VARA Licensed"]
  }
}
```

### GET `/issuers/:id/listings`
Fetch all listings by a specific issuer.

**Response:** Same as GET `/listings` filtered by issuer.

---

## User Actions

### POST `/listings/:id/interest`
Register user interest in a listing (for coming soon notifications).

**Request Body:**
```json
{
  "userId": "user_123",
  "email": "user@example.com",
  "notifyOnLaunch": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "You will be notified when this listing launches"
}
```

### POST `/listings/:id/invest`
Initiate investment in a listing.

**Request Body:**
```json
{
  "userId": "user_123",
  "tokenAmount": 100,
  "paymentMethod": "ETH",
  "walletAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "tx_abc123",
  "tokensAllocated": 100,
  "totalCost": {
    "eth": "1.5 ETH",
    "usd": "$4,500 USD"
  },
  "nextSteps": "Complete payment within 24 hours"
}
```

### GET `/listings/:id/analytics`
Fetch listing analytics and performance data.

**Response:**
```json
{
  "data": {
    "views": 1250,
    "favorites": 89,
    "interestedUsers": 156,
    "priceHistory": [
      { "date": "2026-01-01", "price": 40 },
      { "date": "2026-02-01", "price": 45 }
    ],
    "similarListings": [...]
  }
}
```

---

## WebSocket Events (Real-time Updates)

### Connection
```
wss://api.example.com/v1/marketplace/ws
```

### Subscribe to Listing Updates
```json
{
  "action": "subscribe",
  "listingId": 1
}
```

### Events Received
```json
{
  "type": "TOKEN_SOLD",
  "listingId": 1,
  "availableTokens": 99900,
  "tokenPercentage": 10,
  "timestamp": "2026-02-23T10:30:00Z"
}
```

```json
{
  "type": "STATUS_CHANGE",
  "listingId": 1,
  "oldStatus": "open",
  "newStatus": "sold-out",
  "timestamp": "2026-02-23T10:30:00Z"
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "LISTING_NOT_FOUND",
    "message": "The requested listing does not exist",
    "statusCode": 404
  }
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| `LISTING_NOT_FOUND` | 404 | Listing ID doesn't exist |
| `INVALID_FILTER` | 400 | Invalid filter parameter |
| `UNAUTHORIZED` | 401 | Authentication required |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## Rate Limiting

| Endpoint | Rate Limit |
|----------|------------|
| GET `/listings` | 100 requests/minute |
| GET `/listings/:id` | 200 requests/minute |
| POST `/listings/:id/invest` | 10 requests/minute |
| WebSocket | 50 messages/minute |

---

## Authentication

Most endpoints are public, but user-specific actions require authentication:

**Header:**
```
Authorization: Bearer <jwt_token>
```

**Endpoints requiring auth:**
- `POST /listings/:id/interest`
- `POST /listings/:id/invest`
- `GET /listings/:id/analytics` (for issuers only)
