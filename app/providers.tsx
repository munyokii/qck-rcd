'use client';

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="bumblebee"
      enableSystem={false}
      themes={["bumblebee", "halloween"]}
    >
      {children}
    </ThemeProvider>
  );
}