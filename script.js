const products=[
{id:1,name:"Bộ cốc Gió",desc:"Set 2 cốc · Gốm Bát Tràng",price:289000,type:"cup",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg/1920px-Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg"},
{id:2,name:"Đĩa Mộc",desc:"Đĩa gốm thủ công · Men tự nhiên",price:179000,type:"plate",image:"https://upload.wikimedia.org/wikipedia/commons/8/80/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_01.jpg"},
{id:3,name:"Bình An",desc:"Bình trang trí · Gốm Bát Tràng",price:459000,type:"gift",image:"https://upload.wikimedia.org/wikipedia/commons/2/2a/Bat_Trang_pottery_and_ceramics_village_in_2016_03.jpg"},
{id:4,name:"Bộ quà Việt",desc:"Quà tặng · Thiết kế thủ công",price:599000,type:"gift",image:"https://upload.wikimedia.org/wikipedia/commons/6/61/Bat_Trang_pottery_and_ceramics_village_in_2016_14.jpg"},
{id:5,name:"Cốc Đất",desc:"Set 2 cốc · Men nâu",price:249000,type:"cup",image:"https://upload.wikimedia.org/wikipedia/commons/8/80/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_01.jpg"},
{id:6,name:"Bát Cơm Nhà",desc:"Set 4 bát · Men gốm",price:329000,type:"plate",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg/1920px-Bat_Trang_pottery_for_sale_in_Au_Co%2C_Tay_Ho_02.jpg"},
{id:7,name:"Ly Sen",desc:"Set 2 ly · Gốm thủ công",price:269000,type:"cup",image:"https://upload.wikimedia.org/wikipedia/commons/6/61/Bat_Trang_pottery_and_ceramics_village_in_2016_14.jpg"},
{id:8,name:"Lọ An Nhiên",desc:"Lọ trang trí · Gốm Bát Tràng",price:389000,type:"gift",image:"https://upload.wikimedia.org/wikipedia/commons/2/2a/Bat_Trang_pottery_and_ceramics_village_in_2016_03.jpg"}
];
let cart=JSON.parse(localStorage.getItem("batvietCart")||"[]");

function money(n){return n.toLocaleString("vi-VN")+" ₫"}
function renderProducts(type="all"){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=products.filter(p=>type==="all"||p.type===type).map(p=>`
 <article class="product-card">
  <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
  <div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><span class="price">${money(p.price)}</span>
  <button class="add" onclick="addToCart(${p.id})">+ Thêm</button></div>
 </article>`).join("");
}
function filterProducts(type,btn){
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
 if(btn) btn.classList.add("active");
 else document.querySelector(".filter").classList.add("active");
 renderProducts(type);
 document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
function addToCart(id){
 const item=cart.find(x=>x.id===id);
 if(item)item.qty++;else cart.push({id,qty:1});
 saveCart();toast("Đã thêm sản phẩm vào giỏ hàng");
}
function saveCart(){localStorage.setItem("batvietCart",JSON.stringify(cart));updateCount();renderCart()}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Giỏ hàng đang trống.<br>Hãy chọn một sản phẩm bạn yêu thích.</div>';document.getElementById("cartTotal").textContent="0 ₫";return}
 let total=0;
 box.innerHTML=cart.map(item=>{
  const p=products.find(x=>x.id===item.id);total+=p.price*item.qty;
  return `<div class="cart-item"><div class="mini-img"></div><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="remove" onclick="removeItem(${p.id})">Xóa</button></div>`
 }).join("");
 document.getElementById("cartTotal").textContent=money(total);
}
function changeQty(id,d){const x=cart.find(i=>i.id===id);x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);saveCart()}
function openCart(){document.getElementById("cartModal").classList.add("open");renderCart()}
function closeCart(e){if(!e||e.target.id==="cartModal")document.getElementById("cartModal").classList.remove("open")}
function checkout(){if(!cart.length){toast("Giỏ hàng đang trống");return}toast("Demo: Chức năng đặt hàng sẽ được kết nối ở bước triển khai thực tế.")}
function subscribe(e){e.preventDefault();document.getElementById("subscribeMsg").textContent=" Cảm ơn bạn! Đăng ký thành công.";e.target.reset()}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function toggleMenu(){const n=document.getElementById("navMenu");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.top="76px";n.style.left="0";n.style.right="0";n.style.background="#fffdf8";n.style.padding="20px";n.style.flexDirection="column"}
renderProducts();updateCount();renderCart();
