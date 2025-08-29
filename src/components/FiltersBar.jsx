export default function FiltersBar({
  categories,
  statusFilter, setStatusFilter,
  categoryFilter, setCategoryFilter,
  stats,
  onClearCompleted
}) {
  const statuses = ["All", "Active", "Completed"];

  return (
    <div className="filters">
      <div className="filters__row">
        <div className="segmented">
          {statuses.map(s => (
            <button
              key={s}
              className={`segmented__btn ${statusFilter === s ? "is-active" : ""}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="counts">
          <span>{stats.active} active</span>
          <span>•</span>
          <span>{stats.completed} completed</span>
          <span>•</span>
          <span>{stats.total} total</span>
        </div>

        <button className="btn btn--ghost" onClick={onClearCompleted} title="Remove completed tasks">
          Clear completed
        </button>
      </div>

      <div className="chipbar" role="tablist" aria-label="Category filter">
        <button
          className={`chip ${categoryFilter === "All" ? "chip--active" : ""}`}
          onClick={() => setCategoryFilter("All")}
          role="tab"
        >
          All categories
        </button>
        {categories.map(c => (
          <button
            key={c}
            className={`chip ${categoryFilter === c ? "chip--active" : ""}`}
            onClick={() => setCategoryFilter(c)}
            role="tab"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
