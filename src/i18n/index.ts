import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nl from './locales/nl.json';

// Configuration for Dutch locale
const formatConfig = {
  currency: 'EUR', 
  dateFormat: 'dd-MM-yyyy',
  decimalSeparator: ',',
  thousandSeparator: '.'
};

// Initialize i18next with Dutch only
i18n
  .use(initReactI18next)
  .init({
    lng: 'nl',
    fallbackLng: 'nl',
    fallbackNS: 'translation',
    defaultNS: 'translation',
    resources: {
      nl: { translation: nl }
    },
    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        // Format currency values
        if (format === 'currency' && typeof value === 'number') {
          return new Intl.NumberFormat('nl', {
            style: 'currency',
            currency: formatConfig.currency
          }).format(value);
        }

        // Format numeric values
        if (format === 'number' && typeof value === 'number') {
          return new Intl.NumberFormat('nl').format(value);
        }

        // Format date values
        if (format === 'date' && value instanceof Date) {
          return new Intl.DateTimeFormat('nl', { 
            dateStyle: 'long' 
          }).format(value);
        }

        // Format short date values
        if (format === 'shortDate' && value instanceof Date) {
          return new Intl.DateTimeFormat('nl', { 
            dateStyle: 'short' 
          }).format(value);
        }

        // Format time values
        if (format === 'time' && value instanceof Date) {
          return new Intl.DateTimeFormat('nl', { 
            timeStyle: 'short' 
          }).format(value);
        }

        // Format datetime values
        if (format === 'datetime' && value instanceof Date) {
          return new Intl.DateTimeFormat('nl', { 
            dateStyle: 'medium',
            timeStyle: 'short' 
          }).format(value);
        }

        return value;
      }
    },
    load: 'languageOnly',
    react: {
      useSuspense: true,
      bindI18n: 'loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
      skipTranslationOnMissingKey: false
    }
  });

// Set HTML attributes for Dutch
document.documentElement.setAttribute('lang', 'nl');
document.documentElement.setAttribute('dir', 'ltr');

// Helper functions for formatting with Dutch locale
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('nl', { 
    style: 'currency', 
    currency: formatConfig.currency
  }).format(price);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('nl', { dateStyle: 'long' }).format(date);
};

export const formatShortDate = (date: Date) => {
  return new Intl.DateTimeFormat('nl', { dateStyle: 'short' }).format(date);
};

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('nl', { timeStyle: 'short' }).format(date);
};

export const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('nl', { 
    dateStyle: 'medium',
    timeStyle: 'short' 
  }).format(date);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('nl').format(num);
};

// Get the Dutch decimal/thousand separators
export const getNumberSeparators = () => {
  return {
    decimal: formatConfig.decimalSeparator,
    thousand: formatConfig.thousandSeparator
  };
};

export default i18n;