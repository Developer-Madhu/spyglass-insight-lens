import { CompetitorUpdate } from '../types/update';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface UpdateCardProps {
  update: CompetitorUpdate;
}

const getTypeStyles = (type: CompetitorUpdate['type']) => {
  const styles = {
    'UI': 'bg-status-ui/20 text-status-ui border-status-ui/30',
    'Feature': 'bg-status-feature/20 text-status-feature border-status-feature/30',
    'Pricing': 'bg-status-pricing/20 text-status-pricing border-status-pricing/30',
    'Bug Fix': 'bg-status-bug/20 text-status-bug border-status-bug/30',
    'Performance': 'bg-status-performance/20 text-status-performance border-status-performance/30'
  };
  return styles[type];
};

const getProductLogo = (product: string) => {
  const colors = {
    'Notion': 'bg-white text-black',
    'Linear': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
    'Figma': 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
  };
  return colors[product as keyof typeof colors] || 'bg-muted text-muted-foreground';
};

export const UpdateCard = ({ update }: UpdateCardProps) => {
  const formattedDate = new Date(update.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50 hover:border-primary/30">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
              getProductLogo(update.product)
            )}>
              {update.product.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{update.product}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </div>
            </div>
          </div>
          <Badge className={cn("border", getTypeStyles(update.type))}>
            {update.type}
          </Badge>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {update.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-base leading-relaxed">
          {update.summary}
        </CardDescription>
        
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm font-medium text-primary mb-1">Why it matters:</p>
          <p className="text-sm text-muted-foreground">{update.why_it_matters}</p>
        </div>
        
        {update.link && (
          <a 
            href={update.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-glow transition-colors"
          >
            View original <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
};