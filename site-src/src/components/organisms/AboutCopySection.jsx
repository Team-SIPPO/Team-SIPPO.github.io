export function AboutCopySection({ groups }) {
  return (
    <section className="about-copy" aria-label="About us description">
      {groups.map((group, index) => (
        <div key={index} className="about-copy-group">
          {group.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ))}
    </section>
  );
}
