import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

const STORAGE_KEY = "pro-todo:v1";

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: crypto.randomUUID(), text: "Welcome 👋 Add your first task.", completed: false, createdAt: Date.now() }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  function addTodo(text) {
    if (!text.trim()) return;
    const todo = { id: crypto.randomUUID(), text: text.trim(), completed: false, createdAt: Date.now() };
    setTodos((prev) => [todo, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    const text = newText.trim();
    if (!text) return; // ignore empty edits
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pro To-Do</h1>
        <p className="subtitle">Clean, simple tasks — React + Vite</p>
      </header>

      <main>
        <TodoInput onAdd={addTodo} />
        <TodoList
          todos={todos}
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
