import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface MatchFiltersProps {
  activeFilter: 'all' | 'live' | 'upcoming' | 'completed';
  activeFormat: 'all' | 'ODI' | 'T20' | 'Test';
  onFilterChange: (filter: 'all' | 'live' | 'upcoming' | 'completed') => void;
  onFormatChange: (format: 'all' | 'ODI' | 'T20' | 'Test') => void;
}

export default function MatchFilters({ 
  activeFilter, 
  activeFormat, 
  onFilterChange, 
  onFormatChange 
}: MatchFiltersProps) {
  const filters = [
    { id: 'all' as const, label: 'All Matches' },
    { id: 'live' as const, label: 'Live' },
    { id: 'upcoming' as const, label: 'Upcoming' },
    { id: 'completed' as const, label: 'Completed' }
  ];

  const formats = [
    { id: 'all' as const, label: 'All Formats' },
    { id: 'ODI' as const, label: 'ODI' },
    { id: 'T20' as const, label: 'T20' },
    { id: 'Test' as const, label: 'Test' }
  ];

  const handleFilterClick = (filter: 'all' | 'live' | 'upcoming' | 'completed') => {
    console.log(`Filter changed to: ${filter}`); // todo: remove mock functionality
    onFilterChange(filter);
  };

  const handleFormatClick = (format: 'all' | 'ODI' | 'T20' | 'Test') => {
    console.log(`Format changed to: ${format}`); // todo: remove mock functionality
    onFormatChange(format);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-card to-card/80 rounded-xl border shadow-sm" data-testid="match-filters">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-cricket-green to-emerald-600 rounded-lg flex items-center justify-center">
          <Filter className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-lg bg-gradient-to-r from-cricket-green to-emerald-600 bg-clip-text text-transparent">Filter Matches</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Status</h4>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterClick(filter.id)}
                data-testid={`filter-${filter.id}`}
                className="toggle-elevate toggle-elevated"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Format</h4>
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <Button
                key={format.id}
                variant={activeFormat === format.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleFormatClick(format.id)}
                data-testid={`format-${format.id}`}
                className="toggle-elevate toggle-elevated"
              >
                {format.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}