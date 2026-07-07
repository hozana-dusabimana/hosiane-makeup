export interface MakeupService {
  id: string;
  name: string;
  category: 'Bridal' | 'Graduation' | 'Photoshoot' | 'Home Service' | 'Special Event';
  description: string;
  price: number;
  durationMinutes: number;
  icon: string; // lucide icon name
  features: string[];
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  addOnIds: string[];
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  totalPrice: number;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Editorial' | 'Events';
  image: string;
  description: string;
  artistQuote?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  initials: string;
  createdAt: string;
}

export interface BeforeAfterLook {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}
