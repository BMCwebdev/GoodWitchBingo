import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import sparkle4Point from '@/assets/sparkles/sparkle-4point.svg';
import sparkle8Point from '@/assets/sparkles/sparkle-8point.svg';
import sparkleCircle from '@/assets/sparkles/sparkle-circle.svg';
import styles from './Sparkles.module.css';

const sparkleTypes = [sparkle4Point, sparkle8Point, sparkleCircle];

export function Sparkles() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  // Generate random sparkle positions with type and rotation
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    type: sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)],
    rotation: Math.random() * 360,
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
          <img
            src={sparkle.type}
            alt=""
            aria-hidden="true"
            style={{ transform: `rotate(${sparkle.rotation}deg)` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
