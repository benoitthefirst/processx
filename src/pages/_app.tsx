//import '../styles/globals.css'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import PortalLayout from "../components/portal_layout";

const themeDark = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#fff",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#018567",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#f5ee84",
      main: "#181733",
      dark: "#460370",
      // dark: will be calculated from palette.secondary.main,
      //contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    text: {
      primary: "#000",
      secondary: "#000",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <PortalLayout>
        <Component {...pageProps} />
      </PortalLayout>
    </ThemeProvider>
  );
}
