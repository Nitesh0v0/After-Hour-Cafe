// After Hours Cafe — Order Page JS v2
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => mobileNav.classList.toggle('open'));

function renderOrderGrid(filter) {
  const grid = document.getElementById('orderItemsGrid');
  if (!grid) return;
  const items = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
  grid.innerHTML = items.map(item => `
    <div class="menu-card" data-category="${item.category}">
      <div class="mc-emoji-wrap" style="height:130px;">${item.emoji}</div>
      <div class="mc-body">
        <p class="mc-category">${item.category}</p>
        <h3 class="mc-name">${item.name}</h3>
        <p class="mc-desc">${item.desc}</p>
        <div class="mc-footer">
          <span class="mc-price">Rs. ${item.price}</span>
          <button class="mc-add" onclick="addToCart(${item.id})">+ Add</button>
        </div>
      </div>
    </div>`).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderOrderGrid(btn.dataset.filter);
  });
});
renderOrderGrid('all');
renderCart();

// Proceed
const proceedBtn = document.getElementById('proceedBtn');
const checkoutSection = document.getElementById('checkoutSection');
proceedBtn?.addEventListener('click', () => {
  proceedBtn.style.display = 'none';
  checkoutSection.style.display = 'block';
  checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Place order
document.getElementById('placeOrderBtn')?.addEventListener('click', () => {
  const name    = document.getElementById('custName')?.value.trim();
  const phone   = document.getElementById('custPhone')?.value.trim();
  const address = document.getElementById('custAddress')?.value.trim();
  if (!name || !phone || !address) {
    alert('Please fill in Name, Phone, and Address to continue.');
    return;
  }
  const orderId = 'AH-' + Date.now().toString().slice(-6);
  document.getElementById('modalOrderId').textContent = `Order ID: ${orderId}`;
  document.getElementById('successModal').style.display = 'flex';
  cart = [];
  renderCart();
});

function closeModal() {
  document.getElementById('successModal').style.display = 'none';
  window.location.href = 'index.html';
}
