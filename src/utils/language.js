import setting from '../settings/config.json';

import vnFlag from '../assets/img/icons/flag/vn.png';
import usFlag from '../assets/img/icons/flag/us.png';

import vi_VN from '../settings/lang/vi_VN.json';
import en_US from '../settings/lang/en_US.json';

export default class Language {
    static getListLanguages() {
        return setting.LANGUAGES;
    }

    static getFlag(locale) {
        switch (locale) {
            case 'vi_VN':
                return vnFlag;
            case 'en_US':
                return usFlag;
            default:
                return usFlag;
        }
    }

    static getLocale(index) {
        return setting.LANGUAGES[index];
    }

    static getLanguageByLocale(lang) {
        const locales = setting.LANGUAGES.filter(itemLang => lang === itemLang.LOCALE);
        if (locales.length > 0) {
            return locales[0];
        }

        return setting.LANGUAGES[0];
    }

    static getContent(keyContent, group) {
        let locale;

        switch (localStorage.royClient_lang) {
            case "vi_VN":
                locale = vi_VN;
                break;

            case "en_US":
                locale = en_US;
                break;

            default:
                locale = en_US;
                break;
        }

        if (group) {
            if (locale[group][keyContent]) {
                return locale[group][keyContent];
            }

            return keyContent;
        }

        if (locale[keyContent]) {
            return locale[keyContent];
        }

        return keyContent;
    }
}