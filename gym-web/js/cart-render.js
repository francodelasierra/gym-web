import { getCart, removeFromCart, updateQuantity, getTotal } from "./cart.js";

const cartContainer = document.getElementById("cart-container");

export function renderCart() {
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
  <p class="cart-empty">🛒 El carrito está vacío</p>
`;

    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

  div.innerHTML = `
  <h4>${item.name}</h4>
  <p>$${item.price.toLocaleString("es-AR")}</p>
  <input type="number" min="1" value="${item.quantity}" />
  <button class="btn-buy">Eliminar</button>
`;

    const qtyInput = div.querySelector("input");
    qtyInput.addEventListener("change", (e) => {
      updateQuantity(item.id, e.target.value);
      renderCart();
    });

    const removeBtn = div.querySelector("button");
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    cartContainer.appendChild(div);
  });

 const totalDiv = document.createElement("div");
totalDiv.classList.add("cart-total");
totalDiv.innerHTML = `
  <h3>Total: $${getTotal().toLocaleString("es-AR")}</h3>
  <button id="checkout" class="btn-finish">Finalizar compra</button>
`;


  cartContainer.appendChild(totalDiv);
const checkoutBtn = totalDiv.querySelector("#checkout");

checkoutBtn.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");

  if (!modal || !modalTitle) return;

  modalTitle.innerHTML = `
    Gracias por su compra <br><br>
    Le enviaremos su comprobante de pago al correo.
  `;

  modal.classList.add("show");

  localStorage.removeItem("cart");
  renderCart();


const checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", () => {
  cartContainer.innerHTML = `
    <div class="cart-empty">
      ✅ Gracias por su compra <br>
      Le enviaremos su comprobante de pago al correo.
    </div>
  `;

  localStorage.removeItem("cart");
});






});




}



