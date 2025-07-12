# 🧩 DESIGN.md — Interactive Model Analysis Workbench

This document outlines the architecture, design decisions, and component breakdown for the interactive notebook system.

---

## 🧠 State Management – Zustand

Zustand manages all client-side state. Here's the store shape:

```ts
interface Cell {
  id: string;
  code: string;
}

interface Notebook {
  id: string;
  name: string;
  cells: Cell[];
}

interface Store {
  notebooks: Notebook[];
  createNotebook: (name: string) => void;
  deleteNotebook: (id: string) => void;
  addCell: (notebookId: string) => void;
  deleteCell: (notebookId: string, cellId: string) => void;
  reorderCells: (notebookId: string, cellId: string, newIndex: number) => void;
}
```

---

## 📡 WebSocket & Kernel Execution

- We use Jupyter's REST API to create kernels.
- Then connect via WebSocket:

```ts
ws://localhost:8000/user/admin/api/kernels/<kernel_id>/channels?token=<token>
```

### Flow:

1. User clicks **Run**
2. App calls `/api/kernels` to create a new kernel
3. WebSocket is opened with kernel ID + token
4. A JSON `execute_request` message is sent
5. Output streams via WebSocket

---

## 🧩 Component Breakdown

### `NotebookList`
- Sidebar with all notebooks
- Can create or delete notebooks

### `Notebook`
- Container for a list of cells

### `CellList`
- Renders the list of code cells
- Uses `react-window` for performance

### `Cell`
- Code input and execution
- Sends code to WebSocket and streams results live

---

## 🧰 Additional Features

- Live code updates
- Cell virtualization for performance
- Tailwind for modern responsive UI
- Fully modular and scalable structure

---

## 💡 Future Improvements

- Persist notebooks via API or LocalStorage
- Support Markdown & Output Types
- Enable file upload / export
- Multi-user and auth support

---