import { useMemo } from 'react';
import { getRandomBackdrop } from '@/utils/getRandomBackdrop';
import styles from './BackdropImage.module.css';

export function BackdropImage() {
  // Select random backdrop once on mount
  const backdrop = useMemo(() => getRandomBackdrop(), []);

  return (
    <div
      className={styles.backdrop}
      style={{ backgroundImage: `url(${backdrop})` }}
      aria-hidden="true"
    />
  );
}
