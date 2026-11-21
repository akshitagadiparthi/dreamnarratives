// Draws a wedding monogram onto a canvas. Pure drawing code, shared by the
// Monogram Studio page and the preview on the home page.

export const STYLES = [
  { id: 'editorial', label: 'Editorial', css: { fontFamily: '"Bodoni Moda Variable", serif', fontWeight: 700 } },
  { id: 'heritage', label: 'Heritage', css: { fontFamily: 'Cinzel, serif', fontWeight: 500 } },
  { id: 'romance', label: 'Romance', css: { fontFamily: '"Great Vibes", cursive', fontSize: '1.5em' } },
  { id: 'classic', label: 'Classic', css: { fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 500 } },
  { id: 'modern', label: 'Modern', css: { fontFamily: 'Italiana, serif' } },
  { id: 'crest', label: 'Crest', css: { fontFamily: '"Playfair Display", serif', fontWeight: 500 } },
];
export const GROUNDS = [
  { id: 'cream', label: 'Cream' },
  { id: 'stone', label: 'Stone' },
  { id: 'black', label: 'Black' },
];

const F = {
  bodoni: '"Bodoni Moda Variable", "Bodoni Moda", Didot, Georgia, serif',
  cinzel: 'Cinzel, "Trajan Pro", Georgia, serif',
  vibes: '"Great Vibes", "Snell Roundhand", cursive',
  cormorant: '"Cormorant Garamond", Garamond, Georgia, serif',
  italiana: 'Italiana, Didot, Georgia, serif',
  playfair: '"Playfair Display", Georgia, serif',
  sans: 'Jost, "Avenir Next", system-ui, sans-serif',
};

const PALETTE = {
  cream: { bg: '#efece7', ink: '#141413', line: '#8a8176', soft: 'rgba(20, 20, 19, 0.45)' },
  stone: { bg: '#d6cfc4', ink: '#141413', line: '#6b645b', soft: 'rgba(20, 20, 19, 0.5)' },
  black: { bg: '#151514', ink: '#efece7', line: '#a9a29a', soft: 'rgba(239, 236, 231, 0.55)' },
};

export async function loadMonogramFonts() {
  if (!document.fonts) return;
  await Promise.all([
    document.fonts.load(`700 200px ${F.bodoni}`),
    document.fonts.load(`italic 400 200px ${F.bodoni}`),
    document.fonts.load(`500 200px ${F.cinzel}`),
    document.fonts.load(`400 200px ${F.vibes}`),
    document.fonts.load(`italic 500 200px ${F.cormorant}`),
    document.fonts.load(`italic 400 200px ${F.cormorant}`),
    document.fonts.load(`400 200px ${F.italiana}`),
    document.fonts.load(`500 200px ${F.playfair}`),
    document.fonts.load(`italic 500 200px ${F.playfair}`),
    document.fonts.load(`500 24px ${F.sans}`),
  ]).catch(() => {});
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

function diamond(ctx, x, y, r) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
  ctx.fill();
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/** A shield outline, centred on (cx, cy). */
function shield(ctx, cx, cy, w, h) {
  const l = cx - w / 2, r = cx + w / 2, t = cy - h / 2, b = cy + h / 2;
  ctx.beginPath();
  ctx.moveTo(l, t + h * 0.06);
  ctx.quadraticCurveTo(cx, t - h * 0.04, r, t + h * 0.06);
  ctx.lineTo(r, cy + h * 0.08);
  ctx.bezierCurveTo(r, cy + h * 0.32, cx + w * 0.18, b - h * 0.06, cx, b);
  ctx.bezierCurveTo(cx - w * 0.18, b - h * 0.06, l, cy + h * 0.32, l, cy + h * 0.08);
  ctx.closePath();
  ctx.stroke();
}

/**
 * Draws the monogram. The canvas is square; `size` comes from its width.
 * opts: { a, b, line, style, ground, watermark }
 */
export function drawMonogram(canvas, { a = 'D', b = 'N', line: words = '', style = 'editorial', ground = 'cream', watermark = true }) {
  const S = canvas.width;
  const ctx = canvas.getContext('2d');
  const u = S / 1080; // design units
  const P = PALETTE[ground] || PALETTE.cream;
  const A = (a || '').trim().slice(0, 1).toUpperCase() || 'A';
  const B = (b || '').trim().slice(0, 1).toUpperCase() || 'B';
  const cx = S / 2;
  const cy = S * 0.46;

  ctx.clearRect(0, 0, S, S);
  ctx.fillStyle = P.bg;
  ctx.fillRect(0, 0, S, S);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = P.ink;
  ctx.strokeStyle = P.line;
  ctx.lineCap = 'round';

  if (style === 'editorial') {
    // Bold Bodoni, the second letter in italic, split by a fine diagonal rule.
    ctx.font = `700 ${380 * u}px ${F.bodoni}`;
    ctx.fillText(A, cx - 150 * u, cy + 120 * u);
    ctx.font = `italic 400 ${380 * u}px ${F.bodoni}`;
    ctx.fillText(B, cx + 160 * u, cy + 150 * u);
    ctx.lineWidth = 2 * u;
    line(ctx, cx + 70 * u, cy - 230 * u, cx - 50 * u, cy + 250 * u);
  } else if (style === 'heritage') {
    // Roman capitals in a double square frame with corner diamonds.
    const half = 300 * u;
    ctx.lineWidth = 2.5 * u;
    ctx.strokeRect(cx - half, cy - half, half * 2, half * 2);
    ctx.lineWidth = 1 * u;
    ctx.strokeRect(cx - half + 18 * u, cy - half + 18 * u, half * 2 - 36 * u, half * 2 - 36 * u);
    ctx.fillStyle = P.line;
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([x, y]) => diamond(ctx, cx + x * half, cy + y * half, 12 * u));
    ctx.fillStyle = P.ink;
    ctx.font = `500 ${250 * u}px ${F.cinzel}`;
    ctx.fillText(A, cx - 125 * u, cy + 88 * u);
    ctx.fillText(B, cx + 125 * u, cy + 88 * u);
    ctx.fillStyle = P.line;
    diamond(ctx, cx, cy, 10 * u);
  } else if (style === 'romance') {
    // Flowing script, the two letters entwined.
    ctx.font = `400 ${420 * u}px ${F.vibes}`;
    ctx.fillText(A, cx - 175 * u, cy + 110 * u);
    ctx.fillText(B, cx + 190 * u, cy + 170 * u);
  } else if (style === 'classic') {
    // Garamond italics inside a double oval.
    ctx.lineWidth = 2.5 * u;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 290 * u, 370 * u, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1 * u;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 272 * u, 352 * u, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = `italic 500 ${300 * u}px ${F.cormorant}`;
    ctx.fillText(A, cx - 105 * u, cy + 90 * u);
    ctx.fillText(B, cx + 115 * u, cy + 90 * u);
    ctx.fillStyle = P.line;
    ctx.font = `italic 400 ${90 * u}px ${F.cormorant}`;
    ctx.fillText('&', cx + 4 * u, cy + 200 * u);
  } else if (style === 'modern') {
    // Tall, fine capitals with wide spacing between two rules.
    ctx.font = `400 ${300 * u}px ${F.italiana}`;
    ctx.fillText(A, cx - 150 * u, cy + 105 * u);
    ctx.fillText(B, cx + 150 * u, cy + 105 * u);
    ctx.lineWidth = 1.5 * u;
    line(ctx, cx, cy - 150 * u, cx, cy + 120 * u);
    line(ctx, cx - 300 * u, cy - 230 * u, cx + 300 * u, cy - 230 * u);
    line(ctx, cx - 300 * u, cy + 200 * u, cx + 300 * u, cy + 200 * u);
  } else {
    // Crest: a shield, the letters stacked, with an italic ampersand.
    ctx.lineWidth = 2.5 * u;
    shield(ctx, cx, cy, 520 * u, 640 * u);
    ctx.lineWidth = 1 * u;
    shield(ctx, cx, cy, 484 * u, 600 * u);
    ctx.fillStyle = P.ink;
    ctx.font = `500 ${220 * u}px ${F.playfair}`;
    ctx.fillText(A, cx - 90 * u, cy + 10 * u);
    ctx.font = `italic 500 ${220 * u}px ${F.playfair}`;
    ctx.fillText(B, cx + 95 * u, cy + 190 * u);
    ctx.fillStyle = P.line;
    ctx.font = `italic 500 ${80 * u}px ${F.playfair}`;
    ctx.fillText('&', cx + 70 * u, cy - 40 * u);
  }

  // The line underneath: a date or a few words
  const text = (words || '').trim().slice(0, 32);
  if (text) {
    ctx.fillStyle = P.ink;
    if (style === 'romance' || style === 'classic') {
      ctx.font = `italic 400 ${50 * u}px ${F.cormorant}`;
      ctx.fillText(text, cx, S * 0.9);
    } else {
      ctx.font = `500 ${28 * u}px ${F.sans}`;
      spacedText(ctx, text.toUpperCase(), cx, S * 0.9, 9 * u);
    }
  }

  if (watermark) {
    ctx.fillStyle = P.soft;
    ctx.font = `500 ${16 * u}px ${F.sans}`;
    spacedText(ctx, 'DREAM NARRATIVES · VIJAYAWADA', cx, S - 34 * u, 5 * u);
  }
}
