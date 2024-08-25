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
        <main className="flex items-center justify-center px-1 lg:min-h-svh">
          {children}
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
