function StatCard({ title, value, accent }) {
  return (
    <div className={`admin-stat-card ${accent}`}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default StatCard;
