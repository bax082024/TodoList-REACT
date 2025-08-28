import { useState } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  const [todos, setTodos] = useState([
    // seed example (remove later)
    { id: crypto.randomUUID(), text: "Welcome 👋 Add your first task.", completed: false, createdAt: Date.now() }
  ]);

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

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pro To-Do</h1>
        <p className="subtitle">Clean, simple tasks — React + Vite</p>
      </header>

      <main>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>

      <footer className="app__footer">
        <span>Built with ❤️ using React</span>
      </footer>
    </div>
  );
}
