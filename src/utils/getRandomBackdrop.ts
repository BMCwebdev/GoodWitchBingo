// Import all backdrop images
import backdrop2 from '@/assets/backdrops/good-witch-2.jpg';
import backdrop3 from '@/assets/backdrops/good-witch-3.jpg';
import backdrop4 from '@/assets/backdrops/good-witch-4.jpg';
import backdrop5 from '@/assets/backdrops/good-witch-5.jpg';
import backdrop6 from '@/assets/backdrops/good-witch-6.jpg';
import backdrop7 from '@/assets/backdrops/good-witch-7.jpg';
import backdrop8 from '@/assets/backdrops/good-witch-8.jpg';
import backdrop9 from '@/assets/backdrops/good-witch-9.jpg';
import backdrop11 from '@/assets/backdrops/good-witch-11.jpg';

const backdrops = [
  backdrop2,
  backdrop3,
  backdrop4,
  backdrop5,
  backdrop6,
  backdrop7,
  backdrop8,
  backdrop9,
  backdrop11,
];

/**
 * Returns a random backdrop image from the available Good Witch backdrops.
 * This is called once on page load to set a consistent backdrop for the session.
 */
export function getRandomBackdrop(): string {
  const randomIndex = Math.floor(Math.random() * backdrops.length);
  return backdrops[randomIndex];
}
