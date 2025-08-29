import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export default forwardRef(function TodoInput({ onAdd, categories = [], onAddCategory }, ref) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(categories[0] || "General");
  const inputEl = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputEl.current?.focus(),
  }));

  useEffect(() => {
    if (!categories.includes(category)) setCategory(categories[0] || "General");
  }, [categories]);

  function submit() {
    onAdd(value, category);
    setValue("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }
  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      submit();
    }
    if (e.key === "Escape" && value) setValue("");
  }
  function handleAddCategory() {
    const name = prompt("New category name:");
    if (name) onAddCategory?.(name);
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        ref={inputEl}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
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
});
