import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cricketAPI } from "./cricketAPI";
import { mockMatches, mockMatchDetails } from "./mockCricketData";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint - register first to ensure it always works
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Cricket API routes with fallback to mock data
  app.get('/api/matches', async (req, res) => {
    try {
      const { filter = 'all' } = req.query;
      let matches = [];

      // Try to get real data first, fallback to mock data if API fails
      try {
        switch (filter) {
          case 'live':
            const currentMatches = await cricketAPI.getCurrentMatches();
            matches = currentMatches
              .map(match => cricketAPI.transformMatchData(match))
              .filter(match => match.status === 'live');
            break;
          case 'upcoming':
            const allMatches = await cricketAPI.getAllMatches();
            matches = allMatches
              .map(match => cricketAPI.transformMatchData(match))
              .filter(match => match.status === 'upcoming')
              .slice(0, 10);
            break;
          case 'completed':
            const allMatchesCompleted = await cricketAPI.getAllMatches();
            matches = allMatchesCompleted
              .map(match => cricketAPI.transformMatchData(match))
              .filter(match => match.status === 'completed')
              .slice(0, 10);
            break;
          default:
            // Get all matches mixed
            const allMatchesMixed = await cricketAPI.getAllMatches();
            matches = allMatchesMixed
              .slice(0, 15)
              .map(match => cricketAPI.transformMatchData(match));
        }
      } catch (apiError) {
        console.warn('Cricket API unavailable, using mock data:', (apiError as Error).message);
        // Fallback to mock data
        switch (filter) {
          case 'live':
            matches = mockMatches.filter(match => match.status === 'live');
            break;
          case 'upcoming':
            matches = mockMatches.filter(match => match.status === 'upcoming');
            break;
          case 'completed':
            matches = mockMatches.filter(match => match.status === 'completed');
            break;
          default:
            matches = mockMatches;
        }
      }

      res.json(matches);
    } catch (error) {
      console.error('Critical error in matches endpoint:', error);
      // Even if there's a critical error, return mock data as final fallback
      const { filter = 'all' } = req.query;
      let fallbackMatches;
      
      switch (filter) {
        case 'live':
          fallbackMatches = mockMatches.filter(match => match.status === 'live');
          break;
        case 'upcoming':
          fallbackMatches = mockMatches.filter(match => match.status === 'upcoming');
          break;
        case 'completed':
          fallbackMatches = mockMatches.filter(match => match.status === 'completed');
          break;
        default:
          fallbackMatches = mockMatches;
      }
      
      res.json(fallbackMatches);
    }
  });

  app.get('/api/matches/:id', async (req, res) => {
    try {
      const { id } = req.params;
      let detailedMatch;
      
      try {
        const matchDetails = await cricketAPI.getMatchDetails(id);
        const transformedMatch = cricketAPI.transformMatchData(matchDetails);
        
        // Add additional details for match page
        detailedMatch = {
          ...transformedMatch,
          commentary: matchDetails.commentary || [],
          players: matchDetails.players || []
        };
      } catch (apiError) {
        console.warn('Cricket API unavailable for match details, using mock data:', (apiError as Error).message);
        // Fallback to mock data
        detailedMatch = mockMatchDetails[id as keyof typeof mockMatchDetails] || mockMatchDetails["match-1"];
      }

      res.json(detailedMatch);
    } catch (error) {
      console.error('Critical error in match details endpoint:', error);
      // Final fallback to mock data
      const { id } = req.params;
      const fallbackMatch = mockMatchDetails[id as keyof typeof mockMatchDetails] || mockMatchDetails["match-1"];
      res.json(fallbackMatch);
    }
  });

  app.get('/api/live-scores', async (req, res) => {
    try {
      let liveMatches;
      
      try {
        const currentMatches = await cricketAPI.getCurrentMatches();
        liveMatches = currentMatches
          .map(match => cricketAPI.transformMatchData(match))
          .filter(match => match.status === 'live');
      } catch (apiError) {
        console.warn('Cricket API unavailable for live scores, using mock data:', (apiError as Error).message);
        // Fallback to mock data
        liveMatches = mockMatches.filter(match => match.status === 'live');
      }

      res.json(liveMatches);
    } catch (error) {
      console.error('Critical error in live scores endpoint:', error);
      // Final fallback to mock data
      const fallbackMatches = mockMatches.filter(match => match.status === 'live');
      res.json(fallbackMatches);
    }
  });

  // Catch-all for unhandled API routes - return JSON 404 instead of HTML
  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found', path: req.path });
  });

  const httpServer = createServer(app);
  return httpServer;
}
