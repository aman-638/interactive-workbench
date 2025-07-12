import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { Notebook } from "./Notebook";

const NotebookList = () => {
  const { notebooks, createNotebook, deleteNotebook } = useStore(
    (state) => state
  );
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(
    null
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={() => createNotebook("New Notebook")}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition"
        >
          ➕ Create Notebook
        </button>

        <div className="flex flex-wrap gap-2">
          {notebooks.map((notebook) => (
            <div
              key={notebook.id}
              className={`flex items-center gap-2 px-3 py-1 rounded-md border cursor-pointer ${
                selectedNotebookId === notebook.id
                  ? "bg-indigo-100 border-indigo-400"
                  : "bg-white border-gray-300"
              }`}
            >
              <button
                onClick={() => setSelectedNotebookId(notebook.id)}
                className="text-indigo-700 font-medium hover:underline"
              >
                {notebook.name}
              </button>
              <button
                onClick={() => deleteNotebook(notebook.id)}
                className="text-red-600 hover:text-red-800"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedNotebookId && <Notebook notebookId={selectedNotebookId} />}
    </div>
  );
};

export default NotebookList;
