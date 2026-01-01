import { TextSizeCategory } from '@/types';

// Character length thresholds for text sizing
const SHORT_TEXT_THRESHOLD = 12;
const MEDIUM_TEXT_THRESHOLD = 20;

/**
 * Determines the text size category based on character count.
 * This is CRITICAL for ensuring text fits in squares without overflow.
 *
 * Categories:
 * - short: <= 12 characters (e.g., "Jump", "Wink")
 * - medium: 13-20 characters (e.g., "Touch your toes")
 * - long: > 20 characters (e.g., "Clap your hands three times")
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
 * Uses clamp() for fluid typography that scales with viewport.
 */
export function getFontSizeForCategory(category: TextSizeCategory): string {
  switch (category) {
    case 'short':
      // Large text for short phrases
      return 'clamp(0.75rem, 2vw, 1.1rem)';
    case 'medium':
      // Medium text for moderate phrases
      return 'clamp(0.65rem, 1.75vw, 0.9rem)';
    case 'long':
      // Small text for long phrases
      return 'clamp(0.5rem, 1.25vw, 0.7rem)';
  }
}
