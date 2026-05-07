// 1. tavar kazinkasi
let cart = JSON.parse(localStorage.getItem('myCart')) || [];
const container = document.getElementById("best-products");
const searchInput = document.querySelector(".search-input input");

// localStorage ga saqlangan ma'lumotlarni yangilash
updateCartUI();

// 2. function sort products
function renderProducts(products) {
  container.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'items';
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="card-content">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <div class="rating">
          <span>★ ${product.rating}</span>
        </div>
        <span class='description'>${product.description.slice(0, 50)}...</span>
        <button class="buy-btn">Buy Now</button>
      </div>`;

    card.querySelector('.buy-btn').onclick = () => addToCart(product);
    container.appendChild(card);
  });
}

// 3. boshidagi 30 tavar olib kelish
async function getProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    renderProducts(data.products.slice(0, 30));
  } catch (err) { console.error("Xatolik yuz berdi:", err); }
}
getProducts();

// 4. qidiruv funksiyasi
async function searchProduct() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return alert("Iltimos, nom kiriting!");

  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
    const data = await res.json();
    if (data.products.length > 0) {
      renderProducts(data.products);
    } else {
      alert("Hech narsa topilmadi!");
    }
  } catch (err) { console.error("Xatolik yuz berdi:", err); }
}

// 5. karzinka ishlashi 
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.thumbnail,
      quantity: 1
    });
  }
  syncCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  syncCart();
}

function syncCart() {
  localStorage.setItem('myCart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  const list = document.getElementById('cart-items-list');
  const totalLabel = document.getElementById('total-price-sum');
  
  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" width="40">
      <span>${item.title} (x${item.quantity})</span>
      <span>$${item.price * item.quantity}</span>
      <button onclick="removeItem(${item.id})">❌</button>
    </div>`).join("");

  totalLabel.innerText = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// 6. qidiruv uchun enter bosish va tugma bosish
searchInput.addEventListener("keypress", (e) => { if (e.key === "Enter") searchProduct(); });
document.querySelector(".search-input button").onclick = searchProduct;

// 7. modalni ochish va yopish
const modal = document.getElementById('cart-modal');
document.getElementById('open-cart-btn').onclick = () => modal.style.display = 'block';
document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
document.getElementById('clear-cart').onclick = () => { cart = []; syncCart(); };

// 8. kategoriyalar bo'yicha filter
async function filterByCategory(category) {
  try {
    let url;
    if (category === 'all') {
      url = "https://dummyjson.com/products?limit=30";
    } else {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    
    if (data.products.length > 0) {
      renderProducts(data.products);
    } else {
      container.innerHTML = "<h3>bu kategoriyada hali mahsulotlar yo'q</h3>";
    }
  } catch (err) {
    console.error("Xatolik yuz berdi:", err);
  }
}

// topish uchun dropdown menyu elementlariga event listener qo'shish
const categoryLinks = document.querySelectorAll('.dropdown-menu a');

categoryLinks.forEach(link => {
  link.onclick = (e) => {
    e.preventDefault(); // Saytni yangilanishini oldini olish
    
    const category = link.getAttribute('data-category');
    
    // Tanlangan kategoriyaga mos mahsulotlarni filterlash
    filterByCategory(category);
    
    // Dropdown menyusini yopish va tanlangan kategoriyani ko'rsatish
    const toggleSpan = document.querySelector('.dropdown-toggle span');
    if (toggleSpan) toggleSpan.innerText = link.innerText;
  };
});