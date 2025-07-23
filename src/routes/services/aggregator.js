import cheapshark from './cheapshark.js';
import steam from './steam.js';
import epic from './epic.js';
// …

export async function getPrices(title) {
  // Lanzas en paralelo
  const [cheap, st, ep /* … */] = await Promise.all([
    cheapshark(title),
    steam(title),
    epic(title),
    // …
  ]);

  const unified = [...cheap, ...st, ...ep /* … */]
    .filter(p => p && p.price !== null)
    .sort((a, b) => a.price - b.price);

  return {
    title,
    image: unified[0]?.img ?? null,
    cheapest: unified[0],
    offers: unified
  };
}
