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
          <h1>${datas.title}</h1>
          <p>${datas.description}</p>
          <h3>$${datas.price}</h3>
        `
        products.appendChild(div)
      }
    })
  })
