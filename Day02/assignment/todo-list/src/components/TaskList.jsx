import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        <i className="fa-regular fa-clipboard text-3xl mb-2 block"></i>
        No tasks here.
      </div>
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}