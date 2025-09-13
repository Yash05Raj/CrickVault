import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Player {
  id: string;
  name: string;
  runs?: number;
  wickets?: number;
  balls?: number;
  fours?: number;
  sixes?: number;
  strikeRate?: number;
  economy?: number;
  isOut?: boolean;
}

interface PlayerStatsProps {
  players: Player[];
  title: string;
  type: 'batting' | 'bowling';
}

export default function PlayerStats({ players, title, type }: PlayerStatsProps) {
  return (
    <Card data-testid={`card-${type}-stats`}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {players.map((player) => (
            <div 
              key={player.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/20 to-muted/40 border border-muted/20 hover:shadow-md transition-all duration-200"
              data-testid={`player-${player.id}`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 shadow-sm">
                  <AvatarFallback className={`text-sm font-semibold ${player.isOut ? 'bg-destructive/20 text-destructive' : 'bg-cricket-green/20 text-cricket-green'}`}>
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className={`font-semibold ${player.isOut ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {player.name}
                  </div>
                  {player.isOut && (
                    <div className="text-xs text-destructive font-medium flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                      OUT
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                {type === 'batting' && (
                  <div className="space-y-1">
                    <div className="font-mono font-bold">
                      {player.runs} ({player.balls})
                    </div>
                    <div className="text-xs text-muted-foreground">
                      4s: {player.fours} | 6s: {player.sixes} | SR: {player.strikeRate?.toFixed(1)}
                    </div>
                  </div>
                )}
                
                {type === 'bowling' && (
                  <div className="space-y-1">
                    <div className="font-mono font-bold">
                      {player.wickets}/{player.runs}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Eco: {player.economy?.toFixed(1)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}