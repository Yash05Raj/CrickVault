import MatchCard from '../MatchCard';

export default function MatchCardExample() {
  const handleMatchClick = (matchId: string) => {
    console.log(`Match ${matchId} clicked`);
  };

  return (
    <div className="space-y-4 max-w-md">
      <MatchCard
        matchId="live-match-1"
        team1="India"
        team2="Australia"
        team1Score={287}
        team1Wickets={4}
        team1Overs={45.2}
        team2Score={156}
        team2Wickets={8}
        team2Overs={32.4}
        status="live"
        venue="Melbourne Cricket Ground"
        time="2:30 PM IST"
        format="ODI"
        onMatchClick={handleMatchClick}
      />
      
      <MatchCard
        matchId="upcoming-match-1"
        team1="England"
        team2="New Zealand"
        team1Score={0}
        team1Wickets={0}
        team1Overs={0}
        status="upcoming"
        venue="Lord's"
        time="Tomorrow, 10:30 AM"
        format="T20"
        onMatchClick={handleMatchClick}
      />
    </div>
  );
}