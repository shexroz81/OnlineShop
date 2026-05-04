// Products
async function getProducts() {
  try {
    const searchbox = document.getElementById("best-products");
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    data.products.slice(0, 30).forEach((product) => {
      searchbox.innerHTML += `
        <div class="items">
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="card-content">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <div class="rating">
              <span class="stars">(${product.rating})</span>
              <span class="number">${product.rating}</span>
            </div>
            <span>${product.description}</span>
            <button class="buy-btn">Buy Now</button>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Products olishda xatolik:", error);
  }
}

getProducts();

// Search functionality
const searchInput = document.querySelector(".search-input input");

async function searchProduct() {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    return alert("Iltimos, qidiruv maydonini to'ldiring!");
  } else if (searchTerm.length < 3) {
    return alert("Iltimos, kamida 3 ta harf kiriting!");
  }

  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerm}`,
    );
    const data = await response.json();

    if (data.products.length > 0) {
      const product = data.products[0];
      const searchbox = document.getElementById("searchbox");

      // Yangi items qo'shish
      searchbox.innerHTML += `
        <div class="items">
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="card-content">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <div class="rating">
              <span class="stars">(${product.rating})</span>
              <span class="number">${product.rating}</span>
            </div>
            <span>${product.description}</span>
            <button class="buy-btn">Buy Now</button>
          </div>
        </div>
      `;

      // Items soni 4 taga yetganda wrap qilish
      if (searchbox.children.length >= 4) {
        searchbox.style.flexWrap = "wrap";
        document.querySelectorAll(".items").forEach((item) => {
          item.style.flex = "none";
        });
      }
    } else {
      return alert("Izlash natijalari chiqmadi!");
    }
  } catch (error) {
    console.error("Search error:", error);
  }
}

// Event listeners
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchProduct();
  }
});

// Search button click
const searchBtn = document.querySelector(".search-input button");
searchBtn.addEventListener("click", searchProduct);
