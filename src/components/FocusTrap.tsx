import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  children: React.ReactNode;
}

export default function FocusTrap({ children }: FocusTrapProps) {
  const trapRef = useRef<HTMLDivElement>(null);
  const previousFocusedElement = useRef<HTMLElement | null>(null);

  // Store the previously focused element and focus the trap container
  useEffect(() => {
    previousFocusedElement.current = document.activeElement as HTMLElement;
    return () => {
      // Restore focus when component unmounts
      previousFocusedElement.current?.focus();
    };
  }, []);

  // Handle keyboard focus trap
  useEffect(() => {
    const trapContainer = trapRef.current;
    if (!trapContainer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on escape
      if (e.key === 'Escape') {
        const event = new CustomEvent('focustrap-escape');
        document.dispatchEvent(event);
        return;
      }
      
      if (e.key !== 'Tab') return;
      
      // Get all focusable elements
      const focusableElements = trapContainer.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // Trap focus
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={trapRef}>
      {children}
    </div>
  );
}