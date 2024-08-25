'use client';

import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof localStorage === 'undefined' ? 'light' : localStorage.theme,
  );

  useEffect(() => {
    if (typeof localStorage === 'undefined' || theme) {
      return;
    }

    // Strictly for setting the initial theme
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (!theme || !localStorage) {
      return;
    }

    if (theme === 'dark') {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      suppressHydrationWarning
      className={`h-12 w-12 rounded-md border-2 border-solid border-black/20 p-1 text-sm font-bold dark:border-white/20`}
      onClick={() => {
        if (!localStorage) {
          return;
        }

        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        );
      }}
    >
      {theme === 'dark' ? '🌙' : '🌞'}
    </button>
  );
};
