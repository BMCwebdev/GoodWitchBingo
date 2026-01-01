import { useState, useEffect } from 'react';
import { BingoCard, WinPattern } from '@/types';
import { detectWin } from '@/utils/winDetection';

export function useWinDetection(card: BingoCard) {
  const [winPattern, setWinPattern] = useState<WinPattern | null>(null);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    const pattern = detectWin(card);
    setWinPattern(pattern);
    setIsWon(pattern !== null);
  }, [card]);

  return {
    isWon,
    winPattern,
  };
}
