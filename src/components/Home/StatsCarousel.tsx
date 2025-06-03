
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GameStats } from '../../types';

interface StatsCarouselProps {
  stats: GameStats;
}

const StatsCarousel: React.FC<StatsCarouselProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Top Pelaajat",
      description: "Eniten pelejä pelanneet",
      content: stats.topPlayers.slice(0, 5).map((player, index) => (
        <div key={player.name} className="flex justify-between items-center mb-2">
          <span className="text-sm">{index + 1}. {player.name}</span>
          <span className="text-sm font-bold">{player.gamesPlayed} peliä</span>
        </div>
      ))
    },
    {
      title: "Top Voittajat",
      description: "Eniten voittosia",
      content: stats.topWinners.slice(0, 5).map((winner, index) => (
        <div key={winner.name} className="flex justify-between items-center mb-2">
          <span className="text-sm">{index + 1}. {winner.name}</span>
          <span className="text-sm font-bold">{winner.wins} voittoa</span>
        </div>
      ))
    },
    {
      title: "Pelit yhteensä",
      description: "Kaikkien pelien määrä",
      content: (
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{stats.totalGames}</div>
          <p className="text-sm text-muted-foreground mt-2">pelattua peliä</p>
        </div>
      )
    },
    {
      title: "Kierrokset yhteensä",
      description: "Kaikkien kierrosten määrä",
      content: (
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{stats.totalRounds}</div>
          <p className="text-sm text-muted-foreground mt-2">pelattua kierrosta</p>
        </div>
      )
    },
    {
      title: "Chugit yhteensä",
      description: "Kaikkien chugien määrä",
      content: (
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{stats.totalChugs}</div>
          <p className="text-sm text-muted-foreground mt-2">chugattua</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent>
          {statCards.map((statCard, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{statCard.title}</CardTitle>
                    <CardDescription>{statCard.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {statCard.content}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default StatsCarousel;
