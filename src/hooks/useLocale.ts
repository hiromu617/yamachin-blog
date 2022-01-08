import { useRouter } from "next/router";
import en from "../../locale/en";
import ja from "../../locale/ja";

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;
  if (!locale) return { locale: "ja", ja };
  return { locale, t } as const;
};
