/* ───── CUSTOM CURSOR ───── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 60);
});

function attachCursorListeners() {
  document.querySelectorAll('button, a, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      ring.style.transform   = 'translate(-50%, -50%) scale(1.5)';
      ring.style.borderColor = 'rgba(200,146,42,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform   = 'translate(-50%, -50%) scale(1)';
      ring.style.borderColor = 'rgba(200,146,42,0.5)';
    });
  });
}

/* ───── PRODUCTS DATA ───── */
const products = [
  {
    id: 1, name: 'Midnight Espresso',
    desc: 'Triple-shot, 24-hr cold steep, oat finish.',
    price: 850,
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80',
    cat: 'drinks', badge: 'Best Seller'
  },
  {
    id: 2, name: 'Dark Moon Latte',
    desc: 'Activated charcoal, vanilla, and velvet oat milk.',
    price: 920,
    img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80',
    cat: 'drinks'
  },
  {
    id: 3, name: 'Velvet Cold Brew',
    desc: '18-hour Guatemalan steep, served over obsidian ice.',
    price: 780,
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    cat: 'drinks', badge: 'New'
  },
  {
    id: 4, name: 'Ash Cortado',
    desc: 'Single-origin espresso, 1:1 steamed oat.',
    price: 720,
    img: 'https://images.unsplash.com/photo-1485808191679-5f86510df739?w=600&q=80',
    cat: 'drinks'
  },
  {
    id: 5, name: 'Darkwave Croissant',
    desc: 'Squid ink butter croissant, baked at midnight.',
    price: 650,
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
    cat: 'food', badge: 'Limited'
  },
  {
    id: 6, name: 'Black Sesame Tart',
    desc: 'Silky sesame custard in dark cocoa pastry shell.',
    price: 850,
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    cat: 'food'
  },
  {
    id: 7, name: 'Night Owl Brownie',
    desc: 'Salted caramel, 85% cacao, served warm.',
    price: 590,
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    cat: 'food'
  },
  {
    id: 8, name: 'After Hours Tote',
    desc: 'Heavy canvas, wax-coated, screen-printed logo.',
    price: 3650,
    img: 'https://images.unsplash.com/photo-1622560480605-d83c661028c0?w=600&q=80',
    cat: 'merch'
  },
  {
    id: 9, name: 'Ceramic Mug — Dusk',
    desc: 'Matte black, gold rim, 12oz. Kiln-fired locally.',
    price: 4400,
    img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    cat: 'merch', badge: 'Fan Fav'
  },
];

/* ───── RENDER PRODUCTS ───── */
function renderProducts(filter) {
  const grid = document.getElementById('product-grid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-cat="${p.cat}">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-overlay">
        <button class="btn-primary" onclick="addToCart(${p.id})">Add to Bag</button>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <span class="product-price">Rs. ${p.price.toLocaleString('en-NP')}</span>
          <button class="add-btn" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');

  attachCursorListeners();
}

/* ───── FILTER ───── */
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

/* ───── CART STATE ───── */
let cart = [];

function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCart();
  showToast(`${p.name} added to bag`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = `Rs. ${total.toLocaleString('en-NP')}`;

  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');

  itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  if (cart.length === 0) {
    emptyEl.style.display = 'block';
  } else {
    emptyEl.style.display = 'none';
    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}</div>
          <div class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString('en-NP')}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
      `;
      itemsEl.appendChild(el);
    });
  }
}

function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('open');
  document.getElementById('cart-panel').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }
  showToast('Order placed ✓ See you tonight.');
  cart = [];
  updateCart();
  toggleCart();
}

/* ───── TOAST ───── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ───── SCROLL REVEAL ───── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ───── INIT ───── */
renderProducts('all');
attachCursorListeners();
