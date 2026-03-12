let totalDays = 30
let selectedDay = 1
let data = JSON.parse(localStorage.getItem("ramadhan_fast")) || []

const fastYes = document.getElementById("fastYes")
const fastNo = document.getElementById("fastNo")

/* checkbox hanya satu */
fastYes.addEventListener("change", function () {
    if (this.checked) {
        fastNo.checked = false
    }
})

fastNo.addEventListener("change", function () {
    if (this.checked) {
        fastYes.checked = false
    }
})

function renderCalendar() {

    let cal = document.getElementById("calendar")
    cal.innerHTML = ""

    for (let i = 1; i <= 30; i++) {

        let div = document.createElement("div")
        div.className = "day"
        div.innerText = i

        if (data[i] == "yes") {
            div.classList.add("fasted")
            div.innerText = "✓"
        }

        if (data[i] == "no") {
            div.classList.add("notfast")
            div.innerText = "✕"
        }

        if (i === selectedDay) {
            div.classList.add("selected")
        }

        div.onclick = function () {
            selectedDay = i
            updateSelected()
            renderCalendar()
        }

        cal.appendChild(div)

    }

}

function updateSelected() {
    document.getElementById("selectedDay").innerText =
        "Hari ke-" + selectedDay + " Ramadhan"

    fastYes.checked = false
    fastNo.checked = false

    if (data[selectedDay] == "yes") {
        fastYes.checked = true
    }

    if (data[selectedDay] == "no") {
        fastNo.checked = true
    }

}

function updateProgress() {
    let done = data.filter(x => x == "yes").length
    let percent = Math.round(done / totalDays * 100)

    document.getElementById("progressBar").style.width = percent + "%"
    document.getElementById("progressText").innerText = percent + "%"

    /* status motivasi */
    let status = "Awali Dengan Niat"

    if (done >= 10 && done < 20) {
        status = "Jaga Istiqamah"
    }

    if (done >= 20 && done < 30) {
        status = "Menuju Kemenangan"
    }

    if (done == 30) {
        status = "MasyaAllah Sempurna"
    }

    document.getElementById("status").innerText = status
}

function save() {
    if (fastYes.checked) {
        data[selectedDay] = "yes"
    }

    if (fastNo.checked) {
        data[selectedDay] = "no"
    }

    localStorage.setItem("ramadhan_fast", JSON.stringify(data))
    renderCalendar()
    updateProgress()
    alert("Data puasa tersimpan")
}

function init() {
    updateSelected()
    renderCalendar()
    updateProgress()

}

init()