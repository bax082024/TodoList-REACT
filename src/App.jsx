import { useEffect, useMemo, useRef, useState } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";
import FiltersBar from "./components/FiltersBar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

const TODOS_KEY = "pro-todo:v1";
const CATS_KEY = "pro-todo:cats:v1";
const THEME_KEY = "pro-todo:theme";
const DEFAULT_CATEGORIES = ["General", "Work", "Personal", "Study", "Shopping", "Ideas"];

export default function App() {
  // Theme
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Todos
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
  const addTodo = (text, category) => {
    if (!text.trim()) return;
    setTodos(prev => [{ id: crypto.randomUUID(), text: text.trim(), completed: false, createdAt: Date.now(), category: category || "General" }, ...prev]);
  };
  const toggleTodo = id => setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTodo = id => setTodos(prev => prev.filter(t => t.id !== id));
  const editTodo = (id, newText) => {
    const text = newText.trim();
    if (!text) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text } : t)));
  };
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed));
  const addCategory = (name) => {
    const cleaned = (name || "").trim();
    if (!cleaned) return;
    const exists = categories.some(c => c.toLowerCase() === cleaned.toLowerCase());
    if (exists) return;
    const titled = cleaned[0].toUpperCase() + cleaned.slice(1);
    setCategories(prev => [...prev, titled]);
    setCategoryFilter(titled);
  };

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

  // ----- Keyboard Shortcuts -----
  const inputRef = useRef(null);
  useEffect(() => {
    function onKey(e) {
      const key = e.key.toLowerCase();

      // N = focus input (when not typing in another input/textarea)
      const typingInField = ["input", "textarea"].includes(e.target.tagName.toLowerCase());
      if (!typingInField && key === "n" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Ctrl/⌘ + Shift + C = clear completed
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "c") {
        e.preventDefault();
        clearCompleted();
      }

      // Ctrl/⌘ + Shift + L = toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "l") {
        e.preventDefault();
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
      }

      // Ctrl/⌘ + K = add category
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && key === "k") {
        e.preventDefault();
        const name = prompt("New category name:");
        if (name) addCategory(name);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearCompleted, setTheme, addCategory]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pro To-Do</h1>
        <p className="subtitle">Clean, simple tasks — React + Vite</p>
        <div className="header-controls">
          <ThemeToggle theme={theme} onToggle={() => setTheme(t => (t === "dark" ? "light" : "dark"))} />
        </div>
      </header>

      <main>
        <TodoInput
          ref={inputRef}
          onAdd={addTodo}
          categories={categories}
          onAddCategory={addCategory}
        />

        <FiltersBar
          categories={categories}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          stats={stats} onClearCompleted={clearCompleted}
        />

        <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      </main>

      <footer className="app__footer">
        <div className="footer__row">
          {/* Progress */}
          <div className="progress" title="Completion rate">
            <div
              className="progress__bar"
              style={{ width: `${stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%` }}
            />
          </div>
          <span className="progress__label">
            {stats.completed}/{stats.total} completed
            {stats.total ? ` (${Math.round((stats.completed / stats.total) * 100)}%)` : ""}
          </span>
        </div>

        <div className="shortcuts">
          <span>Shortcuts:</span>
          <kbd>N</kbd> focus input <span>•</span>
          <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> add <span>•</span>
          <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>C</kbd> clear <span>•</span>
          <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> theme <span>•</span>
          <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> new category
        </div>
      </footer>
    </div>
  );
}
