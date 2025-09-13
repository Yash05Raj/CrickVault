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
      className={`animate-pulse bg-cricket-live text-white ${className}`}
      data-testid="badge-live"
    >
      LIVE
    </Badge>
  );
}