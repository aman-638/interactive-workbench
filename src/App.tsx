import React from "react";
import NotebookList from "./components/NotebookList";

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6">Interactive Model Analysis Workbench</h1>
      <NotebookList />
    </div>
  );
};

export default App;
