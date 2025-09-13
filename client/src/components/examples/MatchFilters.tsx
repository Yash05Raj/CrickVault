import { useState } from 'react';
import MatchFilters from '../MatchFilters';

export default function MatchFiltersExample() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [activeFormat, setActiveFormat] = useState<'all' | 'ODI' | 'T20' | 'Test'>('all');

  return (
    <MatchFilters 
      activeFilter={activeFilter}
      activeFormat={activeFormat}
      onFilterChange={setActiveFilter}
      onFormatChange={setActiveFormat}
    />
  );
}