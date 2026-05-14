document.addEventListener("DOMContentLoaded", () => {
// Dark Mode
const btn = document.getElementById("toggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
// form
 
  const TOKEN = "8693029388:AAGn_tO8IGyGq0m8dcrqwtdOQzqeVWonbKo";
const CHAT_ID = "5314852743";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const message = document.getElementById("message").value;

  const text = `
Yangi xabar

 Name: ${name}
 Email: ${email}
 Contact: ${contact}
 Message: ${message}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      }
    );

    if (response.ok) {
      alert("Xabar yuborildi ");
      form.reset();
    } else {
      alert("Xatolik yuz berdi ");
    }
  } catch (error) {
    console.log(error);
    alert("Server bilan ulanishda xatolik ");
  }
});


  
})