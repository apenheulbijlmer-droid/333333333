import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';

const translationCache = new Map<string, Map<string, string>>();

export function useTranslationWithCache() {
  const { t, i18n, ...rest } = useTranslation();

  const cachedT = useCallback((key: string, options = {}) => {
    const lng = i18n.language;
    
    // Check cache first
    if (!translationCache.has(lng)) {
      translationCache.set(lng, new Map());
    }
    
    const lngCache = translationCache.get(lng)!;
    const cacheKey = `${key}${JSON.stringify(options)}`;
    
    if (lngCache.has(cacheKey)) {
      return lngCache.get(cacheKey)!;
    }
    
    // If not in cache, translate and cache
    const translation = t(key, options);
    lngCache.set(cacheKey, translation);
    return translation;
  }, [t, i18n.language]);

  const clearCache = useCallback(() => {
    translationCache.clear();
  }, []);

  return useMemo(() => ({
    t: cachedT,
    i18n,
    clearCache,
    ...rest
  }), [cachedT, i18n, clearCache, rest]);
}