import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-white/10 pt-20 pb-10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-4">
              Get in touch
            </span>
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.9] mix-blend-difference">
              LET'S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">THE FUTURE.</span>
            </h2>
          </div>

          <a
            href="https://wa.me/918608177777"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white text-black overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-widest">Start</span>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <div className="absolute inset-0 bg-emerald-400 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-10">
          <div className="flex flex-col gap-2 mb-6 md:mb-0">
            <span className="text-2xl font-bold tracking-tight">coimbatore.ai</span>
            <p className="text-sm text-gray-500 max-w-xs">
              Forging the impossible standard in digital dominance.
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              © {currentYear} INC. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">
              COIMBATORE • INDIA
            </p>
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
    </footer>
  );
};

export default Footer;
