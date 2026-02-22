// Load cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id: Date.now(), qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelector(".cart-count").innerText = cart.length;
}
