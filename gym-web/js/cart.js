const CART_KEY = "cart";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart() {
  return readCart();
}

export function addToCart(product) {
  const cart = readCart();
  const item = cart.find((p) => p.id === product.id);

  if (item) item.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = readCart().filter((p) => p.id !== id);
  saveCart(cart);
}

export function updateQuantity(id, quantity) {
  const cart = readCart();
  const item = cart.find((p) => p.id === id);
  if (!item) return;

  const q = Number(quantity);
  item.quantity = Number.isFinite(q) && q >= 1 ? q : 1;

  saveCart(cart);
}

export function getTotal() {
  return readCart().reduce((acc, item) => acc + item.price * item.quantity, 0);
}