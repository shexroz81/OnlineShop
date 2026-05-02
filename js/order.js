// document.addEventListener("DOMContentLoaded", () => {
//   // =========================
//   // BARS (MOBILE MENU)
//   // =========================
//   const bar = document.getElementById("bar");
//   const mobileMenu = document.getElementById("mobile-menu");
//   const closeBtn = document.querySelector(".mobile-close i");

//   if (bar && mobileMenu) {
//     bar.addEventListener("click", () => {
//       mobileMenu.classList.add("active");
//     });
//   }

//   if (closeBtn && mobileMenu) {
//     closeBtn.addEventListener("click", () => {
//       mobileMenu.classList.remove("active");
//     });
//   }

//   // =========================
//   // DROPDOWN (ALL PAGES)
//   // =========================
//   const dropdownToggle = document.querySelector(".dropdown-toggle");
//   const dropdownMenu = document.querySelector(".dropdown-menu");

//   if (dropdownToggle && dropdownMenu) {
//     dropdownToggle.addEventListener("click", (e) => {
//       e.stopPropagation();
//       dropdownMenu.classList.toggle("active");
//       dropdownToggle.classList.toggle("active");
//     });

//     document.addEventListener("click", () => {
//       dropdownMenu.classList.remove("active");
//       dropdownToggle.classList.remove("active");
//     });
//   }
//   async function searchProduct() {
//     const value = searchInput.value.trim();
  
//     if (!value) {
//       alert("Qidiruv yozing!");
//       return;
//     }
  
//     try {
//       const res = await fetch(
//         `https://dummyjson.com/products/search?q=${value}`
//       );
//       const data = await res.json();
  
//       if (!searchbox) {
//         console.log("searchbox yo‘q HTMLda");
//         return;
//       }
  
//       if (!data.products.length) {
//         searchbox.innerHTML = "<p>Topilmadi</p>";
//         return;
//       }
  
//       const p = data.products[0];
  
//       searchbox.innerHTML = `
//         <div class="items">
//           <img src="${p.thumbnail}" alt="${p.title}">
//           <div>
//             <h3>${p.title}</h3>
//             <p>$${p.price}</p>
//           </div>
//         </div>
//       `;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// })
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // BARS (MOBILE MENU)
  // =========================
  const bar = document.getElementById("bar");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.querySelector(".mobile-close i");

  if (bar && mobileMenu) {
    bar.addEventListener("click", () => {
      mobileMenu.classList.add("active");
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }

  // =========================
  // DROPDOWN (ALL PAGES)
  // =========================
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
      dropdownToggle.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("active");
      dropdownToggle.classList.remove("active");
    });
  }

  // =========================
  // SEARCH — ✅ TUZATILDI
  // =========================
  const searchInput = document.getElementById("search-input"); // ✅ e'lon qilindi
  const searchbox = document.getElementById("searchbox");       // ✅ e'lon qilindi
  const searchBtn = document.getElementById("search-btn");      // ✅ tugma olindi

  // ✅ Tugma bosilganda chaqiriladi
  if (searchBtn) {
    searchBtn.addEventListener("click", searchProduct);
  }

  // ✅ Enter bosilganda ham ishlaydi
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchProduct();
    });
  }

  async function searchProduct() {
    const value = searchInput.value.trim();

    if (!value) {
      alert("Qidiruv yozing!");
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${value}`
      );
      const data = await res.json();

      if (!searchbox) {
        console.log("searchbox yo'q HTMLda");
        return;
      }

      if (!data.products.length) {
        searchbox.innerHTML = "<p>Topilmadi</p>";
        return;
      }

      // ✅ Bitta emas, BARCHA cardlar chiqadi
      searchbox.innerHTML = data.products.map(p => `
        <div class="items">
          <img src="${p.thumbnail}" alt="${p.title}">
          <div>
            <h3>${p.title}</h3>
            <p>$${p.price}</p>
          </div>
        </div>
      `).join("");

    } catch (err) {
      console.log(err);
    }
  }
});
function togglePw() {
  const pw = document.getElementById('password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

