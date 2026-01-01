import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { BingoSquare as BingoSquareType } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { playWindChime } from '@/utils/audio';
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
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(16);

  // Fit text to container
  useLayoutEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const fit = () => {
      const style = getComputedStyle(container);
      const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

      // Safety margin to prevent clipping
      const availableWidth = container.clientWidth - paddingX - 2;
      const availableHeight = container.clientHeight - paddingY - 2;

      // Binary search for optimal font size
      let low = 6;
      let high = 22;
      let best = low;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        textEl.style.fontSize = `${mid}px`;

        // Force layout recalc
        void textEl.offsetHeight;

        if (textEl.scrollWidth <= availableWidth && textEl.scrollHeight <= availableHeight) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      // Apply best size and subtract 1 for safety
      const finalSize = Math.max(low > 6 ? best - 1 : best, 6);
      textEl.style.fontSize = `${finalSize}px`;
      setFontSize(finalSize);
    };

    // Initial fit
    const timer = setTimeout(fit, 50);

    const observer = new ResizeObserver(fit);
    observer.observe(container);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [square.text]);

  const handleClick = () => {
    if (!square.isFreeSpace) {
      if (!square.isMarked) {
        playWindChime();
      }
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
      ref={containerRef}
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
    >
      <span
        ref={textRef}
        className={styles.text}
        style={{ fontSize: `${fontSize}px` }}
      >
        {square.text}
      </span>
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
