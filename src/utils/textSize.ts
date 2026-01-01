import { TextSizeCategory } from '@/types';

// Character length thresholds for text sizing
const SHORT_TEXT_THRESHOLD = 15;
const MEDIUM_TEXT_THRESHOLD = 25;

/**
 * Determines the text size category based on character count.
 * This is CRITICAL for ensuring text fits in squares without overflow.
 */
export function calculateTextSize(text: string): TextSizeCategory {
  const length = text.trim().length;

  if (length <= SHORT_TEXT_THRESHOLD) {
    return 'short';
  } else if (length <= MEDIUM_TEXT_THRESHOLD) {
    return 'medium';
  } else {
    return 'long';
  }
}

/**
 * Gets the CSS font size value for a given text size category.
 * Uses container query units (cqmin) for text that scales with the square size.
 * cqmin = 1% of the smaller dimension of the container.
 */
export function getFontSizeForCategory(category: TextSizeCategory): string {
  switch (category) {
    case 'short':
      // Large text for short phrases (1-15 chars)
      return '18cqmin';
    case 'medium':
      // Medium text for moderate phrases (16-25 chars)
      return '14cqmin';
    case 'long':
      // Smaller text for long phrases (26+ chars)
      return '11cqmin';
  }
}

/**
 * Calculate dynamic font size based on text length.
 * Returns a cqmin value that scales inversely with text length.
 */
export function getDynamicFontSize(text: string): string {
  const length = text.trim().length;

  // Base size decreases as text gets longer
  // Short text (1-10): ~20cqmin
  // Medium text (11-25): ~15cqmin
  // Long text (26-40): ~12cqmin
  // Very long (40+): ~10cqmin

  if (length <= 10) {
    return '20cqmin';
  } else if (length <= 18) {
    return '16cqmin';
  } else if (length <= 28) {
    return '13cqmin';
  } else if (length <= 40) {
    return '11cqmin';
  } else {
    return '9cqmin';
  }
}
