import { ThemeProviders } from "@/app/providers/ThemeProvider";
import './globals.css';
import { firaSansCondensed } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaSansCondensed.className} antialiased`}>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
