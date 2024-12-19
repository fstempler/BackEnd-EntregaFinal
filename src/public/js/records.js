const recordsList = document.getElementById("records-list");
const btnRefreshRecordsList = document.getElementById("btn-refresh-records-list");

// Función para cargar la lista de registros
const loadRecordsList = async () => {
    try {
        const response = await fetch("/api/products", { method: "GET" });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            console.error("Failed to fetch records:", response.statusText);
            recordsList.innerHTML = `<li>Error fetching records: ${response.statusText}</li>`;
            return;
        }

        const data = await response.json();
        const products = data.payload || [];

        // Limpiar la lista actual
        recordsList.innerHTML = "";

        // Renderizar productos en la lista
        products.forEach((product) => {
            recordsList.innerHTML += `
                <li>
                    <strong>Id:</strong> ${product._id}<br>
                    <strong>Title:</strong> ${product.title}<br>
                    <strong>Artist:</strong> ${product.artist}<br>                                        
                    <strong>Year:</strong> ${product.year}<br>                                        
                    <strong>Genre:</strong> ${product.genre}<br>                                        
                    <strong>Condition:</strong> ${product.condition}<br>                                        
                    <strong>Price:</strong> $${product.price}<br>
                    <strong>Stock:</strong> ${product.stock}<br>                    
                </li>
                <hr>
            `;
        });
    } catch (error) {
        console.error("Error fetching records:", error.message);
        recordsList.innerHTML = `<li>Error fetching records: ${error.message}</li>`;
    }
};

// Listener para el botón de actualización
btnRefreshRecordsList.addEventListener("click", () => {
    loadRecordsList();
    console.log("Updated List");
});

// Cargar la lista de registros al cargar la página
loadRecordsList();
