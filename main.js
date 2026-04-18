let cart = [];
let total = 0;

// ================= NAVBAR =================
function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("active");
}

document.addEventListener("click", function(e){
  const nav = document.getElementById("navLinks");
  const toggle = document.querySelector(".menu-toggle");

  if(nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)){
    nav.classList.remove("active");
  }
});

document.querySelectorAll(".nav-links a").forEach(link=>{
  link.addEventListener("click", ()=>{
    document.getElementById("navLinks").classList.remove("active");
  });
});

// ================= CART OPEN / CLOSE =================
function openCart(){
  document.getElementById("cartSheet").classList.add("active");
  document.getElementById("cartOverlay").style.display = "block";
}

function closeCart(){
  document.getElementById("cartSheet").classList.remove("active");
  document.getElementById("cartOverlay").style.display = "none";
}

document.getElementById("cartOverlay").onclick = closeCart;

// ================= TOAST =================
function showToast(message){
  const toast = document.getElementById("toast");
  if(!toast) return;

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },2000);
}

// ================= ADD TO CART =================
function addToCart(name, price){

  let existing = cart.find(item => item.name === name);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({name, price, qty:1});
  }

  updateCart();

  document.querySelector(".badge").innerText = cart.length;

  showToast("تمت إضافة " + name + " 🛒");

  // 🔊 Sound
  const sound = document.getElementById("addSound");
  if(sound){
    sound.currentTime = 0;
    sound.play().catch(()=>{});
  }
}

// ================= UPDATE CART =================
function updateCart(){

  let cartItems = document.getElementById("cartItems");
  let totalBox = document.getElementById("total");

  if(!cartItems || !totalBox) return;

  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((item, index)=>{
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price} جنيه</p>
        </div>

        <div class="qty">
          <button onclick="minusQty(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="plusQty(${index})">+</button>
        </div>
      </div>
    `;
  });

  totalBox.innerText = total;
}

// ================= QUANTITY =================
function minusQty(i){
  if(cart[i].qty > 1){
    cart[i].qty--;
  } else {
    cart.splice(i,1);
  }
  updateCart();
}

function plusQty(i){
  cart[i].qty++;
  updateCart();
}