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
      <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
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
const modal1 = document.getElementById('cart-modal');
document.getElementById('open-cart-btn').onclick = () => modal1.style.display = 'block';
document.querySelector('.close-btn').onclick = () => modal1.style.display = 'none';
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

// tovar rasmiga bosganda modalda kattaroq ko'rsatish
const modal = document.createElement('div');
modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.9);
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const modalImg = document.createElement('img');
modalImg.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 10px;';
modal.appendChild(modalImg);
document.body.appendChild(modal);

//  Rasmga bosganda modalni ochish
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-img')) {
        modalImg.src = e.target.src; // Modalga rasm manzilini o'rnatish
        modal.style.display = 'flex'; // Modalni ko'rsatish
    }
});

// Modalga bosganda uni yopish
modal.onclick = () => modal.style.display = 'none';

// let movies = []; // apidan kelgan ma'lumotlarni saqlash uchun global o'zgaruvchi

// // 1. API dan ma'lumotlarni olish va dastlabki render qilish
// async function getMovies() {
//     const response = await fetch('https://dummyjson.com/products');
//     movies = await response.json();
//     renderMovies(movies); // dastlabki render qilish
// }

// // 2. ma'lumotlarni render qilish funksiyasi
// function renderMovies(data) {
//     const container = document.querySelector('.products-container'); // ma'lumotlarni joylashtirish uchun konteyner
//     container.innerHTML = ''; // avvalgi ma'lumotlarni tozalash
    
//     data.forEach(item => {
//         container.innerHTML += `
//             <div class="card">
//                 <img src="${item.poster}" alt="">
//                 <h3>${item.title}</h3>
//                 <p>Rating: ${item.rating}</p>
//             </div>
//         `;
//     });
// }

// // 3. API dan ma'lumotlarni olish
// document.getElementById('sort').addEventListener('change', (e) => {
//     const value = e.target.value;
//     let sorted = [...movies]; // ma'lumotlarni nusxalash

//     if (value === 'popularity') {
//         sorted.sort((a, b) => b.popularity - a.popularity);
//     } else if (value === 'price-low') {
//         sorted.sort((a, b) => a.price - b.price);
//     }
//     // ... boshqa sortlash shartlari

//     renderMovies(sorted); // saralangan ma'lumotlarni render qilish
// }); // hato ishlepti beta 