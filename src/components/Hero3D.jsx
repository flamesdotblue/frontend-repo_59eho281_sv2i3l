import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <section className="relative pt-16" id="home">
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Wealth, modernized in 3D
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600">
                Nuviq Wealth blends human expertise with cutting-edge visualization to help you grow, protect, and understand your finances—beautifully.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a href="#lead" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-medium shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Get your plan
                </a>
                <a href="#about" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium shadow-sm hover:bg-gray-50">
                  Learn more
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
