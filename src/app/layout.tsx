"use client"
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const themeDark = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#e7edeb",
      //paper: "#e4e9f1"
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#018567",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#f5ee84",
      main: "#ff0038",
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
      secondary: "#018567",
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#018567 transparent",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            scrollbarWidth: "thin",
            width: 5,
            overflowT: "auto",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "lightGray",
            minHeight: 24,
            width: 5,
            scrollbarWidth: "thin",
            border: "3px solid transparent",
            overflowT: "auto",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "lightGray",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "lightGray",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "lightGray",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          '& .MuiAutocomplete-option[aria-selected="true"]': {
            // works
            backgroundColor: "#111217",
          },
          '& .MuiAutocomplete-option[aria-selected="false"]': {
            // works
            backgroundColor: "#1b1c23",
          },
          '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
            // works
            backgroundColor: "#70fbe0",
            color: "#000",
          },
          "& .MuiAutocomplete-option:hover": {
            // works
            backgroundColor: "#111217",
          },
          "& .MuiAutocomplete-option:after": {
            // works
            backgroundColor: "#111217",
          },
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={themeDark}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
