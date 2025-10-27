import { useEffect, useRef, useState } from 'react';

function genInitialData(points = 80, base = 120) {
  const data = [];
  let last = base;
  for (let i = 0; i < points; i++) {
    const open = last;
    const close = last + (Math.random() - 0.5) * 2.5;
    const high = Math.max(open, close) + Math.random() * 1.5;
    const low = Math.min(open, close) - Math.random() * 1.5;
    const vol = 500 + Math.random() * 800;
    data.push({ open, high, low, close, volume: vol });
    last = close;
  }
  return data;
}

function drawChart(canvas, series) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = (h / 4) * i + 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  if (series.length === 0) return;

  const max = Math.max(...series.map((d) => d.high));
  const min = Math.min(...series.map((d) => d.low));
  const pad = (max - min) * 0.1;
  const top = max + pad;
  const bottom = min - pad;

  const candleWidth = Math.max(4, Math.floor(w / (series.length + 4)));
  const gap = 2;

  series.forEach((d, i) => {
    const x = i * (candleWidth + gap) + 10;
    const scaleY = (val) => ((top - val) / (top - bottom)) * (h - 20) + 10;

    const openY = scaleY(d.open);
    const closeY = scaleY(d.close);
    const highY = scaleY(d.high);
    const lowY = scaleY(d.low);

    const up = d.close >= d.open;
    ctx.strokeStyle = up ? '#059669' : '#dc2626';
    ctx.fillStyle = up ? '#10b981' : '#f87171';

    // Wick
    ctx.beginPath();
    ctx.moveTo(x + candleWidth / 2, highY);
    ctx.lineTo(x + candleWidth / 2, lowY);
    ctx.stroke();

    // Body
    const y = Math.min(openY, closeY);
    const height = Math.max(1, Math.abs(openY - closeY));
    ctx.fillRect(x, y, candleWidth, height);
  });
}

function OrderBook({ levels = [] }) {
  const mid = Math.floor(levels.length / 2);
  const bids = levels.slice(0, mid).reverse();
  const asks = levels.slice(mid);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <div className="text-xs font-medium text-slate-500 mb-2">Bids</div>
        <div className="space-y-1">
          {bids.map((l, i) => (
            <div key={`b${i}`} className="flex items-center text-sm">
              <div className="w-20 text-emerald-600 font-medium">₹{l.price.toFixed(2)}</div>
              <div className="flex-1 bg-emerald-100 h-4 rounded relative overflow-hidden">
                <div style={{ width: `${Math.min(100, (l.qty / 1000) * 100)}%` }} className="h-full bg-emerald-400/60" />
              </div>
              <div className="w-14 text-right text-slate-600">{l.qty}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-medium text-slate-500 mb-2">Asks</div>
        <div className="space-y-1">
          {asks.map((l, i) => (
            <div key={`a${i}`} className="flex items-center text-sm">
              <div className="w-20 text-rose-600 font-medium">₹{l.price.toFixed(2)}</div>
              <div className="flex-1 bg-rose-100 h-4 rounded relative overflow-hidden">
                <div style={{ width: `${Math.min(100, (l.qty / 1000) * 100)}%` }} className="h-full bg-rose-400/60" />
              </div>
              <div className="w-14 text-right text-slate-600">{l.qty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChartPanel({ symbol }) {
  const canvasRef = useRef(null);
  const [series, setSeries] = useState(() => genInitialData());
  const [orderLevels, setOrderLevels] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * window.devicePixelRatio);
      canvas.height = Math.floor(rect.height * window.devicePixelRatio);
      const ctx = canvas.getContext('2d');
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawChart(canvas, series);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [series]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((s) => {
        const last = s[s.length - 1];
        const nextClose = last.close + (Math.random() - 0.5) * 1.8;
        const next = {
          open: last.close,
          close: nextClose,
          high: Math.max(last.close, nextClose) + Math.random() * 1.2,
          low: Math.min(last.close, nextClose) - Math.random() * 1.2,
          volume: 400 + Math.random() * 900,
        };
        const updated = [...s.slice(-79), next];
        const canvas = canvasRef.current;
        if (canvas) drawChart(canvas, updated);
        return updated;
      });

      setOrderLevels(() => {
        const mid = series[series.length - 1]?.close || 120;
        const levels = [];
        for (let i = 10; i >= 1; i--) {
          levels.push({ price: mid - i * 0.2, qty: Math.floor(200 + Math.random() * 800) });
        }
        for (let i = 1; i <= 10; i++) {
          levels.push({ price: mid + i * 0.2, qty: Math.floor(200 + Math.random() * 800) });
        }
        return levels;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [series]);

  useEffect(() => {
    // Reset series when symbol changes
    setSeries(genInitialData(80, 100 + Math.random() * 40));
  }, [symbol]);

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
      <div className="p-3 border-b border-slate-200 flex items-center justify-between">
        <div className="font-semibold tracking-tight">{symbol} • Candlestick</div>
        <div className="text-xs text-slate-500">1m • Live</div>
      </div>
      <div className="flex-1">
        <div className="h-72 sm:h-80 md:h-[28rem] lg:h-[32rem]">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 text-sm font-medium text-slate-700">Order Book</div>
        <OrderBook levels={orderLevels} />
      </div>
    </div>
  );
}
