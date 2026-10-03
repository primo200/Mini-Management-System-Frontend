# Mini Management System — Frontend (Prototype)

A clean, responsive web interface for the **Mini Management System** prototype.
This repository contains the frontend work for **Developer 1 (UI/UX)** and
**Developer 2 (Components & Features)**.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**.

---

## Team Scope

| Developer | Role | Ticket range | Branch prefix |
| --------- | ---- | ------------ | ------------- |
| Developer 1 | Frontend — UI/UX | `UI-01` … `UI-07` | `UI-` |
| Developer 2 | Frontend — Components & Features | `COMP-01` … `COMP-07` | `COMP-` |

Developers 3 and 4 own the backend (Django/Node) and Developer 5 owns
integration. They are tracked in a separate repository.

---

## Tech Stack

- **React 19** — component model
- **TypeScript** — typed domain models (`ManagementRecord`, etc.)
- **Vite 8** — dev server and build tooling
- **Tailwind CSS v4** — utility-first styling, responsive by default
- **React Router 7** — client-side routing between pages
- **oxlint** — linting

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/        # AppLayout, Navbar, Footer
│   │   ├── records/       # RecordForm, RecordTable, modals, pagination
│   │   └── ui/            # Spinner, Button, Input, Modal, Badge
│   ├── context/           # AuthContext, RecordsContext (React Context)
│   ├── hooks/             # useRecords, useAuth
│   ├── lib/               # cn(), storage helpers
│   ├── pages/             # Home, Login, Register, Dashboard, Records
│   ├── services/          # api.ts (mock data layer, swap for real REST)
│   ├── types/             # Shared TypeScript domain types
│   ├── App.tsx            # Router definition
│   └── main.tsx           # Entry point
└── ...
```

---

## Getting Started

```bash
cd frontend
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check + production build
npm run lint     # lint with oxlint
npm run preview  # preview the production build
```

---

## Data Layer

The backend does not exist yet, so the UI runs against a **mock API service**
(`src/services/api.ts`) that is backed by `localStorage` and simulates network
latency and failures.

This mirrors the shape of the real REST API, so pointing the app at the live
backend later only requires editing that single file — no component changes.

| Method | Endpoint it will call |
| ------ | --------------------- |
| `auth.login()` | `POST /api/login` |
| `auth.register()` | `POST /api/register` |
| `records.list()` | `GET /api/records` |
| `records.create()` | `POST /api/records` |
| `records.update()` | `PUT /api/records/:id` |
| `records.remove()` | `DELETE /api/records/:id` |

---

## Workflow

Each ticket is developed on its own branch and merged into `main` through a
pull request. See [`docs/BRANCHES.md`](./docs/BRANCHES.md) for the full
ticket-to-branch map.