import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Sparkles } from '../Sparkles/Sparkles';
import styles from './WinCelebration.module.css';

interface WinCelebrationProps {
  isVisible: boolean;
}

export function WinCelebration({ isVisible }: WinCelebrationProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
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
            <p className={styles.subtitle}>You did it!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
