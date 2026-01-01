import { useState, useCallback } from 'react';
import { BingoCard } from '@/types';
import { generateBingoCard } from '@/utils/cardGeneration';
import { PLACEHOLDER_BINGO_ITEMS, GRID_SIZE } from '@/data/bingoItems';

export function useBingoCard() {
  const [card, setCard] = useState<BingoCard>(() =>
    generateBingoCard(PLACEHOLDER_BINGO_ITEMS, GRID_SIZE)
  );

  const toggleSquare = useCallback((row: number, col: number) => {
    setCard((prevCard) => {
      const newSquares = prevCard.squares.map((rowSquares, r) =>
        rowSquares.map((square, c) => {
          if (r === row && c === col && !square.isFreeSpace) {
            return { ...square, isMarked: !square.isMarked };
          }
          return square;
        })
      );

      return {
        ...prevCard,
        squares: newSquares,
      };
    });
  }, []);

  const resetCard = useCallback(() => {
    setCard(generateBingoCard(PLACEHOLDER_BINGO_ITEMS, GRID_SIZE));
  }, []);

  return {
    card,
    toggleSquare,
    resetCard,
  };
}
