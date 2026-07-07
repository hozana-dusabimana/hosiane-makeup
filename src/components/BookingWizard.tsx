import React, { useState, useEffect } from 'react';
import { INITIAL_SERVICES, SERVICE_ADDONS } from '../data';
import { MakeupService, Booking } from '../types';

interface BookingWizardProps {
  initialServiceId?: string | null;
  onClose: () => void;
  onBookingAdded: (newBooking: Booking) => void;
}

export default function BookingWizard({ initialServiceId, onClose, onBookingAdded }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<MakeupService>(
    INITIAL_SERVICES.find(s => s.id === initialServiceId) || INITIAL_SERVICES[0]
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-10');
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  
  // Contact details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Validation messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync initial service if prop changes
  useEffect(() => {
    if (initialServiceId) {
      const match = INITIAL_SERVICES.find(s => s.id === initialServiceId);
      if (match) setSelectedService(match);
    }
  }, [initialServiceId]);

  // Price calculations
  const basePrice = selectedService.price;
  const addonsPrice = selectedAddons.reduce((sum, addonId) => {
    const match = SERVICE_ADDONS.find(a => a.id === addonId);
    return sum + (match ? match.price : 0);
  }, 0);
  const totalPrice = basePrice + addonsPrice;

  // Static pre-booked slots for realistic availability
  const preBookedSlots: { [key: string]: string[] } = {
    '2026-07-08': ['08:00', '13:00'],
    '2026-07-10': ['13:00', '15:00'],
    '2026-07-11': ['08:00', '10:00', '13:00'],
    '2026-07-12': ['10:00', '15:00', '17:00'],
  };

  const timeSlots = [
    '08:00', '10:00', '13:00', '15:00', '17:00', '19:00'
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleNextStep = () => {
    const errs: { [key: string]: string } = {};
    if (step === 3) {
      if (!clientName.trim()) errs.name = 'Please provide your full name.';
      if (!clientEmail.trim()) {
        errs.email = 'An email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
        errs.email = 'Please enter a valid email format.';
      }
      if (!clientPhone.trim()) {
        errs.phone = 'A contact phone number is required.';
      }

      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }
    setErrors({});
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new booking object
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      addOnIds: selectedAddons,
      date: selectedDate,
      timeSlot: selectedTime,
      totalPrice,
      notes,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Store in localStorage
    const saved = localStorage.getItem('hosiane_bookings');
    const list: Booking[] = saved ? JSON.parse(saved) : [];
    list.unshift(newBooking);
    localStorage.setItem('hosiane_bookings', JSON.stringify(list));

    // Callback to App component
    onBookingAdded(newBooking);
    setStep(5); // Show success receipt
  };

  // Generate date array for the next 10 days starting July 7, 2026
  const getAvailableDates = () => {
    const dates = [];
    const baseDate = new Date('2026-07-07');
    for (let i = 0; i < 12; i++) {
      const nextDate = new Date(baseDate);
      nextDate.setDate(baseDate.getDate() + i);
      const yyyy = nextDate.getFullYear();
      const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
      const dd = String(nextDate.getDate()).padStart(2, '0');
      const weekday = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = nextDate.getDate();
      const fullStr = `${yyyy}-${mm}-${dd}`;
      dates.push({ fullStr, dayNum, weekday });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto" id="booking-modal-overlay">
      <div 
        className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl relative"
        id="booking-modal-content"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 z-10"
          id="close-booking-modal"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          {/* Side Info Panel */}
          <div className="md:col-span-4 bg-primary text-on-primary p-8 flex flex-col justify-between border-r border-outline-variant/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Appointment</span>
              <h2 className="font-serif text-2xl font-bold mt-1 text-white">Your Glow Schedule</h2>
              <p className="text-xs text-white/70 mt-2">
                Secure your curated high-fashion transformational experience in Kigali.
              </p>

              {/* Live Receipt summary */}
              <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase text-gold tracking-wider">Service</span>
                  <p className="text-sm font-semibold">{selectedService.name}</p>
                  <p className="text-xs text-white/60">{basePrice.toLocaleString()} RWF base price</p>
                </div>

                {selectedAddons.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase text-gold tracking-wider">Custom Add-ons</span>
                    <ul className="text-xs text-white/80 list-disc list-inside space-y-1">
                      {selectedAddons.map(aid => {
                        const ad = SERVICE_ADDONS.find(a => a.id === aid);
                        return ad ? <li key={aid}>{ad.name} (+{ad.price.toLocaleString()} RWF)</li> : null;
                      })}
                    </ul>
                  </div>
                )}

                {(step >= 2) && (
                  <div>
                    <span className="text-[10px] uppercase text-gold tracking-wider">Time & Date</span>
                    <p className="text-sm font-semibold">
                      {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not chosen'}
                    </p>
                    <p className="text-xs text-white/80">{selectedTime}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs text-white/50 block">Est. Total Investment</span>
              <span className="text-3xl font-serif font-bold text-gold-light">{totalPrice.toLocaleString()} RWF</span>
            </div>
          </div>

          {/* Core Content Steps Panel */}
          <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-between">
            {step < 5 && (
              <div className="flex items-center justify-between mb-6 border-b border-outline-variant/30 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step {step} of 4
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(s => (
                    <div 
                      key={s} 
                      className={`h-1 rounded-full transition-all duration-300 ${s <= step ? 'w-6 bg-primary' : 'w-2 bg-outline-variant/40'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: SERVICE & ADD-ONS */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-primary font-bold">Select Artistry Look</h3>
                  <p className="text-xs text-on-surface-variant">Choose your signature look to build upon</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INITIAL_SERVICES.map(srv => (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        selectedService.id === srv.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-outline-variant hover:border-primary bg-surface-container-lowest'
                      }`}
                      id={`select-srv-${srv.id}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-serif font-semibold text-sm text-primary">{srv.name}</span>
                        <span className="text-xs font-bold text-gold">{srv.price.toLocaleString()} RWF</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-1 leading-normal">{srv.description}</p>
                    </button>
                  ))}
                </div>

                <div>
                  <h3 className="font-serif text-sm text-primary font-bold mb-2">Enhance with Luxury Add-ons</h3>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {SERVICE_ADDONS.map(addon => (
                      <label 
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                          selectedAddons.includes(addon.id)
                            ? 'bg-primary/5 border-primary/50'
                            : 'bg-surface border-outline-variant hover:border-primary/40'
                        }`}
                        id={`addon-label-${addon.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={selectedAddons.includes(addon.id)}
                            onChange={() => toggleAddon(addon.id)}
                            className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                            id={`addon-chk-${addon.id}`}
                          />
                          <div>
                            <p className="font-semibold text-primary">{addon.name}</p>
                            <p className="text-[10px] text-on-surface-variant">{addon.description}</p>
                          </div>
                        </div>
                        <span className="font-bold text-gold-light bg-primary/5 px-2 py-0.5 rounded ml-2">+{addon.price.toLocaleString()} RWF</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-primary font-bold">Preferred Time & Date</h3>
                  <p className="text-xs text-on-surface-variant">Dates available for Hosiane Studio bookings in Kigali</p>
                </div>

                {/* Horizontal Date Picker */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary">July 2026</span>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                    {availableDates.map(dateItem => (
                      <button
                        key={dateItem.fullStr}
                        onClick={() => setSelectedDate(dateItem.fullStr)}
                        className={`flex flex-col items-center p-3 rounded-xl min-w-[55px] border transition-all ${
                          selectedDate === dateItem.fullStr
                            ? 'bg-primary text-on-primary border-primary shadow-md'
                            : 'bg-surface border-outline-variant hover:border-primary text-primary'
                        }`}
                        id={`date-${dateItem.fullStr}`}
                      >
                        <span className="text-[10px] uppercase tracking-wider">{dateItem.weekday}</span>
                        <span className="text-lg font-serif font-bold mt-1">{dateItem.dayNum}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-primary block">Available Daily Slots</span>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => {
                      const isBooked = preBookedSlots[selectedDate]?.includes(time);
                      return (
                        <button
                          key={time}
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl text-xs font-semibold border transition-all ${
                            isBooked
                              ? 'bg-surface-container text-on-surface-variant/35 border-transparent cursor-not-allowed line-through'
                              : selectedTime === time
                                ? 'bg-gold-light text-primary border-gold shadow-sm font-bold scale-[1.02]'
                                : 'bg-surface-container-lowest border-outline-variant hover:border-primary text-primary'
                          }`}
                          id={`time-${time}`}
                        >
                          {time} {parseInt(time.split(':')[0]) < 12 ? 'AM' : 'PM'}
                          {isBooked && <span className="block text-[8px] tracking-wider text-red-700 font-bold uppercase mt-0.5">Full</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT FORM */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-serif text-xl text-primary font-bold">Contact & Consultation Details</h3>
                  <p className="text-xs text-on-surface-variant">Please fill out your details so Hosiane can connect with you.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-primary">Your Full Name</label>
                    <input 
                      type="text" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Sandra Munyana"
                      className="w-full bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary p-3 text-sm text-primary"
                      id="input-client-name"
                    />
                    {errors.name && <p className="text-[10px] text-red-600 font-bold">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-primary">Email Address</label>
                      <input 
                        type="email" 
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="sandra@gmail.com"
                        className="w-full bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary p-3 text-sm text-primary"
                        id="input-client-email"
                      />
                      {errors.email && <p className="text-[10px] text-red-600 font-bold">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-primary">Phone Number</label>
                      <input 
                        type="tel" 
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+250 788 000 000"
                        className="w-full bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary p-3 text-sm text-primary"
                        id="input-client-phone"
                      />
                      {errors.phone && <p className="text-[10px] text-red-600 font-bold">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-primary">Special Event Requirements / Skin Concerns</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Skin is oily, wedding venue is Serena Hotel Kigali, need hair styled by 12 PM."
                      className="w-full bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary p-3 text-sm h-20 text-primary"
                      id="input-booking-notes"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL RECONCILIATION */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-primary font-bold">Review Your Booking</h3>
                  <p className="text-xs text-on-surface-variant">Please confirm your selection details before finalizing appointment.</p>
                </div>

                <div className="bg-surface border border-outline-variant rounded-2xl p-5 space-y-4 text-xs">
                  <div className="flex justify-between pb-3 border-b border-outline-variant">
                    <span className="font-semibold text-primary">Selected Look:</span>
                    <span className="font-bold text-primary">{selectedService.name}</span>
                  </div>

                  <div className="flex justify-between pb-3 border-b border-outline-variant">
                    <span className="font-semibold text-primary">Consultation Date & Time:</span>
                    <span className="font-bold text-primary">{selectedDate} @ {selectedTime}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="pb-3 border-b border-outline-variant">
                      <p className="font-semibold text-primary mb-1">Add-ons:</p>
                      <ul className="list-disc list-inside text-on-surface-variant space-y-1 pl-1">
                        {selectedAddons.map(aid => {
                          const ad = SERVICE_ADDONS.find(a => a.id === aid);
                          return ad ? <li key={aid}>{ad.name} (+{ad.price.toLocaleString()} RWF)</li> : null;
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-1">
                    <p className="font-semibold text-primary">Client Details:</p>
                    <p className="text-on-surface-variant">{clientName} ({clientPhone})</p>
                    <p className="text-on-surface-variant">{clientEmail}</p>
                    {notes && <p className="text-[11px] text-on-surface-variant italic mt-1">"{notes}"</p>}
                  </div>
                </div>

                <div className="bg-gold/10 p-4 rounded-xl border border-gold/30">
                  <p className="text-[11px] text-primary leading-normal">
                    <strong>Note:</strong> Hosiane operates on a consultation-first schedule. No upfront deposit is required on this showcase dashboard. You will receive an approval email within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS TICKET */}
            {step === 5 && (
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-primary font-bold">Booking Submitted!</h3>
                  <p className="text-sm text-on-surface-variant mt-2 max-w-sm mx-auto">
                    Thank you, {clientName}. Your transformation appointment is safely logged for review.
                  </p>
                </div>

                <div className="bg-surface border border-outline-variant rounded-xl p-5 text-left text-xs max-w-sm mx-auto space-y-2">
                  <div className="flex justify-between text-[10px] text-gold uppercase tracking-wider font-bold">
                    <span>Ticket #</span>
                    <span>{`HST-${Math.floor(Math.random() * 9000) + 1000}`}</span>
                  </div>
                  <div className="h-px bg-outline-variant/50 my-2"></div>
                  <p><strong className="text-primary">Artistry:</strong> {selectedService.name}</p>
                  <p><strong className="text-primary">Reserved Slot:</strong> {selectedDate} @ {selectedTime}</p>
                  <p><strong className="text-primary">Contact:</strong> {clientPhone}</p>
                  <p><strong className="text-primary">Total Investment:</strong> {totalPrice.toLocaleString()} RWF</p>
                </div>

                <button 
                  onClick={onClose}
                  className="bg-primary text-on-primary font-sans font-semibold text-xs px-8 py-3 rounded-full hover:scale-105 transition-transform duration-200"
                  id="close-success-btn"
                >
                  Return to Portfolio
                </button>
              </div>
            )}

            {/* Buttons Navigation footer */}
            {step < 5 && (
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-outline-variant/20">
                {step > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
                    id="booking-prev-btn"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="gold-gradient text-primary font-sans font-bold text-xs px-8 py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
                    id="booking-next-btn"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    className="bg-primary text-on-primary font-sans font-bold text-xs px-8 py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
                    id="booking-submit-btn"
                  >
                    Confirm Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
