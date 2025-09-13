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
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8">
        <Badge className="mb-4 bg-cricket-live text-white animate-pulse">
          LIVE NOW
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold font-[Poppins] mb-4">
          Crick-Vault
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl">
          Real-time cricket scores and match updates at your fingertips
        </p>
        
        <Button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-cricket-green hover:bg-cricket-green/90 text-white px-8 py-3 text-lg"
          data-testid="button-refresh"
        >
          <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Scores'}
        </Button>
      </div>
    </div>
  );
}