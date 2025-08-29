import { useEffect, useState } from "react";

export default function TodoInput({ onAdd, categories = [], onAddCategory }) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(categories[0] || "General");

  // keep selected category valid if the list changes
  useEffect(() => {
    if (!categories.includes(category)) setCategory(categories[0] || "General");
  }, [categories]);

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(value, category);
    setValue("");
  }

  function handleAddCategory() {
    const name = prompt("New category name:");
    if (name) onAddCategory?.(name);
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />

      <div className="select-col">
        <button type="button" className="link-btn" onClick={handleAddCategory}>
          + Add new
        </button>
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
      </div>

      <button type="submit">Add</button>
    </form>
  );
}
