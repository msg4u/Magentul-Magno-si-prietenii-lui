// Audio Engine for Magno: Kid-friendly Web Audio Synthesizer & Gemini 3.1 Flash TTS (Kore Voice)

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// -------------------------------------------------------------
// Sound FX (ZAC magnetic snap, boing, giggles, celebrations)
// -------------------------------------------------------------

// Comic-book style "ZAC!" magnetic snap
export function playZacSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Magnetic whoosh
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(220, now);
  osc1.frequency.exponentialRampToValueAtTime(950, now + 0.08);
  gain1.gain.setValueAtTime(0.35, now);
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.14);

  // 2. Metallic "CLACK/ZAC" impact
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(1600, now + 0.06);
  osc2.frequency.exponentialRampToValueAtTime(280, now + 0.28);
  gain2.gain.setValueAtTime(0.6, now + 0.06);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.06);
  osc2.stop(now + 0.38);

  // 3. Cute sparkling chime
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(2800, now + 0.08);
  gain3.gain.setValueAtTime(0.3, now + 0.08);
  gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  osc3.connect(gain3);
  gain3.connect(ctx.destination);
  osc3.start(now + 0.08);
  osc3.stop(now + 0.45);
}

// Cartoon boing jump sound
export function playBoingSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(250, now + 0.3);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);
}

// Giggling squeak when child clicks Magno
export function playGiggleSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 880, 659.25, 987.77, 783.99];

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const start = now + idx * 0.05;
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, start + 0.04);

    gain.gain.setValueAtTime(0.18, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.06);
  });
}

// Soft cute "plop/thud" when non-magnetic
export function playDullSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

// Magical fanfare for celebrations and medals
export function playCelebrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  const now = ctx.currentTime;

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + index * 0.09);

    gain.gain.setValueAtTime(0.25, now + index * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.09 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.09);
    osc.stop(now + index * 0.09 + 0.4);
  });
}

// Sweet bubbly pop sound
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

// -------------------------------------------------------------
// Dedicated Romanian Narrative Voice Engine & Zero-Delay Cache
// Guaranteed identical Romanian female narrative voice on all devices
// -------------------------------------------------------------

import { getPreloadedAudioPath } from '../data/audioManifest';

// In-memory decoded AudioBuffers for 0ms instantaneous playback
const audioBufferCache = new Map<string, AudioBuffer>();
const pendingPrefetches = new Map<string, Promise<AudioBuffer | null>>();

// Currently active playback sources
let activeAudioSource: AudioBufferSourceNode | null = null;
let activeHtmlAudio: HTMLAudioElement | null = null;
let currentPlayingText: string | null = null;
const listeners: Array<(text: string | null) => void> = [];

export function subscribeToVoiceState(listener: (text: string | null) => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyVoiceState(text: string | null) {
  currentPlayingText = text;
  listeners.forEach(fn => fn(text));
}

export function getCurrentPlayingText(): string | null {
  return currentPlayingText;
}

export function isTextPlaying(text: string): boolean {
  return currentPlayingText !== null && currentPlayingText.trim() === text.trim();
}

/**
 * Normalizes text to create consistent cache keys
 */
function normalizeTextKey(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Gets the direct audio URL for any text (pre-rendered MP3 or server TTS stream)
 */
export function getAudioUrlForText(text: string): string {
  const norm = normalizeTextKey(text);
  const preloadedPath = getPreloadedAudioPath(norm);
  if (preloadedPath) {
    return preloadedPath;
  }
  return `/api/tts?t=${encodeURIComponent(norm)}`;
}

/**
 * Proactively prefetch and decode audio in the background.
 * Ensures that when the user taps any listen icon, it starts with 0ms delay!
 */
export async function prefetchVoice(text: string): Promise<AudioBuffer | null> {
  const key = normalizeTextKey(text);
  if (!key) return null;

  if (audioBufferCache.has(key)) {
    return audioBufferCache.get(key)!;
  }

  if (pendingPrefetches.has(key)) {
    return pendingPrefetches.get(key)!;
  }

  const fetchPromise = (async () => {
    try {
      const url = getAudioUrlForText(key);
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      const ctx = getAudioContext();
      if (!ctx) return null;

      // Decode MP3 into AudioBuffer ready for instantaneous memory playback
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      audioBufferCache.set(key, audioBuffer);
      return audioBuffer;
    } catch (err) {
      console.warn('Voice prefetch skipped or network offline:', err);
      return null;
    } finally {
      pendingPrefetches.delete(key);
    }
  })();

  pendingPrefetches.set(key, fetchPromise);
  return fetchPromise;
}

/**
 * Preload all story scenes and critical sentences upon app start
 */
export function preloadStoryVoices(storyTexts: string[]) {
  if (typeof window === 'undefined') return;
  // Delay slightly so initial rendering completes smoothly
  setTimeout(() => {
    storyTexts.forEach(t => {
      if (t && t.trim()) {
        prefetchVoice(t);
      }
    });
  }, 200);
}

/**
 * Stop any current speech or audio playback immediately
 */
export function stopSpeaking() {
  if (activeAudioSource) {
    try {
      activeAudioSource.stop(0);
      activeAudioSource.disconnect();
    } catch {
      // Ignore if already stopped
    }
    activeAudioSource = null;
  }

  if (activeHtmlAudio) {
    try {
      activeHtmlAudio.pause();
      activeHtmlAudio.currentTime = 0;
    } catch {
      // Ignore
    }
    activeHtmlAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  notifyVoiceState(null);
}

/**
 * Speaks the text in Romanian with a warm narrative tone.
 * Guaranteed 100% identical Romanian voice across all browsers and devices.
 * Uses instantaneous memory-cached AudioBuffer (0ms delay) with HTML5 Audio fallback.
 */
export async function speakRomanian(text: string, onEnd?: () => void) {
  const normalized = normalizeTextKey(text);
  if (!normalized) {
    if (onEnd) onEnd();
    return;
  }

  // Stop any currently running speech
  stopSpeaking();

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      // Continue
    }
  }

  // Check if buffer is already in memory cache (0ms delay!)
  let buffer = audioBufferCache.get(normalized);

  if (!buffer) {
    // If pending prefetch is running, await it
    if (pendingPrefetches.has(normalized)) {
      buffer = (await pendingPrefetches.get(normalized)) || undefined;
    } else {
      // Fast fetch
      buffer = (await prefetchVoice(normalized)) || undefined;
    }
  }

  // If we have decoded AudioBuffer, play it via Web Audio API for 0ms latency
  if (buffer && ctx) {
    notifyVoiceState(normalized);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    activeAudioSource = source;

    source.onended = () => {
      if (activeAudioSource === source) {
        activeAudioSource = null;
        notifyVoiceState(null);
        if (onEnd) onEnd();
      }
    };

    source.start(0);
    return;
  }

  // Fallback to HTML5 Audio streaming the exact same Romanian audio file
  try {
    const audioUrl = getAudioUrlForText(normalized);
    const audio = new Audio(audioUrl);
    activeHtmlAudio = audio;
    notifyVoiceState(normalized);

    audio.onended = () => {
      if (activeHtmlAudio === audio) {
        activeHtmlAudio = null;
        notifyVoiceState(null);
        if (onEnd) onEnd();
      }
    };

    audio.onerror = () => {
      if (activeHtmlAudio === audio) {
        activeHtmlAudio = null;
        notifyVoiceState(null);
        if (onEnd) onEnd();
      }
    };

    await audio.play();
  } catch (err) {
    console.error('Playback failed:', err);
    notifyVoiceState(null);
    if (onEnd) onEnd();
  }
}
