import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function InteractiveSmile() {
  const [isSparkling, setIsSparkling] = useState(false);

  return (
    <div
      id="interactive-smile-element"
      className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/80 via-white/40 to-cyan-50/20 rounded-3xl border border-white/60 shadow-xl backdrop-blur-md cursor-pointer group select-none overflow-hidden"
      onMouseEnter={() => setIsSparkling(true)}
      onMouseLeave={() => setIsSparkling(false)}
      onClick={() => setIsSparkling(true)}
    >
      {/* Background Animated Gradient Layer */}
      <div className="absolute inset-0 bg-radial from-cyan-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Interactive Vector Smile SVG */}
      <div className="relative w-40 h-28 flex items-center justify-center">
        {/* Sparkle 1 */}
        <motion.div
          animate={isSparkling ? { scale: [0, 1.2, 1], opacity: [0, 1, 0], rotate: [0, 90, 180] } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut', repeat: isSparkling ? Infinity : 0 }}
          className="absolute top-2 right-4 text-amber-400"
        >
          <Sparkles className="w-5 h-5 fill-amber-200" />
        </motion.div>

        {/* Sparkle 2 */}
        <motion.div
          animate={isSparkling ? { scale: [0, 1.3, 1], opacity: [0, 1, 0], rotate: [0, -45, 90], x: [0, -10] } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut', repeat: isSparkling ? Infinity : 0 }}
          className="absolute bottom-6 left-2 text-cyan-400"
        >
          <Sparkles className="w-4 h-4 fill-cyan-100" />
        </motion.div>

        {/* The Smile Vector Face */}
        <svg
          id="vector-face-smile"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 60"
          className="w-32 h-20 text-slate-800"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Eyes - Dynamic Winking when hovered */}
          <motion.path
            d="M 25, 20 A 4,4 0 0,1 35,20"
            className="text-cyan-500"
            stroke="currentColor"
            animate={isSparkling ? { d: "M 25,23 C 28,21 32,21 35,23" } : { d: "M 25, 20 A 4,4 0 0,1 35,20" }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M 65, 20 A 4,4 0 0,1 75,20"
            className="text-cyan-500"
            stroke="currentColor"
            animate={isSparkling ? { d: "M 65,20 A 4,4 0 0,1 75,20" } : { d: "M 65, 20 A 4,4 0 0,1 75,20" }}
          />

          {/* Cheeks */}
          <motion.circle
            cx="18"
            cy="32"
            r="4"
            className="fill-rose-300/40 text-rose-300/60"
            animate={isSparkling ? { scale: 1.3, opacity: 1 } : { scale: 1, opacity: 0.5 }}
          />
          <motion.circle
            cx="82"
            cy="32"
            r="4"
            className="fill-rose-300/40 text-rose-300/60"
            animate={isSparkling ? { scale: 1.3, opacity: 1 } : { scale: 1, opacity: 0.5 }}
          />

          {/* The Smile Arc Curve */}
          <motion.path
            d="M 22, 33 Q 50, 48 78, 33"
            stroke="url(#smile-gradient)"
            strokeWidth="5"
            animate={
              isSparkling
                ? { d: "M 20, 32 Q 50, 56 80, 32" } // Smile is wider & deeper
                : { d: "M 22, 33 Q 50, 48 78, 33" }
            }
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          />

          {/* Teeth Line inside smile arc (Glimmering whites!) */}
          <motion.path
            d="M 26, 33.5 Q 50, 40 74, 33.5"
            stroke="#ffffff"
            strokeWidth="2.5"
            initial={{ opacity: 0 }}
            animate={isSparkling ? { opacity: 1, d: "M 24, 33.5 Q 50, 43 76, 33.5" } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* SVG Gradient declaration for smooth modern vector colors */}
          <defs>
            <linearGradient id="smile-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
              <stop offset="50%" stopColor="#06b6d4" /> {/* cyan-500 */}
              <stop offset="100%" stopColor="#22d3ee" /> {/* cyan-400 */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative caption */}
      <div className="text-center mt-2 group-hover:scale-105 transition-transform">
        <span className="text-xs font-bold tracking-wider font-mono uppercase text-slate-800 flex items-center gap-1.5 justify-center">
          Confidence Level
          <span className="text-cyan-500 font-bold group-hover:text-amber-500 transition-colors">
            {isSparkling ? '100% Sparkle' : '99.9% Bright'}
          </span>
        </span>
        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
          {isSparkling ? 'Hovering & beaming with beauty!' : 'Hover to brighten your look'}
        </p>
      </div>
    </div>
  );
}
