const bar = document.querySelector(".bars");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".mobile-close");
const pagesBtn = document.querySelector(".text-one h3");
const categoryBtn = document.getElementById("category-btn");
const categoriesLink = document.getElementById("categories-link");
const mobileLinks = document.getElementById("mobile-links");

// Categories button click
categoryBtn.addEventListener("click", () => {
  categoryBtn.classList.add("mobile-text-active");
  pagesBtn.classList.remove("mobile-text-active");
  categoriesLink.style.display = "flex";
  mobileLinks.style.display = "none";
});

// Pages button click
pagesBtn.addEventListener("click", () => {
  pagesBtn.classList.add("mobile-text-active");
  categoryBtn.classList.remove("mobile-text-active");
  categoriesLink.style.display = "none";
  mobileLinks.style.display = "block";
});

// Open menu
bar.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Simple Auto Carousel
const slides = document.querySelectorAll(".carousel-slide");
let currentSlide = 0;

function showSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[currentSlide].classList.add("active");
  currentSlide = (currentSlide + 1) % slides.length;
}

// Start carousel
showSlide();
setInterval(showSlide, 3000);

// Close menu
closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Dropdown functionality
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
  dropdownToggle.classList.toggle("active");
  dropdownMenu.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownToggle.classList.remove("active");
    dropdownMenu.classList.remove("active");
  }
});

// Dark Mode
const btn = document.getElementById("toggle");

// Sahifa yuklananda localStoragedan o'qi
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// Tugma bosilganda
btn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Products
async function getProducts() {
  try {
    const searchbox = document.getElementById("searchbox");
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    data.products.slice(0, 1).forEach((product) => {
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

// Food-container titles active class funksiyasi
function setupTitles() {
  const titles = document.querySelectorAll(".titles li");

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      // Barcha li lardan active class ni olish
      titles.forEach((t) => t.classList.remove("active"));

      // Bosilgan li ga active class berish
      title.classList.add("active");
    });
  });
}

// Dastlabki setup
setupTitles();

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

async function getFoodProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const foodProducts = data.products.filter((product) => {
      const category = product.category.toLowerCase();
      const title = product.title.toLowerCase();

      const foodKeywords = [
        "food",
        "pizza",
        "burger",
        "pasta",
        "salad",
        "sushi",
        "tacos",
        "steak",
        "cake",
        "bread",
        "cheese",
        "meat",
        "fish",
        "chicken",
        "rice",
        "noodles",
        "sandwich",
        "soup",
        "pie",
        "ice cream",
        "coffee",
        "tea",
        "fruit",
        "vegetable",
        "egg",
        "milk",
      ];

      return foodKeywords.some(
        (keyword) =>
          category.includes(keyword) ||
          title.includes(keyword) ||
          category.includes("groceries") ||
          category.includes("kitchen") ||
          category.includes("dairy"),
      );
    });

    const foodArray = [];
    const foodGrid = document.getElementById("food-grid");

    foodProducts.slice(0, 8).forEach((product) => {
      foodArray.push({
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
      });

      // HTML yaratish
      foodGrid.innerHTML += `
        <div class="food-card">
          <img src="${product.thumbnail}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <span class="price">$${product.price}</span>
          <div class="card-overlay">
            <div class="icon-container">
              <div class="icon-btn heart-btn">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div class="icon-btn cart-btn">
                <i class="fa-solid fa-shopping-cart"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    console.log("8 ta ovqatlar array:", foodArray);
    return foodArray;
  } catch (error) {
    console.error("Ovqatlar olishda xatolik:", error);
    return [];
  }
}

function setupFoodCardIcons() {
  const heartBtns = document.querySelectorAll(".heart-btn");
  const cartBtns = document.querySelectorAll(".cart-btn");
  const addedItem = document.querySelector(".added-item");
  const foodCards = document.querySelectorAll(".food-card");

  heartBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = foodCards[index];
      const title = card.querySelector("h3").textContent;
      const price = card.querySelector(".price").textContent;
      const img = card.querySelector("img").src;

      // Bosilgan card ma'lumotlarini olish
      const cardData = {
        title: title,
        price: price,
        image: img,
        index: index,
      };

      const itemHtml = `
        <div class="favor-item">
          <img src="${img}" alt="${title}">
          <div class="favor-info">
            <h4>${title}</h4>
            <span>${price}</span>
          </div>
          <button class="remove-favor" onclick="this.parentElement.remove()">×</button>
        </div>
      `;

      addedItem.innerHTML += itemHtml;
      btn.classList.toggle("liked");
    });
  });

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cartCount = document.getElementById("cart-count");
      const currentCount = parseInt(cartCount.textContent);
      cartCount.textContent = currentCount + 1;
    });
  });
}

getFoodProducts();

setTimeout(() => {
  setupFoodCardIcons();
}, 100);

const heartBtn = document.getElementById("heart-btn");
const close = document.getElementById("close");
heartBtn.addEventListener("click", () => {
  const favorSection = document.getElementById("favor");
  favorSection.classList.toggle("active-favor");
});
close.addEventListener("click", () => {
  const favorSection = document.getElementById("favor");
  favorSection.classList.remove("active-favor");
});
