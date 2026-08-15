'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  Moon,
  Palette,
  Sun,
} from 'lucide-react';

type Theme = 'dark' | 'light' | 'aurora';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      'taskflow-theme',
    ) as Theme | null;

    const initialTheme =
      savedTheme === 'light' ||
      savedTheme === 'aurora' ||
      savedTheme === 'dark'
        ? savedTheme
        : 'dark';

    setTheme(initialTheme);

    document.documentElement.setAttribute(
      'data-theme',
      initialTheme,
    );
  }, []);

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);

    document.documentElement.setAttribute(
      'data-theme',
      newTheme,
    );

    localStorage.setItem(
      'taskflow-theme',
      newTheme,
    );

    setOpen(false);
  }

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="theme-toggle-button flex h-10 items-center gap-2 rounded-xl border px-4 text-sm transition"
      >
        <Palette size={17} />

        <span className="hidden sm:inline">
          Theme
        </span>
      </button>

      {open && (
        <div className="theme-menu absolute right-0 top-12 z-50 w-60 rounded-2xl border p-3 shadow-2xl">

          <p className="theme-menu-label mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
            Appearance
          </p>

          {/* DARK */}

          <button
            type="button"
            onClick={() => changeTheme('dark')}
            className="theme-option flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition"
          >
            <Moon size={17} />

            <div className="flex-1">
              <p className="text-sm font-medium">
                Dark
              </p>

              <p className="theme-option-description text-[11px]">
                Deep workspace
              </p>
            </div>

            {theme === 'dark' && (
              <Check size={17} />
            )}
          </button>

          {/* LIGHT */}

          <button
            type="button"
            onClick={() => changeTheme('light')}
            className="theme-option flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition"
          >
            <Sun size={17} />

            <div className="flex-1">
              <p className="text-sm font-medium">
                Light
              </p>

              <p className="theme-option-description text-[11px]">
                Clean workspace
              </p>
            </div>

            {theme === 'light' && (
              <Check size={17} />
            )}
          </button>

          {/* AURORA */}

          <button
            type="button"
            onClick={() => changeTheme('aurora')}
            className="theme-option flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition"
          >
            <Palette size={17} />

            <div className="flex-1">
              <p className="text-sm font-medium">
                Aurora
              </p>

              <p className="theme-option-description text-[11px]">
                Futuristic workspace
              </p>
            </div>

            {theme === 'aurora' && (
              <Check size={17} />
            )}
          </button>

        </div>
      )}

    </div>
  );
}