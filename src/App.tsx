import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Camera, 
  Home, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  Award, 
  ArrowUp, 
  MessageSquare, 
  MapPin, 
  Heart, 
  SlidersHorizontal,
  X,
  Star
} from 'lucide-react';

import Navbar from './components/Navbar';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import BookingWizard from './components/BookingWizard';
import AdminPortal from './components/AdminPortal';
import TestimonialSection from './components/TestimonialSection';

import { 
  INITIAL_SERVICES, 
  INITIAL_PORTFOLIO, 
  INITIAL_TESTIMONIALS 
} from './data';
import { Booking, MakeupService, PortfolioItem, Testimonial } from './types';

export default function App() {
  // App-wide state
  const [services, setServices] = useState<MakeupService[]>(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // UI state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'All' | 'Bridal' | 'Editorial' | 'Events'>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Home Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('Bridal Makeup');
  const [contactDate, setContactDate] = useState('');
  const [contactNotes, setContactNotes] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Initialize and load from LocalStorage
  useEffect(() => {
    // 0. Re-seed content when the bundled defaults change (e.g. new portfolio
    //    images). Bump DATA_VERSION whenever INITIAL_* content is updated.
    //    User-generated bookings are intentionally preserved.
    const DATA_VERSION = '2';
    if (localStorage.getItem('hosiane_data_version') !== DATA_VERSION) {
      localStorage.removeItem('hosiane_services');
      localStorage.removeItem('hosiane_portfolio');
      localStorage.removeItem('hosiane_testimonials');
      localStorage.setItem('hosiane_data_version', DATA_VERSION);
    }

    // 1. Load services
    const savedServices = localStorage.getItem('hosiane_services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      localStorage.setItem('hosiane_services', JSON.stringify(INITIAL_SERVICES));
    }

    // 2. Load portfolio
    const savedPortfolio = localStorage.getItem('hosiane_portfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    } else {
      localStorage.setItem('hosiane_portfolio', JSON.stringify(INITIAL_PORTFOLIO));
    }

    // 3. Load testimonials
    const savedTestimonials = localStorage.getItem('hosiane_testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      localStorage.setItem('hosiane_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    }

    // 4. Load or mock bookings
    const savedBookings = localStorage.getItem('hosiane_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Seed with some elegant default bookings to make the admin look populated instantly
      const mockBookings: Booking[] = [
        {
          id: 'bk-mock-1',
          clientName: 'Sandra Munyana',
          clientEmail: 'sandra@gmail.com',
          clientPhone: '+250 788 515 208',
          serviceId: 'srv-bridal',
          serviceName: 'Bridal Artistry',
          addOnIds: ['add-trial', 'add-hair'],
          date: '2026-07-10',
          timeSlot: '10:00',
          totalPrice: 245,
          notes: 'Prefer warm rose metallic gold palette. Hair styling should be elegant soft curls.',
          status: 'Pending',
          createdAt: '2026-07-06'
        },
        {
          id: 'bk-mock-2',
          clientName: 'Jean Kamanzi',
          clientEmail: 'jean@gmail.com',
          clientPhone: '+250 786 111 222',
          serviceId: 'srv-grad',
          serviceName: 'Graduation Glam',
          addOnIds: ['add-lashes'],
          date: '2026-07-11',
          timeSlot: '13:00',
          totalPrice: 95,
          notes: 'Need zero flashback foundation for professional studio flash photography.',
          status: 'Confirmed',
          createdAt: '2026-07-05'
        }
      ];
      setBookings(mockBookings);
      localStorage.setItem('hosiane_bookings', JSON.stringify(mockBookings));
    }

    // Handle scroll to top threshold
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for state updates from Admin Portal
  const handleUpdateBookings = (updatedList: Booking[]) => {
    setBookings(updatedList);
  };

  const handleUpdateServices = (updatedList: MakeupService[]) => {
    setServices(updatedList);
  };

  const handleUpdatePortfolio = (updatedList: PortfolioItem[]) => {
    setPortfolio(updatedList);
  };

  const handleUpdateTestimonials = (updatedList: Testimonial[]) => {
    setTestimonials(updatedList);
  };

  const handleBookingAdded = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleAddTestimonial = (newTestimony: Testimonial) => {
    setTestimonials(prev => [newTestimony, ...prev]);
  };

  const triggerServiceBooking = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const triggerContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }

    // Simulate scheduling from the home page form
    const serviceMatch = services.find(s => s.name === contactService) || services[0];
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      clientName: contactName,
      clientEmail: `${contactName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      clientPhone: contactPhone,
      serviceId: serviceMatch.id,
      serviceName: serviceMatch.name,
      addOnIds: [],
      date: contactDate || '2026-07-12',
      timeSlot: '13:00',
      totalPrice: serviceMatch.price,
      notes: contactNotes || 'Submitted via contact form.',
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const list = [newBooking, ...bookings];
    setBookings(list);
    localStorage.setItem('hosiane_bookings', JSON.stringify(list));

    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactPhone('');
      setContactDate('');
      setContactNotes('');
    }, 4000);
  };

  const filteredPortfolio = portfolio.filter(item => {
    if (activeGalleryFilter === 'All') return true;
    return item.category === activeGalleryFilter;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="text-3xl" />;
      case 'GraduationCap': return <GraduationCap className="text-3xl" />;
      case 'Camera': return <Camera className="text-3xl" />;
      case 'Home': return <Home className="text-3xl" />;
      default: return <Sparkles className="text-3xl" />;
    }
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary-light selection:text-white min-h-screen flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar 
        onOpenBooking={() => triggerServiceBooking('srv-bridal')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pendingBookingsCount={bookings.filter(b => b.status === 'Pending').length}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="hero">
        {/* Decorative lighting background blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-primary-light/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Ambient Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute text-primary-light/10 text-8xl top-[25%] left-[8%] animate-float-brush hidden md:block">
            <span className="material-symbols-outlined text-[100px]">brush</span>
          </div>
          <div className="absolute text-gold/25 text-5xl bottom-[20%] right-[10%] animate-float-sparkle">
            <span className="material-symbols-outlined text-[60px]">flare</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Hero text */}
          <div className="space-y-6 text-center md:text-left mt-8 md:mt-0">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Certified Luxury Artistry</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-[1.1] tracking-tight">
              Reveal Your Most <br />
              <span className="gold-text-gradient italic font-normal">Beautiful Self</span>
            </h1>
            
            <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-md mx-auto md:mx-0 leading-relaxed">
              Professional makeup artistry custom-sculpted for life's most precious milestones. Specialized in bespoke bridal, graduation glam, and high-fashion editorial styling.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button 
                onClick={() => triggerServiceBooking('srv-bridal')}
                className="gold-gradient text-primary font-semibold px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 text-xs uppercase tracking-wider font-bold"
                id="hero-book-btn"
              >
                Schedule Consultation 
                <span className="material-symbols-outlined text-sm font-bold">calendar_month</span>
              </button>
              <a 
                href="#portfolio" 
                className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary/5 transition-all duration-300 text-xs uppercase tracking-wider"
                id="hero-portfolio-btn"
              >
                View Masterpieces
              </a>
            </div>
          </div>

          {/* Hero Portrait with gold frames */}
          <div className="relative flex justify-center w-full">
            <div className="relative aspect-[4/5] w-full max-w-[360px] rounded-[2rem] overflow-hidden shadow-2xl border border-outline-variant/30 z-10 hover:scale-[1.01] transition-transform duration-500">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkKv02r5TSthMJ6JAWZBI8vwvXW3s14eYJr3RpQXdpick-ChLCUk6NCPy3hKt6yOQEclwkwDZSjWWPHU-oWDfiXx0L6OnKkp-Do_BTNeUiVhZJ6Y5R03gCeLVMalOZfKPLasylk_niAHg1uLgvoEonyI7LjqmdMF8ogpHpyF8GW62ZOf7ArMeQazsnPP-szUA1sl2wH6hHcx1iigH9RrC8Bq0tOM6p7zkDtJqJOzZTy5cup8wl4zgimxBksteuRDD6saTcHBulnM8" 
                alt="Hosiane Makeup Artist Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Soft decorative floating frames */}
            <div className="absolute -bottom-6 -left-6 w-44 h-44 bg-surface-container-high rounded-3xl -z-10 shadow-lg border border-outline-variant/10 hidden sm:block" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-gold/30 rounded-full -z-10 animate-pulse hidden sm:block" />
          </div>
        </div>
      </section>

      {/* About The Artist Section */}
      <section className="py-20 md:py-28 bg-surface-container-low border-y border-outline-variant/15" id="about">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="relative flex justify-center">
            <div className="aspect-square w-full max-w-[380px] rounded-[3rem] overflow-hidden shadow-xl rotate-3 border-2 border-white">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu-3TeAqlW-J_QUxOYGuUCGYYBz85FoOEUsYuwm_amdRadnSZja2k7HSyWZWDCYxsSbSO555cJyldezAVtir1GaNOjj8k1TCkS_-s8tvn3ymzDFdWzQnSz-jlDq-doRL0h6jofxqQkYwPUoQX-iCfKsZTVEpS0WdXdixrkxO_HelScwCv-2ApfdfkvJI5-2drmoQBMAp2xUQtp2Ke1bJdxjh958p4SJNj2GNifpbhd0BzxaRNgNYBeo02Qw9NcHEjh1pHEBdsSQIw" 
                alt="Detailed Closeup of Makeup Artistry Look" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 max-w-[380px] mx-auto bg-primary/5 rounded-[3rem] -rotate-3 -z-10" />
          </div>

          <div className="space-y-6">
            <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold block">The Artist &amp; Philosophy</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold">Artistry Meets Passion</h2>
            
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Hello, I'm Hosiane. To me, makeup is not about masking or concealing—it's about custom-contouring and amplifying the unique symmetry and beauty that's already yours. With years of experience in high-end beauty, I have dedicated my career to crafting timeless, flawless results that command attention while remaining lightweight.
            </p>
            
            <p className="font-serif text-base md:text-lg text-primary italic border-l-4 border-gold pl-4 my-6">
              "Every face is a distinct, gorgeous canvas. My goal is to build the inner confidence and luxury that lets your natural personality shine."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-outline-variant/30">
                <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm font-bold">verified</span>
                </div>
                <div>
                  <p className="font-bold text-xs text-primary">Certified Artistry</p>
                  <p className="text-[10px] text-on-surface-variant">Top-tier global credentials</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-outline-variant/30">
                <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm font-bold">sanitizer</span>
                </div>
                <div>
                  <p className="font-bold text-xs text-primary">100% Hygienic</p>
                  <p className="text-[10px] text-on-surface-variant">Sanitized premium kits</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto" id="services">
        <div className="text-center mb-16 space-y-3">
          <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold">Tailored Beauties</span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold">Luxury Makeup Services</h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mx-auto">
            Bespoke artistry collections curated for your special moments, blending the finest products with specialized long-wear mapping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(srv => (
            <div 
              key={srv.id}
              className="bg-white border border-outline-variant rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative"
              id={`service-card-${srv.id}`}
            >
              <div>
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                  {getServiceIcon(srv.icon)}
                </div>
                <h3 className="font-serif text-lg font-bold text-primary mb-2 group-hover:text-gold transition-colors">{srv.name}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">{srv.description}</p>
                
                <ul className="text-[11px] text-on-surface-variant space-y-2 mb-6 border-t border-outline-variant/30 pt-4">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[12px] text-gold font-bold">check</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center border-t border-outline-variant/30 pt-4 mt-auto">
                <div>
                  <p className="text-[9px] uppercase text-on-surface-variant font-semibold">Investment</p>
                  <p className="font-serif font-bold text-primary text-base">From ${srv.price}</p>
                </div>
                <button 
                  onClick={() => triggerServiceBooking(srv.id)}
                  className="bg-primary/5 hover:bg-primary text-primary hover:text-on-primary text-[10px] font-sans font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all flex items-center gap-1"
                  id={`srv-book-action-${srv.id}`}
                >
                  Book Look 
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before/After Interactive Section */}
      <section className="py-20 md:py-24 bg-surface-container px-4 md:px-8 border-y border-outline-variant/15">
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Feature Grids (Why Choose) */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold">Craftsmanship Detail</span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold">Why Choose Hosiane Artistry?</h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mx-auto">
            Experience the difference of meticulously planned professional application designed to bring peace of mind to your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 p-5 rounded-2xl hover:bg-surface-container transition-colors duration-200">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-sm">schedule</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-primary mb-1">Punctuality Assured</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Absolute professional commitment to timeline locks. We arrive early, setup seamlessly, and execute on time.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-surface-container transition-colors duration-200">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-sm">sanitizer</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-primary mb-1">Medical-Grade Hygiene</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Double-sanitization of all brushes, disposable wands, and product scrapers ahead of skin prep. Safe and absolute hygiene.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-surface-container transition-colors duration-200">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-sm">diamond</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-primary mb-1">Premium Product Kit</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Exclusively luxury world-class cosmetics: Dior, Chanel, MAC, Huda Beauty, and Charlotte Tilbury for beautiful camera finishes.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-surface-container transition-colors duration-200">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-sm">shutter_speed</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-primary mb-1">16-Hour Armor wear</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Specialized skin-mapping techniques and high-end binding sprays ensure zero-transfer, non-sweat flawless hold all day.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-surface-container transition-colors duration-200">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-sm">face_5</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-primary mb-1">Bespoke Skin Sculpt</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">We carefully adapt to skin sensitivities, undertones, and allergies, ensuring healthy-glow prep ahead of coloring.</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl hover:bg-surface-container transition-colors duration-200">
            <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-sm">verified_user</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-primary mb-1">Kigali Studio &amp; Travel</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Come visit our peaceful private makeup studio in Kigali, or request premium home-travel options directly at your venue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-20 md:py-28 bg-surface-container-low border-y border-outline-variant/15" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold block">Masterpieces Catalog</span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-1">Our Portfolio Gallery</h2>
              <p className="font-sans text-sm text-on-surface-variant mt-1">Browse a collection of luxury transformations.</p>
            </div>

            {/* Gallery Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {(['All', 'Bridal', 'Editorial', 'Events'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveGalleryFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap border ${
                    activeGalleryFilter === filter
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'border-outline-variant hover:border-primary text-primary hover:bg-surface'
                  }`}
                  id={`filter-btn-${filter}`}
                >
                  {filter === 'All' ? 'All Masterpieces' : `${filter} looks`}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-like Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-masonry">
            {filteredPortfolio.map(item => (
              <div 
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative overflow-hidden rounded-2xl shadow-md border border-outline-variant/20 aspect-[4/5] cursor-pointer bg-surface-container"
                id={`portfolio-item-${item.id}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
                
                {/* Elegant overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase text-gold font-bold tracking-widest">{item.category} Look</span>
                  <h4 className="font-serif text-lg text-white font-bold mt-1">{item.title}</h4>
                  <p className="text-[11px] text-white/80 line-clamp-2 mt-1 leading-normal">{item.description}</p>
                  
                  <span className="text-[10px] text-gold-light underline font-sans font-semibold mt-3 flex items-center gap-1">
                    Expand Details Look
                    <span className="material-symbols-outlined text-xs">unfold_more</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
        <TestimonialSection 
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />
      </section>

      {/* Booking Form (Contact / Place order look) */}
      <section className="py-20 md:py-28 bg-surface px-4 md:px-8 border-t border-outline-variant/15" id="booking">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5 border border-outline-variant/20">
          
          {/* Side static contact info panel */}
          <div className="md:col-span-2 bg-primary p-10 md:p-12 text-on-primary flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase text-gold tracking-widest font-bold">Contact</span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-white">Book Your Glow</h3>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  Ready for your custom transformation? Send a quick query and Hosiane will respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gold">phone</span>
                  <span>+250 786 515 208</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gold">alternate_email</span>
                  <span>hello@hosiane.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gold">location_on</span>
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
              <span className="text-[10px] uppercase text-gold tracking-wider font-semibold block mb-2">Our Studio Hours</span>
              <p className="text-xs text-white/80">Everyday: 07:00 AM – 08:00 PM</p>
            </div>
          </div>

          {/* Quick contact form */}
          <div className="md:col-span-3 p-10 md:p-12">
            {contactSuccess ? (
              <div className="text-center py-12 space-y-4 h-full flex flex-col justify-center items-center">
                <div className="w-14 h-14 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">mail</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-primary font-bold">Consultation Logged!</h4>
                  <p className="text-xs text-on-surface-variant max-w-xs mt-2 mx-auto">
                    We've saved your inquiry into the administrative system under "Appointments". Hosiane will verify and lock your slot!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={triggerContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-primary">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      id="contact-form-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-primary">Phone Number</label>
                    <input 
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+250 788..."
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      id="contact-form-phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-primary">Service Look</label>
                    <select
                      value={contactService}
                      onChange={(e) => setContactService(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-primary focus:outline-none"
                      id="contact-form-service"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.name}>{s.name} (${s.price})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-primary">Preferred Date</label>
                    <input 
                      type="date"
                      value={contactDate}
                      onChange={(e) => setContactDate(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-primary focus:outline-none"
                      id="contact-form-date"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-primary">Special Event Messages / Skin Concerns</label>
                  <textarea
                    value={contactNotes}
                    onChange={(e) => setContactNotes(e.target.value)}
                    placeholder="Tell me more about your style preference, venue..."
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 h-20 text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    id="contact-form-notes"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full gold-gradient text-primary font-sans font-bold py-3.5 rounded-xl shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
                  id="contact-form-submit-btn"
                >
                  Send Inquiry Now
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer Area */}
      <footer className="bg-primary text-on-primary py-16 px-4 md:px-8 mt-auto border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-bold text-white">Hosiane Makeup</h4>
            <p className="text-xs text-white/75 leading-relaxed">
              Bespoke luxury makeup artistry designed with precision and passion in Kigali, Rwanda. Your signature look for life's unforgettable events.
            </p>
          </div>

          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-gold mb-4">Quick Navigation</p>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#" className="hover:text-gold-light transition-colors">Home Studio</a></li>
              <li><a href="#services" className="hover:text-gold-light transition-colors">Artistry Services</a></li>
              <li><a href="#portfolio" className="hover:text-gold-light transition-colors">Masterpieces Gallery</a></li>
              <li><a href="#booking" className="hover:text-gold-light transition-colors">Book Look</a></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-gold mb-4">Social Showcase</p>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="https://instagram.com/hosiane78" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs">camera</span> @hosiane78
              </a></li>
              <li><a href="https://wa.me/250786515208" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs">chat</span> WhatsApp Chat
              </a></li>
              <li><a href="mailto:hello@hosiane.com" className="hover:text-gold-light transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs">mail</span> hello@hosiane.com
              </a></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-gold mb-4">Studio Location</p>
            <div className="h-28 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden select-none hover:border-gold/50 transition-colors">
              <div className="text-center">
                <span className="material-symbols-outlined text-gold animate-bounce">location_on</span>
                <p className="text-xs font-bold uppercase tracking-widest text-white mt-1">Kigali, Rwanda</p>
                <p className="text-[10px] text-white/50">Gishushu Luxury Ave</p>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/60 font-medium">
          <p>© 2026 Hosiane Makeup Artistry. Created with absolute elegance.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Privacy Shield</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating interactive action badges */}
      <aside className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-30">
        {/* WhatsApp Link button */}
        <a 
          href="https://wa.me/250786515208" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-primary text-on-primary p-4 rounded-full shadow-[0_10px_30px_rgba(109,0,25,0.2)] hover:scale-110 hover:shadow-xl transition-all duration-300 active:scale-95 group relative border border-gold/20"
          id="floating-whatsapp-btn"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-primary text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            WhatsApp Hosiane
          </span>
        </a>

        {/* Scroll up button */}
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary border border-outline-variant p-4 rounded-full shadow-[0_10px_30px_rgba(109,0,25,0.1)] hover:scale-110 hover:shadow-xl transition-all duration-300 active:scale-95"
            id="floating-scroll-up-btn"
          >
            <span className="material-symbols-outlined text-2xl">arrow_upward</span>
          </button>
        )}
      </aside>

      {/* Lightbox / Detail view model */}
      {activeLightboxItem && (
        <div className="fixed inset-0 bg-primary/45 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto" id="lightbox-modal">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative p-6">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
              id="close-lightbox"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-outline-variant/30">
                <img 
                  src={activeLightboxItem.image} 
                  alt={activeLightboxItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs pr-2">
                <div>
                  <span className="text-[10px] uppercase text-gold font-bold tracking-widest">{activeLightboxItem.category} Look</span>
                  <h3 className="font-serif text-2xl text-primary font-bold mt-1">{activeLightboxItem.title}</h3>
                </div>

                <p className="text-on-surface-variant leading-relaxed text-xs">
                  {activeLightboxItem.description}
                </p>

                {activeLightboxItem.artistQuote && (
                  <div className="bg-primary/5 p-3 rounded-xl border-l-2 border-gold italic text-[11px] text-primary">
                    "Artist Note: {activeLightboxItem.artistQuote}"
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setActiveLightboxItem(null);
                      const mappedSrv = services.find(s => s.category === activeLightboxItem.category) || services[0];
                      triggerServiceBooking(mappedSrv.id);
                    }}
                    className="flex-1 gold-gradient text-primary font-sans font-bold py-3.5 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
                    id="lightbox-book-btn"
                  >
                    Schedule This Style Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Wizard modal */}
      {isBookingOpen && (
        <BookingWizard 
          initialServiceId={preSelectedServiceId}
          onClose={() => {
            setIsBookingOpen(false);
            setPreSelectedServiceId(null);
          }}
          onBookingAdded={handleBookingAdded}
        />
      )}

      {/* Admin Portal modal */}
      {isAdminOpen && (
        <AdminPortal 
          bookings={bookings}
          services={services}
          portfolio={portfolio}
          testimonials={testimonials}
          onUpdateBookings={handleUpdateBookings}
          onUpdateServices={handleUpdateServices}
          onUpdatePortfolio={handleUpdatePortfolio}
          onUpdateTestimonials={handleUpdateTestimonials}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
