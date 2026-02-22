// ===== GLOBAL CART FROM localStorage =====
let cart = JSON.parse(localStorage.getItem("aks_cart")) || [];

// ===== ELEMENTS =====
const cartCount = document.querySelector(".cart-count");
const cartBox = document.getElementById("cartBox");
const cartItems = document.getElementById("cartItems");
const cartBtn = document.querySelector(".cart-icon");
const buyNowBtn = document.getElementById("buyNow");

// ===== CART TOGGLE (MENU STYLE) =====
if (cartBtn && cartBox) {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartBox.style.display =
      cartBox.style.display === "block" ? "none" : "block";
  });
}

// ===== ADD TO CART =====
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    const item = cart.find(p => p.name === name);
    if (item) {
      item.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    saveCart();
    updateCartUI();
  });
});

// ===== UPDATE UI =====
function updateCartUI() {
  if (cartCount) {
    cartCount.innerText = cart.reduce((a, b) => a + b.qty, 0);
  }

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((p, i) => {
    const totalPrice = p.price * p.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${p.name}</strong><br>
          <small>Rs ${p.price} × ${p.qty} = <b>Rs ${totalPrice}</b></small>
        </div>

        <div class="qty">
          <button onclick="changeQty(${i}, -1)">−</button>
          <span>${p.qty}</span>
          <button onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
    `;
  });
}


// ===== CHANGE QTY =====
function changeQty(index, val) {
  cart[index].qty += val;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

// ===== SAVE CART =====
function saveCart() {
  localStorage.setItem("aks_cart", JSON.stringify(cart));
}

// ===== BUY NOW → WHATSAPP =====
if (buyNowBtn) {
  buyNowBtn.addEventListener("click", () => {
    if (!cart.length) {
      alert("Cart empty hai");
      return;
    }

    let msg = "Assalam o Alaikum, main yeh order karna chahta hoon:\n";
    cart.forEach(p => {
      msg += `${p.name} x${p.qty} = Rs ${p.price * p.qty}\n`;
    });

    const phone = "923000000000"; // apna WhatsApp number
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  });
}

// ===== LOAD CART ON PAGE LOAD =====
updateCartUI();
