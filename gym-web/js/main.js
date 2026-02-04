import { PRODUCTS } from "./products.js";
import { addToCart } from "./cart.js";
import { renderCart } from "./cart-render.js";
import { setupPlanModal } from "./planes.js";

const productsContainer = document.getElementById("products-container");

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

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      addToCart(product);
      renderCart();
    });

    productsContainer.appendChild(card);
  });
}

renderProducts();
renderCart();
setupPlanModal();

