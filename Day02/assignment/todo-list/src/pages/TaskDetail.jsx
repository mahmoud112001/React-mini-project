import { useParams, useNavigate } from "react-router-dom";

export default function TaskDetail({ tasks, onToggle, onDelete }) {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const task       = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <i className="fa-solid fa-circle-exclamation text-4xl text-gray-300 mb-3"></i>
        <p className="text-gray-500 mb-4 text-sm">Task not found.</p>
        <button
          onClick={() => navigate("/tasks")}
          className="text-green-600 font-semibold text-sm"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mt-6 mb-4 flex items-center gap-2 text-gray-500 text-sm"
      >
        <i className="fa-solid fa-arrow-right"></i>
        Back
      </button>

      <div className="bg-white border border-gray-200 rounded p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${task.completed ? "bg-green-100" : "bg-gray-100"}`}>
            <i className={`${task.completed ? "fa-solid fa-check text-green-500" : "fa-regular fa-clock text-gray-400"}`}></i>
          </div>
          <div>
            <p className={`font-semibold text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
              {task.text}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${task.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
              {task.completed ? "Completed" : "Active"}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-5 border-t pt-3">
          Task ID: {task.id}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => { onToggle(task.id); navigate("/tasks"); }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm"
          >
            {task.completed ? "Undo" : "Mark Complete"}
          </button>
          <button
            onClick={() => { onDelete(task.id); navigate("/tasks"); }}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded text-sm border border-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}