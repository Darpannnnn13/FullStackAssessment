'use client';

import { useEffect, useMemo, useState } from 'react';
import GuestGuard from '@/components/auth/GuestGuard';
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock3,
  Cpu,
  Filter,
  LayoutDashboard,
  ListTodo,
  Menu,
  Pencil,
  Plus,
  Radar,
  Search,
  Settings,
  Sparkles,
  Target,
  Terminal,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { deleteTask, getTasks } from '@/lib/api';
import { Task } from '@/types/task';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import EditTaskModal from '@/components/tasks/EditTaskModal';
import ThemeToggle from '@/components/ThemeToggle';

type StatusFilter = 'all' | 'todo' | 'in_progress' | 'completed';
type PriorityFilter = 'all' | 'low' | 'medium' | 'high';

export default function Home() {
  // =========================================================
  // TASK STATE
  // =========================================================
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =========================================================
  // SEARCH + FILTER STATE
  // =========================================================
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');

  // =========================================================
  // MODAL STATE
  // =========================================================
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // =========================================================
  // MOBILE NAVIGATION STATE
  // =========================================================
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // =========================================================
  // LOAD TASKS
  // =========================================================
  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // =========================================================
  // EDIT TASK
  // =========================================================
  function handleEditTask(task: Task) {
    setEditingTask(task);
    setIsEditModalOpen(true);
  }

  // =========================================================
  // DELETE TASK
  // =========================================================
  async function handleDeleteTask(task: Task) {
    const confirmed = window.confirm(`Delete task: "${task.title}"?`);
    if (!confirmed) {
      return;
    }
    try {
      await deleteTask(task._id);
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to delete task.');
    }
  }

  // =========================================================
  // FILTER TASKS
  // =========================================================
  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        query === '' ||
        task.title.toLowerCase().includes(query) ||
        (task.description || '').toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================
  function clearFilters() {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  }

  const filtersActive =
    searchQuery !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  // =========================================================
  // STATISTICS
  // =========================================================
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === 'completed',
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in_progress',
  ).length;
  const todoTasks = tasks.filter((task) => task.status === 'todo').length;

  // =========================================================
  // REUSABLE SIDEBAR CONTENT
  // =========================================================
  const SidebarContent = () => (
    <>
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          WORKSPACE
        </p>
        
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex w-full items-center gap-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-3 py-2.5 text-sm font-medium text-cyan-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
        >
          <LayoutDashboard size={18} className="text-cyan-600 dark:text-cyan-400" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
        >
          <ListTodo size={18} className="text-slate-400 dark:text-slate-500" />
          <span>My Tasks</span>
        </button>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
        >
          <Target size={18} className="text-slate-400 dark:text-slate-500" />
          <span>Projects</span>
        </button>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
        >
          <Users size={18} className="text-slate-400 dark:text-slate-500" />
          <span>Team</span>
        </button>

        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          SYSTEM
        </p>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
        >
          <Activity size={18} className="text-slate-400 dark:text-slate-500" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
        >
          <Settings size={18} className="text-slate-400 dark:text-slate-500" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="border-t border-slate-200 dark:border-cyan-500/10 p-4 bg-slate-50 dark:bg-slate-950/40">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-cyan-950/20 p-3 shadow-sm dark:shadow-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-violet-600 text-sm font-bold text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]">
            N
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800 dark:text-cyan-200">User Profile</p>
            <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">Guest Access</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <GuestGuard>
      <main className="theme-page relative min-h-screen bg-white dark:bg-[#04070d] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
        {/* Holographic Background Grid Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative flex min-h-screen">
          {/* ===================================================
              DESKTOP SIDEBAR
          ==================================================== */}
          <aside className="hidden w-64 shrink-0 border-r border-slate-200 dark:border-cyan-500/10 bg-white/80 dark:bg-[#060a12]/80 backdrop-blur-xl lg:flex lg:flex-col">
            <div className="flex h-20 items-center gap-3 border-b border-slate-200 dark:border-cyan-500/10 px-6">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Cpu size={22} />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Smart workspace</p>
              </div>
            </div>
            <SidebarContent />
          </aside>

          {/* ===================================================
              MOBILE SIDEBAR DRAWER & BACKDROP OVERLAY
          ==================================================== */}
          <div
            className={`fixed inset-0 z-40 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
              isMobileSidebarOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside
            className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#060a12] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
              isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex h-20 items-center justify-between border-b border-slate-200 dark:border-cyan-500/10 px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Cpu size={20} />
                </div>
                <div>
                  <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                    TaskFlow
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Smart workspace</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-cyan-500/5 text-slate-600 dark:text-cyan-400 transition hover:bg-slate-200 dark:hover:bg-cyan-500/20"
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </aside>

          {/* ===================================================
              MAIN CONTENT AREA
          ==================================================== */}
          <div className="min-w-0 flex-1">
            {/* HEADER */}
            <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 dark:border-cyan-500/10 bg-white/80 dark:bg-[#04070d]/80 backdrop-blur-md px-5 md:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-cyan-500/5 text-slate-600 dark:text-cyan-400 shadow-sm dark:shadow-none transition hover:bg-slate-50 dark:hover:bg-cyan-500/20 lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu size={20} />
                </button>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Workspace</p>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">

                <ThemeToggle />

                {/* Create Task Button */}
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="theme-primary-button relative group overflow-hidden flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold text-white transition-all hover:scale-[1.02]"
                >
                  <Plus size={16} />
                  <span>Create task</span>
                </button>
              </div>
            </header>

            {/* CONTENT */}
            <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-8">
              {/* HERO HUD BANNER */}
              <section className="taskflow-hero dashboard-hero relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-100/70 via-white to-violet-100/70 dark:from-cyan-950/30 dark:via-slate-900/40 dark:to-violet-950/30 p-6 md:p-8 backdrop-blur-md shadow-lg dark:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-3xl animate-[aurora-pulse_8s_ease-in-out_infinite]" />
                <div className="pointer-events-none absolute -bottom-20 right-20 h-72 w-72 rounded-full bg-violet-400/20 dark:bg-violet-500/10 blur-3xl animate-[aurora-pulse_10s_ease-in-out_infinite]" />

                <div className="relative z-10 max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-600/40 bg-cyan-500/15 dark:border-cyan-400/30 dark:bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-900 dark:text-cyan-300 shadow-sm">
                    <Sparkles size={13} />
                    Intelligent workspace
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-slate-900 dark:text-white leading-tight">
                    Build momentum.
                    <br />
                    <span className="bg-gradient-to-r from-cyan-600 via-emerald-500 to-violet-600 dark:from-cyan-400 dark:via-emerald-300 dark:to-violet-400 bg-clip-text text-transparent">
                      One task at a time.
                    </span>
                  </h1>
                  <p className="mt-4 max-w-xl text-xs font-semibold md:text-sm leading-relaxed text-slate-800 dark:text-slate-300 dark:font-normal">
                    Organize your work, track progress and keep everything moving from one intelligent workspace.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-5 py-3 text-xs font-semibold text-white dark:text-slate-950 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all hover:bg-slate-800 dark:hover:bg-slate-200"
                  >
                    Create task
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </section>

              {/* =========================================================
                  STATISTICS CARDS (Theme-Adaptive styling)
                 ========================================================= */}
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* TOTAL TASKS */}
                <div className="taskflow-card-hover taskflow-animate taskflow-delay-1 theme-card group rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-900/60 p-5 shadow-sm transition-all hover:border-violet-500 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300 dark:border-violet-500/30 bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300">
                      <Terminal size={19} />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-violet-800 dark:text-violet-300">
                      Total
                    </span>
                  </div>
                  <p className="mt-5 text-4xl font-black text-slate-900 dark:text-white">
                    {totalTasks}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                    Total tasks
                  </p>
                </div>

                {/* COMPLETED TASKS */}
                <div className="taskflow-card-hover taskflow-animate taskflow-delay-2 theme-card group rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-900/60 p-5 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={19} />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 dark:text-emerald-300">
                      Done
                    </span>
                  </div>
                  <p className="mt-5 text-4xl font-black text-slate-900 dark:text-white">
                    {completedTasks}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                    Completed tasks
                  </p>
                </div>

                {/* IN PROGRESS TASKS */}
                <div className="taskflow-card-hover taskflow-animate taskflow-delay-3 theme-card group rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-900/60 p-5 shadow-sm transition-all hover:border-cyan-500 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300 dark:border-cyan-500/30 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                      <Clock3 size={19} />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-cyan-800 dark:text-cyan-300">
                      In Progress
                    </span>
                  </div>
                  <p className="mt-5 text-4xl font-black text-slate-900 dark:text-white">
                    {inProgressTasks}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                    In progress
                  </p>
                </div>

                {/* TO DO TASKS */}
                <div className="taskflow-card-hover taskflow-animate taskflow-delay-4 theme-card group rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-900/60 p-5 shadow-sm transition-all hover:border-amber-500 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300">
                      <Circle size={19} />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase text-amber-800 dark:text-amber-300">
                      To Do
                    </span>
                  </div>
                  <p className="mt-5 text-4xl font-black text-slate-900 dark:text-white">
                    {todoTasks}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                    To do
                  </p>
                </div>
              </section>

              {/* TASKS LIST SECTION */}
              <section className="taskflow-animate taskflow-delay-5 theme-card overflow-hidden rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-950/60 backdrop-blur-xl shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Header & Controls */}
                <div className="border-b border-slate-200 dark:border-cyan-500/10 p-5 md:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <Radar size={18} className="text-cyan-600 dark:text-cyan-400" />
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent tasks</h3>
                        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
                          {filteredTasks.length}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Manage and track your workspace
                      </p>
                    </div>
                    {/* Search Input */}
                <div className="relative hidden md:block">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search tasks..."
                    className="theme-input h-10 w-64 rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-cyan-950/10 pl-9 pr-9 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm shadow-sm dark:shadow-none transition-all focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                    {/* Mobile Search */}
                    <div className="relative md:hidden">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search tasks..."
                        className="theme-input h-10 w-full rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-cyan-950/10 pl-9 pr-9 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filter Toolbar */}
                  <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <Filter size={14} className="text-cyan-600 dark:text-cyan-400" />
                        <span>Filter:</span>
                      </div>

                      {/* Status Filter Tabs */}
                      <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-cyan-950/20 p-1">
                        <button
                          type="button"
                          onClick={() => setStatusFilter('all')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            statusFilter === 'all'
                              ? 'bg-white dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-sm dark:shadow-none border border-slate-200 dark:border-cyan-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-cyan-200'
                          }`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatusFilter('todo')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            statusFilter === 'todo'
                              ? 'bg-white dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 shadow-sm dark:shadow-none border border-slate-200 dark:border-amber-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-200'
                          }`}
                        >
                          To do
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatusFilter('in_progress')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            statusFilter === 'in_progress'
                              ? 'bg-white dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 shadow-sm dark:shadow-none border border-slate-200 dark:border-blue-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-200'
                          }`}
                        >
                          In progress
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatusFilter('completed')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            statusFilter === 'completed'
                              ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shadow-sm dark:shadow-none border border-slate-200 dark:border-emerald-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-emerald-200'
                          }`}
                        >
                          Completed
                        </button>
                      </div>

                      {/* Priority Filter Select */}
                      <select
                        value={priorityFilter}
                        onChange={(event) =>
                          setPriorityFilter(
                            event.target.value as PriorityFilter,
                          )
                        }
                        className="theme-select rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-cyan-950/20 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="all">All Priorities</option>
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>

                    {filtersActive && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="flex items-center gap-1.5 self-start rounded-xl border border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-cyan-500/5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-cyan-400 hover:border-cyan-500 hover:bg-slate-200 dark:hover:bg-cyan-500/10 xl:self-auto"
                      >
                        <X size={13} />
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>

                {/* TASK LIST DISPLAY */}
                <div>
                  {/* Loading Indicator */}
                  {loading && (
                    <div className="p-12 text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-500/20 border-t-cyan-500" />
                      <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Loading tasks...
                      </p>
                    </div>
                  )}

                  {/* Error Display */}
                  {!loading && error && (
                    <div className="p-12 text-center">
                      <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
                      <button
                        type="button"
                        onClick={loadTasks}
                        className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-600 dark:text-red-300 hover:bg-red-500/20"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {!loading && !error && tasks.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400">
                        <Terminal size={24} />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                        No tasks found
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Get started by creating your first task.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="theme-primary-button mt-5 rounded-xl border border-cyan-500/30 px-4 py-2.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20"
                      >
                        Create task
                      </button>
                    </div>
                  )}

                  {/* No Matching Results State */}
                  {!loading &&
                    !error &&
                    tasks.length > 0 &&
                    filteredTasks.length === 0 && (
                      <div className="p-12 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400">
                          <Search size={20} />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                          No matching tasks
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Try adjusting your filters or search terms.
                        </p>
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5 text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20"
                        >
                          Reset filters
                        </button>
                      </div>
                    )}

                  {/* Tasks Rows */}
                  {!loading && !error && filteredTasks.length > 0 && (
                    <div className="divide-y divide-slate-100 dark:divide-cyan-500/10">
                      {filteredTasks.map((task) => (
                        <div
                          key={task._id}
                          className="taskflow-task-hover group flex flex-col gap-4 p-5 transition-all hover:bg-slate-50 dark:hover:bg-cyan-950/20 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex min-w-0 items-start gap-4">
                            <div className="mt-1 shrink-0">
                              {task.status === 'completed' ? (
                                <CheckCircle2
                                  size={20}
                                  className="text-emerald-600 dark:text-emerald-400"
                                />
                              ) : task.status === 'in_progress' ? (
                                <Clock3
                                  size={20}
                                  className="text-cyan-600 dark:text-cyan-400"
                                />
                              ) : (
                                <Circle size={20} className="text-slate-400 dark:text-slate-600" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                                {task.title}
                              </h4>
                              <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                                {task.description || 'No description provided.'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex shrink-0 items-center gap-3 pl-9 md:pl-0">
                            {/* Status Pill */}
                            <span className="rounded-full border border-slate-200 dark:border-cyan-500/20 bg-slate-100 dark:bg-cyan-950/40 px-3 py-1 text-[10px] font-medium capitalize text-slate-700 dark:text-cyan-300">
                              {task.status.replace('_', ' ')}
                            </span>

                            {/* Priority Badge */}
                            <span
                              className={`rounded-full px-3 py-1 text-[10px] font-semibold capitalize ${
                                task.priority === 'high'
                                  ? 'border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300'
                                  : task.priority === 'medium'
                                    ? 'border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                                    : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                              }`}
                            >
                              {task.priority}
                            </span>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 border-l border-slate-200 dark:border-cyan-500/10 pl-2">
                              <button
                                type="button"
                                onClick={() => handleEditTask(task)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 transition hover:border hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-300"
                                title="Edit Task"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTask(task)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 transition hover:border hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300"
                                title="Delete Task"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* MODALS */}
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTaskCreated={loadTasks}
        />
        <EditTaskModal
          task={editingTask}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          onTaskUpdated={loadTasks}
        />
      </main>
    </GuestGuard>
  );
}