import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
