"use client";
import "../styles/scss/main.scss";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
  );
}