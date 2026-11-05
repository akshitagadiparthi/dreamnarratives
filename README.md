# Dream Narratives — website

The site for Dream Narratives, a design house by Driti & Nimisha. Built with Next.js, deployed on Vercel, with enquiries saved to Google Sheets.

## Run it on your computer

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without the sheet set up (step 3 below), enquiries are printed in the terminal instead of saved.

## Deploy

1. **Push to GitHub.** Create an empty repository, then from this folder:
   ```bash
   git init
   git add .
   git commit -m "Dream Narratives website"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. **Import into Vercel.** vercel.com → Add New → Project → pick the repository. Vercel detects Next.js; keep the defaults and deploy.
3. **Connect the enquiries sheet** (about 5 minutes):
   1. Open the "Dream Narratives — Enquiries" Google Sheet.
   2. Extensions → Apps Script. Delete what's there and paste in `google-apps-script/Code.gs`.
   3. Change `SECRET` to a long random string. Optionally put the founders' emails in `NOTIFY_EMAIL` to get an email for each enquiry.
   4. Save, choose `testEnquiry` in the toolbar and press Run. Approve the permissions. A test row appears in "The Invitation" and "All enquiries"; delete it.
   5. Deploy → New deployment → type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and copy the Web app URL.
   6. In Vercel → Project → Settings → Environment Variables, add:
      - `SHEETS_WEBHOOK_URL` = the Web app URL
      - `ENQUIRY_SECRET` = the same string as `SECRET`
      - `NEXT_PUBLIC_SITE_URL` = the live address, e.g. `https://dreamnarratives.co`
   7. Redeploy (Deployments → ⋯ → Redeploy). Send a test enquiry from the live site.

   If you later edit `Code.gs`, use Deploy → Manage deployments → Edit → New version, so the URL stays the same.
4. **Domain.** Vercel → Project → Settings → Domains → add the studio's domain and follow the DNS steps.

## Where to change things

Everything editable lives in `content/`. No layout code needs touching.

| What | File |
| --- | --- |
| Phone numbers, WhatsApp, Instagram, email, logo | `content/site.js` |
| The five services, their offers, work images, home-page floating pieces | `content/services.js` |
| Founders, story, timeline, values, process, testimonials, FAQ | `content/studio.js` |
| Enquiry form questions and budget bands | `content/forms.js` |
| Colours, type, spacing | top of `app/globals.css` |

### Adding work

1. Put images in `public/work/<service>/`, for example `public/work/invitation/suite-01.jpg`. JPG or WebP, about 2000px on the long side.
2. In `content/services.js`, set `src` on an item: `{ src: '/work/invitation/suite-01.jpg', caption: 'Hand-foiled suite' }`.
3. For video invites: `{ video: '/work/invitation/reveal.mp4', poster: '/work/invitation/reveal.jpg', caption: 'Video invite' }`. Keep videos short and under ~8 MB.
4. Each service's `hero` is its main image. `heroPieces` are the pieces that float around the moon on the home page: use a mix from every service.

Any slot without an image shows a quiet placeholder with a small crescent, so the site never looks broken while work is being added.

### Logo and portraits

- Logo: save as `public/images/logo.svg` (or .png) and set `logo: '/images/logo.svg'` in `content/site.js`.
- Portraits: save as `public/images/driti.jpg` and `public/images/nimisha.jpg`, then set `portrait` in `content/studio.js`.

## Before launch: please confirm

- **Phone and WhatsApp numbers** in `content/site.js`. The Figma draft had `98765 43210`, which looks like a placeholder.
- **Instagram handle and email** (`@dreamnarratives`, `hello@dreamnarratives.co`), also from the draft.
- **Testimonials** are switched off (`testimonials.show` in `content/studio.js`). Turn them on only once each quote is a real client's words, used with permission.
- **FAQ**: only questions with an answer appear. Six from the draft have no answers yet.
- **Budget bands** in `content/forms.js` are suggestions.
- **Founders' qualifications** can be added under `credentials`.

## How it's built

- Next.js (App Router) with plain CSS; no UI framework.
- Fonts are self-hosted (Bodoni Moda and Jost via Fontsource): no Google Fonts request, no licence cost.
- The moon cursor turns itself off on touch screens and for visitors who prefer reduced motion; all animations respect that setting.
- `/api/enquiry` validates each enquiry, filters spam (hidden field and timing) and forwards it to the Apps Script, which writes it to the service's tab and to "All enquiries", adding any new columns automatically.
