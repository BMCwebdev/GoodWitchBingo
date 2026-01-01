import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Controls.module.css';

interface ControlsProps {
  onReset: () => void;
  isWon: boolean;
}

export function Controls({ onReset, isWon }: ControlsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.controls}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.3,
      }}
    >
      <button
        className={styles.resetButton}
        onClick={onReset}
        aria-label="Start new game"
      >
        {isWon ? '🎉 Play Again' : '🔄 New Card'}
      </button>
    </motion.div>
  );
}
