import { useEffect, useState } from 'react';

const INITIAL_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'TCS', name: 'Tata Consultancy' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'ITC', name: 'ITC Limited' },
];

function randomWalk(prev) {
  const change = (Math.random() - 0.5) * 0.8;
  return Math.max(10, prev + change);
}

export default function Watchlist({ activeSymbol, onSelect }) {
  const [rows, setRows] = useState(
    INITIAL_STOCKS.map((s) => ({ ...s, price: 100 + Math.random() * 100, change: 0 }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRows((r) =>
        r.map((row) => {
          const newPrice = randomWalk(row.price);
          return { ...row, price: newPrice, change: newPrice - row.price };
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
      <div className="p-3 border-b border-slate-200 font-semibold tracking-tight">Watchlist</div>
      <div className="divide-y divide-slate-100 overflow-auto">
        {rows.map((row) => {
          const up = row.change >= 0;
          const isActive = row.symbol === activeSymbol;
          return (
            <button
              key={row.symbol}
              onClick={() => onSelect?.(row.symbol)}
              className={`w-full text-left px-3 py-2 hover:bg-slate-50 focus:outline-none ${
                isActive ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{row.symbol}</div>
                  <div className="text-xs text-slate-500">{row.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₹{row.price.toFixed(2)}</div>
                  <div className={`text-xs ${up ? 'text-emerald-600' : 'text-rose-600'}`}>{
                    up ? '+' : ''
                  }{row.change.toFixed(2)}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
