import { DashboardHeader } from '../components/DashboardHeader';
import { UpdatesList } from '../components/UpdatesList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <DashboardHeader />
        <UpdatesList />
      </div>
    </div>
  );
};

export default Index;
