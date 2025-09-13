import { Badge } from "@/components/ui/badge";

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
}

export default function LiveIndicator({ isLive, className = "" }: LiveIndicatorProps) {
  if (!isLive) return null;
  
  return (
    <Badge 
      variant="destructive" 
      className={`bg-gradient-to-r from-cricket-live to-red-600 text-white shadow-lg ${className} relative overflow-hidden`}
      data-testid="badge-live"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      <div className="flex items-center gap-1.5 relative z-10">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
        <span className="font-semibold text-xs tracking-wide">LIVE</span>
      </div>
    </Badge>
  );
}