import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Loader2, Languages } from 'lucide-react';
import CenteredLanguageMenu from './CenteredLanguageMenu';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!mounted) {
      setMounted(true);
      // Force Dutch as default language on first render
      if (i18n.language !== 'nl') {
        handleLanguageChange('nl');
      }
    }
  }, [mounted, i18n.language]);

  const handleLanguageChange = async (langCode: string) => {
    setIsLoading(true);
    
    try {
      await i18n.changeLanguage(langCode);
      document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = langCode;
    } catch (err) {
      console.error('Language change failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for escape key events from the focus trap
  React.useEffect(() => {
    const handleEscape = () => setIsMenuOpen(false);
    document.addEventListener('focustrap-escape', handleEscape);
    return () => document.removeEventListener('focustrap-escape', handleEscape);
  }, []);

  // Get appropriate flag for current language
  const getCurrentFlag = () => {
    const flags: Record<string, string> = {
      nl: '🇳🇱',
      en: '🇬🇧',
      es: '🇪🇸',
      tr: '🇹🇷',
      ar: '🇦🇪'
    };
    return flags[i18n.language] || flags.nl;
  };

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(true)}
        className="flex items-center text-white hover:text-[var(--gold)] transition-all duration-300 
                  p-2 sm:p-3 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]
                  focus:ring-opacity-50 font-medium group min-h-[3rem] min-w-[3rem] touch-manipulation
                  md:px-4 md:py-3 md:space-x-3"
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
        aria-label={`Change language. Currently ${t(`languages.${i18n.language}`)}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <span className="hidden md:inline-block mr-2 text-xl" aria-hidden="true">
              {getCurrentFlag()}
            </span>
            <Languages size={22} className="md:hidden opacity-80 group-hover:rotate-45 transition-transform duration-500" />
            <span className="hidden md:inline text-sm tracking-wider font-medium">
              {t(`languages.${i18n.language}`)}
            </span>
          </>
        )}
      </button>

      <CenteredLanguageMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default LanguageSelector;