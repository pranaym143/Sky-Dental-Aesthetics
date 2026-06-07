import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Sun,
  Activity,
  Layers,
  ShieldAlert,
  Crown,
  Grid,
  Scissors,
  Compass,
  Heart,
  Wand2,
  PhoneCall,
  Award,
  Users,
  MapPin,
  Star,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Cpu,
  UserCheck,
  Check,
  Building,
  Clock,
  HeartHandshake,
  Database,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

import { CLINIC_SERVICES, PATIENT_REVIEWS, CLINIC_STATS, WHY_CHOOSE_US } from './data';
import { Appointment, Service } from './types';

// Custom Components
import PageLoader from './components/PageLoader';
import FloatingParticles from './components/FloatingParticles';
import InteractiveSmile from './components/InteractiveSmile';
import SmileGallery from './components/SmileGallery';
import BookingDashboard from './components/BookingDashboard';

// Import Assets
import clinicInteriorImage from './assets/images/sky_clinic_interior_1780760902352.png';
import dentistPortraitImage from './assets/images/sky_dentist_portrait_1780760887316.png';
import smilePatientImage from './assets/images/sky_smile_patient_1780760870971.png';
import skyPremiumClinicImage from './assets/images/sky_premium_clinic_1780819776014.png';

// Generate dynamic icons map for services & features
const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Sun,
  Activity,
  Layers,
  ShieldAlert,
  Crown,
  Grid,
  Scissors,
  Compass,
  Heart,
  Wand2,
  PhoneCall,
  Award,
  Users,
  Star,
  Cpu,
  UserCheck
};

export default function App() {
  // Global States
  const [activeAppointmentCount, setActiveAppointmentCount] = useState(0);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingTreatment, setBookingTreatment] = useState('');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stats Counters
  const [ratingsCount, setRatingsCount] = useState(0);
  const [happyPatientsCount, setHappyPatientsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [teamExpCount, setTeamExpCount] = useState(0);

  // Form Booking fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Scroll Progress and Parallax Effect
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const headerProgressY = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Read appointments count from localStorage
  const updateAppointmentCount = () => {
    const raw = localStorage.getItem('sky_appointments');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setActiveAppointmentCount(parsed.length);
      } catch (e) {
        console.error('Error reading count', e);
      }
    } else {
      setActiveAppointmentCount(0);
    }
  };

  useEffect(() => {
    updateAppointmentCount();

    // Stats counting animation trigger
    const ratingsTimer = setInterval(() => {
      setRatingsCount((prev) => (prev >= 5.0 ? 5.0 : parseFloat((prev + 0.1).toFixed(1))));
    }, 40);

    const patientsTimer = setInterval(() => {
      setHappyPatientsCount((prev) => {
        if (prev >= 5000) return 5000;
        return prev + Math.floor(Math.random() * 200) + 120;
      });
    }, 50);

    const reviewsTimer = setInterval(() => {
      setReviewsCount((prev) => {
        if (prev >= 213) return 213;
        return prev + Math.floor(Math.random() * 8) + 5;
      });
    }, 60);

    const expTimer = setInterval(() => {
      setTeamExpCount((prev) => {
        if (prev >= 15) return 15;
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(ratingsTimer);
      clearInterval(patientsTimer);
      clearInterval(reviewsTimer);
      clearInterval(expTimer);
    };
  }, []);

  // Review Carousel Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % PATIENT_REVIEWS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Handle Booking Form Submit
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !bookingTreatment) {
      alert('Please fill out all required fields.');
      return;
    }

    const newAppointment: Appointment = {
      id: `booking-${Date.now()}`,
      name,
      phone,
      treatment: bookingTreatment,
      date,
      message,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to LocalStorage
    const existingRaw = localStorage.getItem('sky_appointments');
    let existingList: Appointment[] = [];
    if (existingRaw) {
      try {
        existingList = JSON.parse(existingRaw);
      } catch (err) {}
    }
    existingList.unshift(newAppointment);
    localStorage.setItem('sky_appointments', JSON.stringify(existingList));

    // Update count immediately
    updateAppointmentCount();

    // Trigger luxurious Confetti Celebration explosion
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#22d3ee', '#ffffff', '#cbd5e1']
    });

    // Toggle success banner
    setFormSuccess(true);

    // Reset Form Fields
    setName('');
    setPhone('');
    setDate('');
    setMessage('');
  };

  // Scroll to booking form helper
  const triggerBookingPrefill = (treatmentName: string) => {
    setBookingTreatment(treatmentName);
    setSelectedService(null);
    const bookingSection = document.getElementById('book-appointment-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-white" ref={containerRef}>
      {/* 1. Full Page Loading Screen */}
      <PageLoader />

      {/* 2. Glassmorphic Navigation Header */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Brand Brand */}
            <a href="#" className="flex items-center gap-3 group relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-cyan-300 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/15 group-hover:rotate-12 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5.5 h-5.5 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
                >
                  <path d="M12 2C8.5 2 5.5 3.5 5.5 6.5C5.5 8.5 7 11.5 7 14C7 16.5 5 18 5 20C5 21.5 6.5 22 8 22C9.5 22 10.5 20.5 12 20.5C13.5 20.5 14.5 22 16 22C17.5 22 19 21.5 19 20C19 18 17 16.5 17 14C17 11.5 18.5 8.5 18.5 6.5C18.5 3.5 15.5 2 12 2Z" />
                </svg>
              </div>
              <div>
                <span className="font-display text-lg font-black tracking-wider text-slate-900 leading-none block uppercase">
                  SKY DENTAL
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-cyan-600 font-bold block mt-0.5">
                  AESTHETICS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 font-semibold text-slate-600 text-sm">
              <a href="#about-section" className="hover:text-cyan-600 transition-colors">About Us</a>
              <a href="#services-section" className="hover:text-cyan-600 transition-colors">Services</a>
              <a href="#testimonials-section" className="hover:text-cyan-600 transition-colors">Reviews</a>
              <a href="#gallery-section" className="hover:text-cyan-600 transition-colors">Transformations</a>
              <a href="#contact-section" className="hover:text-cyan-600 transition-colors">Contact</a>
            </nav>

            {/* CTA Controls */}
            <div className="hidden md:flex items-center gap-4">
              {/* Database Simulator Badge */}
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-cyan-200 bg-slate-50 hover:bg-cyan-50/20 text-xs font-mono font-bold text-slate-700 transition cursor-pointer relative"
              >
                <Database className="w-3.5 h-3.5 text-cyan-600" />
                <span>Live Portal</span>
                {activeAppointmentCount > 0 ? (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 font-sans text-[10px] font-bold text-white shadow-md animate-pulse">
                    {activeAppointmentCount}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
              </button>

              <a
                href="#book-appointment-section"
                className="px-5 py-2.5 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 transition-all duration-200 block"
              >
                Book Appointment
              </a>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="p-2.5 rounded-full border border-slate-200 bg-slate-50 relative"
              >
                <Database className="w-4 h-4 text-cyan-600" />
                {activeAppointmentCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[8px] font-bold text-white shadow-md">
                    {activeAppointmentCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-xl"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col font-semibold text-slate-700">
                <a
                  href="#about-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-cyan-600 py-1 transition"
                >
                  About Us
                </a>
                <a
                  href="#services-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-cyan-600 py-1 transition"
                >
                  Services
                </a>
                <a
                  href="#testimonials-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-cyan-600 py-1 transition"
                >
                  Reviews
                </a>
                <a
                  href="#gallery-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-cyan-600 py-1 transition"
                >
                  Transformations
                </a>
                <a
                  href="#contact-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-cyan-600 py-1 transition"
                >
                  Contact Info
                </a>
                <a
                  href="#book-appointment-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Book Appointment Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION: Full-screen luxurious gradient design */}
      <section
        id="hero-section"
        className="relative max-h-[1400px] min-h-[92vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white"
      >
        {/* Soft atmospheric gradient spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute -top-12 left-12 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[90px] pointer-events-none" />

        {/* Floating Particles backplane */}
        <FloatingParticles />

        {/* Decorative Floating Dental Silhouettes in background */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-5">
          <svg className="absolute top-24 left-[10%] w-36 h-36 border border-white rounded-full animate-wiggle" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.5 2 5.5 3.5 5.5 6.5C5.5 8.5 7 11.5 7 14C7 16.5 5 18 5 20C5 21.5 6.5 22 8 22H16C17.5 22 19 21.5 19 20C19 18 17 16.5 17 14C17 11.5 18.5 8.5 18.5 6.5C18.5 3.5 15.5 2 12 2Z" />
          </svg>
          <svg className="absolute bottom-24 right-[12%] w-48 h-48 border border-white rounded-full animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.5 2 5.5 3.5 5.5 6.5C5.5 8.5 7 11.5 7 14C7 16.5 5 18 5 20C5 21.5 6.5 22 8 22H16C17.5 22 19 21.5 19 20V14C17 11.5 18.5 8.5 18.5 6.5C18.5 3.5 15.5 2 12 2Z" />
          </svg>
        </div>

        {/* Main Content Layout Grid */}
        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          
          {/* Left Column: Bold headings, taglines, ratings */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Ratings Indicator Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
            >
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="text-xs font-mono tracking-wider text-slate-300 font-bold">
                <span className="text-cyan-400 font-bold">{ratingsCount.toFixed(1)}</span> Rating ({reviewsCount}+ Reviews)
              </div>
            </motion.div>

            {/* Headline Display */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs font-bold tracking-[0.35em] text-cyan-400 font-mono uppercase block"
              >
                SKY DENTAL AESTHETICS — SECUNDERABAD
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl xl:text-6xl font-black leading-none bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent tracking-tight"
              >
                Creating Confident <br className="hidden sm:inline" />
                Smiles Through <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 filter drop-shadow-[0_2px_12px_rgba(6,182,212,0.3)]">
                  Advanced Dental Care
                </span>
              </motion.h1>
            </div>

            {/* Subheadline (serving families across Secunderabad & Thumukunta) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed"
            >
              5-Star Rated Dental Clinic Serving Families Across Secunderabad & Thumukunta. Experience luxury boutique dental treatment with painless computerized procedures and state-of-the-art diagnostics.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 text-xs tracking-wider font-bold uppercase font-mono"
            >
              <a
                href="#book-appointment-section"
                className="px-8 py-4 px bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 hover:-translate-y-0.5 hover:brightness-105 transition duration-200 flex items-center gap-2"
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+919000090539"
                className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full hover:-translate-y-0.5 transition duration-200 flex items-center gap-2 text-white"
              >
                <Phone className="w-4 h-4 text-cyan-400" /> +91 90000 90539
              </a>
            </motion.div>

            {/* Micro bullet trust bar icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4 }}
              className="pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] text-slate-400 uppercase font-mono tracking-widest font-bold"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" /> 100% Painless Care
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" /> Digital X-Ray Setup
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" /> Free Diagnostics
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" /> Clean Safe Rooms
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium overlapping image composition with interactive wiggling dental items */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Ambient Background Radial Glow behind image collage */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/10 blur-[60px] pointer-events-none" />

            {/* Image Collage Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[420px] aspect-[4/5] scale-95 sm:scale-100"
            >
              {/* Back Image (Prisine Interior) */}
              <div className="absolute top-10 left-0 w-[65%] aspect-[1/1] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl filter brightness-[0.8]">
                <img
                  src={clinicInteriorImage}
                  alt="Sky Dental Aesthetics Interior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Middle Image (Friendly Surgeon Dentist Abhishek/Vinay) */}
              <div className="absolute bottom-4 left-4 w-[65%] aspect-[1/1] rounded-3xl overflow-hidden border-4 border-slate-900 shadow-2xl z-10 hover:scale-105 transition-transform duration-300">
                <img
                  src={dentistPortraitImage}
                  alt="Doctor Abhishek Sky Dental"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 backdrop-blur-sm p-3 text-[10px] text-center font-mono font-bold tracking-wider text-slate-300">
                  DR. ABHISHEK & DR. VINAY
                </div>
              </div>

              {/* Foreground Hero Image (Happy smiling patient) */}
              <div className="absolute top-0 right-0 w-[72%] aspect-[1/1] rounded-3.5xl overflow-hidden border-4 border-cyan-400 shadow-[0_20px_50px_rgba(6,182,212,0.25)] z-20 hover:scale-105 transition-transform duration-300">
                <img
                  src={smilePatientImage}
                  alt="Smiling Patient Sky Dental"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white font-mono text-[9px] px-2 py-1 rounded-md font-black tracking-widest">
                  GOLD STANDARD
                </div>
              </div>

              {/* Floating Decorative Vector Badge to trigger smile state */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 z-30"
              >
                <InteractiveSmile />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 4. Sliding Trust Bar Indicator tape */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 border-t border-white/5 py-4 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono font-bold tracking-widest text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-500">
              ★★★★★ <span className="text-white">5.0 GOOGLE RATING</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-white font-black">{reviewsCount}+ VERIFIED REVIEWS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1"><Cpu className="w-4 h-4 text-cyan-400" /> MODERN EQUIPMENT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1"><UserCheck className="w-4 h-4 text-cyan-400" /> EXPERIENCED SURGEONS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-cyan-400 font-bold">AFFORDABLE TREATMENTS</span>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION: introducing Sky Dental Aesthetics with modular card visual */}
      <section id="about-section" className="py-24 bg-white relative overflow-hidden">
        {/* Soft graphics */}
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-blue-100/30 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-12 left-0 w-[350px] h-[350px] rounded-full bg-cyan-100/20 blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Sticky/Polished Media Frame */}
            <div className="relative group p-1.5 bg-slate-50 border border-slate-200/60 rounded-3xl shadow-xl overflow-hidden">
              <div className="relative aspect-[4/3] rounded-2.5xl overflow-hidden bg-slate-900 border-2 border-white">
                <img
                  src={skyPremiumClinicImage}
                  alt="Sky Dental Aesthetics clinic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating detail badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-xs font-bold leading-none font-display">Secunderabad Premium Facility</p>
                    <p className="text-[10px] text-cyan-400 font-mono mt-0.5 tracking-wider font-semibold">Thumukunta Municipal Office Lane</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrated Content Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-cyan-600 bg-cyan-50">
                <Star className="w-3.5 h-3.5 fill-cyan-100" />
                ABOUT THE CLINIC
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Crafting Healthy & Beautiful Smiles At <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">SKY DENTAL AESTHETICS</span>
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Welcome to Sky Dental Aesthetics, where state-of-the-art dental clinical technology meets compassionate boutique-style healthcare. Conveniently located beside Government ZPHS School in Thumukunta, Secunderabad, our clinic prides itself on providing customized treatments engineered down to the exact detail.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                From emergency pain relief and computerized root canals to complex smile makeover transformations using zirconium veneers and modern ceramic braces, our clinical directors Dr. Abhishek and Dr. Vinay ensure that every patient experiences a smooth, anxiety-free, and delightful journey.
              </p>

              {/* Highlights Core values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Sterile Safety Guarantee</h4>
                    <p className="text-xs text-slate-500">Aseptic autoclaving and disposables used on every client.</p>
                  </div>
                </div>

                <div className="flex gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Transperent Digital Billing</h4>
                    <p className="text-xs text-slate-500">Clear cost estimations before starting with zero hidden fares.</p>
                  </div>
                </div>

                <div className="flex gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Painless Dental Tech</h4>
                    <p className="text-xs text-slate-500">Soft computer-controlled local anesthesia block injectors.</p>
                  </div>
                </div>

                <div className="flex gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Advanced Imaging</h4>
                    <p className="text-xs text-slate-500">Low radiation high-resolution intraoral camera scanning.</p>
                  </div>
                </div>
              </div>

              {/* Mini CTA row */}
              <div className="pt-4 flex gap-4 text-xs font-bold uppercase tracking-wider font-mono">
                <a
                  href="#book-appointment-section"
                  className="px-6 py-3.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition"
                >
                  Schedule A Visit
                </a>
                <a
                  href="tel:+919000090539"
                  className="px-6 py-3.5 border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-200 rounded-full transition flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-cyan-500" />
                  Request Callback
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION: Animated responsive interactive cards */}
      <section id="services-section" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          {/* Header text */}
          <div className="max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-cyan-600 bg-cyan-100/40 uppercase">
              Treatment Suite
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Elite Dental Treatments Rendered Under Expert Dental Surgeons
            </h2>
            <div className="h-1.5 w-16 bg-cyan-500 mx-auto rounded-full" />
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Click any treatment card to inspect price estimations, diagnostic details, timeline estimates, and prefill the scheduler.
            </p>
          </div>

          {/* Grid Layout containing 12 Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="services-grid">
            {CLINIC_SERVICES.map((serv) => {
              const IconComp = iconMap[serv.iconName] || Sparkles;
              return (
                <motion.div
                  key={serv.id}
                  layoutId={`service-card-${serv.id}`}
                  onClick={() => setSelectedService(serv)}
                  className="group rounded-2xl bg-white border border-slate-200/50 hover:border-cyan-300 p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  {/* Decorative corner flash */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-radial from-cyan-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-cyan-50 text-slate-600 group-hover:text-cyan-600 flex items-center justify-center transition-colors mb-5 shadow-inner">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Titles */}
                  <h3 className="font-sans font-extrabold text-slate-950 text-base md:text-lg tracking-tight group-hover:text-cyan-600 transition-colors">
                    {serv.title}
                  </h3>

                  <p className="text-slate-500 text-xs md:text-sm mt-2 leading-relaxed">
                    {serv.description}
                  </p>

                  <div className="mt-5 flex justify-between items-center text-xs font-mono font-bold tracking-wide pt-4 border-t border-slate-100/80">
                    <span className="text-cyan-600 uppercase">View detail</span>
                    <span className="text-slate-400 font-mono group-hover:text-slate-700 transition-colors">
                      {serv.priceEstimate === 'Immediate' ? 'Priority Line' : serv.priceEstimate}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Expandable Service Drawer Modal */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />

              {/* Card Container */}
              <motion.div
                layoutId={`service-card-${selectedService.id}`}
                className="relative bg-white rounded-3xl w-full max-w-xl p-8 overflow-hidden shadow-2xl border border-slate-100 text-left"
              >
                {/* Background glow banner overlay */}
                <div className="absolute top-0 inset-x-0 h-40 bg-linear-to-b from-cyan-50/60 to-transparent pointer-events-none" />

                {/* Close Button badge */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition cursor-pointer text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Service Details Layout */}
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                      {(() => {
                        const IconComponent = iconMap[selectedService.iconName] || Sparkles;
                        return <IconComponent className="w-6 h-6 stroke-[1.8]" />;
                      })()}
                    </div>
                    <div>
                      <p className="text-[10px] text-cyan-600 font-mono uppercase tracking-widest font-black leading-none">DiagnosticSuite</p>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedService.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {selectedService.longDescription}
                  </p>

                  {/* Metadatas stats table */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 font-medium text-xs text-slate-600">
                    <div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-0.5">ESTIMATED DURATION</p>
                      <p className="font-bold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-500" />
                        {selectedService.duration}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-0.5">ESTIMATED STARTING COST</p>
                      <p className="font-bold text-emerald-600 font-sans text-sm">
                        {selectedService.priceEstimate}
                      </p>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest font-mono text-slate-400">Clinical Advices</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[1.5]" /> Fully sterile consumables</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[1.5]" /> Prior diagnostic screening</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[1.5]" /> Transparent cost guidelines</div>
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500 stroke-[1.5]" /> 1-year treatment followups</div>
                    </div>
                  </div>

                  {/* Direct Action buttons */}
                  <div className="pt-4 flex gap-3 text-xs uppercase font-mono tracking-wider font-bold">
                    <button
                      onClick={() => triggerBookingPrefill(selectedService.title)}
                      className="flex-1 py-4 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white rounded-full transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Book Appointment Now <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-6 py-4 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-full transition"
                    >
                      Close Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 6. WHY CHOOSE US SECTION: High performance counter statistics & bullet factors */}
      <section id="why-choose-us-section" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Soft atmospheric colors */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold tracking-[0.3em] text-cyan-400 font-mono uppercase block">GOLD-STANDARD DENTAL AESTHETICS</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none uppercase">
                Why Discerning Patients Choose Sky Dental Aesthetics
              </h2>
            </div>
            <div className="lg:col-span-5 text-slate-300 text-xs sm:text-sm">
              We engineer beautiful premium healthy smiles that radiate self-confidence. Combining painless computerized procedures with verified 5-star clinical excellence in Secunderabad & Thumukunta.
            </div>
          </div>

          {/* Counts Grid section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" id="animated-counters-row">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <p className="font-display text-4xl md:text-5xl font-black text-cyan-400 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                {ratingsCount.toFixed(1)}<span className="text-white text-2xl font-bold">/5</span>
              </p>
              <p className="text-xs md:text-sm font-bold tracking-widest font-mono text-slate-200 mt-2 uppercase">Google Rating</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1 leading-relaxed">Highest rated local clinic</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <p className="font-display text-4xl md:text-5xl font-black text-white">
                {reviewsCount}<span className="text-cyan-400 text-2xl font-bold">+</span>
              </p>
              <p className="text-xs md:text-sm font-bold tracking-widest font-mono text-slate-200 mt-2 uppercase">Verified Reviews</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1 leading-relaxed">100% active real diagnostics</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <p className="font-display text-4xl md:text-5xl font-black text-white">
                {teamExpCount}<span className="text-cyan-400 text-2xl font-bold">+ Years</span>
              </p>
              <p className="text-xs md:text-sm font-bold tracking-widest font-mono text-slate-200 mt-2 uppercase">Team Expertise</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1 leading-relaxed">Oral Maxillofacial Surgeons</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <p className="font-display text-4xl md:text-5xl font-black text-cyan-400 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                {happyPatientsCount.toLocaleString()}<span className="text-white text-2xl font-bold">+</span>
              </p>
              <p className="text-xs md:text-sm font-bold tracking-widest font-mono text-slate-200 mt-2 uppercase">Happy Smiles</p>
              <p className="text-[10px] text-slate-400 font-mono mt-1 leading-relaxed">Secunderabad dental patients</p>
            </div>
          </div>

          {/* Cards Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((why, index) => {
              const IconComp = iconMap[why.iconName] || Award;
              return (
                <div
                  key={index}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/20 p-6 rounded-2xl transition duration-300 relative group overflow-hidden"
                >
                  {/* Absolute subtle sparkle visual */}
                  <span className="absolute -bottom-4 -right-4 text-white/5 font-bold uppercase tracking-wider scale-[4] select-none pointer-events-none font-mono">
                    SKY
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/10">
                    <IconComp className="w-5.5 h-5.5 text-cyan-400" />
                  </div>

                  <h3 className="font-sans font-extrabold text-base md:text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {why.title}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {why.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. PATIENT REVIEWS (TESTIMONIALS) SECTION: elegant slider carousel */}
      <section id="testimonials-section" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-cyan-600 bg-cyan-50">
              <MessageSquare className="w-3.5 h-3.5 fill-cyan-50" />
              TESTIMONIALS & TRUST
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Real Stories From Real Patients Saved from Pain
            </h2>
            <div className="h-1.5 w-16 bg-cyan-500 mx-auto rounded-full" />
          </div>

          {/* Testimonial Active Slider container */}
          <div className="relative max-w-3xl mx-auto min-h-[220px]" id="reviews-carousel-outer">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50/80 border border-slate-100 p-8 md:p-12 rounded-3xl relative"
              >
                {/* Large visual quotes graphic in backdrop */}
                <div className="absolute top-4 left-6 text-cyan-200/40 text-7xl font-sans select-none pointer-events-none font-black leading-none">
                  “
                </div>

                {/* Patient Review Content */}
                <div className="space-y-6 relative">
                  <div className="flex justify-center text-amber-400 gap-1">
                    {Array.from({ length: PATIENT_REVIEWS[activeReviewIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-base md:text-xl font-medium italic leading-relaxed text-center quote-text">
                    &ldquo;{PATIENT_REVIEWS[activeReviewIndex].text}&rdquo;
                  </p>

                  <div className="flex flex-col items-center">
                    <p className="font-display text-base font-extrabold text-slate-900 uppercase">
                      {PATIENT_REVIEWS[activeReviewIndex].name}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-mono">
                      <span>{PATIENT_REVIEWS[activeReviewIndex].date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-cyan-600 font-bold bg-cyan-50 px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                        {PATIENT_REVIEWS[activeReviewIndex].tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider triggers */}
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() =>
                  setActiveReviewIndex(
                    (prev) => (prev - 1 + PATIENT_REVIEWS.length) % PATIENT_REVIEWS.length
                  )
                }
                className="w-11 h-11 rounded-full border border-slate-200 hover:border-cyan-400 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
                title="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  setActiveReviewIndex((prev) => (prev + 1) % PATIENT_REVIEWS.length)
                }
                className="w-11 h-11 rounded-full border border-slate-200 hover:border-cyan-400 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
                title="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SMILE GALLERY SECTION: before & after comparative slider */}
      <section id="gallery-section" className="py-24 bg-slate-50 border-y border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-cyan-600 bg-cyan-100/40 uppercase">
              Treatment Outcomes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Before & After Transformations Gallery
            </h2>
            <div className="h-1.5 w-16 bg-cyan-500 mx-auto rounded-full" />
          </div>

          <SmileGallery />
        </div>
      </section>

      {/* 9. BOOK APPOINTMENT SECTION: luxury booking layout with validator & congrats wrapper */}
      <section id="book-appointment-section" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative text-white">
            
            {/* Design patterns overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[110px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative">
              
              {/* Sidebar decorative block */}
              <div className="md:col-span-5 bg-gradient-to-br from-blue-700 via-cyan-600 to-cyan-500 p-8 flex flex-col justify-between text-left relative overflow-hidden">
                {/* Overlapping circle detail */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] bg-white/15 px-3 py-1.5 rounded-full inline-block text-white">
                    Premium Suite
                  </span>
                  <p className="font-display text-2xl font-black leading-tight uppercase text-white">
                    Experience state-of-the-art dental clinical service.
                  </p>
                  <p className="text-slate-100 text-xs leading-relaxed font-semibold">
                    Submit the secure booking form, and our assistant will call you back within 15 minutes to confirm the timings.
                  </p>
                </div>

                <div className="space-y-4 pt-8 relative z-10 text-xs font-mono text-white/90">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-200 shrink-0" />
                    <span>Instant WhatsApp Followup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-200 shrink-0" />
                    <span>Free Orthodontic Diagnosis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-200 shrink-0" />
                    <span>Sterilized Modern Facilities</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-[9px] font-mono tracking-wider text-cyan-200">
                  SKY DENTAL AESTHETICS © 2026.
                </div>
              </div>

              {/* Form Input Columns */}
              <div className="md:col-span-7 p-8 md:p-10 text-left">
                
                <AnimatePresence mode="wait">
                  {!formSuccess ? (
                    <motion.form
                      key="booking-form"
                      onSubmit={handleBooking}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div>
                        <h3 className="font-display text-xl font-black text-white leading-none">Schedule Appointment</h3>
                        <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider">Book your modern boutique clinic slot</p>
                      </div>

                      {/* Inputs */}
                      <div className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-slate-500 transition-all font-medium"
                          />
                        </div>

                        {/* Phone details */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            maxLength={15}
                            placeholder="e.g. +91 90000 90539"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-slate-500 transition-all font-medium"
                          />
                        </div>

                        {/* Treatment required selection list */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Treatment Required *</label>
                          <select
                            required
                            value={bookingTreatment}
                            onChange={(e) => setBookingTreatment(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-all font-medium"
                          >
                            <option value="">Select treatment type</option>
                            {CLINIC_SERVICES.map((serv) => (
                              <option key={serv.id} value={serv.title}>
                                {serv.title}
                              </option>
                            ))}
                            <option value="General Consultation">General Case Consultation</option>
                          </select>
                        </div>

                        {/* Dates scheduler */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Preferred Date *</label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-all font-medium"
                          />
                        </div>

                        {/* Optional notes */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">Message / Notes (Optional)</label>
                          <textarea
                            placeholder="Please describe your tooth symptoms, expectations, or concerns"
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl p-4 text-sm text-white focus:outline-none placeholder:text-slate-500 transition-all resize-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Submitting CTA triggers */}
                      <button
                        type="submit"
                        className="w-full py-4 text-center bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-105 rounded-xl uppercase font-mono tracking-wider font-extrabold text-xs text-white shadow-lg shadow-cyan-500/10 cursor-pointer"
                      >
                        Confirm Appointment Booking
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="booking-congrats"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col justify-center items-center text-center p-8 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-2xl animate-bounce">
                        ✓
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-2xl font-black text-white leading-none">Appointment Scheduled!</h3>
                        <p className="text-xs text-slate-400 font-medium">
                          We have registered your details in our system securely.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs text-slate-300 w-full font-medium sm:px-6">
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wide mb-1">REGISTERED SCHEDULING CARD</p>
                        <p className="text-white font-bold text-sm">Treatment requested: {bookingTreatment}</p>
                        <p className="mt-1">Date preferred: {date}</p>
                        <p className="mt-0.5 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Assistant callback: Pending (&lt;15 mins)</p>
                      </div>

                      <div className="flex gap-3 w-full">
                        <button
                          onClick={() => {
                            setFormSuccess(false);
                            setBookingTreatment('');
                          }}
                          className="flex-1 py-3 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs uppercase font-mono font-bold border border-slate-700"
                        >
                          Book another slot
                        </button>
                        <button
                          onClick={() => {
                            setIsDashboardOpen(true);
                          }}
                          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-xs uppercase font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Check Live Portal
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION: Address details, locator map, quick phone & social CTA buttons */}
      <section id="contact-section" className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header titles */}
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider text-cyan-600 bg-cyan-100/40 uppercase">
              Clinic Locator
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Locate Our Premium Suite in Secunderabad
            </h2>
            <div className="h-1.5 w-16 bg-cyan-500 mx-auto rounded-full" />
          </div>

          {/* Details splits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info details col */}
            <div className="lg:col-span-5 space-y-8 text-left">
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-cyan-600 uppercase block">CLINIC DETAILS</span>
                <h3 className="font-display text-2xl font-black text-slate-900 uppercase">SKY DENTAL AESTHETICS</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Located beside Government ZPHS School in Thumukunta, our state-of-the-art facility features ergonomic clinical layouts and cozy diagnostics rooms designed specifically for dental beauty consultations.
                </p>
              </div>

              {/* Specific detail list */}
              <div className="space-y-6">
                
                {/* Location Grid */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 shadow-inner border border-cyan-100/30">
                    <MapPin className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Full Address</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      H-No 3, 77/2, Municipal Office Lane,<br />
                      Beside Government ZPHS School,<br />
                      Thumukunta, Secunderabad, Telangana 500078
                    </p>
                  </div>
                </div>

                {/* Telephone Row */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 shadow-inner border border-cyan-100/30">
                    <Phone className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Direct Clinical Contacts</h4>
                    <p className="text-xs font-mono font-bold text-slate-700 mt-1">
                      +91 90000 90539
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Call for emergency care prioritizations</p>
                  </div>
                </div>

                {/* Hours Row */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 shadow-inner border border-cyan-100/30">
                    <Clock className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Working Clinical Hours</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Monday &ndash; Saturday: 10:00 AM &ndash; 8:30 PM<br />
                      Sunday: 10:00 AM &ndash; 2:00 PM (Priority Appointments Only)
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom maps navigational button row */}
              <div className="pt-4 flex flex-wrap gap-3 text-xs uppercase font-mono tracking-wider font-bold">
                <a
                  href="tel:+919000090539"
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center gap-1.5 shadow-md"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Call Now
                </a>

                {/* WhatsApp Chat prefilled */}
                <a
                  href="https://wa.me/919000090539?text=Hi%20Sky%20Dental%20Aesthetics%2C%20I'd%20like%20to%20book%20a%20clinical%20consultation%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center gap-1.5 shadow-md hover:scale-102 transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200 fill-emerald-600" />
                  WhatsApp Us
                </a>

                <a
                  href="https://maps.google.com/?q=SKY+DENTAL+AESTHETICS+Thumukunta+Secunderabad+Telangana"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-white border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-200 rounded-full flex items-center gap-1.5"
                >
                  <Compass className="w-4 h-4 text-cyan-500" />
                  Directions
                </a>
              </div>
            </div>

            {/* Simulated Interactive Map Columns */}
            <div className="lg:col-span-7 w-full h-[400px] rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl relative group">
              {/* Google Map Embedded iframe targeting Thumukunta */}
              <iframe
                id="clinical-google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.8827988352605!2d78.55246731535091!3d17.56064798797437!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!2m3!1s0x3bcb8338df3f24bf%3A0xe97914083d65b74c!2sSKY%20DENTAL%20AESTHETICS!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter saturate-[0.9] group-hover:scale-[1.01] transition-transform duration-700"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="Sky Dental Aesthetics Google Maps Location"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm p-4 rounded-2xl flex justify-between items-center text-xs border border-white/5 shadow-md">
                <div className="text-left text-white">
                  <p className="font-bold flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> Thumukunta, Telangana</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Beside Government ZPHS School</p>
                </div>
                <a
                  href="https://maps.google.com/?q=SKY+DENTAL+AESTHETICS+Thumukunta+Secunderabad+Telangana"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono font-bold text-[10px] rounded-lg hover:brightness-105 transition"
                >
                  OPEN NAVIGATION
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PREMIUM FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
        
        {/* Detail stars */}
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Brandenburg logo section */}
            <div className="md:col-span-4 space-y-5">
              <a href="#" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                    <path d="M12 2C8.5 2 5.5 3.5 5.5 6.5C5.5 8.5 7 11.5 7 14C7 16.5 5 18 5 20C5 21.5 6.5 22 8 22H16C17.5 22 19 21.5 19 20C19 18 17 16.5 17 14C17 11.5 18.5 8.5 18.5 6.5C18.5 3.5 15.5 2 12 2Z" />
                  </svg>
                </div>
                <div>
                  <span className="font-display text-white text-base font-black tracking-widest block uppercase">SKY DENTAL</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-bold block mt-0.5">AESTHETICS</span>
                </div>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                Elite-tier luxury dental clinic website design crafted with absolute sterile care and Apple-inspired boutique clinic aesthetics.
              </p>
              <div className="flex gap-4 text-xs font-mono font-bold text-white">
                <a href="tel:+919000090539" className="hover:text-cyan-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  +91 90000 90539
                </a>
              </div>
            </div>

            {/* Quick links columns */}
            <div className="md:col-span-3 space-y-4 text-xs">
              <p className="font-display text-xs font-bold text-white uppercase tracking-widest">Our Treatments</p>
              <div className="grid grid-cols-1 gap-2">
                <a href="#services-section" className="hover:text-cyan-400 transition">Teeth Scaling & Cleaning</a>
                <a href="#services-section" className="hover:text-cyan-400 transition">Deep Teeth Whitening</a>
                <a href="#services-section" className="hover:text-cyan-400 transition">Invisalign & Ceramic Braces</a>
                <a href="#services-section" className="hover:text-cyan-400 transition">Laser Root Canals</a>
                <a href="#services-section" className="hover:text-cyan-400 transition">Smile Makeovers & Veneers</a>
                <a href="#services-section" className="hover:text-cyan-400 transition">Atraumatic Wisdom Removal</a>
              </div>
            </div>

            {/* Contact details */}
            <div className="md:col-span-3 space-y-4 text-xs">
              <p className="font-display text-xs font-bold text-white uppercase tracking-widest">Local Address</p>
              <p className="leading-relaxed">
                H-No 3, 77/2, Municipal Office Lane,<br />
                Beside Government ZPHS School,<br />
                Thumukunta, Secunderabad,<br />
                Telangana 500078
              </p>
              <p className="pt-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">Google Map Location verified</p>
            </div>

            {/* Live portal status info */}
            <div className="md:col-span-2 space-y-4 text-xs">
              <p className="font-display text-xs font-bold text-white uppercase tracking-widest">Interactive</p>
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="w-full text-center py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 font-mono text-[10px] font-bold tracking-wider transition uppercase"
              >
                Access Portal
              </button>
              <p className="text-[10px] text-slate-500 leading-normal text-left">
                Persists appointments securely to client-side localStorage.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5 pt-1" />

          {/* Copyrights and credentials */}
          <div className="flex flex-wrap justify-between items-center gap-4 text-[10px] font-mono tracking-widest uppercase font-bold text-slate-500">
            <div>
              © 2026 SKY DENTAL AESTHETICS. ALL RIGHTS RESERVED.
            </div>
            <div>
              CRAFTED BY LUXURY HEALTHCARE BRANDS GROUP
            </div>
          </div>
        </div>
      </footer>

      {/* 12. APPOINTMENT TRACKING DASHBOARD DRAWER */}
      <BookingDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onUpdateCount={updateAppointmentCount}
      />
    </div>
  );
}
