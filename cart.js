// After Hours Cafe — Cart Logic v2
let cart = [];

function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  const existing = cart.find(c => c.id === itemId);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  renderCart();
  showToast(`✓ ${item.emoji} ${item.name} added`);
}

function removeFromCart(itemId) {
  const existing = cart.find(c => c.id === itemId);
  if (!existing) return;
  if (existing.qty > 1) existing.qty--;
  else cart = cart.filter(c => c.id !== itemId);
  renderCart();
}

function getSubtotal() { return cart.reduce((s, c) => s + c.price * c.qty, 0); }
function getDelivery()  { return getSubtotal() >= 500 ? 0 : 50; }

function renderCart() {
  const listEl    = document.getElementById('cartItemsList');
  const summaryEl = document.getElementById('cartSummary');
  const countEl   = document.getElementById('cartCount');
  const proceedEl = document.getElementById('proceedBtn');
  const checkoutEl= document.getElementById('checkoutSection');
  if (!listEl) return;

  const total = cart.reduce((s,c) => s + c.qty, 0);
  if (countEl) countEl.textContent = total;

  if (cart.length === 0) {
    listEl.innerHTML = '<p class="cart-empty">Your cart is empty.<br/>Add something delicious!</p>';
    if (summaryEl)  summaryEl.style.display = 'none';
    if (proceedEl)  proceedEl.style.display = 'none';
    if (checkoutEl) checkoutEl.style.display = 'none';
    return;
  }

  listEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="ci-emoji">${item.emoji}</span>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-unit">Rs. ${item.price} × ${item.qty}</div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="removeFromCart(${item.id})">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="addToCart(${item.id})">+</button>
      </div>
      <div class="ci-price">Rs. ${item.price * item.qty}</div>
    </div>`).join('');

  const sub = getSubtotal(), del = getDelivery(), tot = sub + del;
  if (summaryEl) {
    summaryEl.style.display = 'block';
    document.getElementById('cartSubtotal').textContent  = `Rs. ${sub}`;
    document.getElementById('cartDelivery').textContent  = del === 0 ? 'FREE 🎉' : `Rs. ${del}`;
    document.getElementById('cartTotal').textContent     = `Rs. ${tot}`;
    const freeEl = document.getElementById('cartFreeMsg');
    if (freeEl) freeEl.style.display = sub >= 500 ? 'block' : 'none';
  }
  if (proceedEl) proceedEl.style.display = 'block';
}

function showToast(msg) {
  let t = document.getElementById('toastEl');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toastEl';
    Object.assign(t.style, {
      position:'fixed', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
      background:'#e8a23a', color:'#0a0804', padding:'0.7rem 1.5rem',
      borderRadius:'40px', fontFamily:"'Jost',sans-serif", fontSize:'0.875rem',
      fontWeight:'600', zIndex:'9999', opacity:'0', transition:'opacity 0.3s',
      boxShadow:'0 8px 24px rgba(0,0,0,0.4)', whiteSpace:'nowrap'
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}
