// Establece la conexión con el servidor usando Socket.IO
const socket = io();
// Obtiene elementos del DOM
const recordsList = document.getElementById("records-list");
const recordsForm = document.getElementById("records-form");
const errorMessage = document.getElementById("error-message");
const btnDelete = document.getElementById("btn-delete-record");
const recordId = document.getElementById("input-record-id");

// Evento al conectar con el servidor
socket.on("connect", () => {
    console.log("Connected to Server");
});

// Evento al desconectar del servidor
socket.on("disconnect", () => {
    console.log("Disconnected from Server");
});

// Renderizar lista de registros
const renderRecordsList = (records) => {
    recordsList.innerHTML = ""; // Limpiar la lista actual
    records.forEach((record) => {
        recordsList.innerHTML += `
            <li data-id="${record._id}">
                <strong>Id:</strong> ${record._id}<br>
                <strong>Title:</strong> ${record.title}<br>
                <strong>Artist:</strong> ${record.artist}<br>
                <strong>Year:</strong> ${record.year}<br>
                <strong>Genre:</strong> ${record.genre}<br>
                <strong>Condition:</strong> ${record.condition}<br>
                <strong>Price:</strong> $${record.price}<br>
                <strong>Stock:</strong> ${record.stock}<br>
                <button data-id="${record._id}">Delete</button>
            </li>            
        `;
    });
};

// Solicitar lista inicial de registros
socket.emit("get-records");

// Recibir y renderizar lista de registros
socket.on("records-list", (data) => {
    const records = data.records || [];
    renderRecordsList(records);
});

// Manejar envío del formulario
recordsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    errorMessage.innerText = "";
    form.reset();

    socket.emit("insert-record", {
        title: formData.get("title"),
        artist: formData.get("artist"),
        year: formData.get("year"),
        genre: formData.get("genre"),
        condition: formData.get("condition"),
        price: parseFloat(formData.get("price")),
        stock: parseInt(formData.get("stock"), 10),
    });
});

// Manejar eliminación de registros
recordsList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.dataset.id) {
        const id = event.target.dataset.id;
        console.log(`Deleting record with id: ${id}`);
        socket.emit("delete-record", { id });
    }
});

// Recibir notificación de eliminación
socket.on("recordDeleted", (id) => {
    const recordElement = document.querySelector(`[data-id="${id}"]`);
    if (recordElement) {
        recordElement.remove();
    }
});

// Mostrar mensajes de error
socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});
