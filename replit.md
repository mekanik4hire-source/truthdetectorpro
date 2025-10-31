# TruthDetectorPro - Project Guide

## Overview

TruthDetectorPro is an AI-powered fact-checking and verification platform that allows users to submit claims and receive instant verification results with confidence scores, verdicts, and supporting sources. The application features a modern landing page with a demonstration interface for claim verification.

The platform is built as a full-stack web application with a React frontend and Express backend, designed to provide fast, accurate fact-checking capabilities with a clean, professional user interface inspired by productivity tools like Linear and Notion.

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
- Color scheme: Neutral base with HSL color variables for theming
- Spacing system: Consistent Tailwind units (2, 4, 8, 12, 16)
- Component library: Comprehensive set of reusable UI components from Shadcn/ui

**Key Frontend Components:**
- Landing page sections: Hero, Features, How It Works, Statistics, Testimonials, CTA
- Interactive verification demo component with claim submission and result display
- Responsive header with mobile menu support
- Form handling with React Hook Form and Zod validation

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM
- **Database Provider:** Neon serverless PostgreSQL (configured but using in-memory storage currently)
- **Validation:** Zod schemas for type-safe API contracts

**API Structure:**
- RESTful endpoints under `/api` prefix
- POST `/api/verify` - Submit claims for verification
- GET `/api/verifications` - Retrieve verification history
- Request/response validation using shared Zod schemas

**Storage Strategy:**
- Current implementation uses in-memory storage (`MemStorage` class)
- Database schema defined for future PostgreSQL migration
- Tables: `users` (authentication), `verifications` (claim records)

**Data Models:**
- User: id, username, password
- Verification: id, claim, verdict, confidence (integer), status, sources (JSON), createdAt
- VerificationSource: name, url, credibility score

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
- Mock verification function (`analyzeClaimMock`) generates placeholder results
- Returns verdict, confidence score, status, and mock sources
- Designed for easy replacement with actual AI/ML verification service

**Extensibility Points:**
- Verification service can be swapped with external API integration
- Source credibility scoring system in place
- Result caching prepared through verification storage

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

### Potential Future Integrations
- AI/ML fact-checking service (to replace mock verification)
- External credibility databases or APIs
- User authentication provider (OAuth, etc.)
- Real-time notifications or WebSocket updates