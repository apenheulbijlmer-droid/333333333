import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const { t } = useTranslation();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = React.useRef<HTMLButtonElement>(null);
  const lastFocusableElementRef = React.useRef<HTMLAnchorElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);
  const previousBodyOverflow = React.useRef<string>('');

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Save current body overflow and disable scrolling
      previousBodyOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      
      // Restore body overflow when modal closes
      if (isOpen) {
        document.body.style.overflow = previousBodyOverflow.current;
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen, onClose]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Check if content is scrollable to show indicators
  React.useEffect(() => {
    if (!contentRef.current) return;
    
    const checkScrollability = () => {
      const element = contentRef.current;
      if (element) {
        setShowScrollIndicator(element.scrollHeight > element.clientHeight);
      }
    };
    
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    
    return () => window.removeEventListener('resize', checkScrollability);
  }, [isOpen]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const firstFocusable = firstFocusableElementRef.current;
        const lastFocusable = lastFocusableElementRef.current;
        
        if (!firstFocusable || !lastFocusable) return;
        
        if (e.shiftKey && document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstFocusableElementRef.current?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-0 animate-fadeIn
                overflow-hidden overscroll-contain safe-area-inset px-2 sm:px-4"
      style={{ 
        '--tw-backdrop-blur': '8px',
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        animationDuration: '400ms'
      } as React.CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[var(--tw-backdrop-blur)] animate-backdropReveal" />
      
      <div
        ref={modalRef}
        className="relative w-full sm:w-[92%] md:w-[85%] max-w-[500px] mx-auto bg-[#1A1A1A] rounded-lg overflow-hidden
                   animate-modalSlideIn shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]
                   hover:shadow-[0_10px_40px_-12px_rgba(196,166,97,0.1)]
                   h-[95vh] sm:h-[85vh] flex flex-col
                   transition-shadow duration-500"
        aria-labelledby="modal-title"
      >
        {/* Fixed header with gold accent line */}
        <div className="sticky top-0 z-10 bg-[#1A1A1A] border-b border-[var(--gold)]/20">
          {/* Gold accent line at top */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C4A661] to-transparent opacity-80" />
          
          <div className="px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4 flex items-center justify-between relative">
            <h2
              id="modal-title"
              className="font-serif text-xl sm:text-2xl text-[#C4A661] text-center tracking-wide"
            >
              {t('reservation.title')}
            </h2>
            <button
              ref={firstFocusableElementRef}
              onClick={onClose}
              className="text-white/80 hover:text-white p-3 rounded-full
                       min-w-[3rem] min-h-[3rem] touch-manipulation
                       hover:bg-white/5 transition-all duration-300 ease-in-out hover:scale-105"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div 
          ref={contentRef}
          className="overflow-y-auto flex-1 scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--gold) rgba(0,0,0,0.3)',
            WebkitOverflowScrolling: 'touch',
            background: '#fff',
            height: 'calc(100% - 96px)'
          }}
        >
          <iframe 
            src="https://app.tableo.com/r/0TFNPQ1"
            width="100%"
            height="100%"
            style={{ 
              border: 'none',
              minHeight: '100%',
              display: 'block',
              width: '100%',
              height: '100%'
            }}
            referrerPolicy="unsafe-url"
            title="Reservation Widget"
            id="reservationFrame"
            ref={lastFocusableElementRef}
            loading="eager"
            allow="geolocation"
          />
        </div>

        {/* Gold accent line at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C4A661] to-transparent opacity-80 mt-auto" />
      </div>
    </div>
  );
}