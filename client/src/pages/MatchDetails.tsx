import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ScoreDisplay from "@/components/ScoreDisplay";
import PlayerStats from "@/components/PlayerStats";
import LiveIndicator from "@/components/LiveIndicator";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft, RefreshCw, Share } from "lucide-react";

interface MatchDetailsProps {
  matchId?: string;
  onBack?: () => void;
}

export default function MatchDetails({ matchId = "match-1", onBack }: MatchDetailsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // todo: remove mock functionality - replace with real API data
  const mockMatch = {
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
    time: "2:30 PM IST",
    format: 'ODI' as const,
    target: 288,
    required: 132,
    requiredRate: 7.8,
    currentRate: 4.8
  };

  const mockBattingStats = [
    {
      id: "player-1",
      name: "Steve Smith",
      runs: 45,
      balls: 67,
      fours: 4,
      sixes: 0,
      strikeRate: 67.2,
      isOut: false
    },
    {
      id: "player-2", 
      name: "David Warner",
      runs: 32,
      balls: 41,
      fours: 3,
      sixes: 1,
      strikeRate: 78.0,
      isOut: true
    }
  ];

  const mockBowlingStats = [
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
      wickets: 2,
      runs: 38,
      economy: 5.4
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log('Refreshing match data...'); // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleBack = () => {
    console.log('Navigating back to match list'); // todo: remove mock functionality
    onBack?.();
  };

  const handleShare = () => {
    console.log('Sharing match details'); // todo: remove mock functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBack}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">
                  {mockMatch.team1} vs {mockMatch.team2}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mockMatch.format} • {mockMatch.venue}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
                data-testid="button-share"
              >
                <Share className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                data-testid="button-refresh-match"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing' : 'Refresh'}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Match Status */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LiveIndicator isLive={mockMatch.status === 'live'} />
            <Badge variant="outline">{mockMatch.format}</Badge>
            <span className="text-sm text-muted-foreground">{mockMatch.time}</span>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid gap-4 mb-6">
          <ScoreDisplay
            team={mockMatch.team1}
            score={mockMatch.team1Score}
            wickets={mockMatch.team1Wickets}
            overs={mockMatch.team1Overs}
            isWinning={mockMatch.team1Score > mockMatch.team2Score}
          />
          <ScoreDisplay
            team={mockMatch.team2}
            score={mockMatch.team2Score}
            wickets={mockMatch.team2Wickets}
            overs={mockMatch.team2Overs}
            isWinning={mockMatch.team2Score > mockMatch.team1Score}
          />
        </div>

        {/* Match Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Match Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cricket-green">
                  {mockMatch.target}
                </div>
                <div className="text-sm text-muted-foreground">Target</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">
                  {mockMatch.required}
                </div>
                <div className="text-sm text-muted-foreground">Required</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockMatch.requiredRate}
                </div>
                <div className="text-sm text-muted-foreground">Req Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {mockMatch.currentRate}
                </div>
                <div className="text-sm text-muted-foreground">Curr Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Player Stats Tabs */}
        <Tabs defaultValue="batting" className="w-full">
          <TabsList className="grid w-full grid-cols-3" data-testid="tabs-stats">
            <TabsTrigger value="batting" data-testid="tab-batting">Batting</TabsTrigger>
            <TabsTrigger value="bowling" data-testid="tab-bowling">Bowling</TabsTrigger>
            <TabsTrigger value="commentary" data-testid="tab-commentary">Commentary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batting" className="mt-6">
            <PlayerStats 
              players={mockBattingStats}
              title="Current Partnership"
              type="batting"
            />
          </TabsContent>
          
          <TabsContent value="bowling" className="mt-6">
            <PlayerStats 
              players={mockBowlingStats}
              title="Recent Bowling Figures"
              type="bowling"
            />
          </TabsContent>
          
          <TabsContent value="commentary" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Commentary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* todo: remove mock functionality - replace with real commentary */}
                  <div className="border-l-4 border-cricket-green pl-4">
                    <div className="font-semibold">32.4 overs - WICKET!</div>
                    <p className="text-muted-foreground">
                      Bumrah strikes! Warner tries to pull but gets a top edge, caught at fine leg.
                    </p>
                  </div>
                  <div className="border-l-4 border-muted pl-4">
                    <div className="font-semibold">32.3 overs</div>
                    <p className="text-muted-foreground">
                      Single to long-on, Smith rotates the strike.
                    </p>
                  </div>
                  <div className="border-l-4 border-cricket-gold pl-4">
                    <div className="font-semibold">32.2 overs - FOUR!</div>
                    <p className="text-muted-foreground">
                      Beautiful cover drive by Warner, races to the boundary.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}