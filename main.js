window.addEventListener("load", function(){

  setTimeout(()=>{
    const loader = document.getElementById("loadingScreen");
    loader.style.opacity = "0";
    loader.style.transition = "0.5s";

    setTimeout(()=>{
      loader.style.display = "none";
    },500);

  },2000); // مدة ظهور اللودينج
});


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

// ================= CART OPEN / CLOSE =================
function openCart(){
  document.getElementById("cartSheet").classList.add("active");
  document.getElementById("cartOverlay").style.display = "block";
}

function closeCart(){
  document.getElementById("cartSheet").classList.remove("active");
  document.getElementById("cartOverlay").style.display = "none";
}


// ================= ADD TO CART =================
function addToCart(name, price){

  let item = cart.find(i => i.name === name);

  if(item){
    item.qty++;
  }else{
    cart.push({name, price, qty:1});
  }

  updateCart();

  showToast("🛒 تم إضافة " + name + " إلى السلة");

  // 🔊 تشغيل الصوت
  const sound = document.getElementById("addSound");
  if(sound){
    sound.currentTime = 0; // يعيد الصوت من البداية
    sound.play().catch(()=>{});
  }

  // 🎯 أنيميشن السلة
  const navCart = document.querySelector(".nav-cart");
  if(navCart){
    navCart.classList.add("pop");
    setTimeout(()=>{
      navCart.classList.remove("pop");
    },300);
  }
}

// ================= UPDATE CART =================
function updateCart(){

  const container = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");
  const countBox = document.getElementById("cartCount");

  container.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index)=>{

    total += item.price * item.qty;
    count += item.qty;

    container.innerHTML += `
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

        <button onclick="removeItem(${index})">🗑</button>
      </div>
    `;
  });

  totalBox.innerText = total;
  countBox.innerText = count;
}

// ================= MINUS =================
function minusQty(i){
  if(cart[i].qty > 1){
    cart[i].qty--;
  }else{
    cart.splice(i,1);
  }
  updateCart();
}

// ================= PLUS =================
function plusQty(i){
  cart[i].qty++;
  updateCart();
}

// ================= REMOVE =================
function removeItem(i){
  cart.splice(i,1);
  updateCart();
}

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

// ================= CHECKOUT FORM =================
function openForm(){

  if(cart.length === 0){
    alert("🛒 السلة فاضية");
    return;
  }

  document.getElementById("checkoutForm").style.display = "flex";
}

function closeForm(){
  document.getElementById("checkoutForm").style.display = "none";
}

// ================= SEND TO WHATSAPP =================
function sendToWhatsApp(){

  let name = document.getElementById("custName").value;
  let phone = document.getElementById("custPhone").value;
  let address = document.getElementById("custAddress").value;

  if(!name || !phone || !address){
    alert("❌ املأ البيانات");
    return;
  }

  let total = 0;

  let itemsText = cart.map(i=>{
    total += i.price * i.qty;
    return `• ${i.name} x${i.qty} = ${i.price * i.qty}`;
  }).join("\n");

  let message = `
🛒 طلب جديد

👤 الاسم: ${name}
📞 الهاتف: ${phone}
📍 العنوان: ${address}

${itemsText}

💰 الإجمالي: ${total} جنيه
`;

  let whatsappNumber = "201055790060"; // غير الرقم ده لرقمك

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  // تنظيف
  cart = [];
  updateCart();
  closeForm();
  closeCart();

  document.getElementById("custName").value = "";
  document.getElementById("custPhone").value = "";
  document.getElementById("custAddress").value = "";
}


const products = {

diet: [
  {name:"بذور شيا", price:130, img:"بذور-شيا.jpg"},
  {name:"صوص شوكولاتة زيرو", price:195, img:"شيكولاته-زيرو.jpg"},
  {name:"صوص كراميل زيرو", price:195, img:"كراميل-زيرو.jpg"},
  {name:"صوص فراولة زيرو", price:160, img:"فراوله-زيرو.jpg"},
  {name:"توست رايز ميني", price:25, img:"رايز.jpeg"},
  {name:"سناكس لايت شيبسي", price:25, img:"شيبسي.jpg"},
  {name:"خل تفاح", price:240, img:"خل.jpg"},
  {name:"شاي أخضر", price:265, img:"شاي.jpg"},
  {name:"بيوريه ميكس توت", price:155, img:"بيوريه-توت.jpg"},
  {name:"بيوريه فراولة", price:125, img:"بيوريه-فراوله.jpg"},
  {name:"سبريد زيرو وايت", price:170, img:"زيرو-وايت.jpg"},
  {name:"سبريد لوتس دايت", price:170, img:"لوتس.jpg"},
  {name:"شاي بقدونس وكرفس", price:120, img:"شانه.jpg"},
  {name:"زيرو هيلثي سبريد بروتين", price:170, img:"زيرو-هيلثي.jpg"},
  {name:"زيرو هيلثي سبريد سوبريم", price:170, img:"سوبريم.jpg"},
  {name:"جرانولا شوكولاتة صحية", price:160, img:"جرانولا.jpeg"},
  {name:"جرانولا مكسرات", price:365, img:"جرانولا.jpeg"},
  {name:"سبريد بندق كيتو", price:170, img:"كيتو.jpg"},
  {name:"زيست بيبر", price:400, img:"بيبر.jpeg"},
  {name:"سكر ستيفيا", price:210, img:"ستيفا.jpg"},
  {name:"بخاخ طهي بالزبدة", price:210, img:"بخاخ.jpg"},
  {name:"مكرونة دايت", price:70, img:"مكرونه-دايت.jpeg"},
  {name:"زيت زيتون سيوة", price:300, img:"سيوه.png"},
  {name:"بسكوت شوفان", price:70, img:"بسكوت.jpg"}
],

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
    {name:"مسحب ولعتين", price:330,img:"مسحب.jpg"},
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
    {name:"بطاطس كرينكل", price:155,img:"كرينكل.jpg"},
    {name:"بطاطس الوميت", price:155,img:"الوميت.jpg"},
    {name:"بطاطس بوم فريت", price:155,img:"بومفريت.jpg"},
     {name:"بطاطس فريسكس", price:120,img:".jpg"},
  ],

  // 🍤 جمبري
  seafood: [
    {name:"جمبري ولعتين", price:700,img:"جمبريكرسبي.jpeg"},
    {name:"جمبري وزن", price:700,img:"جمبري.jpg"}
  ],

  // 🥖 مخبوزات و عيش
  bakery: [
    {name:"عيش ماك", price:55,img:"عيش-ماك.jpg"},
    {name:"عيش كريب", price:25,img:"كريب.jpeg"},
    {name:"عيش سوري", price:25,img:"سوري.jpg"},
    {name:"توست رده", price:60,img:"رده.jpg"},
    {name:"توست بدون سكر", price:62,img:"توست1.jpg"},
    {name:"توست شوفان", price:70,img:"توست-شوفان.png"},
    {name:"توست عادي", price:60,img:"توست.jpg"},
    {name:"تورتيلا جامبو", price:55,img:"تورتيلا جامبو.jpg"},
    {name:"توست حليب", price:60,img:"توست-حليب.jpg"}
  ],

  // 🧀 أجبان و إضافات
  cheese: [
    {name:"موزريلا الحريف كيلو", price:185,img:"موزريلا-الحريف.jpg"},
    {name:"موزريلا الحريف نص", price:85,img:"موزريلا-الحريف.jpg"},
    {name:"موزريلا الاطباء نص", price:90,img:"الاطباء.jpg"},
    {name:"شرايح شيدر", price:15,img:"شيدر.jpg"},
        {name:"ميكس الحمد", price:70,img:"ميكس-الحمد.jpg"},
  ],

  // 🥫 صوصات
  sauces: [
    {name:"صوص شيدر غازي", price:65,img:"شيدر-صوص.jpg"},
    {name:"صوص تكساس ايلو كبير", price:80,img:"تكساس-كبير.jpg"},
    {name:"صوص تكساس ايلو صغير", price:55,img:"تكساس-صغير.jpg"},
    {name:"صوص توميه", price:50,img:"نوميه.jpg"},
    {name:"صوص رانش", price:55,img:"رانش.jpg"},
    {name:"صوص باربكيو", price:45,img:"باربيكيو.jpg"},
    {name:"كاتشب كبير", price:45,img:"كاتشب-كبير.jpg"},
    {name:"كاتشب صغير", price:30,img:"كاتشب-صغير.jpg"},
    {name:"مايونيز ايلو", price:55,img:"مايونيز.jpg"},
    {name:"كاتشب ولعتين كيلو", price:70,img:"كاتشب-ولعتين.jpg"},
    {name:"باربكيو ولعتين كيلو", price:80,img:"باربيكيو-ولعتين.jpg"},
    {name:"باتر رانش ميلك", price:65,img:"بتر.jpg"},
    {name:"الف جزيره", price:50,img:"الف.jpg"},
    {name:"سويت تشيلي", price:50,img:"سويت.jpg"},
    {name:"تكساس ولعتين كيلو", price:130,img:"تكساس-ولعتين.jpg"},
    {name:"هوت صوص ولعتين", price:40,img:"هوت.jpg"}
  ],

  diet: [
  {name:"بذور شيا", price:130, img:"بذور-شيا.jpg"},
  {name:"صوص شوكولاتة زيرو", price:195, img:"شيكولاته-زيرو.jpg"},
  {name:"صوص كراميل زيرو", price:195, img:"كراميل-زيرو.jpg"},
  {name:"صوص فراولة زيرو", price:160, img:"فراوله-زيرو.jpg"},
  {name:"توست رايز ميني", price:25, img:"رايز.jpeg"},
  {name:"سناكس لايت شيبسي", price:25, img:"شيبسي.jpg"},
  {name:"خل تفاح", price:240, img:"خل.jpg"},
  {name:"شاي أخضر", price:265, img:"شاي.jpg"},
  {name:"بيوريه ميكس توت", price:155, img:"بيوريه-توت.jpg"},
  {name:"بيوريه فراولة", price:125, img:"بيوريه-فراوله.jpg"},
  {name:"سبريد زيرو وايت", price:170, img:"زيرو-وايت.jpg"},
  {name:"سبريد لوتس دايت", price:170, img:"لوتس.jpg"},
  {name:"شاي بقدونس وكرفس", price:120, img:"شانه.jpg"},
  {name:"زيرو هيلثي سبريد بروتين", price:170, img:"زيرو-هيلثي.jpg"},
  {name:"زيرو هيلثي سبريد سوبريم", price:170, img:"سوبريم.jpg"},
  {name:"جرانولا شوكولاتة صحية", price:160, img:"جرانولا.jpeg"},
  {name:"جرانولا مكسرات", price:365, img:"جرانولا.jpeg"},
  {name:"سبريد بندق كيتو", price:170, img:"كيتو.jpg"},
  {name:"زيست بيبر", price:400, img:"بيبر.jpeg"},
  {name:"سكر ستيفيا", price:210, img:"ستيفا.jpg"},
  {name:"بخاخ طهي بالزبدة", price:210, img:"بخاخ.jpg"},
  {name:"مكرونة دايت", price:70, img:"مكرونه-دايت.jpeg"},
  {name:"زيت زيتون سيوة", price:300, img:"سيوه.png"},
  {name:"بسكوت شوفان", price:70, img:"بسكوت.jpg"}
],

  // 🛒 ماركت و بقالة
  grocery: [
    {name:"رز بسمتي", price:100,img:"رز-بسمتي.jpg"},
    {name:"زيتون", price:300,img:"زيتون.jpg"},,
    {name:"عرض عسل", price:90,img:"عسل-اسود.jpg"},
    {name:"زعتر سوري", price:40,img:"زعتر.jpg"},
    {name:"مكرونه بنا", price:15,img:"بيا.jpg"},
    {name:"مكرونه سباجتي", price:15,img:"اسباجتي.jpg"},
    {name:"لسان العصفور", price:15,img:"لسانعصفور.jpg"},
    {name:"شعريه", price:15,img:"شعريه.jpg"},
        {name:"صلصله بيتزا", price:45,img:"صلصه.jpg"},
    {name:"صلصه بست", price:30,img:"بست.jpg"},
  ],

  // 🥗 إضافات و متنوع
  extras: [
    {name:"سبريد بلبن نص", price:140,img:"سبريد-نص.jpg"},
    {name:"سبريد بلبن كيلو", price:240,img:"سبريد-نص.jpg"},
    {name:"سبريد دريم كيلو", price:300,img:"s-d.jpg"},
    {name:"سبريد دريم ميني", price:105,img:"sm.jpg"},
    {name:"ماكستيلا كيلو", price:140,img:"max.jpg"},
    {name:"تمر كاجو", price:155,img:"تمركاجو.jpg"},
    {name:"تمر لوز", price:145,img:"تمرباللوز.jpg"},
    {name:"كاندي اسباني", price:320,img:"كاندي-اس.jpg"},
    {name:"كاندي تركي", price:300,img:"كاندي-تركي.jpg"}
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

function showToast(message){

  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },2000);
}