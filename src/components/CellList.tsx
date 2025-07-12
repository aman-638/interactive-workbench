import React from "react";
import { useStore } from "../store/useStore";
import { Cell } from "./Cell";

export const CellList = ({ notebookId }: { notebookId: string }) => {
  const notebook = useStore((state) =>
    state.notebooks.find((n) => n.id === notebookId)
  );

  if (!notebook) return null;

  return (
    <div className="space-y-4">
      {notebook.cells.map((cell) => (
        <Cell key={cell.id} cellId={cell.id} notebookId={notebookId} />
      ))}
    </div>
  );
};
