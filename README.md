# Pro To-Do (React + Vite)

A clean, professional to-do app built with React and Vite.  
Features include local persistence, categories & filters, edit-in-place, dark/light theme, keyboard shortcuts, and manual reordering (move up/down). Perfect as a small but polished portfolio project.

---

## ✨ Features
- CRUD tasks with **inline editing** (double-click or ✎)
- **LocalStorage** persistence
- **Categories** (add your own) + status filters (All / Active / Completed)
- **Dark / Light** theme (remembers your choice)
- **Keyboard shortcuts**:
  - `N` focus input
  - `Ctrl/⌘ + Enter` add task
  - `Ctrl/⌘ + Shift + C` clear completed
  - `Ctrl/⌘ + Shift + L` toggle theme
  - `Ctrl/⌘ + K` new category
- **Manual reordering** with **Move Up/Down** buttons (works within current filter)
- Progress bar & basic stats

---

## 🧰 Tech
- React + Vite
- Plain CSS (no Tailwind)
- LocalStorage

---

## 🗂️ Project Structure
src/
components/
FiltersBar.jsx
ThemeToggle.jsx
TodoInput.jsx
TodoItem.jsx
TodoList.jsx
App.jsx
main.jsx
styles.css

---

## How to use

**Install deps**
- npm install

**Start dev server**
- npm run dev

**Production build**
- npm run build
- npm run preview

--- 