import { Slot } from './Basics';

/**
 * Video invites in phone frames. Real videos play muted on a loop. Until the
 * studio's videos are added, the frames show e-invite stills drifting slowly,
 * clearly labelled as stills.
 */
export default function VideoReels({ videos, stills }) {
  const real = videos.filter((v) => v.video);
  const items = real.length ? real : stills;
  return (
    <>
      <div className="reels">
        {items.map((w, i) => (
          <figure key={w.video || w.src} className={`reel reveal${real.length ? '' : ' is-still'}`} style={{ '--delay': `${i * 120}ms` }} data-cursor="view">
            <div className="phone">
              <Slot item={w} sizes="(max-width: 760px) 70vw, 300px" />
            </div>
            {w.caption ? <figcaption className="caption">{real.length ? w.caption : `Still · ${w.caption}`}</figcaption> : null}
          </figure>
        ))}
      </div>
      {!real.length ? (
        <p className="caption center" style={{ marginTop: 'var(--space-4)' }}>
          Our video invites are on their way to this page. Until then, these are stills from invites we’ve designed.
        </p>
      ) : null}
    </>
  );
}
