import { useState } from "react";
import { postMessageToBackend } from "./lib/utils";

function App() {
  const [count, setCount] = useState(5);
  const createRect = () => {
    postMessageToBackend("create-rectangles", { count: count });
  };

  const onCancel = () => {
    postMessageToBackend("cancel");
  };

  return (
    <>
      <div className="p-4 space-y-3 text-sm font-sans">
        <h1 className="text-lg font-semibold">🚀 Figma Plugin Starter</h1>
        <p className="text-gray-600">
          Use this panel to interact with your plugin. Update controls as needed.
        </p>

        <input
          id="count"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        />

        <button
          onClick={createRect}
          className="w-full bg-blue-600 text-white rounded py-1 hover:bg-blue-700"
        >
          Create Rectangle
        </button>

        <button
          onClick={onCancel}
          className="w-full bg-red-600 text-white rounded py-1 hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default App;
