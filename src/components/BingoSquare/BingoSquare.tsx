import { motion } from 'framer-motion';
import clsx from 'clsx';
import { BingoSquare as BingoSquareType } from '@/types';
import { getFontSizeForCategory } from '@/utils/textSize';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './BingoSquare.module.css';

interface BingoSquareProps {
  square: BingoSquareType;
  onClick: () => void;
  isInWinPattern: boolean;
  animationDelay: number;
}

export function BingoSquare({
  square,
  onClick,
  isInWinPattern,
  animationDelay,
}: BingoSquareProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (!square.isFreeSpace) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      className={clsx(styles.square, {
        [styles.marked]: square.isMarked,
        [styles.freeSpace]: square.isFreeSpace,
        [styles.winning]: isInWinPattern,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: prefersReducedMotion ? 0 : animationDelay,
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: [0.34, 1.56, 0.64, 1] as const,
      }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      tabIndex={0}
      aria-pressed={square.isMarked}
      aria-label={`${square.text}${square.isFreeSpace ? ' (Free Space)' : ''}${
        square.isMarked ? ', marked' : ''
      }`}
      style={{
        fontSize: getFontSizeForCategory(square.textSize),
      }}
    >
      <span className={styles.text}>{square.text}</span>
      {square.isMarked && (
        <motion.div
          className={styles.checkmark}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: 'backOut' }}
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}
