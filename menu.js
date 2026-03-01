// After Hours Cafe — Menu Page JS
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => mobileNav.classList.toggle('open'));

function renderCard(item) {
  return `
    <div class="menu-card" data-category="${item.category}">
      <div class="mc-emoji-wrap">${item.emoji}</div>
      <div class="mc-body">
        <p class="mc-category">${item.category}</p>
        <h3 class="mc-name">${item.name}</h3>
        <p class="mc-desc">${item.desc}</p>
        <div class="mc-footer">
          <span class="mc-price">Rs. ${item.price}</span>
          <button class="mc-add" onclick="window.location.href='order.html'">Order →</button>
        </div>
      </div>
    </div>`;
}

const grid = document.getElementById('fullMenuGrid');
let activeFilter = 'all';
function renderGrid(filter) {
  const items = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
  grid.innerHTML = items.map(renderCard).join('');
}
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter);
  });
});
renderGrid('all');
