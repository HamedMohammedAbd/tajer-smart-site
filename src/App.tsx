import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronDown,
  CloudUpload,
  DatabaseBackup,
  Download,
  HardDrive,
  Layers,
  Lock,
  Menu,
  QrCode,
  ShieldCheck,
  Smartphone,
  UserCog,
  WifiOff,
  X,
} from 'lucide-react';
import { site } from './config';
import { faqs, features, highlights, steps } from './data';
import { PhoneMock } from './components/PhoneMock';
import { DownloadButtons } from './components/DownloadButtons';

const nav = [
  { href: '#features', label: 'المميزات' },
  { href: '#how', label: 'بدون إنترنت' },
  { href: '#security', label: 'الأمان' },
  { href: '#faq', label: 'الأسئلة الشائعة' },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={site.nameAr}>
      <img src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
      <span className="flex flex-col leading-tight">
        <span className={`text-lg font-bold ${light ? 'text-white' : 'text-ink'}`}>{site.nameAr}</span>
        <span className={`text-[11px] tracking-wide ${light ? 'text-white/60' : 'text-muted'}`} dir="ltr">
          {site.nameEn}
        </span>
      </span>
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        solid ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo light={!solid} />
        <nav className="hidden items-center gap-1 md:flex" aria-label="أقسام الصفحة">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                solid ? 'text-ink hover:bg-slate-100' : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#download"
            className={`hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition sm:inline-flex ${
              solid ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-white text-navy-900 hover:bg-brand-50'
            }`}
          >
            <Download className="h-4 w-4" />
            تحميل التطبيق
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-xl md:hidden ${solid ? 'text-ink' : 'text-white'}`}
            aria-expanded={open}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden" aria-label="أقسام الصفحة">
          {[...nav, { href: '#download', label: 'تحميل التطبيق' }].map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-bold text-ink hover:bg-slate-100"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-800 to-brand-700 pt-28 text-white sm:pt-32">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-sky-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-mint/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-bold text-white/90">
            <span className="h-2 w-2 rounded-full bg-mint" />
            نظام نقاط بيع ومحاسبة للمحلات
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.35] sm:text-5xl lg:text-[3.4rem]">
            أدِر متجرك بذكاء،
            <br />
            <span className="bg-gradient-to-l from-sky-glow to-mint bg-clip-text text-transparent">حتى بدون إنترنت</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-9 text-white/80">
            {site.nameAr} يجمع الكاشير والمخزون وديون العملاء والموردين والأرباح في تطبيق واحد على جوالك. كل
            عملية تُحفظ فوراً على جهازك، وتُرفع تلقائياً عند عودة الاتصال.
          </p>
          <div className="mt-8">
            <DownloadButtons onDark compact />
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            {[`أندرويد ${site.minAndroid} فأعلى`, 'بيانات مشفّرة على الجهاز', 'مزامنة تلقائية'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-mint" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-float">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const items = [
    { icon: Layers, title: 'نظام متكامل', text: 'بيع، مخزون، ديون وأرباح' },
    { icon: WifiOff, title: 'بدون إنترنت', text: 'البيع لا يتوقف أبداً' },
    { icon: CloudUpload, title: 'مزامنة تلقائية', text: 'كل عملية مرة واحدة' },
    { icon: Smartphone, title: 'على جوالك', text: `أندرويد ${site.minAndroid} فأعلى` },
  ];
  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-xl shadow-navy-900/5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3 bg-white p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-ink">{title}</p>
              <p className="text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold leading-[1.4] text-ink sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-muted">{text}</p>}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24">
      <SectionTitle
        eyebrow="المميزات"
        title="كل ما يحتاجه محلك في تطبيق واحد"
        text="من البيع على الكاشير إلى معرفة صافي الربح، بنفس الأقسام التي تراها في التطبيق."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, text, tint }) => (
          <div
            key={title}
            className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5"
          >
            <span className={`grid h-12 w-12 place-items-center rounded-full ${tint}`}>
              <Icon className="h-6 w-6" strokeWidth={2.1} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
            <p className="mt-1.5 leading-7 text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4">
        {highlights.map((h, i) => (
          <div key={h.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-6 rounded-[2.5rem] bg-brand-100 blur-2xl" />
                <img
                  src={h.image}
                  alt={h.title}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="relative w-full rounded-[2.5rem] border border-slate-100 bg-white"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-600">{h.eyebrow}</p>
              <h2 className="mt-2 text-3xl font-bold leading-[1.4] text-ink">{h.title}</h2>
              <p className="mt-4 text-lg leading-8 text-muted">{h.text}</p>
              <ul className="mt-6 grid gap-3">
                {h.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-bold text-ink">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden bg-navy-900 py-24 text-white">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-sky-glow">يعمل بدون إنترنت</p>
          <h2 className="mt-2 text-3xl font-bold leading-[1.4] sm:text-4xl">انقطع الإنترنت؟ محلك لا يتوقف</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            {site.nameAr} مصمم ليعمل أولاً على جهازك. الإنترنت للمزامنة فقط، وليس شرطاً للبيع.
          </p>
        </div>
        <ol className="mt-14 grid gap-5 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-glow to-brand-600 text-lg font-bold">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-7 text-white/70">{s.text}</p>
              {i < steps.length - 1 && (
                <ArrowLeft className="absolute -left-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-white/30 lg:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    { icon: Lock, title: 'بيانات مشفّرة على الجهاز', text: 'قاعدة البيانات على جوالك مشفّرة بالكامل.' },
    { icon: ShieldCheck, title: 'كل متجر معزول', text: 'بيانات متجرك لا يراها أحد غيرك وغير من تسمح لهم.' },
    { icon: UserCog, title: 'صلاحيات للموظفين', text: 'حدّد لكل موظف ما يستطيع رؤيته وفعله.' },
    { icon: DatabaseBackup, title: 'نسخ احتياطي', text: 'نسخة أسبوعية على حسابك في Google Drive.' },
    { icon: QrCode, title: 'نقل مشفّر بين الأجهزة', text: 'شارك البيانات بين أجهزة المحل بمسح كود QR.' },
    { icon: Building2, title: 'أكثر من فرع', text: 'انتقل بين فروعك من نفس التطبيق.' },
  ];
  return (
    <section id="security" className="mx-auto max-w-7xl px-4 py-24">
      <SectionTitle
        eyebrow="الأمان والفريق"
        title="بياناتك محمية، وفريقك منظّم"
        text="لأن حسابات محلك ليست للعرض، وكل موظف يحتاج ما يخص عمله فقط."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-800 text-sky-glow">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-bold text-ink">{title}</h3>
              <p className="mt-1 leading-7 text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle eyebrow="الأسئلة الشائعة" title="عندك سؤال؟" />
        <div className="mt-12 grid gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-canvas px-5 open:bg-white open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-ink">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180" />
              </summary>
              <p className="pb-5 leading-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  const install = [
    'حمّل ملف التطبيق من الزر أعلاه.',
    'افتح الملف، واسمح بالتثبيت من هذا المصدر إذا طلب الجهاز ذلك.',
    'سجّل الدخول، أو أنشئ متجراً جديداً من التطبيق نفسه.',
  ];
  return (
    <section id="download" className="mx-auto max-w-7xl px-4 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-950 via-navy-800 to-brand-700 px-5 py-14 text-white sm:px-10">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <img src="/logo.png" alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-2xl shadow-lg shadow-black/30" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.4] sm:text-4xl">حمّل {site.nameAr} الآن</h2>
            <p className="mt-3 text-lg leading-8 text-white/75">
              ابدأ البيع من جوالك اليوم. التطبيق يعمل على أجهزة أندرويد {site.minAndroid} فأعلى.
            </p>
            <div className="mt-8">
              <DownloadButtons onDark showOther />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="flex items-center gap-2 font-bold">
              <HardDrive className="h-5 w-5 text-sky-glow" />
              طريقة التثبيت
            </p>
            <ol className="mt-5 grid gap-4">
              {install.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-bold">{i + 1}</span>
                  <span className="leading-7 text-white/85">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">نظام نقاط بيع ومحاسبة للمحلات، يعمل حتى بدون إنترنت.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted sm:items-end">
          <nav className="flex flex-wrap gap-4" aria-label="روابط">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="font-bold hover:text-brand-600">
                {n.label}
              </a>
            ))}
          </nav>
          {site.contactEmail && (
            <a href={`mailto:${site.contactEmail}`} className="hover:text-brand-600" dir="ltr">
              {site.contactEmail}
            </a>
          )}
          <p>
            © {year} {site.nameAr}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#features"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main>
        <Hero />
        <ValueStrip />
        <Features />
        <Highlights />
        <HowItWorks />
        <Security />
        <Faq />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
