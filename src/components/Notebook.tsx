import React from "react";
import { useStore } from "../store/useStore";
import { CellList } from "./CellList";

export const Notebook = ({ notebookId }: { notebookId: string }) => {
  const { addCell } = useStore((state) => state);
  const notebook = useStore((state) =>
    state.notebooks.find((n) => n.id === notebookId)
  );

  if (!notebook) return <p className="text-red-500">Notebook not found.</p>;

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          🧾 Notebook: {notebook.name}
        </h2>
        <button
          onClick={() => addCell(notebookId)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Add Cell
        </button>
      </div>
      <CellList notebookId={notebookId} />
    </div>
  );
};
