
async function searchProduct() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        return alert("Iltimos, qidiruv maydonini to'ldiring!");
    } else if (searchTerm.length < 3) {
        return alert("Iltimos, kamida 3 ta harf kiriting!");
    }
}
