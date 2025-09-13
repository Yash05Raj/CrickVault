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
    <div className={`flex items-center justify-between p-6 rounded-xl border transition-all duration-300 ${
      isWinning 
        ? 'bg-gradient-to-r from-cricket-gold/20 via-cricket-gold/10 to-cricket-gold/5 border-cricket-gold/30 shadow-lg shadow-cricket-gold/10' 
        : 'bg-gradient-to-r from-card to-card/80 border hover:shadow-md'
    }`} data-testid={`score-${team.toLowerCase()}`}>
      <div className="space-y-2">
        <h3 className={`font-bold text-xl ${isWinning ? 'text-cricket-gold' : 'text-foreground'}`}>
          {team}
          {isWinning && (
            <span className="ml-2 inline-flex items-center">
              <div className="w-2 h-2 bg-cricket-gold rounded-full animate-pulse"></div>
            </span>
          )}
        </h3>
        <div className="text-sm text-muted-foreground font-medium">
          {overs} overs completed
        </div>
      </div>
      <div className="text-right space-y-1">
        <div className={`font-mono text-3xl font-bold ${isWinning ? 'text-cricket-gold' : 'text-foreground'}`}>
          {score}/{wickets}
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          ({overs.toFixed(1)} ov)
        </div>
      </div>
    </div>
  );
}