const productsList = document.getElementById("product-list");
const btnRefreshProductList = document.getElementById("btn-refresh-product-list");

const loadProductsList = async () => {
    try {
        const response = await fetch("/api/productos", { method: "GET" });
        const data = await response.json();
        const products = data.payload;

        productsList.innerText = "";

        products.forEach((producto) => {
            productsList.innerHTML += `<li>Id: ${producto.id} - Nombre: ${producto.title}</li>`;
        });
    } catch (error) {
        console.error("Error al cargar la lista de productos:", error);
        const errorMessage = document.getElementById("error-message");
        if (errorMessage) {
            errorMessage.innerText = "Hubo un problema al cargar la lista de productos.";
        }
    }
};

btnRefreshProductList.addEventListener("click", () => {
    loadProductsList();
    console.log("¡Lista recargada!");
});

// Se ejecuta para cargar la lista de productos al ingresar o refrescar
loadProductsList();