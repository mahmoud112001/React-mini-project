import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Enhanced TaskItem Component with animations
function TaskItem({ task, onToggle, onDelete, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  return (
    <li 
      className={`group animate-slide-up transition-all duration-300 ${isDeleting ? 'opacity-0 scale-95' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative overflow-hidden bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 mb-3">
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="relative flex items-center gap-3">
          {/* Custom Checkbox */}
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 cursor-pointer accent-green-600 hover:scale-110 transition-transform"
            />
          </div>
          
          {/* Task Content */}
          <Link to={`/tasks/${task.id}`} className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-all duration-300 ${
                task.completed 
                  ? "line-through text-gray-400" 
                  : "text-gray-800 group-hover:text-green-700"
              }`}>
                {task.text}
              </span>
              {task.completed && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 animate-scale-in">
                  <i className="fa-solid fa-check mr-1"></i>
                  Done
                </span>
              )}
            </div>
          </Link>
          
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Delete task"
          >
            <i className="fa-solid fa-trash-can text-sm"></i>
          </button>
        </div>
        
        {/* Progress Indicator Line */}
        {task.completed && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 animate-scale-in" />
        )}
      </div>
    </li>
  );
}

// Enhanced AddTask Component
function AddTaskInput({ onAdd }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="mb-6 animate-slide-up">
      <div className={`relative bg-white rounded-2xl shadow-md border-2 transition-all duration-300 ${
        isFocused ? 'border-green-500 shadow-lg ring-4 ring-green-100' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-3 p-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isFocused ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            <i className="fa-solid fa-plus"></i>
          </div>
          
          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What needs to be done?"
            className="flex-1 bg-transparent border-none text-sm font-medium placeholder:text-gray-400 focus:outline-none"
          />
          
          {/* Add Button */}
          {value.trim() && (
            <button
              onClick={handleAdd}
              className="flex-shrink-0 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 animate-scale-in"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Filter Component
function FilterTask({ filter, onFilterChange, tasks }) {
  const all = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  const filters = [
    { label: "All", value: "all", count: all, icon: "fa-list" },
    { label: "Active", value: "active", count: active, icon: "fa-clock" },
    { label: "Done", value: "completed", count: completed, icon: "fa-check-circle" },
  ];

  return (
    <div className="mb-6 animate-slide-up stagger-1">
      <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100">
        <div className="grid grid-cols-3 gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`relative py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden ${
                filter === f.value
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <i className={`fa-solid ${f.icon} text-base`}></i>
                <span className="text-xs">{f.label}</span>
                <span className={`text-xs font-mono ${
                  filter === f.value ? 'text-green-100' : 'text-gray-400'
                }`}>
                  {f.count}
                </span>
              </div>
              
              {/* Hover Effect */}
              {filter !== f.value && (
                <div className="absolute inset-0 bg-gray-100 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Tasks Component
export default function Tasks({ tasks, onAdd, onToggle, onDelete }) {
  const [filter, setFilter] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const getEmptyMessage = () => {
    if (filter === "active") return "No active tasks. Time to add some!";
    if (filter === "completed") return "No completed tasks yet. Keep going!";
    return "No tasks yet. Start by adding your first one!";
  };

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className={`mb-6 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <i className="fa-solid fa-list-check text-xl text-white"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
            <p className="text-xs text-gray-500 font-mono">
              {tasks.length} total · {tasks.filter(t => t.completed).length} completed
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Input */}
      <AddTaskInput onAdd={onAdd} />

      {/* Filter Tabs */}
      <FilterTask filter={filter} onFilterChange={setFilter} tasks={tasks} />

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <ul className="space-y-0">
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              index={index}
            />
          ))}
        </ul>
      ) : (
        /* Empty State */
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center floating">
            <i className={`fa-solid ${
              filter === "completed" ? "fa-check-double" : "fa-clipboard-list"
            } text-4xl text-gray-300`}></i>
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            {filter === "all" ? "No tasks yet" : 
             filter === "active" ? "All caught up!" :
             "Nothing completed"}
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            {getEmptyMessage()}
          </p>
        </div>
      )}

      {/* Summary Footer (when tasks exist) */}
      {tasks.length > 0 && (
        <div className={`mt-8 bg-white rounded-2xl p-5 border border-gray-100 shadow-md ${mounted ? 'animate-slide-up stagger-5' : 'opacity-0'}`}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <i className="fa-solid fa-chart-simple text-green-600"></i>
              <span className="font-medium">Productivity</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold gradient-text">
                {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
              </p>
              <p className="text-xs text-gray-400 font-mono">completion rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}