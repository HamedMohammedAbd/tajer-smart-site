import { useEffect, useState } from 'react';

/** Which APK to offer: 64-bit ARM, or 32-bit ARM. */
export type ApkAbi = 'arm64' | 'armv7';

/**
 * How we decided. "sure" means the browser told us the CPU type;
 * "likely" means it was inferred from the amount of memory; "default"
 * means the browser gave no usable signal.
 */
export type ApkConfidence = 'sure' | 'likely' | 'default';

export type ApkChoice = { abi: ApkAbi; confidence: ApkConfidence; isAndroid: boolean };

type UaData = {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; bitness?: string; model?: string }>;
};

/** Value Chrome 110+ reports for every Android phone, so it says nothing. */
const FROZEN_ANDROID_PLATFORM = 'linux armv81';

/** CPU type from a text like "Linux aarch64" or "Linux armv7l". */
function abiFromText(text: string): ApkAbi | null {
  const t = text.toLowerCase();
  if (!t || t === FROZEN_ANDROID_PLATFORM) return null;
  if (/aarch64|arm64/.test(t)) return 'arm64';
  // armv8l = a 64-bit CPU running 32-bit software: the browser itself is
  // 32-bit, so the phone can certainly run the 32-bit APK.
  if (/armv7|armv8l|armeabi|\barm\b/.test(t)) return 'armv7';
  return null;
}

/** Decision from what is available right away, without waiting. */
export function detectApkSync(nav: Navigator = navigator): ApkChoice {
  const ua = nav.userAgent || '';
  const uaData = (nav as Navigator & { userAgentData?: UaData }).userAgentData;
  const isAndroid = /android/i.test(ua) || /android/i.test(uaData?.platform ?? '');

  const fromPlatform = abiFromText(nav.platform || '');
  if (fromPlatform) return { abi: fromPlatform, confidence: 'sure', isAndroid };
  const fromUa = abiFromText((ua.match(/\(([^)]*)\)/)?.[1] ?? '').replace(/;/g, ' '));
  if (fromUa) return { abi: fromUa, confidence: 'sure', isAndroid };

  // Phones whose Android is 32-bit all have little memory (3 GB or less, which
  // the browser reports as 2 or lower), and the 32-bit APK also runs on the
  // 64-bit phones of that class. Phones that run 64-bit apps only are
  // high-end, with 4 GB or more.
  const memory = (nav as Navigator & { deviceMemory?: number }).deviceMemory;
  if (isAndroid && typeof memory === 'number' && memory > 0) {
    return { abi: memory >= 4 ? 'arm64' : 'armv7', confidence: 'likely', isAndroid };
  }
  return { abi: 'arm64', confidence: 'default', isAndroid };
}

/**
 * Asks the browser for the CPU type, when it is willing to say. Chrome on
 * Android (checked on Chrome 149) leaves architecture and bitness empty, but
 * the model name can carry it, e.g. "Android SDK built for arm64".
 */
async function detectApkFromHints(nav: Navigator): Promise<ApkAbi | null> {
  const uaData = (nav as Navigator & { userAgentData?: UaData }).userAgentData;
  if (!uaData?.getHighEntropyValues) return null;
  try {
    const { architecture = '', bitness = '', model = '' } = await uaData.getHighEntropyValues([
      'architecture',
      'bitness',
      'model',
    ]);
    if (architecture.toLowerCase() === 'arm') {
      if (bitness === '64') return 'arm64';
      if (bitness === '32') return 'armv7';
    }
    return abiFromText(model);
  } catch {
    // Not allowed or not supported: fall back to the other signals.
  }
  return null;
}

/** The APK that suits the visitor's phone, refined once the browser answers. */
export function useApkChoice(): ApkChoice {
  const [choice, setChoice] = useState<ApkChoice>(() =>
    typeof navigator === 'undefined' ? { abi: 'arm64', confidence: 'default', isAndroid: false } : detectApkSync(),
  );
  useEffect(() => {
    let active = true;
    detectApkFromHints(navigator).then((abi) => {
      if (active && abi) setChoice((c) => ({ ...c, abi, confidence: 'sure' }));
    });
    return () => {
      active = false;
    };
  }, []);
  return choice;
}
