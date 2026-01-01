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
 * cqmin = 1% of the smaller container dimension.
 */
export function getDynamicFontSize(text: string): string {
  const length = text.trim().length;

  // Very conservative values to ensure text fits
  if (length <= 10) {
    return '4.5cqmin';
  } else if (length <= 20) {
    return '3.5cqmin';
  } else if (length <= 35) {
    return '2.8cqmin';
  } else {
    return '2.2cqmin';
  }
}
