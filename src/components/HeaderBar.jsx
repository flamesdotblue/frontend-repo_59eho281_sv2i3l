import { TrendingUp, Bell, User, Settings } from 'lucide-react';

export default function HeaderBar({ totalValue = 125432.78, dailyPnL = 1523.44 }) {
  const pnlPositive = dailyPnL >= 0;
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-500 grid place-items-center text-white">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">Nuviq Trade</div>
            <div className="text-xs text-slate-500">Live Markets</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="text-sm">
            <div className="text-slate-500">Portfolio Value</div>
            <div className="font-semibold">₹{totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
          <div className={`text-sm ${pnlPositive ? 'text-emerald-600' : 'text-rose-600'}`}>{pnlPositive ? '+' : ''}{dailyPnL.toFixed(2)} today</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Notifications">
            <Bell className="h-5 w-5 text-slate-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Settings">
            <Settings className="h-5 w-5 text-slate-600" />
          </button>
          <div className="h-9 w-9 rounded-full bg-slate-800 text-white grid place-items-center">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
