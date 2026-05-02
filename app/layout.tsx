import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axion Index — Operating Intelligence for the Future of Work',
  description: 'Axion Index helps founders, boards, and operators see where operating architecture has drifted — and what must be redesigned before the cost becomes visible.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
