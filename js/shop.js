window.addEventListener('DOMContentLoaded', () => {
  const proudctSearch = document.getElementById('product-search')

  const cats = [
    { n: 'Best Deals', h: '../pages/BestDeals.html' },
    { n: 'Bread', h: '#' },
    { n: 'Deals', h: '#' },
    { n: 'Juices', h: '#' },
    { n: 'Organic', h: '#' },
    { n: 'Organic Vegetables & Fruits', h: '../pages/Organic.html' },
  ]

  proudctSearch.innerHTML = `
    <div class="search-part">
      <div class="category">
        <div class="toggle-cat">
          <span class="cat-icon"><i class="fa-solid fa-bars-staggered"></i></span>
          <span class="toggle-title">All Departments</span>
          <span class="toggle-icon">
            <i class="fa-solid fa-angle-up"></i>
            <i class="fa-solid fa-angle-down"></i>
          </span>
        </div>
        <ul class="categories" style="visibility: hidden;">
          ${cats.map((c) => `<li class="cat-item"><a href="${c.h}">${c.n}</a></li>`).join('')}
        </ul>
      </div>

      <div class="search">
        <input type="text" placeholder="Search">
        <button><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
    <div class="sort-part"></div>`



  const link = 'https://dummyjson.com/products'

  fetch(link, {
    method: 'GET',
    headers: { 'Content-type': 'Application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      data.products.forEach((datas) => {
        if (datas.category == 'groceries') {
          console.log(datas)
          const products = document.getElementById('products')
          const div = document.createElement('div')
          div.classList.add('product')
          div.innerHTML += `
          <div class="p-image">
            <img src="${datas.thumbnail}" alt="${datas.title}">
            <div class="icons">
              <i class="fa-brands fa-sistrix"></i>
              <i class="fa-regular fa-heart"></i>
              <i class="fa-solid fa-retweet"></i>
            </div>
          </div>
          <div class="p-info">
            <h2>${datas.title}</h2>
            <bdi>$${datas.price}</bdi>
          </div>
        `
          products.appendChild(div)
        }
      })
    })
})

