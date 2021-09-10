import type { AppProps } from "next/app";
import NavBar from "../src/components/NavBar/NavBar";
import Footer from "../src/components/Footer/Footer";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "../src/contexts/LocaleContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <LocaleProvider lang="ja">
        <NavBar />
        <div className="w-full min-h-screen dark:bg-gray-900">
          <div className="container mx-auto px-2 xl:px-32 pt-5 h-full">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default MyApp;
