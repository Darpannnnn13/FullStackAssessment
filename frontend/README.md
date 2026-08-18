# TaskFlow Frontend

The frontend of TaskFlow is a responsive task management dashboard built using Next.js, React, TypeScript and Tailwind CSS.

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Next.js App Router

## Features

- Task dashboard
- Create task
- Edit task
- Delete task
- Task search
- Status filtering
- Priority filtering
- Guest login
- Light theme
- Dark theme
- Aurora theme
- Persistent theme selection
- Responsive desktop/tablet/mobile layout
- Modal animations
- Hover and focus interactions

## Project Structure

```text
frontend/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── tasks/
│   │   │   ├── CreateTaskModal.tsx
│   │   │   └── EditTaskModal.tsx
│   │   ├── ui/
│   │   └── ThemeToggle.tsx
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   └── types/
│       ├── route.ts
│       └── task.ts
│
├── public/
├── .env.local
├── package.json
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json