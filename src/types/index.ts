
export interface Player {
  id: string;
  name: string;
  score?: number;
  isWinner?: boolean;
}

export interface Chug {
  playerId: string;
  playerName: string;
  amount: number;
  timestamp: Date;
}

export interface Round {
  id: string;
  roundNumber: number;
  winner: Player;
  chugs: Chug[];
  timestamp: Date;
}

export interface Game {
  id: string;
  players: Player[];
  rounds: Round[];
  finalWinner?: Player;
  totalChugs: number;
  startTime: Date;
  endTime?: Date;
  isCompleted: boolean;
}

export interface GameStats {
  totalGames: number;
  totalPlayers: number;
  totalRounds: number;
  totalChugs: number;
  topPlayers: Array<{
    name: string;
    wins: number;
    gamesPlayed: number;
  }>;
  topWinners: Array<{
    name: string;
    wins: number;
  }>;
}

export interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

export interface Deck {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
}
