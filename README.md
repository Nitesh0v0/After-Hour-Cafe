# ☕ After Hours Cafe — v2 (Visual Redesign)

**A rich, visually-driven e-commerce website for After Hours Cafe — Bhairahawa, Nepal.**

> *Coffee that keeps the night alive.*

---

## 🌐 Preview

Open `index.html` in your browser, or deploy to GitHub Pages.

---

## 📁 File Structure

```
after-hours-cafe/
├── index.html          # Homepage (hero, split sections, stats, testimonials, blog)
├── menu.html           # Full menu with live category filter
├── order.html          # Online ordering with sticky cart + checkout
├── about.html          # Brand story, values, team
├── contact.html        # Contact form + Google Maps
│
├── css/
│   └── style.css       # Complete design system (~700 lines)
│
├── js/
│   ├── data.js         # 23 menu items (5 categories)
│   ├── main.js         # Nav, tab showcase, counter animation, carousel
│   ├── menu.js         # Menu filter logic
│   ├── cart.js         # Cart state, toast notifications
│   └── order.js        # Order flow + confirmation modal
│
└── README.md
```

---

## ✨ Visual Components

### Homepage
- **Animated Hero** — SVG coffee cup illustration with steaming animation, floating info cards, live status badge
- **Marquee Announcement Strip** — scrolling promo banner in amber
- **Split Sections** — alternating image+content layouts (Signature Drink, Our Story, Delivery)
- **Tabbed Menu Showcase** — filter between Coffee/Cold/Food/Desserts with animated cards
- **Animated Stats Counter** — 20K+ cups, 5 years, 23 items — counted up on scroll
- **Testimonial Carousel** — scrollable review cards with navigation arrows
- **Magazine Blog Section** — featured + stacked article cards
- **CTA Banner** — concentric ring design with amber glow

### Menu Page
- Filter bar with category pills
- 4-column responsive grid with hover lift effects

### Order Page
- Side-by-side layout: item grid + sticky cart panel
- Live cart with add/remove, qty controls, delivery calculator
- Checkout form with eSewa/Khalti/COD options
- Order confirmation modal with animation

### About Page
- Stats grid (5+ years, 20K+ cups...)
- Values grid with icon cards
- Team member cards with initials avatars

### Contact Page
- Info blocks with map
- Contact form with submission success state
- Google Maps embed for Bhairahawa

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| Background | `#0a0804` (deep espresso) |
| Primary accent | `#e8a23a` (amber gold) |
| Display font | Cormorant Garamond |
| Body font | Jost |
| Aesthetic | Dark luxury, editorial, warm |

---

## 🚀 Deploy to GitHub Pages

1. Push all files to a GitHub repo
2. Go to **Settings → Pages → Source: main branch**  
3. Live at `https://yourusername.github.io/after-hours-cafe/`

---

## 📌 Customization

- Replace placeholder phone `+977-71-XXXXXX` with real number
- Update Google Maps iframe `src` with actual location pin
- Connect social media links (Facebook/Instagram/TikTok)
- For production payments, integrate eSewa/Khalti APIs

---

*Made with ❤️ for the people of Bhairahawa.*
