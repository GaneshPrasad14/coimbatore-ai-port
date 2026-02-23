import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ShimmerButton from '@/components/ui/shimmer-button';
import { SparklesCore } from '@/components/ui/sparkles';
import { AuroraBackground } from '@/components/ui/aurora-background';

const Hero = () => {
  return (
    <AuroraBackground className="relative w-full h-[100dvh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 pointer-events-none">
        {/* Background small sparkles for depth */}
        <SparklesCore
          id="tsparticlesbackground"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={400}
          className="w-full h-full absolute inset-0"
          particleColor="#FFFFFF"
        />
        {/* Main gold sparkles */}
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={1.2}
          maxSize={4.2}
          particleDensity={300}
          className="w-full h-full absolute inset-0"
          particleColor="#FFD700"
        />
      </div>

      {/* Pulsing Yellow Spotlight */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-10 w-full h-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] bg-black/50 backdrop-blur-xl uppercase tracking-[0.3em] text-white/70 shadow-2xl">
            Coimbatore.ai
          </span>
        </motion.div>

        <div className="flex flex-col items-center justify-center mb-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-white text-4xl md:text-7xl font-black text-center tracking-tighter mix-blend-difference"
          >
            IMPOSSIBLE
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-black text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600"
          >
            STANDARD.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/60 text-sm md:text-lg max-w-xl mt-2 text-center tracking-wide leading-relaxed"
        >
          We don't just build software. We warp reality to create distinct digital dominance for your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-12"
        >
          <a href="https://wa.me/918608177777" target="_blank" rel="noopener noreferrer">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-xs font-bold leading-none tracking-[0.2em] text-white dark:from-white dark:to-slate-900/10 uppercase">
                Start Project
              </span>
            </ShimmerButton>
          </a>
        </motion.div>

        {/* Scroller */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
          <ArrowDown className="text-white/30 animate-bounce" size={14} />
        </motion.div>
      </div>
    </AuroraBackground>
  );
};

export default Hero;
