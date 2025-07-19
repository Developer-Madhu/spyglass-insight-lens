import { useState, useMemo } from 'react';
import { CompetitorUpdate, UpdateFilters } from '../types/update';
import { UpdateCard } from './UpdateCard';
import { UpdateFiltersComponent } from './UpdateFilters';
import { mockUpdates } from '../data/mockUpdates';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';

export const UpdatesList = () => {
  const [filters, setFilters] = useState<UpdateFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredUpdates = useMemo(() => {
    let filtered = mockUpdates;

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
  }, [filters, searchQuery]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <UpdateFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onRefresh={handleRefresh}
        isLoading={isLoading}
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
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium">No updates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query to see more results.
            </p>
          </div>
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