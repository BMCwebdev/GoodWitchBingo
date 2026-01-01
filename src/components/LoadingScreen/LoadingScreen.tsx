import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { playLoadingMusic } from '@/utils/audio';
import splashImage from '@/assets/random-images/splash.png';
import sparkle8Point from '@/assets/sparkles/sparkle-8point.svg';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  // Play theme music on mount
  useEffect(() => {
    playLoadingMusic();
  }, []);

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
        <img src={splashImage} alt="" className={styles.icon} aria-hidden="true" />
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
          <img src={sparkle8Point} alt="" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
