import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  pendingBookingsCount: number;
}

export default function Navbar({ onOpenBooking, onOpenAdmin, pendingBookingsCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glass-nav shadow-[0_10px_40px_rgba(109,0,25,0.05)] border-b border-outline-variant/10' 
          : 'py-5 bg-transparent'
      }`}
      id="main-nav-bar"
    >
      <nav className="flex justify-between items-center px-4 md:px-8 max-w-7xl mx-auto">
        <a href="#" className={`font-serif text-xl md:text-2xl font-bold flex items-center gap-1.5 transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`} id="brand-logo">
          <span>Hosiane</span>
          <span className="font-sans font-normal text-xs uppercase tracking-widest text-primary rose-gold-gradient px-2.5 py-0.5 rounded-full select-none">Makeup</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#services" className={`font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/85 hover:text-gold-light'}`}>
            Services
          </a>
          <a href="#portfolio" className={`font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/85 hover:text-gold-light'}`}>
            Portfolio
          </a>
          <a href="#about" className={`font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/85 hover:text-gold-light'}`}>
            About
          </a>

          {/* Artist Panel admin trigger — hidden from public navigation
          <button
            onClick={onOpenAdmin}
            className={`font-sans text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all relative border ${isScrolled ? 'text-primary hover:text-gold bg-gold/15 hover:bg-gold/25 border-gold/40' : 'text-white hover:text-gold-light bg-white/10 hover:bg-white/20 border-white/25'}`}
            id="nav-admin-trigger"
          >
            <span className="material-symbols-outlined text-[13px] animate-pulse">settings</span>
            Artist Panel
            {pendingBookingsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 rose-gold-gradient text-primary rounded-full px-1.5 py-0.5 text-[8px] font-bold shadow-md">
                {pendingBookingsCount}
              </span>
            )}
          </button>
          */}

          <button
            onClick={onOpenBooking}
            className="font-sans text-xs uppercase tracking-wider rose-gold-gradient text-primary px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-md font-bold"
            id="nav-booking-trigger"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile menu and booking action triggers */}
        <div className="flex md:hidden items-center gap-2">
          {/* Admin trigger (mobile) — hidden from public navigation
          <button
            onClick={onOpenAdmin}
            className={`font-sans text-[10px] uppercase font-bold px-2.5 py-1.5 rounded-full border flex items-center gap-1 relative transition-all ${isScrolled ? 'text-primary bg-gold/15 border-gold/40' : 'text-white bg-white/10 border-white/25'}`}
            id="nav-mobile-admin-trigger"
          >
            <span className="material-symbols-outlined text-xs animate-pulse">settings</span>
            Admin
            {pendingBookingsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 rose-gold-gradient text-primary rounded-full px-1.5 py-0.5 text-[8px] font-bold shadow-md">
                {pendingBookingsCount}
              </span>
            )}
          </button>
          */}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 focus:outline-none transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
            id="nav-mobile-hamburger"
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] inset-x-0 bg-surface-container-lowest border-b border-outline-variant/60 shadow-xl flex flex-col p-6 space-y-4 animate-fade-in z-30">
          <a 
            href="#services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface-variant hover:text-primary py-2 border-b border-outline-variant/30"
          >
            Services
          </a>
          <a 
            href="#portfolio" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface-variant hover:text-primary py-2 border-b border-outline-variant/30"
          >
            Portfolio
          </a>
          <a 
            href="#about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface-variant hover:text-primary py-2 border-b border-outline-variant/30"
          >
            About
          </a>

          <div className="flex flex-col gap-2 pt-4">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full font-sans text-xs uppercase tracking-wider bg-primary text-on-primary text-center py-3.5 rounded-full font-bold shadow-sm"
              id="mobile-nav-book-btn"
            >
              Book Online Look
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
