# 🚀 PM2 Web Panel

This application is built to be fast, optimized, and self-hosted. There is no focus on SEO; in fact, we want to remove everything related to SEO to prioritize user experience and performance.

## 🛠 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [Prisma ORM](https://www.prisma.io/) (SQLite via Better-SQLite3 by default)
- **Validation:** [Zod](https://zod.dev/)
- **Components:** [React 19](https://react.dev/) (Composition Architecture)

---

## 🎨 Project Philosophy

- **Performance & UX First:** All design and implementation must prioritize fluidity and speed of use.
- **Zero SEO:** This application MUST NOT have SEO meta tags, sitemaps, robots.txt, or any search engine optimization. **Remove any existing SEO files or configurations (e.g., `sitemap.ts`, `robots.ts`, `manifest.ts`).**
- **No Authentication:** The panel is open access; any user who accesses it can manage processes. **It must not have authentication or login systems.** Ignore or remove `User` models and JWT/Bcrypt logic.

## 📋 Features

- Process listing
- Process creation via interface
- Process editing via interface
- Process removal via interface
- Management of a project's .env files via interface

---

## 📂 Architecture Conventions

### 1. Components & UI

- **Composition:** Follow the _Component Composition_ pattern to avoid prop drilling and create flexible components.
- **Definition:** Always use `const` to define components and their internal methods.
- **Exports:** Page components or main components in files must be exported as `default`.
- **Typing:** Unless the typing needs to be exported, name it simply as `Props`.
- **Naming:** Files must use `kebab-case.tsx`.
- **Icons:** Preferably use the **Lucide** library via the `lucide-react` package.

### 2. File Organization (`src/`)

- **`app/`**: Contains all pages, layouts, and page-exclusive components.
    - Components that belong only to one page should be in a `components/` subfolder within the respective page's directory.
- **`schemas/`**: Zod validation schemas.
    - Each entity must have its own directory to organize related schemas (e.g., `src/schemas/processes`).
    - File name: `{name}.schema.ts` (kebab-case).
    - Export: Named export of the schema and the inferred type `{name}Values` or `{name}FormValues`.
- **`hooks/`**: Custom hooks.
    - File name: `{name}.hook.ts`.
    - Special folder: `hooks/forms/` to centralize form logic.
- **`services/`**: Business logic layer and communication with PM2 or Database.
    - File name: `{name}.service.ts`.
    - Export: Named export.
- **`utils/`**: Utility functions (formatting, calculations, simple validations).
    - File name: `{name}.util.ts`.
    - Export: Named export.
    - Preferences: Use the `function` keyword instead of `const` for utility functions. Do not use internal comments in the code.

- **`helpers/`**: Helper functions and global constants.

### 2. API Routes (NestJS Pattern)

API routes must follow the RESTful convention inspired by NestJS to maintain consistency and predictability:

- `POST /` - Creates a new entity.
- `GET /` - Fetches a list of entities (with support for filters/pagination).
- `GET /{id}` - Fetches a single entity by ID.
- `PATCH /{id}` - Partially updates an existing entity.
- `DELETE /{id}` - Removes an entity from the system.

### 3. Code Style (Prettier & Lint)

- **Indentation:** 4 spaces.
- **Semicolons:** Do not use semicolons (`;`).
- **Quotes:** Use double quotes (`"`).
- **No Comments:** Avoid adding explanatory comments within the code, unless strictly necessary for complex logic.

---

## 🗄️ Database Management (Prisma)

The project uses **Prisma ORM**. All database interactions must follow these commands:

- **Migrations:**
    - `npm run db:migrate:dev`: Creates and applies a new migration in development.
    - `npm run db:migrate:deploy`: Applies pending migrations in production.
    - `npm run db:migrate:reset`: Resets the database (Warning: deletes all data).
- **Synchronization:**
    - `npm run db:push`: Synchronizes the schema directly with the database without creating migration files.
    - `npm run db:generate`: Generates the Prisma Client in `src/generated/prisma`. **Always run after changing `schema.prisma`**.
- **Interface & Data:**
    - `npm run db:studio`: Opens Prisma Studio to view and edit data via web interface.
    - `npm run db:seed`: Executes the main seed script.
    - `npm run db:seed:dev`: Executes the development seed using `tsx`.

---

## 🚀 Working Methodology

- **XP & Pair Programming:** This project is developed following *Extreme Programming* principles. We operate in constant *Pair Programming*, where the **USER** acts as the navigator/mentor directing the vision and rules, and the **AGENT (AI)** acts as the executor turning ideas into functional code.
- **Autonomy with Collaboration:** Although the AGENT is the primary executor, it has the autonomy to express opinions, suggest architectural improvements, point out possible technical debts, and make grounded technical decisions to ensure the boilerplate remains robust and follows best practices.
- **Paying Technical Debts:** Technical debts must be paid before implementing new features. This includes refactoring large components into smaller sub-components, code cleanup, improving typings, and ensuring the codebase remains clean and sustainable.

## 🤖 Guidelines for AI Agents

When working on this project, follow these rules:

1. **Validation First:** Before creating forms or services, define the Zod Schema in `src/schemas`.
2. **Modularization:** If a component starts growing too large, extract sub-components using the composition pattern.
3. **Function Pattern:** For utilities and general logic, use the `function` keyword instead of `const`.
4. **Code Quality:** Whenever making changes, you must:
    - Run `npm run ci` regularly to ensure lint, format, and tests are passing.
    - The `ci` script is the gold standard for local validation before commits or deploys.
5. **Prisma:** The Prisma client is generated in `src/generated/prisma`. Use it for database interactions.
6. **Tailwind 4:** Use new Tailwind 4 features. Avoid arbitrary CSS if a native utility exists.
7. **Clean Code:** Keep functions small, use descriptive names, and follow the single responsibility principle.
8. **Unit Tests:**
    - The backend must have **100% test coverage**.
    - Use **Vitest** as the test runner.
    - Tests must be written for every new implementation of a service, utility, or relevant business logic.
    - Use commands `npm run test` or `npm run test:coverage` to validate implementation.
9. **Docker:** The project uses multi-stage builds and `standalone` output in the Dockerfile for image optimization.

---

## 📂 Summary Folder Structure

```text
/src
 ├── app/          # Routes, Layouts, and Page Components
 ├── components/   # Global/Shared Components
 ├── helpers/      # Global helpers
 ├── hooks/        # Custom hooks
 ├── schemas/      # Zod Validations (e.g., process.schema.ts)
 ├── services/     # Business Logic (PM2/DB Interaction)
 ├── utils/        # Utilities (e.g., formatter.util.ts)
 └── generated/    # Generated code (Prisma Client)
```
