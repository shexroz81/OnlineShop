const link = 'https://dummyjson.com/products'

fetch(link)
  .then((res) => res.json())
  .then((data) => {
    const products = document.getElementById('products')

    data.products.forEach((item) => {
      const div = document.createElement('div')
      div.classList.add('product')

      div.innerHTML = `
        <div class="p-image">
          <img src="${item.thumbnail}" alt="${item.title}">
          <div class="p-icons">
            <div class="icons">
              <i class="fa-brands fa-sistrix"></i>
              <i class="fa-regular fa-heart"></i>
              <i class="fa-solid fa-retweet"></i>
            </div>
            <div class="add-product">
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
        <div class="p-info">
          <h1>${item.title}</h1>
          <bdi>$${item.price}</bdi>
        </div>
      `

      products.appendChild(div)
    })
  })
  .catch((err) => console.error(err))


const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownToggle.classList.toggle("active");
  dropdownMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownToggle.classList.remove("active");
    dropdownMenu.classList.remove("active");
  }
});
