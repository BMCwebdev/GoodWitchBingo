import { Howl, Howler } from 'howler';
import themeMusic from '@/assets/audio/good-witch-theme.mp3';
import windChimeSfx from '@/assets/audio/wind-chime-sfx.mp3';

// Sound effect for marking squares
let windChimeSound: Howl | null = null;

// Theme music for loading and win celebration
let themeMusicSound: Howl | null = null;

// User preference for sound effects (stored in localStorage)
const SOUND_ENABLED_KEY = 'goodWitchBingo_soundEnabled';

// Track if audio context has been unlocked (required for iOS Safari)
let audioContextUnlocked = false;

// Queue of audio functions to play after unlock
let audioQueue: (() => void)[] = [];

/**
 * Check if we're on iOS (Safari blocks audio until user interaction)
 */
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Check if audio context is unlocked
 */
export function isAudioUnlocked(): boolean {
  return audioContextUnlocked;
}

/**
 * Unlock the Web Audio context (must be called from a user interaction)
 * This is required for iOS Safari to allow audio playback
 */
export async function unlockAudioContext(): Promise<void> {
  if (audioContextUnlocked) return;

  try {
    // Resume the Howler audio context
    const ctx = Howler.ctx;
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Create and play a silent buffer to fully unlock
    if (ctx) {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    }

    audioContextUnlocked = true;

    // Play any queued audio
    while (audioQueue.length > 0) {
      const playFn = audioQueue.shift();
      playFn?.();
    }
  } catch (error) {
    console.warn('Failed to unlock audio context:', error);
  }
}

/**
 * Queue an audio function to play after context is unlocked
 */
function queueOrPlay(playFn: () => void): void {
  if (audioContextUnlocked || !isIOS()) {
    playFn();
  } else {
    audioQueue.push(playFn);
  }
}

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

  queueOrPlay(() => {
    const sound = initWindChime();
    sound.play();
  });
}

/**
 * Play theme music on loading screen (plays for ~7 seconds then fades out)
 */
export function playLoadingMusic(): void {
  queueOrPlay(() => {
    const music = initThemeMusic();

    // Play from start
    music.seek(0);
    music.play();

    // Fade out after 7 seconds
    setTimeout(() => {
      music.fade(0.4, 0, 1000);
    }, 7000);
  });
}

/**
 * Play theme music on win celebration (plays for ~9 seconds then fades out)
 */
export function playWinMusic(): void {
  queueOrPlay(() => {
    const music = initThemeMusic();

    // Stop any existing playback
    music.stop();

    // Play from start with full volume
    music.volume(0.5);
    music.seek(0);
    music.play();

    // Fade out after 9 seconds
    setTimeout(() => {
      music.fade(0.5, 0, 1500);
    }, 9000);
  });
}

/**
 * Stop all currently playing sounds
 */
export function stopAllSounds(): void {
  windChimeSound?.stop();
  themeMusicSound?.stop();
}
