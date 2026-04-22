import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Axion Index — Operating Intelligence for the Future of Work",
  description: 'Operating Intelligence for the Future of Work',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
