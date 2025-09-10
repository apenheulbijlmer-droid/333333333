import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check, Globe } from 'lucide-react';
import FocusTrap from './FocusTrap';

interface CenteredLanguageMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CenteredLanguageMenu({ isOpen, onClose }: CenteredLanguageMenuProps) {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    { code: 'nl', name: t('languages.nl'), flag: '🇳🇱' },
    { code: 'en', name: t('languages.en'), flag: '🇬🇧' },
    { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
    { code: 'tr', name: t('languages.tr'), flag: '🇹🇷' },
    { code: 'ar', name: t('languages.ar'), flag: '🇦🇪' }
  ];

  const handleLanguageChange = async (langCode: string) => {
    if (isLoading || i18n.language === langCode) return;
    
    setIsLoading(true);
    setError(null);
    setIsAnimating(true);
    
    try {
      // Update the document direction before changing language to minimize flicker
      document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = langCode;
      
      // Add a class to trigger opacity transition
      document.body.classList.add('language-transition');
      
      // Change the language
      await i18n.changeLanguage(langCode);
      
      // Brief delay to allow for visual feedback
      setTimeout(() => {
        document.body.classList.remove('language-transition');
        setIsAnimating(false);
        onClose();
      }, 300);
    } catch (err) {
      setError(t('languages.error'));
      console.error('Language change failed:', err);
      document.body.classList.remove('language-transition');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Focus the close button when menu opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!isAnimating) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose, isAnimating]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isAnimating) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, isAnimating]);

  if (!isOpen) return null;

  return (
    <FocusTrap>
      <div 
        className="fixed inset-0 z-[200] flex items-center justify-center language-menu-overlay"
        aria-modal="true"
        role="dialog"
        aria-labelledby="language-menu-title"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={() => !isAnimating && onClose()}
        />
        
        {/* Menu container */}
        <div 
          ref={containerRef}
          className="relative w-[90%] max-w-xs mx-auto bg-black/95 border border-[var(--gold)]/80 
                   rounded-xl shadow-xl animate-zoomIn overflow-visible
                   transform-gpu safe-area-inset"
          style={{
            maxHeight: 'min(32rem, 80vh)',
            boxShadow: '0 0 1.5rem rgba(0,0,0,0.5), 0 0 0.5rem rgba(181,153,92,0.3)'
          }}
        >
          {/* Gold accent lines */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)]/20 to-transparent opacity-80" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)]/20 to-transparent opacity-80" />
          
          {/* Title */}
          <div className="p-5 text-center border-b border-[var(--gold)]/20 relative">
            <h2 
              id="language-menu-title"
              className="text-[var(--gold)] font-serif text-xl"
            >
              {t('languages.selectLanguage')}
            </h2>
            
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={() => !isAnimating && onClose()}
              className="absolute top-3 right-3 text-white/80 hover:text-white p-3 
                       rounded-full min-w-[3rem] min-h-[3rem] touch-manipulation
                       hover:bg-white/10 transition-all duration-300 z-[2]"
              aria-label={t('languages.close')}
              disabled={isAnimating}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Language options */}
          <div 
            className="p-3 overflow-y-auto language-menu-content"
            style={{
              scrollSnapType: 'y proximity',
              scrollPadding: '0.5rem'
            }}
          >
            <div className="grid gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isLoading || i18n.language === lang.code || isAnimating}
                  className={`flex items-center justify-between w-full text-left px-5 py-4
                            rounded-lg text-base font-medium min-h-[3.5rem] transition-all duration-300
                            scroll-snap-align-start
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--gold)]/10 active:bg-[var(--gold)]/20'}
                            ${i18n.language === lang.code 
                              ? 'bg-[var(--gold)]/20 text-[var(--gold)]' 
                              : 'text-white'}`}
                  aria-current={i18n.language === lang.code ? 'true' : 'false'}
                  dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  
                  {lang.code === i18n.language && (
                    <Check size={18} className="text-[var(--gold)]" />
                  )}
                </button>
              ))}
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-900/50 text-red-200 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}