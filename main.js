// ============================================
// AFTER HOURS CAFE v2 — Main JS
// ============================================

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => mobileNav.classList.toggle('open'));
document.addEventListener('click', e => {
  if (mobileNav?.classList.contains('open') &&
      !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
    mobileNav.classList.remove('open');
  }
});

// ---- MENU CARD RENDER ----
function renderCard(item, mode = 'showcase') {
  const btnLabel = mode === 'order' ? '+ Add' : 'Order';
  const btnClick = mode === 'order' ? `addToCart(${item.id})` : `window.location.href='order.html'`;
  return `
    <div class="menu-card" data-category="${item.category}">
      <div class="mc-emoji-wrap">${item.emoji}</div>
      <div class="mc-body">
        <p class="mc-category">${item.category}</p>
        <h3 class="mc-name">${item.name}</h3>
        <p class="mc-desc">${item.desc}</p>
        <div class="mc-footer">
          <span class="mc-price">Rs. ${item.price}</span>
          <button class="mc-add" onclick="${btnClick}">${btnLabel}</button>
        </div>
      </div>
    </div>`;
}

// ---- HOME: MENU SHOWCASE TABS ----
const showcaseGrid = document.getElementById('showcaseGrid');
const showcaseTabs = document.getElementById('showcaseTabs');
if (showcaseGrid && typeof menuItems !== 'undefined') {
  function renderShowcase(filter) {
    const items = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
    const display = items.slice(0, 8);
    showcaseGrid.innerHTML = display.map(i => renderCard(i, 'showcase')).join('');
  }
  showcaseTabs?.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showcaseTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderShowcase(btn.dataset.tab);
    });
  });
  renderShowcase('coffee');
}

// ---- COUNTER ANIMATION ----
function animateCounters() {
  document.querySelectorAll('.pq-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = target >= 1000 ? '+' : (el.closest('.pq-item')?.querySelector('.pq-label')?.textContent.includes('Years') ? '+' : '+');
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + (target >= 100 ? '+' : '+');
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}
const parallaxStrip = document.querySelector('.parallax-strip');
if (parallaxStrip) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(parallaxStrip);
}

// ---- TESTIMONIAL CAROUSEL ----
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('testPrev');
const nextBtn = document.getElementById('testNext');
if (track && prevBtn && nextBtn) {
  const cardW = () => track.querySelector('.tcard')?.offsetWidth + 24 || 370;
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -cardW(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left:  cardW(), behavior: 'smooth' }));
}
