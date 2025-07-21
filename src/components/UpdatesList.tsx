import { useState, useMemo } from 'react';
import { CompetitorUpdate, UpdateFilters } from '../types/update';
import { UpdateCard } from './UpdateCard';
import { UpdateFiltersComponent } from './UpdateFilters';
import { mockUpdates } from '../data/mockUpdates';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = 'http://localhost:8000';

export const UpdatesList = () => {
  const [filters, setFilters] = useState<UpdateFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch updates from backend
  const { data: updatesData, isLoading: isQueryLoading, refetch } = useQuery({
    queryKey: ['updates'],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.source) params.append('product', filters.source);
      if (filters.type) params.append('type', filters.type);
      if (filters.dateRange?.start) params.append('date', filters.dateRange.start);
      // Only pass one date param for now; can be extended for range
      const res = await fetch(`${BACKEND_URL}/updates?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch updates');
      const data = await res.json();
      // Add fallback id if missing
      return data.map((u, i) => ({ id: u.id || `${u.product}-${u.date}-${i}`, ...u }));
    },
    retry: false,
    staleTime: 60 * 1000,
  });

  const filteredUpdates = useMemo(() => {
    let filtered = updatesData || mockUpdates;

    // Filter by source
    if (filters.source) {
      filtered = filtered.filter(update => update.product === filters.source);
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(update => update.type === filters.type);
    }

    // Filter by date range
    if (filters.dateRange?.start) {
      filtered = filtered.filter(update => update.date >= filters.dateRange!.start);
    }
    if (filters.dateRange?.end) {
      filtered = filtered.filter(update => update.date <= filters.dateRange!.end);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(update => 
        update.title.toLowerCase().includes(query) ||
        update.summary.toLowerCase().includes(query) ||
        update.product.toLowerCase().includes(query) ||
        update.why_it_matters.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [updatesData, filters, searchQuery]);

  const handleRefresh = async () => {
    setIsLoading(true);
    await refetch();
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <UpdateFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onRefresh={handleRefresh}
        isLoading={isLoading || isQueryLoading}
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search updates by title, summary, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Latest Updates 
            <span className="text-muted-foreground font-normal">
              ({filteredUpdates.length} {filteredUpdates.length === 1 ? 'update' : 'updates'})
            </span>
          </h2>
        </div>

        {filteredUpdates.length === 0 ? (
          (updatesData && updatesData.length > 0) ? (
            <div className="grid gap-6">
              <UpdateCard
                update={
                  filters.source
                    ? updatesData
                        .filter(u => u.product === filters.source)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
                    : updatesData.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
                }
              />
            </div>
          ) : null
        ) : (
          <div className="grid gap-6">
            {filteredUpdates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};