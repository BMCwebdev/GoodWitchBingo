import { Howl } from 'howler';
import themeMusic from '@/assets/audio/good-witch-theme.mp3';
import windChimeSfx from '@/assets/audio/wind-chime-sfx.mp3';

// Sound effect for marking squares
let windChimeSound: Howl | null = null;

// Theme music for loading and win celebration
let themeMusicSound: Howl | null = null;

// User preference for sound effects (stored in localStorage)
const SOUND_ENABLED_KEY = 'goodWitchBingo_soundEnabled';

/**
 * Check if sound effects are enabled (defaults to ON)
 */
export function isSoundEnabled(): boolean {
  const stored = localStorage.getItem(SOUND_ENABLED_KEY);
  // Default to TRUE (sound ON) if not explicitly set
  return stored === null ? true : stored === 'true';
}

/**
 * Enable or disable sound effects
 */
export function setSoundEnabled(enabled: boolean): void {
  localStorage.setItem(SOUND_ENABLED_KEY, enabled.toString());

  // If disabling, stop all sounds
  if (!enabled) {
    stopAllSounds();
  }
}

/**
 * Initialize wind chime sound effect (lazy load)
 */
function initWindChime(): Howl {
  if (!windChimeSound) {
    windChimeSound = new Howl({
      src: [windChimeSfx],
      volume: 0.3,
      preload: true,
    });
  }
  return windChimeSound;
}

/**
 * Initialize theme music (lazy load)
 */
function initThemeMusic(): Howl {
  if (!themeMusicSound) {
    themeMusicSound = new Howl({
      src: [themeMusic],
      volume: 0.4,
      preload: true,
    });
  }
  return themeMusicSound;
}

/**
 * Play wind chime sound when marking a square
 */
export function playWindChime(): void {
  if (!isSoundEnabled()) return;

  const sound = initWindChime();
  sound.play();
}

/**
 * Play theme music on loading screen (plays for ~5 seconds then fades out)
 */
export function playLoadingMusic(): void {
  const music = initThemeMusic();

  // Play from start
  music.seek(0);
  music.play();

  // Fade out after 5 seconds
  setTimeout(() => {
    music.fade(0.4, 0, 1000);
  }, 5000);
}

/**
 * Play theme music on win celebration (plays for ~8 seconds then fades out)
 */
export function playWinMusic(): void {
  const music = initThemeMusic();

  // Stop any existing playback
  music.stop();

  // Play from start with full volume
  music.volume(0.5);
  music.seek(0);
  music.play();

  // Fade out after 8 seconds
  setTimeout(() => {
    music.fade(0.5, 0, 1500);
  }, 8000);
}

/**
 * Stop all currently playing sounds
 */
export function stopAllSounds(): void {
  windChimeSound?.stop();
  themeMusicSound?.stop();
}
