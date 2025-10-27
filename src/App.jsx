import { useState } from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import Watchlist from './components/Watchlist.jsx';
import ChartPanel from './components/ChartPanel.jsx';
import OrderPanel from './components/OrderPanel.jsx';

function App() {
  const [symbol, setSymbol] = useState('RELIANCE');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-2 h-[28rem] lg:h-[calc(100vh-8rem)]">
          <Watchlist activeSymbol={symbol} onSelect={setSymbol} />
        </section>

        <section className="lg:col-span-7 h-[38rem] lg:h-[calc(100vh-8rem)]">
          <ChartPanel symbol={symbol} />
        </section>

        <aside className="lg:col-span-3 h-[28rem] lg:h-[calc(100vh-8rem)]">
          <OrderPanel symbol={symbol} />
        </aside>
      </main>
    </div>
  );
}

export default App;
