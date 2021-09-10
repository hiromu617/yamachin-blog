import { FC, useState, useEffect, createContext, Context } from "react";
import { merge, clone } from "lodash";

export type Locales = "ja" | "en";

type LocaleProviderProps = {
  lang: Locales;
};

type ContextProps = {
  readonly locale: Locales;
  readonly localeData: {
    [key: string]: string;
  };
  readonly setLocale: (lang: Locales) => void;
};

// jsonから言語データを取得
const getLocaleData = (lang: Locales) => {
  let localeData = {};
  const jaData = require("../../locale/ja/common.json");

  if (lang === "en") {
    localeData = merge(clone(jaData), require("../../locale/en/common.json"));
  } else {
    localeData = jaData;
  }

  return localeData;
};

export const LocaleContext = createContext<ContextProps>({
  locale: "ja",
  localeData: {},
  setLocale: () => null,
});

export const LocaleProvider: FC<LocaleProviderProps> = ({ children, lang }) => {
  // 現在の言語
  const [locale, setLocale] = useState<Locales>(lang);
  // 現在の言語の言語データ
  const [localeData, setLocaleData] = useState(getLocaleData(locale));

  useEffect(() => {
    setLocaleData(getLocaleData(locale));
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ localeData, setLocale, locale }}>
      {children}
    </LocaleContext.Provider>
  );
};
