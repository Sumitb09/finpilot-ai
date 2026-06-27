import i18n from "i18next";
import * as Localization from "expo-localization";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";

const language =
  Localization.getLocales()[0]?.languageCode ?? "en";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",

    resources,

    lng:
      language === "hi"
        ? "hi"
        : "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;