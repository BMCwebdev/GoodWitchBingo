import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { playWinMusic } from '@/utils/audio';
import { Sparkles } from '../Sparkles/Sparkles';
import styles from './WinCelebration.module.css';

// Cassie Nightingale quotes about winning/success/magic
const CASSIE_QUOTES = [
  "There's a little magic in all of us.",
  "Luck favors the prepared.",
  "Just because we don't see it doesn't mean it's not there.",
  "We all have an internal compass that points us in the right direction.",
  "Present opportunities are not to be neglected.",
  "I think knowing how to share our gifts with the world is as important as recognizing what gifts we have to share.",
];

interface WinCelebrationProps {
  isVisible: boolean;
  onRestart: () => void;
}

export function WinCelebration({ isVisible, onRestart }: WinCelebrationProps) {
  const prefersReducedMotion = useReducedMotion();

  // Pick a random quote when visible
  const quote = useMemo(() => {
    return CASSIE_QUOTES[Math.floor(Math.random() * CASSIE_QUOTES.length)];
  }, [isVisible]);

  // Play theme music when winning
  useEffect(() => {
    if (isVisible) {
      playWinMusic();
    }
  }, [isVisible]);

  const handleClick = () => {
    onRestart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
          onClick={handleClick}
        >
          <Sparkles />
          <motion.div
            className={styles.message}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.6,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <div className={styles.emoji}>🎉</div>
            <h2 className={styles.title}>BINGO!</h2>
            <p className={styles.quote}>"{quote}"</p>
            <p className={styles.tapHint}>Tap to play again</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
