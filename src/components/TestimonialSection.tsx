import React, { useState } from 'react';
import { Testimonial } from '../types';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: (newTestimony: Testimonial) => void;
}

export default function TestimonialSection({ testimonials, onAddTestimonial }: TestimonialSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Bridal Client');
  const [stars, setStars] = useState(5);
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      alert('Please provide your name and some words about your look.');
      return;
    }

    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'CL';

    const newTestimony: Testimonial = {
      id: `t-${Date.now()}`,
      name,
      role,
      stars,
      quote,
      initials,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddTestimonial(newTestimony);

    const saved = localStorage.getItem('hosiane_testimonials');
    const list: Testimonial[] = saved ? JSON.parse(saved) : [];
    list.unshift(newTestimony);
    localStorage.setItem('hosiane_testimonials', JSON.stringify(list));

    setSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setSubmitted(false);
      setName('');
      setRole('Bridal Client');
      setStars(5);
      setQuote('');
    }, 2500);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold">Unforgettable Experiences</span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mt-1">Client Love &amp; Stories</h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2">
            Read stories of transformation, confidence, and bespoke luxury from women who chose Hosiane Makeup.
          </p>
        </div>
        <button
          onClick={() => setShowReviewForm(true)}
          className="border border-primary text-primary hover:bg-primary hover:text-on-primary px-8 py-4 rounded-full text-xs font-semibold tracking-wider hover:scale-105 active:scale-95 transition-all shrink-0"
          id="write-review-btn"
        >
          Share Your Look Experience
        </button>
      </div>

      {/* Review Slider/Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white border border-outline-variant rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            id={`testimonial-card-${test.id}`}
          >
            {/* Ambient luxury double quotation marks behind testimony */}
            <span className="absolute -top-4 -right-2 text-primary/5 font-serif text-9xl select-none pointer-events-none font-bold">
              ”
            </span>

            <div>
              {/* Stars indicator */}
              <div className="flex text-gold mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: i < test.stars ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-serif italic text-primary text-base md:text-lg mb-6 leading-relaxed">
                "{test.quote}"
              </p>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className="w-11 h-11 bg-primary/5 text-primary rounded-full flex items-center justify-center font-bold text-xs select-none">
                {test.initials}
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-primary">{test.name}</p>
                <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">{test.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal Form */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all duration-300"
              id="close-review-form"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-primary font-bold">Review Published!</h3>
                  <p className="text-xs text-on-surface-variant mt-2 max-w-xs mx-auto">
                    Your glowing feedback has been logged. Thank you for celebrating your artistry look with Hosiane.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-gold tracking-widest font-bold">Feedback</span>
                  <h3 className="font-serif text-xl text-primary font-bold mt-1">Share Your Transformation Look</h3>
                  <p className="text-[11px] text-on-surface-variant">We'd love to hear how your makeup made you feel!</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-bold text-primary">Your Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sandra Munyana"
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm text-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      id="review-input-name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-primary">Event / Look Type</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-xs text-primary"
                        id="review-input-role"
                      >
                        <option value="Bridal Client">Bridal Look</option>
                        <option value="Graduation Client">Graduation Glam</option>
                        <option value="Event Client">Special Event</option>
                        <option value="Photoshoot Client">Editorial Shoot</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-primary">Star Rating</label>
                      <div className="flex gap-1 py-2" id="review-stars-selector">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() => setStars(starValue)}
                            className="text-gold focus:outline-none transition-transform active:scale-90"
                            id={`star-btn-${starValue}`}
                          >
                            <span
                              className="material-symbols-outlined text-2xl"
                              style={{ fontVariationSettings: starValue <= stars ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              star
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-primary">Your Testimony</label>
                    <textarea
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Describe how the makeup felt, how long it lasted, and your experience working with Hosiane..."
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3 h-24 text-xs text-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      id="review-input-quote"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-sans font-bold py-3.5 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                  id="submit-review-btn"
                >
                  Publish My Testimony
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
