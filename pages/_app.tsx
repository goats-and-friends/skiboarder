import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./_theme";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
