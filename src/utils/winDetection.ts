import { BingoCard, WinPattern } from '@/types';

/**
 * Checks if all squares in a pattern are marked.
 */
function isPatternComplete(
  card: BingoCard,
  positions: Array<{ row: number; col: number }>
): boolean {
  return positions.every(({ row, col }) => card.squares[row][col].isMarked);
}

/**
 * Detects win conditions and returns the winning pattern if found.
 * Checks: all horizontals, all verticals, both diagonals.
 */
export function detectWin(card: BingoCard): WinPattern | null {
  const size = card.gridSize;

  // Check horizontal rows
  for (let row = 0; row < size; row++) {
    const positions = Array.from({ length: size }, (_, col) => ({ row, col }));
    if (isPatternComplete(card, positions)) {
      return { type: 'horizontal', positions };
    }
  }

  // Check vertical columns
  for (let col = 0; col < size; col++) {
    const positions = Array.from({ length: size }, (_, row) => ({ row, col }));
    if (isPatternComplete(card, positions)) {
      return { type: 'vertical', positions };
    }
  }

  // Check diagonal (top-left to bottom-right)
  const diagonalTLBR = Array.from({ length: size }, (_, i) => ({
    row: i,
    col: i,
  }));
  if (isPatternComplete(card, diagonalTLBR)) {
    return { type: 'diagonal', positions: diagonalTLBR };
  }

  // Check diagonal (top-right to bottom-left)
  const diagonalTRBL = Array.from({ length: size }, (_, i) => ({
    row: i,
    col: size - 1 - i,
  }));
  if (isPatternComplete(card, diagonalTRBL)) {
    return { type: 'diagonal', positions: diagonalTRBL };
  }

  return null;
}

/**
 * Helper to check if a specific square is part of the winning pattern.
 */
export function isSquareInWinPattern(
  row: number,
  col: number,
  pattern: WinPattern | null
): boolean {
  if (!pattern) return false;
  return pattern.positions.some(
    (pos) => pos.row === row && pos.col === col
  );
}
