import { useState } from 'react';
import { Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeadCaptureForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    const nameOk = form.name.trim().length >= 2;
    return emailOk && nameOk;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ loading: false, success: false, error: 'Please enter a valid name and email.' });
      return;
    }
    try {
      setStatus({ loading: true, success: false, error: '' });
      // In a full app, this would POST to your backend. Here we just simulate.
      await new Promise((r) => setTimeout(r, 900));
      setStatus({ loading: false, success: true, error: '' });
      setForm({ name: '', email: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="lead" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Start your wealth journey
            </h2>
            <p className="mt-3 text-gray-600">
              Share your details and we’ll craft a personalized overview of how Nuviq Wealth can accelerate your goals.
            </p>
          </div>
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </span>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    minLength={2}
                    placeholder="Alex Morgan"
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {status.error && (
                <p className="text-sm text-red-600">{status.error}</p>
              )}
              {status.success && (
                <p className="text-sm text-emerald-600">Thanks! We\'ll be in touch shortly.</p>
              )}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
              >
                {status.loading ? 'Submitting…' : 'Request a consult'}
              </button>
              <span className="text-xs text-gray-500">No spam. Unsubscribe anytime.</span>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
