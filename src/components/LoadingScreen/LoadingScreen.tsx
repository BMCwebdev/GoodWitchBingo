import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : 2,
      }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className={styles.content}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 0.6,
          ease: 'backOut',
        }}
      >
        <div className={styles.icon}>🧙‍♀️</div>
        <h2 className={styles.title}>Good Witch Bingo</h2>
        <motion.div
          className={styles.spinner}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
