import { MakeupService, ServiceAddOn, PortfolioItem, Testimonial, BeforeAfterLook } from './types';

export const INITIAL_SERVICES: MakeupService[] = [
  {
    id: 'srv-bridal',
    name: 'Bridal Artistry',
    category: 'Bridal',
    description: 'Timeless, elegant radiance engineered to stay flawless from the first tear to the late-night dance floor.',
    price: 150,
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
    price: 80,
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
    price: 100,
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
    price: 120,
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
    price: 15,
    description: 'Upgrade standard lashes to reusable ultra-fluffy multi-layered silk lashes.'
  },
  {
    id: 'add-trial',
    name: 'Comprehensive Trial Consultation',
    price: 45,
    description: 'A dedicated 60-minute trial session ahead of your main event to lock in the perfect palette.'
  },
  {
    id: 'add-hair',
    name: 'Bridal Hair Styling Touch-up',
    price: 50,
    description: 'Elegant soft curls, classy updo, or sleek styling to complement your makeup look.'
  },
  {
    id: 'add-glow',
    name: '24k Gold Serum Collagen Prep',
    price: 20,
    description: 'Instantly plumps, hydrates, and adds a natural, dewy inner glow to your skin ahead of makeup.'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: 'Editorial Glow',
    category: 'Editorial',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFyRitHzsgYDD8loJvtsKeA-J_cMAUonbWy0EsSZKG5Ncc7HbG2XLA3LW-MzaodxqZ_1Jv_VxO2NNY_kqSV7OA4kD1H45h9LZwOMp0_vvCipSP61jltmeaXa19d0gMeDvdrI5lLSa1prs0qINe7Ym024WaF_bZ8CWS9iQGO6z6nyhzSHhg3f9Jp1ZpqalVxIEUmxhMYW1ozccTkSFIA0kX4cFO5Yh94q0spKNCBeo6df9e58sgmZAO_rC34bEq6hjBCEa4NFmicpo',
    description: 'A radiant, high-fashion glow featuring soft, airbrushed skin with clean, minimalist brush work.',
    artistQuote: 'The focus here was minimalist majesty—highlighting skin health and bone structure with subtle warmth.'
  },
  {
    id: 'p-2',
    title: 'Delicate Rose Shimmer',
    category: 'Bridal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNU-RKHuYYpvHoassurDF8vO5jcYyiModsb4xuyDJuzV27fQrNJIhz38AjzwVP1lFqX71zrDve0JsDAflSIR1TQHk5MU3kXpzfmIIXMrsoF7tfrNy-Tn8dEulVBs9aC_GFu1FWq3rzEoJGKXvXPx-_TfdG_6fmNmr-igYYHXG5843gj40zwKFLC1Pl29s7HWKjI7Y6p_xlc7rXmKhnSRddoL-pPT9XAZqaFcPIEdcZhKg4jbcRbRmbZyuK0sygl1VDljY3X2F7HQ',
    description: 'Close-up artistry showcasing rose and shimmering gold shadow, blended to perfection for a soft wedding look.',
    artistQuote: 'A delicate palette of warm rose golds brings out the gaze, creating an unforgettable timeless portrait.'
  },
  {
    id: 'p-3',
    title: 'Sultry Sunset Evening Glam',
    category: 'Events',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuFpBeVBNC4Prc_ArY53zaV8itSMxGqyOGvn5IYeOJns-iwIsHE6VEzZqob5EoN6M2SMxwF6h_M-hnrOnFyDRT9zFMcCy0SG0-feBWD-7DerjuZB7gQDK3Sq05qOQwgTgJrJpj_PNnDnIYbrSXXGazQRJ7nr9FlXyOPg5GT7ScPs3jMZNC_mgUe5EGnKQRDqwO7lcfOXzfLuXvA-pZ763XTJdDOdwWoP1rKlILZdZePsAEwCBcU3soyQMO0gEyyA0FB8uEDlEVO1I',
    description: 'Stunning evening look with a bold sunset lip, sharp cut crease, and shimmering smokey highlights.',
    artistQuote: 'Designed for candlelight and city lights, pairing a deep, rich lip with a gold-kissed lid.'
  },
  {
    id: 'p-4',
    title: 'Golden Hour Radiance',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    description: 'Flawless warm-toned contour paired with a glossy bronze lip for summer weddings.',
    artistQuote: 'A celebration of natural features bathed in golden-hour warmth.'
  },
  {
    id: 'p-5',
    title: 'Classic Red-Lip Couture',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
    description: 'High-contrast matte red lips with satin-finish skin and sharp winged eyeliner.',
    artistQuote: 'Couture elegance is a dialogue between precision lines and bold color statements.'
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
    description: 'Enhancing undertones with premium airbrush hydration, flawless coverage, and a gold-kissed glow.',
    // Using high resolution portfolio items as after image, and styled greyed-out for before
    beforeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFyRitHzsgYDD8loJvtsKeA-J_cMAUonbWy0EsSZKG5Ncc7HbG2XLA3LW-MzaodxqZ_1Jv_VxO2NNY_kqSV7OA4kD1H45h9LZwOMp0_vvCipSP61jltmeaXa19d0gMeDvdrI5lLSa1prs0qINe7Ym024WaF_bZ8CWS9iQGO6z6nyhzSHhg3f9Jp1ZpqalVxIEUmxhMYW1ozccTkSFIA0kX4cFO5Yh94q0spKNCBeo6df9e58sgmZAO_rC34bEq6hjBCEa4NFmicpo',
    afterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkKv02r5TSthMJ6JAWZBI8vwvXW3s14eYJr3RpQXdpick-ChLCUk6NCPy3hKt6yOQEclwkwDZSjWWPHU-oWDfiXx0L6OnKkp-Do_BTNeUiVhZJ6Y5R03gCeLVMalOZfKPLasylk_niAHg1uLgvoEonyI7LjqmdMF8ogpHpyF8GW62ZOf7ArMeQazsnPP-szUA1sl2wH6hHcx1iigH9RrC8Bq0tOM6p7zkDtJqJOzZTy5cup8wl4zgimxBksteuRDD6saTcHBulnM8'
  },
  {
    id: 'ba-sunset',
    title: 'Sultry Sunset Glam',
    description: 'Moving from a bare natural base to a highly sculpted, dramatic sunset cut crease.',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuFpBeVBNC4Prc_ArY53zaV8itSMxGqyOGvn5IYeOJns-iwIsHE6VEzZqob5EoN6M2SMxwF6h_M-hnrOnFyDRT9zFMcCy0SG0-feBWD-7DerjuZB7gQDK3Sq05qOQwgTgJrJpj_PNnDnIYbrSXXGazQRJ7nr9FlXyOPg5GT7ScPs3jMZNC_mgUe5EGnKQRDqwO7lcfOXzfLuXvA-pZ763XTJdDOdwWoP1rKlILZdZePsAEwCBcU3soyQMO0gEyyA0FB8uEDlEVO1I'
  }
];
