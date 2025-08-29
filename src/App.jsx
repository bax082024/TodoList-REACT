import { useState, useEffect, useMemo } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";
import FiltersBar from "./components/FiltersBar.jsx";

const STORAGE_KEY = "pro-todo:v1";
const CATEGORIES = ["Work", "Personal", "Study", "Shopping", "Ideas", "General"];

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // migrate old items that might not have category
        const parsed = JSON.parse(raw);
        return parsed.map(t => ({ category: "General", ...t }));
      }
    } catch {}
    return [
      { id: crypto.randomUUID(), text: "Welcome 👋 Add your first task.", completed: false, createdAt: Date.now(), category: "General" }
    ];
  });

  const [statusFilter, setStatusFilter] = useState("All");      // All | Active | Completed
  const [categoryFilter, setCategoryFilter] = useState("All");  // All or one of CATEGORIES

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); } catch {}
  }, [todos]);

  function addTodo(text, category) {
    if (!text.trim()) return;
    const todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      category: category || "General"
    };
    setTodos(prev => [todo, ...prev]);
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function editTodo(id, newText) {
    const text = newText.trim();
    if (!text) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text } : t)));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  const stats = useMemo(() => {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = total - active;
    return { total, active, completed };
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
        <TodoInput onAdd={addTodo} categories={CATEGORIES} />
        <FiltersBar
          categories={CATEGORIES}
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
