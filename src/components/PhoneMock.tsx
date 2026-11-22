import { ChartLine, Clock, Package, Receipt, ScanBarcode, Truck, UserCog, Users, Wallet } from 'lucide-react';
import { site } from '../config';

// The app's home screen as it really looks: header, sync badge, module grid.
const tiles = [
  { icon: ScanBarcode, label: 'الكاشير', tint: 'bg-brand-50 text-brand-600' },
  { icon: Receipt, label: 'الفواتير', tint: 'bg-indigo-50 text-indigo-600' },
  { icon: Package, label: 'المخزون', tint: 'bg-amber-50 text-amber-600' },
  { icon: Users, label: 'العملاء', tint: 'bg-emerald-50 text-emerald-600' },
  { icon: Truck, label: 'الموردين', tint: 'bg-cyan-50 text-cyan-600' },
  { icon: Wallet, label: 'المصاريف', tint: 'bg-rose-50 text-rose-600' },
  { icon: ChartLine, label: 'التقارير', tint: 'bg-violet-50 text-violet-600' },
  { icon: Clock, label: 'الورديات', tint: 'bg-orange-50 text-orange-600' },
  { icon: UserCog, label: 'الموظفين', tint: 'bg-slate-100 text-slate-700' },
];

export function PhoneMock() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-sky-glow/25 blur-3xl" />
      <div className="relative rounded-[2.6rem] border-[10px] border-navy-950 bg-navy-950 shadow-2xl shadow-black/40">
        <div className="absolute left-1/2 top-1.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-950" />
        <div className="overflow-hidden rounded-[2rem] bg-canvas">
          <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-bold text-ink/70">
            <span>9:41</span>
            <span className="tracking-widest">●●●</span>
          </div>
          <div className="flex items-start justify-between gap-2 border-b border-slate-200/70 bg-white px-4 pb-3 pt-2">
            <div>
              <p className="text-[15px] font-bold leading-6 text-ink">{site.nameAr}</p>
              <p className="text-[10px] text-muted">مالك المحل • متجرك</p>
            </div>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              متصل ومزامن
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 p-3.5">
            {tiles.map(({ icon: Icon, label, tint }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-1 py-3 shadow-sm"
              >
                <span className={`grid h-9 w-9 place-items-center rounded-full ${tint}`}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <span className="text-[10.5px] font-bold text-ink">{label}</span>
              </div>
            ))}
          </div>
          <div className="mx-3.5 mb-4 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-600 p-3 text-white">
            <p className="text-[11px] font-bold">المزامنة</p>
            <p className="mt-0.5 text-[10px] text-white/80">كل العمليات محفوظة على الجهاز ومرفوعة</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-full rounded-full bg-mint" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
