import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(value);
    setValue("");
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
