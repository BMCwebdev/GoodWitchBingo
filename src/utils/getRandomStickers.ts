// Import all sticker images
import witch from '@/assets/stickers/witch.png';
import witch1 from '@/assets/stickers/witch(1).png';
import witchBroom from '@/assets/stickers/witch-broom.png';
import witchcraft from '@/assets/stickers/witchcraft.png';

const stickers = [witch, witch1, witchBroom, witchcraft];

export interface StickerDecoration {
  image: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Returns 1-2 random stickers with random corner positions for decorative elements.
 * This is called once on page load to set consistent decorations for the session.
 */
export function getRandomStickers(): StickerDecoration[] {
  const positions: StickerDecoration['position'][] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  // Randomly pick 1 or 2 stickers
  const stickerCount = Math.random() > 0.5 ? 2 : 1;
  const selectedStickers: StickerDecoration[] = [];

  // Shuffle positions
  const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);

  for (let i = 0; i < stickerCount; i++) {
    const randomStickerIndex = Math.floor(Math.random() * stickers.length);
    selectedStickers.push({
      image: stickers[randomStickerIndex],
      position: shuffledPositions[i],
    });
  }

  return selectedStickers;
}
