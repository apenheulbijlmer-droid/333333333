import { useEffect, useRef, useState } from 'react';

interface ScrollOptions {
  threshold?: number;
  delay?: number;
}

export function useScroll({ threshold = 50, delay = 100 }: ScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > threshold);
      setDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateScrollState();
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { isScrolled, direction };
}