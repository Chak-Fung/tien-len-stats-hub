
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import TabNavigation from '../components/Navigation/TabNavigation';
import HomePage from '../components/Home/HomePage';
import EnvironmentSetup from '../components/Setup/EnvironmentSetup';
import { Skeleton } from '@/components/ui/skeleton';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  // Check if Firebase is properly configured
  const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && 
                               import.meta.env.VITE_FIREBASE_PROJECT_ID;

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

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'game':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Peli-näkymä</h2>
            <p>Peli-komponentti tulossa pian...</p>
          </div>
        );
      case 'guess':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Korttien arvaus</h2>
            <p>Arvaus-komponentti tulossa pian...</p>
          </div>
        );
      case 'search':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Haku</h2>
            <p>Haku-komponentti tulossa pian...</p>
          </div>
        );
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
