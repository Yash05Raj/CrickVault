import { useState } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import MatchCard from "@/components/MatchCard";
import MatchFilters from "@/components/MatchFilters";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [activeFormat, setActiveFormat] = useState<'all' | 'ODI' | 'T20' | 'Test'>('all');

  // todo: remove mock functionality - replace with real API data
  const mockMatches = [
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
      time: "2:30 PM IST",
      format: 'ODI' as const,
    },
    {
      matchId: "match-2",
      team1: "England",
      team2: "New Zealand",
      team1Score: 0,
      team1Wickets: 0,
      team1Overs: 0,
      status: 'upcoming' as const,
      venue: "Lord's",
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
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log('Refreshing all match data...'); // todo: remove mock functionality
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const [, setLocation] = useLocation();

  const handleMatchClick = (matchId: string) => {
    console.log(`Navigating to match details: ${matchId}`); // todo: remove mock functionality
    setLocation(`/match/${matchId}`);
  };

  const filteredMatches = mockMatches.filter(match => {
    if (activeFilter !== 'all' && match.status !== activeFilter) return false;
    if (activeFormat !== 'all' && match.format !== activeFormat) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-[Poppins] text-cricket-green">
                Crick-Vault
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-settings">
                <Settings className="w-5 h-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <HeroSection onRefresh={handleRefresh} isRefreshing={isRefreshing} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <MatchFilters
                activeFilter={activeFilter}
                activeFormat={activeFormat}
                onFilterChange={setActiveFilter}
                onFormatChange={setActiveFormat}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {activeFilter === 'all' ? 'All Matches' : 
                 activeFilter === 'live' ? 'Live Matches' :
                 activeFilter === 'upcoming' ? 'Upcoming Matches' :
                 'Completed Matches'}
              </h2>
              <div className="text-sm text-muted-foreground">
                {filteredMatches.length} match{filteredMatches.length !== 1 ? 'es' : ''}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.matchId}
                  {...match}
                  onMatchClick={handleMatchClick}
                />
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No matches found for the selected filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActiveFilter('all');
                    setActiveFormat('all');
                  }}
                  className="mt-4"
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Crick-Vault. Real-time cricket scores and updates.</p>
        </div>
      </footer>
    </div>
  );
}