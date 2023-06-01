import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import Script from "next/script";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "@/components/dev";
import { Session, createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from "@supabase/auth-helpers-react";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Disable in development
    loaded: (posthog) => {
      if (
        process.env.NODE_ENV === "development" ||
        localStorage.getItem("postHogIgnore")
      )
        posthog.opt_out_capturing();
    },
  });
}

export default function App({ Component, pageProps }: AppProps<{
  initialSession: Session,
}>) {
  const router = useRouter();
  const [supabase] = useState(() => createPagesBrowserClient({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY }));
  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <CssBaseline />
        <PostHogProvider client={posthog}>
          <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
          >
            <Component {...pageProps} />
          </DevSupport>
        </PostHogProvider>
        <Analytics />
        <Script id={"hotjar"}>
          {`(function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3484792,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      </SessionContextProvider>
    </>
  );
}
