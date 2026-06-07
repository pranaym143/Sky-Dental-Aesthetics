import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Appointment } from '../types';
import {
  Calendar,
  Clock,
  Phone,
  User,
  Trash2,
  CheckCircle,
  FileText,
  Sparkles,
  Activity,
  X
} from 'lucide-react';

interface BookingDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCount: () => void;
}

export default function BookingDashboard({ isOpen, onClose, onUpdateCount }: BookingDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Completed'>('All');

  const fetchAppointments = () => {
    const raw = localStorage.getItem('sky_appointments');
    if (raw) {
      try {
        setAppointments(JSON.parse(raw));
      } catch (e) {
        console.error('Error parsing sky_appointments', e);
      }
    } else {
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAppointments();
    }
  }, [isOpen]);

  const updateStatus = (id: string, newStatus: 'Pending' | 'Confirmed' | 'Completed') => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    localStorage.setItem('sky_appointments', JSON.stringify(updated));
    setAppointments(updated);
    onUpdateCount();
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((app) => app.id !== id);
    localStorage.setItem('sky_appointments', JSON.stringify(updated));
    setAppointments(updated);
    onUpdateCount();
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all appointment records?')) {
      localStorage.removeItem('sky_appointments');
      setAppointments([]);
      onUpdateCount();
    }
  };

  const filtered = appointments.filter(
    (app) => filter === 'All' || app.status === filter
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'Pending').length,
    confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden" id="booking-dashboard-dialog">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl h-full bg-white/95 shadow-2xl border-l border-slate-100 flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2.5 rounded-full text-[10px] font-mono font-bold tracking-widest text-cyan-600 bg-cyan-100/50 uppercase">
                    Clinic Hub
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Database
                  </div>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                  Appointment Scheduler
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-mono text-[10px] uppercase">TOTAL</p>
                <p className="text-lg font-black text-slate-800">{stats.total}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <p className="text-amber-500 font-mono text-[10px] uppercase">PENDING</p>
                <p className="text-lg font-black text-amber-600">{stats.pending}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <p className="text-blue-500 font-mono text-[10px] uppercase">CONFIRMED</p>
                <p className="text-lg font-black text-blue-600">{stats.confirmed}</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                <p className="text-emerald-500 font-mono text-[10px] uppercase">DONE</p>
                <p className="text-lg font-black text-emerald-600">{stats.completed}</p>
              </div>
            </div>

            {/* Filter Tabs & Admin Controls */}
            <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
              <div className="flex gap-1 bg-slate-100 p-1 rounded-full">
                {['All', 'Pending', 'Confirmed', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      filter === tab
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {appointments.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50/50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Archive
                </button>
              )}
            </div>

            {/* Scrollable Appointment Records */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence initial={false}>
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-72 flex flex-col items-center justify-center text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-3xl"
                  >
                    <Calendar className="w-12 h-12 text-slate-300 stroke-[1.5] mb-3 animate-bounce" />
                    <p className="font-bold text-slate-700 text-sm">No Appointments Found</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      {filter === 'All'
                        ? 'Schedule an appointment using the luxury booking form down below to populate this real-time simulator!'
                        : `No appointments are currently tagged as "${filter}".`}
                    </p>
                  </motion.div>
                ) : (
                  filtered.map((app) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan-100 transition-all space-y-3 relative group overflow-hidden"
                    >
                      {/* Ribbon representing status */}
                      <div
                        className={`absolute top-0 left-0 w-1.5 h-full ${
                          app.status === 'Completed'
                            ? 'bg-emerald-500'
                            : app.status === 'Confirmed'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />

                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h4 className="font-sans font-extrabold text-slate-800 text-base flex items-center gap-2">
                            <span className="p-1 bg-slate-50 rounded-lg group-hover:bg-cyan-50 transition-colors">
                              <User className="w-4 h-4 text-slate-400 group-hover:text-cyan-500" />
                            </span>
                            {app.name}
                          </h4>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                            <Phone className="w-3.5 h-3.5" />
                            {app.phone}
                          </span>
                        </div>

                        {/* Status chip dropdown / toggle */}
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider ${
                              app.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : app.status === 'Confirmed'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}
                          >
                            {app.status}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{app.createdAt}</span>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50/80 text-xs text-slate-600 font-medium">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Treatment</p>
                          <p className="font-bold text-slate-700 truncate">{app.treatment}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Preferred Date</p>
                          <p className="font-bold text-slate-700 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-cyan-500" />
                            {app.date}
                          </p>
                        </div>
                      </div>

                      {app.message && (
                        <div className="p-3 bg-cyan-50/35 rounded-xl text-xs text-slate-600 border border-cyan-50/50 flex gap-2">
                          <FileText className="w-4 h-4 text-cyan-500 shrink-0" />
                          <p className="italic shrink leading-relaxed">&ldquo;{app.message}&rdquo;</p>
                        </div>
                      )}

                      {/* Interactive Actions */}
                      <div className="flex justify-between items-center pt-2 gap-2 border-t border-slate-100/60 text-xs">
                        <div className="flex gap-2">
                          {app.status === 'Pending' && (
                            <button
                              onClick={() => updateStatus(app.id, 'Confirmed')}
                              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Approve
                            </button>
                          )}
                          {app.status !== 'Completed' && (
                            <button
                              onClick={() => updateStatus(app.id, 'Completed')}
                              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Complete
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => deleteAppointment(app.id)}
                          className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer advice */}
            <div className="p-4 text-center bg-slate-50 border-t border-slate-100 text-[10px] font-mono text-slate-400">
              ⚡ Persisted securely in localStorage for demonstration and clinical review.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
