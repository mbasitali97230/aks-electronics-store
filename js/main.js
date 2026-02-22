document.addEventListener("DOMContentLoaded", () => {
  // === HAMBURGER MENU (MUST-HAVE) ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // === CART COUNT ===
  updateCartCount();

  // === PRODUCT CARD HOVER (JS CONTROLLED) ===
  const cards = document.querySelectorAll(".category-card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("hover-active");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("hover-active");
    });
  });
});

// CART FUNCTIONS
function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id: Date.now(), qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.length;
  }
}