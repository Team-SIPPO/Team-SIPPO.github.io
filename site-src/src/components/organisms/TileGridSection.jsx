import { Fragment } from 'react';

export function TileGridSection({
  ariaLabel,
  ariaLabelledBy,
  title,
  titleId,
  sectionClassName = '',
  titleClassName = '',
  gridClassName = '',
  items,
  getKey,
  renderItem,
}) {
  const sectionClassNames = ['tile-section', sectionClassName].filter(Boolean).join(' ');
  const titleClassNames = ['tile-section-title', titleClassName].filter(Boolean).join(' ');
  const gridClassNames = [
    'tile-section-grid',
    gridClassName,
    items.length === 1 ? 'is-single' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const accessibilityProps = ariaLabelledBy
    ? { 'aria-labelledby': ariaLabelledBy }
    : { 'aria-label': ariaLabel };

  return (
    <section className={sectionClassNames} {...accessibilityProps}>
      {title ? (
        <h2 id={titleId} className={titleClassNames}>
          {title}
        </h2>
      ) : null}

      <div className={gridClassNames}>
        {items.map((item, index) => (
          <Fragment key={getKey(item, index)}>{renderItem(item, index)}</Fragment>
        ))}
      </div>
    </section>
  );
}
