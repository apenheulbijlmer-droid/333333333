import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export default function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = true
}: UseIntersectionObserverProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Cleanup previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        const shouldBeVisible = entry.isIntersecting;
        
        if (frozen.current && freezeOnceVisible) return;
        
        if (shouldBeVisible) {
          setIsVisible(true);
          if (freezeOnceVisible) {
            frozen.current = true;
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    // Use requestIdleCallback for non-critical observations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        observer.current?.observe(element);
      });
    } else {
      observer.current.observe(element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [elementRef, isVisible] as const;
}