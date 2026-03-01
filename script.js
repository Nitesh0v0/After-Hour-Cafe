const products = [
    { 
        id: 1, 
        name: "Midnight Espresso", 
        price: 4.50, 
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=500&auto=format&fit=crop",
        desc: "Bold and intense for the late-night grind." 
    },
    { 
        id: 2, 
        name: "Moonlight Latte", 
        price: 5.50, 
        image: "https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=500&auto=format&fit=crop",
        desc: "Velvety espresso with a hint of lavender honey." 
    },
    { 
        id: 3, 
        name: "Neon Cold Brew", 
        price: 5.00, 
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=500&auto=format&fit=crop",
        desc: "18-hour slow steep for a smooth finish." 
    },
    { 
        id: 4, 
        name: "Dark Roast Muffin", 
        price: 3.75, 
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=500&auto=format&fit=crop",
        desc: "Rich chocolate muffin with coffee bean crumbles." 
    }
];

let cartCount = 0;
const cartDisplay = document.getElementById('cart-count');
const grid = document.getElementById('product-grid');

function renderStore() {
    grid.innerHTML = products.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span class="price">$${item.price.toFixed(2)}</span>
            <button onclick="addToCart()">Add to Order</button>
        </div>
    `).join('');
}

function addToCart() {
    cartCount++;
    cartDisplay.innerText = cartCount;
    
    // Quick visual feedback
    cartDisplay.style.color = "#d4af37";
    setTimeout(() => cartDisplay.style.color = "#fff", 300);
}

document.addEventListener('DOMContentLoaded', renderStore);
