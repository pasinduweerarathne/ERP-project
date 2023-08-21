function DashboardStats({ title, value, colorIndex }) {
  const COLORS = ["primary", "primary"];

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div
          className={`stat-value dark:text-slate-300 text-${
            COLORS[colorIndex % 2]
          }`}
        >
          Rs.{new Intl.NumberFormat().format(value)}
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
