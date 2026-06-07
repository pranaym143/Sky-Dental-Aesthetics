import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOADING_STEPS = [
  'Initializing Sky Dental Studio...',
  'Sterilizing custom dental equipment...',
  'Tuning 3D digital smile simulators...',
  'Warming state-of-the-art dental lasers...',
  'Aligning five-star comfort suites...',
  'Preparing your premium patient journey...'
];

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 600); // Wait shortly, then hide
          return 100;
        }
        // Speed up near the end or increment naturally
        const inc = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + inc, 100);
      });
    }, 120);

    // Rotate Loading Steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="page-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-slate-900 via-slate-950 to-black text-white selection:bg-cyan-500 overflow-hidden"
        >
          {/* Radiant background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

          {/* Interactive tooth outline / glowing logo animation */}
          <div className="relative mb-10">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-28 h-28 flex items-center justify-center"
            >
              {/* Outer decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-cyan-400/15"
              />
              
              {/* Central Premium Tooth SVG Logo (Vector outline designed meticulously) */}
              <svg
                id="loader-tooth-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-14 h-14 text-cyan-400 filter drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C8.5 2 5.5 3.5 5.5 6.5C5.5 8.5 7 11.5 7 14C7 16.5 5 18 5 20C5 21.5 6.5 22 8 22C9.5 22 10.5 20.5 12 20.5C13.5 20.5 14.5 22 16 22C17.5 22 19 21.5 19 20C19 18 17 16.5 17 14C17 11.5 18.5 8.5 18.5 6.5C18.5 3.5 15.5 2 12 2Z"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.5 7C9.5 7 10.5 8.5 12 8.5C13.5 8.5 14.5 7 14.5 7"
                />
              </svg>
            </motion.div>

            {/* Glowing dot */}
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-2 right-2 flex h-3.5 w-3.5"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </motion.span>
          </div>

          {/* Premium Branding Text */}
          <div className="text-center px-4 max-w-sm">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-sans text-xl md:text-2xl font-bold tracking-widest bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent"
            >
              SKY DENTAL AESTHETICS
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-cyan-400 font-mono mt-1"
            >
              Crafting Healthy & Beautiful Smiles
            </motion.p>
          </div>

          {/* Loader Log */}
          <div className="h-6 overflow-hidden mt-12 w-80 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-slate-300 font-mono"
              >
                {LOADING_STEPS[currentStep]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Container */}
          <div className="w-64 md:w-80 mt-4 relative">
            {/* Progress Track */}
            <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-300 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            {/* Percentage Display */}
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Securing connection</span>
              <span className="text-sm font-mono text-cyan-400 font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
