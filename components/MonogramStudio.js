'use client';

import '@fontsource/pinyon-script/400.css';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { drawMonogram, loadMonogramFonts, STYLES, GROUNDS } from './monogram';

const letter = (v) => (v || '').replace(/[^A-Za-z]/g, '').slice(-1).toUpperCase();

/**
 * Monogram Studio: type two initials, pick a style, and download or share a
 * wedding monogram. Everything happens in the visitor's browser, so it's free
 * to run and nothing is stored.
 */
export default function MonogramStudio() {
  const canvasRef = useRef(null);
  const [state, setState] = useState({ a: 'D', b: 'N', line: '05 · 03 · 2027', style: 'moonlit', ground: 'night' });
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState('');

  // Start from a shared link (?a=J&b=R&s=classic&g=ivory&t=...)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const next = {};
    if (q.get('a')) next.a = letter(q.get('a'));
    if (q.get('b')) next.b = letter(q.get('b'));
    if (q.get('t') !== null) next.line = (q.get('t') || '').slice(0, 32);
    if (STYLES.some((s) => s.id === q.get('s'))) next.style = q.get('s');
    if (GROUNDS.some((g) => g.id === q.get('g'))) next.ground = q.get('g');
    if (Object.keys(next).length) setState((s) => ({ ...s, ...next }));
    loadMonogramFonts().then(() => setReady(true));
  }, []);

  // Redraw and keep the address shareable
  useEffect(() => {
    if (!canvasRef.current) return;
    drawMonogram(canvasRef.current, state);
    const q = new URLSearchParams({ a: state.a, b: state.b, s: state.style, g: state.ground });
    if (state.line) q.set('t', state.line);
    window.history.replaceState(null, '', `${window.location.pathname}?${q}`);
  }, [state, ready]);

  const set = (k) => (e) => {
    const v = k === 'a' || k === 'b' ? letter(e.target.value) : e.target.value.slice(0, 32);
    setState((s) => ({ ...s, [k]: v }));
  };

  const fileName = `monogram-${state.a}${state.b}.png`;
  const toBlob = () => new Promise((res) => canvasRef.current.toBlob(res, 'image/png'));

  const download = useCallback(async () => {
    const blob = await toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setNote('Saved. Share it with someone who’s counting the days.');
  }, [fileName]);

  const share = useCallback(async () => {
    const url = window.location.href;
    const text = `Our monogram, made with Dream Narratives ✨`;
    try {
      const blob = await toBlob();
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, url });
        return;
      }
      if (navigator.share) {
        await navigator.share({ text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setNote('Link copied. Anyone who opens it sees your monogram.');
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      setNote('Couldn’t share from this browser. Try “Download” instead.');
    }
  }, [fileName]);

  return (
    <div className="monogram-studio">
      <div className="monogram-controls">
        <div className="initials">
          <div className="field">
            <label htmlFor="mono-a">First initial</label>
            <input id="mono-a" value={state.a} onChange={set('a')} maxLength={2} autoComplete="off" inputMode="text" aria-describedby="mono-help" />
          </div>
          <span className="amp" aria-hidden="true">&amp;</span>
          <div className="field">
            <label htmlFor="mono-b">Second initial</label>
            <input id="mono-b" value={state.b} onChange={set('b')} maxLength={2} autoComplete="off" inputMode="text" />
          </div>
        </div>
        <p id="mono-help" className="help">Two letters, A to Z: yours and theirs, or a family name.</p>

        <div className="field wide">
          <label htmlFor="mono-line">A date or a few words</label>
          <input id="mono-line" value={state.line} onChange={set('line')} maxLength={32} placeholder="05 · 03 · 2027" autoComplete="off" />
        </div>

        <fieldset className="field">
          <legend>Style</legend>
          <div className="options">
            {STYLES.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={state.style === s.id} onClick={() => setState((st) => ({ ...st, style: s.id }))}>
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend>Ground</legend>
          <div className="options">
            {GROUNDS.map((g) => (
              <button key={g.id} type="button" className="chip" aria-pressed={state.ground === g.id} onClick={() => setState((st) => ({ ...st, ground: g.id }))}>
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="btn-row">
          <button type="button" className="btn btn-fill" onClick={download}>Download</button>
          <button type="button" className="btn btn-ghost" onClick={share}>Share</button>
        </div>
        <p className="caption" role="status" aria-live="polite" style={{ minHeight: 20, margin: 'var(--space-3) 0 0' }}>{note}</p>

        <div className="monogram-cta">
          <p>This is how many of our invitation suites begin. Want the whole story designed around it?</p>
          <Link href="/enquiries?service=invitation" className="text-link">Design my invitation</Link>
        </div>
      </div>

      <div className="monogram-preview">
        <canvas
          ref={canvasRef}
          width={1080}
          height={1080}
          role="img"
          aria-label={`A ${state.style} monogram of the letters ${state.a} and ${state.b}${state.line ? `, with “${state.line}” underneath` : ''}`}
        />
      </div>
    </div>
  );
}
