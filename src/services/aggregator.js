import cheapshark from './cheapshark.js';

/**
 * Devuelve imagen, oferta más barata y lista completa de ofertas
 * @param {string} title
 */
export async function getPrices(title = '') {
  // Ejecuta adaptadores en paralelo; por ahora solo uno
  const [cheap] = await Promise.all([
    cheapshark(title)          // <-- deja esto o [] si no tienes el módulo aún
  ]);

  // Une resultados y ordénalos
  const unified = [...cheap]
    .filter(o => o && !Number.isNaN(o.price))
    .sort((a, b) => a.price - b.price);

  return {
    title,
    image: unified[0]?.img ?? null,
    cheapest: unified[0] ?? null,
    offers: unified
  };
}
