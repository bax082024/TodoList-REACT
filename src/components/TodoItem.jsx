export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "is-done" : ""}`}>
      <label className="todo-item__left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="text">{todo.text}</span>
      </label>

      <button
        className="btn btn--danger"
        aria-label="Delete task"
        onClick={() => onDelete(todo.id)}
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}
