let allProducts = [];
let cart = [];
let currentView = 'grid';
let currentSort = 'default';

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('productsGrid');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const resultCount = document.getElementById('resultCount');
const categoryTitle = document.getElementById('categoryTitle');
const breadcrumb = document.getElementById('breadcrumb');
const breadCat = document.getElementById('breadCat');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const deptBtn = document.getElementById('deptBtn');
const deptDropdown = document.getElementById('deptDropdown');
const deptChevron = document.getElementById('deptChevron');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const themeBtn = document.getElementById('themeBtn');

// ===== FETCH PRODUCTS =====
async function fetchProducts(searchTerm = '') {
  showLoading(true);
  try {
    let url;
    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=30`;
    } else {
      url = `https://dummyjson.com/products?limit=30`;
    }
    const res = await fetch(url);
    const data = await res.json();
    allProducts = data.products || [];
    renderProducts(sortProducts(allProducts));
    updateHeader(searchTerm || 'All Products', allProducts.length);
  } catch (err) {
    console.error('Error fetching products:', err);
    allProducts = [];
    renderProducts([]);
    updateHeader(searchTerm || 'All Products', 0);
  }
  showLoading(false);
}

function sortProducts(products) {
  const arr = [...products];
  switch (currentSort) {
    case 'price-low':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-high':
      return arr.sort((a, b) => b.price - a.price);
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating);
    case 'popularity':
      return arr.sort((a, b) => (b.stock || 0) - (a.stock || 0));
    case 'latest':
      return arr.sort((a, b) => b.id - a.id);
    default:
      return arr;
  }
}

function updateHeader(term, count) {
  const title = term.charAt(0).toUpperCase() + term.slice(1);
  categoryTitle.textContent = `Category: ${title}`;
  breadCat.textContent = title;
  breadcrumb.style.display = 'block';
  resultCount.textContent = `Showing All ${count} Results`;
}

function renderProducts(products) {
  productsGrid.innerHTML = '';

  if (!products || products.length === 0) {
    noResults.style.display = 'flex';
    noResults.style.flexDirection = 'column';
    noResults.style.alignItems = 'center';
    return;
  }

  noResults.style.display = 'none';

  products.forEach((product, index) => {
    const card = createProductCard(product, index);
    productsGrid.appendChild(card);
  });
}

function createProductCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 0.04}s`;

  const discountedPrice = product.price;
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const hasDiscount = product.discountPercentage && product.discountPercentage > 5;
  const stars = '★'.repeat(Math.round(product.rating || 4));

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
        <span class="price-current">$${discountedPrice.toFixed(2)}</span>
      </div>
      <div class="product-rating">
        ${stars} <span>(${product.rating || '4.0'})</span>
      </div>
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

function showLoading(show) {
  loading.style.display = show ? 'flex' : 'none';
  productsGrid.style.display = show ? 'none' : 'grid';
  if (show) noResults.style.display = 'none';
}

// ===== CART =====
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  cartCount.textContent = totalQty;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>
    `;
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

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
}

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
  const term = searchInput.value.trim() || 'vegetable';
  fetchProducts(term);
}

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});

// ===== NAV ORGANIC LINK =====
document.getElementById('nav-organic').addEventListener('click', (e) => {
  e.preventDefault();
  searchInput.value = 'vegetables';
  fetchProducts('vegetables');
});

// ===== SORT =====
sortSelect.addEventListener('change', () => {
  currentSort = sortSelect.value;
  renderProducts(sortProducts(allProducts));
  resultCount.textContent = `Showing All ${allProducts.length} Results`;
});

gridViewBtn.addEventListener('click', () => {
  currentView = 'grid';
  productsGrid.classList.remove('list-view');
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
  currentView = 'list';
  productsGrid.classList.add('list-view');
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
});

// ===== THEME TOGGLE =====
themeBtn.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? '' : 'dark');
  themeBtn.innerHTML = isDark
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
});

// ===== CART OPEN/CLOSE =====
document.querySelector('.cart-btn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

deptBtn.addEventListener('click', toggleDept);

updateCartUI();
fetchProducts();