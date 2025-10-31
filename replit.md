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
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM
- **Database Provider:** Neon serverless PostgreSQL (configured but using in-memory storage currently)
- **Validation:** Zod schemas for type-safe API contracts

**API Structure:**
- RESTful endpoints under `/api` prefix
- POST `/api/verify` - Submit claims for verification (fully functional)
- GET `/api/verifications` - Retrieve all verification history
- GET `/api/verifications/:id` - Retrieve specific verification by ID
- Request/response validation using shared Zod schemas
- All endpoints tested end-to-end with Playwright

**Storage Strategy:**
- Current implementation uses in-memory storage (`MemStorage` class)
- Database schema defined for future PostgreSQL migration
- Tables: `users` (authentication), `verifications` (claim records with sources)
- Sources are serialized as JSON strings in storage and parsed on retrieval

**Data Models:**
- User: id, username, password
- Verification: id, claim, verdict, confidence (integer), status, sources (JSON string), createdAt
- VerificationSource: name, url, credibility score
- VerificationResult: API response type with parsed sources and ISO string createdAt

### Development & Build System

**Build Configuration:**
- **Frontend:** Vite for fast development and optimized production builds
- **Backend:** esbuild for bundling server code
- **Development Mode:** Vite dev server with HMR, Express API proxy
- **Production Mode:** Static frontend served by Express

**Path Aliases:**
- `@/*` - Client source files
- `@shared/*` - Shared types and schemas
- `@assets/*` - Static assets

**Type Safety:**
- Strict TypeScript configuration across frontend and backend
- Shared schema definitions between client and server using Drizzle Zod
- Type-safe API contracts

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

**Completed Features:**
- ✅ Dark theme implementation with Ink (#0B0E12) background and Copper/Gold accents
- ✅ New landing page with hero section and brand identity
- ✅ Transparency dashboard with live metrics and data visualization
- ✅ Recharts integration for 30-day scan analytics
- ✅ Brand component library (LogoMark, BadgePill system)
- ✅ Wouter routing between Home and Transparency pages
- ✅ Full verification API implementation with POST /api/verify endpoint
- ✅ In-memory storage for verification history
- ✅ End-to-end testing with Playwright (all tests passing)
- ✅ Type-safe schema contracts between frontend and backend
- ✅ Source persistence and retrieval

**Current Status:**
The application is fully functional as a demo/template with:
- Working claim verification flow from UI to API to storage
- Professional landing page design
- Interactive demo component with real-time results
- Clean architecture ready for production enhancements

### Next Steps for Production

**Required for Launch:**
1. Replace in-memory storage with PostgreSQL (Drizzle + Neon)
2. Integrate actual AI/ML verification service
3. Implement user authentication and authorization
4. Add rate limiting and API security
5. Set up logging and monitoring
6. Add comprehensive error handling

**Potential Future Integrations:**
- AI/ML fact-checking service (OpenAI, Anthropic, custom models)
- External credibility databases or APIs
- User authentication provider (OAuth, Replit Auth)
- Real-time notifications or WebSocket updates
- Advanced analytics dashboard
- Verification history export/reporting