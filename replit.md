# CrickVault - Live Cricket Score Tracking Application

## Overview

CrickVault is a modern, real-time cricket score tracking application that provides live match updates, player statistics, and comprehensive match analytics. The application is designed with a sports-focused UI inspired by ESPN Cricket and Cricbuzz, featuring clean data-focused layouts with real-time engagement patterns. It serves as a comprehensive platform for cricket enthusiasts to track matches, view player performance, and stay updated with live cricket action.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend architecture with the following key decisions:

**React with TypeScript**: Chosen for type safety and better developer experience when handling complex cricket data structures like match statistics, player information, and real-time score updates.

**Vite Build Tool**: Selected for fast development builds and hot module replacement, crucial for a real-time sports application where quick iterations are needed.

**Wouter for Routing**: Lightweight routing solution that handles navigation between home page and individual match details without the overhead of React Router.

**Component-Based Architecture**: 
- Modular components for match cards, score displays, player statistics, and live indicators
- Reusable UI components built on Radix UI primitives
- Clear separation between presentational and container components

**State Management**: 
- TanStack Query for server state management and caching of cricket data
- Local state for UI interactions and real-time updates
- Custom hooks for mobile responsiveness and theme management

### Backend Architecture
The backend follows an Express.js server architecture with the following design patterns:

**Express.js Server**: RESTful API server handling cricket data aggregation and serving the React application.

**Cricket API Integration**: 
- Primary integration with cricket data APIs for live match information
- Fallback to mock data when external APIs are unavailable
- Data transformation layer to normalize different API responses

**Route-Based Architecture**: 
- Separate route handlers for different cricket data endpoints
- Health check endpoints for monitoring
- Error handling middleware for graceful degradation

**Development vs Production**: 
- Vite integration for development with HMR
- Static file serving for production builds
- Environment-specific configurations

### Data Storage Solutions
The application is configured for PostgreSQL with Drizzle ORM:

**Drizzle ORM**: Type-safe database interactions with TypeScript integration for better development experience.

**PostgreSQL Database**: Chosen for reliability and performance in handling cricket statistics and user data.

**Neon Database Integration**: Cloud-native PostgreSQL solution for scalable data storage.

**Schema Design**: User management system with extensible architecture for future cricket data caching.

### Styling and Design System
The application implements a comprehensive design system:

**Tailwind CSS**: Utility-first CSS framework for rapid UI development with cricket-themed color palette.

**Shadcn/ui Components**: Pre-built, accessible component library built on Radix UI primitives.

**Design Token System**: 
- Cricket-specific color palette (Cricket Green, Live Red, Winning Gold)
- Consistent spacing and typography scales
- Dark/light theme support with CSS custom properties

**Typography**: 
- Inter for data display and readability
- Poppins for headings and team names
- JetBrains Mono for scores and statistics

### Real-time Features
The application is architected to support real-time cricket updates:

**Live Score Updates**: Components designed to handle real-time data updates with loading states and error handling.

**Status Indicators**: Visual feedback for live matches, upcoming games, and completed matches.

**Responsive Design**: Mobile-first approach with adaptive layouts for different screen sizes.

## External Dependencies

### Cricket Data APIs
- **Cricket Data API**: Primary source for live cricket scores, match details, and player statistics
- **Fallback Mock Data**: Local mock data system for development and API unavailability scenarios

### Database and Storage
- **Neon Database**: Cloud PostgreSQL database for user data and potential cricket data caching
- **Drizzle ORM**: Database abstraction layer with TypeScript integration

### UI and Styling Libraries
- **Radix UI**: Accessible component primitives for dialogs, dropdowns, and form controls
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class composition

### Development Tools
- **TypeScript**: Type safety across the application
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds

### Query and State Management
- **TanStack React Query**: Server state management and caching
- **Axios**: HTTP client for API requests

### Fonts and Assets
- **Google Fonts**: Inter and Poppins fonts for typography
- **Generated Images**: Cricket stadium and hero images for visual appeal

The architecture prioritizes real-time performance, user experience, and maintainability while providing a solid foundation for scaling cricket data features and user interactions.