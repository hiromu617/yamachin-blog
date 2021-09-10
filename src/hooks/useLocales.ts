import { get } from "lodash";
import { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";

export const useLocales = () => {
  const { localeData, setLocale, locale } = useContext(LocaleContext);

  // keyを受け取り,言語データからvalueを返す
  const t = (key: string): string => {
    const data = get(localeData, key);
    if (!data) {
      console.error(`Translation '${key}' for locale not found.`);
    }
    return data || "";
  }

  return {
    t,
    locale,
    setLocale,
  };
};
