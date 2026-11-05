// Draws a wedding monogram onto a canvas. Pure drawing code, shared by the
// Monogram Studio page and the little preview on the home page.

export const STYLES = [
  { id: 'moonlit', label: 'Moonlit' },
  { id: 'classic', label: 'Classic' },
  { id: 'script', label: 'Script' },
];
export const GROUNDS = [
  { id: 'ivory', label: 'Ivory' },
  { id: 'night', label: 'Night' },
];

const FONTS = {
  display: '"Bodoni Moda Variable", "Bodoni Moda", Didot, Georgia, serif',
  script: '"Pinyon Script", "Snell Roundhand", cursive',
  sans: 'Jost, "Avenir Next", system-ui, sans-serif',
};

export async function loadMonogramFonts() {
  if (!document.fonts) return;
  await Promise.all([
    document.fonts.load(`400 200px ${FONTS.display}`),
    document.fonts.load(`italic 400 200px ${FONTS.display}`),
    document.fonts.load(`400 200px ${FONTS.script}`),
    document.fonts.load(`500 24px ${FONTS.sans}`),
  ]).catch(() => {});
}

const STAR_D = 'M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z';
let STAR = null; // created in the browser only

function sparkle(ctx, x, y, size, color) {
  ctx.save();
  ctx.translate(x - size / 2, y - size / 2);
  ctx.scale(size / 24, size / 24);
  ctx.fillStyle = color;
  ctx.shadowColor = 'rgba(241, 222, 180, 0.9)';
  ctx.shadowBlur = 12;
  if (!STAR) STAR = new Path2D(STAR_D);
  ctx.fill(STAR);
  ctx.restore();
}

function crescent(ctx, cx, cy, r, color, cut = 0.8) {
  // Draw the disc, bite the shadow out of it on a scratch canvas, then glow it in.
  const pad = r * 0.4;
  const size = Math.ceil(2 * (r + pad));
  const off = document.createElement('canvas');
  off.width = size;
  off.height = size;
  const o = off.getContext('2d');
  const ox = size / 2, oy = size / 2;
  const g = o.createLinearGradient(ox - r, oy - r, ox + r, oy + r);
  g.addColorStop(0, color.light);
  g.addColorStop(1, color.deep);
  o.fillStyle = g;
  o.beginPath();
  o.arc(ox, oy, r, 0, Math.PI * 2);
  o.fill();
  o.globalCompositeOperation = 'destination-out';
  o.beginPath();
  o.arc(ox + r * 0.38, oy - r * 0.16, r * cut, 0, Math.PI * 2);
  o.fill();
  ctx.save();
  ctx.shadowColor = 'rgba(241, 222, 180, 0.55)';
  ctx.shadowBlur = 40;
  ctx.drawImage(off, cx - size / 2, cy - size / 2);
  ctx.restore();
}

function spacedText(ctx, text, x, y, spacing) {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let cx = x - total / 2;
  chars.forEach((c, i) => {
    ctx.fillText(c, cx + widths[i] / 2, y);
    cx += widths[i] + spacing;
  });
}

/**
 * Draws the monogram. `size` is the canvas's pixel size (square).
 * opts: { a, b, line, style, ground, watermark }
 */
export function drawMonogram(canvas, { a = 'D', b = 'N', line = '', style = 'moonlit', ground = 'ivory', watermark = true }) {
  const S = canvas.width;
  const ctx = canvas.getContext('2d');
  const u = S / 1080; // design units
  const night = ground === 'night';
  const ink = night ? '#efe6d6' : '#2b231d';
  const gold = night ? '#d9bb82' : '#a8854c';
  const goldC = night ? { light: '#f3dfae', deep: '#b8904f' } : { light: '#dcc08a', deep: '#a8854c' };
  const A = (a || '').trim().slice(0, 1).toUpperCase() || 'A';
  const B = (b || '').trim().slice(0, 1).toUpperCase() || 'B';

  ctx.clearRect(0, 0, S, S);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // Ground
  if (night) {
    const g = ctx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, '#17120e');
    g.addColorStop(0.6, '#211b16');
    g.addColorStop(1, '#2e241c');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    const glow = ctx.createRadialGradient(S / 2, S * 0.45, 0, S / 2, S * 0.45, S * 0.5);
    glow.addColorStop(0, 'rgba(241, 222, 180, 0.16)');
    glow.addColorStop(1, 'rgba(241, 222, 180, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, S, S);
    let seed = (A.charCodeAt(0) * 31 + B.charCodeAt(0)) % 2147483647 || 7;
    const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 90; i++) {
      ctx.globalAlpha = 0.25 + r() * 0.7;
      ctx.fillStyle = '#f1deb4';
      ctx.beginPath();
      ctx.arc(r() * S, r() * S, (0.6 + r() * 1.8) * u, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = '#f8f4ec';
    ctx.fillRect(0, 0, S, S);
  }

  const cx = S / 2;
  const cy = S * 0.47;

  if (style === 'moonlit') {
    crescent(ctx, cx - 30 * u, cy - 10 * u, 330 * u, goldC);
    ctx.fillStyle = ink;
    ctx.font = `400 ${300 * u}px ${FONTS.display}`;
    ctx.fillText(A, cx - 20 * u, cy + 60 * u);
    ctx.font = `italic 400 ${300 * u}px ${FONTS.display}`;
    ctx.fillText(B, cx + 150 * u, cy + 150 * u);
    sparkle(ctx, cx + 250 * u, cy - 230 * u, 46 * u, gold);
    sparkle(ctx, cx - 300 * u, cy + 230 * u, 28 * u, gold);
    sparkle(ctx, cx + 300 * u, cy + 40 * u, 20 * u, gold);
  } else if (style === 'classic') {
    ctx.strokeStyle = gold;
    ctx.lineWidth = 3 * u;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 300 * u, 380 * u, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.2 * u;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 282 * u, 362 * u, 0, 0, Math.PI * 2);
    ctx.stroke();
    sparkle(ctx, cx, cy - 380 * u, 44 * u, gold);
    ctx.fillStyle = ink;
    ctx.font = `400 ${250 * u}px ${FONTS.display}`;
    ctx.fillText(A, cx - 110 * u, cy + 70 * u);
    ctx.fillText(B, cx + 110 * u, cy + 70 * u);
    ctx.fillStyle = gold;
    ctx.save();
    ctx.translate(cx, cy - 18 * u);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-9 * u, -9 * u, 18 * u, 18 * u);
    ctx.restore();
  } else {
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2 * u;
    ctx.beginPath();
    ctx.arc(cx, cy, 330 * u, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = ink;
    ctx.font = `400 ${470 * u}px ${FONTS.script}`;
    ctx.fillText(A, cx - 70 * u, cy + 120 * u);
    ctx.fillStyle = gold;
    ctx.font = `400 ${400 * u}px ${FONTS.script}`;
    ctx.fillText(B, cx + 110 * u, cy + 190 * u);
    sparkle(ctx, cx + 330 * u * Math.cos(-0.8), cy + 330 * u * Math.sin(-0.8), 40 * u, gold);
  }

  // The line underneath: a date or a few words
  const text = (line || '').trim().slice(0, 32);
  if (text) {
    ctx.fillStyle = ink;
    if (style === 'script') {
      ctx.font = `italic 400 ${44 * u}px ${FONTS.display}`;
      ctx.fillText(text, cx, S * 0.9);
    } else {
      ctx.font = `500 ${30 * u}px ${FONTS.sans}`;
      spacedText(ctx, text.toUpperCase(), cx, S * 0.9, 9 * u);
    }
  }

  if (watermark) {
    ctx.fillStyle = night ? 'rgba(239, 230, 214, 0.55)' : 'rgba(43, 35, 29, 0.45)';
    ctx.font = `500 ${17 * u}px ${FONTS.sans}`;
    spacedText(ctx, 'DREAM NARRATIVES · VIJAYAWADA', cx, S - 34 * u, 5 * u);
  }
}
