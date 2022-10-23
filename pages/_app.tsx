import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import getTheme from "../lib/theme";
import React from "react";

type MyAppProps = AppProps<{
  session: Session;
}>;

function MyApp({ Component, pageProps }: MyAppProps) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersDarkMode = false;
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={getTheme(prefersDarkMode)}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
