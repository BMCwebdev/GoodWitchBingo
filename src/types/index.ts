export type TextSizeCategory = 'short' | 'medium' | 'long';

export interface BingoItem {
  id: string;
  text: string;
  category?: string;
}

export interface BingoSquare {
  id: string;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
  textSize: TextSizeCategory;
  position: {
    row: number;
    col: number;
  };
}

export interface BingoCard {
  squares: BingoSquare[][];
  gridSize: number;
}

export interface WinPattern {
  type: 'horizontal' | 'vertical' | 'diagonal';
  positions: Array<{ row: number; col: number }>;
}

export interface GameState {
  card: BingoCard | null;
  isWon: boolean;
  winPattern: WinPattern | null;
  isLoading: boolean;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}
