export function StatsCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bbAdminPanel">
      <div className="bbAdminStatValue">{value}</div>
      <div className="bbAdminStatLabel">{label}</div>
    </div>
  );
}

