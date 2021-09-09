import type { AppProps } from "next/app";
import NavBar from "../src/components/NavBar/NavBar";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-2 xl:px-32 pt-5 min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
};
export default MyApp;
