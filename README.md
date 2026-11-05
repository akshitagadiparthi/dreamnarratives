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

### Adding work (photos and videos straight from Google Drive)

Size doesn't matter: originals are never uploaded. A script shrinks everything first, so the site stays fast and free to host.

1. In Google Drive, right-click a folder (e-invites, physical cards, video invites, hampers, interiors, social media, branding) → **Download**. Drive gives you a zip.
2. Unzip it into `incoming/` in this project, keeping the folder name, e.g. `incoming/hampers/…`. Drive's folder names and the site's (`invitation`, `gift`, `identity`, `telling`, `space`) both work.
3. Run `npm run images`.
   - Photos become WebP in `public/work/<service>/`: max 2000px, usually 100–400 KB, down from several MB.
   - Videos become 1080p MP4s (no sound) with a poster frame. This needs ffmpeg installed once: `brew install ffmpeg` on Mac, `winget install ffmpeg` on Windows.
   - `content/work.json` is rewritten, so the work appears on its service page and floats around the moon on the home page. No code to edit.
4. Commit and push; Vercel redeploys automatically.

Captions: edit them in `content/work.json`; the script keeps your edits. To keep a busy image (a collage, a presentation board) off the floating tiles on the home page, add `"inHero": false` to it there.

Photos shot on a plain white background are turned into cut-outs automatically if you remove the background first (any free background remover, saved as PNG): they then float on the home page without a frame.

Tips: name a file `hero.jpg` to make it a service's main image. Descriptive file names become captions ("sharma-wedding-suite.jpg" → "Sharma wedding suite"); camera names like IMG_2041 get no caption. Running the script again only converts new files.

Why this is fast and free: the compressed files live in the repository and Vercel serves them from its global network at no cost, and Next.js resizes each for the visitor's screen. If the studio ever outgrows Vercel's free image-resizing allowance, set `images: { unoptimized: true }` in `next.config.mjs`; because the files are already compressed, the site stays fast. Keep the whole `public/work` folder under about 1 GB (roughly 3,000 photos).

### Logo and portraits

Already in place: the logo (`public/images/logo-ink.webp` for light grounds, `logo-light.webp` for the footer) and the founders' photos (`driti.webp`, `nimisha.webp`, `founders-*.webp`). To replace one, keep the same file name, or update the path in `content/site.js` / `content/studio.js`.

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


## Search (SEO) and sharing

- Every page has its own title and description naming Dream Narratives, Vijayawada and Driti & Nimisha, plus structured data (organisation, founders, services) that Google reads.
- The share preview (WhatsApp, Instagram, LinkedIn) is `app/opengraph-image.jpg`; the tab icon is `app/icon.png`.
- The site's address is read from `NEXT_PUBLIC_SITE_URL`. It defaults to `https://dreamnarratives.vercel.app`. When a custom domain is connected, set `NEXT_PUBLIC_SITE_URL` in Vercel to it and redeploy.
- After launch: add the site to Google Search Console (search.google.com/search-console), submit `/sitemap.xml`, and create a free Google Business Profile for "Dream Narratives, Vijayawada" linking to the site. That profile does more for local search than anything on the page.

## Monogram studio

`/monogram` is a free tool: visitors type two initials, pick a style and download or share a monogram. It runs entirely in their browser, so it costs nothing to host. Shared links reopen the same monogram. Styles are drawn in `components/monogram.js`.

## Phone numbers (private)

Driti and Nimisha's numbers never appear on the site or in the code visitors download. They're kept on the server and shown only on the thank-you screen after someone sends an enquiry (and on the Contact page for that visitor afterwards).

Set the real numbers in Vercel → Settings → Environment Variables as `PRIVATE_CONTACT` (format in `.env.example`) and redeploy, or edit `lib/private-contact.js`. The environment variable is better: the numbers then aren't in GitHub either.

## FAQ

Questions and answers live in `content/studio.js` (`faq`). They show on the Contact page, and Google can show them in search results. Two answers are marked `// confirm`; check them with the founders.

## Video invites

The Video invites page (`/what-we-do/video-invites`) plays the studio's video invites in phone frames. Put the videos in `incoming/video-invites/` and run `npm run images` (needs ffmpeg). Until videos are added, the frames show e-invite stills, labelled as stills.

## If the tab icon doesn't update

Browsers keep tab icons for a long time. Open the site in a private window to see the new one. The icon files are `app/icon.png`, `app/icon.svg`, `app/favicon.ico` and `app/apple-icon.png`; replace all four together if the logo changes.
