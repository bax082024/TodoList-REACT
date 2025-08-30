import TodoItem from "./TodoItem.jsx";

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
}) {
  if (todos.length === 0) return <p className="empty">No tasks found for this filter.</p>;

  return (
    <ul className="todo-list">
      {todos.map((t, i) => (
        <TodoItem
          key={t.id}
          todo={t}
          isFirst={i === 0}
          isLast={i === todos.length - 1}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onMoveUp={() => onMoveUp(t.id)}
          onMoveDown={() => onMoveDown(t.id)}
        />
      ))}
    </ul>
  );
}
