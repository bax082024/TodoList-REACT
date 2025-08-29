import { useState } from "react";

export default function TodoInput({ onAdd, categories = [] }) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(categories[0] || "General");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(value, category);
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

      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Category"
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
