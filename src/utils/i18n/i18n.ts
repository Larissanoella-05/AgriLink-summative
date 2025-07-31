import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import rw from "./locales/rw.json";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
  rw: {
    translation: rw,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources,
  lng: "es",

  interpolation: {
    escapeValue: false,
  },
});

export const locales = {
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
};

export type LocaleKey = keyof typeof locales;

export default i18n;
