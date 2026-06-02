import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dmsans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bamboo NEXT Design Residency — Meghalaya Chapter',
  description:
    'A 6-month immersive full-time residential design programme in Meghalaya run by the Government of Meghalaya and anchored by SELCO Foundation.',
  keywords: [
    'Bamboo NEXT',
    'Design Residency',
    'Meghalaya Residency',
    'Architecture Fellowship',
    'Sustainable Design',
    'SELCO Foundation',
    'Meghalaya Bamboo Mission',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-off-white text-charcoal relative">
        {/* SVG tactile noise filter layer overlay */}
        <div className="grain-overlay" />
        <main className="flex-grow flex flex-col">{children}</main>
      </body>
    </html>
  );
}
