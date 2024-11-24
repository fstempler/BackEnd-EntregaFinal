const recordsList = document.getElementById("records-list");
const btnRefreshRecordsList = document.getElementById("btn-refresh-records-list");

const loadRecordsList = async () => {
    const response = await fetch("/api/records", { method: "GET"});
    const data = await response.json();
    const records = data.payload || [];

    recordsList.innerHTML = "";

    records.forEach((record) => {
        recordsList.innerHTML += `<li>Id: ${record.id} - Name: ${record.title}</li>`;
    });
};

btnRefreshRecordsList.addEventListener("click", () => {
    loadRecordsList();
    console.log("Updated List");
});

loadRecordsList();