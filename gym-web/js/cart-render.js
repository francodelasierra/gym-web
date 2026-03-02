import { getCart, removeFromCart, updateQuantity, getTotal } from "./cart.js";

const cartContainer = document.getElementById("cart-container");

function openPurchaseModal() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  if (!modal || !modalTitle) return;

  modalTitle.innerHTML = `
    ✅ Gracias por su compra <br><br>
    Le enviaremos su comprobante de pago al correo.
  `;

  modal.classList.add("show");
}

export function renderCart() {
  if (!cartContainer) return;

  const cart = getCart();

  // ✅ BADGE 
  const count = cart.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  if (window.__setCartBadge) window.__setCartBadge(count);

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="cart-empty">🛒 El carrito está vacío</p>`;
    return;
  }

  // ITEMS (con imagen + layout correcto)
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img class="cart-thumb" src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>$${Number(item.price).toLocaleString("es-AR")}</p>
      </div>

      <div class="cart-actions">
        <input class="cart-qty" type="number" min="1" value="${item.quantity}" />
        <button class="btn-buy cart-remove" type="button">Eliminar</button>
      </div>
    `;

    const qtyInput = div.querySelector(".cart-qty");
    qtyInput.addEventListener("change", (e) => {
      updateQuantity(item.id, e.target.value);
      renderCart();
    });

    const removeBtn = div.querySelector(".cart-remove");
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    cartContainer.appendChild(div);
  });

  // TOTAL + CHECKOUT
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");

  totalDiv.innerHTML = `
    <h3>Total: $${getTotal().toLocaleString("es-AR")}</h3>
    <button id="checkout" class="btn-finish" type="button">Finalizar compra</button>
  `;

  cartContainer.appendChild(totalDiv);

  const checkoutBtn = totalDiv.querySelector("#checkout");
  checkoutBtn.addEventListener("click", () => {
    openPurchaseModal();
    localStorage.removeItem("cart");
    renderCart();
  });
}