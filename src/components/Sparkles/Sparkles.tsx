import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Sparkles.module.css';

export function Sparkles() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  // Generate random sparkle positions
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
  }));

  return (
    <div className={styles.container}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className={styles.sparkle}
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
