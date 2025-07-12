import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import axios from "axios";
import { createWebSocketConnection } from "../utils/websocket";

const JUPYTER_API = "http://localhost:8000/user/admin/api";
const JUPYTER_TOKEN = "your_token_here";

export const Cell = ({
  cellId,
  notebookId,
}: {
  cellId: string;
  notebookId: string;
}) => {
  const { deleteCell } = useStore((state) => state);
  const notebook = useStore((state) =>
    state.notebooks.find((n) => n.id === notebookId)
  );
  const cell = notebook?.cells.find((c) => c.id === cellId);

  const [code, setCode] = useState(cell?.code || "");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!cell) return;
    cell.code = code;
  }, [code, cell]);

  const startKernel = async (): Promise<string> => {
    const res = await axios.post(
      `${JUPYTER_API}/kernels`,
      {},
      {
        headers: { Authorization: `token ${JUPYTER_TOKEN}` },
      }
    );
    return res.data.id;
  };

  const handleRun = async () => {
    if (!cell) return;

    setOutput("⏳ Running...");

    const kernelId = await startKernel();
    const ws = createWebSocketConnection(kernelId, JUPYTER_TOKEN, (msg) => {
      if (msg.msg_type === "stream" && msg.content.name === "stdout") {
        setOutput((prev) => prev + msg.content.text);
      }

      if (msg.msg_type === "error") {
        setOutput(`Error: ${msg.content.ename} - ${msg.content.evalue}`);
      }
    });

    ws.onopen = () => {
      const message = {
        header: {
          msg_id: `${Date.now()}`,
          username: "admin",
          session: "mysession",
          msg_type: "execute_request",
          version: "5.3",
        },
        parent_header: {},
        metadata: {},
        content: {
          code: code,
          silent: false,
          store_history: true,
          user_expressions: {},
          allow_stdin: false,
          stop_on_error: true,
        },
        channel: "shell",
      };

      ws.send(JSON.stringify(message));
    };
  };

  if (!cell) return null;

  return (
    <div className="bg-white rounded-md shadow p-4 border border-gray-300 mb-4">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
        placeholder="Write Python code here..."
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleRun}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          ▶ Run
        </button>
        <button
          onClick={() => deleteCell(notebookId, cellId)}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          🗑 Delete
        </button>
      </div>
      {output && (
        <div className="mt-4 bg-gray-100 p-3 rounded font-mono text-sm text-gray-800 whitespace-pre-wrap">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};
