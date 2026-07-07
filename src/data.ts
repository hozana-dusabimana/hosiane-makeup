import { MakeupService, ServiceAddOn, PortfolioItem, Testimonial, BeforeAfterLook } from './types';

export const INITIAL_SERVICES: MakeupService[] = [
  {
    id: 'srv-bridal',
    name: 'Bridal Artistry',
    category: 'Bridal',
    description: 'Timeless, elegant radiance engineered to stay flawless from the first tear to the late-night dance floor.',
    price: 10000,
    durationMinutes: 120,
    icon: 'Sparkles',
    features: [
      'Pre-wedding thorough skincare prep',
      'High-definition airbrush look',
      'Premium mink lash application',
      'Mini touch-up kit included'
    ]
  },
  {
    id: 'srv-grad',
    name: 'Graduation Glam',
    category: 'Graduation',
    description: 'Polished and sophisticated look tailored to stand out under stage lighting and pop in high-res photographs.',
    price: 10000,
    durationMinutes: 60,
    icon: 'GraduationCap',
    features: [
      'Photo-ready skin finish',
      'Flawless eye shadow contour',
      'Comfort-wear falsies',
      'Setting spray armor'
    ]
  },
  {
    id: 'srv-photo',
    name: 'Editorial Photoshoot',
    category: 'Photoshoot',
    description: 'High-definition, creative, or ultra-glam styling specifically adapted for studio strobes or outdoor natural lighting.',
    price: 10000,
    durationMinutes: 90,
    icon: 'Camera',
    features: [
      'Zero-flashback precision mapping',
      'High contrast feature sculpting',
      'Artistic color adjustments',
      'On-set emergency check support available'
    ]
  },
  {
    id: 'srv-home',
    name: 'Luxury Home Service',
    category: 'Home Service',
    description: 'A full-scale red carpet luxury beauty experience delivered in the safety and absolute comfort of your residence.',
    price: 10000,
    durationMinutes: 90,
    icon: 'Home',
    features: [
      'All premium luxury brands travel kit',
      'Professional ring-lighting setup',
      'No transport fee within Kigali limits',
      'Multi-person booking discounts'
    ]
  }
];

export const SERVICE_ADDONS: ServiceAddOn[] = [
  {
    id: 'add-lashes',
    name: 'Luxury 3D Silk Lashes Upgrade',
    price: 5000,
    description: 'Upgrade standard lashes to reusable ultra-fluffy multi-layered silk lashes.'
  },
  {
    id: 'add-trial',
    name: 'Comprehensive Trial Consultation',
    price: 15000,
    description: 'A dedicated 60-minute trial session ahead of your main event to lock in the perfect palette.'
  },
  {
    id: 'add-hair',
    name: 'Bridal Hair Styling Touch-up',
    price: 20000,
    description: 'Elegant soft curls, classy updo, or sleek styling to complement your makeup look.'
  },
  {
    id: 'add-glow',
    name: '24k Gold Serum Collagen Prep',
    price: 8000,
    description: 'Instantly plumps, hydrates, and adds a natural, dewy inner glow to your skin ahead of makeup.'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: 'Soft Rose Glam',
    category: 'Bridal',
    image: '/portfolio/glam-portrait.jpg',
    description: 'A radiant, natural-glam bridal look with rose-kissed lids, defined brows, and a luminous glossy lip.',
    artistQuote: 'Framed by warmth—soft rose golds bring out the gaze for an unforgettable, timeless portrait.'
  },
  {
    id: 'p-2',
    title: 'Editorial Brush Artistry',
    category: 'Editorial',
    image: '/portfolio/glam-brushes.jpg',
    description: 'High-fashion editorial glow featuring airbrushed skin, shimmering lids, and clean, minimalist brush work.',
    artistQuote: 'The focus here was minimalist majesty—highlighting skin health and bone structure with subtle warmth.'
  },
  {
    id: 'p-3',
    title: 'Studio Signature Look',
    category: 'Events',
    image: '/portfolio/hero-bridal.jpg',
    description: 'A polished, camera-ready event look with flawless coverage and a soft, glowing finish that lasts all night.',
    artistQuote: 'Designed for the spotlight—balanced, radiant, and sculpted to shine under any lighting.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sandra M.',
    role: 'Bridal Client',
    stars: 5,
    quote: 'Hosiane is a true wizard! She did my wedding makeup and I have never felt more breathtakingly beautiful. The look lasted beautifully for over 14 hours!',
    initials: 'SM',
    createdAt: '2026-05-12'
  },
  {
    id: 't-2',
    name: 'Jean K.',
    role: 'Graduation Client',
    stars: 5,
    quote: 'Absolutely perfect for my graduation photos. The makeup looked incredibly natural yet defined. It popped beautifully on camera without feeling heavy.',
    initials: 'JK',
    createdAt: '2026-06-20'
  },
  {
    id: 't-3',
    name: 'Aline L.',
    role: 'Red Carpet Event',
    stars: 5,
    quote: 'Amazing attention to detail. Hosiane maintained strict hygiene standards, sanitizing all tools in front of me, and listened precisely to what I wanted!',
    initials: 'AL',
    createdAt: '2026-07-01'
  }
];

export const BEFORE_AFTER_LOOKS: BeforeAfterLook[] = [
  {
    id: 'ba-bridal',
    title: 'Royal Bridal Transformation',
    description: 'Drag to reveal the color transformation—enhanced undertones, flawless coverage, and a gold-kissed glow.',
    // No bare-face source available: the "before" side shows the same photo styled
    // grayscale, so dragging reveals the full-color makeup artistry.
    beforeImage: '/portfolio/glam-portrait.jpg',
    afterImage: '/portfolio/glam-portrait.jpg'
  },
  {
    id: 'ba-sunset',
    title: 'Editorial Glam Reveal',
    description: 'Drag from a muted tone to the fully sculpted, shimmering editorial finish.',
    beforeImage: '/portfolio/glam-brushes.jpg',
    afterImage: '/portfolio/glam-brushes.jpg'
  }
];
