import { useState, useRef, useEffect } from 'react';
import { BEFORE_AFTER_LOOKS } from '../data';

export default function BeforeAfterSlider() {
  const [activeLookIdx, setActiveLookIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const look = BEFORE_AFTER_LOOKS[activeLookIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="bg-surface border border-outline-variant rounded-[2rem] p-6 md:p-8 shadow-md" id="before-after-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold">Interactive Experience</span>
          <h3 className="font-serif text-2xl text-primary font-bold">{look.title}</h3>
          <p className="font-sans text-sm text-on-surface-variant max-w-md mt-1">{look.description}</p>
        </div>
        <div className="flex bg-surface-container p-1 rounded-full gap-2 self-start md:self-center">
          {BEFORE_AFTER_LOOKS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveLookIdx(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeLookIdx === idx
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`}
              id={`look-btn-${item.id}`}
            >
              {idx === 0 ? 'Bridal Look' : 'Editorial Glam'}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-outline-variant"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (Full Color, Right side by default) */}
        <img
          src={look.afterImage}
          alt={`${look.title} after professional makeup`}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Before Image — same full-size layer, clipped to the left of the slider.
            clip-path keeps it pixel-aligned with the After image at any width. */}
        <img
          src={look.beforeImage}
          alt={`${look.title} before makeup`}
          className="absolute inset-0 w-full h-full object-cover object-center grayscale pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        {/* Sliding Divider Bar */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Drag Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-outline-variant rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-40 text-primary">
            <span className="material-symbols-outlined text-sm font-bold select-none">unfold_more</span>
          </div>

          {/* Labels on the left and right */}
          <span className="absolute bottom-4 right-4 bg-primary/75 text-on-primary text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full backdrop-blur-sm z-20">
            After
          </span>
          <span className="absolute bottom-4 left-4 -translate-x-full -ml-8 bg-black/50 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full backdrop-blur-sm z-20">
            Before
          </span>
        </div>
      </div>
      <p className="text-center font-sans text-xs text-on-surface-variant mt-4 italic">
        Drag the luxury dial to reveal the meticulous detail of Hosiane's custom artistry.
      </p>
    </div>
  );
}
