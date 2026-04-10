import { useState } from "react";

export default function AddTaskInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Write a new task..."
        className="flex-1 border-2 border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
      />
      <button
        onClick={handleAdd}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
      >
        Add
      </button>
    </div>
  );
}