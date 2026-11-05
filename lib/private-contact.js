// ---------------------------------------------------------------------------
// The founders' direct numbers. PRIVATE: this file is only ever read by the
// server (app/api/enquiry/route.js), never sent to visitors' browsers, so the
// numbers don't appear anywhere on the site or in its code.
//
// They're shown to a visitor only after they send an enquiry.
//
// ⚠️ CONFIRM BEFORE LAUNCH: these are placeholders from the Figma draft.
// Either edit them here, or (better) set PRIVATE_CONTACT in Vercel →
// Settings → Environment Variables, e.g.
//   {"whatsapp":"919876543210","phones":[{"name":"Driti","display":"+91 98765 43210","tel":"919876543210"},{"name":"Nimisha","display":"+91 91234 56789","tel":"919123456789"}]}
// ---------------------------------------------------------------------------

const fallback = {
  whatsapp: '919876543210',
  phones: [
    { name: 'Driti', display: '+91 98765 43210', tel: '919876543210' },
    { name: 'Nimisha', display: '+91 98765 43210', tel: '919876543210' },
  ],
};

export function privateContact() {
  try {
    if (process.env.PRIVATE_CONTACT) return JSON.parse(process.env.PRIVATE_CONTACT);
  } catch {
    console.error('[contact] PRIVATE_CONTACT is not valid JSON; using the fallback in lib/private-contact.js');
  }
  return fallback;
}
