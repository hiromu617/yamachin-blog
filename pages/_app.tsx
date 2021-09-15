import type { AppProps } from "next/app";
import { NavBar } from "../src/components/NavBar/NavBar";
import { Footer } from "../src/components/Footer/Footer";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "../src/contexts/LocaleContext";
import { usePageView, GoogleAnalytics } from "../libs/gtag";
import { DefaultSeo } from "next-seo";

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();

  return (
    <ThemeProvider attribute="class">
      <LocaleProvider lang="ja">
        <NavBar />
        <div className="w-full min-h-screen dark:bg-gray-900">
          <div className="container mx-auto px-2 xl:px-32 pt-5 h-full">
            <GoogleAnalytics />
            <DefaultSeo
              openGraph={{
                type: "website",
                url: "https://yamachin-blog.vercel.app/",
                site_name: "Yamachi's Blog",
              }}
              twitter={{
                handle: "@EatenTigers_fun",
                site: "@EatenTigers_fun",
                cardType: "summary_large_image",
              }}
            />
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default MyApp;
