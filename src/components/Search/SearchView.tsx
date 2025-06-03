
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Eye, Calendar, Users } from 'lucide-react';

const SearchView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for recent games
  const mockGames = [
    {
      id: '1',
      date: '2024-06-03',
      players: ['Mikko', 'Anna', 'Jukka', 'Liisa'],
      winner: 'Anna',
      rounds: 5,
      totalChugs: 12,
      duration: '45 min'
    },
    {
      id: '2',
      date: '2024-06-02',
      players: ['Mikko', 'Jukka', 'Timo'],
      winner: 'Mikko',
      rounds: 3,
      totalChugs: 8,
      duration: '30 min'
    },
    {
      id: '3',
      date: '2024-06-01',
      players: ['Anna', 'Liisa', 'Petra', 'Mikko', 'Jukka'],
      winner: 'Petra',
      rounds: 7,
      totalChugs: 18,
      duration: '65 min'
    },
    {
      id: '4',
      date: '2024-05-31',
      players: ['Timo', 'Jukka'],
      winner: 'Jukka',
      rounds: 2,
      totalChugs: 4,
      duration: '20 min'
    }
  ];

  const filteredGames = mockGames.filter(game => 
    game.players.some(player => 
      player.toLowerCase().includes(searchTerm.toLowerCase())
    ) || game.winner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewGameDetails = (gameId: string) => {
    // This would navigate to game details in a real app
    console.log('Viewing game details for game:', gameId);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Pelihaku</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Hae pelejä</CardTitle>
          <CardDescription>
            Etsi pelejä pelaajan nimen tai voittajan mukaan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Hae pelaajan nimellä..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {searchTerm ? `Hakutulokset (${filteredGames.length})` : 'Viimeisimmät pelit'}
        </h2>
        
        {filteredGames.map((game) => (
          <Card key={game.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{game.date}</span>
                    <Badge variant="outline">{game.duration}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {game.players.length} pelaajaa
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => viewGameDetails(game.id)}
                  size="sm"
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Näytä
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Pelaajat</h4>
                  <div className="flex flex-wrap gap-1">
                    {game.players.map((player, index) => (
                      <Badge 
                        key={index} 
                        variant={player === game.winner ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {player}
                        {player === game.winner && ' 👑'}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Kierrokset</h4>
                  <div className="text-2xl font-bold text-blue-600">{game.rounds}</div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Chugit</h4>
                  <div className="text-2xl font-bold text-red-600">{game.totalChugs}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredGames.length === 0 && searchTerm && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Ei hakutuloksia haulle "{searchTerm}"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchView;
