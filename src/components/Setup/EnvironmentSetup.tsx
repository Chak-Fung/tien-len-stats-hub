
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const EnvironmentSetup: React.FC = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Firebase-konfiguraatio puuttuu
          </CardTitle>
          <CardDescription>
            Sovellus tarvitsee Firebase-ympäristömuuttujat toimiakseen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Aseta seuraavat ympäristömuuttujat Lovable-projektissasi:
            </AlertDescription>
          </Alert>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Tarvittavat ympäristömuuttujat:</h3>
            <ul className="space-y-1 font-mono text-sm">
              {requiredVars.map(varName => (
                <li key={varName} className="text-gray-700">
                  {varName}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Ohjeet:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Luo Firebase-projekti <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Firebase Console <ExternalLink className="h-3 w-3" /></a></li>
              <li>Ota käyttöön Authentication (Email/Password)</li>
              <li>Ota käyttöön Firestore Database</li>
              <li>Kopioi projektisi konfiguraatio Web App -asetuksista</li>
              <li>Aseta ympäristömuuttujat Lovable-projektissasi</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentSetup;
