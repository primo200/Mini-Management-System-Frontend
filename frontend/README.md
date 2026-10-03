# Mini Management System — Frontend

React 19 + TypeScript + Vite + Tailwind CSS v4 frontend for the Mini
Management System prototype.

## Scripts

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check + production build
npm run lint     # oxlint
npm run preview  # serve the production build
```

## Structure

```
src/
├── components/
│   ├── layout/    # AppLayout, Navbar, Footer
│   ├── records/   # RecordForm, RecordTable, modals, pagination
│   └── ui/        # Spinner, Modal, Badge, form fields
├── context/       # AuthContext, RecordsContext
├── hooks/         # useAuth, useRecords
├── lib/           # cn(), storage helpers, validation
├── pages/         # Home, Login, Register, Dashboard, Records
├── services/      # api.ts — mock data layer (swap for real REST)
├── types/         # shared domain types
├── App.tsx        # route table
└── main.tsx       # entry point
```

## Backend integration

`src/services/api.ts` is a localStorage-backed mock that mirrors the REST API
the backend team will build. See the root `README.md` for the endpoint map.