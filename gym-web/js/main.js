// IMPORTS
import { PRODUCTS } from "./products.js";
import { addToCart } from "./cart.js";
import { renderCart } from "./cart-render.js";
import { setupPlanModal } from "./planes.js";


// DOM ELEMENTS

const productsContainer = document.getElementById("products-container");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const header = document.querySelector(".nav-header");


// RENDER PRODUCTS

function renderProducts() {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  PRODUCTS
    .filter((p) => p && p.available !== false)
    .forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      const price = Number(product.price) || 0;
      const disabled = product.available === false;

      card.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>$${price.toLocaleString("es-AR")}</strong>
        <button class="btn-buy" ${disabled ? "disabled" : ""}>
          ${disabled ? "Sin stock" : "Comprar"}
        </button>
      `;

      const button = card.querySelector(".btn-buy");
      if (!disabled) {
        button.addEventListener("click", () => {
          addToCart(product);
          renderCart();
          document.getElementById("cartFab")?.click();
        });
      }

      fragment.appendChild(card);
    });

  productsContainer.appendChild(fragment);
}


// NAVBAR MOBILE

function setupMobileMenu() {
  if (!menuToggle || !navList || !header) return;

  const openMenu = () => {
    navList.classList.add("show");
    header.classList.add("menu-open");
  };

  const closeMenu = () => {
    navList.classList.remove("show");
    header.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    const isOpen = navList.classList.contains("show");
    if (isOpen) closeMenu();
    else openMenu();
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navList.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("click", (e) => {
    const clickedInsideHeader = header.contains(e.target);
    if (!clickedInsideHeader) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}


// CART DRAWER (carrito lateral)

function setupCartDrawer() {
  const cartFab = document.getElementById("cartFab");
  const cartBadge = document.getElementById("cartBadge");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartClose = document.getElementById("cartClose");
  const cartOverlay = document.getElementById("cartOverlay");

  if (!cartFab || !cartDrawer || !cartClose || !cartOverlay || !cartBadge) return;

  const open = () => {
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartFab.setAttribute("aria-expanded", "true");
    cartOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartFab.setAttribute("aria-expanded", "false");
    cartOverlay.hidden = true;
    document.body.style.overflow = "";
  };

  cartFab.addEventListener("click", (e) => {
    e.stopPropagation();
    cartDrawer.classList.contains("is-open") ? close() : open();
  });

  cartClose.addEventListener("click", close);
  cartOverlay.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Para que cart-render.js pueda actualizar el numerito del badge
  window.__setCartBadge = (n) => {
    cartBadge.textContent = String(n);
  };
}


// INIT

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  setupPlanModal();
  setupMobileMenu();
  setupCartDrawer(); 
});
