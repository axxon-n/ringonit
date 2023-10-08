import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './locale/en.json'
import roJSON from './locale/ro.json'
import itJSON from './locale/it.json'
import deJSON from './locale/de.json'
i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultNS: 'translations',
		fallbackLng: 'en',
		load: 'languageOnly',
		debug: true,
    	interpolation: {
    		escapeValue: false, 
    	},
    	saveMissing: true,
		resources: {
			en: { ...enJSON },
		    it: { ...itJSON },
		    'it-IT': { ...itJSON },
		    ro: { ...roJSON },
		    de: { ...deJSON },
		}, 
		// lng: "it"
});
export default i18n;