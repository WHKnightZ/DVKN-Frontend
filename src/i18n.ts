import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LS_LANG, LANGUAGES } from 'configs/constants'
import translationVI from './lang/vi.json'
import translationEN from './lang/en.json'

const { VI } = LANGUAGES

const detectLang = localStorage.getItem(LS_LANG)

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: translationVI,
    },
    en: {
      translation: translationEN,
    },
  },
  lng: detectLang || VI,
  fallbackLng: VI,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
