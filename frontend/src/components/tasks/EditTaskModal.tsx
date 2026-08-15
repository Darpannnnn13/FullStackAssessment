'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';

import { updateTask } from '@/lib/api';
import { Task } from '@/types/task';

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onTaskUpdated: () => void;
}

export default function EditTaskModal({
  task,
  isOpen,
  onClose,
  onTaskUpdated,
}: EditTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');

  const [priority, setPriority] = useState<
    'low' | 'medium' | 'high'
  >('medium');

  const [status, setStatus] = useState<
    'todo' | 'in_progress' | 'completed'
  >('todo');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  // =========================================================
  // LOAD TASK DATA
  // =========================================================

  useEffect(() => {
    if (!task) {
      return;
    }

    setTitle(task.title || '');

    setDescription(task.description || '');

    setPriority(
      task.priority || 'medium',
    );

    setStatus(
      task.status || 'todo',
    );

    setError('');
  }, [task]);

  if (!isOpen || !task) {
    return null;
  }

  // =========================================================
  // UPDATE TASK
  // =========================================================

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

      await updateTask(task._id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      });

      onTaskUpdated();

      onClose();
    } catch (err) {
      console.error(err);

      setError(
        'Unable to update task. Please check that the backend is running.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) {
      return;
    }

    setError('');

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >

      <div
        className="theme-card w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Pencil size={18} />
            </div>

            <div>

              <h2 className="text-base font-semibold">
                Edit task
              </h2>

              <p className="mt-0.5 text-xs text-white/40">
                Update your task details
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed"
          >
            <X size={18} />
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
              htmlFor="edit-task-title"
              className="mb-2 block text-xs font-medium text-white/60"
            >
              Task title
            </label>

            <input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Task title"
              disabled={loading}
              className="theme-input w-full rounded-xl border px-4 py-3 text-sm outline-none"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label
              htmlFor="edit-task-description"
              className="mb-2 block text-xs font-medium text-white/60"
            >
              Description
            </label>

            <textarea
              id="edit-task-description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="Describe the task..."
              disabled={loading}
              rows={4}
              className="theme-input w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none"
            />

          </div>

          {/* PRIORITY + STATUS */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* PRIORITY */}

            <div>

              <label
                htmlFor="edit-task-priority"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Priority
              </label>

              <select
                id="edit-task-priority"
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
                className="theme-select w-full px-4 py-3 text-sm"
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
                htmlFor="edit-task-status"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Status
              </label>

              <select
                id="edit-task-status"
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
                className="theme-select w-full px-4 py-3 text-sm"
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
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="theme-primary-button flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Saving...
                </>
              ) : (
                <>
                  <Check size={17} />

                  Save changes
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}