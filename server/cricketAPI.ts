import axios from 'axios';

const CRICKET_API_BASE = 'https://api.cricketdata.org';

export interface CricketMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score?: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
  series_id: string;
  fantasyEnabled: boolean;
}

export interface MatchDetails extends CricketMatch {
  commentary?: Array<{
    r: number;
    w: number;
    o: number;
    commentary: string;
  }>;
  players?: Array<{
    name: string;
    role: string;
    battingStyle: string;
    bowlingStyle: string;
  }>;
}

class CricketAPIService {
  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const API_KEY = process.env.CRICKET_API_KEY;
    
    if (!API_KEY) {
      throw new Error('CRICKET_API_KEY environment variable is required');
    }

    try {
      const response = await axios.get(`${CRICKET_API_BASE}${endpoint}`, {
        params: {
          apikey: API_KEY,
          ...params
        },
        timeout: 10000
      });

      if (response.data.status !== 'success') {
        throw new Error(`Cricket API Error: ${response.data.status || 'Unknown error'}`);
      }

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Cricket API request failed:', error.response?.data || error.message);
        throw new Error(`API request failed: ${error.message}`);
      }
      throw error;
    }
  }

  async getCurrentMatches(): Promise<CricketMatch[]> {
    return this.makeRequest<CricketMatch[]>('/current_matches');
  }

  async getMatchDetails(matchId: string): Promise<MatchDetails> {
    return this.makeRequest<MatchDetails>(`/match_info`, { id: matchId });
  }

  async getAllMatches(): Promise<CricketMatch[]> {
    return this.makeRequest<CricketMatch[]>('/matches');
  }

  // Transform API data to our frontend format
  transformMatchData(match: CricketMatch) {
    const team1Name = match.teams[0] || 'Team 1';
    const team2Name = match.teams[1] || 'Team 2';
    
    // Find scores for each team from the score array
    const score1 = match.score?.find(s => 
      s.inning.toLowerCase().includes(team1Name.toLowerCase()) || 
      s.inning.includes('Inning 1')
    );
    const score2 = match.score?.find(s => 
      s.inning.toLowerCase().includes(team2Name.toLowerCase()) || 
      s.inning.includes('Inning 2')
    );

    return {
      matchId: match.id,
      team1: team1Name,
      team2: team2Name,
      team1Score: score1?.r || 0,
      team1Wickets: score1?.w || 0,
      team1Overs: score1?.o || 0,
      team2Score: score2?.r,
      team2Wickets: score2?.w,
      team2Overs: score2?.o,
      status: this.getMatchStatus(match.status),
      venue: match.venue || 'Unknown Venue',
      time: this.formatMatchTime(match.dateTimeGMT),
      format: this.getMatchFormat(match.matchType),
    };
  }

  private getMatchStatus(status: string): 'live' | 'upcoming' | 'completed' {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('live') || 
        lowerStatus.includes('progress') || 
        lowerStatus.includes('innings break') ||
        lowerStatus.includes('need') ||
        lowerStatus.includes('batting')) {
      return 'live';
    } else if (lowerStatus.includes('won') || 
               lowerStatus.includes('lost') || 
               lowerStatus.includes('completed') || 
               lowerStatus.includes('finished')) {
      return 'completed';
    }
    return 'upcoming';
  }

  private getMatchFormat(matchType: string): 'ODI' | 'T20' | 'Test' {
    const lowerType = matchType.toLowerCase();
    if (lowerType.includes('t20') || lowerType.includes('twenty')) {
      return 'T20';
    } else if (lowerType.includes('test')) {
      return 'Test';
    }
    return 'ODI';
  }

  private formatMatchTime(dateTimeGMT: string): string {
    if (!dateTimeGMT) return 'Time TBD';
    
    try {
      const date = new Date(dateTimeGMT);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return 'Time TBD';
    }
  }
}

export const cricketAPI = new CricketAPIService();