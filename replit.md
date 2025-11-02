# TruthDetectorPro - Project Guide

## Overview

TruthDetectorPro is an AI-powered fact-checking and verification platform with **two deployment options**:

1. **PWA (Progressive Web App)** - Installable website for on-demand fact checks
2. **Chrome Extension (Scam Radar)** - Always-on background protection with automatic risk detection

The platform is built as a full-stack web application with a React TypeScript frontend and Express backend, designed to provide fast, accurate fact-checking capabilities with a distinctive dark theme featuring ink backgrounds (#0B0E12) and copper/gold accents (#C69C6D).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack Query (React Query) for server state
- **UI Framework:** Shadcn/ui components built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design system

**Design System:**
- Typography: Inter for UI/body text, JetBrains Mono for data display
- Color scheme: Dark theme with custom palette:
  - Ink: #0B0E12 (primary dark background)
  - Copper: #C69C6D (gold accent for borders/highlights)
  - Bronze: #A87C48 (secondary gold accent)
  - Safe: #2AD17B (green for success states)
  - Warn: #FFB020 (orange for warnings)
  - Patina: #2A8C82 (teal accent)
- Spacing system: Consistent Tailwind units (2, 4, 8, 12, 16)
- Component library: Comprehensive set of reusable UI components from Shadcn/ui

**Key Frontend Components:**
- Landing page (Home): Dark-themed hero with gradient accent bar, badge component, and CTA buttons
- Transparency dashboard: Live metrics display with 4 stat cards (Uptime, Accuracy, Scans, Risky Rate)
- Data visualization: Recharts area chart showing 30-day scan volume vs risky flags
- Brand components: LogoMark SVG with gradient, BadgePill system
- Navigation: Wouter-based routing between Home and Transparency pages
- Form handling with React Hook Form and Zod validation (backend ready)

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js (standalone single-file server)
- **CORS:** Enabled for development cross-origin requests

**Server Architecture:**
- **Single-file design:** `server/index.ts` contains all server logic
- **ESM-based:** Runs as ESM in both development and production
- **Development:** Runs with `tsx`, serves API + pre-built static files from server/public/
- **Production:** Bundled with esbuild to `dist/index.js`, serves API + static files from server/public/

**API Structure:**
- RESTful endpoints under `/api` prefix
- GET `/api/metrics/summary` - Live transparency metrics (uptime, accuracy, scans, risky rate)
- GET `/api/metrics/timeseries` - 30-day historical data for charts
- POST `/api/vault/export` - Create evidence document, returns ID and URLs
- GET `/api/vault/:id/download` - Download evidence as JSON file
- GET `/vault/:id` - View evidence in web viewer (SPA route)
- Mock data with live updates every 8 seconds for demo purposes

**Metrics System:**
- **Summary metrics:** Uptime (99.97%), Accuracy (98.4%), total scans, risky flags, avg time-to-verify
- **Timeseries data:** 30 daily data points (scans, risky flags, avg TTV per day)
- **Live updates:** Metrics increment every 8 seconds to simulate real-time activity
- All numeric values calculated server-side; frontend handles formatting only

### Development & Build System

**Clean Single Build System:**
- **Root:** Contains only npm scripts (`package.json`)
- **Client Config:** `client/vite.config.ts` → builds to `server/public/`
- **Server Config:** `server/tsconfig.json` (not currently used)
- **Root Vite Config:** Minimal facade that points to client and outputs to `server/public/`

**Development Workflow:**
```bash
npm run dev  # Starts server with tsx, serves pre-built files from server/public/
```

**Production Build:**
```bash
npm run build  # Runs: vite build && esbuild server/index.ts --outdir=dist

# This creates:
# - server/public/  (Vite output: index.html, assets/, favicon.png)
# - dist/index.js   (esbuild output: bundled Express server)
```

**Production Deployment:**
```bash
npm start  # Runs: NODE_ENV=production node dist/index.js
```

**Build Outputs:**
- **Client (Vite):** `server/public/` - Static React app with assets
- **Server (esbuild):** `dist/index.js` - Bundled Express server (ESM format)
- **Path resolution:** Server resolves `server/public/` from both dev and prod modes

**Path Aliases:**
- `@/*` - Client source files
- `@assets/*` - Static assets (images, etc.)

**Type Safety:**
- TypeScript for both frontend and backend
- Frontend: Strict mode with React TypeScript
- Server: CommonJS compilation with minimal config

### Authentication & Security

**Current Implementation:**
- User schema defined but authentication not yet implemented
- Password storage prepared in database schema
- Session management structure in place (connect-pg-simple configured)

### Verification Logic

**Current Implementation:**
- Mock verification function (`analyzeClaimMock`) analyzes claims with pattern matching
- Returns verdict (True/False/Mostly True/Partially True/Mostly False), confidence score (0-100), status, and sources
- Recognizes specific claims like "Earth orbits the Sun" (99% True), "flat earth" (98% False)
- For unknown claims, generates random but plausible verdicts
- Processing takes ~1.5 seconds to simulate real AI analysis
- Sources always include Reuters Fact Check, AP News, and Snopes with credibility scores
- All results are persisted to in-memory storage

**Extensibility Points:**
- Verification service can be swapped with external API integration (OpenAI, custom ML model, etc.)
- Source credibility scoring system in place and ready for real data
- Results are stored and retrievable via GET endpoints for history/analytics

## External Dependencies

### Core Infrastructure
- **Neon Database:** Serverless PostgreSQL provider (configured via `@neondatabase/serverless`)
- **Drizzle ORM:** Type-safe database toolkit with PostgreSQL dialect

### UI Component Library
- **Radix UI:** Unstyled, accessible component primitives (20+ components including Dialog, Dropdown, Tooltip, etc.)
- **Shadcn/ui:** Pre-styled component system built on Radix UI

### Styling & Design
- **Tailwind CSS:** Utility-first CSS framework
- **Class Variance Authority:** Component variant management
- **Google Fonts:** Inter (UI/body) and JetBrains Mono (monospace)

### State Management & Data Fetching
- **TanStack Query:** Server state management and caching
- **React Hook Form:** Form state management
- **Zod:** Runtime type validation and schema definition

### Development Tools
- **Vite:** Frontend build tool and dev server
- **Replit Plugins:** Runtime error overlay, cartographer, dev banner (development only)
- **esbuild:** Fast JavaScript bundler for server code

### Utilities
- **Wouter:** Lightweight routing library
- **date-fns:** Date manipulation utilities
- **clsx & tailwind-merge:** Conditional class name utilities
- **Lucide React:** Icon library

## Chrome Extension (Scam Radar)

**Location:** `/extension` folder (version-controlled, not deployed to Render)

**Installation:** Developer mode only (Load Unpacked from `chrome://extensions`)

### Architecture

**Manifest V3 Extension** with three core components:
- `background.js` - Service worker running continuously, sets badge to "ON"
- `content.js` - Injected into all webpages, scans for risk patterns
- `popup.html/js/css` - Extension popup showing stats and controls

### Features

**Local Risk Detection** (Privacy-first):
- Phishing phrase patterns: "verify your account", "urgent action required"
- Suspicious URL patterns: typosquatting, lookalike domains
- Insecure password fields (HTTP pages)
- All scanning happens on device - no data sent to servers

**Visual Feedback:**
- Badge shows "ON" (green) or risk count (orange)
- Dismissible warning ribbon at top of risky pages
- Popup displays daily stats and recent activity

**Data Management:**
- Navigation log stored in `chrome.storage.local` (last 100 entries)
- Detections stored with timestamp, URL, and risk details
- Export as JSON from popup
- Clear history option

### Integration with PWA

- Extension can trigger deep scans via existing `/api/vault/export` endpoint
- Results stored in Evidence Vault for long-term tracking
- Two complementary tools: PWA for manual checks, Extension for automatic monitoring

### Files

```
extension/
├── manifest.json       # MV3 configuration with <all_urls> permissions
├── background.js       # Service worker (2.4 KB)
├── content.js          # Page scanner (4.3 KB)
├── popup.html          # Extension UI (1.7 KB)
├── popup.js            # Popup logic (3.9 KB)
├── popup.css           # Dark theme styling (3.1 KB)
├── icons/              # Extension icons (192px from PWA)
└── README.md           # Installation & development guide
```

## Recent Updates (November 2, 2025)

**Chrome Extension (Scam Radar) - Initial Release:**
- ✅ Created MV3 extension structure in `/extension` folder
- ✅ Background service worker with "ON" badge indicator
- ✅ Content script for local risk detection (phishing, suspicious URLs)
- ✅ Popup UI with stats, export, and daily reports
- ✅ Privacy-first: all scanning happens locally
- ✅ Updated landing page with dual CTAs (PWA + Extension)
- ✅ Created `/docs/extension-dev` page with installation instructions
- ✅ Extension ready for developer testing via Load Unpacked

## Recent Updates (October 31, 2025)

**Architecture Simplification (Latest):**
- ✅ Simplified server to single-file Express app (`server/index.ts`)
- ✅ Dual-mode server: Development (ESM with tsx) + Production (CommonJS compiled)
- ✅ Removed legacy verification API endpoints (focused on transparency metrics)
- ✅ Updated build process: TypeScript → CommonJS → `.cjs` extension
- ✅ Path resolution works in both ESM and CommonJS environments
- ✅ Development server: API-only mode for use with separate Vite dev server
- ✅ Production server: Single-port serving of API + static React app

**Completed Features:**
- ✅ Dark theme implementation with Ink (#0B0E12) background and Copper/Gold accents
- ✅ Landing page with hero section and brand identity
- ✅ Transparency dashboard with live metrics and data visualization
- ✅ Recharts integration for 30-day scan analytics
- ✅ Brand component library (LogoMark, BadgePill system)
- ✅ Wouter routing between Home and Transparency pages
- ✅ Live metrics API with real-time updates every 8 seconds
- ✅ Production build process verified and working

**Current Status:**
The application is fully functional with:
- Professional landing page with dark theme design
- Live transparency dashboard showing real-time metrics
- Single-server production deployment ready
- Clean separation between development and production modes

### Architecture Notes

**Server Modes:**
- **Development:** `NODE_ENV=development tsx server/index.ts`
  - Runs on port 3000 (or PORT env var)
  - API endpoints only (no static files)
  - Intended for use with Vite dev server running separately
  
- **Production:** `NODE_ENV=production node server/dist/index.cjs`
  - Runs on port 3000 (or PORT env var)  
  - Serves both API and static React build
  - SPA fallback routing for client-side navigation

**Build Files:**
- Client build: `server/public/` (Vite output)
- Server build: `dist/index.js` (esbuild output)
- Both builds required for production deployment

## Deployment

### Render Deployment

The application is configured for deployment on Render using `render.yaml`.

**Configuration:**
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check: `/api/metrics/summary`
- Auto-generated SESSION_SECRET for security

**Environment Variables:**
- `NODE_ENV=production` (auto-set)
- `PORT=10000` (Render default)
- `SESSION_SECRET` (auto-generated by Render)
- `PUBLIC_BASE_URL=https://truthdetectorpro.onrender.com` (update with actual URL)

**Deployment Steps:**
1. Push code to GitHub repository
2. Connect GitHub repo to Render
3. Render auto-detects `render.yaml` and deploys
4. Update `PUBLIC_BASE_URL` in Render dashboard if using custom domain

**Build Artifacts Committed:**
- `dist/` and `server/public/` are now committed to git for Render deployment
- `.gitignore` updated to exclude only development artifacts (`node_modules`, `.env`, etc.)

### Next Steps for Production

**Optional Enhancements:**
1. Integrate actual fact-checking API or AI service
2. Add user authentication system
3. Implement verification history storage (database)
4. Add rate limiting and API security
5. Set up production logging and monitoring
6. Add comprehensive error handling

**Potential Future Features:**
- User accounts and authentication
- Verification history tracking
- Advanced analytics dashboard
- Real-time notifications
- Export/reporting capabilities