import React from 'react';

export default function OrderButton() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.fbgcdn.com/embedder/js/ewm2.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <span 
      className="btn-primary inline-flex items-center justify-center whitespace-nowrap text-base font-medium 
                 px-8 h-[48px] min-w-[140px] hover:scale-105 transition-all duration-300
                 hover:bg-[var(--gold-hover)] active:transform active:scale-95"
      data-glf-cuid="3eb53d07-1964-47ca-bc1e-3fbf8c7c2def" 
      data-glf-ruid="45a7d280-d145-4373-9ebf-ae470c0a7e9f"
    >
      Online Bestellen
    </span>
  );
}