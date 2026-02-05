import { ThemeProviders } from "./providers/ThemeProvider";

import './globals.css';
import { firaSansCondensed } from '@/app/ui/fonts';
import ToastProvider from "./providers/ToastProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaSansCondensed.className} antialiased`}>
        <ThemeProviders>{children}</ThemeProviders>
        <ToastProvider />
      </body>
    </html>
  );
}
