import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Header.module.css';

export function Header() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: 'easeOut',
      }}
    >
      <h1 className={styles.title}>
        <span className={styles.emoji} role="img" aria-label="witch">
          🧙‍♀️
        </span>
        Good Witch Bingo
        <span className={styles.emoji} role="img" aria-label="sparkles">
          ✨
        </span>
      </h1>
    </motion.header>
  );
}
