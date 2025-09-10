import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import OrderButton from '../components/OrderButton';
import { ReservationContext } from '../components/Layout';

export default function Home() {
  const { t } = useTranslation();
  const { setIsReservationModalOpen } = React.useContext(ReservationContext);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [elementRef, isVisible] = useIntersectionObserver();

  const slides = [
    '/restaurant.jpeg',
    '/WhatsApp Image 2025-02-24 at 19.08.13 (2).jpeg',
    '/WhatsApp Image 2025-02-24 at 19.08.13 (3).jpeg',
    '/WhatsApp Image 2025-02-24 at 19.08.14 (1).jpeg'
  ];

  // Preload images
  React.useEffect(() => {
    slides.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      // Set high priority for the first image
      if (index === 0) {
        img.setAttribute('importance', 'high');
      }
    });
  }, []);

  // Handle automatic slideshow
  React.useEffect(() => {
    if (!isVisible) return;

    // Use longer interval on mobile for better performance
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(current => (current + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, slides.length]);

  return (
    <>
      {/* Hero Section */}
      <section 
        id="home" 
        className="hero-section"
        ref={elementRef as React.RefObject<HTMLElement>}
      >
        {/* Background container */}
        <div className="hero-background">
          {/* Slideshow */}
          <div className="slideshow">
            {slides.map((src, index) => (
              <div
                key={src}
                className={`slide ${currentSlide === index ? 'active' : ''}`}
                style={{ 
                  transitionDelay: isTransitioning ? '0ms' : '300ms',
                  zIndex: currentSlide === index ? 2 : 1
                }}
              >
                <img
                  src={src}
                  alt={`Manhattan Food & Drinks - Slide ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="responsive-image"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlay */}
          <div className="hero-overlay"></div>
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="overflow-hidden w-full max-w-[90vw] mx-auto text-center">
            <h1 className="flex flex-col items-center gap-2">
              <span className="title-modern text-[clamp(3rem,10vw,5rem)] w-auto mx-auto px-0">
                Manhattan
              </span>
              <span className="title-modern text-[clamp(1.5rem,5vw,3rem)] !font-light tracking-wider sm:tracking-widest drop-shadow-2xl w-auto mx-auto px-0">
                Food & Drinks
              </span>
            </h1>
          </div>
          <div className="h-8" />
          <span className="btn-primary text-lg w-full max-w-[280px] sm:w-auto min-h-[3rem] hover:scale-105 transition-all duration-300 ease-in-out"
                data-glf-cuid="3eb53d07-1964-47ca-bc1e-3fbf8c7c2def" 
                data-glf-ruid="45a7d280-d145-4373-9ebf-ae470c0a7e9f">
            Online Bestellen
          </span>
          <ChevronDown 
            className="absolute bottom-8 text-[var(--gold)] float-arrow hover:text-white hover:scale-110
                       transition-all duration-300 cursor-pointer" 
            size={48}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
            aria-label="Scroll down to explore"
          />
        </div>
      </section>
    </>
  );
}