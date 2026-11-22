import { Download, Smartphone } from 'lucide-react';
import { site } from '../config';
import { useApkChoice, type ApkAbi } from '../lib/apk';

const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

const apks: Record<ApkAbi, { url: string; size: string; label: string }> = {
  arm64: { ...site.downloads.android64, label: '64-bit' },
  armv7: { ...site.downloads.android32, label: '32-bit' },
};

/** showOther: full explanation and the other APK. compact: just the other APK. */
type Props = { onDark?: boolean; showOther?: boolean; compact?: boolean };

export function DownloadButtons({ onDark = false, showOther = false, compact = false }: Props) {
  const { abi, confidence, isAndroid } = useApkChoice();
  const chosen = apks[abi];
  const other = apks[abi === 'arm64' ? 'armv7' : 'arm64'];
  const { playStore } = site.downloads;

  const primary = onDark
    ? 'bg-white text-navy-900 hover:bg-brand-50'
    : 'bg-brand-600 text-white hover:bg-brand-700';
  const secondary = onDark
    ? 'border-white/25 text-white hover:bg-white/10'
    : 'border-slate-300 text-ink hover:bg-white';
  const note = onDark ? 'text-white/70' : 'text-muted';
  const link = `font-bold underline underline-offset-4 ${onDark ? 'text-white' : 'text-brand-600'}`;

  let why: string;
  if (isAndroid && confidence === 'sure') {
    why = 'هذه النسخة المناسبة لنوع معالج جوالك.';
  } else if (isAndroid && confidence === 'likely') {
    why = 'اخترنا هذه النسخة لأنها الأنسب لجوالك على الأغلب.';
  } else {
    why = 'نسخة 64-bit تناسب معظم الجوالات الحديثة.';
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={chosen.url}
          download
          data-abi={abi}
          className={`inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-3.5 font-bold shadow-lg transition focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-glow/50 ${primary}`}
        >
          <Download className="h-5 w-5" />
          <span className="flex flex-col items-start leading-tight">
            <span>حمّل للأندرويد</span>
            <span className="text-xs font-normal opacity-75">
              الإصدار <bdi>{site.version}</bdi> • نسخة <bdi dir="ltr">{chosen.label}</bdi> •{' '}
              <bdi dir="ltr">{chosen.size}</bdi>
            </span>
          </span>
        </a>
        {playStore && (
          <a
            href={playStore}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 font-bold transition ${secondary}`}
          >
            <Smartphone className="h-5 w-5" />
            <span>Google Play</span>
          </a>
        )}
      </div>
      {showOther && (
        <div className={`flex flex-col gap-1 text-sm leading-7 ${note}`}>
          <p>{why}</p>
          <p>
            إذا ظهرت رسالة أن التطبيق غير متوافق أو لم يُثبَّت،{' '}
            <a href={other.url} download data-abi-other className={link}>
              حمّل نسخة <bdi dir="ltr">{other.label}</bdi>
            </a>{' '}
            (<bdi dir="ltr">{other.size}</bdi>).
          </p>
        </div>
      )}
      {compact && !showOther && (
        <p className={`text-sm ${note}`}>
          لم يُثبَّت التطبيق؟{' '}
          <a href={other.url} download data-abi-other className={link}>
            حمّل نسخة <bdi dir="ltr">{other.label}</bdi>
          </a>
        </p>
      )}
      {isIos && (
        <p className={`text-sm ${onDark ? 'text-white/80' : 'text-muted'}`}>
          التطبيق متاح حالياً لأجهزة أندرويد. افتح هذه الصفحة من جوال أندرويد للتحميل.
        </p>
      )}
    </div>
  );
}
