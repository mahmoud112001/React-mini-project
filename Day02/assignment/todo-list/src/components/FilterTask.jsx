export default function FilterTask({ filter, onFilterChange, tasks }) {
  const all       = tasks.length;
  const active    = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  const btn = (label, value, count) => (
    <button
      onClick={() => onFilterChange(value)}
      className={`flex-1 py-1 text-sm border-b-2 transition-colors ${
        filter === value
          ? "border-green-600 text-green-700 font-semibold"
          : "border-transparent text-gray-500"
      }`}
    >
      {label} ({count})
    </button>
  );

  return (
    <div className="flex mb-4 border-b border-gray-200">
      {btn("All", "all", all)}
      {btn("Active", "active", active)}
      {btn("Done", "completed", completed)}
    </div>
  );
}