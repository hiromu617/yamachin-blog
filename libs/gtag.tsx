import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, VFC } from "react";
import Head from "next/head"

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== "";

// PVを測定する
export const pageview = (path: string) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label, value = "" }: Event) => {
  if (!existsGaId) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : "",
    value,
  });
};

// _app.tsx で読み込む
export const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

// _app.tsx で読み込む
export const GoogleAnalytics = () => (
  <>
   <Head>
        {/* Google Analytics */}
        {existsGaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </Head>
  </>
);
// イベントを型で管理
type ContactEvent = {
  action: "submit_form";
  category: "contact";
};

type ClickEvent = {
  action: "click";
  category: "other";
};

export type Event = (ContactEvent | ClickEvent) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};
