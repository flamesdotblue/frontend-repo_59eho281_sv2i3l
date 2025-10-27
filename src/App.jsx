import Navbar from './components/Navbar.jsx';
import Hero3D from './components/Hero3D.jsx';
import LeadCaptureForm from './components/LeadCaptureForm.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <Navbar />
      <main>
        <Hero3D />
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold tracking-tight">Why Nuviq Wealth</h2>
              <p className="mt-3 text-gray-600">Clarity meets performance. Visualize your portfolio in 3D and act with confidence.</p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="font-semibold">Glassmorphic design</h3>
                <p className="mt-2 text-sm text-gray-600">Modern, minimalist aesthetics tuned for fintech experiences.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="font-semibold">Data you can feel</h3>
                <p className="mt-2 text-sm text-gray-600">3D elements that make market movements tangible.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="font-semibold">Built for scale</h3>
                <p className="mt-2 text-sm text-gray-600">Performance-first setup ready for serious growth.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
                <h3 className="font-semibold">Human + AI</h3>
                <p className="mt-2 text-sm text-gray-600">Expert guidance enhanced by intelligent tooling.</p>
              </div>
            </div>
          </div>
        </section>
        <LeadCaptureForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
