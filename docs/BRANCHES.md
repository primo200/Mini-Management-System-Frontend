# Ticket → Branch Map

Each ticket is developed on its own branch and merged into `main` via a pull
request, so every ticket is traceable to a single, isolated commit.

## Developer 1 — Frontend (UI/UX)

| Ticket | Branch | Description |
| ------ | ------ | ----------- |
| UI-01 | `UI-01` | Setup project structure for frontend |
| UI-02 | `UI-02` | Build navigation bar with links (Home, Dashboard, Records) |
| UI-03 | `UI-03` | Implement Login page with form fields |
| UI-04 | `UI-04` | Implement Registration page with form fields |
| UI-05 | `UI-05` | Build Dashboard layout (cards/summary placeholders) |
| UI-06 | `UI-06` | Apply Tailwind CSS styling for responsiveness |
| UI-07 | `UI-07` | Make the frontend responsive for desktop and mobile |

## Developer 2 — Frontend (Components & Features)

| Ticket | Branch | Description |
| ------ | ------ | ----------- |
| COMP-01 | `COMP-01` | Create "Add Record" form component |
| COMP-02 | `COMP-02` | Build "View Records" table component |
| COMP-03 | `COMP-03` | Add search functionality in table |
| COMP-04 | `COMP-04` | Create "Edit Record" modal/form |
| COMP-05 | `COMP-05` | Create "Delete Record" button with confirmation |
| COMP-06 | `COMP-06` | Implement pagination and filtering in table |
| COMP-07 | `COMP-07` | Add a loading spinner/message while fetching data |

## Branch naming

- `UI-01` … `UI-07` — Developer 1
- `COMP-01` … `COMP-07` — Developer 2

## Pull request convention

```
UI-01: Setup project structure for frontend
```

- Branch off `main`
- Open PR targeting `main`
- Merge with a **squash** commit so `main` history stays readable
- Delete the branch after merge