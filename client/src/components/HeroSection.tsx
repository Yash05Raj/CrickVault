import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import heroImage from "@assets/generated_images/Cricket_stadium_hero_background_a8731cd3.png";

interface HeroSectionProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function HeroSection({ onRefresh, isRefreshing = false }: HeroSectionProps) {
  const handleRefresh = () => {
    console.log('Refreshing scores...'); // todo: remove mock functionality
    onRefresh?.();
  };

  return (
    <div 
      className="relative h-96 bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-emerald-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8">
        <div className="mb-6 relative">
          <Badge className="bg-gradient-to-r from-cricket-live to-red-600 text-white animate-pulse shadow-lg px-4 py-2 text-sm font-semibold">
            <div className="w-2 h-2 bg-white rounded-full animate-ping mr-2"></div>
            LIVE NOW
          </Badge>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-[Poppins] mb-6 bg-gradient-to-r from-white via-cricket-gold to-cricket-green bg-clip-text text-transparent drop-shadow-lg">
          CrickVault
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl leading-relaxed">
          Experience live cricket like never before with real-time scores, instant updates, and comprehensive match analytics
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            size="lg"
            className="bg-gradient-to-r from-cricket-green to-emerald-600 hover:from-cricket-green/90 hover:to-emerald-600/90 text-white px-10 py-4 text-lg shadow-2xl hover:shadow-cricket-green/25 transition-all duration-300 transform hover:scale-105"
            data-testid="button-refresh"
          >
            <RefreshCw className={`w-6 h-6 mr-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Get Live Scores'}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-4 text-lg"
            data-testid="button-explore"
          >
            Explore Matches
          </Button>
        </div>
      </div>
    </div>
  );
}