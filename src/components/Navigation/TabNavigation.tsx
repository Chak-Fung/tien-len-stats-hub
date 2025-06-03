
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, GameController, Dice, Search, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from '@/hooks/use-toast';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Uloskirjautuminen onnistui",
        description: "Näkemiin!",
      });
    } catch (error: any) {
      toast({
        title: "Uloskirjautuminen epäonnistui",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-14">
            <TabsTrigger value="home" className="flex flex-col items-center gap-1 text-xs">
              <Home className="h-4 w-4" />
              Home
            </TabsTrigger>
            <TabsTrigger value="game" className="flex flex-col items-center gap-1 text-xs">
              <GameController className="h-4 w-4" />
              Peli
            </TabsTrigger>
            <TabsTrigger value="guess" className="flex flex-col items-center gap-1 text-xs">
              <Dice className="h-4 w-4" />
              Arvaa
            </TabsTrigger>
            <TabsTrigger value="search" className="flex flex-col items-center gap-1 text-xs">
              <Search className="h-4 w-4" />
              Haku
            </TabsTrigger>
            <TabsTrigger 
              value="logout" 
              className="flex flex-col items-center gap-1 text-xs"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Kirjaudu ulos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default TabNavigation;
