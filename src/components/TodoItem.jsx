import { useEffect, useRef, useState } from "react";

export default function TodoItem({
  todo,
  isFirst,
  isLast,
  onToggle,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  function startEdit() { setDraft(todo.text); setEditing(true); }
  function save() {
    setEditing(false);
    const v = draft.trim();
    if (v && v !== todo.text) onEdit(todo.id, v);
  }
  function onKeyDown(e) { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }

  return (
    <li className={`todo-item ${todo.completed ? "is-done" : ""} ${editing ? "is-editing" : ""}`}>
      {/* CONTENT */}
      <label className="todo-item__left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? "Mark as not completed" : "Mark as completed"}
        />

        {!editing ? (
          <>
            <span className="text" onDoubleClick={startEdit} title="Double-click to edit">
              {todo.text}
            </span>
            <span className="badge" data-cat={todo.category}>{todo.category}</span>
          </>
        ) : (
          <input
            ref={inputRef}
            className="todo-edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={onKeyDown}
            aria-label="Edit task text"
          />
        )}
      </label>

      {/* right side card buttons*/}
      <div className="todo-actions">
        <div className="reorder-group">
          <button className="btn btn--sm" onClick={onMoveUp} disabled={isFirst} title="Move up">▲</button>
          <button className="btn btn--sm" onClick={onMoveDown} disabled={isLast} title="Move down">▼</button>
        </div>
        {!editing && <button className="btn" onClick={startEdit} title="Edit">✎</button>}
        <button className="btn btn--danger" onClick={() => onDelete(todo.id)} title="Delete">✕</button>
      </div>
    </li>
  );
}
