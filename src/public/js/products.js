const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");

const loadProductsList = async () => {
    const response = await fetch("/api/productos", { method: "GET" });
    const data = await response.json();
    const products = data.payload;

    productsList.innerText = "";

    products.forEach((producto) => {
        productsList.innerHTML += `<li>Id: ${producto.id} - Nombre: ${producto.title}</li>`;
    });
};

btnRefreshProductsList.addEventListener("click", () => {
    loadProductsList();
    console.log("¡Lista recargada!");
});

// Se ejecuta para cargar la lista de ingredientes al ingresar o refrescar
loadProductsList();