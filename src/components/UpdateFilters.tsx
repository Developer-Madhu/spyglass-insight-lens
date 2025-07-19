import { type UpdateFilters } from '../types/update';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar, Filter, RefreshCw } from 'lucide-react';

interface UpdateFiltersProps {
  filters: UpdateFilters;
  onFiltersChange: (filters: UpdateFilters) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const UpdateFiltersComponent = ({ 
  filters, 
  onFiltersChange, 
  onRefresh,
  isLoading = false 
}: UpdateFiltersProps) => {
  const products = ['All Products', 'Notion', 'Linear', 'Figma'];
  const types = ['All Types', 'UI', 'Feature', 'Pricing', 'Bug Fix', 'Performance'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gradient-card rounded-lg border border-border/50">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="w-4 h-4 text-primary" />
        Filters:
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <Select 
          value={filters.source || 'All Products'} 
          onValueChange={(value) => 
            onFiltersChange({ 
              ...filters, 
              source: value === 'All Products' ? undefined : value 
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product} value={product}>
                {product}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.type || 'All Types'} 
          onValueChange={(value) => 
            onFiltersChange({ 
              ...filters, 
              type: value === 'All Types' ? undefined : value 
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 items-center">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Input
            type="date"
            placeholder="Start date"
            className="w-full sm:w-[140px]"
            value={filters.dateRange?.start || ''}
            onChange={(e) => 
              onFiltersChange({
                ...filters,
                dateRange: {
                  start: e.target.value,
                  end: filters.dateRange?.end || ''
                }
              })
            }
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="date"
            placeholder="End date"
            className="w-full sm:w-[140px]"
            value={filters.dateRange?.end || ''}
            onChange={(e) => 
              onFiltersChange({
                ...filters,
                dateRange: {
                  start: filters.dateRange?.start || '',
                  end: e.target.value
                }
              })
            }
          />
        </div>
      </div>

      <Button
        onClick={onRefresh}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-primary/10 hover:text-primary"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
};