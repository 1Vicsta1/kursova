document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#recordsTable tbody");
    const form = document.getElementById("recordForm");
    let records = JSON.parse(localStorage.getItem("records")) || [];

    function renderTable() {
        tableBody.innerHTML = "";
        records.forEach((record, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${record.name}</td>
                <td>${record.date}</td>
                <td>
                    <button onclick="editRecord(${index})">Редагувати</button>
                    <button onclick="deleteRecord(${index})">Видалити</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("itemName").value;
        const date = document.getElementById("itemDate").value;

        records.push({ name, date });
        localStorage.setItem("records", JSON.stringify(records));
        renderTable();
        form.reset();
    });

    window.deleteRecord = (index) => {
        records.splice(index, 1);
        localStorage.setItem("records", JSON.stringify(records));
        renderTable();
    };

    window.editRecord = (index) => {
        const record = records[index];
        document.getElementById("itemName").value = record.name;
        document.getElementById("itemDate").value = record.date;
        records.splice(index, 1);
    };

    renderTable();
});
