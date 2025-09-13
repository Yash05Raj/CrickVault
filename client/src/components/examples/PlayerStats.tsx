import PlayerStats from '../PlayerStats';

export default function PlayerStatsExample() {
  const battingStats = [
    {
      id: "player-1",
      name: "Virat Kohli",
      runs: 89,
      balls: 94,
      fours: 8,
      sixes: 2,
      strikeRate: 94.7,
      isOut: false
    },
    {
      id: "player-2",
      name: "KL Rahul",
      runs: 45,
      balls: 67,
      fours: 4,
      sixes: 0,
      strikeRate: 67.2,
      isOut: true
    }
  ];

  const bowlingStats = [
    {
      id: "bowler-1",
      name: "Jasprit Bumrah",
      wickets: 3,
      runs: 42,
      economy: 4.2
    },
    {
      id: "bowler-2",
      name: "Mohammed Shami",
      wickets: 1,
      runs: 38,
      economy: 5.4
    }
  ];

  return (
    <div className="space-y-6 max-w-lg">
      <PlayerStats 
        players={battingStats} 
        title="Current Batting"
        type="batting"
      />
      <PlayerStats 
        players={bowlingStats} 
        title="Bowling Figures"
        type="bowling"
      />
    </div>
  );
}