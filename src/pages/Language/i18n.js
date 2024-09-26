/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./translation.ko.json";
import en from "./translation.en.json";

let language = sessionStorage.getItem("language");
const webLanguage = navigator.language.substring(0, 2) || navigator.userLanguage(0, 2);
if(language === null) sessionStorage.setItem("language", webLanguage);

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        ko: { translation: ko },
    },
    lng: sessionStorage.getItem("language"), // 세션에 저장된 언어 설정
    fallbackLng: "en", // 언어를 찾지 못할 때의 대체 언어 설정 (영어)
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
