import { useMemo } from 'react';
import { getRandomBackdrop } from '@/utils/getRandomBackdrop';
import styles from './BackdropImage.module.css';

interface BackdropImageProps {
  refreshKey?: number;
}

export function BackdropImage({ refreshKey = 0 }: BackdropImageProps) {
  // Select random backdrop, changes when refreshKey changes
  const backdrop = useMemo(() => getRandomBackdrop(), [refreshKey]);

  return (
    <div
      className={styles.backdrop}
      style={{ backgroundImage: `url(${backdrop})` }}
      aria-hidden="true"
    />
  );
}
