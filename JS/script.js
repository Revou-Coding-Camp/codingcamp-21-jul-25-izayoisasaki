// script.js
const tasks = [];

// tambah tugas
function addTask() {
    const taskInput = document.getElementById("task_input");
    const taskDate  = document.getElementById("date_input");

    if (!taskInput.value.trim() || !taskDate.value) {
        alert("Silakan isi kedua kolom tersebut.");
        return;
    }

    tasks.push({
        text: taskInput.value.trim(),
        date: taskDate.value,
        status: "Pending"
    });

    taskInput.value = "";
    taskDate.value  = "";
    displayTasks();
}

// tampilkan tugas
function displayTasks(filter = "all") {
    const tbody = document.getElementById("tabel");
    tbody.innerHTML = "";

    // sortir berdasarkan tanggal
    let sorted = [...tasks];
    if (filter === "ascending")  sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (filter === "descending") sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Tidak Ada Tugas Yang Ditemukan</td></tr>';
        return;
    }

    sorted.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.text}</td>
            <td>${task.date}</td>
            <td>
                <select onchange="toggleStatus(${index}, this.value)">
                    <option ${task.status === "Pending"  ? "selected" : ""}>Pending</option>
                    <option ${task.status === "Selesai" ? "selected" : ""}>Selesai</option>
                </select>
            </td>
            <td><button type="button" onclick="deleteTask(${index})">Hapus</button></td>
        `;
        tbody.appendChild(row);
    });
}

// hapus tugas
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// hapus semua tugas
document.getElementById("btnhapus").addEventListener("click", () => {
    if (confirm("Yakin ingin menghapus semua tugas?")) {
        tasks.length = 0;
        displayTasks();
    }
});

// filter otomatis
document.getElementById("Filter").addEventListener("change", (e) => {
    displayTasks(e.target.value);
});

// status
function toggleStatus(index, status) {
    tasks[index].status = status;
    displayTasks();
}

// load awal 
document.addEventListener("DOMContentLoaded", displayTasks);