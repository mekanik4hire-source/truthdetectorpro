# TruthDetectorPro - Project Guide

## Overview

TruthDetectorPro is an AI-powered fact-checking and verification platform that allows users to submit claims and receive instant verification results with confidence scores, verdicts, and supporting sources. The application features a modern dark-themed landing page with a transparency dashboard.

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
- **Dual-mode operation:** Works in both ESM (development) and CommonJS (production)
- **Development:** Runs with `tsx` (ESM), serves API only on port 3000
- **Production:** Compiled to CommonJS, serves API + static files on one port

**API Structure:**
- RESTful endpoints under `/api` prefix
- GET `/api/metrics/summary` - Live transparency metrics (uptime, accuracy, scans, risky rate)
- GET `/api/metrics/timeseries` - 30-day historical data for charts
- Mock data with live updates every 8 seconds for demo purposes

**Metrics System:**
- **Summary metrics:** Uptime (99.97%), Accuracy (98.4%), total scans, risky flags, avg time-to-verify
- **Timeseries data:** 30 daily data points (scans, risky flags, avg TTV per day)
- **Live updates:** Metrics increment every 8 seconds to simulate real-time activity
- All numeric values calculated server-side; frontend handles formatting only

### Development & Build System

**Architecture:**
- **Simplified single-server design** - One Express server handles all modes
- **Development:** API-only server (port 3000), run Vite client separately
- **Production:** Single server serves both API and static React app

**Development Workflow:**
```bash
# Current workflow runs development server
npm run dev  # Starts API on port 3000 with tsx

# Run Vite client separately (optional)
npm run dev:client  # Vite on port 5173, proxies /api to localhost:3000
```

**Production Build:**
```bash
# Build client
cd client && npm run build  # Output: server/public/

# Build server
cd server && tsc -p tsconfig.json  # Output: server/dist/index.js
mv server/dist/index.js server/dist/index.cjs  # Rename for CommonJS

# Run production
NODE_ENV=production node server/dist/index.cjs  # Single server on port 3000
```

**Build Outputs:**
- **Client:** `server/public/` (Vite builds static files here)
- **Server:** `server/dist/index.cjs` (TypeScript → CommonJS)
- **Note:** `.cjs` extension required because root `package.json` has `"type": "module"`

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
- Server build: `server/dist/index.cjs` (TypeScript → CommonJS)
- Both builds required for production deployment

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