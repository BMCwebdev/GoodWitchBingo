import { BingoCard, BingoSquare, BingoItem } from '@/types';
import { calculateTextSize } from './textSize';

/**
 * Fisher-Yates shuffle algorithm for randomizing array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates a randomized bingo card from available items.
 * Center square (2,2) is always the free space.
 */
export function generateBingoCard(
  items: BingoItem[],
  gridSize: number = 5
): BingoCard {
  const totalSquares = gridSize * gridSize;
  const freeSpaceIndex = Math.floor(totalSquares / 2); // Center square

  // Shuffle items and take what we need
  const shuffled = shuffleArray(items);
  const selectedItems = shuffled.slice(0, totalSquares);

  const squares: BingoSquare[][] = [];

  for (let row = 0; row < gridSize; row++) {
    squares[row] = [];
    for (let col = 0; col < gridSize; col++) {
      const index = row * gridSize + col;
      const item = selectedItems[index];
      const isFreeSpace = index === freeSpaceIndex;

      squares[row][col] = {
        id: `${row}-${col}`,
        text: item.text,
        isMarked: isFreeSpace, // Free space starts marked
        isFreeSpace,
        textSize: calculateTextSize(item.text),
        position: { row, col },
      };
    }
  }

  return {
    squares,
    gridSize,
  };
}
