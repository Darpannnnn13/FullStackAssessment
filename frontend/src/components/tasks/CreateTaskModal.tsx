'use client';

import { FormEvent, useEffect, useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';

import { createTask } from '@/lib/api';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<
    'low' | 'medium' | 'high'
  >('medium');

  const [status, setStatus] = useState<
    'todo' | 'in_progress' | 'completed'
  >('todo');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Visual animation state only.
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Start entrance animation whenever the modal opens.
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);

      const timer = window.setTimeout(() => {
        setIsVisible(true);
      }, 10);

      return () => window.clearTimeout(timer);
    }

    setIsVisible(false);
    setIsClosing(false);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      });

      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus('todo');

      onTaskCreated();
      onClose();
    } catch (err) {
      console.error(err);

      setError(
        'Unable to create task. Please check that the backend is running.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading || isClosing) {
      return;
    }

    setIsClosing(true);
    setIsVisible(false);

    window.setTimeout(() => {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus('todo');
      setError('');
      setIsClosing(false);

      onClose();
    }, 180);
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-200 ease-out ${
        isVisible && !isClosing
          ? 'bg-black/60 opacity-100'
          : 'bg-black/0 opacity-0'
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`theme-card w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl transition-all duration-200 ease-out ${
          isVisible && !isClosing
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-[0.97] opacity-0'
        }`}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400 transition-all duration-200 hover:scale-105 hover:bg-violet-500/15">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                Create new task
              </h2>

              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                Add a task to your workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading || isClosing}
            className="group flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-all duration-200 hover:bg-black/5 hover:text-[var(--text-primary)] dark:hover:bg-white/5 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X
              size={18}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* TITLE */}

          <div>
            <label
              htmlFor="create-task-title"
              className="mb-2 block text-xs font-medium text-[var(--text-secondary)]"
            >
              Task title
            </label>

            <input
              id="create-task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Design dashboard"
              disabled={loading}
              autoFocus
              className="theme-input w-full rounded-xl border px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label
              htmlFor="create-task-description"
              className="mb-2 block text-xs font-medium text-[var(--text-primary)]"
            >
              Description
            </label>

            <textarea
              id="create-task-description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="Describe what needs to be done..."
              disabled={loading}
              rows={4}
              className="theme-input w-full resize-none rounded-xl border px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          {/* PRIORITY + STATUS */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* PRIORITY */}

            <div>
              <label
                htmlFor="create-task-priority"
                className="mb-2 block text-xs font-medium text-[var(--text-primary)]"
              >
                Priority
              </label>

              <select
                id="create-task-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value as
                      | 'low'
                      | 'medium'
                      | 'high',
                  )
                }
                disabled={loading}
                className="theme-select w-full px-4 py-3 text-sm text-[var(--text-primary)] transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label
                htmlFor="create-task-status"
                className="mb-2 block text-xs font-medium text-[var(--text-primary)]"
              >
                Status
              </label>

              <select
                id="create-task-status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | 'todo'
                      | 'in_progress'
                      | 'completed',
                  )
                }
                disabled={loading}
                className="theme-select w-full px-4 py-3 text-sm text-[var(--text-primary)] transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              >
                <option value="todo">
                  To Do
                </option>

                <option value="in_progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-500 dark:text-red-400">
              {error}
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading || isClosing}
              className="rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm text-[var(--text-secondary)] transition-all duration-200 hover:bg-black/5 hover:text-[var(--text-primary)] dark:hover:bg-white/5 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="theme-primary-button flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Creating...
                </>
              ) : (
                <>
                  <Plus
                    size={17}
                    className="transition-transform duration-200"
                  />

                  Create task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}