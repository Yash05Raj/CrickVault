# Crick-Vault Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from ESPN Cricket and Cricbuzz for their clean, data-focused layouts while maintaining real-time engagement patterns similar to sports apps like ESPN and The Athletic.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Cricket Green: 142 69% 58% (primary brand color)
- Deep Navy: 220 26% 14% (dark backgrounds)
- Pure White: 0 0% 100% (light backgrounds)

**Accent Colors:**
- Live Red: 0 84% 60% (live indicators, urgent updates)
- Winning Gold: 45 93% 47% (winning team highlights)

**Status Colors:**
- Success Green: 142 76% 36%
- Warning Orange: 38 92% 50%
- Error Red: 0 84% 60%

### Typography
- **Primary Font:** Inter (Google Fonts) - clean, readable for data display
- **Display Font:** Poppins (Google Fonts) - for headings and team names
- **Monospace:** JetBrains Mono - for scores and statistics

### Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, and 12
- Component padding: p-4, p-6
- Section margins: m-6, m-8
- Grid gaps: gap-4, gap-6
- Button spacing: px-6, py-3

### Component Library

**Navigation:**
- Sticky top navigation with live match ticker
- Tab-based navigation for different match formats (Test, ODI, T20)
- Bottom navigation for mobile with live score badges

**Data Display:**
- Live score cards with animated run counters
- Match status indicators (Live, Completed, Upcoming)
- Player statistics tables with sortable columns
- Over-by-over commentary timeline

**Interactive Elements:**
- Refresh button with loading spinner
- Match selection filters
- Team favorite toggles
- Share match buttons

**Real-time Features:**
- Live pulse animations on active matches
- Auto-updating score counters
- Push notification-style alerts for wickets/boundaries
- Progressive loading for match details

### Visual Treatments
**Gradients:**
- Hero section: Subtle cricket green to navy gradient
- Live match cards: Green to teal gradient for active games
- Background overlays: Dark navy with 20% opacity

**Backgrounds:**
- Primary: Clean whites and light grays
- Cards: Elevated whites with subtle shadows
- Live elements: Soft green tints for active matches

### Layout Structure
**Desktop:** Three-column layout (match list, main content, stats sidebar)
**Mobile:** Single column with collapsible sections and bottom navigation

### Images
**Hero Section:** 
- Large cricket stadium background image with gradient overlay
- Dimensions: Full viewport height with parallax scrolling
- Content: Centered logo and "Live Cricket Scores" tagline

**Match Cards:**
- Small team flag icons (16x16px)
- Player avatar placeholders (32x32px circular)
- Stadium thumbnails for match venues (optional, 100x60px)

**Key Design Principles:**
1. **Real-time Focus:** Visual emphasis on live elements through color and animation
2. **Data Clarity:** Clean typography hierarchy for easy score scanning
3. **Mobile-First:** Responsive design prioritizing mobile cricket viewing
4. **Performance:** Minimal animations to support real-time updates
5. **Cricket Context:** Subtle cricket-themed elements without overwhelming functionality