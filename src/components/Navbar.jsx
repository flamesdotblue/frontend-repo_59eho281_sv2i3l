import { useEffect, useState } from 'react';
import { Rocket, Shield, TrendingUp } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur-md bg-white/60 shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Rocket size={18} />
          </div>
          <span className="font-semibold tracking-tight text-gray-900">Nuviq Wealth</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#solutions" className="hover:text-gray-900">Solutions</a>
          <a href="#lead" className="hover:text-gray-900">Get Started</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
            <Shield size={16} className="text-emerald-600" />
            <span>Secure</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
            <TrendingUp size={16} className="text-indigo-600" />
            <span>Data-driven</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
