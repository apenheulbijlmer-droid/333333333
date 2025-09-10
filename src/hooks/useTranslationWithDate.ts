import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { formatDate, formatDateTime, formatShortDate, formatTime } from '../i18n';

/**
 * Enhanced hook that extends useTranslation with additional date/time formatting helpers
 */
export function useTranslationWithDate() {
  const { t, i18n, ...rest } = useTranslation();

  const formatLocalDate = useCallback((date: Date) => {
    return formatDate(date);
  }, []);
  
  const formatLocalShortDate = useCallback((date: Date) => {
    return formatShortDate(date);
  }, []);
  
  const formatLocalTime = useCallback((date: Date) => {
    return formatTime(date);
  }, []);
  
  const formatLocalDateTime = useCallback((date: Date) => {
    return formatDateTime(date);
  }, []);

  return {
    t,
    i18n,
    formatLocalDate,
    formatLocalShortDate,
    formatLocalTime,
    formatLocalDateTime,
    ...rest
  };
}