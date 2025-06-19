'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

const dictionaries = {
  en: () => import('../../locales/en.json').then(mod => mod.default),
  ar: () => import('../../locales/ar.json').then(mod => mod.default),
};

export const TranslationProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [dict, setDict] = useState({});


  useEffect(() => {
    dictionaries[lang]().then(setDict);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key) => dict[key] || key;
  
  return (
    <TranslationContext.Provider value={{ t, lang, setLang  }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
