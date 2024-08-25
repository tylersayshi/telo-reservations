import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/header';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Telo Reservations</title>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body>
        <Header />
        <main className="flex items-center justify-center px-1">
          {children}
          <img
            src="https://app.piratepx.com/ship?p=67d07cf8-d340-46cf-8560-6e9b462d1d7e"
            suppressHydrationWarning
          />
        </main>
      </body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  };
};
