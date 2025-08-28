import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
