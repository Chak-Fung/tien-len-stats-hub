
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Save } from 'lucide-react';

const GameView: React.FC = () => {
  const [players, setPlayers] = useState<string[]>(['Pelaaja 1', 'Pelaaja 2']);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const nextRound = () => {
    setCurrentRound(currentRound + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Tien Len Peli</h1>
      
      {!gameStarted ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pelaajien lisäys</CardTitle>
            <CardDescription>Lisää pelaajat ennen pelin aloittamista</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Pelaajan nimi"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
              />
              <Button onClick={addPlayer}>
                <Plus className="h-4 w-4 mr-2" />
                Lisää
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {players.map((player, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {player}
                </Badge>
              ))}
            </div>
            
            {players.length >= 2 && (
              <Button onClick={startGame} className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Aloita peli
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Kierros {currentRound}
                <Badge variant="outline">Käynnissä</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player, index) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-semibold mb-2">{player}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sijoitus:</span>
                        <Badge variant="outline">-</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Chugit:</span>
                        <span className="font-mono">0</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button onClick={nextRound} variant="outline">
                  Seuraava kierros
                </Button>
                <Button className="ml-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Tallenna peli
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GameView;
