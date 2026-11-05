import { NextResponse } from 'next/server';
import { forms } from '@/content/forms';

// Receives an enquiry from the site and writes it to the Google Sheet through
// the Apps Script web app (see google-apps-script/Code.gs). The script URL and
// secret stay on the server and are never sent to the browser.

const MAX_FIELD = 2000;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'We couldn’t read that enquiry.' }, { status: 400 });
  }

  const { service, data, website, elapsed, page } = body || {};

  // Spam: a filled hidden field, or a form completed impossibly fast.
  if (website || (typeof elapsed === 'number' && elapsed < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const def = forms[service];
  if (!def || !data || typeof data !== 'object') {
    return NextResponse.json({ ok: false, error: 'Please choose what we’re creating together.' }, { status: 400 });
  }

  // Keep only known, string-valued fields, trimmed to a sensible length.
  const clean = {};
  for (const [k, v] of Object.entries(data)) {
    if (typeof k !== 'string' || k.length > 80) continue;
    clean[k] = String(v ?? '').slice(0, MAX_FIELD).trim();
  }
  if (!clean.Name || !clean.Phone) {
    return NextResponse.json({ ok: false, error: 'Please add your name and phone number.' }, { status: 400 });
  }

  const payload = {
    secret: process.env.ENQUIRY_SECRET || '',
    sheet: def.sheet,
    data: { ...clean, 'Source page': String(page || '').slice(0, 200) },
  };

  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[enquiry] SHEETS_WEBHOOK_URL not set; enquiry not saved:', payload.sheet, payload.data);
      return NextResponse.json({ ok: true, dryRun: true });
    }
    console.error('[enquiry] SHEETS_WEBHOOK_URL is not configured');
    return NextResponse.json({ ok: false, error: 'Our enquiry form is resting for a moment.' }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
    });
    const text = await res.text();
    let json = {};
    try { json = JSON.parse(text); } catch { /* Apps Script returned HTML: treat as failure */ }
    if (!res.ok || !json.ok) {
      console.error('[enquiry] sheet write failed', res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, error: 'Your enquiry didn’t go through.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enquiry] network error', err);
    return NextResponse.json({ ok: false, error: 'Your enquiry didn’t go through.' }, { status: 502 });
  }
}
