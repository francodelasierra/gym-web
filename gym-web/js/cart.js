const CART_KEY = "cart";

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
    const item = cart.find(p => p.id === product.id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
}

export function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

export function updateQuantity(id, quantity) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    if (quantity <= 0) {
        removeFromCart(id);
    } else {
        item.quantity = quantity;
        saveCart();
    }
}

export function clearCart() {
    cart = [];
    saveCart();
}

export function getCart() {
    return [...cart];
}

export function getTotal() {
    return cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
}
