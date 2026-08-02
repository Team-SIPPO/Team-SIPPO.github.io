import { Fragment } from 'react';

export function TileGridSection({ ariaLabel, ariaLabelledBy, title, titleId, gridClassName, items, getKey, renderItem }) {
  const accessibilityProps = ariaLabelledBy
    ? { 'aria-labelledby': ariaLabelledBy }
    : { 'aria-label': ariaLabel };

  const gridClass = ['tile-section-grid', gridClassName].filter(Boolean).join(' ');

  return (
    <section className="tile-section" {...accessibilityProps}>
      {title ? (
        <h2 id={titleId} className="tile-section-title">
          {title}
        </h2>
      ) : null}

      <div className={gridClass}>
        {items.map((item, index) => (
          <Fragment key={getKey(item, index)}>{renderItem(item, index)}</Fragment>
        ))}
      </div>
    </section>
  );
}
