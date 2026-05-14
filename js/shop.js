const API = 'https://dummyjson.com/products?limit=28'

let products = []
let filtered = []
let cart = []
let view = 'grid'

fetch(API)
  .then((res) => res.json())
  .then((data) => {
    products = data.products
    filtered = [...products]
    render()
  })

function render() {
  renderProducts()
  updateCount()
  updateCartUI()
}

function renderProducts() {
  const container = document.getElementById('products')
  container.innerHTML = ''
  container.className = view === 'list' ? 'list-view' : ''

  if (filtered.length === 0) {
    container.innerHTML = '<p style="padding:60px;text-align:center;">Mahsulot topilmadi</p>'
    return
  }

  filtered.forEach((item) => {
    const div = document.createElement('div')
    div.className = 'product'

    const original = (item.price / (1 - item.discountPercentage / 100)).toFixed(2)
    const hasDiscount = item.discountPercentage >= 10
    const priceHTML = hasDiscount
      ? `<s style="color:#aaa;font-size:13px;">$${original}</s> $${item.price.toFixed(2)}`
      : `$${item.price.toFixed(2)}`

    div.innerHTML = `
      <div class="p-image">
        ${hasDiscount ? '<span class="sale-badge">Sale!</span>' : ''}
        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
        <div class="p-icons">
          <div class="add-product" title="Add to Cart">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
      <div class="p-info">
        <h1>${item.title}</h1>
        <div class="p-rating">${renderStars(item.rating)} <span>(${item.rating})</span></div>
        <p class="p-desc">${item.description}</p>
        <div class="p-price">${priceHTML}</div>
        <button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
      </div>
    `

    div.querySelector('.add-product').onclick = () => addToCart(item)
    div.querySelector('.add-to-cart-btn').onclick = () => addToCart(item)

    container.appendChild(div)
  })
}

function renderStars(rating) {
  let stars = ''
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars += '<i class="fa-solid fa-star"></i>'
    else if (rating >= i - 0.5) stars += '<i class="fa-solid fa-star-half-stroke"></i>'
    else stars += '<i class="fa-regular fa-star"></i>'
  }
  return stars
}
const searchInput = document.querySelector('.search-input input')
const searchBtn = document.querySelector('.search-input button')

function doSearch() {
  const q = searchInput.value.trim().toLowerCase()
  filtered = !q
    ? [...products]
    : products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
  render()
}

searchBtn.onclick = doSearch
searchInput.onkeydown = (e) => {
  if (e.key === 'Enter') doSearch()
}

let searchTimer
searchInput.oninput = () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(doSearch, 350)
}
document.getElementById('sort-select').onchange = function () {
  switch (this.value) {
    case 'low-high':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'high-low':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'latest':
      filtered.sort((a, b) => b.id - a.id)
      break
    case 'popularity':
      filtered.sort((a, b) => b.stock - a.stock)
      break
    default:
      filtered = products.filter((p) =>
        searchInput.value ? p.title.toLowerCase().includes(searchInput.value.toLowerCase()) : true
      )
  }
  render()
}

document.getElementById('grid-btn').onclick = function () {
  view = 'grid'
  this.classList.add('active')
  document.getElementById('list-btn').classList.remove('active')
  render()
}

document.getElementById('list-btn').onclick = function () {
  view = 'list'
  this.classList.add('active')
  document.getElementById('grid-btn').classList.remove('active')
  render()
}

function addToCart(item) {
  const existing = cart.find((c) => c.id === item.id)
  if (existing) {
    existing.qty++
  } else {
    cart.push({ ...item, qty: 1 })
  }
  openCart()
  updateCartUI()
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id)
  updateCartUI()
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id)
  if (!item) return
  item.qty += delta
  item.qty <= 0 ? removeFromCart(id) : updateCartUI()
}

function updateCartUI() {
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const count = cart.reduce((sum, c) => sum + c.qty, 0)

  const badge = document.getElementById('cart-count')
  if (badge) {
    badge.textContent = count
    badge.style.display = count > 0 ? 'flex' : 'none'
  }

  const totalEl = document.getElementById('cart-total-price')
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`

  const itemsEl = document.getElementById('cart-items')
  if (!itemsEl) return

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty</p>
      </div>
    `
    return
  }

  itemsEl.innerHTML = cart
    .map(
      (c) => `
    <div class="cart-item" data-id="${c.id}">
      <img src="${c.thumbnail}" alt="${c.title}">
      <div class="cart-item-info">
        <p class="cart-item-title">${c.title}</p>
        <p class="cart-item-price">$${(c.price * c.qty).toFixed(2)}</p>
        <div class="cart-item-qty">
          <button onclick="changeQty(${c.id}, -1)"><i class="fa-solid fa-minus"></i></button>
          <span>${c.qty}</span>
          <button onclick="changeQty(${c.id}, 1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `
    )
    .join('')
}

function openCart() {
  const sidebar = document.getElementById('cart-sidebar')
  const overlay = document.getElementById('cart-overlay')
  if (sidebar) sidebar.classList.add('open')
  if (overlay) overlay.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar')
  const overlay = document.getElementById('cart-overlay')
  if (sidebar) sidebar.classList.remove('open')
  if (overlay) overlay.classList.remove('open')
  document.body.style.overflow = ''
}

function updateCount() {
  const el = document.getElementById('results-count')
  if (el) el.textContent = `Showing ${filtered.length} Results`
}

function createCartSidebar() {
  if (document.getElementById('cart-sidebar')) return

  const overlay = document.createElement('div')
  overlay.id = 'cart-overlay'
  overlay.onclick = closeCart

  const sidebar = document.createElement('div')
  sidebar.id = 'cart-sidebar'
  sidebar.innerHTML = `
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <button class="cart-close" id="cart-close"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="cart-items" id="cart-items"></div>
    <div class="cart-footer">
      <div class="cart-total">
        <span>Total:</span>
        <strong id="cart-total-price">$0.00</strong>
      </div>
      <button class="checkout-btn">Checkout</button>
      <button class="continue-btn" onclick="closeCart()">Continue Shopping</button>
    </div>
  `

  document.body.appendChild(overlay)
  document.body.appendChild(sidebar)
  document.getElementById('cart-close').onclick = closeCart
}

const cartBtn = document.getElementById('cart')
if (cartBtn) cartBtn.onclick = openCart


const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
})

document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
  })
})

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open')
  }
})

createCartSidebar()
updateCartUI()
