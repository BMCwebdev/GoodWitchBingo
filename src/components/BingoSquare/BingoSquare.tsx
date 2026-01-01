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

  // Fit text to container using scrollHeight for overflow detection
  useLayoutEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const fit = () => {
      const style = getComputedStyle(container);
      const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

      const availableWidth = container.clientWidth - paddingX;
      const availableHeight = container.clientHeight - paddingY;

      // Set width so text wraps correctly, but don't constrain height
      // This allows scrollHeight to report true content height
      textEl.style.width = `${availableWidth}px`;

      // Linear search from large to small
      for (let size = 32; size >= 8; size--) {
        textEl.style.fontSize = `${size}px`;

        // Force reflow
        void textEl.offsetHeight;

        // scrollHeight includes content that would overflow
        // If scrollHeight <= availableHeight, the text fits
        if (textEl.scrollHeight <= availableHeight) {
          setFontSize(size);
          return;
        }
      }

      // Fallback to minimum
      setFontSize(8);
    };

    // Initial fit after layout
    let timer = setTimeout(fit, 10);

    const observer = new ResizeObserver(() => {
      // Debounce resize
      clearTimeout(timer);
      timer = setTimeout(fit, 10);
    });
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
