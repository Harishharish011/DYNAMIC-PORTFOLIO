type ServiceStateProps = {
  title: string;
  message: string;
};

export function ServiceState({ title, message }: ServiceStateProps) {
  return (
    <div className="bbServiceState glass-panel glass-edge" role="status" aria-live="polite">
      <div className="bbServiceStateTitle">{title}</div>
      <div className="bbServiceStateMessage">{message}</div>
    </div>
  );
}

