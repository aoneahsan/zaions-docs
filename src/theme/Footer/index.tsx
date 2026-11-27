import React, {useEffect, useState} from 'react';
import OriginalFooter from '@theme-original/Footer';
import roster from '@site/src/data/ecosystem.json';

const products = roster.products.filter((product) => product.id !== roster.currentProductId);

/** One product at a time keeps the shared docs footer short, even on a phone. */
export default function Footer(props: React.ComponentProps<typeof OriginalFooter>): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const product = products[index];

  useEffect(() => {
    if (manualPause || interacting) return;
    const timer = window.setInterval(() => {
      if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setIndex((current) => (current + 1) % products.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [manualPause, interacting]);

  return <>
    {product && <section
      className="zaions-ecosystem"
      aria-label="More from Zaions"
      aria-roledescription="carousel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);}}
    >
      <div className="container">
        <div className="zaions-ecosystem__head">
          <div><h2>More from Zaions</h2><p>The team behind these docs runs other software too. Open a product, or read why it exists.</p></div>
          <div className="zaions-ecosystem__controls">
            <button type="button" onClick={() => setIndex((index - 1 + products.length) % products.length)} aria-label="Previous product">Previous</button>
            <span aria-live="polite">{index + 1} / {products.length}</span>
            <button type="button" onClick={() => setIndex((index + 1) % products.length)} aria-label="Next product">Next</button>
            <button type="button" aria-pressed={manualPause} onClick={() => setManualPause(!manualPause)}>{manualPause ? 'Play' : 'Pause'}</button>
          </div>
        </div>
        <article className="zaions-ecosystem__card" role="group" aria-roledescription="slide" aria-label={product.name}>
          <img src={`/img/ecosystem/${product.id}.svg`} alt="" width="56" height="56" loading="lazy" />
          <div><h3>{product.name}</h3><p>{product.line}</p></div>
          <div className="zaions-ecosystem__links"><a href={product.liveUrl}>Visit {product.name}</a><a href={`/ecosystem/${product.id}/`}>Details</a></div>
        </article>
        <a className="zaions-ecosystem__all" href="/ecosystem/">See all products from Zaions</a>
      </div>
    </section>}
    <OriginalFooter {...props} />
  </>;
}
