export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle dark/light theme"
      title={isLight ? "Switch to dark" : "Switch to light"}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isLight ? "☀️" : "🌙"}
      </span>
      <span className="switch" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
    </button>
  );
}
