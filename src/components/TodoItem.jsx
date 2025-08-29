import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  function startEdit() { setDraft(todo.text); setEditing(true); }
  function save() {
    setEditing(false);
    if (draft.trim() && draft.trim() !== todo.text) onEdit(todo.id, draft);
  }
  function onKeyDown(e) { if (e.key === "Enter") save(); if (e.key === "Escape") setEditing(false); }

  return (
    <li className={`todo-item ${todo.completed ? "is-done" : ""} ${editing ? "is-editing" : ""}`}>
      <label className="todo-item__left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        {!editing ? (
          <>
            <span className="text" onDoubleClick={startEdit} title="Double-click to edit">
              {todo.text}
            </span>
            <span className={`badge`} data-cat={todo.category}>{todo.category}</span>
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

      <div className="todo-actions">
        {!editing && (
          <button className="btn" onClick={startEdit} title="Edit">✎</button>
        )}
        <button className="btn btn--danger" onClick={() => onDelete(todo.id)} title="Delete">✕</button>
      </div>
    </li>
  );
}
