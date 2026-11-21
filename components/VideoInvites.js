'use client';

import { useRef, useState } from 'react';
import { Slot, Icon } from './Basics';

/**
 * Video invites in phone frames. They play silently on a loop; tap one to hear
 * it (the others go quiet). Until the studio's videos are added, the frames
 * show e-invite stills, clearly labelled as stills.
 */
export default function VideoInvites({ videos, stills }) {
  const real = videos.filter((v) => v.video);
  const items = real.length ? real : stills;
  const refs = useRef([]);
  const [playing, setPlaying] = useState(-1);

  const toggle = (i) => {
    refs.current.forEach((v, j) => { if (v) v.muted = j !== i || playing === i; });
    const v = refs.current[i];
    if (v && playing !== i) { v.currentTime = 0; v.play().catch(() => {}); }
    setPlaying(playing === i ? -1 : i);
  };

  return (
    <>
      <div className="phones">
        {items.map((w, i) => (
          <figure key={w.video || w.src} className={`phone-item reveal${real.length ? '' : ' is-still'}`} style={{ '--delay': `${i * 120}ms` }} data-cursor="view">
            <div className="phone">
              {w.video ? (
                <button type="button" className="phone-video" onClick={() => toggle(i)} aria-label={`${playing === i ? 'Mute' : 'Play with sound'}: ${w.caption || 'video invite'}`}>
                  <video ref={(el) => (refs.current[i] = el)} src={w.video} poster={w.poster} muted loop playsInline autoPlay preload="metadata" />
                  <span className={`sound${playing === i ? ' on' : ''}`}>{playing === i ? 'Sound on' : 'Tap for sound'}</span>
                </button>
              ) : (
                <Slot item={w} sizes="(max-width: 760px) 70vw, 300px" />
              )}
            </div>
            {w.caption ? <figcaption className="caption">{real.length ? w.caption : `Still · ${w.caption}`}</figcaption> : null}
          </figure>
        ))}
      </div>
      {!real.length ? (
        <p className="caption center" style={{ marginTop: 'var(--space-4)' }}>
          <Icon name="play" size={16} /> Our video invites are on their way to this page. Until then, these are stills from invites we’ve designed.
        </p>
      ) : null}
    </>
  );
}
