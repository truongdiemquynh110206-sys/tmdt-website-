const products = [

  {
    id: 1,
    name: "Bộ cốc Gió",
    desc: "Set 2 cốc · Gốm Bát Tràng",
    price: 289000,
    type: "cup",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg/1280px-Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg"
  },

  {
    id: 2,
    name: "Đĩa Mộc",
    desc: "Đĩa gốm thủ công · Men tự nhiên",
    price: 179000,
    type: "plate",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_01.jpg/1280px-Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_01.jpg"
  },

  {
    id: 3,
    name: "Bình An",
    desc: "Bình trang trí · Gốm Bát Tràng",
    price: 459000,
    type: "gift",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Bat_Trang_pottery_and_ceramics_village_in_2016_03.jpg/1280px-Bat_Trang_pottery_and_ceramics_village_in_2016_03.jpg"
  },

  {
    id: 4,
    name: "Bộ quà Việt",
    desc: "Cốc + đĩa + hộp quà",
    price: 599000,
    type: "gift",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bat_Trang_pottery_and_ceramics_village_in_2016_14.jpg/1280px-Bat_Trang_pottery_and_ceramics_village_in_2016_14.jpg"
  },

  {
    id: 5,
    name: "Cốc Đất",
    desc: "Set 2 cốc · Men nâu",
    price: 249000,
    type: "cup",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_01.jpg/1280px-Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_01.jpg"
  },

  {
    id: 6,
    name: "Bát Cơm Nhà",
    desc: "Set 4 bát · Men gốm",
    price: 329000,
    type: "plate",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg/1280px-Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg"
  },

  {
    id: 7,
    name: "Ly Sen",
    desc: "Set 2 ly · Gốm thủ công",
    price: 269000,
    type: "cup",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bat_Trang_pottery_and_ceramics_village_in_2016_14.jpg/1280px-Bat_Trang_pottery_and_ceramics_village_in_2016_14.jpg"
  },

  {
    id: 8,
    name: "Lọ An Nhiên",
    desc: "Lọ trang trí · Gốm Bát Tràng",
    price: 389000,
    type: "gift",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Bat_Trang_pottery_and_ceramics_village_in_2016_03.jpg/1280px-Bat_Trang_pottery_and_ceramics_village_in_2016_03.jpg"
  }

];


let cart = JSON.parse(
  localStorage.getItem("batvietCart") || "[]"
);


function money(number){
  return number.toLocaleString("vi-VN") + " ₫";
}


/* HIỂN THỊ SẢN PHẨM */

function renderProducts(type = "all"){

  const grid = document.getElementById("productGrid");

  const filteredProducts = products.filter(
    product => type === "all" || product.type === type
  );

  grid.innerHTML = filteredProducts.map(product => `

    <article class="product-card">

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80'"
        >

      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

        <p>${product.desc}</p>

        <span class="price">
          ${money(product.price)}
        </span>

        <button
          class="add"
          onclick="addToCart(${product.id})"
        >
          + Thêm
        </button>

      </div>

    </article>

  `).join("");
}


/* LỌC SẢN PHẨM */

function filterProducts(type, button){

  document
    .querySelectorAll(".filter")
    .forEach(item => item.classList.remove("active"));

  if(button){
    button.classList.add("active");
  }

  renderProducts(type);

  document
    .getElementById("products")
    .scrollIntoView({behavior:"smooth"});
}


/* THÊM GIỎ HÀNG */

function addToCart(id){

  const item = cart.find(
    product => product.id === id
  );

  if(item){

    item.qty++;

  }else{

    cart.push({
      id:id,
      qty:1
    });

  }

  saveCart();

  toast("Đã thêm sản phẩm vào giỏ hàng");
}


/* LƯU GIỎ HÀNG */

function saveCart(){

  localStorage.setItem(
    "batvietCart",
    JSON.stringify(cart)
  );

  updateCount();
  renderCart();
}


/* ĐẾM GIỎ HÀNG */

function updateCount(){

  const count = cart.reduce(
    (total,item) => total + item.qty,
    0
  );

  document.getElementById("cartCount").textContent = count;
}


/* HIỂN THỊ GIỎ HÀNG */

function renderCart(){

  const box = document.getElementById("cartItems");

  if(cart.length === 0){

    box.innerHTML = `
      <div class="empty">
        Giỏ hàng đang trống.<br>
        Hãy chọn một sản phẩm bạn yêu thích.
      </div>
    `;

    document.getElementById("cartTotal").textContent = "0 ₫";

    return;
  }


  let total = 0;


  box.innerHTML = cart.map(item => {

    const product = products.find(
      product => product.id === item.id
    );

    total += product.price * item.qty;


    return `

      <div class="cart-item">

        <div class="mini-img">
          <img
            src="${product.image}"
            alt="${product.name}"
          >
        </div>

        <div>

          <h4>${product.name}</h4>

          <p>${money(product.price)}</p>

          <div class="qty">

            <button
              onclick="changeQty(${product.id},-1)"
            >
              −
            </button>

            <span>${item.qty}</span>

            <button
              onclick="changeQty(${product.id},1)"
            >
              +
            </button>

          </div>

        </div>

        <button
          class="remove"
          onclick="removeItem(${product.id})"
        >
          Xóa
        </button>

      </div>

    `;

  }).join("");


  document.getElementById("cartTotal").textContent =
    money(total);
}


/* TĂNG / GIẢM */

function changeQty(id, change){

  const item = cart.find(
    product => product.id === id
  );

  item.qty += change;


  if(item.qty <= 0){

    cart = cart.filter(
      product => product.id !== id
    );

  }


  saveCart();
}


/* XÓA */

function removeItem(id){

  cart = cart.filter(
    product => product.id !== id
  );

  saveCart();
}


/* MỞ GIỎ HÀNG */

function openCart(){

  document
    .getElementById("cartModal")
    .classList.add("open");

  renderCart();
}


/* ĐÓNG GIỎ HÀNG */

function closeCart(event){

  if(
    !event ||
    event.target.id === "cartModal"
  ){

    document
      .getElementById("cartModal")
      .classList.remove("open");

  }
}


/* ĐẶT HÀNG DEMO */

function checkout(){

  if(cart.length === 0){

    toast("Giỏ hàng đang trống");

    return;
  }


  toast(
    "Đây là website mô phỏng. Chức năng thanh toán sẽ được kết nối sau."
  );
}


/* ĐĂNG KÝ EMAIL */

function subscribe(event){

  event.preventDefault();

  document.getElementById(
    "subscribeMsg"
  ).textContent =
    " Cảm ơn bạn! Đăng ký thành công.";

  event.target.reset();
}


/* THÔNG BÁO */

function toast(message){

  const toastBox =
    document.getElementById("toast");

  toastBox.textContent = message;

  toastBox.classList.add("show");

  setTimeout(
    () => toastBox.classList.remove("show"),
    2200
  );
}


/* MENU MOBILE */

function toggleMenu(){

  const menu =
    document.getElementById("navMenu");

  if(menu.style.display === "flex"){

    menu.style.display = "none";

  }else{

    menu.style.display = "flex";
    menu.style.position = "absolute";
    menu.style.top = "76px";
    menu.style.left = "0";
    menu.style.right = "0";
    menu.style.background = "#fffdf8";
    menu.style.padding = "20px";
    menu.style.flexDirection = "column";

  }
}


/* KHỞI TẠO */

renderProducts();
updateCount();
renderCart();
