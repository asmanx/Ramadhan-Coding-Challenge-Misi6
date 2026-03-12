let currentDate = new Date()

const prayers = [
    { nama: "Subuh", icon: "🌁" },
    { nama: "Dzuhur", icon: "🌅" },
    { nama: "Ashar", icon: "🌄" },
    { nama: "Maghrib", icon: "🌇" },
    { nama: "Isya", icon: "🌆" }
]

const list = document.getElementById("list")

prayers.forEach((p, i) => {

    list.innerHTML += `
            <div class="prayer">

            <div class="prayer-left">
            <div class="icon">${p.icon}</div>
            <div>${p.nama}</div>
            </div>

            <div class="progress">
            <div class="progress-bar" id="bar${i}"></div>
            </div>

            <input type="checkbox" id="check${i}" onchange="update()">

            </div>
            `
})

function getKey() {

    let d = currentDate.toISOString().split("T")[0]
    return "sholat_" + d

}

function loadData() {

    let data = JSON.parse(localStorage.getItem(getKey())) || []

    document.querySelectorAll("input[type=checkbox]").forEach((c, i) => {

        c.checked = data[i] || false

    })

    update()

}

function save() {

    let data = []

    document.querySelectorAll("input[type=checkbox]").forEach(c => {
        data.push(c.checked)
    })

    localStorage.setItem(getKey(), JSON.stringify(data))
    alert("Data tersimpan")
}

function update() {
    let checks = document.querySelectorAll("input[type=checkbox]")
    let done = 0

    checks.forEach((c, i) => {

        if (c.checked) {
            done++
            document.getElementById("bar" + i).style.width = "100%"
        } else {
            document.getElementById("bar" + i).style.width = "0%"
        }
    })

    let percent = Math.round(done / prayers.length * 100)

    document.getElementById("percent").innerText = percent + "%"
    document.getElementById("done").innerText = done

    let status = "Belum optimal"

    if (percent >= 40 && percent < 100) {
        status = "Cukup baik"
    }

    if (percent == 100) {
        status = "MasyaAllah lengkap!"
    }
    document.getElementById("status").innerText = status
}

function formatDate(date) {
    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}

function renderDate() {
    document.getElementById("today").innerText = formatDate(currentDate)
    loadData()

}

function changeDate(step) {
    currentDate.setDate(currentDate.getDate() + step)
    renderDate()

}
renderDate()