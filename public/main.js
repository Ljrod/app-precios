const form = document.getElementById('searchForm');
const titleInput = document.getElementById('title');
const result = document.getElementById('result');
const img = document.getElementById('gameImg');
const table = document.getElementById('priceTable');

form.addEventListener('submit', async e => {
  e.preventDefault();
  table.innerHTML = 'Cargando…';
  const q = encodeURIComponent(titleInput.value.trim());
  const data = await fetch(`/api/prices?title=${q}`).then(r => r.json());

  img.src = data.image;
  img.alt = data.title;
  table.innerHTML = `
    <tr><th>Tienda</th><th>Precio</th><th>Enlace</th></tr>
    ${data.offers.map(o => `
      <tr class="${o.store === data.cheapest.store ? 'winner' : ''}">
        <td>${o.store}</td>
        <td>${o.price} ${o.currency}</td>
        <td><a href="${o.url}" target="_blank">Comprar</a></td>
      </tr>`).join('')}
  `;
  result.hidden = false;
});
