import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/header';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <head>
        <title>Telo Reservations</title>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <div className="max-h-screen overflow-hidden">
        <Header />
        <main className="flex items-center justify-center px-1">
          {children}
        </main>
      </div>
      <img
        style={{ display: 'none' }}
        src="https://app.piratepx.com/ship?p=67d07cf8-d340-46cf-8560-6e9b462d1d7e&i=telo"
        suppressHydrationWarning
      />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  };
};
