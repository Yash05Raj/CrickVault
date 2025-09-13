interface ScoreDisplayProps {
  team: string;
  score: number;
  wickets: number;
  overs: number;
  isWinning?: boolean;
}

export default function ScoreDisplay({ 
  team, 
  score, 
  wickets, 
  overs, 
  isWinning = false 
}: ScoreDisplayProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-md border ${
      isWinning ? 'bg-cricket-gold/10 border-cricket-gold/20' : 'bg-card'
    }`} data-testid={`score-${team.toLowerCase()}`}>
      <div className="space-y-1">
        <h3 className={`font-semibold text-lg ${isWinning ? 'text-cricket-gold' : ''}`}>
          {team}
        </h3>
        <div className="text-sm text-muted-foreground">
          {overs} overs
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-2xl font-bold">
          {score}/{wickets}
        </div>
        <div className="text-xs text-muted-foreground">
          ({overs.toFixed(1)} ov)
        </div>
      </div>
    </div>
  );
}