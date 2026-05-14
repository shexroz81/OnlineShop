// ===== STATE =====
let allProducts = [];
let cart = [];
let currentView = 'grid';
let currentSort = 'default';

// ===== DOM =====
const productsGrid   = document.getElementById('productsGrid');
const loading        = document.getElementById('loading');
const noResults      = document.getElementById('noResults');
const resultCount    = document.getElementById('resultCount');
const categoryTitle  = document.getElementById('categoryTitle');
const breadcrumb     = document.getElementById('breadcrumb');
const breadCat       = document.getElementById('breadCat');
const searchInput    = document.getElementById('searchInput');
const searchBtn      = document.getElementById('searchBtn');
const sortSelect     = document.getElementById('sortSelect');
const cartCount      = document.getElementById('cartCount');
const cartSidebar    = document.getElementById('cartSidebar');
const cartOverlay    = document.getElementById('cartOverlay');
const cartItemsEl    = document.getElementById('cartItems');
const cartTotal      = document.getElementById('cartTotal');
const deptBtn        = document.getElementById('deptBtn');
const deptDropdown   = document.getElementById('deptDropdown');
const deptChevron    = document.getElementById('deptChevron');
const gridViewBtn    = document.getElementById('gridViewBtn');
const listViewBtn    = document.getElementById('listViewBtn');
const themeBtn       = document.getElementById('themeBtn');
const scrollToTop    = document.getElementById('scrollToTop');

// ===== FETCH =====
async function fetchProducts(searchTerm = '') {
  showLoading(true);
  try {
    const url = searchTerm
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=30`
      : `https://dummyjson.com/products?limit=30`;

    const res  = await fetch(url);
    const data = await res.json();
    allProducts = data.products || [];
    renderProducts(sortProducts(allProducts));
    updateHeader(searchTerm || 'All Products', allProducts.length);
  } catch (err) {
    console.error('Fetch error:', err);
    allProducts = [];
    renderProducts([]);
    updateHeader(searchTerm || 'All Products', 0);
  }
  showLoading(false);
}

// ===== SORT =====
function sortProducts(products) {
  const arr = [...products];
  switch (currentSort) {
    case 'price-low':   return arr.sort((a, b) => a.price - b.price);
    case 'price-high':  return arr.sort((a, b) => b.price - a.price);
    case 'rating':      return arr.sort((a, b) => b.rating - a.rating);
    case 'popularity':  return arr.sort((a, b) => (b.stock || 0) - (a.stock || 0));
    case 'latest':      return arr.sort((a, b) => b.id - a.id);
    default:            return arr;
  }
}

// ===== UPDATE HEADER =====
function updateHeader(term, count) {
  const title = term.charAt(0).toUpperCase() + term.slice(1);
  categoryTitle.textContent = `Category: ${title}`;
  if (breadCat) breadCat.textContent = title;
  if (breadcrumb) breadcrumb.style.display = 'block';
  resultCount.textContent = `Showing All ${count} Results`;
}

// ===== RENDER =====
function renderProducts(products) {
  productsGrid.innerHTML = '';
  if (!products || products.length === 0) {
    noResults.style.display = 'flex';
    return;
  }
  noResults.style.display = 'none';
  products.forEach((product, i) => {
    productsGrid.appendChild(createCard(product, i));
  });
}

// ===== CARD =====
function createCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const hasDiscount = product.discountPercentage && product.discountPercentage > 5;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;
  const stars = '★'.repeat(Math.min(5, Math.round(product.rating || 4)));

  card.innerHTML = `
    ${hasDiscount ? '<span class="sale-badge">Sale!</span>' : ''}
    <div class="product-img-wrap">
      <img src="${product.thumbnail}" alt="${product.title}" loading="lazy"
           onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'"/>
    </div>
    <div class="product-info">
      <div class="product-name">${product.title}</div>
      <div class="product-price">
        ${hasDiscount ? `<span class="price-old">$${originalPrice}</span>` : ''}
        <span class="price-current">$${product.price.toFixed(2)}</span>
      </div>
      <div class="product-rating">${stars} <span>(${product.rating || '4.0'})</span></div>
      <button class="add-to-cart" data-id="${product.id}">
        <i class="fas fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  `;

  card.querySelector('.add-to-cart').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product);
  });

  return card;
}

// ===== LOADING =====
function showLoading(show) {
  loading.style.display        = show ? 'flex' : 'none';
  productsGrid.style.display   = show ? 'none' : 'grid';
  if (show) noResults.style.display = 'none';
}

// ===== CART =====
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const total    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  cartCount.textContent = totalQty;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.thumbnail}" alt="${item.title}"
           onerror="this.src='https://via.placeholder.com/60?text=Img'"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.title}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(Number(btn.dataset.id)));
  });
}

function openCart()  {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
}

// ===== DEPARTMENTS =====
function toggleDept() {
  const isOpen = deptDropdown.classList.toggle('open');
  deptChevron.style.transform = isOpen ? 'rotate(180deg)' : '';
}

document.querySelectorAll('.dept-item').forEach(item => {
  item.addEventListener('click', () => {
    const q = item.dataset.q;
    searchInput.value = q;
    fetchProducts(q);
    deptDropdown.classList.remove('open');
    deptChevron.style.transform = '';
  });
});

document.addEventListener('click', (e) => {
  if (!deptBtn.contains(e.target) && !deptDropdown.contains(e.target)) {
    deptDropdown.classList.remove('open');
    deptChevron.style.transform = '';
  }
});

// ===== SEARCH =====
function doSearch() {
  const term = searchInput.value.trim();
  fetchProducts(term);
}

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// ===== NAV ORGANIC =====
const navOrganic = document.getElementById('nav-organic');
if (navOrganic) {
  navOrganic.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.value = 'vegetables';
    fetchProducts('vegetables');
  });
}

// ===== SORT =====
sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderProducts(sortProducts(allProducts));
  resultCount.textContent = `Showing All ${allProducts.length} Results`;
});

// ===== VIEW TOGGLE =====
gridViewBtn.addEventListener('click', () => {
  currentView = 'grid';
  productsGrid.classList.remove('list-view');
  productsGrid.style.display = 'grid';
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
  currentView = 'list';
  productsGrid.classList.add('list-view');
  productsGrid.style.display = 'grid';
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
});

// ===== THEME =====
const savedTheme = localStorage.getItem('theme') || '';
document.body.setAttribute('data-theme', savedTheme);
themeBtn.innerHTML = savedTheme === 'dark'
  ? '<i class="fas fa-sun"></i>'
  : '<i class="fas fa-moon"></i>';

themeBtn.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const next = isDark ? '' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.innerHTML = next === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// ===== CART EVENTS =====
document.querySelector('.cart-btn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
deptBtn.addEventListener('click', toggleDept);

// ===== SCROLL TO TOP =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollToTop.classList.add('visible');
  else scrollToTop.classList.remove('visible');
});

scrollToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== INIT =====
updateCartUI();
fetchProducts();