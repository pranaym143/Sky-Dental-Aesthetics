import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeftRight, CheckCircle } from 'lucide-react';

// Import Assets
import veneersBefore from '../assets/images/veneers_before_1780761425995.png';
import veneersAfter from '../assets/images/veneers_after_1780761440028.png';
import whiteningBefore from '../assets/images/whitening_before_1780761454203.png';
import whiteningAfter from '../assets/images/whitening_after_1780761467001.png';
import orthoBefore from '../assets/images/ortho_before_1780761482089.png';
import orthoAfter from '../assets/images/ortho_after_1780761493486.png';

const TRANSFORMATIONS = [
  {
    id: 'veneers',
    tabName: 'Porcelain Makeover',
    title: 'Porcelain Veneers & Alignment',
    description: 'Correction of chips, spacing, and severe discoloration for a symmetrical aesthetic.',
    beforeImg: veneersBefore,
    afterImg: veneersAfter,
    details: ['100% Custom E-Max Veneers', 'Enhanced Symmetry', 'Gum Contour Lift', 'Completed in 2 Visits']
  },
  {
    id: 'whitening',
    tabName: 'Laser Whitening',
    title: 'Laser Teeth Whitening',
    description: 'Removal of deep-set stains from coffee, tea, and aging, bringing back pristine whiteness.',
    beforeImg: whiteningBefore,
    afterImg: whiteningAfter,
    details: ['8 Shades Brighter in 45 Mins', 'Zoom! In-Office Technology', 'Zero Sensitivity Formula', 'Protective Enamel Shield']
  },
  {
    id: 'ortho',
    tabName: 'Invisalign Aligners',
    title: 'Modern Invisalign / Braces',
    description: 'Correcting complex bite issues, overcrowding, and deep overbites comfortably.',
    beforeImg: orthoBefore,
    afterImg: orthoAfter,
    details: ['Virtually Invisible aligners', 'Custom 3D Smile Mapping', '30% Faster Treatment Times', 'Perfect Bite Alignment']
  }
];

export default function SmileGallery() {
  const [activeTab, setActiveTab] = useState('veneers');
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeData = TRANSFORMATIONS.find((t) => t.id === activeTab) || TRANSFORMATIONS[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents selection and default browser image drag behavior
    setIsSliding(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSliding(true);
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isSliding) return;
      handleMove(e.clientX);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (!isSliding) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleWindowMouseUp = () => {
      setIsSliding(false);
    };

    if (isSliding) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('touchmove', handleWindowTouchMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
      window.addEventListener('touchend', handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchend', handleWindowMouseUp);
    };
  }, [isSliding]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8" id="smile-gallery-root">
      {/* Category Toggles */}
      <div className="flex flex-wrap justify-center gap-3 mb-10" id="gallery-category-toggles">
        {TRANSFORMATIONS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSliderPosition(50); // Reset position on tab switch
            }}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/25 border-none'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-cyan-400 hover:text-cyan-600'
            }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="activeIndicator"
                className="w-1.5 h-1.5 rounded-full bg-white inline-block"
              />
            )}
            {tab.tabName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Gallery Interactive Column */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Instructions */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3 bg-slate-100 px-3 py-1.5 rounded-full">
            <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span>Click and drag the slider to compare transformations</span>
          </div>

          {/* Image Slider Container */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize bg-slate-900"
            id="before-after-slider-container"
          >
            {/* After Image (Right side reveal background) */}
            <div className="absolute inset-0 w-full h-full select-none">
              <img
                src={activeData.afterImg}
                alt={`${activeData.title} After`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-bold font-mono tracking-widest text-white shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin text-amber-200" />
                AFTER SKY CLINIC
              </div>
            </div>

            {/* Before Image (Left side reveal overlay clipped dynamically using clipPath) */}
            <div
              className="absolute inset-0 w-full h-full select-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={activeData.beforeImg}
                alt={`${activeData.title} Before`}
                className="w-full h-full object-cover filter saturate-[0.8] brightness-[0.9] pointer-events-none select-none"
                draggable="false"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-bold font-mono tracking-widest text-slate-300 shadow-md">
                BEFORE TREATMENT
              </div>
            </div>

            {/* Slider Line Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-blue-500 cursor-ew-resize filter drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Knob */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-cyan-600 shadow-xl border-2 border-cyan-400 flex items-center justify-center transition-transform duration-200 ${isSliding ? 'scale-110' : 'hover:scale-115'}`}>
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Details Column */}
        <div className="lg:col-span-5 space-y-6" id="gallery-details-column">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-cyan-600 bg-cyan-50">
                <Sparkles className="w-3.5 h-3.5 fill-cyan-100" />
                Featured Transformation
              </div>

              <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeData.title}
              </h3>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {activeData.description}
              </p>

              <div className="h-px bg-slate-200/80 my-4" />

              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3">
                Treatment Highlights
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeData.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-sm font-medium text-slate-700 bg-slate-50/80 px-3.5 py-2.5 rounded-xl border border-slate-100 hover:border-cyan-100 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-2">
                <a
                  href="#book-appointment-section"
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-mono font-bold text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all duration-350"
                >
                  Request Similar Treatment &rarr;
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
