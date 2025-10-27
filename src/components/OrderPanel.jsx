import { useMemo, useState } from 'react';

export default function OrderPanel({ symbol }) {
  const [side, setSide] = useState('BUY');
  const [type, setType] = useState('MARKET');
  const [qty, setQty] = useState(10);
  const [price, setPrice] = useState(120.0);

  const total = useMemo(() => (type === 'MARKET' ? qty * price : qty * price), [qty, price, type]);

  const placeOrder = (e) => {
    e.preventDefault();
    const payload = { side, type, qty: Number(qty), price: Number(price), symbol };
    alert(`${side} ${payload.qty} ${symbol} @ ${type === 'MARKET' ? 'MKT' : payload.price}`);
  };

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
      <div className="p-3 border-b border-slate-200 font-semibold tracking-tight">Order</div>
      <form onSubmit={placeOrder} className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <button type="button" onClick={() => setSide('BUY')} className={`px-3 py-2 rounded-lg border text-center ${side === 'BUY' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300 hover:bg-slate-50'}`}>Buy</button>
          <button type="button" onClick={() => setSide('SELL')} className={`px-3 py-2 rounded-lg border text-center ${side === 'SELL' ? 'bg-rose-500 text-white border-rose-500' : 'border-slate-300 hover:bg-slate-50'}`}>Sell</button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <button type="button" onClick={() => setType('MARKET')} className={`px-3 py-2 rounded-lg border text-center ${type === 'MARKET' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 hover:bg-slate-50'}`}>Market</button>
          <button type="button" onClick={() => setType('LIMIT')} className={`px-3 py-2 rounded-lg border text-center ${type === 'LIMIT' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 hover:bg-slate-50'}`}>Limit</button>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-600">Quantity</label>
          <input type="number" min={1} step={1} value={qty} onChange={(e) => setQty(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {type === 'LIMIT' && (
          <div className="space-y-1">
            <label className="text-xs text-slate-600">Limit Price</label>
            <input type="number" step={0.05} value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <div className="text-slate-500">Symbol</div>
          <div className="font-medium">{symbol}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-slate-500">Order Value</div>
          <div className="font-semibold">₹{total.toFixed(2)}</div>
        </div>
        <button type="submit" className={`w-full px-4 py-2.5 rounded-lg text-white font-medium ${side === 'BUY' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>{side === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}</button>
        <p className="text-[11px] text-slate-500">Simulated order. Hook into your trading engine or exchange API to execute for real.</p>
      </form>
    </div>
  );
}
