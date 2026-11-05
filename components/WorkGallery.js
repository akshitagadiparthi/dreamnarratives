'use client';

import { useMemo, useState } from 'react';
import { Slot } from './Basics';

// Labels for the Drive sub-folders a piece came from.
const KIND_LABELS = {
  'e-invites': 'E-invites',
  'video-invites': 'Video invites',
  'physical-cards': 'Physical cards',
  stationery: 'Stationery',
  hampers: 'Hampers',
  'social-media': 'Social media',
};

const PAGE = 12;

/**
 * The work on a service page: uncropped masonry, filter chips when a service
 * has more than one kind of work, and "Show more" so long galleries stay fast.
 */
export default function WorkGallery({ work }) {
  const kinds = useMemo(() => [...new Set(work.map((w) => w.kind).filter(Boolean))], [work]);
  const [kind, setKind] = useState('all');
  const [shown, setShown] = useState(PAGE);

  const list = kind === 'all' ? work : work.filter((w) => w.kind === kind);
  const visible = list.slice(0, shown);

  return (
    <>
      {kinds.length > 1 ? (
        <div className="work-filter" role="group" aria-label="Filter the work">
          {['all', ...kinds].map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              aria-pressed={kind === k}
              onClick={() => { setKind(k); setShown(PAGE); }}
            >
              {k === 'all' ? 'All' : KIND_LABELS[k] || k.replace(/-/g, ' ')}
              <span className="count">{k === 'all' ? work.length : work.filter((w) => w.kind === k).length}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="work-masonry">
        {visible.map((w, i) => (
          <figure key={w.src || w.video || i} className="work-piece reveal in" data-cursor="view">
            <div className="frame" style={{ aspectRatio: w.width && w.height ? `${w.width} / ${w.height}` : ['4 / 5', '1 / 1', '3 / 4'][i % 3] }}>
              <Slot item={w} tone={i % 3 === 1 ? 'bone' : i % 3 === 2 ? 'line' : ''} className="zoom" sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw" />
            </div>
            {w.caption && (w.src || w.video) ? <figcaption className="caption">{w.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      {list.length > shown ? (
        <div className="center" style={{ marginTop: 'var(--space-5)' }}>
          <button type="button" className="btn btn-ghost" onClick={() => setShown((n) => n + PAGE)}>
            Show more <span className="muted" style={{ marginLeft: 10 }}>{list.length - shown}</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
