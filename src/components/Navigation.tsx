import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import OrderButton from './OrderButton';
import { useScroll } from '../hooks/useScroll';
import { ReservationContext } from './Layout';

export default function Navigation() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isScrolled } = useScroll({ threshold: 50 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { setIsReservationModalOpen } = React.useContext(ReservationContext);
  const [menuItemsVisible, setMenuItemsVisible] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Minimum swipe distance for closing menu (in px)
  const minSwipeDistance = 50;

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle menu animations
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      const timer = setTimeout(() => setMenuItemsVisible(true), 150);
      return () => clearTimeout(timer);
    }
    setMenuItemsVisible(false);
  }, [isMobileMenuOpen]);

  // Handle touch events for swipe gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe) {
      setIsMobileMenuOpen(false);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Get navigation items
  const getNavItems = () => {
    // Base navigation items
    const baseItems = [
      { 
        to: '/', 
        text: t('nav.home'),
        onClick: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      { 
        to: '/menu', 
        text: t('nav.menu'),
        onClick: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      { 
        to: '/over-ons', 
        text: 'Over Ons',
        onClick: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      { to: '/#location', text: 'Locatie' },
      { to: '/#contact', text: t('nav.contact') }
    ];

    // For menu page, split the items to insert the reservation button in the middle
    if (location.pathname === '/menu') {
      // For menu page, return first half of items, then second half after rendering the reserve button
      return { 
        firstHalf: baseItems.slice(0, Math.ceil(baseItems.length / 2)),
        secondHalf: baseItems.slice(Math.ceil(baseItems.length / 2))
      };
    }

    // For other pages, return all items
    return { firstHalf: baseItems, secondHalf: [] };
  };

  const navItems = getNavItems();

  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm py-3 sm:py-4 shadow-lg' : 'bg-transparent py-4 sm:py-6'
    } safe-area-inset will-change-transform`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-[var(--gold)] text-3xl font-serif tracking-wider hover:scale-105 transition-transform duration-300"
          aria-label="Manhattan Food & Drinks Home"
        >
          M
        </Link>
        
        {/* Mobile Menu Button - shown at lg breakpoint */}
        <div className="lg:hidden flex items-center">
          <button 
            className="text-[var(--gold)]"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div 
              className="p-3 hover:bg-white/5 rounded-lg transition-all duration-300 min-w-[3rem] min-h-[3rem]
                         flex items-center justify-center group"
              onClick={() => setIsMobileMenuOpen(true)}
              role="button"
            >
              <Menu
                size={28}
                strokeWidth={2.5}
                className="transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {/* Navigation items */}
          {navItems.firstHalf.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={(e) => {
                if (item.to.startsWith('/#')) {
                  e.preventDefault();
                  const isContactOrLocation = item.to === '/#contact' || item.to === '/#location';
                  if (isContactOrLocation) {
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: 'smooth'
                    });
                  }
                } else if (item.onClick) {
                  item.onClick();
                }
              }}
              className={`hover:text-[var(--gold)] transition-all duration-300 hover:scale-105 px-2 py-2 min-h-[3rem] flex items-center whitespace-nowrap ${
                isActive(item.to) ? 'text-[var(--gold)]' : 'text-white'
              }`}
            >
              {item.text}
            </Link>
          ))}

          {/* Second half of navigation items (only for menu page) */}
          {navItems.secondHalf.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={(e) => {
                if (item.to.startsWith('/#')) {
                  e.preventDefault();
                  const isContactOrLocation = item.to === '/#contact' || item.to === '/#location';
                  if (isContactOrLocation) {
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: 'smooth'
                    });
                  }
                } else if (item.onClick) {
                  item.onClick();
                }
              }}
              className={`hover:text-[var(--gold)] transition-all duration-300 hover:scale-105 px-2 py-2 min-h-[3rem] flex items-center whitespace-nowrap ${
                isActive(item.to) ? 'text-[var(--gold)]' : 'text-white'
              }`}
            >
              {item.text}
            </Link>
          ))}

          {/* Always show reserve button at the end */}
          <button 
            className="btn-primary ml-4 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center min-w-[140px] h-[48px] px-8"
            data-glf-cuid="3eb53d07-1964-47ca-bc1e-3fbf8c7c2def" 
            data-glf-ruid="45a7d280-d145-4373-9ebf-ae470c0a7e9f"
          >
            {t('nav.reserve')}
          </button>
          <div className="ml-4 flex items-center">
            <OrderButton />
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 flex items-center justify-center ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto backdrop-blur-sm' : 'opacity-0 pointer-events-none backdrop-blur-none'
          }`}
          aria-hidden={!isMobileMenuOpen}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100dvh'
          }}
        >
          <div
            ref={menuRef}
            className={`w-full max-w-md mx-auto px-4 py-12 relative overflow-y-auto
                       transform transition-all duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } max-h-[100dvh] backdrop-blur-md bg-black/95`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '24rem'
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full hover:bg-white/10 
                        hover:rotate-90 transition-all duration-300 text-[var(--gold)]
                        min-w-[3rem] min-h-[3rem] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            
            <div className={`flex flex-col items-center justify-center gap-4 transition-all duration-300 
                          mt-16 min-h-[50vh] ${
              menuItemsVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {[...navItems.firstHalf, ...navItems.secondHalf].map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => {
                    if (item.to.startsWith('/#')) {
                      e.preventDefault();
                      const isContactOrLocation = item.to === '/#contact' || item.to === '/#location';
                      if (isContactOrLocation) {
                        window.scrollTo({
                          top: document.documentElement.scrollHeight,
                          behavior: 'smooth'
                        });
                      }
                      setIsMobileMenuOpen(false);
                    } else {
                      if (item.onClick) {
                        item.onClick();
                      }
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`block text-2xl transition-all duration-300 py-3 px-6 
                            min-h-[3rem] w-full max-w-[280px] mx-auto rounded-lg 
                            backdrop-blur-sm text-center hover:text-[var(--gold)] 
                            hover:bg-black/30 ${
                    isActive(item.to) ? 'text-[var(--gold)] bg-black/20' : 'text-white'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.text}
                </Link>
              ))}

              {/* Mobile menu reservation button - always show at the end */}
              <button 
                className="btn-primary text-base font-medium mt-6 w-full max-w-[280px] h-[48px] backdrop-blur-sm 
                         hover:scale-105 transition-all duration-300 px-8 inline-flex items-center justify-center"
                data-glf-cuid="3eb53d07-1964-47ca-bc1e-3fbf8c7c2def" 
                data-glf-ruid="45a7d280-d145-4373-9ebf-ae470c0a7e9f"
              >
                {t('nav.reserve')}
              </button>
              <div className="w-full max-w-[280px] flex justify-center mt-4">
                <OrderButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}