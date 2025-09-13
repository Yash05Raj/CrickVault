// Mock cricket data for development and fallback
export const mockMatches = [
  {
    matchId: "match-1",
    team1: "India",
    team2: "Australia",
    team1Score: 287,
    team1Wickets: 4,
    team1Overs: 45.2,
    team2Score: 156,
    team2Wickets: 8,
    team2Overs: 32.4,
    status: 'live' as const,
    venue: "Melbourne Cricket Ground",
    time: "Live Now",
    format: 'ODI' as const,
  },
  {
    matchId: "match-2",
    team1: "England",
    team2: "New Zealand",
    team1Score: 0,
    team1Wickets: 0,
    team1Overs: 0,
    team2Score: undefined,
    team2Wickets: undefined,
    team2Overs: undefined,
    status: 'upcoming' as const,
    venue: "Lord's Cricket Ground",
    time: "Tomorrow, 10:30 AM",
    format: 'T20' as const,
  },
  {
    matchId: "match-3",
    team1: "Pakistan",
    team2: "South Africa",
    team1Score: 245,
    team1Wickets: 10,
    team1Overs: 48.3,
    team2Score: 248,
    team2Wickets: 6,
    team2Overs: 47.2,
    status: 'completed' as const,
    venue: "Wanderers Stadium",
    time: "Yesterday, 2:00 PM",
    format: 'ODI' as const,
  },
  {
    matchId: "match-4",
    team1: "Bangladesh",
    team2: "Sri Lanka",
    team1Score: 139,
    team1Wickets: 5,
    team1Overs: 20.0,
    team2Score: 76,
    team2Wickets: 1,
    team2Overs: 7.4,
    status: 'live' as const,
    venue: "Sheikh Zayed Stadium",
    time: "Live Now",
    format: 'T20' as const,
  },
  {
    matchId: "match-5",
    team1: "West Indies",
    team2: "Ireland",
    team1Score: 0,
    team1Wickets: 0,
    team1Overs: 0,
    status: 'upcoming' as const,
    venue: "Kensington Oval",
    time: "Sunday, 3:00 PM",
    format: 'ODI' as const,
  }
];

export const mockMatchDetails = {
  "match-1": {
    matchId: "match-1",
    team1: "India",
    team2: "Australia",
    team1Score: 287,
    team1Wickets: 4,
    team1Overs: 45.2,
    team2Score: 156,
    team2Wickets: 8,
    team2Overs: 32.4,
    status: 'live' as const,
    venue: "Melbourne Cricket Ground",
    time: "Live Now",
    format: 'ODI' as const,
    commentary: [
      {
        r: 156,
        w: 8,
        o: 32.4,
        commentary: "Bumrah strikes! Warner tries to pull but gets a top edge, caught at fine leg."
      },
      {
        r: 152,
        w: 7,
        o: 32.3,
        commentary: "Single to long-on, Smith rotates the strike."
      },
      {
        r: 148,
        w: 7,
        o: 32.2,
        commentary: "Beautiful cover drive by Warner, races to the boundary for FOUR!"
      }
    ],
    players: [
      {
        name: "Steve Smith",
        role: "Batsman",
        battingStyle: "Right-hand",
        bowlingStyle: "Right-arm leg-spin"
      },
      {
        name: "David Warner",
        role: "Batsman", 
        battingStyle: "Left-hand",
        bowlingStyle: "Right-arm medium"
      }
    ]
  }
};