'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { forms, formOrder, sharedTop, sharedBottom } from '@/content/forms';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { DirectLinesList, rememberDirectLines } from './DirectLines';

const idFor = (label) => 'f-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const chipLabel = (slug) => {
  const s = services.find((x) => x.slug === slug);
  return s ? [s.name[0], s.name[1]] : ['Something', 'else'];
};

function Field({ f, value, onChange, error, whatsapp, setWhatsapp }) {
  const id = idFor(f.label);
  const shown = f.display || f.label;
  const cls = `field${f.wide || f.type === 'multi' || f.type === 'single' || f.type === 'textarea' ? ' wide' : ''}${error ? ' invalid' : ''}`;
  const req = f.required ? <span className="req" aria-hidden="true"> *</span> : null;
  const describedBy = [f.help && `${id}-help`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;

  if (f.type === 'multi' || f.type === 'single') {
    const multi = f.type === 'multi';
    const current = multi ? value || [] : value || '';
    return (
      <fieldset className={cls} aria-describedby={describedBy}>
        <legend>{shown}{req}</legend>
        <div className="options">
          {f.options.map((opt) => {
            const checked = multi ? current.includes(opt) : current === opt;
            return (
              <label key={opt} className="option">
                <input
                  type={multi ? 'checkbox' : 'radio'}
                  name={id}
                  value={opt}
                  checked={checked}
                  onChange={() => {
                    if (multi) onChange(checked ? current.filter((v) => v !== opt) : [...current, opt]);
                    else onChange(checked ? '' : opt);
                  }}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
        {f.help ? <p className="help" id={`${id}-help`}>{f.help}</p> : null}
        {error ? <p className="err" id={`${id}-err`}>{error}</p> : null}
      </fieldset>
    );
  }

  const common = {
    id,
    name: id,
    value: value || '',
    required: f.required,
    placeholder: f.placeholder,
    autoComplete: f.autoComplete || 'off',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    onChange: (e) => onChange(e.target.value),
  };

  return (
    <div className={cls}>
      <label htmlFor={id}>{shown}{req}</label>
      {f.type === 'textarea' ? (
        <textarea {...common} rows={5} />
      ) : f.type === 'select' ? (
        <select {...common}>
          <option value="">Select</option>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input {...common} type={f.type} min={f.min} inputMode={f.type === 'tel' ? 'tel' : undefined} />
      )}
      {f.withWhatsapp ? (
        <label className="check">
          <input type="checkbox" checked={whatsapp} onChange={(e) => setWhatsapp(e.target.checked)} />
          This number is on WhatsApp
        </label>
      ) : null}
      {f.help ? <p className="help" id={`${id}-help`}>{f.help}</p> : null}
      {error ? <p className="err" id={`${id}-err`}>{error}</p> : null}
    </div>
  );
}

export default function EnquiryForm() {
  const [service, setService] = useState(null);
  const [values, setValues] = useState({});
  const [whatsapp, setWhatsapp] = useState(true);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | failed
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState(null);
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef(null);
  const doneRef = useRef(null);

  const def = service ? forms[service] : null;
  const fields = useMemo(() => (def ? [...sharedTop, ...def.fields, ...sharedBottom] : []), [def]);

  // Arriving from a service page (?service=space) preselects that form.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('service');
    const start = q === 'telling' ? 'identity' : q;
    if (formOrder.includes(start)) setService(start);
  }, []);

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const set = (label) => (v) => {
    setValues((s) => ({ ...s, [label]: v }));
    if (errors[label]) setErrors((e) => ({ ...e, [label]: undefined }));
  };

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      const v = values[f.label];
      const empty = Array.isArray(v) ? v.length === 0 : !String(v || '').trim();
      if (f.required && empty) e[f.label] = 'Please fill this in.';
      if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.label] = 'That email doesn’t look quite right.';
      if (f.type === 'tel' && v && v.replace(/\D/g, '').length < 8) e[f.label] = 'Please add a full phone number.';
    });
    setErrors(e);
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    const first = Object.keys(e)[0];
    if (first) {
      requestAnimationFrame(() => {
        const el = document.getElementById(idFor(first)) || formRef.current?.querySelector('.invalid input');
        el?.focus();
      });
      return;
    }
    setStatus('sending');
    setMessage('');
    const data = {};
    fields.forEach((f) => {
      const v = values[f.label];
      data[f.label] = Array.isArray(v) ? v.join(', ') : (v || '').toString().trim();
    });
    data.WhatsApp = whatsapp ? 'Yes' : 'No';
    try {
      // Preview builds have no server: show the thank-you without sending.
      if (process.env.NEXT_PUBLIC_PREVIEW === '1') {
        await new Promise((r) => setTimeout(r, 600));
        setStatus('done');
        return;
      }
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          sheet: def.sheet,
          data,
          website: formRef.current?.elements?.website?.value || '',
          elapsed: Date.now() - startedAt,
          page: window.location.pathname + window.location.search,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.');
      if (json.contact) {
        setContact(json.contact);
        rememberDirectLines(json.contact);
      }
      setStatus('done');
    } catch (err) {
      setStatus('failed');
      setMessage(err.message || 'Something went wrong.');
    }
  };

  if (status === 'done') {
    return (
      <div className="form-done reveal in" ref={doneRef} tabIndex={-1} aria-live="polite">
        <span className="eyebrow">Thank you, {(values.Name || '').split(' ')[0] || 'truly'}</span>
        <h2 className="display-l">
          Your story has
          <br />
          <em>reached us.</em>
        </h2>
        <p className="lede" style={{ marginTop: 'var(--space-4)' }}>
          We respond to every enquiry within 24–48 hours. {contact ? 'If it can’t wait, here’s how to reach Driti and Nimisha directly.' : ''}
        </p>
        {contact ? (
          <div style={{ marginTop: 'var(--space-5)', maxWidth: 720 }}>
            <span className="eyebrow">Our direct lines, just for you</span>
            <DirectLinesList contact={contact} name={(values.Name || '').split(' ')[0]} />
          </div>
        ) : null}
        <div className="btn-row" style={{ marginTop: 'var(--space-5)' }}>
          <Link className="btn btn-ghost" href="/">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <form className="form-wrap" ref={formRef} onSubmit={submit} noValidate>
      <fieldset className="chooser">
        <legend className="eyebrow" style={{ width: '100%' }}>What are we creating together?</legend>
        {formOrder.map((slug) => {
          const [a, b] = chipLabel(slug);
          return (
            <button
              key={slug}
              type="button"
              className="chip"
              aria-pressed={service === slug}
              onClick={() => {
                setService(slug);
                setErrors({});
                const url = new URL(window.location.href);
                url.searchParams.set('service', slug);
                window.history.replaceState(null, '', url);
              }}
            >
              {a} <em>{b}</em>
            </button>
          );
        })}
      </fieldset>

      {def ? (
        <div key={service} className="reveal in">
          <h2 className="heading" style={{ marginBottom: 'var(--space-6)' }}>
            {def.title[0]} <em>{def.title[1]}</em>
          </h2>
          <div className="fields">
            {fields.map((f) => (
              <Field key={f.label} f={f} value={values[f.label]} onChange={set(f.label)} error={errors[f.label]} whatsapp={whatsapp} setWhatsapp={setWhatsapp} />
            ))}
          </div>

          {/* Spam trap: people never see this field. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-fill" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send my story'}
            </button>
            <span className="caption">Fields marked <span style={{ color: 'var(--gilt)' }}>*</span> are needed. We never share your details.</span>
            <p className="form-error" role="alert" style={{ width: '100%', margin: 0 }}>
              {status === 'failed' ? (
                <>
                  {message} Please try again, or send us a message on{' '}
                  <a href={`https://instagram.com/${site.contact.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>{' '}
                  or <a href={`mailto:${site.contact.email}`}>email</a>.
                </>
              ) : null}
            </p>
          </div>
        </div>
      ) : (
        <p className="lede muted">Choose one above and we’ll ask only what matters for it.</p>
      )}
    </form>
  );
}
