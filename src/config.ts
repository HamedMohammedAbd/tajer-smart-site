// Everything you may need to change before going live is here.

/** GitHub repository whose Releases hold the APK files (see README.md). */
export const releasesRepo = 'HamedMohammedAbd/tajer-smart-site';

/**
 * Local preview serves the files from public/downloads. The live site links
 * to the latest GitHub Release, so a new release needs no change here as long
 * as the files keep the same names.
 */
const apkUrl = (file: string) =>
  import.meta.env.DEV
    ? asset(`downloads/${file}`)
    : `https://github.com/${releasesRepo}/releases/latest/download/${file}`;

/** A file from public/, wherever the site is served from (/ or /<repo>/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const site = {
  nameAr: 'تاجر سمارت',
  nameEn: 'Tajer Smart',
  version: '1.0.0',
  minAndroid: '7.0',
  downloads: {
    android64: { url: apkUrl('tajer-smart-arm64.apk'), size: '41 MB' },
    android32: { url: apkUrl('tajer-smart-armv7.apk'), size: '37 MB' },
    // Shown only when set, e.g. https://play.google.com/store/apps/details?id=com.hamed.saaspos
    playStore: '',
  },
  // Shown in the footer only when set.
  contactEmail: '',
};
