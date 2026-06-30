export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return <div className="bbAdminPanel bbAdminMuted">{label}</div>;
}

