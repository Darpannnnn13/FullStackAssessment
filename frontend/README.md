# TaskFlow — Task Management System

A modern full-stack task management application built with Next.js, NestJS, MongoDB, and TypeScript.

TaskFlow provides a clean and responsive workspace for creating, managing, searching, filtering, editing, and deleting tasks.

---

## 🚀 Features

### Task Management

- Create tasks
- Edit tasks
- Delete tasks
- View tasks
- Task status management
- Task priority management

### Status

Tasks can have one of the following statuses:

- To Do
- In Progress
- Completed

### Priority

Tasks support:

- Low
- Medium
- High

### Search & Filtering

- Search tasks by title
- Search tasks by description
- Filter by status
- Filter by priority
- Clear all filters

### Dashboard

The dashboard provides:

- Total task count
- Completed task count
- In-progress task count
- To-do task count
- Recent task listing

### UI / UX

- Responsive design
- Mobile sidebar navigation
- Light theme
- Dark theme
- Aurora/futuristic visual design
- Animated task cards
- Modal animations
- Responsive task creation/editing
- Loading states
- Error states
- Empty states

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- NestJS
- TypeScript
- REST API

### Database

- MongoDB
- Mongoose

### Development Tools

- VS Code
- Git
- GitHub
- npm

---

## 📁 Project Structure

```text
FullStackAssessment/
│
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── auth/
│   │   └── tasks/
│   ├── lib/
│   ├── types/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── tasks/
│   │   └── ...
│   └── package.json
│
└── README.md