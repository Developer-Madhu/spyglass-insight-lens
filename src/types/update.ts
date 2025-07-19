export interface CompetitorUpdate {
  id: string;
  product: string;
  date: string;
  title: string;
  type: 'UI' | 'Feature' | 'Pricing' | 'Bug Fix' | 'Performance';
  summary: string;
  why_it_matters: string;
  link?: string;
  content?: string;
}

export interface UpdateFilters {
  source?: string;
  type?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}