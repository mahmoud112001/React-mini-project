import { Link } from "react-router-dom";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded mb-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 accent-green-600"
      />
      <Link to={`/tasks/${task.id}`} className="flex-1">
        <span
          className={`text-sm ${
            task.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {task.text}
        </span>
      </Link>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-400 hover:text-red-600 text-xs"
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
  );
}