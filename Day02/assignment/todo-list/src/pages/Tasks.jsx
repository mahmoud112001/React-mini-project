import { useState } from "react";
import AddTaskInput from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import TaskList from "../components/TaskList";

export default function Tasks({ tasks, onAdd, onToggle, onDelete }) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active")    return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
        <i className="fa-solid fa-list-check text-green-600 mr-2"></i>
        My Tasks
      </h2>
      <AddTaskInput onAdd={onAdd} />
      <FilterTask filter={filter} onFilterChange={setFilter} tasks={tasks} />
      <TaskList tasks={filteredTasks} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}