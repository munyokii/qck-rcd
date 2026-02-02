import './globals.css';
import { firaSansCondensed } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${firaSansCondensed.className} antialiased`}>{children}</body>
    </html>
  );
}
