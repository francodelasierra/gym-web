const CART_KEY = "cart";

function readCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function toValidPrice(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function toValidQty(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

export function getCart() {
  return readCart();
}

export function addToCart(product) {
  if (!product || !product.id) return;
  if (product.available === false) return;

  const cart = readCart();
  const item = cart.find((p) => p.id === product.id);

  if (item) {
    item.quantity = toValidQty(item.quantity + 1);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
      price: toValidPrice(product.price),
      available: product.available !== false,
      quantity: 1,
    });
  }

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

  item.quantity = toValidQty(quantity);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCount() {
  return readCart().reduce((acc, item) => acc + toValidQty(item.quantity), 0);
}

export function getTotal() {
  return readCart().reduce((acc, item) => {
    const price = toValidPrice(item.price);
    const qty = toValidQty(item.quantity);
    return acc + price * qty;
  }, 0);
}