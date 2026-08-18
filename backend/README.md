
---

# `backend/README.md`

And the backend README should be API-focused:

```md
# TaskFlow Backend

The backend of TaskFlow is a REST API built using NestJS, TypeScript, Mongoose and MongoDB Atlas.

## Tech Stack

- NestJS
- TypeScript
- Mongoose
- MongoDB Atlas
- class-validator
- class-transformer

## Features

- Task creation
- Task retrieval
- Single task retrieval
- Task updates
- Task deletion
- DTO validation
- MongoDB persistence
- REST API architecture
- Automatic timestamps

## Project Structure

```text
backend/
├── src/
│   ├── tasks/
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   │
│   │   ├── schemas/
│   │   │   └── task.schema.ts
│   │   │
│   │   ├── tasks.controller.ts
│   │   ├── tasks.module.ts
│   │   └── tasks.service.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── test/
├── postman/
├── .env
├── package.json
├── nest-cli.json
└── tsconfig.json