import { Providers } from "./providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
