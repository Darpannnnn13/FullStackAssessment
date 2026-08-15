'use client';

import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface GuestLoginProps {
  onLogin: () => void;
}

export default function GuestLogin({
  onLogin,
}: GuestLoginProps) {
  const [loading, setLoading] = useState(false);

  function handleGuestLogin() {
    setLoading(true);

    // Small delay to make the login feel like
    // a real application transition.
    setTimeout(() => {
      localStorage.setItem(
        'taskflow_guest_session',
        'true',
      );

      localStorage.setItem(
        'taskflow_guest_name',
        'Guest User',
      );

      onLogin();
    }, 500);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--page-bg)] px-4 py-10 text-[var(--text-primary)]">

      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />

      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <section className="relative z-10 w-full max-w-md">

        {/* BRAND */}

        <div className="mb-8 text-center">

          <div className="mb-5 flex justify-center">

            <div className="relative">

              <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-lg">

                <Sparkles size={29} />

              </div>

            </div>

          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            TaskFlow
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Intelligent task management workspace
          </p>

        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="theme-card overflow-hidden rounded-3xl border p-7 shadow-2xl">

          {/* TOP */}

          <div className="mb-7">

            <div className="mb-2 flex items-center gap-2">

              <h2 className="text-xl font-semibold">
                Welcome
              </h2>

              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
                Guest
              </span>

            </div>

            <p className="text-sm leading-6 text-[var(--text-secondary)]">
              Enter the workspace as a guest and
              start managing your tasks immediately.
            </p>

          </div>

          {/* =================================================
              GUEST PROFILE
          ================================================= */}

          <div className="mb-6 rounded-2xl border border-[var(--border-color)] bg-black/[0.03] p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white shadow-lg">
                G
              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-medium">
                  Guest User
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                  Temporary workspace session
                </p>

              </div>

              <div className="ml-auto">

                <CheckCircle2
                  size={18}
                  className="text-emerald-400"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="mb-7 space-y-3">

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Zap size={15} />
              </div>

              <span className="text-xs text-[var(--text-secondary)]">
                Create and manage tasks
              </span>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <CheckCircle2 size={15} />
              </div>

              <span className="text-xs text-[var(--text-secondary)]">
                Track task progress
              </span>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Sparkles size={15} />
              </div>

              <span className="text-xs text-[var(--text-secondary)]">
                Personalize your workspace
              </span>

            </div>

          </div>

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className="theme-primary-button group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >

            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                Entering workspace...
              </>
            ) : (
              <>
                Continue as Guest

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />

              </>
            )}

          </button>

          {/* =================================================
              FOOTER
          ================================================= */}

          <p className="mt-5 text-center text-[11px] leading-5 text-[var(--text-secondary)]">
            No account required. Your guest session
            is stored locally on this device.
          </p>

        </div>

        {/* VERSION */}

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
          TaskFlow Workspace
        </p>

      </section>

    </main>
  );
}