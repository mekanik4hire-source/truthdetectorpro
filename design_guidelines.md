# TruthDetectorPro - Design Guidelines

## Design Approach
**Selected Approach:** Reference-Based (Productivity + Analytics hybrid)
Drawing inspiration from **Linear** (clean typography, precise spacing), **Notion** (approachable functionality), and **Stripe** (trust through simplicity).

**Core Principles:**
- Credibility through clarity and precision
- Information hierarchy that guides users to insights
- Efficient, distraction-free verification workflows
- Professional polish that builds trust

---

## Typography System

**Font Stack:**
- **Primary:** Inter (via Google Fonts) - headings, UI elements, body text
- **Monospace:** JetBrains Mono - for data/code snippets, results displays

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl font-bold tracking-tight
- Section Headers: text-3xl md:text-4xl font-semibold
- Subsection Headers: text-xl md:text-2xl font-semibold
- Body Text: text-base md:text-lg leading-relaxed
- Small Text/Labels: text-sm font-medium
- Data/Results: font-mono text-sm md:text-base

---

## Layout System

**Spacing Primitives:** Tailwind units of **2, 4, 8, 12, 16**
- Micro spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, mb-8
- Section spacing: py-12 md:py-16, gap-8
- Major section breaks: py-16 md:py-24

**Container Strategy:**
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 md:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy content: max-w-4xl mx-auto
- Verification interface: max-w-5xl mx-auto

---

## Component Library

### Navigation
- **Header:** Fixed top navigation, backdrop-blur effect, height h-16
- Logo (left) + main nav links (center) + CTA button (right)
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- **Layout:** Asymmetric two-column (60/40 split on desktop)
- Left: Headline + description + CTA buttons (primary + secondary)
- Right: Hero image showing dashboard/verification interface screenshot
- Height: min-h-[600px] md:min-h-[700px]
- Background: Subtle gradient or mesh pattern overlay

### Verification Interface (Core Feature)
- **Input Card:** Prominent textarea/input with paste functionality
- Clear visual states: default, focused, processing, complete
- Real-time character count and validation indicators
- **Results Display:** Card-based layout with clear verdict section
- Confidence score visualization (progress bar or radial gauge)
- Breakdown sections using accordion/expandable panels
- Source citations with external link indicators

### Feature Cards
- **Layout:** 3-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Each card: Icon (top) + title + description + optional link
- Card styling: Subtle border, hover lift effect
- Padding: p-6 md:p-8

### Statistics/Metrics Section
- **Layout:** 4-column grid showcasing key numbers
- Large numerical values (text-4xl font-bold) + descriptive labels
- Use of monospace font for numbers adds precision

### Social Proof/Testimonials
- **Layout:** 2-column grid with quotes
- Include user attribution (name, role, optional avatar)
- Quoted text in slightly larger, lighter weight font

### CTA Sections
- **Strategic placement:** After feature showcase, before footer
- Headline + supporting text + prominent button
- Background treatment: Subtle gradient or pattern
- Padding: py-16 md:py-24

### Footer
- **Multi-column layout:** 4 sections (Product, Company, Resources, Contact)
- Newsletter signup with inline form
- Social media icons (use Heroicons)
- Copyright and legal links at bottom
- Padding: pt-16 pb-8

---

## Icons & Assets

**Icon Library:** Heroicons (via CDN)
- Navigation: outline style
- Features: solid style for visual weight
- Interactive elements: Mini for inline usage

**Iconography Strategy:**
- Verification status: Check circle (success), X circle (fail), Question mark (uncertain)
- Features: Shield (security), Lightning (speed), Chart (analytics), Users (community)

---

## Images

**Hero Image:**
- **Type:** Dashboard/interface screenshot showing verification in action
- **Placement:** Right side of hero, floating/elevated effect with subtle shadow
- **Treatment:** Modern browser mockup or clean frame
- **Dimensions:** Maintain 16:9 or 4:3 aspect ratio

**Feature Illustrations:**
- Optional supporting images for complex features
- If used: Icons work better for most features to maintain clean aesthetic

**Background Treatments:**
- Subtle geometric patterns or mesh gradients for sections
- Never overpowering - maintain text readability

---

## Page Structure (Landing Page)

1. **Header/Navigation** - Fixed, h-16
2. **Hero Section** - Asymmetric layout, min-h-[700px], includes hero image
3. **How It Works** - 3-step process, icon-based cards
4. **Core Features** - 3-column feature grid, 6 features total
5. **Verification Demo/Preview** - Interactive showcase or screenshot
6. **Statistics** - 4-column metrics highlighting impact
7. **Testimonials** - 2-column quotes from users
8. **CTA Section** - Final conversion push
9. **Footer** - Comprehensive multi-column layout

---

## Accessibility

- All interactive elements: minimum 44x44px touch target
- Form inputs: Clear labels, visible focus states (ring-2 ring-offset-2)
- Results display: Clear visual hierarchy with semantic HTML
- Icon-only buttons: Include sr-only text labels
- Maintain WCAG AA contrast ratios throughout

---

## Animations

**Minimal, purposeful motion:**
- Page load: Subtle fade-in for hero elements (stagger by 100ms)
- Verification process: Progress indicator with smooth transitions
- Hover states: Subtle scale (scale-105) or lift (translate-y)
- No continuous animations or distracting motion