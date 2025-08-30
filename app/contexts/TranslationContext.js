'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Static imports بدل dynamic imports
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';

const TranslationContext = createContext();

const dictionaries = {
  en,
  ar,
};

export const TranslationProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [dict, setDict] = useState(dictionaries['en']);

  useEffect(() => {
    setDict(dictionaries[lang]);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key) => dict[key] || key;

  return (
    <TranslationContext.Provider value={{ t, lang, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
