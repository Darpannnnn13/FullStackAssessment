# TaskFlow — Full Stack Task Management System

A modern, responsive task management application built as part of a Full Stack Developer Technical Assessment.

The application is designed around a clean, futuristic SaaS dashboard experience while maintaining a professional and practical interface. It provides task creation, editing, deletion, searching, filtering, theme customization, and responsive interaction across desktop and mobile devices.

---

## Overview

TaskFlow is a full-stack Task Management System built using:

- **Next.js** with App Router
- **Tailwind CSS**
- **NestJS**
- **MongoDB Atlas**
- **TypeScript**
- **Mongoose**
- **class-validator**

The project follows a separated frontend/backend architecture:

```text
FullStackAssessment/
│
├── frontend/       # Next.js frontend application
│
└── backend/        # NestJS REST API
```

---

# Features

## Task Management

The application supports complete task CRUD functionality:

- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Task status management
- Task priority management
- Optional due dates
- Optional task descriptions

### Task Status

```text
todo
in_progress
completed
```

### Task Priority

```text
low
medium
high
```

---

## Search

Users can search through tasks using the task search interface.

Search is integrated with the task management area so that task-related controls remain grouped with the task list.

---

## Filtering

Tasks can be filtered by:

- Status
- Priority

This allows users to quickly narrow down the task list.

---

## Guest Login

The application provides Guest Login functionality so users can access the task management interface without requiring a traditional account registration flow.

---

## Theme System

The application provides three themes:

```text
Light
Dark
Aurora
```

The selected theme persists across page refreshes.

### Light Theme

The Light theme uses a clean SaaS-style hierarchy:

```text
Page background → Light grey
Navbar          → White
Sidebar         → White
Cards           → White
Containers      → White
Inputs          → Very light grey
Primary text    → Dark
Secondary text  → Slate grey
Borders         → Light grey
```

### Dark Theme

The Dark theme provides a dark futuristic workspace while maintaining readability and contrast.

### Aurora Theme

Aurora provides a more visually expressive futuristic interface using cyan, blue and purple accents while retaining the same core application functionality.

---

# Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The desktop layout uses a persistent sidebar, while mobile layouts provide a compact navigation experience.

The interface adapts task controls, cards, navigation and content areas according to screen size.

---

# UI / UX

The interface follows a modern SaaS dashboard approach inspired by products such as:

- Linear
- Vercel
- Raycast

The design intentionally avoids excessive gaming-style visual effects.

The UI focuses on:

- Clear information hierarchy
- Consistent spacing
- Responsive layouts
- Professional typography
- Subtle visual effects
- Clear interaction states
- Accessible contrast
- Consistent theme behavior

---

# Animations and Interactions

The interface includes subtle animations and interactions to improve the overall experience without distracting from the application.

Examples include:

- Dashboard entrance animations
- Card hover effects
- Task row hover interactions
- Button micro-interactions
- Modal transitions
- Theme transitions
- Subtle Aurora effects
- Responsive navigation interactions

Animations are intentionally restrained to maintain a professional technical-assessment quality.

The application also respects users who prefer reduced motion through CSS `prefers-reduced-motion` support.

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | UI components |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| CSS | Theme and animation system |

## Backend

| Technology | Purpose |
|---|---|
| NestJS | Backend framework |
| TypeScript | Backend language |
| Mongoose | MongoDB ODM |
| MongoDB Atlas | Database |
| class-validator | Request validation |

---

# Project Architecture

```text
                    ┌─────────────────────┐
                    │     Next.js UI      │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │      NestJS API     │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │      Database       │
                    └─────────────────────┘
```

---

# Project Structure

## Frontend

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
```

### Important frontend areas

**`app/page.tsx`**

Main dashboard interface and application-level UI composition.

**`app/globals.css`**

Global styling, theme definitions, theme-specific overrides and UI animations.

**`src/components/tasks/`**

Reusable task-related components including:

- Create Task Modal
- Edit Task Modal

**`src/components/ThemeToggle.tsx`**

Theme selection and switching interface.

**`src/lib/api.ts`**

Frontend API communication layer.

**`src/types/`**

TypeScript type definitions used by the frontend.

---

# Backend Structure

```text
backend/
├── src/
│   ├── tasks/
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   ├── schemas/
│   │   │   └── task.schema.ts
│   │   ├── tasks.controller.spec.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.module.ts
│   │   ├── tasks.service.spec.ts
│   │   └── tasks.service.ts
│   │
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── postman/
├── .env
├── package.json
├── nest-cli.json
└── tsconfig.json
```

---

# Backend Architecture

The backend follows NestJS modular architecture.

```text
TasksModule
│
├── TasksController
│       │
│       └── HTTP routes
│
├── TasksService
│       │
│       └── Business/data operations
│
├── CreateTaskDto
│       │
│       └── Create validation
│
├── UpdateTaskDto
│       │
│       └── Update validation
│
└── TaskSchema
        │
        └── MongoDB/Mongoose model
```

This separation keeps HTTP handling, validation, business logic and database structure organized independently.

---

# API Documentation

The backend exposes the following REST endpoints.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks` | Retrieve tasks |
| `GET` | `/tasks/:id` | Retrieve a specific task |
| `PATCH` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

---

# Create Task

### Request

```http
POST /tasks
Content-Type: application/json
```

Example:

```json
{
  "title": "Complete assessment",
  "description": "Finish the full stack technical assessment",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-08-25T00:00:00.000Z"
}
```

### Fields

| Field | Required | Validation |
|---|---|---|
| `title` | Yes | String, 1–120 characters |
| `description` | No | String, maximum 1000 characters |
| `status` | No | `todo`, `in_progress`, `completed` |
| `priority` | No | `low`, `medium`, `high` |
| `dueDate` | No | Valid ISO date string |

If `status` is not provided, the backend defaults it to:

```text
todo
```

If `priority` is not provided, the backend defaults it to:

```text
medium
```

---

# Update Task

```http
PATCH /tasks/:id
Content-Type: application/json
```

Example:

```json
{
  "status": "completed",
  "priority": "high"
}
```

The update DTO uses NestJS `PartialType`, making all create-task fields optional during updates while retaining the original validation rules.

---

# Task Data Model

The MongoDB task schema contains:

```text
Task
├── title
├── description
├── status
├── priority
├── dueDate
├── createdAt
└── updatedAt
```

### Title

```text
Required
Maximum length: 120
Trimmed
```

### Description

```text
Optional
Maximum length: 1000
Trimmed
```

### Status

```text
todo
in_progress
completed
```

Default:

```text
todo
```

### Priority

```text
low
medium
high
```

Default:

```text
medium
```

### Due Date

Optional date field.

### Timestamps

MongoDB timestamps automatically maintain:

```text
createdAt
updatedAt
```

---

# Validation

The backend uses NestJS DTO validation through `class-validator`.

The create task DTO validates:

- Required title
- String types
- Minimum and maximum title length
- Description length
- Valid task status
- Valid task priority
- Valid ISO date strings

Invalid requests are rejected by the backend validation layer rather than relying only on frontend validation.

---

# Environment Variables

## Frontend

Create:

```text
frontend/.env.local
```

The frontend API configuration should contain the backend API base URL used by the application.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Use the actual environment variable name configured in the project's API client.

---

## Backend

Create:

```text
backend/.env
```

The backend requires the MongoDB Atlas connection configuration used by the application.

Example structure:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=3001
```

Do **not** commit real database credentials to GitHub.

---

# Installation

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account

---

# Run the Backend

Open a terminal:

```cmd
cd "C:\Users\darpan meher\Desktop\FullStackAssessment\backend"
```

Install dependencies:

```cmd
npm install
```

Start the development server:

```cmd
npm run start:dev
```

If Windows PowerShell reports an npm execution-policy error, use:

```cmd
npm.cmd run start:dev
```

The backend runs on the configured port, approximately:

```text
http://localhost:3001
```

---

# Run the Frontend

Open another terminal:

```cmd
cd "C:\Users\darpan meher\Desktop\FullStackAssessment\frontend"
```

Install dependencies:

```cmd
npm install
```

Start the development server:

```cmd
npm run dev
```

If required:

```cmd
npm.cmd run dev
```

The frontend is available at:

```text
http://localhost:3000
```

---

# Running Both Applications

Two terminals are required during local development.

### Terminal 1 — Backend

```cmd
cd backend
npm run start:dev
```

### Terminal 2 — Frontend

```cmd
cd frontend
npm run dev
```

The request flow is:

```text
Browser
   │
   ▼
Next.js
   │
   │ HTTP REST API
   ▼
NestJS
   │
   │ Mongoose
   ▼
MongoDB Atlas
```

---

# Database

MongoDB Atlas is used as the application's database.

Mongoose provides the object-document mapping between the NestJS backend and MongoDB.

The Task schema is defined using NestJS Mongoose decorators.

The backend uses the MongoDB connection configured through environment variables.

---

# Security and Configuration

Environment files containing secrets should not be committed to the repository.

The project uses:

```text
.env
.env.local
```

for environment-specific configuration.

MongoDB Atlas Network Access must allow the machine running the backend to connect to the database.

For local development, MongoDB Atlas IP access can be configured through the Atlas Network Access settings.

---

# Design Fidelity

The frontend was implemented based on the provided Figma design for the assessment.

Attention was given to:

- Layout
- Spacing
- Typography
- Colors
- Cards
- Navigation
- Icons
- Theme behavior
- Responsive behavior
- Modal interactions
- Hover states
- Animations

The implementation also adapts the interface for smaller screen sizes where required.

Any intentional UI deviations should be documented here before final submission.

---

# Theme Architecture

The application supports three visual themes:

```text
Light
Dark
Aurora
```

Theme selection is persisted so the selected theme remains active after refreshing the application.

Theme-specific styling is handled through the global CSS theme system rather than rebuilding the application for each theme.

This allows the same task functionality and component structure to operate across all themes.

---

# Component Reusability

The frontend separates reusable functionality into components.

Examples include:

```text
CreateTaskModal
EditTaskModal
ThemeToggle
```

Task-related functionality is kept separate from the main dashboard composition where practical.

This makes the UI easier to maintain and allows components to be reused or extended in future features.

---

# Testing

The NestJS backend contains testing structure for:

- Controllers
- Services
- End-to-end application behavior

Relevant files include:

```text
backend/src/tasks/tasks.controller.spec.ts
backend/src/tasks/tasks.service.spec.ts
backend/test/app.e2e-spec.ts
```

---

# API Testing

The backend also contains Postman-related resources:

```text
backend/postman/
backend/.postman/
```

These can be used during API testing and development.

---

# Assessment Requirements

## Part 1 — Task Management System

| Requirement | Status |
|---|---|
| Next.js | Completed |
| App Router | Completed |
| Tailwind CSS | Completed |
| NestJS | Completed |
| TypeScript | Completed |
| MongoDB | Completed |
| Task CRUD | Completed |
| Guest Login | Completed |
| Theme support | Completed |
| Theme persistence | Completed |
| Search | Completed |
| Status filtering | Completed |
| Priority filtering | Completed |
| Responsive design | Completed |
| Reusable components | Completed |
| Backend validation | Completed |
| Animations | Completed |
| UI interactions | Completed |
| README | Completed |

---

# Part 2 — AbleSpace

The second part of the assessment requires exploring the:

```text
AbleSpace
→ Caseload
→ Take Data
```

workflow.

The submission will include either:

- A document containing screenshots and a workflow explanation

or:

- A video walkthrough

The submission will also include identified:

- UX improvements
- UI improvements
- Functionality improvements

The Part 2 material will be provided separately as required by the assessment.

---

# Future Improvements

Potential future enhancements include:

- Full user authentication
- User-specific task ownership
- Project management
- Team collaboration
- Role-based permissions
- Real-time task updates
- Advanced analytics
- Notifications
- Task categories/tags
- Drag-and-drop task management

These are considered future enhancements and are not presented as currently implemented functionality.

---

# Deployment

The production submission will provide:

- Public GitHub repository
- Working frontend URL
- Working backend/API deployment
- README documentation
- Part 2 AbleSpace submission

The deployed application should remain accessible according to the assessment submission requirements.

---

# Git Workflow

The project is maintained using Git for version control.

Development should be represented through meaningful commits rather than a single large final commit.

Examples of meaningful commits:

```text
feat: implement task CRUD APIs
feat: add task creation modal
feat: add task editing and deletion
feat: implement task search and filters
feat: add guest login
feat: implement theme persistence
style: improve dashboard visual fidelity
style: polish responsive layout
style: add dashboard animations
docs: add project documentation
```

This makes the development history easier to understand and review.

---

# Project Goals

The primary goals of this project are:

1. Build a functional full-stack task management application.
2. Closely reproduce the provided design.
3. Maintain clean frontend/backend separation.
4. Implement reusable React components.
5. Provide clean NestJS APIs.
6. Validate incoming API data.
7. Maintain responsive behavior.
8. Provide persistent theme support.
9. Create a professional and polished user experience.
10. Demonstrate understanding of full-stack development practices.

---

# Author

**Darpan Meher**

Full Stack Developer — Fresher Technical Assessment

---

## License

This project was created as part of a technical assessment.