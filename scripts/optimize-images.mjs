// Turns the studio's original photos and videos into fast, small web files,
// and lists them for the site automatically.
//
//   1. Download a folder from Google Drive (right-click → Download) and unzip
//      it into incoming/. Folder names can be the Drive ones (e-invites,
//      physical cards, video invites, hampers, interiors, social media,
//      branding) or the site's own (invitation, gift, identity, telling, space).
//   2. Run:  npm run images
//   3. Photos become .webp in public/work/<service>/ (max 2000px, ~100–400 KB).
//      Videos become .mp4 (max 1080p, no sound) with a poster image, if ffmpeg
//      is installed (https://ffmpeg.org/download.html, or `brew install ffmpeg`).
//   4. content/work.json is rewritten, so the new work appears on the site
//      with no code changes. A file named hero.* becomes the service's main image.
//
// Originals in incoming/ are never uploaded (the folder is git-ignored), and
// files already converted are skipped, so running it again is quick.

import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const IN = path.resolve('incoming');
const OUT = path.resolve('public/work');
const MANIFEST = path.resolve('content/work.json');
const PHOTO = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif', '.avif']);
const VIDEO = new Set(['.mp4', '.mov', '.m4v', '.webm']);

// Drive folder names → the service they belong to.
const ALIASES = {
  invitation: 'invitation', invites: 'invitation', 'e-invites': 'invitation', einvites: 'invitation',
  'physical-cards': 'invitation', 'video-invites': 'invitation', cards: 'invitation', stationery: 'invitation',
  gift: 'gift', gifting: 'gift', hampers: 'gift',
  identity: 'identity', branding: 'identity', brand: 'identity',
  telling: 'identity', marketing: 'identity', 'social-media': 'identity', social: 'identity', instagram: 'identity',
  space: 'space', interiors: 'space', interior: 'space', architecture: 'space',
};

const slug = (name) =>
  name.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item';
// "physical-cards-sharma-suite.webp" → "Sharma suite"; camera names ("IMG_2041") → no caption.
const captionFrom = (name) => {
  let s = slug(name);
  for (const k of Object.keys(ALIASES).sort((a, b) => b.length - a.length)) if (s.startsWith(k + '-')) { s = s.slice(k.length + 1); break; }
  s = s.replace(/(^|-)hero(-|$)/, '$1').replace(/^-|-$/g, '');
  if (!s || /^(img|dsc|dscn|dji|pxl|mvimg|image|photo|whatsapp|screenshot|screen-shot|vid|video|copy|untitled)(-|$)/.test(s) || /^[\d-]+$/.test(s)) return '';
  s = s.replace(/-\d+$/, '').replace(/-/g, ' ');
  return s[0].toUpperCase() + s.slice(1);
};

const hasFfmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

const files = (await walk(IN)).filter((f) => PHOTO.has(path.extname(f).toLowerCase()) || VIDEO.has(path.extname(f).toLowerCase()));
if (!files.length) console.log('No new files in incoming/. Rebuilding the list from public/work/ only.');

let before = 0, after = 0, skippedVideos = 0;
for (const file of files) {
  const top = path.relative(IN, file).split(path.sep)[0];
  const service = ALIASES[slug(top)] || slug(top);
  const sub = slug(top) !== service ? `${slug(top)}-` : '';
  const ext = path.extname(file).toLowerCase();
  const base = sub + slug(path.basename(file));
  const outDir = path.join(OUT, service);
  await mkdir(outDir, { recursive: true });

  if (PHOTO.has(ext)) {
    const out = path.join(outDir, `${base}.webp`);
    if (existsSync(out)) continue;
    await sharp(file).rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(out);
    const [a, b] = await Promise.all([stat(file), stat(out)]);
    before += a.size; after += b.size;
    console.log(`✓ ${path.relative(process.cwd(), out)}  ${(a.size / 1048576).toFixed(1)} MB → ${(b.size / 1024).toFixed(0)} KB`);
  } else {
    const out = path.join(outDir, `${base}.mp4`);
    const poster = path.join(outDir, `${base}.jpg`);
    if (existsSync(out)) continue;
    if (!hasFfmpeg) { skippedVideos++; continue; }
    spawnSync('ffmpeg', ['-y', '-i', file, '-vf', "scale='min(1080,iw)':-2", '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '28', '-an', '-movflags', '+faststart', out], { stdio: 'ignore' });
    spawnSync('ffmpeg', ['-y', '-i', out, '-frames:v', '1', '-q:v', '4', poster], { stdio: 'ignore' });
    if (existsSync(out)) {
      const [a, b] = await Promise.all([stat(file), stat(out)]);
      before += a.size; after += b.size;
      console.log(`✓ ${path.relative(process.cwd(), out)}  ${(a.size / 1048576).toFixed(1)} MB → ${(b.size / 1048576).toFixed(1)} MB`);
    }
  }
}

// Rebuild the list of work from what is in public/work/, keeping any captions
// already edited by hand in content/work.json.
let previous = {};
try { previous = JSON.parse(await (await import('node:fs/promises')).readFile(MANIFEST, 'utf8')); } catch {}
const kept = new Map(Object.values(previous).flat().map((w) => [w.src || w.video, w]));
const manifest = {};
for (const dir of await readdir(OUT, { withFileTypes: true }).catch(() => [])) {
  if (!dir.isDirectory()) continue;
  const names = (await readdir(path.join(OUT, dir.name))).sort();
  const items = [];
  for (const n of names) {
    const ext = path.extname(n).toLowerCase();
    const url = `/work/${dir.name}/${n}`;
    // The Drive sub-folder a file came from (e.g. e-invites, physical-cards) becomes its "kind".
    const fromName = Object.keys(ALIASES).sort((x, y) => y.length - x.length).find((k) => k !== dir.name && ALIASES[k] === dir.name && n.startsWith(k + '-'));
    if (ext === '.webp') {
      const meta = await sharp(path.join(OUT, dir.name, n)).metadata();
      const old = kept.get(url);
      // A photo with a see-through background (a cut-out product shot) floats without a frame.
      items.push({ src: url, caption: old?.caption ?? captionFrom(n), width: meta.width, height: meta.height, hero: /(^|-)hero(-|\.)/.test(n), kind: old?.kind ?? fromName, ...(old?.inHero === false ? { inHero: false } : {}), cutout: !!meta.hasAlpha && !(await sharp(path.join(OUT, dir.name, n)).stats()).isOpaque });
    } else if (ext === '.mp4') {
      const poster = n.replace(/\.mp4$/, '.jpg');
      items.push({ video: url, poster: names.includes(poster) ? `/work/${dir.name}/${poster}` : undefined, caption: kept.get(url)?.caption ?? captionFrom(n), kind: kept.get(url)?.kind ?? fromName });
    }
  }
  // Keep the order already in content/work.json (reorder it there by hand); new pieces go last.
  const order = (previous[dir.name] || []).map((w) => w.src || w.video);
  const pos = (w) => { const i = order.indexOf(w.src || w.video); return i === -1 ? Infinity : i; };
  items.sort((a, b) => pos(a) - pos(b));
  if (items.length) manifest[dir.name] = items;
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

const count = Object.values(manifest).reduce((n, l) => n + l.length, 0);
if (before) console.log(`\nShrunk ${(before / 1048576).toFixed(1)} MB to ${(after / 1048576).toFixed(1)} MB.`);
console.log(`content/work.json now lists ${count} piece(s) across ${Object.keys(manifest).length} service(s).`);
if (skippedVideos) console.log(`\n${skippedVideos} video(s) skipped: install ffmpeg to convert them, then run again.`);
