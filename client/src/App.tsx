import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import MatchDetails from "@/pages/MatchDetails";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();

  const handleMatchClick = (matchId: string) => {
    setLocation(`/match/${matchId}`);
  };

  const handleBackToHome = () => {
    setLocation("/");
  };

  return (
    <Switch>
      <Route path="/" component={() => <Home />} />
      <Route path="/match/:matchId">
        {(params) => (
          <MatchDetails 
            matchId={params.matchId}
            onBack={handleBackToHome}
          />
        )}
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
