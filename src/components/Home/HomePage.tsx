
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { GameStats, Game } from '../../types';
import StatsCarousel from './StatsCarousel';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage: React.FC = () => {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const gamesCollection = collection(db, 'games');
        const gamesSnapshot = await getDocs(gamesCollection);
        const games: Game[] = gamesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Game));

        // Laske tilastot
        const totalGames = games.length;
        const totalRounds = games.reduce((sum, game) => sum + game.rounds.length, 0);
        const totalChugs = games.reduce((sum, game) => sum + game.totalChugs, 0);

        // Laske pelaajatilastot
        const playerStats = new Map<string, { wins: number; gamesPlayed: number }>();
        
        games.forEach(game => {
          game.players.forEach(player => {
            if (!playerStats.has(player.name)) {
              playerStats.set(player.name, { wins: 0, gamesPlayed: 0 });
            }
            const stats = playerStats.get(player.name)!;
            stats.gamesPlayed++;
            
            if (game.finalWinner?.id === player.id) {
              stats.wins++;
            }
          });
        });

        const topPlayers = Array.from(playerStats.entries())
          .map(([name, stats]) => ({ name, ...stats }))
          .sort((a, b) => b.gamesPlayed - a.gamesPlayed);

        const topWinners = Array.from(playerStats.entries())
          .map(([name, stats]) => ({ name, wins: stats.wins }))
          .sort((a, b) => b.wins - a.wins);

        setStats({
          totalGames,
          totalPlayers: playerStats.size,
          totalRounds,
          totalChugs,
          topPlayers,
          topWinners
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Tien Len Stats Hub</h1>
        <p className="text-muted-foreground">
          Seuraa pelitilastojasi ja kilpaile ystäviesi kanssa
        </p>
      </div>
      
      {stats && <StatsCarousel stats={stats} />}
    </div>
  );
};

export default HomePage;
