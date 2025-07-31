import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import rw from "./locales/rw.json";

const resources = {
  en: {
    translation: en,
  },
  rw: {
    translation: rw,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export const locales = {
  en: "en-US",
  rw: "rw-RW",
};

export type LocaleKey = keyof typeof locales;

export default i18n;
