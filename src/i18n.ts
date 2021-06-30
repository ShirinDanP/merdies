import i18n, { Module } from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next as Module).init({
  resources: {
    [process.env.LANGUAGE as string]: {
      translation: process.env.TRANSLATIONS as {},
    },
  },
  lng: process.env.LANGUAGE,
  fallbackLng: process.env.LANGUAGE,

  interpolation: {
    escapeValue: false,
  },
});
