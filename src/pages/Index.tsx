
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import TabNavigation from '../components/Navigation/TabNavigation';
import HomePage from '../components/Home/HomePage';
import GameView from '../components/Game/GameView';
import GuessView from '../components/Guess/GuessView';
import SearchView from '../components/Search/SearchView';
import EnvironmentSetup from '../components/Setup/EnvironmentSetup';
import { Skeleton } from '@/components/ui/skeleton';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  // Temporarily bypass Firebase configuration check for preview
  const isFirebaseConfigured = true; // Changed from checking env vars to true

  if (!isFirebaseConfigured) {
    return <EnvironmentSetup />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  // Temporarily bypass authentication for preview
  const mockUser = { uid: 'demo-user', email: 'demo@example.com' }; // Mock user for preview

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'game':
        return <GameView />;
      case 'guess':
        return <GuessView />;
      case 'search':
        return <SearchView />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-16">
        {renderContent()}
      </main>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
