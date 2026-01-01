import { BingoCard as BingoCardType, WinPattern } from '@/types';
import { BingoSquare } from '../BingoSquare/BingoSquare';
import { isSquareInWinPattern } from '@/utils/winDetection';
import styles from './BingoCard.module.css';

interface BingoCardProps {
  card: BingoCardType;
  onSquareClick: (row: number, col: number) => void;
  winPattern: WinPattern | null;
}

export function BingoCard({ card, onSquareClick, winPattern }: BingoCardProps) {
  return (
    <div
      className={styles.cardContainer}
      role="grid"
      aria-label="Bingo card"
    >
      <div className={styles.grid}>
        {card.squares.map((row, rowIndex) =>
          row.map((square, colIndex) => {
            // Stagger animation delay based on position
            const animationDelay = (rowIndex + colIndex) * 0.05;
            const isWinning = isSquareInWinPattern(
              rowIndex,
              colIndex,
              winPattern
            );

            return (
              <BingoSquare
                key={square.id}
                square={square}
                onClick={() => onSquareClick(rowIndex, colIndex)}
                isInWinPattern={isWinning}
                animationDelay={animationDelay}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
