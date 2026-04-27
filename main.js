let cart = [];

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

  let item = cart.find(p => p.name === name);

  if(item){
    item.qty++;
  }else{
    cart.push({name, price, qty:1});
  }

  updateCart();
  openCart();

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

  let total = 0;
  cartItems.innerHTML = "";

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

        <button onclick="removeItem(${index})">🗑️</button>

      </div>
    `;
  });

  totalBox.innerText = total;
}

// ================= QUANTITY =================
function minusQty(i){
  if(cart[i].qty > 1){
    cart[i].qty--;
  }else{
    cart.splice(i,1);
  }
  updateCart();
}

function plusQty(i){
  cart[i].qty++;
  updateCart();
}

function removeItem(i){
  cart.splice(i,1);
  updateCart();
}


let selectedProduct = null;

// فتح الاختيار
function chooseSpice(name, price){
  selectedProduct = {name, price};
  document.getElementById("spiceModal").style.display = "flex";
}

// إغلاق
function closeModal(){
  document.getElementById("spiceModal").style.display = "none";
}

// تأكيد الإضافة
function confirmAdd(type){

  let finalName = selectedProduct.name + " (" + type + ")";

  addToCart(finalName, selectedProduct.price);

  closeModal();
}

const products = {

  // 🍗 استربس و فراخ
  strips: [
    {name:"استربس ولعتين بارد", price:270,img:"ولعتين1.jpeg"},
    {name:"استربس ولعتين حار", price:270,img:"ولعتين1.jpeg"},
    {name:"استربس سوجود", price:215,img:"sogoood.jpeg"},
    {name:"استربس بريكه بارد", price:220,img:"brika.jpeg"},
    {name:"استربس بريكه حار", price:220,img:"brika.jpeg"},
    {name:"استربس الحريف", price:210,img:"الحريف.jpeg"},
    {name:"استربس سايب", price:230,img:"استربس.jpeg"},
    {name:"استربس اطياب", price:190,img:"اطياب.jpeg"},
    {name:"فيليه ولعتين", price:285,img:"فيليه.jpg"},
    {name:"شيش طاوق ولعتين", price:275,img:"شيش.jpg"},
    {name:"بانيه ولعتين", price:280,img:"بانيه--ولعتين.jpeg"},
    {name:"مسحب ولعتين", price:320,img:"مسحب.jpg"},
    {name:"سكالوب بانيه ولعتين", price:290,img:"سكالوب.jpeg"}
  ],

  // 🍔 برجر
  burger: [
    {name:"برجر فراخ ولعتين", price:280,img:"برجر-فراخ.jpg"},
    {name:"برجر ساده جاست", price:225,img:"just.jpeg"},
    {name:"برجر جبنه", price:245,img:"just1.jpeg"},
    {name:"برجر ميتكو جامبو", price:320,img:"ميتكو.jpeg"},
    {name:"برجر ميتكو ميني", price:220,img:"ميتكو.jpeg"}
  ],

  // 🥩 كفتة
  kofta: [
    {name:"كفته فراخ نوريانو", price:200,img:"نوريانو فراخ.jpeg"},
    {name:"كفته مشويه نوريانو", price:200,img:"نوريانو.jpeg"},
    {name:"كفته جاسيت", price:225,img:"كفته-جاست.jpeg"}
  ],

  // 🍟 بطاطس
  fries: [
    {name:"بطاطس كرينكل", price:155,img:""},
    {name:"بطاطس الوميت", price:155,img:""},
    {name:"بطاطس بوم فريت", price:155,img:""},
    {name:"بطاطس فريسكس", price:120,img:""}
  ],

  // 🍤 جمبري
  seafood: [
    {name:"جمبري ولعتين", price:700},
    {name:"جمبري وزن", price:700,img:""}
  ],

  // 🥖 مخبوزات و عيش
  bakery: [
    {name:"عيش ماك", price:55,img:""},
    {name:"عيش كريب", price:25,img:""},
    {name:"عيش سوري", price:25,img:""},
    {name:"توست رده", price:60,img:""},
    {name:"توست بدون سكر", price:62,img:""},
    {name:"توست شوفان", price:70,img:""},
    {name:"توست عادي", price:55,img:""},
    {name:"توست حليب", price:60,img:""}
  ],

  // 🧀 أجبان و إضافات
  cheese: [
    {name:"موزريلا الحريف كيلو", price:185},
    {name:"موزريلا الحريف نص", price:85},
    {name:"موزريلا الاطباء نص", price:90,img:"اطياب.jpeg"},
    {name:"شرايح شيدر", price:15}
  ],

  // 🥫 صوصات
  sauces: [
    {name:"صوص شيدر غازي", price:65},
    {name:"صوص تكساس ايلو كبير", price:80},
    {name:"صوص تكساس ايلو صغير", price:55},
    {name:"صوص توميه", price:50},
    {name:"صوص رانش", price:55},
    {name:"صوص باربكيو", price:45},
    {name:"كاتشب كبير", price:45},
    {name:"كاتشب صغير", price:30},
    {name:"مايونيز ايلو", price:55},
    {name:"كاتشب ولعتين كيلو", price:70},
    {name:"باربكيو ولعتين كيلو", price:80},
    {name:"باتر رانش ميلك", price:65},
    {name:"الف جزيره", price:50},
    {name:"سويت تشيلي", price:50},
    {name:"هوت صوص ولعتين", price:40}
  ],

  // 🛒 ماركت و بقالة
  grocery: [
    {name:"رز بسمتي", price:100},
    {name:"زيتون", price:300},
    {name:"خل كبير", price:20},
    {name:"خل صغير", price:10},
    {name:"عرض عسل", price:90},
    {name:"زعتر سوري", price:40},
    {name:"مكرونه بنا", price:15},
    {name:"مكرونه تمن", price:15},
    {name:"مكرونه سباجتي", price:15},
    {name:"لسان العصفور", price:15},
    {name:"شعريه", price:15}
  ],

  // 🥗 إضافات و متنوع
  extras: [
    {name:"ورق عنب", price:45},
    {name:"مشروم", price:50},
    {name:"ميكس الحمد", price:70},
    {name:"ميكس الاطباء", price:90},
    {name:"ممبار", price:180},
    {name:"صلصله بيتزا", price:45},
    {name:"قواعد بيتزا", price:50},
    {name:"صلصه بست", price:30},
    {name:"دقيق حبه كامله", price:60},
    {name:"دقيق اسمر", price:60},
    {name:"دقيق شوفان", price:95},
    {name:"دقيق شعير", price:65},
    {name:"دقيق ذره اصفر", price:60},
    {name:"سبريد بلبن نص", price:140},
    {name:"سبريد بلبن كيلو", price:240},
    {name:"سبريد دريم كيلو", price:300},
    {name:"سبريد دريم ميني", price:105},
    {name:"ماكستيلا كيلو", price:140},
    {name:"تورتيلا جامبو", price:55},
    {name:"دبس رمان", price:45},
    {name:"صويا صوص", price:45},
    {name:"كبيبه سوري", price:100},
    {name:"تمر كاجو", price:155},
    {name:"تمر لوز", price:145},
    {name:"تكساس ولعتين كيلو", price:130},
    {name:"هالبينو", price:80},
    {name:"كاندي اسباني", price:320},
    {name:"كاندي تركي", price:300}
  ]

};

function showCategory(cat, el){

  const container = document.getElementById("productsContainer");
  const title = document.getElementById("sectionTitle");

  // تغيير العنوان
  title.innerText = el.querySelector("span").innerText;

  // تغيير active
  document.querySelectorAll(".cat").forEach(c=>{
    c.classList.remove("active");
  });
  el.classList.add("active");

  // أنيميشن خفيف
  container.style.opacity = "0";

  setTimeout(()=>{

    container.innerHTML = "";

    products[cat].forEach(p=>{
      container.innerHTML += `
        <div class="product-card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>${p.price} جنيه</p>
          <button onclick="addToCart('${p.name}',${p.price})">إضافة</button>
        </div>
      `;
    });

    container.style.opacity = "1";

  },200);
}

// أول تحميل
showCategory("strips", document.querySelector(".cat"));

