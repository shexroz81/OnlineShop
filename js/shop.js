const link = 'https://dummyjson.com/products'

fetch(link, {
  method: 'GET',
  headers: { 'Content-type': 'Application/json' },
})
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((datas) => {
      if (datas) {
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
<<<<<<< HEAD
            <h1>${datas.title}</h1>
=======
            <h2>${datas.title}</h2>
>>>>>>> bf26a32926086a2fd0444aaa1410988de30b190d
            <bdi>$${datas.price}</bdi>
          </div>
        `
        products.appendChild(div)
      }
    })
  })
