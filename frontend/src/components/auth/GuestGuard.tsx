'use client';

import { ReactNode, useEffect, useState } from 'react';
import GuestLogin from './GuestLogin';

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({
  children,
}: GuestGuardProps) {
  const [authenticated, setAuthenticated] =
    useState(false);

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    const session = localStorage.getItem(
      'taskflow_guest_session',
    );

    if (session === 'true') {
      setAuthenticated(true);
    }

    setChecking(false);
  }, []);

  function handleLogin() {
    setAuthenticated(true);
  }

  // =========================================================
  // CHECKING SESSION
  // =========================================================

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--page-bg)]">

        <div className="flex flex-col items-center">

          <div className="mb-4 h-9 w-9 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-500" />

          <p className="text-xs text-[var(--text-secondary)]">
            Loading workspace...
          </p>

        </div>

      </main>
    );
  }

  // =========================================================
  // NOT LOGGED IN
  // =========================================================

  if (!authenticated) {
    return (
      <GuestLogin
        onLogin={handleLogin}
      />
    );
  }

  // =========================================================
  // LOGGED IN
  // =========================================================

  return <>{children}</>;
}