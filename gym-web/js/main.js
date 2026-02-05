// =========================
// IMPORTS
// =========================
import { PRODUCTS } from "./products.js";
import { addToCart } from "./cart.js";
import { renderCart } from "./cart-render.js";
import { setupPlanModal } from "./planes.js";


// =========================
// DOM ELEMENTS
// =========================
const productsContainer = document.getElementById("products-container");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const header = document.querySelector(".nav-header");


// =========================
// RENDER PRODUCTS
// =========================
function renderProducts() {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  PRODUCTS.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img class="product-img" src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>$${product.price.toLocaleString("es-AR")}</strong>
      <button class="btn-buy">Comprar</button>
    `;

    const button = card.querySelector(".btn-buy");
    button.addEventListener("click", () => {
      addToCart(product);
      renderCart();
    });

    productsContainer.appendChild(card);
  });
}


// =========================
// NAVBAR MOBILE
// =========================
function setupMobileMenu() {
  if (!menuToggle || !navList || !header) return;

  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("show");
    header.classList.toggle("menu-open");
  });
}


// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  setupPlanModal();
  setupMobileMenu();
});


