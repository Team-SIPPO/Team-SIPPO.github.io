export function MemberDetailRow({ label, lines }) {
  const values = (Array.isArray(lines) ? lines : [lines]).filter(Boolean);

  if (values.length === 0) {
    return null;
  }

  return (
    <div className="member-detail-row">
      <dt>{label}</dt>
      <dd>
        {values.map((line, index) => (
          <p key={`${label}-${index}`}>{line}</p>
        ))}
      </dd>
    </div>
  );
}
