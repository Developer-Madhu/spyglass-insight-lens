import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, TrendingUp, Users, Zap } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Spyglass Dashboard</span>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Competitor Feature Tracker
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track and analyze competitor updates from Notion, Linear, Figma and more. 
          Get AI-powered summaries and insights for better product decisions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Updates This Week</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-feature/10">
              <Zap className="w-5 h-5 text-status-feature" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">New Features</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-ui/10">
              <Users className="w-5 h-5 text-status-ui" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Competitors Tracked</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-card border border-border/50 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-status-pricing/10">
              <TrendingUp className="w-5 h-5 text-status-pricing" />
            </div>
            <div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Analysis Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button className="gap-2 bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Zap className="w-4 h-4" />
          Trigger Scrape
        </Button>
        <Button variant="outline" className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30">
          <Eye className="w-4 h-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
};