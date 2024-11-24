// Establece la conexión con el servidor usando Socket.IO
const socket = io();
// Obtiene el elemento del DOM que renderiza la lista de records
const recordsList = document.getElementById("records-list");
const recordsForm = document.getElementById("records-form");
const errorMessage = document.getElementById("error-message");
const btnDelete = document.getElementById("btn-delete-record");
const recordId = document.getElementById("input-record-id");



// Evento que se activa al conectar con el servidor
socket.on("connect", () => {
    // Indica que la conexión fue exitosa
    console.log("Connected to Server");
});

// Evento que se activa al desconectarse del servidor
socket.on("disconnect", () => {
    // Indica que se perdió la conexión
    console.log("Disconnect from Server");
}); 

socket.on("records-list", (data) => {
    const records = data.records || [];

    recordsList.innerText = "";

    records.forEach((record) => {
        recordsList.innerHTML += `<li>Id: ${record.id} - Name: ${record.title}</li>`;
    });

});

recordsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log("PRESSED BTN");

    errorMessage.innerText = "";
    form.reset();

    socket.emit("insert-record", {
        title: formData.get("title"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
    });
});

btnDelete.addEventListener("click", () => {
    const id = recordId.value;
    recordId.innerText = "";    
    errorMessage.innerText = "";

    if (id > 0){
        socket.emit("delete-record", { id });
    }

})

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});


