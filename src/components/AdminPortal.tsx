import React, { useState, useEffect } from 'react';
import { Booking, MakeupService, PortfolioItem, Testimonial } from '../types';
import { SERVICE_ADDONS } from '../data';

interface AdminPortalProps {
  bookings: Booking[];
  services: MakeupService[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  onUpdateBookings: (list: Booking[]) => void;
  onUpdateServices: (list: MakeupService[]) => void;
  onUpdatePortfolio: (list: PortfolioItem[]) => void;
  onUpdateTestimonials: (list: Testimonial[]) => void;
  onClose: () => void;
}

export default function AdminPortal({
  bookings,
  services,
  portfolio,
  testimonials,
  onUpdateBookings,
  onUpdateServices,
  onUpdatePortfolio,
  onUpdateTestimonials,
  onClose,
}: AdminPortalProps) {
  const [tab, setTab] = useState<'appointments' | 'services' | 'portfolio' | 'reviews'>('appointments');

  // Service Price Update State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  // Portfolio Item Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Bridal' | 'Editorial' | 'Events'>('Bridal');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [portfolioSuccessMsg, setPortfolioSuccessMsg] = useState('');

  // Calculations
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingRevenue = bookings
    .filter(b => b.status === 'Pending')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const totalBookingsCount = bookings.length;

  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    onUpdateBookings(updated);
    localStorage.setItem('hosiane_bookings', JSON.stringify(updated));
  };

  const handleSavePrice = (id: string) => {
    const updated = services.map(s => {
      if (s.id === id) {
        return { ...s, price: editPrice };
      }
      return s;
    });
    onUpdateServices(updated);
    localStorage.setItem('hosiane_services', JSON.stringify(updated));
    setEditingServiceId(null);
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImage.trim() || !newDesc.trim()) {
      alert('Please fill out Title, Image URL, and Description.');
      return;
    }

    const newItem: PortfolioItem = {
      id: `p-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      image: newImage,
      description: newDesc,
      artistQuote: newQuote || undefined,
    };

    const updated = [newItem, ...portfolio];
    onUpdatePortfolio(updated);
    localStorage.setItem('hosiane_portfolio', JSON.stringify(updated));

    // Reset Form
    setNewTitle('');
    setNewImage('');
    setNewDesc('');
    setNewQuote('');
    setPortfolioSuccessMsg('Gorgeous masterpiece added successfully!');
    setTimeout(() => setPortfolioSuccessMsg(''), 4000);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to delete this booking record?')) {
      const updated = bookings.filter(b => b.id !== id);
      onUpdateBookings(updated);
      localStorage.setItem('hosiane_bookings', JSON.stringify(updated));
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to hide or delete this review?')) {
      const updated = testimonials.filter(t => t.id !== id);
      onUpdateTestimonials(updated);
      localStorage.setItem('hosiane_testimonials', JSON.stringify(updated));
    }
  };

  return (
    <div className="bg-primary/95 text-on-primary fixed inset-0 z-50 overflow-y-auto p-4 md:p-10 backdrop-blur-lg flex items-center justify-center">
      <div className="bg-surface-container-low text-primary border border-outline-variant rounded-[2.5rem] w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col h-[90vh] md:h-[80vh]">
        {/* Header */}
        <div className="bg-primary text-on-primary px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gold animate-spin-slow">settings</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold">Hosiane Studio Workspace</span>
            </div>
            <h2 className="font-serif text-2xl font-bold mt-1 text-white">Artist Admin Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all text-white"
            id="close-admin-panel"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Live Metrics Ribbons */}
        <div className="bg-surface border-b border-outline-variant/30 grid grid-cols-2 md:grid-cols-4 px-8 py-4 gap-4 text-center">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant font-semibold tracking-wider">Confirmed Revenue</p>
            <p className="text-xl font-serif font-bold text-primary mt-1">{totalRevenue.toLocaleString()} RWF</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant font-semibold tracking-wider">Pending Orders</p>
            <p className="text-xl font-serif font-bold text-gold mt-1">{pendingRevenue.toLocaleString()} RWF</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant font-semibold tracking-wider">Total Bookings</p>
            <p className="text-xl font-serif font-bold text-primary mt-1">{totalBookingsCount}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant font-semibold tracking-wider">Published Portfolio</p>
            <p className="text-xl font-serif font-bold text-primary mt-1">{portfolio.length} Looks</p>
          </div>
        </div>

        {/* Body grid with sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Admin Sidebar Navigation */}
          <div className="md:w-64 bg-surface-container border-r border-outline-variant/20 flex flex-row md:flex-col p-4 gap-2 overflow-x-auto md:overflow-y-auto shrink-0">
            <button
              onClick={() => setTab('appointments')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold w-full whitespace-nowrap transition-all ${
                tab === 'appointments'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
              id="admin-tab-appointments"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              Appointments
              {bookings.filter(b => b.status === 'Pending').length > 0 && (
                <span className="ml-auto bg-gold text-primary rounded-full px-2 py-0.5 text-[9px] font-bold">
                  {bookings.filter(b => b.status === 'Pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setTab('services')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold w-full whitespace-nowrap transition-all ${
                tab === 'services'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
              id="admin-tab-services"
            >
              <span className="material-symbols-outlined text-sm">payments</span>
              Service Pricing
            </button>

            <button
              onClick={() => setTab('portfolio')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold w-full whitespace-nowrap transition-all ${
                tab === 'portfolio'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
              id="admin-tab-portfolio"
            >
              <span className="material-symbols-outlined text-sm">image</span>
              Add Portfolio Look
            </button>

            <button
              onClick={() => setTab('reviews')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold w-full whitespace-nowrap transition-all ${
                tab === 'reviews'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`}
              id="admin-tab-reviews"
            >
              <span className="material-symbols-outlined text-sm">reviews</span>
              Moderate Reviews
              {testimonials.length > 0 && (
                <span className="ml-auto bg-primary-light text-white rounded-full px-2 py-0.5 text-[9px] font-bold">
                  {testimonials.length}
                </span>
              )}
            </button>
          </div>

          {/* Main Panel Content Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest">
            {/* TAB 1: APPOINTMENTS */}
            {tab === 'appointments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-primary font-bold">Appointment Agenda</h3>
                  <p className="text-xs text-on-surface-variant">Review, confirm, or modify booked clients in Kigali.</p>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-12 bg-surface rounded-2xl border border-dashed border-outline-variant">
                    <span className="material-symbols-outlined text-5xl text-outline-variant">calendar_today</span>
                    <p className="text-sm font-semibold text-primary mt-2">No Appointments Logged Yet</p>
                    <p className="text-xs text-on-surface-variant mt-1">Bookings submitted via the frontend will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map(booking => (
                      <div 
                        key={booking.id}
                        className="bg-surface border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs shadow-sm hover:shadow-md transition-shadow"
                        id={`admin-booking-item-${booking.id}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-primary">{booking.clientName}</span>
                            <span className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-semibold">
                              {booking.serviceName}
                            </span>
                            <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-on-surface-variant">
                            <strong>Date/Time:</strong> {booking.date} @ {booking.timeSlot}
                          </p>
                          <p className="text-on-surface-variant">
                            <strong>Contact:</strong> {booking.clientPhone} | {booking.clientEmail}
                          </p>
                          {booking.addOnIds.length > 0 && (
                            <p className="text-[11px] text-primary">
                              <strong>Add-ons:</strong> {booking.addOnIds.map(aid => SERVICE_ADDONS.find(a => a.id === aid)?.name).join(', ')}
                            </p>
                          )}
                          {booking.notes && (
                            <p className="text-[11px] text-on-surface-variant italic mt-1 bg-surface-container-low p-2 rounded">
                              "Notes: {booking.notes}"
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 items-center self-stretch md:self-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                          <span className="font-bold text-sm text-gold mr-2">{booking.totalPrice.toLocaleString()} RWF</span>
                          
                          {booking.status === 'Pending' && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}
                              className="bg-green-600 text-white font-sans font-bold px-3 py-1.5 rounded-lg text-[10px] hover:bg-green-700 transition-all"
                              id={`btn-approve-${booking.id}`}
                            >
                              Confirm
                            </button>
                          )}

                          {booking.status === 'Confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'Completed')}
                              className="bg-blue-600 text-white font-sans font-bold px-3 py-1.5 rounded-lg text-[10px] hover:bg-blue-700 transition-all"
                              id={`btn-complete-${booking.id}`}
                            >
                              Complete
                            </button>
                          )}

                          {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'Cancelled')}
                              className="border border-red-200 text-red-600 font-sans px-3 py-1.5 rounded-lg text-[10px] hover:bg-red-50 transition-all"
                              id={`btn-cancel-${booking.id}`}
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-on-surface-variant hover:text-red-700 p-1.5 rounded transition-colors"
                            id={`btn-delete-${booking.id}`}
                            title="Delete Record"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SERVICES & PRICING */}
            {tab === 'services' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-primary font-bold">Base Service Catalog Pricing</h3>
                  <p className="text-xs text-on-surface-variant">Update service prices instantly. Changes flow live directly to client portals.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {services.map(srv => (
                    <div 
                      key={srv.id}
                      className="bg-surface border border-outline-variant rounded-xl p-5 flex justify-between items-center text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-serif font-bold text-sm text-primary">{srv.name}</p>
                        <p className="text-on-surface-variant">{srv.description}</p>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-wider">{srv.category}</p>
                      </div>

                      <div className="text-right flex items-center gap-4">
                        {editingServiceId === srv.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                              className="w-24 bg-surface-container-lowest border border-outline p-1 rounded text-center text-xs text-primary"
                              id={`input-edit-price-${srv.id}`}
                            />
                            <span className="font-bold text-primary text-xs">RWF</span>
                            <button 
                              onClick={() => handleSavePrice(srv.id)}
                              className="bg-primary text-on-primary font-bold px-2.5 py-1 rounded hover:opacity-90"
                              id={`btn-save-price-${srv.id}`}
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => setEditingServiceId(null)}
                              className="text-on-surface-variant"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-serif font-bold text-primary">{srv.price.toLocaleString()} RWF</span>
                            <button
                              onClick={() => {
                                setEditingServiceId(srv.id);
                                setEditPrice(srv.price);
                              }}
                              className="border border-outline-variant text-primary hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-lg text-[10px] transition-all font-semibold"
                              id={`btn-edit-price-trigger-${srv.id}`}
                            >
                              Change Price
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PORTFOLIO WRITER */}
            {tab === 'portfolio' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-primary font-bold">Add New Masterpiece</h3>
                  <p className="text-xs text-on-surface-variant">Inject a luxury portrait look directly into the responsive portfolio gallery.</p>
                </div>

                {portfolioSuccessMsg && (
                  <div className="bg-green-100 border border-green-300 text-green-800 text-xs rounded-xl p-4 font-bold">
                    {portfolioSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleAddPortfolio} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-primary">Masterpiece Title</label>
                      <input 
                        type="text" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Royal Gold Radiance"
                        className="w-full bg-surface border border-outline-variant rounded-xl p-3"
                        id="input-portfolio-title"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-primary">Category</label>
                      <select 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-surface border border-outline-variant rounded-xl p-3"
                        id="input-portfolio-category"
                      >
                        <option value="Bridal">Bridal Look</option>
                        <option value="Editorial">Editorial Look</option>
                        <option value="Events">Special Event</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-primary">Hotlink Image URL</label>
                    <input 
                      type="url" 
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3"
                      id="input-portfolio-image"
                      required
                    />
                    <span className="text-[10px] text-on-surface-variant italic">Tip: You can use any Unsplash or direct image URL.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-primary">Artistry Details</label>
                    <textarea 
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Describe the styling techniques, palette, and overall artistic theme..."
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3 h-20"
                      id="input-portfolio-desc"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-primary">Artist's Quote (Optional)</label>
                    <input 
                      type="text" 
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      placeholder="e.g. 'We blended warm bronzers to reflect golden hour glow...'"
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3"
                      id="input-portfolio-quote"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="gold-gradient text-primary font-sans font-bold py-3.5 px-8 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                    id="submit-portfolio-btn"
                  >
                    Add Masterpiece Look
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: MODERATE TESTIMONIALS */}
            {tab === 'reviews' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-primary font-bold">Moderate Client Feedback</h3>
                  <p className="text-xs text-on-surface-variant">Review newly submitted client testimonials before or after publishing.</p>
                </div>

                <div className="space-y-3">
                  {testimonials.map(testimonial => (
                    <div 
                      key={testimonial.id}
                      className="bg-surface border border-outline-variant rounded-xl p-4 flex justify-between items-start text-xs"
                      id={`moderation-review-${testimonial.id}`}
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{testimonial.name}</span>
                          <span className="text-xs text-on-surface-variant font-medium">({testimonial.role})</span>
                          <div className="flex text-gold">
                            {Array.from({ length: testimonial.stars }).map((_, i) => (
                              <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-on-surface-variant italic font-serif mt-1">"{testimonial.quote}"</p>
                        <span className="text-[10px] text-outline text-right block mt-1">Submitted on {testimonial.createdAt}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="text-on-surface-variant hover:text-red-700 p-2 rounded transition-all"
                        id={`delete-review-btn-${testimonial.id}`}
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
