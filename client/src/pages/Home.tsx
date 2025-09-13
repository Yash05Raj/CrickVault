import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";
import MatchCard from "@/components/MatchCard";
import MatchFilters from "@/components/MatchFilters";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Bell, Settings, RefreshCw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

interface Match {
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
}

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [activeFormat, setActiveFormat] = useState<'all' | 'ODI' | 'T20' | 'Test'>('all');
  const { toast } = useToast();

  // Fetch matches from API with auto-refresh for live matches
  const { 
    data: matches, 
    isLoading, 
    error, 
    refetch,
    isFetching 
  } = useQuery<Match[]>({
    queryKey: [`/api/matches?filter=${activeFilter}`],
    refetchInterval: activeFilter === 'live' ? 15000 : false, // Auto-refresh every 15s for live matches
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast({
        title: "Matches refreshed",
        description: "Latest cricket scores updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed", 
        description: "Unable to fetch latest scores. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const [, setLocation] = useLocation();

  const handleMatchClick = (matchId: string) => {
    setLocation(`/match/${matchId}`);
  };

  const filteredMatches = (matches || []).filter(match => {
    if (activeFilter !== 'all' && match.status !== activeFilter) return false;
    if (activeFormat !== 'all' && match.format !== activeFormat) return false;
    return true;
  });

  // Loading skeleton component
  const MatchSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cricket-green to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-3xl font-bold font-[Poppins] bg-gradient-to-r from-cricket-green to-emerald-600 bg-clip-text text-transparent">
                CrickVault
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
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold">
                  {activeFilter === 'all' ? 'All Matches' : 
                   activeFilter === 'live' ? 'Live Matches' :
                   activeFilter === 'upcoming' ? 'Upcoming Matches' :
                   'Completed Matches'}
                </h2>
                {isFetching && (
                  <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {isLoading ? 'Loading...' : `${filteredMatches.length} match${filteredMatches.length !== 1 ? 'es' : ''}`}
              </div>
            </div>

            {isLoading ? (
              <MatchSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Unable to load matches. Please check your connection.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  data-testid="button-retry"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    'Retry'
                  )}
                </Button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 CrickVault. Real-time cricket scores and updates.</p>
        </div>
      </footer>
    </div>
  );
}