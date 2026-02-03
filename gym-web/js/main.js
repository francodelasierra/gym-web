
// =========================
// IMPORTS
// =========================
import { PRODUCTS } from "./products.js";
import { addToCart } from "./cart.js";
import { renderCart } from "./cart-render.js";
import { setupPlanModal } from "./plans.js";


// =========================
// DOM
// =========================
const productsContainer = document.getElementById("products-container");

// =========================
// RENDER PRODUCTS
// =========================
function renderProducts() {
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    PRODUCTS.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong>$${product.price.toLocaleString("es-AR")}</strong>
            <button>Comprar</button>
        `;

        const button = card.querySelector("button");
        button.addEventListener("click", () => {
            addToCart(product); // guarda en localStorage
            renderCart();      // actualiza el carrito
        });

        productsContainer.appendChild(card);
    });
}

// =========================
// INIT
// =========================
renderProducts();
renderCart();
setupPlanModal();

