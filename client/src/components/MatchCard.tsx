import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LiveIndicator from "./LiveIndicator";
import { Clock, MapPin } from "lucide-react";

interface MatchCardProps {
  matchId: string;
  team1: string;
  team2: string;
  team1Score: number;
  team1Wickets: number;
  team1Overs: number;
  team2Score?: number;
  team2Wickets?: number;
  team2Overs?: number;
  status: 'live' | 'upcoming' | 'completed';
  venue: string;
  time: string;
  format: 'ODI' | 'T20' | 'Test';
  onMatchClick?: (matchId: string) => void;
}

export default function MatchCard({
  matchId,
  team1,
  team2,
  team1Score,
  team1Wickets,
  team1Overs,
  team2Score,
  team2Wickets,
  team2Overs,
  status,
  venue,
  time,
  format,
  onMatchClick,
}: MatchCardProps) {
  const handleClick = () => {
    console.log(`Navigating to match ${matchId}`); // todo: remove mock functionality
    onMatchClick?.(matchId);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'live':
        return <LiveIndicator isLive={true} />;
      case 'upcoming':
        return <Badge variant="outline" data-testid="badge-upcoming">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary" data-testid="badge-completed">Completed</Badge>;
    }
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all"
      onClick={handleClick}
      data-testid={`card-match-${matchId}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {format}
          </Badge>
          {getStatusBadge()}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{venue}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
            <span className="font-semibold">{team1}</span>
            <span className="font-mono font-bold">
              {team1Score}/{team1Wickets} <span className="text-xs text-muted-foreground">({team1Overs})</span>
            </span>
          </div>
          
          {team2Score !== undefined && (
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
              <span className="font-semibold">{team2}</span>
              <span className="font-mono font-bold">
                {team2Score}/{team2Wickets} <span className="text-xs text-muted-foreground">({team2Overs})</span>
              </span>
            </div>
          )}
          
          {team2Score === undefined && (
            <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
              <span className="font-semibold">{team2}</span>
              <span className="text-sm text-muted-foreground">Yet to bat</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </CardContent>
    </Card>
  );
}