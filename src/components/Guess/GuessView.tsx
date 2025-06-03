
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shuffle, RotateCcw } from 'lucide-react';

const GuessView: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [guessCount, setGuessCount] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

  const generateMockCard = () => {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return {
      suit: randomSuit,
      value: randomValue,
      image: `https://deckofcardsapi.com/static/img/${randomValue.charAt(0)}${randomSuit.charAt(0)}.png`
    };
  };

  const startNewGame = () => {
    setCurrentCard(generateMockCard());
    setScore(0);
    setGuessCount(0);
    setGameActive(true);
  };

  const makeGuess = (guessType: 'higher' | 'lower') => {
    const newCard = generateMockCard();
    setCurrentCard(newCard);
    setGuessCount(guessCount + 1);
    
    // Mock scoring logic
    const correct = Math.random() > 0.5;
    if (correct) {
      setScore(score + 1);
    }
  };

  const resetGame = () => {
    setCurrentCard(null);
    setScore(0);
    setGuessCount(0);
    setGameActive(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Korttien arvaus</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Arvauspeili
            <div className="flex gap-2">
              <Badge variant="secondary">Pisteet: {score}</Badge>
              <Badge variant="outline">Arvaukset: {guessCount}</Badge>
            </div>
          </CardTitle>
          <CardDescription>
            Arvaa onko seuraava kortti suurempi vai pienempi kuin nykyinen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!gameActive ? (
            <div className="text-center">
              <Button onClick={startNewGame} size="lg">
                <Shuffle className="h-4 w-4 mr-2" />
                Aloita peli
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-green-100 p-6 rounded-lg">
                  {currentCard ? (
                    <div className="text-center">
                      <div className="w-32 h-44 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{currentCard.value}</div>
                          <div className="text-xl">
                            {currentCard.suit === 'HEARTS' && '♥️'}
                            {currentCard.suit === 'DIAMONDS' && '♦️'}
                            {currentCard.suit === 'CLUBS' && '♣️'}
                            {currentCard.suit === 'SPADES' && '♠️'}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {currentCard.value} of {currentCard.suit}
                      </p>
                    </div>
                  ) : (
                    <div className="w-32 h-44 bg-blue-500 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">?</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => makeGuess('higher')} 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Suurempi ⬆️
                </Button>
                <Button 
                  onClick={() => makeGuess('lower')} 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Pienempi ⬇️
                </Button>
              </div>
              
              <div className="text-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Uusi peli
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuessView;
