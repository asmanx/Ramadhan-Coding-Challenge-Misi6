let currentDate = new Date()

function getKey() {
    return "quran_" + currentDate.toISOString().split("T")[0]
}

function update() {
    let target = parseInt(document.getElementById("target").value) || 0
    let read = parseInt(document.getElementById("read").value) || 0
    let percent = 0

    if (target > 0) {
        percent = Math.min(Math.round(read / target * 100), 100)
    }
    document.getElementById("percent").innerText = percent + "%"
    let degree = percent * 3.6
    document.getElementById("circle").style.background =
        `conic-gradient(#ffc107 ${degree}deg,#e0e0e0 ${degree}deg)`
    let status = "Masih bisa ditambah"

    if (percent >= 50 && percent < 100) {
        status = "Hampir selesai"
    }
    if (percent === 100) {
        status = "Target tercapai"
    }
    document.getElementById("status").innerText = status

}

function save() {
    let data = {
        target: document.getElementById("target").value,
        read: document.getElementById("read").value,
        done: document.getElementById("done").checked
    }

    localStorage.setItem(getKey(), JSON.stringify(data))
    alert("Progress tersimpan")

}

function load() {
    let data = JSON.parse(localStorage.getItem(getKey()))

    if (!data) return

    document.getElementById("target").value = data.target
    document.getElementById("read").value = data.read
    document.getElementById("done").checked = data.done
    update()

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
    document.getElementById("target").value = ""
    document.getElementById("read").value = ""
    document.getElementById("done").checked = false
    document.getElementById("percent").innerText = "0%"
    document.getElementById("status").innerText = "Masih bisa ditambah"
    document.getElementById("circle").style.background =
        "conic-gradient(#ffc107 0deg,#e0e0e0 0deg)"
    load()

}

function changeDate(step) {
    currentDate.setDate(currentDate.getDate() + step)
    renderDate()

}

window.onload = function () {
    currentDate = new Date()
    renderDate()

}