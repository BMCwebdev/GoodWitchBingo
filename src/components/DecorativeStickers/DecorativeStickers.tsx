import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getRandomStickers } from '@/utils/getRandomStickers';
import styles from './DecorativeStickers.module.css';

export function DecorativeStickers() {
  const prefersReducedMotion = useReducedMotion();

  // Select random stickers once on mount
  const stickers = useMemo(() => getRandomStickers(), []);

  return (
    <>
      {stickers.map((sticker, index) => (
        <motion.img
          key={`${sticker.position}-${index}`}
          src={sticker.image}
          alt=""
          aria-hidden="true"
          className={`${styles.sticker} ${styles[sticker.position]}`}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 0.6 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.8,
            delay: prefersReducedMotion ? 0 : 0.5 + index * 0.2,
            ease: 'backOut',
          }}
        />
      ))}
    </>
  );
}
