import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { isSoundEnabled, setSoundEnabled } from '@/utils/audio';
import vintageRadio from '@/assets/vintage-radio.svg';
import styles from './Controls.module.css';

interface ControlsProps {
  onReset: () => void;
  isWon: boolean;
}

export function Controls({ onReset, isWon }: ControlsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const newValue = !soundOn;
    setSoundOn(newValue);
    setSoundEnabled(newValue);
  };

  return (
    <motion.div
      className={styles.controls}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.3,
      }}
    >
      <button
        className={`${styles.soundButton} ${!soundOn ? styles.muted : ''}`}
        onClick={toggleSound}
        aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
        title={soundOn ? 'Mute sound' : 'Unmute sound'}
      >
        <img src={vintageRadio} alt="" aria-hidden="true" />
      </button>
      <button
        className={styles.resetButton}
        onClick={onReset}
        aria-label="Start new game"
      >
        {isWon ? '🎉 Play Again' : '🔄 New Card'}
      </button>
    </motion.div>
  );
}
