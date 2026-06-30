export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      className="bbAdminTextarea"
      value={value}
      placeholder="Write content..."
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

