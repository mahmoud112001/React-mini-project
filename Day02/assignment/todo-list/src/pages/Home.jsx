import { Link } from "react-router-dom";

export default function Home({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const active    = tasks.filter((t) => !t.completed).length;
  const percent   = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">

      <div className="mt-6 mb-6 bg-green-600 text-white rounded p-4">
        <h1 className="text-xl font-bold">Hello 👋</h1>
        <p className="text-sm mt-1 text-green-100">Welcome back, Mahmoud Awad</p>
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-200 rounded p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-bold text-green-600">{percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className="bg-green-500 h-2 rounded transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {completed} of {tasks.length} tasks done
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{active}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white border border-gray-200 rounded p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">{completed}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
      </div>

      <Link
        to="/tasks"
        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded font-semibold text-sm transition-colors"
      >
        + Add New Task
      </Link>
    </div>
  );
}