import { create } from "zustand";

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

export const useStore = create<Store>((set) => ({
  notebooks: [],
  createNotebook: (name) =>
    set((state) => {
      const newNotebook = { id: `${Date.now()}`, name, cells: [] };
      return { notebooks: [...state.notebooks, newNotebook] };
    }),
  deleteNotebook: (id) =>
    set((state) => ({
      notebooks: state.notebooks.filter((notebook) => notebook.id !== id),
    })),
  addCell: (notebookId) =>
    set((state) => {
      const updatedNotebooks = state.notebooks.map((notebook) => {
        if (notebook.id === notebookId) {
          const newCell = { id: `${Date.now()}`, code: "" };
          notebook.cells.push(newCell);
        }
        return notebook;
      });
      return { notebooks: updatedNotebooks };
    }),
  deleteCell: (notebookId, cellId) =>
    set((state) => {
      const updatedNotebooks = state.notebooks.map((notebook) => {
        if (notebook.id === notebookId) {
          notebook.cells = notebook.cells.filter((cell) => cell.id !== cellId);
        }
        return notebook;
      });
      return { notebooks: updatedNotebooks };
    }),
  reorderCells: (notebookId, cellId, newIndex) =>
    set((state) => {
      const updatedNotebooks = state.notebooks.map<Notebook>((notebook) => {
        if (notebook.id === notebookId) {
          const cell = notebook.cells.find((cell) => cell.id === cellId);

          // Check if cell is found (not undefined)
          if (cell) {
            notebook.cells = notebook.cells.filter(
              (cell) => cell.id !== cellId
            );
            notebook.cells.splice(newIndex, 0, cell);
          } else {
            console.warn(`Cell with ID ${cellId} not found.`);
          }
        }
        return notebook;
      });

      return { notebooks: updatedNotebooks };
    }),
}));
