const kotaSelect = document.getElementById("kota");
const tbody = document.getElementById("jadwal-body");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const now = new Date();
const tahun = now.getFullYear();
const bulan = now.getMonth() + 1;

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
document.getElementById("current-month-display").textContent = "Ramadhan 1447 H / 2026";

async function loadJadwal() {
    const kota = kotaSelect.value;

    if (!kota) {
        tbody.innerHTML = `<tr><td colspan="7" style="padding: 2rem; color: #6b7280;">Silakan pilih kota untuk melihat jadwal</td></tr>`;
        loading.style.display = "none";
        return;
    }

    loading.style.display = "block";
    error.textContent = "";
    tbody.innerHTML = "";

    try {
        const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${kota}/${tahun}/${bulan}`);
        const data = await response.json();

        if (data.status) {
            renderTable(data.data.jadwal);
        } else {
            throw new Error();
        }
        loading.style.display = "none";
    } catch (err) {
        loading.style.display = "none";
        error.textContent = "Oops! Gagal mengambil data. Coba lagi nanti.";
    }
}

function renderTable(jadwal) {
    const todayStr = new Date().toLocaleDateString('en-CA');

    jadwal.forEach(item => {
        const tr = document.createElement("tr");

        if (item.date === todayStr) {
            tr.classList.add("today");
        }

        tr.innerHTML = `
                    <td>${item.tanggal}</td>
                    <td><strong>${item.imsak}</strong></td>
                    <td>${item.subuh}</td>
                    <td>${item.dzuhur}</td>
                    <td>${item.ashar}</td>
                    <td style="color: #b91c1c; font-weight: bold;">${item.maghrib}</td>
                    <td>${item.isya}</td>
                `;
        tbody.appendChild(tr);
    });
}

kotaSelect.addEventListener("change", loadJadwal);
loadJadwal();