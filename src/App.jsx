import { useEffect, useMemo, useState } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";
import FiltersBar from "./components/FiltersBar.jsx";

const TODOS_KEY = "pro-todo:v1";
const CATS_KEY = "pro-todo:cats:v1";
const DEFAULT_CATEGORIES = ["General", "Work", "Personal", "Study", "Shopping", "Ideas"];

export default function App() {
  // Todos (with migration for missing category)
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(TODOS_KEY);
      if (raw) return JSON.parse(raw).map(t => ({ category: "General", ...t }));
    } catch {}
    return [
      { id: crypto.randomUUID(), text: "Welcome 👋 Add your first task.", completed: false, createdAt: Date.now(), category: "General" }
    ];
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    try {
      const raw = localStorage.getItem(CATS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        return Array.isArray(arr) && arr.length ? arr : DEFAULT_CATEGORIES;
      }
    } catch {}
    return DEFAULT_CATEGORIES;
  });

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Persist
  useEffect(() => { localStorage.setItem(TODOS_KEY, JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem(CATS_KEY, JSON.stringify(categories)); }, [categories]);

  // CRUD
  function addTodo(text, category) {
    if (!text.trim()) return;
    setTodos(prev => [
      { id: crypto.randomUUID(), text: text.trim(), completed: false, createdAt: Date.now(), category: category || "General" },
      ...prev
    ]);
  }
  const toggleTodo = (id) => setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id));
  const editTodo = (id, newText) => {
    const text = newText.trim();
    if (!text) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text } : t)));
  };
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed));

  // Add a category (case-insensitive, dedup, title-case)
  function addCategory(name) {
    const cleaned = (name || "").trim();
    if (!cleaned) return;
    const exists = categories.some(c => c.toLowerCase() === cleaned.toLowerCase());
    if (exists) return;
    // optional title-case
    const titled = cleaned[0].toUpperCase() + cleaned.slice(1);
    setCategories(prev => [...prev, titled]);
    setCategoryFilter(titled);
  }

  // Derived
  const stats = useMemo(() => {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    return { total, active, completed: total - active };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    let list = [...todos];
    if (statusFilter === "Active") list = list.filter(t => !t.completed);
    if (statusFilter === "Completed") list = list.filter(t => t.completed);
    if (categoryFilter !== "All") list = list.filter(t => t.category === categoryFilter);
    return list;
  }, [todos, statusFilter, categoryFilter]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pro To-Do</h1>
        <p className="subtitle">Clean, simple tasks — React + Vite</p>
      </header>

      <main>
        <TodoInput
          onAdd={addTodo}
          categories={categories}
          onAddCategory={addCategory}
        />

        <FiltersBar
          categories={categories}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          stats={stats}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>

      <footer className="app__footer">
        <span>Built with ❤️ using React</span>
      </footer>
    </div>
  );
}
