import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <>
      <CssBaseline />
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
      <Analytics />
    </>
  );
}
